import { getTranslations } from 'next-intl/server';

import Section from '@/components/section';
import Timeline from '@/components/timeline';
import { roles } from '@/lib/site';

export default async function Experience() {
    const t = await getTranslations('work');

    return (
        <Section
            id="work"
            eyebrow={t('eyebrow')}
            title={t('title')}
            lead={t('lead')}
        >
            <Timeline roles={roles} />
        </Section>
    );
}
