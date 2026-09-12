import { ArrowUpRight, Briefcase } from 'lucide-react';
import { getMessages, getTranslations } from 'next-intl/server';
import type { ReactNode } from 'react';

import OrgMark from '@/components/org-mark';
import OtherRoles from '@/components/other-roles';
import Reveal from '@/components/reveal';
import RoleHighlights from '@/components/role-highlights';
import Section from '@/components/section';
import { Badge } from '@/components/ui/badge';
import WorkSwitcher from '@/components/work-switcher';
import { PREVIEW_PER_GROUP } from '@/lib/highlights';
import {
    otherRoles,
    roles,
    type OtherRoleCopy,
    type Role,
    type RoleCopy,
} from '@/lib/site';

/**
 * Work, one role at a time. The switching lives in `WorkSwitcher`; everything
 * it shows is rendered here, on the server, and handed over as markup.
 *
 * The job title leads in both the tab and the panel: what the work was is the
 * thing worth reading, and who paid for it is context.
 *
 * Roles are ordered by `start`, descending — `YYYY-MM`, so a string sort is a
 * date sort. The ongoing role has the most recent start on this CV, so it is
 * the first tab and the one open on load without a special case. The side
 * jobs are the last tab rather than a node each: they are part of the record,
 * but not three years of engineering.
 */
export default async function Experience() {
    const t = await getTranslations('work');
    const messages = await getMessages();

    const ordered = [...roles].sort((a, b) => b.start.localeCompare(a.start));
    const others: OtherRoleCopy[] = otherRoles.map(
        (role) => messages.work.other.roles[role.id],
    );

    const items: { id: string; tab: ReactNode; panel: ReactNode }[] =
        ordered.map((role) => {
            const copy: RoleCopy = messages.work.roles[role.id];

            return {
                id: role.id,
                tab: <RoleTab role={role} copy={copy} ongoing={t('ongoing')} />,
                panel: (
                    <RolePanel
                        role={role}
                        copy={copy}
                        ongoing={t('ongoing')}
                        expandLabel={t('highlightsExpand', {
                            count: (copy.highlights ?? []).reduce(
                                (total, group) =>
                                    total +
                                    Math.max(
                                        0,
                                        group.items.length - PREVIEW_PER_GROUP,
                                    ),
                                0,
                            ),
                        })}
                        collapseLabel={t('highlightsCollapse')}
                    />
                ),
            };
        });

    items.push({
        id: 'other',
        tab: (
            <TabBody
                mark={
                    <span className="bg-surface-strong ring-hairline text-muted-foreground flex size-9 shrink-0 items-center justify-center rounded-xl ring-1">
                        <Briefcase className="size-4" aria-hidden />
                    </span>
                }
                title={t('other.eyebrow')}
                meta={others.map((copy) => copy.company).join(' · ')}
            />
        ),
        panel: (
            <div>
                <h3 className="font-display text-2xl leading-tight font-bold tracking-tight md:text-3xl">
                    {t('other.eyebrow')}
                </h3>
                <OtherRoles roles={otherRoles} />
            </div>
        ),
    });

    return (
        <Section id="work" eyebrow={t('eyebrow')} title={t('title')}>
            <Reveal>
                <WorkSwitcher label={t('switcherLabel')} items={items} />
            </Reveal>
        </Section>
    );
}

function RoleTab({
    role,
    copy,
    ongoing,
}: {
    role: Role;
    copy: RoleCopy;
    ongoing: string;
}) {
    return (
        <TabBody
            mark={<OrgMark name={copy.company} logo={role.logo} />}
            title={copy.title}
            meta={`${copy.from} – ${copy.to}`}
            badge={
                role.end === null ? (
                    <Badge
                        variant="accent"
                        size="sm"
                        className="hidden md:inline-flex"
                    >
                        {ongoing}
                    </Badge>
                ) : null
            }
            short={copy.short}
        />
    );
}

/**
 * What a tab holds. From `md` up that is the mark, the title and a mono line
 * under it; in the two-by-two grid on a phone it is the mark and one short label,
 * since a row of full entries would be wider than any phone.
 */
function TabBody({
    mark,
    title,
    meta,
    badge,
    short,
}: {
    mark: ReactNode;
    title: string;
    meta: string;
    badge?: ReactNode;
    short?: string;
}) {
    return (
        <>
            {mark}
            <span className="hidden min-w-0 flex-1 md:block">
                <span className="block text-sm leading-snug font-semibold text-balance">
                    {title}
                </span>
                <span className="mt-1 flex items-center gap-2">
                    <span className="text-muted-foreground truncate font-mono text-[0.6875rem] tracking-wider">
                        {meta}
                    </span>
                    {badge}
                </span>
            </span>
            <span className="min-w-0 truncate text-sm font-medium md:hidden">
                {short ?? title}
            </span>
        </>
    );
}

function RolePanel({
    role,
    copy,
    ongoing,
    expandLabel,
    collapseLabel,
}: {
    role: Role;
    copy: RoleCopy;
    ongoing: string;
    expandLabel: string;
    collapseLabel: string;
}) {
    return (
        <div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <h3 className="font-display text-2xl leading-tight font-bold tracking-tight md:text-3xl">
                    {copy.title}
                </h3>
                {role.end === null ? (
                    <Badge variant="accent" size="sm">
                        {ongoing}
                    </Badge>
                ) : null}
            </div>

            <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1">
                {role.href ? (
                    <a
                        href={role.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group text-foreground/85 hover:text-foreground inline-flex items-center gap-1 text-sm font-medium transition-colors duration-200"
                    >
                        {copy.company}
                        <ArrowUpRight
                            aria-hidden
                            className="text-muted-foreground size-3.5 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                        />
                    </a>
                ) : (
                    <span className="text-foreground/85 text-sm font-medium">
                        {copy.company}
                    </span>
                )}
                <span aria-hidden className="bg-hairline h-3 w-px" />
                <span className="text-muted-foreground font-mono text-[0.6875rem] tracking-wider">
                    {copy.from} – {copy.to}
                </span>
            </div>

            {copy.description.map((paragraph) => (
                <p
                    key={paragraph}
                    className="text-muted-foreground mt-4 max-w-2xl text-sm leading-relaxed text-pretty"
                >
                    {paragraph}
                </p>
            ))}

            {copy.highlights ? (
                <RoleHighlights
                    groups={copy.highlights}
                    expandLabel={expandLabel}
                    collapseLabel={collapseLabel}
                />
            ) : null}

            {copy.stack ? (
                <ul className="mt-6 flex flex-wrap gap-2">
                    {copy.stack.map((item) => (
                        <Badge as="li" key={item} variant="meta" size="sm">
                            {item}
                        </Badge>
                    ))}
                </ul>
            ) : null}
        </div>
    );
}
