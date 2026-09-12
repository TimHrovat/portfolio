'use client';

import { Tabs } from 'radix-ui';
import {
    useCallback,
    useEffect,
    useRef,
    useState,
    useSyncExternalStore,
} from 'react';
import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

/**
 * The Work section: one role at a time. The roles are a column of tabs on the
 * left from `md` up and a two-by-two grid above the panel below that, and the
 * panel swaps as a tab is picked. A grid rather than a row that scrolls
 * sideways, because a scrolling row hid the other workplaces off the edge of
 * the screen and nothing said they were there. It replaced a vertical timeline
 * that was nearly three screens long, most of it one role's detail.
 *
 * Only the behaviour lives here. Every tab and panel arrives already rendered
 * by the server in `items`, so the CV copy reaches the browser as markup and
 * never as messages — the same reason `RoleHighlights` takes its labels as
 * props.
 *
 * Three pieces of motion, each on the house rules:
 *
 * - The active marker is one element that travels between tabs, moved with
 *   `transform` like the nav indicator, and only armed after its first
 *   placement so it does not slide in on load.
 * - The incoming panel settles in from the direction of travel: up when
 *   moving to a later tab, down when moving back.
 * - The panels' container animates its height, because the featured role is
 *   several times taller than the rest. This is the one place a height is
 *   measured: a `ResizeObserver` on the active panel, which also follows the
 *   highlights folding open inside it.
 *
 * Every panel is force-mounted and the inactive ones are hidden with CSS, so
 * all of the roles are in the HTML for anything that reads the page.
 */
export default function WorkSwitcher({
    label,
    items,
}: {
    label: string;
    items: { id: string; tab: ReactNode; panel: ReactNode }[];
}) {
    const [value, setValue] = useState(items[0].id);
    const [direction, setDirection] = useState<'forward' | 'back'>('forward');
    const vertical = useSyncExternalStore(subscribeToWidth, isWide, () => true);

    const list = useRef<HTMLDivElement>(null);
    const indicator = useRef<HTMLSpanElement>(null);
    const panels = useRef<HTMLDivElement>(null);

    const select = (next: string) => {
        const from = items.findIndex((item) => item.id === value);
        const to = items.findIndex((item) => item.id === next);

        setDirection(to > from ? 'forward' : 'back');
        setValue(next);
        panels.current?.setAttribute('data-ready', 'true');
    };

    // Offsets inside the list, so the marker does not care where the page
    // or the section has been scrolled to.
    const place = useCallback(() => {
        const container = list.current;
        const marker = indicator.current;
        const target = container?.querySelector<HTMLElement>(
            '[role="tab"][data-state="active"]',
        );

        if (!container || !marker || !target) {
            return;
        }

        marker.style.setProperty('--tab-x', `${target.offsetLeft}px`);
        marker.style.setProperty('--tab-y', `${target.offsetTop}px`);
        marker.style.setProperty('--tab-w', `${target.offsetWidth}px`);
        marker.style.setProperty('--tab-h', `${target.offsetHeight}px`);
        marker.dataset.shown = 'true';

        requestAnimationFrame(() => {
            marker.dataset.ready = 'true';
        });
    }, []);

    useEffect(() => {
        place();

        const container = list.current;

        if (!container) {
            return;
        }

        const observer = new ResizeObserver(place);
        observer.observe(container);

        return () => observer.disconnect();
    }, [value, place]);

    useEffect(() => {
        const container = panels.current;
        const active = container?.querySelector<HTMLElement>(
            '[role="tabpanel"][data-state="active"]',
        );

        if (!container || !active) {
            return;
        }

        // Plus the container's own padding, which is room for focus rings
        // and shadows and is not part of any panel.
        const observer = new ResizeObserver(() => {
            container.style.height = `calc(${active.offsetHeight}px + 2.75rem)`;
        });
        observer.observe(active);

        return () => observer.disconnect();
    }, [value]);

    return (
        <Tabs.Root
            value={value}
            onValueChange={select}
            orientation={vertical ? 'vertical' : 'horizontal'}
            className="grid gap-6 md:grid-cols-[17rem_1fr] md:gap-10"
        >
            <Tabs.List
                ref={list}
                aria-label={label}
                className={cn(
                    'relative self-start',
                    vertical
                        ? 'flex flex-col gap-1.5'
                        : 'grid grid-cols-2 gap-2',
                )}
            >
                <span ref={indicator} aria-hidden className="tab-indicator" />
                {items.map((item) => (
                    <Tabs.Trigger
                        key={item.id}
                        value={item.id}
                        className={cn(
                            'group text-muted-foreground hover:text-foreground data-[state=active]:text-foreground relative z-10 flex min-w-0 items-center rounded-lg text-left transition-colors duration-200 outline-none',
                            'focus-visible:ring-[3px] focus-visible:ring-[color-mix(in_oklab,var(--ring)_45%,transparent)]',
                            vertical
                                ? 'w-full gap-3 px-3 py-3'
                                : // Each cell outlined, so all four read as
                                  // buttons before any of them is chosen.
                                  'ring-foreground/10 gap-2.5 p-2 ring-1 ring-inset',
                        )}
                    >
                        {item.tab}
                    </Tabs.Trigger>
                ))}
            </Tabs.List>

            <div
                ref={panels}
                data-direction={direction}
                className="work-panels"
            >
                {items.map((item) => (
                    <Tabs.Content
                        key={item.id}
                        value={item.id}
                        forceMount
                        // The panel itself is not a stop in the tab order:
                        // the links inside it are, and a focus ring around a
                        // whole role is noise.
                        tabIndex={-1}
                        className="work-panel outline-none"
                    >
                        {item.panel}
                    </Tabs.Content>
                ))}
            </div>
        </Tabs.Root>
    );
}

const WIDE = '(min-width: 48rem)';

function isWide(): boolean {
    return window.matchMedia(WIDE).matches;
}

function subscribeToWidth(onChange: () => void): () => void {
    const query = window.matchMedia(WIDE);

    query.addEventListener('change', onChange);

    return () => query.removeEventListener('change', onChange);
}
