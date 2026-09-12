'use client';

import { ChevronDown } from 'lucide-react';
import { useId, useState } from 'react';

import { PREVIEW_PER_GROUP } from '@/lib/highlights';
import { cn } from '@/lib/utils';

/**
 * The featured role's detail. Every group is named on the page from the start
 * with the first couple of its entries under it, so the three dimensions of
 * the work — what was built, across which layers, and what happened beyond the
 * code — are all readable without a click. The remaining entries are folded
 * away, since fourteen of them at once is a wall nobody finishes.
 *
 * That is the whole trade: a reader who skims still leaves knowing the shape
 * of the role, and one who wants the specifics gets them one press later.
 *
 * The height animation is the `0fr` to `1fr` grid-row trick, one per group.
 * Transitioning `height` needs a measured pixel value, which means reading
 * layout on every open and re-reading it whenever the content reflows; a grid
 * row interpolates to the content's own height with no measuring at all. The
 * overflow rows carry their own top margin *inside* the clipped element, so
 * the gap they need when open collapses to nothing when shut.
 */
export default function RoleHighlights({
    groups,
    expandLabel,
    collapseLabel,
}: {
    groups: { label: string; items: { title: string; detail: string }[] }[];
    /** Both labels are passed in rather than looked up here, so the CV copy
     *  never has to reach the client bundle. */
    expandLabel: string;
    collapseLabel: string;
}) {
    const [open, setOpen] = useState(false);
    const region = useId();

    const overflowing = groups.filter(
        (group) => group.items.length > PREVIEW_PER_GROUP,
    );

    return (
        <div
            data-elevated="true"
            className="glass mt-8 w-full max-w-4xl overflow-hidden rounded-3xl text-left"
        >
            <div className="flex flex-col gap-8 px-6 pt-7 pb-7 sm:px-8">
                {groups.map((group, index) => {
                    const shown = group.items.slice(0, PREVIEW_PER_GROUP);
                    const rest = group.items.slice(PREVIEW_PER_GROUP);

                    return (
                        <section key={group.label}>
                            <div className="flex items-center gap-4">
                                {/* A real heading rather than styled text: it
                                    sits under the role's h3 and puts the three
                                    groups in the document outline, which is
                                    how a screen reader skims this panel. */}
                                <h4 className="eyebrow shrink-0">
                                    {group.label}
                                </h4>
                                {/* Runs to the edge so the heading reads as a
                                    divider, not a caption. */}
                                <span
                                    aria-hidden
                                    className="bg-highlight/30 h-px flex-1"
                                />
                            </div>

                            <Entries items={shown} className="mt-5" />

                            {rest.length > 0 ? (
                                <div
                                    id={`${region}-${index}`}
                                    // Clipped content stays in the
                                    // accessibility tree and would be read out
                                    // while invisible; `inert` takes it out
                                    // for exactly as long as it is shut.
                                    inert={!open}
                                    className={cn(
                                        'grid transition-[grid-template-rows] duration-500 ease-[var(--ease-settle)]',
                                        open
                                            ? 'grid-rows-[1fr]'
                                            : 'grid-rows-[0fr]',
                                    )}
                                >
                                    <div className="overflow-hidden">
                                        <Entries
                                            items={rest}
                                            className="mt-5"
                                        />
                                    </div>
                                </div>
                            ) : null}
                        </section>
                    );
                })}
            </div>

            {overflowing.length > 0 ? (
                <button
                    type="button"
                    aria-expanded={open}
                    aria-controls={overflowing
                        .map((group) => `${region}-${groups.indexOf(group)}`)
                        .join(' ')}
                    onClick={() => setOpen((previous) => !previous)}
                    // A footer row on the panel's own material rather than a
                    // separate control below it: stacking a second translucent
                    // surface on the first muddies both.
                    className="border-foreground/10 text-foreground/85 hover:text-foreground hover:bg-foreground/[0.03] flex w-full items-center justify-center gap-2 border-t px-6 py-3.5 text-sm font-medium transition-colors duration-200 active:scale-[0.99]"
                >
                    {open ? collapseLabel : expandLabel}
                    <ChevronDown
                        aria-hidden
                        className={cn(
                            'size-4 transition-transform duration-500 ease-[var(--ease-settle)]',
                            open && 'rotate-180',
                        )}
                    />
                </button>
            ) : null}
        </div>
    );
}

/**
 * A run of entries. The title is genuinely the term and the detail its
 * description, so this is a `dl` — which also means the preview and the
 * overflow can be two lists without either one pretending to be a sentence.
 */
function Entries({
    items,
    className,
}: {
    items: { title: string; detail: string }[];
    className?: string;
}) {
    return (
        <dl className={cn('grid gap-x-8 gap-y-5 sm:grid-cols-2', className)}>
            {items.map((item) => (
                <div key={item.title}>
                    {/* The title carries the weight; with fourteen of these a
                        bullet in front of each is noise. */}
                    <dt className="text-foreground text-sm font-semibold">
                        {item.title}
                    </dt>
                    <dd className="text-muted-foreground mt-1 text-sm leading-relaxed text-pretty">
                        {item.detail}
                    </dd>
                </div>
            ))}
        </dl>
    );
}
