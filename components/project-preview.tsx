import { Hash, KeyRound, QrCode, Smartphone, Usb } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import type { CSSProperties, ReactNode } from 'react';

import InView from '@/components/in-view';
import type { Project } from '@/lib/site';
import { cn } from '@/lib/utils';

/**
 * A small looping picture of what each project does, drawn in markup and
 * animated in CSS: no screenshots to keep current, and every colour is a
 * token, so it follows the scheme like the rest of the page.
 *
 * They are decoration — `aria-hidden`, since the card's summary already says
 * everything they show — and they pause while scrolled away (`InView`).
 *
 * THE BASE STYLES ARE THE FINISHED FRAME: the solved board, the drawn line,
 * the filled timetable. The keyframes are only attached under
 * `prefers-reduced-motion: no-preference` in globals.css, so with motion
 * reduced every scene is a meaningful still rather than an empty box.
 */
export default async function ProjectPreview({
    id,
    className,
}: {
    id: Project['id'];
    className?: string;
}) {
    const t = await getTranslations('projects.items');

    const scenes: Record<Project['id'], ReactNode> = {
        easistentLanding: (
            <SignInScene methods={t.raw('easistentLanding.demo') as string[]} />
        ),
        mediaAttention: <AttentionScene />,
        uplearn: <TimetableScene />,
        wordleEngine: (
            <WordleScene guesses={t.raw('wordleEngine.demo') as string[]} />
        ),
        sideScrollerEngine: <ScrollerScene />,
    };

    return (
        <InView
            className={cn(
                'scene bg-foreground/[0.025] ring-foreground/10 relative flex h-36 items-center justify-center overflow-hidden rounded-xl ring-1',
                className,
            )}
        >
            {scenes[id]}
        </InView>
    );
}

/** Sets a stagger step for the scene's keyframes to multiply. */
function step(index: number): CSSProperties {
    return { '--step': index } as CSSProperties;
}

type TileState = 'correct' | 'present' | 'absent';

/**
 * Wordle: three guesses flip in row by row, coloured against the last one the
 * way the game colours them — exact letters first, then letters present
 * elsewhere, each letter of the answer used at most once.
 */
function WordleScene({ guesses }: { guesses: string[] }) {
    const answer = guesses[guesses.length - 1];

    const scored = guesses.map((guess) => {
        const states = [...guess].map((letter, index): TileState =>
            answer[index] === letter ? 'correct' : 'absent',
        );
        const left = [...answer].filter(
            (_, index) => states[index] !== 'correct',
        );

        [...guess].forEach((letter, index) => {
            const found = left.indexOf(letter);

            if (states[index] !== 'correct' && found !== -1) {
                states[index] = 'present';
                left.splice(found, 1);
            }
        });

        return [...guess].map((letter, index) => ({
            letter,
            state: states[index],
        }));
    });

    return (
        <div className="grid gap-1.5">
            {scored.map((row, rowIndex) => (
                <div key={rowIndex} className="flex gap-1.5">
                    {row.map((tile, index) => (
                        <span
                            key={index}
                            data-state={tile.state}
                            className="wordle-tile"
                            style={step(rowIndex * 6 + index)}
                        >
                            {tile.letter}
                        </span>
                    ))}
                </div>
            ))}
        </div>
    );
}

/**
 * Media Attention Analyzer: an attention line draws across, the area under it
 * fills, and the two peaks it would find get marked.
 */
const ATTENTION = [
    18, 22, 20, 26, 24, 30, 58, 84, 52, 34, 28, 30, 26, 32, 38, 34, 46, 72, 60,
    40, 32, 28, 30, 26,
];

function AttentionScene() {
    const points = ATTENTION.map((value, index) => ({
        x: (index / (ATTENTION.length - 1)) * 100,
        y: 100 - value,
    }));
    const line = points.map(({ x, y }) => `${x},${y}`).join(' ');
    const peaks = [7, 17].map((index) => points[index]);

    return (
        <div className="absolute inset-x-5 top-6 bottom-5">
            <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="attention-plot size-full overflow-visible"
            >
                <polygon
                    points={`0,100 ${line} 100,100`}
                    className="attention-area fill-primary/10"
                />
                <polyline
                    points={line}
                    vectorEffect="non-scaling-stroke"
                    className="stroke-primary fill-none"
                    strokeWidth={2}
                    strokeLinejoin="round"
                    strokeLinecap="round"
                />
            </svg>
            {/* Dots are HTML over the stretched SVG, so they stay round. */}
            {peaks.map((peak, index) => (
                <span
                    key={index}
                    className="attention-peak"
                    style={{
                        left: `${peak.x}%`,
                        top: `${peak.y}%`,
                        ...step(index),
                    }}
                />
            ))}
        </div>
    );
}

/**
 * UpLearn: a week's timetable fills in lesson by lesson. The pattern is fixed
 * rather than random, so the server and the client agree on it.
 */
const TIMETABLE = [
    [1, 2, 0, 1, 3],
    [2, 1, 3, 0, 1],
    [0, 3, 1, 2, 0],
    [3, 0, 2, 1, 2],
];

/** Lessons numbered in reading order, skipping the free periods. */
const CELLS = TIMETABLE.flat().map((subject, index, all) => ({
    subject,
    order: all.slice(0, index).filter(Boolean).length,
}));

function TimetableScene() {
    return (
        <div className="grid w-52 grid-cols-5 gap-1.5">
            {CELLS.map(({ subject, order }, index) => (
                <span
                    key={index}
                    className="bg-foreground/[0.05] relative h-5 overflow-hidden rounded-[4px]"
                >
                    {subject ? (
                        <span
                            data-subject={subject}
                            className="timetable-lesson"
                            style={step(order)}
                        />
                    ) : null}
                </span>
            ))}
        </div>
    );
}

/**
 * Side-Scroller Engine: the ground and a row of coins scroll past while the
 * sprite jumps in place, which is all a side-scroller is.
 */
function ScrollerScene() {
    return (
        <>
            <div className="scroller-coins absolute top-10 h-3" />
            <div className="scroller-ground absolute bottom-0 h-9" />
            <span className="scroller-sprite bg-primary absolute bottom-9 left-[28%] size-5 rounded-[4px]" />
        </>
    );
}

/**
 * eAsistent's sign-in: one form, the ways in cycling through it. The list
 * repeats its first entry at the end so the loop lands where it began.
 */
const METHOD_ICONS = [KeyRound, Smartphone, Usb, QrCode, Hash];

function SignInScene({ methods }: { methods: string[] }) {
    const rows = [...methods, methods[0]];

    return (
        <div className="bg-background/60 ring-foreground/10 flex w-48 flex-col gap-2 rounded-lg p-3 ring-1">
            <span className="bg-foreground/10 h-1.5 w-16 rounded-full" />
            <span className="ring-foreground/10 h-6 overflow-hidden rounded-md ring-1">
                <span className="signin-methods flex flex-col">
                    {rows.map((method, index) => {
                        const Icon = METHOD_ICONS[index % METHOD_ICONS.length];

                        return (
                            <span
                                key={index}
                                className="text-foreground flex h-6 shrink-0 items-center gap-2 px-2 font-mono text-[0.625rem] tracking-wider uppercase"
                            >
                                <Icon className="text-highlight size-3" />
                                {method}
                            </span>
                        );
                    })}
                </span>
            </span>
            <span className="bg-primary signin-button relative h-6 overflow-hidden rounded-md" />
        </div>
    );
}
