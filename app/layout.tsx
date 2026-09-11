import type { Metadata, Viewport } from 'next';
import { Geist, JetBrains_Mono } from 'next/font/google';

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

export const metadata: Metadata = {
    metadataBase: new URL('https://timhrovat.com'),
    title: {
        default: 'Tim Hrovat — Full Stack Developer',
        template: '%s · Tim Hrovat',
    },
    description:
        'Full stack developer in Ljubljana, Slovenia. Building efficient, scalable products at eŠola (eAsistent) while finishing a Computer Science degree at FRI UNI Ljubljana.',
    keywords: [
        'Tim Hrovat',
        'full stack developer',
        'Ljubljana',
        'Slovenia',
        'TypeScript',
        'React',
        'Vue',
        'NestJS',
    ],
    authors: [{ name: 'Tim Hrovat', url: 'https://timhrovat.com' }],
    creator: 'Tim Hrovat',
    openGraph: {
        title: 'Tim Hrovat — Full Stack Developer',
        description:
            'Full stack developer in Ljubljana, Slovenia. Building efficient, scalable products at eŠola (eAsistent).',
        url: 'https://timhrovat.com',
        siteName: 'Tim Hrovat',
        locale: 'en',
        type: 'website',
        images: [{ url: '/images/portrait.png', width: 1200, height: 1200 }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Tim Hrovat — Full Stack Developer',
        description: 'Full stack developer in Ljubljana, Slovenia.',
        images: ['/images/portrait.png'],
    },
};

// THE ONE COLOUR THAT CANNOT LIVE IN CSS. Next needs a literal here to emit
// <meta name="theme-color">, and a meta tag cannot read a custom property.
// These two values mirror --background in app/globals.css — if you change the
// palette, change them here too. Nothing else in the app hardcodes a colour.
export const viewport: Viewport = {
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: '#fdfbf9' },
        { media: '(prefers-color-scheme: dark)', color: '#1a1613' },
    ],
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
    return (
        <html
            lang="en"
            className={`${geist.variable} ${jetBrainsMono.variable}`}
        >
            <head>
                {/* Scroll reveals start hidden; without JS they must not stay
                    that way. */}
                <noscript>
                    <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
                </noscript>
            </head>
            <body className="grain">{children}</body>
        </html>
    );
}
