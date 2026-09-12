'use client';

import { Monitor, Moon, Sun } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useSyncExternalStore } from 'react';

import { Button } from '@/components/ui/button';
import {
    SCHEME_EVENT,
    SCHEME_STORAGE_KEY,
    THEME_STORAGE_KEY,
    isSchemeOverride,
    isTheme,
    schemes,
    themes,
    type SchemeOverride,
    type ThemeId,
} from '@/lib/scheme';
import { cn } from '@/lib/utils';

/*
 * <html data-scheme> and <html data-theme> are the source of truth, not React
 * state: the bootstrap script in app/layout.tsx sets them before this
 * component ever mounts. So the switcher subscribes to them rather than
 * keeping its own copy, which also keeps the DOM write out of render — React
 * Compiler rejects mutating globals from a component body.
 *
 * No `data-scheme` means System and no `data-theme` means Signal, which is
 * the shipped behaviour: Signal's palette, light and dark driven purely by
 * prefers-color-scheme. The defaults remove their attribute rather than
 * writing their own value, so the choice collapses back to exactly that.
 */
function subscribe(onChange: () => void): () => void {
    window.addEventListener(SCHEME_EVENT, onChange);

    return () => window.removeEventListener(SCHEME_EVENT, onChange);
}

function getScheme(): SchemeOverride {
    const current = document.documentElement.dataset.scheme;

    return isSchemeOverride(current) ? current : 'system';
}

function getTheme(): ThemeId {
    const current = document.documentElement.dataset.theme;

    return isTheme(current) ? current : themes[0];
}

/** Writes one attribute and its stored copy; the default removes both. */
function apply(
    attribute: 'scheme' | 'theme',
    key: string,
    value: string,
    isDefault: boolean,
): void {
    if (isDefault) {
        delete document.documentElement.dataset[attribute];
    } else {
        document.documentElement.dataset[attribute] = value;
    }

    try {
        if (isDefault) {
            window.localStorage.removeItem(key);
        } else {
            window.localStorage.setItem(key, value);
        }
    } catch {
        // Private browsing or blocked storage: the choice still applies to
        // this page view, it just will not survive a reload.
    }

    window.dispatchEvent(new Event(SCHEME_EVENT));
}

const schemeIcons = { system: Monitor, light: Sun, dark: Moon };

/**
 * Preview control for the theme and the scheme. The swatches pick the
 * palette; three icons pick System, Light or Dark.
 *
 * Each swatch wears its own theme through `data-theme`, so it is painted with
 * that theme's background and primary straight from app/globals.css — no
 * colour is written out here a second time, and a swatch can never disagree
 * with the theme it selects.
 */
export default function SchemeSwitcher() {
    const t = useTranslations('dev');
    const scheme = useSyncExternalStore(subscribe, getScheme, () => 'system');
    const theme = useSyncExternalStore(subscribe, getTheme, () => themes[0]);

    return (
        <div
            data-elevated="true"
            className="glass fixed right-[max(1rem,env(safe-area-inset-right))] bottom-[max(1rem,env(safe-area-inset-bottom))] z-50 flex items-center gap-1 rounded-full p-1 print:hidden"
        >
            <div
                role="radiogroup"
                aria-label={t('themeLabel')}
                className="flex gap-1"
            >
                {themes.map((id) => (
                    <Button
                        key={id}
                        variant="ghost"
                        size="sm"
                        role="radio"
                        aria-checked={theme === id}
                        aria-label={t(`themes.${id}`)}
                        title={t(`themes.${id}`)}
                        onClick={() =>
                            apply(
                                'theme',
                                THEME_STORAGE_KEY,
                                id,
                                id === themes[0],
                            )
                        }
                        className={cn(
                            'rounded-full px-2',
                            theme === id
                                ? 'bg-surface shadow-sm'
                                : 'hover:bg-transparent',
                        )}
                    >
                        <span
                            aria-hidden
                            data-theme={id}
                            className="ring-foreground/20 relative size-4 overflow-hidden rounded-full ring-1"
                            style={{
                                background:
                                    'linear-gradient(135deg, var(--background) 50%, var(--primary) 50%)',
                            }}
                        />
                    </Button>
                ))}
            </div>

            <span aria-hidden className="bg-hairline mx-0.5 h-5 w-px" />

            <div
                role="radiogroup"
                aria-label={t('schemeLabel')}
                className="flex gap-1"
            >
                {schemes.map((id) => {
                    const Icon = schemeIcons[id];

                    return (
                        <Button
                            key={id}
                            variant="ghost"
                            size="sm"
                            role="radio"
                            aria-checked={scheme === id}
                            aria-label={t(`schemes.${id}`)}
                            onClick={() =>
                                apply(
                                    'scheme',
                                    SCHEME_STORAGE_KEY,
                                    id,
                                    id === 'system',
                                )
                            }
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
        </div>
    );
}
