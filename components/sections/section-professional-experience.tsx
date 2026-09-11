import ExperienceCard from '@/components/experience-card';
import ExperienceCardCompany from '@/components/experience-card-company';
import ExperienceCardContent from '@/components/experience-card-content';
import ExperienceCardTitle from '@/components/experience-card-title';

import Section from './section';

export default function SectionProfessionalExperience() {
    return (
        <Section>
            <ExperienceCard>
                <ExperienceCardTitle from="6. 12. 2022" to="current">
                    Software Developer
                </ExperienceCardTitle>
                <ExperienceCardCompany>
                    eŠola d.o.o. (eAsistent)
                </ExperienceCardCompany>
                <ExperienceCardContent>
                    <span>
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Velit dignissimos maiores ipsa aliquam labore
                        porro quae neque atque! Vitae veritatis eum dolore in
                        nihil magni autem iure incidunt inventore nulla.
                    </span>
                    <span>
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Velit dignissimos maiores ipsa aliquam labore
                        porro quae neque atque! Vitae veritatis eum dolore in
                        nihil magni autem iure incidunt inventore nulla.
                    </span>
                    <span>
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Velit dignissimos maiores ipsa aliquam labore
                        porro quae neque atque! Vitae veritatis eum dolore in
                        nihil magni autem iure incidunt inventore nulla.
                    </span>
                </ExperienceCardContent>
            </ExperienceCard>
        </Section>
    );
}
