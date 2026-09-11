/**
 * The palettes currently up for selection. Each entry's swatch mirrors the
 * light-mode `--background` / `--foreground` / `--primary` / `--highlight` of
 * the matching block in app/globals.css — duplicated here only so the switcher
 * can preview all three without mounting three themes at once.
 *
 * This file goes away with the switcher once the final palette is chosen.
 */
export type PaletteId = 'ember' | 'milk' | 'mirage';

export const DEFAULT_PALETTE: PaletteId = 'ember';

export const PALETTE_STORAGE_KEY = 'palette';

/** Fired on `window` after the palette changes, so the switcher can re-read it. */
export const PALETTE_EVENT = 'palettechange';

export function isPaletteId(value: string | undefined): value is PaletteId {
    return palettes.some(({ id }) => id === value);
}

export const palettes: {
    id: PaletteId;
    name: string;
    note: string;
    swatch: {
        paper: string;
        ink: string;
        primary: string;
        highlight: string;
    };
}[] = [
    {
        id: 'ember',
        name: 'Ember',
        note: 'Terracotta · olive',
        swatch: {
            paper: 'oklch(0.99 0.004 75)',
            ink: 'oklch(0.22 0.015 55)',
            primary: 'oklch(0.63 0.2 40)',
            highlight: 'oklch(0.47 0.07 135)',
        },
    },
    {
        id: 'milk',
        name: 'Milk',
        note: 'Cream · gray-blue, no orange',
        swatch: {
            paper: 'oklch(0.987 0.012 96.4)',
            ink: 'oklch(0.3 0.026 262.7)',
            primary: 'oklch(0.5 0.115 260)',
            highlight: 'oklch(0.38 0.055 265)',
        },
    },
    {
        id: 'mirage',
        name: 'Mirage',
        note: '#FF5804 · sea green #075056',
        swatch: {
            paper: 'oklch(0.967 0.003 84.6)',
            ink: 'oklch(0.2474 0.0224 232.4)',
            primary: 'oklch(0.679 0.215 39.3)',
            highlight: 'oklch(0.3943 0.0647 203.9)',
        },
    },
];
