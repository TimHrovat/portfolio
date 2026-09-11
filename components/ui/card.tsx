import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils';

/*
 * A surface. Deliberately thin: one container with padding and a hairline, and
 * the sections compose their own content inside it. The generated version had
 * seven sub-components and a slot system for a page with four cards on it.
 *
 * `glass` swaps the opaque fill for the same material the floating nav uses —
 * the page ground and the pointer glow blur through it instead of being hidden
 * by it. It carries its own border and shadow, so the hairline ring comes off.
 */
function Card({
    className,
    interactive = false,
    glass = false,
    ...props
}: ComponentProps<'div'> & { interactive?: boolean; glass?: boolean }) {
    return (
        <div
            // Cards always have content passing behind them, so the material
            // is at its elevated weight rather than the nav's thin resting one.
            data-elevated={glass ? 'true' : undefined}
            className={cn(
                'text-card-foreground relative flex flex-col overflow-hidden rounded-2xl p-6',
                glass ? 'glass' : 'bg-card ring-hairline ring-1',
                interactive && [
                    'transition-[box-shadow,scale,border-color] duration-200 ease-[var(--ease-settle)]',
                    'active:scale-[0.99]',
                    glass ? 'hover:border-primary/40' : 'hover:ring-primary/40',
                    // Warm wash arrives on hover rather than a hard swap.
                    "before:pointer-events-none before:absolute before:inset-0 before:opacity-0 before:transition-opacity before:duration-500 before:content-['']",
                    'before:bg-[radial-gradient(24rem_16rem_at_100%_0%,color-mix(in_oklab,var(--primary)_10%,transparent),transparent_70%)]',
                    'hover:before:opacity-100',
                ],
                className,
            )}
            {...props}
        />
    );
}

export { Card };
