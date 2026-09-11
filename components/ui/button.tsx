import type { ComponentProps, ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

/*
 * Hand-rolled, not generated. Pass `href` to get an anchor and nothing to get a
 * button — which is why there is no `asChild`: every call site here wanted
 * exactly one of those two, and a polymorphic slot was paying for flexibility
 * nobody used.
 */
const buttonVariants = cva(
    [
        'inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-transparent',
        'text-sm leading-none font-medium whitespace-nowrap select-none',
        'outline-none focus-visible:ring-[3px] focus-visible:ring-[color-mix(in_oklab,var(--ring)_45%,transparent)]',
        'disabled:pointer-events-none disabled:opacity-50',
        // Feedback lands on pointer-down, and fast. Colour settles slower than
        // the press, so the two are transitioned separately.
        'transition-[background-color,border-color,color,box-shadow,opacity] duration-200 ease-[var(--ease-settle)]',
        'active:scale-[0.97] active:transition-transform active:duration-75',
        '[&_svg]:pointer-events-none [&_svg]:shrink-0',
        "[&_svg:not([class*='size-'])]:size-4",
    ],
    {
        variants: {
            variant: {
                primary:
                    'bg-primary text-primary-foreground hover:brightness-110 shadow-[0_1px_2px_color-mix(in_oklab,var(--foreground)_12%,transparent)]',
                secondary:
                    'bg-surface text-foreground ring-hairline ring-1 ring-inset hover:bg-surface-strong',
                ghost: 'text-muted-foreground hover:bg-surface-strong hover:text-foreground',
                outline:
                    'border-hairline text-foreground hover:bg-surface-strong',
                link: 'text-primary rounded-none px-0 underline-offset-4 hover:underline',
                // Translucent material, pairs with the floating nav.
                glass: 'glass text-foreground hover:brightness-105',
            },
            size: {
                sm: 'h-8 px-3 text-[0.8125rem]',
                md: 'h-9 px-4',
                lg: 'h-10 px-5',
                xl: 'h-12 px-6 text-[0.9375rem]',
                icon: 'size-9 px-0',
                'icon-sm': 'size-8 px-0',
            },
        },
        defaultVariants: { variant: 'primary', size: 'md' },
    },
);

type ButtonProps = VariantProps<typeof buttonVariants> & {
    className?: string;
    children?: ReactNode;
} & Omit<ComponentProps<'button'>, 'ref'> &
    Pick<ComponentProps<'a'>, 'href' | 'target' | 'rel' | 'download'>;

function Button({
    className,
    variant,
    size,
    href,
    target,
    rel,
    download,
    ...props
}: ButtonProps) {
    const classes = cn(buttonVariants({ variant, size }), className);

    if (href !== undefined) {
        return (
            <a
                href={href}
                target={target}
                rel={rel}
                download={download}
                className={classes}
                {...(props as ComponentProps<'a'>)}
            />
        );
    }

    return <button type="button" className={classes} {...props} />;
}

export { Button, buttonVariants };
