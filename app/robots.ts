import type { MetadataRoute } from 'next';

import { SITE_URL } from '@/lib/seo';

/**
 * Replaces the empty public/robots.txt, which said nothing and pointed at
 * nothing. A one-page site has nothing to keep out, so the only real work here
 * is naming the sitemap — that is the line crawlers actually use.
 *
 * `/_next/` is disallowed for tidiness rather than secrecy: it is build
 * output, and there is no reason for it in an index.
 */
export default function robots(): MetadataRoute.Robots {
    return {
        rules: [{ userAgent: '*', allow: '/', disallow: '/_next/' }],
        sitemap: `${SITE_URL}/sitemap.xml`,
        host: SITE_URL,
    };
}
