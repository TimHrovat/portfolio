'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';

import Reveal from '@/components/reveal';
import Section from '@/components/section';
import { Badge } from '@/components/ui/badge';
import { technologies } from '@/lib/site';

const MAX_DISTANCE = 220;
const MAX_SCALE = 1.14;
const MAX_LIFT = 6;

export default function Technologies() {
    const grid = useRef<HTMLUListElement>(null);

    useEffect(() => {
        const node = grid.current;

        const interactive =
            window.matchMedia('(pointer: fine)').matches &&
            !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (!node || !interactive) {
            return;
        }

        const chips = [...node.children] as HTMLElement[];

        let pointer: { x: number; y: number } | null = null;
        let frame = 0;

        function paint(): void {
            frame = 0;

            if (!pointer) {
                return;
            }

            // Read every rect before writing any style, so the browser does a
            // single layout pass per frame rather than one per chip.
            const centres = chips.map((chip) => {
                const rect = chip.getBoundingClientRect();

                return {
                    x: rect.x + rect.width / 2,
                    y: rect.y + rect.height / 2,
                };
            });

            chips.forEach((chip, index) => {
                const diffX = centres[index].x - pointer!.x;
                const diffY = centres[index].y - pointer!.y;
                const distance = Math.hypot(diffX, diffY);

                if (distance > MAX_DISTANCE) {
                    chip.style.transform = '';
                    chip.style.borderColor = '';
                    return;
                }

                const proximity =
                    ((MAX_DISTANCE - distance) / MAX_DISTANCE) ** 2;

                chip.style.transform = `translateY(${
                    -proximity * MAX_LIFT
                }px) scale(${1 + proximity * (MAX_SCALE - 1)})`;
                chip.style.borderColor = `color-mix(in oklab, var(--highlight) ${Math.round(
                    proximity * 100,
                )}%, var(--hairline))`;
            });
        }

        function onMove(event: PointerEvent): void {
            pointer = { x: event.clientX, y: event.clientY };

            if (!frame) {
                frame = requestAnimationFrame(paint);
            }
        }

        function reset(): void {
            pointer = null;

            chips.forEach((chip) => {
                chip.style.transform = '';
                chip.style.borderColor = '';
            });
        }

        window.addEventListener('pointermove', onMove, { passive: true });
        document.addEventListener('pointerleave', reset);

        return () => {
            window.removeEventListener('pointermove', onMove);
            document.removeEventListener('pointerleave', reset);

            if (frame) {
                cancelAnimationFrame(frame);
            }
        };
    }, []);

    return (
        <Section
            id="stack"
            eyebrow="Stack"
            title={
                <>
                    Tools I reach for
                    <span className="text-primary">.</span>
                </>
            }
        >
            <Reveal>
                <ul
                    ref={grid}
                    className="flex flex-wrap gap-2.5"
                    aria-label="Technologies"
                >
                    {technologies.map(({ label, icon }) => (
                        <Badge
                            asChild
                            key={icon}
                            variant="tech"
                            size="lg"
                            className="will-change-transform"
                            style={{
                                transition:
                                    'transform 350ms var(--ease-settle), border-color 350ms linear',
                            }}
                        >
                            <li>
                                <Image
                                    src={`/images/technology-icons/${icon}`}
                                    alt=""
                                    width={20}
                                    height={20}
                                    className="h-5 w-5 object-contain"
                                    unoptimized
                                />
                                {label}
                            </li>
                        </Badge>
                    ))}
                </ul>
            </Reveal>
        </Section>
    );
}
