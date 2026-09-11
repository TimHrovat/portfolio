/**
 * Scheme override for the dev-only preview switcher. 'system' is the shipped
 * behaviour — no `data-scheme` attribute at all, light/dark driven purely by
 * `prefers-color-scheme`, which is the rule the site is built on. 'light' /
 * 'dark' pin the scheme regardless of the OS, via the `[data-scheme]` blocks
 * at the bottom of app/globals.css.
 */
export type SchemeOverride = 'system' | 'light' | 'dark';

export const SCHEME_STORAGE_KEY = 'scheme';

/** Fired on `window` after the scheme override changes. */
export const SCHEME_EVENT = 'schemechange';

export const schemes: { id: SchemeOverride; name: string }[] = [
    { id: 'system', name: 'System' },
    { id: 'light', name: 'Light' },
    { id: 'dark', name: 'Dark' },
];

export function isSchemeOverride(
    value: string | undefined,
): value is SchemeOverride {
    return schemes.some(({ id }) => id === value);
}
