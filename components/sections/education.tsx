import { ArrowUpRight } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

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
export default async function Education() {
    const t = await getTranslations('education');

    return (
        <Section id="education" eyebrow={t('eyebrow')} title={t('title')}>
            <ul className="grid gap-5 md:grid-cols-2">
                {education.map((item, index) => (
                    <Reveal as="li" key={item.id} delay={index * 80}>
                        <Card glass interactive className="group h-full">
                            <div className="flex items-start gap-4">
                                <OrgMark
                                    name={t(`schools.${item.id}.school`)}
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
                                            {t(`schools.${item.id}.school`)}
                                        </a>
                                        <ArrowUpRight
                                            aria-hidden
                                            className="text-muted-foreground size-4 shrink-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                                        />
                                    </h3>
                                    <p className="text-muted-foreground mt-1.5 text-sm">
                                        {t(`schools.${item.id}.programme`)}
                                    </p>
                                </div>
                            </div>

                            <p className="text-muted-foreground mt-5 flex-1 text-sm text-pretty">
                                {t(`schools.${item.id}.detail`)}
                            </p>

                            <div className="mt-6 flex flex-wrap items-center gap-2">
                                <Badge variant="meta" size="sm">
                                    {t(`schools.${item.id}.years`)}
                                </Badge>
                                {item.end === null ? (
                                    <Badge variant="accent" size="sm">
                                        {t(`schools.${item.id}.status`)}
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
                    <Reveal as="li" key={item.id} delay={(index + 2) * 80}>
                        <Card
                            glass
                            interactive
                            className="group flex-row items-center gap-4 py-5"
                        >
                            <OrgMark
                                name={t(`certifications.${item.id}.issuer`)}
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
                                            {t(
                                                `certifications.${item.id}.name`,
                                            )}
                                        </a>
                                    ) : (
                                        t(`certifications.${item.id}.name`)
                                    )}
                                    <ArrowUpRight
                                        aria-hidden
                                        className="text-muted-foreground size-3.5 shrink-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                                    />
                                </h3>
                                <p className="text-muted-foreground mt-1 text-sm text-pretty">
                                    {t(`certifications.${item.id}.issuer`)} ·{' '}
                                    {t(`certifications.${item.id}.detail`)}
                                </p>
                            </div>
                            <Badge
                                variant="meta"
                                size="sm"
                                className="hidden shrink-0 sm:inline-flex"
                            >
                                {t(`certifications.${item.id}.date`)}
                            </Badge>
                        </Card>
                    </Reveal>
                ))}
            </ul>
        </Section>
    );
}
