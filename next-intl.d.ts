import type messages from '@/messages/en.json';

/**
 * Types every message key off en.json itself, so `t('nav.links.about')` is
 * checked at build time: a typo in a key, or a key with no message behind it,
 * fails `pnpm build` rather than silently rendering the key.
 */
declare module 'next-intl' {
    interface AppConfig {
        Locale: 'en';
        Messages: typeof messages;
    }
}
