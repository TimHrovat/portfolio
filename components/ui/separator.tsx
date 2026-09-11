import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils';

/** A hairline rule. Decorative by default, so it is hidden from the a11y tree. */
function Separator({
    className,
    orientation = 'horizontal',
    ...props
}: ComponentProps<'div'> & { orientation?: 'horizontal' | 'vertical' }) {
    return (
        <div
            role="separator"
            aria-orientation={orientation}
            aria-hidden
            className={cn(
                'bg-hairline shrink-0',
                orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px',
                className,
            )}
            {...props}
        />
    );
}

export { Separator };
