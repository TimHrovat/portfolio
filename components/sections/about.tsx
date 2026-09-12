import { MapPin } from 'lucide-react';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';

import OrgMark from '@/components/org-mark';
import Reveal from '@/components/reveal';
import Section from '@/components/section';
import StackStrip from '@/components/stack-strip';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { certifications, education } from '@/lib/site';

/**
 * About, Education and Stack as one grid of tiles. They were three sections
 * and nearly three screens; none of them needed a screen to itself.
 *
 * `#education` and `#stack` stay on their tiles, so links to the sections
 * those used to be still land somewhere sensible.
 */
export default async function About() {
    const t = await getTranslations('about');
    const who = await getTranslations('person');
    const school = await getTranslations('education');
    const stack = await getTranslations('stack');

    return (
        <Section id="about" eyebrow={t('eyebrow')}>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-6 md:gap-4">
                {/* Portrait, full bleed. The location rides on it rather than
                    taking a line of its own. A wide crop on a phone, where a
                    square would be most of a screen. */}
                <Reveal className="md:col-span-2">
                    <Card
                        glass
                        className="relative aspect-[4/3] h-full p-0 sm:aspect-[16/9] md:aspect-auto md:min-h-72"
                    >
                        <Image
                            src="/images/portrait.png"
                            alt={t('portraitAlt')}
                            fill
                            sizes="(min-width: 768px) 20rem, 100vw"
                            priority
                            className="object-cover object-[50%_30%]"
                        />
                        <p className="glass absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full px-3 py-1.5 font-mono text-[0.6875rem] tracking-wider uppercase">
                            <MapPin
                                className="text-highlight size-3.5"
                                aria-hidden
                            />
                            {who('location')}
                        </p>
                    </Card>
                </Reveal>

                <Reveal delay={60} className="md:col-span-4">
                    <Card
                        glass
                        className="h-full justify-center p-5 sm:p-7 md:p-8"
                    >
                        <h2 className="text-2xl text-balance md:text-3xl">
                            {who('tagline')}
                            <span className="text-primary">.</span>
                        </h2>
                        <p className="text-muted-foreground mt-4 text-pretty md:text-[0.9375rem]">
                            {t('body')}
                        </p>
                        {/* Where I am, not what the section is about: last,
                            and a step quieter. */}
                        <p className="text-muted-foreground/80 mt-3 text-sm text-pretty">
                            {t('closing')}
                        </p>
                    </Card>
                </Reveal>

                <Reveal delay={120} className="md:col-span-6">
                    <Card
                        glass
                        id="education"
                        className="scroll-mt-28 p-5 sm:p-7"
                    >
                        <p className="eyebrow">{school('eyebrow')}</p>
                        {/* Side by side from `md`, where one row each would
                            leave three lines stranded across the full width. */}
                        <ul className="mt-3 grid gap-x-4 md:grid-cols-3">
                            {education.map((item) => (
                                <EducationRow
                                    key={item.id}
                                    href={item.href}
                                    logo={item.logo}
                                    name={school(`schools.${item.id}.school`)}
                                    detail={`${school(`schools.${item.id}.programme`)} · ${school(`schools.${item.id}.years`)}`}
                                    status={
                                        item.end === null
                                            ? school(
                                                  `schools.${item.id}.status`,
                                              )
                                            : undefined
                                    }
                                />
                            ))}
                            {certifications.map((item) => (
                                <EducationRow
                                    key={item.id}
                                    href={item.href}
                                    logo={item.logo}
                                    name={school(
                                        `certifications.${item.id}.name`,
                                    )}
                                    detail={`${school(`certifications.${item.id}.issuer`)} · ${school(`certifications.${item.id}.date`)}`}
                                />
                            ))}
                        </ul>
                    </Card>
                </Reveal>

                <Reveal delay={180} className="md:col-span-6">
                    <Card
                        glass
                        id="stack"
                        className="scroll-mt-28 gap-4 px-0 py-5 sm:py-6"
                    >
                        <p className="eyebrow px-5 sm:px-7">
                            {stack('eyebrow')}
                        </p>
                        <StackStrip />
                    </Card>
                </Reveal>
            </div>
        </Section>
    );
}

/**
 * One school or certificate: a single link stretched over the row, so the
 * whole line is the target without an overlay that has no name of its own.
 */
function EducationRow({
    href,
    logo,
    name,
    detail,
    status,
}: {
    href?: string;
    logo: string;
    name: string;
    detail: string;
    status?: string;
}) {
    return (
        <li className="hover:bg-foreground/[0.03] relative -mx-3 flex items-center gap-3.5 rounded-xl px-3 py-2.5 transition-colors duration-200">
            <OrgMark name={name} logo={logo} />
            <div className="min-w-0 flex-1">
                <p className="text-sm leading-snug font-semibold">
                    {href ? (
                        <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="after:absolute after:inset-0"
                        >
                            {name}
                        </a>
                    ) : (
                        name
                    )}
                </p>
                <p className="text-muted-foreground mt-0.5 font-mono text-[0.6875rem] tracking-wider">
                    {detail}
                </p>
            </div>
            {status ? (
                <Badge variant="accent" size="sm">
                    {status}
                </Badge>
            ) : null}
        </li>
    );
}
