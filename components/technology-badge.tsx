'use client';

import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

const MAX_DISTANCE = 256;
const BASE_SCALE = 1.0;
const MAX_SCALE_SIZE = 1.2;
const MAX_SCALE_BRIGHTNESS = 1.5;

export default function TechnologyBadge({
    children,
    className,
}: {
    children: ReactNode;
    className?: string;
}) {
    const badge = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState({ size: 1, brightness: 1 });

    useEffect(() => {
        function handleMouseMove(e: MouseEvent): void {
            const rect = badge.current?.getBoundingClientRect();

            if (!rect) {
                return;
            }

            const diffX = Math.abs(rect.x + rect.width / 2 - e.x);
            const diffY = Math.abs(rect.y + rect.height / 2 - e.y);

            const distance = Math.sqrt(diffX ** 2 + diffY ** 2);

            if (distance > MAX_DISTANCE) {
                setScale({ size: BASE_SCALE, brightness: BASE_SCALE });
                return;
            }

            const proximity = (MAX_DISTANCE - distance) / MAX_DISTANCE;

            setScale({
                size:
                    BASE_SCALE +
                    Math.pow(proximity, 2) * (MAX_SCALE_SIZE - BASE_SCALE),
                brightness:
                    BASE_SCALE +
                    Math.pow(proximity, 2) *
                        (MAX_SCALE_BRIGHTNESS - BASE_SCALE),
            });
        }

        document.addEventListener('mousemove', handleMouseMove);

        return () => document.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div
            ref={badge}
            className={cn(
                'cursor-pointer rounded-full px-3 py-1.5',
                'bg-surface-secondary-default-bg',
                'flex items-center gap-2.5 font-semibold',
                className,
            )}
            style={{
                transform: `scale(${scale.size})`,
                filter: `brightness(${scale.brightness})`,
            }}
        >
            {children}
        </div>
    );
}
