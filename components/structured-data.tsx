import { getMessages, getTranslations } from 'next-intl/server';

import { OG_IMAGE, SITE_URL } from '@/lib/seo';
import {
    education,
    person,
    roles,
    socials,
    technologies,
    type RoleCopy,
} from '@/lib/site';

/**
 * A `Person` graph in JSON-LD. This is the half of the page a search engine
 * reads rather than renders, and it is what a name search has to work with —
 * without it, "Tim Hrovat" is a title tag and some prose, and the employer,
 * the schools and the profiles elsewhere are all things a crawler has to
 * infer.
 *
 * Every value is read from the same messages and `lib/site.ts` the page itself
 * renders from, so the graph cannot drift from what a reader sees. Nothing is
 * asserted here that is not on the page.
 *
 * `worksFor` is whichever role is ongoing rather than a hardcoded employer:
 * `end: null` is already the timeline's rule for that, so the graph follows
 * the CV instead of needing its own edit.
 */
export default async function StructuredData() {
    const t = await getTranslations();
    const messages = await getMessages();

    const current = roles.find((role) => role.end === null);
    const currentCopy = current
        ? (messages.work.roles[current.id] as RoleCopy)
        : undefined;

    const graph = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        '@id': `${SITE_URL}/#person`,
        name: t('person.name'),
        url: SITE_URL,
        image: `${SITE_URL}${OG_IMAGE.url}`,
        jobTitle: t('person.role'),
        description: t('meta.shareDescription'),
        email: `mailto:${t('person.email')}`,
        address: {
            '@type': 'PostalAddress',
            addressLocality: person.locality,
            addressCountry: person.country,
        },
        // Only the profiles that are actually links — Discord is a handle, and
        // a `sameAs` that does not resolve is worse than one fewer.
        sameAs: socials
            .map((social) => social.href)
            .filter((href): href is string => href !== undefined),
        ...(currentCopy && current
            ? {
                  worksFor: {
                      '@type': 'Organization',
                      name: currentCopy.company,
                      ...(current.href ? { url: current.href } : {}),
                  },
              }
            : {}),
        alumniOf: education.map((school) => ({
            '@type': 'EducationalOrganization',
            name: messages.education.schools[school.id].school,
            url: school.href,
        })),
        knowsAbout: technologies.map((technology) =>
            t(`stack.technologies.${technology.id}`),
        ),
    };

    return (
        <script
            type="application/ld+json"
            // The values are ours, but a `<` reaching a script element still
            // ends it early — escaped so the block cannot be broken out of
            // whatever a message ever comes to hold.
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(graph).replace(/</g, '\\u003c'),
            }}
        />
    );
}
