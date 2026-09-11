import { ArrowUpRight } from 'lucide-react';

import OrgMark from '@/components/org-mark';
import Reveal from '@/components/reveal';
import RoleHighlights from '@/components/role-highlights';
import { Badge } from '@/components/ui/badge';
import type { Role } from '@/lib/site';
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
 * One role carries `highlights`, and that is what makes it the anchor of the
 * section. It is scaled up in every dimension that already exists, a larger
 * mark and a larger title, and its detail sits on the house glass material,
 * because weight of material is how this design system says "this one first".
 * No new colour, no badge, no decoration: hierarchy out of the same parts.
 */
export default function Timeline({ roles }: { roles: Role[] }) {
    // `start` is `YYYY-MM`, so a string sort is a date sort. Ongoing roles
    // have the most recent start on this CV, so they land on top without a
    // special case.
    const ordered = [...roles].sort((a, b) => b.start.localeCompare(a.start));

    return (
        <ol className="flex flex-col items-center">
            {ordered.map((role, index) => {
                const featured = role.highlights !== undefined;

                return (
                    <Reveal
                        as="li"
                        key={`${role.company}-${role.start}`}
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
                            name={role.company}
                            logo={role.logo}
                            className={cn(
                                'rounded-2xl',
                                featured ? 'size-14' : 'size-12',
                                role.kind === 'engineering' &&
                                    'ring-primary/35',
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
                                {role.title}
                            </h3>
                            {role.end === null ? (
                                <Badge variant="accent" size="sm">
                                    Now
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
                                    {role.company}
                                    <ArrowUpRight
                                        aria-hidden
                                        className="text-muted-foreground size-3.5 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                                    />
                                </a>
                            ) : (
                                <span className="text-foreground/85 text-sm font-medium">
                                    {role.company}
                                </span>
                            )}
                            <span
                                aria-hidden
                                className="bg-hairline hidden h-3 w-px sm:block"
                            />
                            <span className="text-muted-foreground font-mono text-[0.6875rem] tracking-wider">
                                {role.from} – {role.to}
                            </span>
                        </div>

                        {role.description.map((paragraph) => (
                            <p
                                key={paragraph}
                                className="text-muted-foreground mt-4 max-w-2xl text-sm leading-relaxed text-pretty"
                            >
                                {paragraph}
                            </p>
                        ))}

                        {role.highlights ? (
                            <RoleHighlights groups={role.highlights} />
                        ) : null}

                        {role.stack ? (
                            <ul className="mt-6 flex flex-wrap justify-center gap-2">
                                {role.stack.map((item) => (
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
