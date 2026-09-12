import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { Geist, JetBrains_Mono } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages, getTranslations } from 'next-intl/server';

import StructuredData from '@/components/structured-data';
import { OG_IMAGE, SITE_URL } from '@/lib/seo';

import './globals.css';

const geist = Geist({
    variable: '--font-geist',
    subsets: ['latin'],
    display: 'swap',
});

// Carries both the display and the metadata role, so it needs the bold weights
// as well as the text ones.
const jetBrainsMono = JetBrains_Mono({
    variable: '--font-jetbrains-mono',
    subsets: ['latin'],
    weight: ['400', '500', '700'],
    display: 'swap',
});

// Metadata is copy like any other, so it reads from messages too — which is
// why this is `generateMetadata` rather than a static object.
export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations();
    const locale = await getLocale();

    return {
        metadataBase: new URL(SITE_URL),
        title: {
            default: t('meta.title'),
            template: t('meta.titleTemplate'),
        },
        description: t('meta.description'),
        keywords: t.raw('meta.keywords'),
        authors: [{ name: t('person.name'), url: SITE_URL }],
        creator: t('person.name'),
        // Every crawler that finds this page by any route should agree on
        // which URL it is — a preview deployment included, which is why
        // SITE_URL is env-aware rather than a constant.
        alternates: { canonical: '/' },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                // Let Google use a full-size preview and an unclipped snippet
                // rather than the conservative defaults.
                'max-image-preview': 'large',
                'max-snippet': -1,
                'max-video-preview': -1,
            },
        },
        openGraph: {
            title: t('meta.title'),
            description: t('meta.shareDescription'),
            url: SITE_URL,
            siteName: t('meta.siteName'),
            locale,
            type: 'website',
            // A real 1200x630 landscape card. The portrait that used to sit
            // here is square and 600px, and every platform cropped it.
            images: [{ ...OG_IMAGE, alt: t('meta.title') }],
        },
        twitter: {
            card: 'summary_large_image',
            title: t('meta.title'),
            description: t('meta.shortDescription'),
            images: [OG_IMAGE.url],
        },
    };
}

// THE ONE COLOUR THAT CANNOT LIVE IN CSS. Next needs a literal here to emit
// <meta name="theme-color">, and a meta tag cannot read a custom property, so
// these mirror --background by hand. Change them together.
export const viewport: Viewport = {
    // The layout viewport covers the whole screen, status bar and Dynamic
    // Island included. It is what makes every `env(safe-area-inset-*)` in
    // globals.css resolve to anything but zero — see the status bar note in
    // CLAUDE.md for what iOS does and does not let the page paint up there.
    viewportFit: 'cover',
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: '#f5f5f7' },
        { media: '(prefers-color-scheme: dark)', color: '#000000' },
    ],
};

export default async function RootLayout({ children }: LayoutProps<'/'>) {
    const locale = await getLocale();
    // Only the namespaces the client components actually read: the nav and
    // the dev switcher. The CV copy — every role, project and school — stays
    // on the server.
    const { nav, person, dev } = await getMessages();

    return (
        <html
            lang={locale}
            className={`${geist.variable} ${jetBrainsMono.variable}`}
            // The scheme bootstrap writes data-scheme here before hydration,
            // so this element is expected to differ from the server markup.
            suppressHydrationWarning
        >
            <head>
                {/* Applies a stored dev scheme override before first paint,
                    so switching does not flash the default on reload.
                    next/script with `beforeInteractive` rather than a bare
                    <script>, which React 19 warns about inside a component.
                    Dev-only — see components/scheme-switcher.tsx. */}
                <Script id="scheme-bootstrap" strategy="beforeInteractive">
                    {`try{var s=localStorage.getItem('scheme');if(s==='light'||s==='dark')document.documentElement.dataset.scheme=s}catch(e){}`}
                </Script>
                {/* Scroll reveals start hidden; without JS they must not stay
                    that way. */}
                <noscript>
                    <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
                </noscript>
            </head>
            <body className="grain">
                <NextIntlClientProvider messages={{ nav, person, dev }}>
                    {children}
                </NextIntlClientProvider>
                <StructuredData />
            </body>
        </html>
    );
}
