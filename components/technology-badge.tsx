import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

export default function TechnologyBadge({
    children,
    className,
}: {
    children: ReactNode;
    className?: string;
}) {
    return (
        <div
            className={cn(
                'cursor-pointer rounded-full px-3 py-1.5',
                'bg-surface-secondary-default-bg',
                'flex items-center gap-2.5 font-semibold',
                className,
            )}
        >
            {children}
        </div>
    );
}
