'use client';

import { Dialog, VisuallyHidden } from 'radix-ui';
import { useEffect, useRef, type ReactNode } from 'react';

import { cn } from '@/lib/utils';

/*
 * Radix Dialog rather than a bare <dialog>. The native element covers the easy
 * parts — focus trap, Escape, top layer — but Radix also handles scroll
 * locking without layout shift, focus restoration to the trigger, `aria-hidden`
 * on the rest of the tree, and pointer-down-outside vs click-outside. Those are
 * the details that are quietly wrong in a hand-rolled version.
 */

/** Fraction of the panel's height past which letting go closes it. */
const DISMISS_RATIO = 0.25;
/** ...or a flick, in px per ms, which closes from any distance. */
const DISMISS_VELOCITY = 0.5;
/** Past this many px the gesture counts as a drag, not a tap. */
const DRAG_SLOP = 2;

export default function Drawer({
    open,
    onOpenChange,
    title,
    subtitle,
    side = 'bottom',
    className,
    restoreFocusTo,
    children,
}: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    /** Rendered as the dialog's description, so it is shown and announced once. */
    subtitle?: string;
    side?: 'bottom' | 'right';
    className?: string;
    /** Opened from outside rather than via Dialog.Trigger, so there is no
     *  trigger for Radix to return focus to on close. Pass the control that
     *  opened it and focus goes back where the keyboard left off. */
    restoreFocusTo?: React.RefObject<HTMLElement | null>;
    children: ReactNode;
}) {
    const panel = useRef<HTMLDivElement>(null);
    const drag = useRef<{
        pointer: number;
        from: number;
        last: number;
        time: number;
        velocity: number;
    } | null>(null);
    // Read by the click handler, which fires after the pointer is released:
    // a drag must not also count as a tap on the close control.
    const moved = useRef(false);

    // A drag that ends in a close leaves this set, and a keyboard activation
    // arrives as a click with no pointerdown to reset it — so without this the
    // first Enter on the handle after a drag would be swallowed.
    useEffect(() => {
        if (open) {
            moved.current = false;
        }
    }, [open]);

    /*
     * The panel follows the finger by having its transform written straight to
     * the node — the same rule as everywhere else on this site, a gesture must
     * not schedule a React render per pointermove.
     */
    function startDrag(event: React.PointerEvent<HTMLButtonElement>): void {
        const node = panel.current;

        if (!node) {
            return;
        }

        drag.current = {
            pointer: event.pointerId,
            from: event.clientY,
            last: event.clientY,
            time: event.timeStamp,
            velocity: 0,
        };
        moved.current = false;
        node.dataset.dragging = 'true';
        event.currentTarget.setPointerCapture(event.pointerId);
    }

    function moveDrag(event: React.PointerEvent<HTMLButtonElement>): void {
        const state = drag.current;
        const node = panel.current;

        if (!state || !node || event.pointerId !== state.pointer) {
            return;
        }

        // Downward only. Pulling up would lift the panel off the edge it is
        // anchored to, which is not a thing it can do.
        const offset = Math.max(0, event.clientY - state.from);
        const elapsed = event.timeStamp - state.time;

        if (elapsed > 0) {
            state.velocity = (event.clientY - state.last) / elapsed;
            state.last = event.clientY;
            state.time = event.timeStamp;
        }

        if (offset > DRAG_SLOP) {
            moved.current = true;
        }

        node.style.transform = `translateY(${offset}px)`;
    }

    function endDrag(event: React.PointerEvent<HTMLButtonElement>): void {
        const state = drag.current;
        const node = panel.current;

        if (!state || !node || event.pointerId !== state.pointer) {
            return;
        }

        drag.current = null;
        delete node.dataset.dragging;

        const offset = Math.max(0, event.clientY - state.from);
        const far = offset > node.offsetHeight * DISMISS_RATIO;

        if (far || state.velocity > DISMISS_VELOCITY) {
            // Deliberately left where it is: the exit keyframes declare only a
            // `to`, so they start from this transform and the close carries on
            // from the gesture rather than snapping back to rest first.
            onOpenChange(false);
        } else {
            node.style.transform = '';
        }
    }

    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            <Dialog.Portal>
                <Dialog.Overlay className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px] duration-200" />
                <Dialog.Content
                    ref={panel}
                    data-side={side}
                    onCloseAutoFocus={(event) => {
                        if (restoreFocusTo?.current) {
                            event.preventDefault();
                            restoreFocusTo.current.focus();
                        }
                    }}
                    className={cn(
                        'drawer bg-popover text-popover-foreground ring-hairline fixed z-50 flex flex-col overflow-y-auto p-6 ring-1',
                        side === 'bottom'
                            ? 'inset-x-0 bottom-0 max-h-[85svh] rounded-t-3xl pb-[max(1.5rem,env(safe-area-inset-bottom))]'
                            : 'inset-y-0 right-0 w-80 max-w-[85vw] rounded-l-3xl',
                        className,
                    )}
                >
                    {/* The grab handle is the close control. It drags the panel
                        down and dismisses it past a quarter of its height or on
                        a flick — and it is a real button, so a tap, Enter or
                        Space closes it too. That is what replaces the X: one
                        affordance, reachable by pointer and keyboard both. */}
                    {side === 'bottom' ? (
                        <button
                            type="button"
                            aria-label="Close"
                            onPointerDown={startDrag}
                            onPointerMove={moveDrag}
                            onPointerUp={endDrag}
                            onPointerCancel={endDrag}
                            onClick={() => {
                                if (!moved.current) {
                                    onOpenChange(false);
                                }
                            }}
                            className="group -mx-6 -mt-4 mb-3 flex shrink-0 cursor-grab touch-none justify-center py-3 active:cursor-grabbing"
                        >
                            <span className="bg-hairline group-hover:bg-muted-foreground h-1 w-10 rounded-full transition-colors duration-200" />
                        </button>
                    ) : null}

                    <div className="flex items-start justify-between gap-4">
                        <Dialog.Title className="font-display text-lg font-bold">
                            {title}
                        </Dialog.Title>
                    </div>

                    {/* One element, shown and announced — not a visible line
                        plus a hidden copy of the same words. */}
                    {subtitle ? (
                        <Dialog.Description className="text-muted-foreground mt-1 font-mono text-[0.6875rem] tracking-wider">
                            {subtitle}
                        </Dialog.Description>
                    ) : (
                        <VisuallyHidden.Root asChild>
                            <Dialog.Description>{title}</Dialog.Description>
                        </VisuallyHidden.Root>
                    )}

                    {children}
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
