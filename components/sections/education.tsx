import { ArrowUpRight } from 'lucide-react';

import OrgMark from '@/components/org-mark';
import Reveal from '@/components/reveal';
import Section from '@/components/section';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { certifications, education } from '@/lib/site';

/*
 * School used to share the Work section's time axis, which made the point that
 * most of the jobs ran alongside it — at the cost of a second chart nobody
 * needed to read that precisely. Two schools and one certificate are a short
 * list, so they are a short list.
 *
 * Each card is one link, stretched over the whole surface with `after:inset-0`
 * rather than an overlay element with no accessible name of its own.
 */
export default function Education() {
    return (
        <Section
            id="education"
            eyebrow="Education"
            title={
                <>
                    Where I&rsquo;ve studied
                    <span className="text-primary">.</span>
                </>
            }
        >
            <ul className="grid gap-5 md:grid-cols-2">
                {education.map((item, index) => (
                    <Reveal as="li" key={item.school} delay={index * 80}>
                        <Card glass interactive className="group h-full">
                            <div className="flex items-start gap-4">
                                <OrgMark
                                    name={item.school}
                                    logo={item.logo}
                                    className="size-12 rounded-2xl"
                                />
                                <div className="min-w-0 flex-1">
                                    <h3 className="font-display flex items-center gap-1.5 text-xl leading-tight font-bold tracking-tight">
                                        <a
                                            href={item.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="after:absolute after:inset-0"
                                        >
                                            {item.school}
                                        </a>
                                        <ArrowUpRight
                                            aria-hidden
                                            className="text-muted-foreground size-4 shrink-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                                        />
                                    </h3>
                                    <p className="text-muted-foreground mt-1.5 text-sm">
                                        {item.programme}
                                    </p>
                                </div>
                            </div>

                            <p className="text-muted-foreground mt-5 flex-1 text-sm text-pretty">
                                {item.detail}
                            </p>

                            <div className="mt-6 flex flex-wrap items-center gap-2">
                                <Badge variant="meta" size="sm">
                                    {item.years}
                                </Badge>
                                {item.end === null ? (
                                    <Badge variant="accent" size="sm">
                                        {item.status}
                                    </Badge>
                                ) : null}
                            </div>
                        </Card>
                    </Reveal>
                ))}
            </ul>

            {/* A certificate is a point in time, not a programme — so it gets a
                slimmer row rather than a third card pretending to be a school. */}
            <ul className="mt-5 grid gap-5">
                {certifications.map((item, index) => (
                    <Reveal as="li" key={item.name} delay={(index + 2) * 80}>
                        <Card
                            glass
                            interactive
                            className="group flex-row items-center gap-4 py-5"
                        >
                            <OrgMark
                                name={item.issuer}
                                logo={item.logo}
                                className="size-11 rounded-xl"
                            />
                            <div className="min-w-0 flex-1">
                                <h3 className="flex items-center gap-1.5 text-sm leading-snug font-medium">
                                    {item.href ? (
                                        <a
                                            href={item.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="after:absolute after:inset-0"
                                        >
                                            {item.name}
                                        </a>
                                    ) : (
                                        item.name
                                    )}
                                    <ArrowUpRight
                                        aria-hidden
                                        className="text-muted-foreground size-3.5 shrink-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                                    />
                                </h3>
                                <p className="text-muted-foreground mt-1 text-sm text-pretty">
                                    {item.issuer} · {item.detail}
                                </p>
                            </div>
                            <Badge
                                variant="meta"
                                size="sm"
                                className="hidden shrink-0 sm:inline-flex"
                            >
                                {item.date}
                            </Badge>
                        </Card>
                    </Reveal>
                ))}
            </ul>
        </Section>
    );
}
