'use client';

import { Monitor, Moon, Sun } from 'lucide-react';
import { useSyncExternalStore } from 'react';

import { Button } from '@/components/ui/button';
import {
    SCHEME_EVENT,
    SCHEME_STORAGE_KEY,
    isSchemeOverride,
    schemes,
    type SchemeOverride,
} from '@/lib/scheme';
import { cn } from '@/lib/utils';

/*
 * <html data-scheme> is the source of truth, not React state: the bootstrap
 * script in app/layout.tsx sets it before this component ever mounts. So the
 * switcher subscribes to it rather than keeping its own copy, which also
 * keeps the DOM write out of render — React Compiler rejects mutating
 * globals from a component body.
 *
 * No `data-scheme` means System, which is the shipped behaviour — light and
 * dark driven purely by prefers-color-scheme, with no toggle. This control
 * exists only so the theme can be checked in both schemes without changing
 * the OS setting.
 */
function subscribe(onChange: () => void): () => void {
    window.addEventListener(SCHEME_EVENT, onChange);

    return () => window.removeEventListener(SCHEME_EVENT, onChange);
}

function getSnapshot(): SchemeOverride {
    const current = document.documentElement.dataset.scheme;

    return isSchemeOverride(current) ? current : 'system';
}

function getServerSnapshot(): SchemeOverride {
    return 'system';
}

function applyScheme(id: SchemeOverride): void {
    if (id === 'system') {
        // Removing the attribute is the point: it hands control back to
        // prefers-color-scheme rather than pinning the opposite value.
        delete document.documentElement.dataset.scheme;
    } else {
        document.documentElement.dataset.scheme = id;
    }

    try {
        if (id === 'system') {
            window.localStorage.removeItem(SCHEME_STORAGE_KEY);
        } else {
            window.localStorage.setItem(SCHEME_STORAGE_KEY, id);
        }
    } catch {
        // Private browsing or blocked storage: the choice still applies to
        // this page view, it just will not survive a reload.
    }

    window.dispatchEvent(new Event(SCHEME_EVENT));
}

const schemeIcons = { system: Monitor, light: Sun, dark: Moon };

/**
 * Dev-only control for previewing the site in light or dark regardless of
 * the OS setting. The shipped site has no toggle and follows the OS, which
 * is what the System option (the default) does.
 */
export default function SchemeSwitcher() {
    const scheme = useSyncExternalStore(
        subscribe,
        getSnapshot,
        getServerSnapshot,
    );

    return (
        <div
            role="radiogroup"
            aria-label="Preview scheme"
            data-elevated="true"
            className="glass fixed right-4 bottom-4 z-50 flex gap-1 rounded-full p-1 print:hidden"
        >
            {schemes.map(({ id, name }) => {
                const Icon = schemeIcons[id];

                return (
                    <Button
                        key={id}
                        variant="ghost"
                        size="sm"
                        role="radio"
                        aria-checked={scheme === id}
                        aria-label={name}
                        onClick={() => applyScheme(id)}
                        className={cn(
                            'rounded-full',
                            scheme === id
                                ? 'bg-surface text-foreground shadow-sm'
                                : 'text-muted-foreground hover:bg-transparent',
                        )}
                    >
                        <Icon />
                    </Button>
                );
            })}
        </div>
    );
}
