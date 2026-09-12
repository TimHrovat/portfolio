import type { MetadataRoute } from 'next';

import { SITE_URL } from '@/lib/seo';

/**
 * One page, one entry. The sections are `#` fragments of it rather than routes,
 * and a fragment is not a URL a crawler indexes separately — listing them would
 * be noise at best and duplicate-content signals at worst.
 *
 * `lastModified` is the build time, which for a static site is exactly when the
 * content last changed.
 */
export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: `${SITE_URL}/`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1,
        },
    ];
}
