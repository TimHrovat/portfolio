'use client';

import { ChevronDown } from 'lucide-react';
import { useId, useState } from 'react';

import { cn } from '@/lib/utils';

/**
 * The featured role's detail, folded away behind a button until it is asked
 * for. Open, it is a long panel; shut, it is a pill on the same glass material,
 * so the section keeps its rhythm and the reader chooses when to spend the
 * space.
 *
 * One surface the whole time rather than a button that swaps for a box: it
 * grows from pill to panel, which is why the radius and the width are
 * transitioned alongside the height. Stacking a second translucent surface on
 * the first would have muddied both.
 *
 * The height animation is the `0fr` to `1fr` grid-row trick. Transitioning
 * `height` needs a measured pixel value, which means reading layout on every
 * open and re-reading it whenever the content reflows; a grid row interpolates
 * to the content's own height with no measuring at all.
 */
export default function RoleHighlights({
    label,
    groups,
}: {
    /** The toggle's text. Passed in rather than looked up here, so the CV copy
     *  never has to reach the client bundle. */
    label: string;
    groups: { label: string; items: string[] }[];
}) {
    const [open, setOpen] = useState(false);
    const region = useId();

    return (
        <div
            data-elevated="true"
            className={cn(
                // One radius for both states, deliberately. CSS clamps a
                // corner radius to half the shorter side, so at the shut
                // height of 3rem this renders as a true pill and unrolls into
                // a 3rem box as the panel grows. Transitioning between an
                // explicit `rounded-full` and this would spend almost the
                // whole duration at a radius still large enough to clamp, then
                // snap at the end.
                'glass mt-8 w-full overflow-hidden rounded-3xl text-left',
                'transition-[max-width] duration-500 ease-[var(--ease-settle)]',
                open ? 'max-w-3xl' : 'max-w-[19rem]',
            )}
        >
            <button
                type="button"
                aria-expanded={open}
                aria-controls={region}
                onClick={() => setOpen((previous) => !previous)}
                className="text-foreground/85 hover:text-foreground flex w-full items-center justify-center gap-2 px-6 py-3.5 text-sm font-medium transition-colors duration-200 active:scale-[0.99]"
            >
                {label}
                <ChevronDown
                    aria-hidden
                    className={cn(
                        'size-4 transition-transform duration-500 ease-[var(--ease-settle)]',
                        open && 'rotate-180',
                    )}
                />
            </button>

            <div
                id={region}
                className={cn(
                    'grid transition-[grid-template-rows] duration-500 ease-[var(--ease-settle)]',
                    open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
                )}
            >
                <div className="overflow-hidden">
                    {/* A label column rather than one flat list: the groups are
                        the point, and the eye can take three of those where it
                        would skim nine bullets. Left-aligned inside the centred
                        panel, since these lines are too long to centre without
                        the ragged edges reading as a mistake. */}
                    <dl className="flex flex-col gap-7 px-6 pt-2 pb-7 sm:px-8 sm:pb-8">
                        {groups.map((group) => (
                            <div
                                key={group.label}
                                className="grid gap-x-8 gap-y-3 sm:grid-cols-[11rem_1fr]"
                            >
                                <dt className="eyebrow sm:pt-1">
                                    {group.label}
                                </dt>
                                <dd>
                                    <ul className="flex flex-col gap-2.5">
                                        {group.items.map((item) => (
                                            <li
                                                key={item}
                                                className="text-muted-foreground flex gap-2.5 text-sm leading-relaxed text-pretty"
                                            >
                                                <span
                                                    aria-hidden
                                                    className="bg-highlight mt-2 size-1.5 shrink-0 rounded-full"
                                                />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    );
}
