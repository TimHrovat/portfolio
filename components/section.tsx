import type { ReactNode } from 'react';

import Reveal from '@/components/reveal';
import { cn } from '@/lib/utils';

export default function Section({
    id,
    eyebrow,
    title,
    children,
    className,
}: {
    id: string;
    eyebrow: string;
    title?: ReactNode;
    children: ReactNode;
    className?: string;
}) {
    return (
        <section
            id={id}
            className={cn(
                'mx-auto w-full max-w-5xl scroll-mt-28 px-6 py-24 md:py-32',
                className,
            )}
        >
            <Reveal className="mb-12 md:mb-16">
                <p className="eyebrow flex items-center gap-3">
                    <span className="bg-primary h-px w-8" aria-hidden />
                    {eyebrow}
                </p>
                {title ? (
                    <h2 className="mt-5 max-w-2xl text-4xl text-balance md:text-5xl">
                        {title}
                    </h2>
                ) : null}
            </Reveal>
            {children}
        </section>
    );
}
