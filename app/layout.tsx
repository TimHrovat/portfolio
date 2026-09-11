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
// <meta name="theme-color">, and a meta tag cannot read a custom property, so
// it cannot follow the selected palette either. These mirror `ember` and only
// tint mobile browser chrome; set them to the winner once it is chosen.
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
            // The palette bootstrap writes data-palette here before hydration,
            // so this element is expected to differ from the server markup.
            suppressHydrationWarning
        >
            <head>
                {/* Applies the stored palette before first paint, so switching
                    does not flash the default one on reload. next/script with
                    `beforeInteractive` rather than a bare <script>, which React
                    19 warns about inside a component. Temporary — it goes away
                    with components/palette-switcher.tsx once the final palette
                    is chosen. */}
                <Script id="palette-bootstrap" strategy="beforeInteractive">
                    {`try{var p=localStorage.getItem('palette');if(p==='milk'||p==='mirage')document.documentElement.dataset.palette=p}catch(e){}`}
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
