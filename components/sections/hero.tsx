import { ArrowDown, ArrowDownToLine, Mail } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { intro, person } from '@/lib/site';

export default function Hero() {
    return (
        <section
            id="top"
            className="relative flex min-h-[100svh] items-center overflow-hidden px-6 pt-32 pb-20"
        >
            {/* Static ambient wash — present even without a pointer. */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-10"
                style={{
                    background:
                        'radial-gradient(60rem 40rem at 50% -10%, color-mix(in oklab, var(--primary) calc(var(--glow-strength) * 100%), transparent), transparent 70%)',
                }}
            />

            <div className="mx-auto w-full max-w-5xl">
                <p
                    className="eyebrow animate-in fade-in slide-in-from-bottom-4 fill-mode-both flex flex-wrap items-center gap-x-3 gap-y-1 duration-700"
                    style={{ animationDelay: '80ms' }}
                >
                    <span>{person.role}</span>
                    <span className="bg-hairline h-1 w-1 rounded-full" />
                    <span>{person.location}</span>
                </p>

                <h1
                    className="animate-in fade-in slide-in-from-bottom-6 fill-mode-both mt-6 text-[clamp(3.75rem,12vw_+_1rem,12rem)] leading-[0.85] tracking-[-0.04em] duration-1000"
                    style={{ animationDelay: '160ms' }}
                >
                    Tim
                    <br />
                    Hrovat
                    {/* Terminal caret. The blink is killed by the global
                        reduced-motion rule. */}
                    <span
                        aria-hidden
                        className="bg-primary caret-blink ml-[0.14em] inline-block h-[0.6em] w-[0.34em] translate-y-[0.01em] rounded-[2px]"
                    />
                </h1>

                <p
                    className="animate-in fade-in slide-in-from-bottom-6 fill-mode-both text-muted-foreground mt-8 max-w-xl text-lg text-balance md:text-xl"
                    style={{ animationDelay: '280ms' }}
                >
                    {intro.lead}
                    <span className="text-foreground">.</span>
                </p>

                <div
                    className="animate-in fade-in slide-in-from-bottom-6 fill-mode-both mt-10 flex flex-wrap items-center gap-3 duration-700"
                    style={{ animationDelay: '380ms' }}
                >
                    <Button asChild size="xl" shape="pill">
                        <a href={`mailto:${person.email}`}>
                            <Mail />
                            Get in touch
                        </a>
                    </Button>
                    <Button asChild variant="outline" size="xl" shape="pill">
                        <a href={person.cv}>
                            <ArrowDownToLine />
                            Download CV
                        </a>
                    </Button>
                    {person.available ? (
                        <span className="text-muted-foreground ml-1 flex items-center gap-2 font-mono text-xs">
                            <span className="relative flex h-2 w-2">
                                <span className="bg-primary absolute inline-flex h-full w-full animate-ping rounded-full opacity-60" />
                                <span className="bg-primary relative inline-flex h-2 w-2 rounded-full" />
                            </span>
                            Open to opportunities
                        </span>
                    ) : null}
                </div>
            </div>

            <a
                href="#about"
                aria-label="Scroll to about"
                className="text-muted-foreground hover:text-foreground absolute inset-x-0 bottom-8 mx-auto flex w-fit flex-col items-center gap-2 font-mono text-[0.625rem] tracking-[0.2em] uppercase transition-colors"
            >
                Scroll
                <ArrowDown className="size-3.5 animate-bounce" aria-hidden />
            </a>
        </section>
    );
}
