import type messages from '@/messages/en.json';

/**
 * The shape of the page's content: ids, links, assets and ordering. Not a word
 * of it is displayed — every string a reader sees lives in messages/en.json,
 * keyed by the ids below, so a translation is one more file and nothing else.
 *
 * The ids are read back off that file, which means an entry here without a
 * message behind it is a type error rather than a blank on the page.
 */
type Messages = typeof messages;

export const person = {
    cv: '/documents/Tim_Hrovat_CV.pdf',
    available: true,
} as const;

export type Social = {
    /** Keys `contact.socials` in messages. */
    id: keyof Messages['contact']['socials'];
    /** Keys the icon map in components/sections/contact.tsx. */
    icon: 'github' | 'linkedin' | 'mail' | 'discord';
    /** Absent on Discord, which is a handle rather than a link. */
    href?: string;
    /** The address lives in messages, as the one place it is written down, so
     *  the `mailto:` is built at the call site rather than stored here. */
    mailto?: true;
};

export const socials: Social[] = [
    { id: 'github', icon: 'github', href: 'https://github.com/TimHrovat' },
    {
        id: 'linkedin',
        icon: 'linkedin',
        href: 'https://www.linkedin.com/in/tim-hrovat-4255b61a6/',
    },
    { id: 'email', icon: 'mail', mailto: true },
    { id: 'discord', icon: 'discord' },
];

export type Role = {
    /** Keys `work.roles` in messages, which carries the title, the employer,
     *  the dates as they read, the description, and the highlights that mark
     *  the featured role. */
    id: keyof Messages['work']['roles'];
    href?: string;
    /** `YYYY-MM`. Orders the timeline; `end: null` means ongoing, which is
     *  what draws the "Now" marker. */
    start: string;
    end: string | null;
    /** Engineering roles get the accented mark; the rest read plain. */
    kind: 'engineering' | 'other';
    /** Square-ish mark in public/images/logos/. Omitted where the company has
     *  no usable logo — the rail falls back to a monogram. */
    logo?: string;
};

/**
 * What `work.roles.<id>` holds in messages. Declared rather than inferred from
 * en.json because two of its fields are there for some roles and not others,
 * and an inferred union cannot be read uniformly:
 *
 * - `highlights` is the featured role's spec sheet, and carrying it is what
 *   marks a role as featured. Grouped rather than flat: nine equal bullets are
 *   a list to skim past, three named groups are three things to remember.
 * - `stack` is omitted where the tools are not the point of the entry.
 */
export type RoleCopy = {
    title: string;
    company: string;
    /** Display labels. The machine-readable dates are `start` / `end` above. */
    from: string;
    to: string;
    /** One paragraph per entry. Most roles need one. */
    description: string[];
    highlights?: { label: string; items: string[] }[];
    stack?: string[];
};

/**
 * Every role. The timeline sorts by `start`, so the order here is only for
 * reading the file.
 */
export const roles: Role[] = [
    {
        id: 'easistent',
        href: 'https://www.easistent.com/stran/',
        start: '2022-12',
        end: null,
        kind: 'engineering',
        logo: '/images/logos/easistent.webp',
    },
    {
        id: 'phosphorland',
        href: 'https://www.phosphorland.pt/',
        start: '2022-05',
        end: '2022-06',
        kind: 'engineering',
        logo: '/images/logos/phosphorland.png',
    },
    {
        id: 'hella',
        href: 'https://www.hella.com/hella-si/sl/HELLA-Saturnus-Slovenija-61.html',
        start: '2021-08',
        end: '2021-08',
        kind: 'engineering',
        logo: '/images/logos/hella.svg',
    },
    {
        id: 'simpliservers',
        href: 'https://simpliservers.com/',
        start: '2022-01',
        end: '2022-07',
        kind: 'other',
        logo: '/images/logos/simpliservers.png',
    },
    {
        id: 'ppIntersearch',
        href: 'https://www.pp-intersearch.si/',
        start: '2019-06',
        end: '2019-09',
        kind: 'other',
        logo: '/images/logos/pp-intersearch.png',
    },
    {
        id: 'printboutiq',
        href: 'https://www.printboutiq.com/',
        start: '2017-04',
        end: '2022-03',
        kind: 'other',
        logo: '/images/logos/printboutiq.png',
    },
];

export type Education = {
    /** Keys `education.schools` in messages. */
    id: keyof Messages['education']['schools'];
    href: string;
    /** `YYYY-MM`, `null` while it is still running — which is what promotes
     *  `status` to a marked badge on the card. */
    end: string | null;
    logo: string;
};

export const education: Education[] = [
    {
        id: 'fri',
        href: 'https://fri.uni-lj.si/sl',
        end: null,
        logo: '/images/logos/fri.png',
    },
    {
        id: 'vegova',
        href: 'https://www.vegova.si/',
        end: '2023-06',
        logo: '/images/logos/vegova.png',
    },
];

export type Certification = {
    /** Keys `education.certifications` in messages. */
    id: keyof Messages['education']['certifications'];
    href?: string;
    logo: string;
};

export const certifications: Certification[] = [
    {
        id: 'ccna',
        href: 'https://www.netacad.com/courses/ccna-introduction-networks',
        logo: '/images/logos/cisco.svg',
    },
];

export type Project = {
    /** Keys `projects.items` in messages. */
    id: keyof Messages['projects']['items'];
    /** Omitted where the work is not public. The card says so rather than
     *  quietly dropping the link. */
    source?: string;
    live?: string;
};

/** First entry is the headline and gets the full width of the grid. */
export const projects: Project[] = [
    { id: 'easistentLanding', live: 'https://www.easistent.com/' },
    {
        id: 'phosphorland',
        source: 'https://github.com/TimHrovat/phosphorland-website',
        live: 'https://www.phosphorland.pt/',
    },
    { id: 'saveTheAnimals', source: 'https://github.com/TimHrovat/sdl-game' },
    {
        id: 'wordleEngine',
        source: 'https://github.com/TimHrovat/wordle-engine',
    },
    { id: 'imageEditor', source: 'https://github.com/TimHrovat/image-editor' },
];

export type Technology = {
    /** Keys `stack.technologies` in messages for the label, and names the file
     *  in public/images/technology-icons/ as `<id>.svg`. Both are the devicon
     *  slug — see the technology icons section of CLAUDE.md. */
    id: keyof Messages['stack']['technologies'];
    /** Marks are drawn straight onto the chip, which only works while they
     *  carry their own colour. A logo that is a single near-black gets the
     *  `--logo-plate` ground instead, or it disappears in dark mode. */
    plate?: true;
};

export const technologies: Technology[] = [
    { id: 'typescript' },
    { id: 'javascript' },
    { id: 'react' },
    { id: 'vuejs' },
    { id: 'nextjs' },
    { id: 'nuxtjs' },
    { id: 'nestjs' },
    { id: 'tailwindcss' },
    { id: 'html5' },
    { id: 'css3' },
    { id: 'php' },
    { id: 'laravel' },
    { id: 'wordpress' },
    { id: 'java' },
    { id: 'c' },
    { id: 'cplusplus' },
    { id: 'postgresql' },
    { id: 'mysql' },
    { id: 'mariadb' },
    { id: 'mongodb' },
    { id: 'prisma' },
    { id: 'redis' },
    { id: 'apachekafka' },
    { id: 'rabbitmq' },
    { id: 'kubernetes' },
    { id: 'argocd' },
    { id: 'rancher' },
    { id: 'netlify' },
    { id: 'go' },
    { id: 'jest' },
    { id: 'github', plate: true },
    { id: 'gitlab' },
    { id: 'npm' },
    { id: 'pnpm' },
    { id: 'figma' },
    { id: 'claude' },
];

export type NavigationItem = {
    /** Keys `nav.links` in messages. */
    id: keyof Messages['nav']['links'];
    href: string;
};

export const navigation: NavigationItem[] = [
    { id: 'about', href: '#about' },
    { id: 'work', href: '#work' },
    { id: 'education', href: '#education' },
    { id: 'stack', href: '#stack' },
    { id: 'projects', href: '#projects' },
];
