'use client';

import { useId, useState } from 'react';

import { cn } from '@/lib/utils';

/**
 * A project's summary, clamped to four lines on a phone with a toggle for the
 * rest. The cards there sit in a swipeable row, and a full summary made each
 * one taller than most of the screen. From `md` up nothing is clamped and the
 * toggle is not rendered visible.
 *
 * The clamp is visual only: the whole summary stays in the text a screen
 * reader reads, so the toggle is for sighted readers and says so by
 * controlling the paragraph it expands.
 *
 * The labels are passed in so the projects namespace stays off the client.
 */
export default function ProjectSummary({
    text,
    moreLabel,
    lessLabel,
}: {
    text: string;
    moreLabel: string;
    lessLabel: string;
}) {
    const [open, setOpen] = useState(false);
    const id = useId();

    return (
        <div className="mt-2 flex-1 sm:mt-3">
            <p
                id={id}
                className={cn(
                    'text-muted-foreground text-sm text-pretty md:line-clamp-none',
                    !open && 'line-clamp-4',
                )}
            >
                {text}
            </p>
            <button
                type="button"
                aria-expanded={open}
                aria-controls={id}
                onClick={() => setOpen((previous) => !previous)}
                className="text-foreground/85 hover:text-foreground relative z-10 mt-1.5 text-sm font-medium underline-offset-4 hover:underline md:hidden"
            >
                {open ? lessLabel : moreLabel}
            </button>
        </div>
    );
}
