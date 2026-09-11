import { person } from '@/lib/site';

export default function SiteFooter() {
    return (
        <footer className="border-hairline border-t px-6 py-10">
            <div className="text-muted-foreground mx-auto flex w-full max-w-5xl flex-col items-center justify-between gap-3 font-mono text-xs sm:flex-row">
                <p>
                    © {new Date().getFullYear()} {person.name}
                </p>
                <p>Built with Next.js &amp; Tailwind CSS</p>
            </div>
        </footer>
    );
}
