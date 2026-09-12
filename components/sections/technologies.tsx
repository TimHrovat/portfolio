'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useSyncExternalStore } from 'react';

import Reveal from '@/components/reveal';
import Section from '@/components/section';
import { Badge } from '@/components/ui/badge';
import { technologies, type Technology } from '@/lib/site';
import { cn } from '@/lib/utils';

const MAX_DISTANCE = 220;
const MAX_SCALE = 1.14;
const MAX_LIFT = 6;

/**
 * The chips are shuffled once a day, so the grid is not frozen in whatever
 * order the array happens to be in. The seed is the viewer's own calendar date
 * with no time component, so every reload on the same day lays out identically
 * and the order turns over at their midnight.
 *
 * It runs after mount rather than during render, because the page is static:
 * a `new Date()` on the server would be frozen at build time and would
 * disagree with the browser's date on every day but one, which is a hydration
 * mismatch. The section is four screens down and only fades in on
 * intersection, so the reorder is never on screen when it happens.
 */
function seedFromToday(): number {
    const now = new Date();
    const key = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;

    // FNV-1a. Any cheap avalanche would do; this one is short and has no
    // pathological inputs for a ten-character key.
    let hash = 2166136261;

    for (let index = 0; index < key.length; index++) {
        hash ^= key.charCodeAt(index);
        hash = Math.imul(hash, 16777619);
    }

    return hash >>> 0;
}

/** mulberry32 — a seeded PRNG, since Math.random cannot be seeded. */
function randomFrom(seed: number): () => number {
    let state = seed;

    return () => {
        state = (state + 0x6d2b79f5) | 0;

        let t = Math.imul(state ^ (state >>> 15), 1 | state);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;

        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

function shuffledForToday<T>(items: readonly T[]): T[] {
    const random = randomFrom(seedFromToday());
    const shuffled = [...items];

    for (let index = shuffled.length - 1; index > 0; index--) {
        const swap = Math.floor(random() * (index + 1));
        [shuffled[index], shuffled[swap]] = [shuffled[swap], shuffled[index]];
    }

    return shuffled;
}

/**
 * Read through `useSyncExternalStore` rather than state set from an effect:
 * the server snapshot is the source order, the client snapshot is today's, and
 * React swaps them at hydration with no mismatch and no setState in an effect.
 *
 * The result is memoised because `getSnapshot` has to return a stable
 * reference — a fresh array every call would loop. Memoising also means a tab
 * left open overnight keeps the order it rendered with, rather than
 * rearranging itself under the reader's cursor.
 */
let todaysOrder: Technology[] | null = null;

function getClientOrder(): Technology[] {
    todaysOrder ??= shuffledForToday(technologies);

    return todaysOrder;
}

function getServerOrder(): Technology[] {
    return technologies;
}

/** The order is fixed for the session, so there is nothing to subscribe to. */
function subscribe(): () => void {
    return () => {};
}

export default function Technologies() {
    const t = useTranslations('stack');
    const grid = useRef<HTMLUListElement>(null);
    // Source order on the server and for the first paint; today's order from
    // the moment the browser takes over.
    const ordered = useSyncExternalStore(
        subscribe,
        getClientOrder,
        getServerOrder,
    );

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
    }, [ordered]);

    return (
        <Section id="stack" eyebrow={t('eyebrow')} title={t('title')}>
            <Reveal>
                <ul
                    ref={grid}
                    className="flex flex-wrap justify-center gap-2.5"
                    aria-label={t('listLabel')}
                >
                    {ordered.map(({ id, plate }) => (
                        <Badge
                            as="li"
                            key={id}
                            variant="tech"
                            size="lg"
                            className="will-change-transform"
                            style={{
                                transition:
                                    'transform 350ms var(--ease-settle), border-color 350ms linear',
                            }}
                        >
                            <Image
                                src={`/images/technology-icons/${id}.svg`}
                                alt=""
                                width={20}
                                height={20}
                                className={cn(
                                    'h-5 w-5 object-contain',
                                    plate && 'bg-logo-plate rounded-full p-0.5',
                                )}
                                unoptimized
                            />
                            {t(`technologies.${id}`)}
                        </Badge>
                    ))}
                </ul>
            </Reveal>
        </Section>
    );
}
