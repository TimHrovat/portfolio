/**
 * The site's own address, and the one place it is written down.
 *
 * Every absolute URL the crawlers see is built off this: `metadataBase` in
 * app/layout.tsx, the canonical, the sitemap, the robots policy and the
 * `Person` graph. `NEXT_PUBLIC_SITE_URL` lets a preview deployment describe
 * itself honestly rather than claiming to be production — a preview that
 * canonicalises to the live domain is asking to be indexed in its place.
 */
export const SITE_URL = (
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://timhrovat.com'
).replace(/\/$/, '');

/** The share card: a real 1200×630 landscape image — see public/images/og.png. */
export const OG_IMAGE = {
    url: '/images/og.png',
    width: 1200,
    height: 630,
} as const;
