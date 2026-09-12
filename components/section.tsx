import type { ReactNode } from 'react';

import Reveal from '@/components/reveal';
import { cn } from '@/lib/utils';

/**
 * Section shell. The header block is centred — eyebrow, title and lead sit on
 * the page's axis rather than against its left edge — while the body below is
 * left to each section, since a chart or a grid of cards still reads better
 * aligned.
 *
 * The title's trailing period is drawn here rather than passed in. It is
 * punctuation in the accent colour, not part of the sentence, so it has no
 * business in a translation — see the i18n section of CLAUDE.md.
 */
export default function Section({
    id,
    eyebrow,
    title,
    lead,
    children,
    className,
}: {
    id: string;
    eyebrow: string;
    title?: string;
    lead?: string;
    children: ReactNode;
    className?: string;
}) {
    return (
        <section
            id={id}
            className={cn(
                'mx-auto w-full max-w-5xl scroll-mt-28 px-6 py-16 md:py-20',
                className,
            )}
        >
            <Reveal className="mb-8 flex flex-col items-center text-center md:mb-12">
                <p className="eyebrow flex items-center gap-3">
                    <span className="bg-highlight h-px w-8" aria-hidden />
                    {eyebrow}
                    <span className="bg-highlight h-px w-8" aria-hidden />
                </p>
                {title ? (
                    <h2 className="mt-5 max-w-2xl text-4xl text-balance md:text-5xl">
                        {title}
                        <span className="text-primary">.</span>
                    </h2>
                ) : null}
                {lead ? (
                    <p className="text-muted-foreground mt-5 max-w-xl text-sm text-balance">
                        {lead}
                    </p>
                ) : null}
            </Reveal>
            {children}
        </section>
    );
}
