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
    groups: { label: string; items: { title: string; detail: string }[] }[];
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
                open ? 'max-w-4xl' : 'max-w-[19rem]',
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
                    {/* A group header spanning the full width, then its
                        entries in two columns, rather than the label sitting
                        in a column of its own. The groups are seven, four and
                        three entries long, and a side label against seven
                        rows reads as orphaned. */}
                    <dl className="flex flex-col gap-8 px-6 pt-2 pb-7 sm:px-8 sm:pb-8">
                        {groups.map((group) => (
                            <div key={group.label}>
                                <div className="flex items-center gap-4">
                                    <dt className="eyebrow shrink-0">
                                        {group.label}
                                    </dt>
                                    {/* Runs to the edge so the header reads as
                                        a divider, not a caption. */}
                                    <span
                                        aria-hidden
                                        className="bg-highlight/30 h-px flex-1"
                                    />
                                </div>
                                <dd className="mt-5 grid gap-x-8 gap-y-5 sm:grid-cols-2">
                                    {group.items.map((item) => (
                                        <div key={item.title}>
                                            {/* The title carries the weight;
                                                with fourteen of these a bullet
                                                in front of each is noise. */}
                                            <p className="text-foreground text-sm font-semibold">
                                                {item.title}
                                            </p>
                                            <p className="text-muted-foreground mt-1 text-sm leading-relaxed text-pretty">
                                                {item.detail}
                                            </p>
                                        </div>
                                    ))}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    );
}
