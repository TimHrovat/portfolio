import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';

const poppins = Poppins({
    variable: '--font-poppins',
    subsets: ['latin'],
    weight: ['400', '600', '700'],
});

export const metadata: Metadata = {
    metadataBase: new URL('https://timhrovat.com'),
    title: 'Tim Hrovat — Full Stack Developer',
    description:
        'Portfolio of Tim Hrovat, a full stack developer and student at FRI UNI Ljubljana, building efficient and scalable solutions.',
    openGraph: {
        title: 'Tim Hrovat — Full Stack Developer',
        description:
            'Portfolio of Tim Hrovat, a full stack developer and student at FRI UNI Ljubljana.',
        type: 'website',
        images: ['/images/portrait.png'],
    },
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
    return (
        <html lang="en" className={`${poppins.variable} dark antialiased`}>
            <body>{children}</body>
        </html>
    );
}
