import type { MetadataRoute } from 'next';
import { getTranslations } from 'next-intl/server';

/**
 * The web app manifest. Not a PWA — there is no service worker and nothing to
 * install into — but it is what Android uses for the home-screen icon and what
 * several crawlers read for the site's name, so it is cheap completeness.
 *
 * Copy comes from messages like every other string on the site; `name` and
 * `short_name` differ because launchers truncate hard.
 *
 * `background_color` and `theme_color` are the second and third places the
 * background is written as a hex literal — the manifest is JSON and cannot read
 * a custom property any more than a meta tag can. They mirror `--background`
 * dark by hand, alongside `themeColor` in app/layout.tsx. Change all of them
 * together.
 */
export default async function manifest(): Promise<MetadataRoute.Manifest> {
    const t = await getTranslations();

    return {
        name: t('meta.title'),
        short_name: t('meta.siteName'),
        description: t('meta.shortDescription'),
        start_url: '/',
        display: 'standalone',
        background_color: '#000000',
        theme_color: '#000000',
        icons: [
            {
                src: '/images/icons/icon-192.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/images/icons/icon-512.png',
                sizes: '512x512',
                type: 'image/png',
            },
            {
                src: '/images/icons/icon-512.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'maskable',
            },
        ],
    };
}
