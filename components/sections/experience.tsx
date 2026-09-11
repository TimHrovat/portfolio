import Section from '@/components/section';
import Timeline from '@/components/timeline';
import { roles } from '@/lib/site';

export default function Experience() {
    return (
        <Section
            id="work"
            eyebrow="Experience"
            title={
                <>
                    Where I&rsquo;ve worked
                    <span className="text-primary">.</span>
                </>
            }
            lead="Six roles over nine years, most of them alongside school and several alongside each other."
        >
            <Timeline roles={roles} />
        </Section>
    );
}
