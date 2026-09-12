import About from '@/components/sections/about';
import Contact from '@/components/sections/contact';
import Experience from '@/components/sections/experience';
import Hero from '@/components/sections/hero';
import PointerGlow from '@/components/pointer-glow';
import Projects from '@/components/sections/projects';
import SchemeSwitcher from '@/components/scheme-switcher';
import SiteFooter from '@/components/site-footer';
import SiteNav from '@/components/site-nav';

export default function Home() {
    return (
        <>
            <PointerGlow />
            <SiteNav />
            <main>
                <Hero />
                <About />
                <Experience />
                <Projects />
                <Contact />
            </main>
            <SiteFooter />
            {/* Dev-only: previews light/dark regardless of the OS setting. */}
            <SchemeSwitcher />
        </>
    );
}
