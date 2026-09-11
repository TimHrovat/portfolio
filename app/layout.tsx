import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
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
        default: 'Tim Hrovat · Full Stack Developer',
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
        title: 'Tim Hrovat · Full Stack Developer',
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
        title: 'Tim Hrovat · Full Stack Developer',
        description: 'Full stack developer in Ljubljana, Slovenia.',
        images: ['/images/portrait.png'],
    },
};

// THE ONE COLOUR THAT CANNOT LIVE IN CSS. Next needs a literal here to emit
// <meta name="theme-color">, and a meta tag cannot read a custom property, so
// these mirror --background by hand. Change them together.
export const viewport: Viewport = {
    // The layout viewport covers the whole screen, status bar and Dynamic
    // Island included. Without it iOS stops the viewport at the safe area, so
    // the fixed top strip starts below the island while the page still scrolls
    // behind it — the island's row of content stayed unblurred. It is also
    // what makes every `env(safe-area-inset-*)` below resolve to anything but
    // zero, so the two go together.
    viewportFit: 'cover',
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: '#f5f5f7' },
        { media: '(prefers-color-scheme: dark)', color: '#000000' },
    ],
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
    return (
        <html
            lang="en"
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
            <body className="grain">{children}</body>
        </html>
    );
}
