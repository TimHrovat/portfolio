import { getMessages } from 'next-intl/server';

import type { OtherRole, OtherRoleCopy } from '@/lib/site';

/**
 * The jobs that paid for the years around the engineering ones — a print shop,
 * a support desk, a summer of data entry. They belong on the CV, but a tab each
 * would give three side jobs the same weight as three years of engineering, so
 * they share the last tab as a line each.
 *
 * A line is the title, then the employer and the dates: no mark and no
 * description. Everything that makes a role's panel worth reading is what
 * would make this list too heavy for what it is.
 */
export default async function OtherRoles({ roles }: { roles: OtherRole[] }) {
    const messages = await getMessages();

    const ordered = [...roles].sort((a, b) => b.start.localeCompare(a.start));

    return (
        <ul className="divide-hairline mt-5 flex max-w-2xl flex-col divide-y">
            {ordered.map((role) => {
                const copy: OtherRoleCopy = messages.work.other.roles[role.id];

                return (
                    <li key={role.id} className="py-3.5 first:pt-0">
                        <p className="text-sm font-semibold">{copy.title}</p>
                        <p className="mt-1 flex flex-wrap items-center gap-x-2.5 gap-y-1">
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
                        </p>
                    </li>
                );
            })}
        </ul>
    );
}
