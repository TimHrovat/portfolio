import { GraduationCap, Layers, MapPin, Terminal } from 'lucide-react';
import Image from 'next/image';

import Reveal from '@/components/reveal';
import Section from '@/components/section';
import { Separator } from '@/components/ui/separator';
import { intro, person } from '@/lib/site';

const facts = [
    { label: 'Based in', value: person.location, icon: MapPin },
    { label: 'Focus', value: 'Full stack · Web', icon: Layers },
    {
        label: 'Studying',
        value: 'CS at FRI UNI Ljubljana',
        icon: GraduationCap,
    },
    { label: 'Since', value: 'Writing code since school', icon: Terminal },
];

export default function About() {
    return (
        <Section id="about" eyebrow="About">
            <div className="grid gap-12 md:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] md:gap-16">
                <Reveal>
                    <div className="group relative w-fit">
                        {/* Offset frame — the block of colour sits behind and
                            closes the gap on hover. */}
                        <div
                            aria-hidden
                            className="bg-primary/25 absolute -inset-3 rounded-2xl transition-transform duration-500 ease-[var(--ease-settle)] group-hover:translate-x-1 group-hover:translate-y-1"
                        />
                        {/* Deliberately not shadcn's Avatar. Radix's
                            Avatar.Image derives its load state from its own
                            `src`, so wrapping next/image with asChild leaves
                            it stuck on the fallback, and passing `src` to both
                            makes Radix fetch the unoptimised original a second
                            time. A 469KB portrait is worth keeping on
                            next/image. */}
                        <Image
                            src="/images/portrait.png"
                            alt="Tim Hrovat"
                            width={224}
                            height={224}
                            priority
                            className="ring-hairline relative size-56 rounded-2xl object-cover ring-1"
                        />
                    </div>
                </Reveal>

                <div>
                    <Reveal delay={80}>
                        <h2 className="text-3xl text-balance md:text-4xl">
                            {intro.lead}
                            <span className="text-primary">.</span>
                        </h2>
                    </Reveal>

                    <Reveal delay={140}>
                        <p className="text-muted-foreground mt-6 text-lg">
                            {intro.body}
                        </p>
                    </Reveal>

                    <Reveal delay={200}>
                        <p className="text-muted-foreground mt-4 text-lg">
                            {intro.closing}
                        </p>
                    </Reveal>

                    <Reveal delay={260}>
                        <Separator className="mt-10" />
                        <dl className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2">
                            {facts.map(({ label, value, icon: Icon }) => (
                                <div key={label} className="flex gap-3">
                                    <Icon
                                        className="text-primary mt-0.5 size-4 shrink-0"
                                        aria-hidden
                                    />
                                    <div>
                                        <dt className="eyebrow">{label}</dt>
                                        <dd className="mt-1.5 text-sm">
                                            {value}
                                        </dd>
                                    </div>
                                </div>
                            ))}
                        </dl>
                    </Reveal>
                </div>
            </div>
        </Section>
    );
}
