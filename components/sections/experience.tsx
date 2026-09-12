import { getTranslations } from 'next-intl/server';

import OtherRoles from '@/components/other-roles';
import Section from '@/components/section';
import Timeline from '@/components/timeline';
import { otherRoles, roles } from '@/lib/site';

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
            <OtherRoles roles={otherRoles} />
        </Section>
    );
}
