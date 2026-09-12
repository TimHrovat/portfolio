import { getMessages, getTranslations } from 'next-intl/server';

import Reveal from '@/components/reveal';
import { Separator } from '@/components/ui/separator';
import type { OtherRole, OtherRoleCopy } from '@/lib/site';

/**
 * The jobs that paid for the years around the engineering ones — a print shop,
 * a support desk, a summer of data entry. They belong on the CV, but a node on
 * the rail each gave three side jobs the same weight as three years of
 * engineering, so they are a line each underneath it instead.
 *
 * A line is the title, the employer and the dates: no mark, no description, no
 * card. Everything that makes the timeline worth reading is what would make
 * this list too heavy for what it is.
 */
export default async function OtherRoles({ roles }: { roles: OtherRole[] }) {
    const t = await getTranslations('work.other');
    const messages = await getMessages();

    const ordered = [...roles].sort((a, b) => b.start.localeCompare(a.start));

    return (
        <Reveal className="mt-20 flex flex-col items-center">
            <Separator className="max-w-3xs" />
            <p className="eyebrow mt-10">{t('eyebrow')}</p>

            <ul className="mt-6 flex w-full max-w-2xl flex-col gap-3.5">
                {ordered.map((role) => {
                    const copy: OtherRoleCopy =
                        messages.work.other.roles[role.id];

                    return (
                        <li
                            key={role.id}
                            className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-center"
                        >
                            <span className="text-sm font-medium">
                                {copy.title}
                            </span>
                            <span
                                aria-hidden
                                className="bg-hairline h-1 w-1 shrink-0 rounded-full"
                            />
                            {role.href ? (
                                <a
                                    href={role.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-muted-foreground hover:text-foreground text-sm transition-colors duration-200"
                                >
                                    {copy.company}
                                </a>
                            ) : (
                                <span className="text-muted-foreground text-sm">
                                    {copy.company}
                                </span>
                            )}
                            <span
                                aria-hidden
                                className="bg-hairline h-1 w-1 shrink-0 rounded-full"
                            />
                            <span className="text-muted-foreground font-mono text-[0.6875rem] tracking-wider">
                                {copy.from} – {copy.to}
                            </span>
                        </li>
                    );
                })}
            </ul>
        </Reveal>
    );
}
