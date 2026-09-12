import { ArrowUpRight } from 'lucide-react';
import { getMessages, getTranslations } from 'next-intl/server';

import OrgMark from '@/components/org-mark';
import Reveal from '@/components/reveal';
import RoleHighlights from '@/components/role-highlights';
import { Badge } from '@/components/ui/badge';
import type { Role, RoleCopy } from '@/lib/site';
import { cn } from '@/lib/utils';

/**
 * The Work section's spine: one rail down the page's centre, newest role at
 * the top, every entry centred on the same axis as the section headers and the
 * About prose. A left-hand rail put the whole section off-axis against a page
 * that is centred everywhere else.
 *
 * The job title leads and the employer is the line underneath it — what the
 * work was is the thing worth reading; who paid for it is context.
 *
 * The rail is a segment rendered above each node rather than one line behind
 * the list, so it spans whatever height the entry above it happens to need
 * without anything being measured.
 *
 * Only engineering roles are on the rail — the rest are a list underneath, in
 * components/other-roles.tsx — so the accented ring is every node's now rather
 * than a cue that distinguishes them.
 *
 * One role carries `highlights`, and that is what makes it the anchor of the
 * section. It is scaled up in every dimension that already exists, a larger
 * mark and a larger title, and its detail sits on the house glass material,
 * because weight of material is how this design system says "this one first".
 * No new colour, no badge, no decoration: hierarchy out of the same parts.
 *
 * Each role's copy is read as a whole object rather than key by key, because
 * `highlights` and `stack` are there for some roles and not others — which a
 * per-key lookup cannot express, and which is exactly what marks the featured
 * one.
 */
export default async function Timeline({ roles }: { roles: Role[] }) {
    const t = await getTranslations('work');
    const messages = await getMessages();

    // `start` is `YYYY-MM`, so a string sort is a date sort. Ongoing roles
    // have the most recent start on this CV, so they land on top without a
    // special case.
    const ordered = [...roles].sort((a, b) => b.start.localeCompare(a.start));

    return (
        <ol className="flex flex-col items-center">
            {ordered.map((role, index) => {
                const copy: RoleCopy = messages.work.roles[role.id];
                const featured = copy.highlights !== undefined;

                return (
                    <Reveal
                        as="li"
                        key={role.id}
                        delay={index * 60}
                        className="flex w-full flex-col items-center text-center"
                    >
                        {index === 0 ? null : (
                            <span
                                aria-hidden
                                className="bg-hairline my-10 h-14 w-px"
                            />
                        )}

                        <OrgMark
                            name={copy.company}
                            logo={role.logo}
                            className={cn(
                                'ring-primary/35 rounded-2xl',
                                featured ? 'size-14' : 'size-12',
                            )}
                        />

                        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
                            <h3
                                className={cn(
                                    'font-display leading-tight font-bold tracking-tight',
                                    featured
                                        ? 'text-2xl md:text-3xl'
                                        : 'text-xl md:text-2xl',
                                )}
                            >
                                {copy.title}
                            </h3>
                            {role.end === null ? (
                                <Badge variant="accent" size="sm">
                                    {t('ongoing')}
                                </Badge>
                            ) : null}
                        </div>

                        <div className="mt-2.5 flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
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
                            <span
                                aria-hidden
                                className="bg-hairline hidden h-3 w-px sm:block"
                            />
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
                                label={t('highlightsToggle')}
                                groups={copy.highlights}
                            />
                        ) : null}

                        {copy.stack ? (
                            <ul className="mt-6 flex flex-wrap justify-center gap-2">
                                {copy.stack.map((item) => (
                                    <Badge
                                        as="li"
                                        key={item}
                                        variant="meta"
                                        size="sm"
                                    >
                                        {item}
                                    </Badge>
                                ))}
                            </ul>
                        ) : null}
                    </Reveal>
                );
            })}
        </ol>
    );
}
