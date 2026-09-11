import About from '@/components/sections/about';
import Contact from '@/components/sections/contact';
import Experience from '@/components/sections/experience';
import Hero from '@/components/sections/hero';
import PointerGlow from '@/components/pointer-glow';
import Projects from '@/components/sections/projects';
import Technologies from '@/components/sections/technologies';
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
                <Technologies />
                <Experience />
                <Projects />
                <Contact />
            </main>
            <SiteFooter />
        </>
    );
}
