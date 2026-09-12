import type { ComponentProps, ElementType } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
    'inline-flex w-fit shrink-0 items-center justify-center gap-2 rounded-full border border-transparent whitespace-nowrap',
    {
        variants: {
            variant: {
                // Technology chip: the same material as the nav and the
                // cards, at a smaller blur — there are twenty-seven of these
                // and a 20px backdrop blur on a 36px pill costs the same as
                // one on a card without looking any different. The border is
                // restated because the base `border-transparent` above sits
                // in the utilities layer and would otherwise win over the
                // one `.glass` sets. `select-none` because the chips drift past
                // in the stack strip, and a drag across a moving row would
                // otherwise leave it highlighted.
                tech: 'glass border-foreground/10 text-foreground select-none [--glass-blur:12px]',
                // Soft tint of the palette's second colour, for "current".
                accent: 'bg-highlight/15 text-highlight',
                // Mono metadata: statuses, stack labels.
                meta: 'border-hairline text-muted-foreground font-mono tracking-wider uppercase',
                solid: 'bg-primary text-primary-foreground',
            },
            size: {
                sm: 'h-6 px-2.5 text-[0.6875rem]',
                md: 'h-7 px-3 text-xs',
                lg: 'h-9 gap-2.5 py-2 pr-4 pl-2.5 text-sm',
            },
        },
        defaultVariants: { variant: 'meta', size: 'md' },
    },
);

type BadgeProps = VariantProps<typeof badgeVariants> & {
    /** `li` inside a list, `span` anywhere else. */
    as?: ElementType;
} & ComponentProps<'span'>;

function Badge({
    className,
    variant,
    size,
    as: Tag = 'span',
    ...props
}: BadgeProps) {
    return (
        <Tag
            className={cn(badgeVariants({ variant, size }), className)}
            {...props}
        />
    );
}

export { Badge, badgeVariants };
