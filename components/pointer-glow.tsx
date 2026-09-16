'use client';

import { useEffect, useRef } from 'react';

/**
 * A soft halo that follows the cursor behind the page.
 *
 * The position is written as `--glow-x` / `--glow-y` on the glow element
 * itself, never on <html>. Custom properties inherit, so a variable changed on
 * the root marks every element on the page for a style recalculation — once
 * per pointer frame, that is most of what made the page feel heavy while the
 * cursor moved. On a leaf element it costs that element alone.
 *
 * Skipped on coarse pointers (there is no cursor to follow) and under reduced
 * motion, where a viewport-sized moving background is exactly the kind of
 * effect that setting exists to suppress.
 */
export default function PointerGlow() {
    const element = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const glow = element.current;

        const interactive =
            window.matchMedia('(pointer: fine)').matches &&
            !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (!glow || !interactive) {
            return;
        }

        let pointer: { x: number; y: number } | null = null;
        let frame = 0;

        function paint(): void {
            frame = 0;

            if (!pointer) {
                return;
            }

            glow!.style.setProperty('--glow-x', `${pointer.x}px`);
            glow!.style.setProperty('--glow-y', `${pointer.y}px`);
            glow!.dataset.active = 'true';
        }

        function onMove(event: PointerEvent): void {
            pointer = { x: event.clientX, y: event.clientY };

            if (!frame) {
                frame = requestAnimationFrame(paint);
            }
        }

        function onLeave(): void {
            delete glow!.dataset.active;
        }

        window.addEventListener('pointermove', onMove, { passive: true });
        document.addEventListener('pointerleave', onLeave);

        return () => {
            window.removeEventListener('pointermove', onMove);
            document.removeEventListener('pointerleave', onLeave);

            if (frame) {
                cancelAnimationFrame(frame);
            }
        };
    }, []);

    return <div ref={element} aria-hidden className="pointer-glow" />;
}
