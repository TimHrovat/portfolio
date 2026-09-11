import { person } from '@/lib/site';

export default function SiteFooter() {
    return (
        <footer className="border-hairline border-t px-6 py-10">
            <p className="text-muted-foreground mx-auto w-full max-w-5xl text-center font-mono text-xs">
                © {new Date().getFullYear()} {person.name}
            </p>
        </footer>
    );
}
