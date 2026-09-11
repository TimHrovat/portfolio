'use client';

import { Check, Palette } from 'lucide-react';
import { useState, useSyncExternalStore } from 'react';

import { Button } from '@/components/ui/button';
import {
    DEFAULT_PALETTE,
    PALETTE_EVENT,
    PALETTE_STORAGE_KEY,
    isPaletteId,
    palettes,
    type PaletteId,
} from '@/lib/palettes';
import { cn } from '@/lib/utils';

/*
 * <html data-palette> is the source of truth, not React state: the bootstrap
 * script in app/layout.tsx sets it before this component ever mounts. So the
 * switcher subscribes to it rather than keeping its own copy, which also keeps
 * the DOM write out of render — React Compiler rejects mutating globals from a
 * component body.
 */
function subscribe(onChange: () => void): () => void {
    window.addEventListener(PALETTE_EVENT, onChange);

    return () => window.removeEventListener(PALETTE_EVENT, onChange);
}

function getSnapshot(): PaletteId {
    const current = document.documentElement.dataset.palette;

    return isPaletteId(current) ? current : DEFAULT_PALETTE;
}

function getServerSnapshot(): PaletteId {
    return DEFAULT_PALETTE;
}

function applyPalette(id: PaletteId): void {
    document.documentElement.dataset.palette = id;

    try {
        window.localStorage.setItem(PALETTE_STORAGE_KEY, id);
    } catch {
        // Private browsing or blocked storage: the choice still applies to
        // this page view, it just will not survive a reload.
    }

    window.dispatchEvent(new Event(PALETTE_EVENT));
}

/**
 * Temporary control for choosing between the three candidate palettes. It only
 * selects a palette — light and dark still follow the OS, with no manual
 * override, which is the rule this site is built on.
 *
 * Delete this file, lib/palettes.ts, the bootstrap script in app/layout.tsx and
 * the two losing palettes in app/globals.css once the choice is made.
 */
export default function PaletteSwitcher() {
    const active = useSyncExternalStore(
        subscribe,
        getSnapshot,
        getServerSnapshot,
    );
    const [open, setOpen] = useState(false);

    return (
        <div className="fixed right-4 bottom-4 z-50 flex flex-col items-end gap-2 print:hidden">
            <div
                id="palette-options"
                hidden={!open}
                data-elevated="true"
                className="glass animate-in fade-in slide-in-from-bottom-2 flex w-80 flex-col gap-1 rounded-2xl p-2 duration-200"
            >
                <p className="eyebrow px-2 pt-1 pb-2">Palette</p>
                {palettes.map((palette) => (
                    <Button
                        key={palette.id}
                        variant="ghost"
                        size="lg"
                        aria-pressed={active === palette.id}
                        onClick={() => applyPalette(palette.id)}
                        className="h-auto w-full justify-start gap-3 px-2 py-2 text-left whitespace-normal"
                    >
                        {/* Paper, ink, primary and highlight — the whole
                            palette, legible before it is applied. */}
                        <span
                            aria-hidden
                            className="ring-hairline flex size-8 shrink-0 overflow-hidden rounded-lg ring-1"
                        >
                            <span className="flex w-1/2 flex-col">
                                <span
                                    className="h-1/2"
                                    style={{ background: palette.swatch.paper }}
                                />
                                <span
                                    className="h-1/2"
                                    style={{ background: palette.swatch.ink }}
                                />
                            </span>
                            <span className="flex w-1/2 flex-col">
                                <span
                                    className="h-1/2"
                                    style={{
                                        background: palette.swatch.primary,
                                    }}
                                />
                                <span
                                    className="h-1/2"
                                    style={{
                                        background: palette.swatch.highlight,
                                    }}
                                />
                            </span>
                        </span>
                        <span className="min-w-0 flex-1">
                            <span className="block text-sm font-medium">
                                {palette.name}
                            </span>
                            <span className="text-muted-foreground block truncate font-mono text-[0.6875rem]">
                                {palette.note}
                            </span>
                        </span>
                        <Check
                            aria-hidden
                            className={cn(
                                'text-primary shrink-0 transition-opacity',
                                active === palette.id
                                    ? 'opacity-100'
                                    : 'opacity-0',
                            )}
                        />
                    </Button>
                ))}
            </div>

            <Button
                variant="glass"
                size="lg"
                shape="pill"
                onClick={() => setOpen((previous) => !previous)}
                aria-expanded={open}
                aria-controls="palette-options"
                className="px-4"
            >
                <Palette />
                {palettes.find(({ id }) => id === active)?.name}
            </Button>
        </div>
    );
}
