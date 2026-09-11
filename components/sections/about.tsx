import { MapPin } from 'lucide-react';
import Image from 'next/image';

import Reveal from '@/components/reveal';
import Section from '@/components/section';
import { intro, person } from '@/lib/site';

export default function About() {
    return (
        <Section id="about" eyebrow="About">
            {/* Portrait over prose, both centred on the page's axis, rather
                than a portrait-left / text-right split. */}
            <div className="flex flex-col items-center text-center">
                <Reveal>
                    <div className="group relative w-fit">
                        {/* Offset frame — the block of colour sits behind and
                            closes the gap on hover. */}
                        <div
                            aria-hidden
                            className="bg-primary/25 absolute -inset-3 rounded-3xl transition-transform duration-500 ease-[var(--ease-settle)] group-hover:translate-x-1 group-hover:translate-y-1"
                        />
                        {/* Plain next/image: the portrait is the largest asset
                            on the page and worth keeping optimised. */}
                        <Image
                            src="/images/portrait.png"
                            alt="Tim Hrovat"
                            width={224}
                            height={224}
                            priority
                            className="ring-hairline relative size-44 rounded-3xl object-cover ring-1 md:size-52"
                        />
                    </div>
                </Reveal>

                <Reveal delay={80}>
                    <h2 className="mt-12 max-w-2xl text-3xl text-balance md:text-4xl">
                        {intro.lead}
                        <span className="text-primary">.</span>
                    </h2>
                </Reveal>

                <Reveal delay={140}>
                    <p className="text-muted-foreground mt-6 max-w-2xl text-lg text-pretty">
                        {intro.body}
                    </p>
                </Reveal>

                <Reveal delay={200}>
                    <p className="text-muted-foreground mt-4 max-w-2xl text-lg text-pretty">
                        {intro.closing}
                    </p>
                </Reveal>

                {/* One fact, not four. Focus, Studying and Since all repeated
                    something the prose or the timeline already says. */}
                <Reveal delay={260}>
                    <p className="text-muted-foreground mt-10 flex items-center justify-center gap-2 font-mono text-xs tracking-wider uppercase">
                        <MapPin
                            className="text-highlight size-3.5"
                            aria-hidden
                        />
                        {person.location}
                    </p>
                </Reveal>
            </div>
        </Section>
    );
}
