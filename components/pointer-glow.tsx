'use client';

import { useEffect } from 'react';

/**
 * Tracks the cursor and publishes its position as CSS variables on <html>,
 * which the .pointer-glow layer reads. Writing variables rather than state
 * keeps the pointer entirely out of React's render path.
 *
 * Skipped on coarse pointers (there is no cursor to follow) and under reduced
 * motion, where a viewport-sized moving background is exactly the kind of
 * effect that setting exists to suppress.
 */
export default function PointerGlow() {
    useEffect(() => {
        const root = document.documentElement;

        const interactive =
            window.matchMedia('(pointer: fine)').matches &&
            !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (!interactive) {
            return;
        }

        let pointer: { x: number; y: number } | null = null;
        let frame = 0;

        function paint(): void {
            frame = 0;

            if (!pointer) {
                return;
            }

            root.style.setProperty('--pointer-x', `${pointer.x}px`);
            root.style.setProperty('--pointer-y', `${pointer.y}px`);
            root.style.setProperty('--pointer-active', '1');
        }

        function onMove(event: PointerEvent): void {
            pointer = { x: event.clientX, y: event.clientY };

            if (!frame) {
                frame = requestAnimationFrame(paint);
            }
        }

        function onLeave(): void {
            root.style.setProperty('--pointer-active', '0');
        }

        window.addEventListener('pointermove', onMove, { passive: true });
        document.addEventListener('pointerleave', onLeave);

        return () => {
            window.removeEventListener('pointermove', onMove);
            document.removeEventListener('pointerleave', onLeave);

            if (frame) {
                cancelAnimationFrame(frame);
            }

            root.style.removeProperty('--pointer-active');
        };
    }, []);

    return <div aria-hidden className="pointer-glow" />;
}
