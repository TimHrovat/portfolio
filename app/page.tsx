import SectionAboutMe from '@/components/sections/section-about-me';
import SectionHero from '@/components/sections/section-hero';
import SectionProfessionalExperience from '@/components/sections/section-professional-experience';
import SectionTechnologies from '@/components/sections/section-technologies';

export default function Home() {
    return (
        <main className="px-6">
            <SectionHero />
            <SectionAboutMe />
            <SectionTechnologies />
            <SectionProfessionalExperience />
        </main>
    );
}
