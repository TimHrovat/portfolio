import { ArrowDown, ArrowDownToLine, Mail } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import { Button } from '@/components/ui/button';
import { person } from '@/lib/site';

export default async function Hero() {
    const t = await getTranslations('hero');
    const who = await getTranslations('person');

    return (
        <section
            id="top"
            className="relative flex min-h-[100svh] items-center overflow-hidden px-6 pt-[calc(8rem+env(safe-area-inset-top))] pb-20"
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

            <div className="mx-auto flex w-full max-w-5xl flex-col items-center text-center">
                <p
                    className="eyebrow animate-in fade-in slide-in-from-bottom-4 fill-mode-both flex flex-wrap items-center justify-center gap-x-3 gap-y-1 duration-700"
                    style={{ animationDelay: '80ms' }}
                >
                    <span>{who('role')}</span>
                </p>

                {/* Two lines rather than one wrapped string: the break is
                    typography, so it stays here and the name stays a name. */}
                <h1
                    className="animate-in fade-in slide-in-from-bottom-6 fill-mode-both mt-6 text-[clamp(3.75rem,12vw_+_1rem,12rem)] leading-[0.85] tracking-[-0.04em] duration-1000"
                    style={{ animationDelay: '160ms' }}
                >
                    {t('firstName')}
                    <br />
                    {t('lastName')}
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
                    {who('tagline')}
                    <span className="text-foreground">.</span>
                </p>

                <div
                    className="animate-in fade-in slide-in-from-bottom-6 fill-mode-both mt-10 flex flex-wrap items-center justify-center gap-3 duration-700"
                    style={{ animationDelay: '380ms' }}
                >
                    <Button href={`mailto:${who('email')}`} size="xl">
                        <Mail />
                        {t('emailCta')}
                    </Button>
                    {/* `download` so the label is the truth: without it the
                        browser opens the PDF in a tab instead. */}
                    <Button
                        href={person.cv}
                        download
                        variant="secondary"
                        size="xl"
                    >
                        <ArrowDownToLine />
                        {t('cvCta')}
                    </Button>
                </div>

                {/* The one thing a recruiter is looking for before they read
                    anything else. Its own row rather than a third item beside
                    the buttons, so it is not the first thing to wrap away on a
                    narrow screen. */}
                {person.available ? (
                    <p
                        className="text-muted-foreground animate-in fade-in fill-mode-both mt-6 flex items-center gap-2 font-mono text-xs duration-700"
                        style={{ animationDelay: '520ms' }}
                    >
                        <span className="relative flex h-2 w-2" aria-hidden>
                            <span className="bg-primary absolute inline-flex h-full w-full animate-ping rounded-full opacity-60" />
                            <span className="bg-primary relative inline-flex h-2 w-2 rounded-full" />
                        </span>
                        {t('availability')}
                    </p>
                ) : null}
            </div>

            <a
                href="#about"
                aria-label={t('scrollLabel')}
                className="text-muted-foreground hover:text-foreground absolute inset-x-0 bottom-8 mx-auto flex w-fit flex-col items-center gap-2 font-mono text-[0.625rem] tracking-[0.2em] uppercase transition-colors"
            >
                {t('scroll')}
                <ArrowDown className="size-3.5 animate-bounce" aria-hidden />
            </a>
        </section>
    );
}
