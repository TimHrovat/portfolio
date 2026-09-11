'use client';

import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';

export default function ExperienceCardContent({
    children,
}: {
    children: ReactNode;
}) {
    const card = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const element = card.current;

        if (!element) {
            return;
        }

        // Reveal on viewport entry rather than at a centred band. This card is
        // the last thing on the page, so at maximum scroll it still sits well
        // below the middle — a centred band would never be reached.
        const observer = new IntersectionObserver(([entry]) =>
            setVisible(entry.isIntersecting),
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, []);

    // min-h-px keeps the collapsed element observable: Chrome never reports a
    // zero-height target as intersecting.
    return (
        <div
            ref={card}
            className={`grid min-h-px transition-[grid-template-rows] duration-300 ease-in-out ${
                visible ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
            }`}
        >
            <div className="flex flex-col gap-2 overflow-hidden">
                {children}
            </div>
        </div>
    );
}
