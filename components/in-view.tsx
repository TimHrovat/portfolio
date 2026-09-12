'use client';

import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';

/**
 * Marks whether its content is on screen, as `data-playing`, for as long as
 * it is mounted. The project previews read it to pause their loops while
 * scrolled away — five scenes animating off screen is work nobody sees.
 *
 * Unlike `Reveal` it never disconnects, because it has to switch back off.
 * Before hydration the attribute is absent and the scenes simply run.
 */
export default function InView({
    children,
    className,
}: {
    children: ReactNode;
    className?: string;
}) {
    const element = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const node = element.current;

        if (!node) {
            return;
        }

        const observer = new IntersectionObserver(([entry]) => {
            node.dataset.playing = entry.isIntersecting ? 'true' : 'false';
        });

        observer.observe(node);

        return () => observer.disconnect();
    }, []);

    return (
        <div ref={element} aria-hidden className={className}>
            {children}
        </div>
    );
}
