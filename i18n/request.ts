import { getRequestConfig } from 'next-intl/server';

import messages from '@/messages/en.json';

/**
 * One locale, no routing. The site ships in English and every string it
 * renders comes from messages/en.json — nothing is typed into a component.
 *
 * A second language is a file beside that one and a locale to choose between
 * them here; no route segment, no middleware and no call site changes.
 */
export const locale = 'en';

export default getRequestConfig(async () => ({ locale, messages }));
