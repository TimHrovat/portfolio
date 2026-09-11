'use client';

import { useEffect, useRef, useState } from 'react';
import type { ElementType, ReactNode } from 'react';

import { cn } from '@/lib/utils';

/**
 * Fades content up as it enters the viewport, once. Falls back to visible
 * content when JS is unavailable — see the <noscript> rule in app/layout.tsx.
 */
export default function Reveal({
    children,
    delay = 0,
    className,
    as: Tag = 'div',
}: {
    children: ReactNode;
    delay?: number;
    className?: string;
    as?: ElementType;
}) {
    const element = useRef<HTMLElement>(null);
    const [shown, setShown] = useState(false);

    useEffect(() => {
        const node = element.current;

        if (!node) {
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) {
                    return;
                }

                setShown(true);
                observer.disconnect();
            },
            // Fire a little before the element is fully on screen so the
            // motion finishes as it settles into view.
            { rootMargin: '0px 0px -10% 0px' },
        );

        observer.observe(node);

        return () => observer.disconnect();
    }, []);

    return (
        <Tag
            ref={element}
            data-shown={shown}
            style={delay ? { transitionDelay: `${delay}ms` } : undefined}
            className={cn('reveal', className)}
        >
            {children}
        </Tag>
    );
}
