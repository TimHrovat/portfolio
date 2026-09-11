/**
 * Every piece of copy and data the page renders. Kept in one typed file so the
 * sections stay presentational and content edits never touch JSX.
 */

export const person = {
    name: 'Tim Hrovat',
    role: 'Full Stack Developer',
    location: 'Ljubljana, Slovenia',
    email: 'tim.hrovat16@gmail.com',
    cv: '/documents/Tim_Hrovat_CV.pdf',
    available: true,
} as const;

export const intro = {
    lead: 'I build the parts people actually touch',
    body: 'Full stack developer at eŠola, the team behind eAsistent, a school platform used across Slovenia. I care about interfaces that feel immediate, code that stays readable a year later, and shipping things that hold up under real traffic.',
    closing:
        "Currently finishing my Computer Science degree at FRI UNI Ljubljana — thesis is all that's left.",
} as const;

export type Social = {
    label: string;
    handle: string;
    href?: string;
    note?: string;
    /** Key into the icon map in components/sections/contact.tsx. */
    icon: 'github' | 'linkedin' | 'mail' | 'discord';
};

export const socials: Social[] = [
    {
        label: 'GitHub',
        handle: '@TimHrovat',
        href: 'https://github.com/TimHrovat',
        icon: 'github',
    },
    {
        label: 'LinkedIn',
        handle: '@tim-hrovat',
        href: 'https://www.linkedin.com/in/tim-hrovat-4255b61a6/',
        icon: 'linkedin',
    },
    {
        label: 'Email',
        handle: 'tim.hrovat16@gmail.com',
        href: 'mailto:tim.hrovat16@gmail.com',
        icon: 'mail',
    },
    { label: 'Discord', handle: 'timhrovat', note: 'Say hi', icon: 'discord' },
];

export type Role = {
    title: string;
    company: string;
    href?: string;
    from: string;
    to: string;
    /** Shown as a short paragraph under the title. Optional by design — the
     *  row reads as complete without one. */
    description?: string;
    stack?: string[];
};

/** Engineering roles, most recent first. */
export const experience: Role[] = [
    {
        title: 'Software Developer',
        company: 'eŠola d.o.o. (eAsistent)',
        href: 'https://www.easistent.com/stran/',
        from: 'Dec 2022',
        to: 'Present',
    },
    {
        title: 'Software Development Intern',
        company: 'Phosphorland',
        href: 'https://www.phosphorland.pt/',
        from: 'May 2022',
        to: 'Jun 2022',
    },
    {
        title: 'Assistant & Community Support',
        company: 'Simpliservers',
        href: 'https://simpliservers.com/',
        from: 'Jan 2022',
        to: 'Jul 2022',
    },
];

/**
 * Non-engineering roles. Several ran for years alongside the ones above, so
 * they are listed as a compact set rather than forced onto one timeline.
 */
export const earlierRoles: Role[] = [
    {
        title: 'Cost Analyst & Documentation Editor',
        company: 'Emona Plus d.o.o.',
        href: 'https://www.emonaplus.si/',
        from: 'Feb 2018',
        to: 'Jan 2023',
    },
    {
        title: 'Online Store Admin & Digital Print Operator',
        company: 'Printboutiq',
        href: 'https://www.printboutiq.com/',
        from: 'Apr 2017',
        to: 'Mar 2022',
    },
    {
        title: 'Maintenance Worker',
        company: 'Hella Saturnus Slovenia',
        href: 'https://www.hella.com/hella-si/sl/HELLA-Saturnus-Slovenija-61.html',
        from: 'Aug 2021',
        to: 'Sep 2021',
    },
    {
        title: 'Data Analyst',
        company: 'P&P InterSearch Slovenia',
        href: 'https://www.pp-intersearch.si/',
        from: 'Jun 2019',
        to: 'Sep 2019',
    },
];

export type Education = {
    school: string;
    href: string;
    programme: string;
    detail: string;
    status: string;
    /** Official logo, taken from the school's own site. Both are dark
     *  wordmarks, so they render on a white plate to survive dark mode. */
    logo: string;
    logoWidth: number;
    logoHeight: number;
};

export const education: Education[] = [
    {
        school: 'FRI UNI Ljubljana',
        href: 'https://fri.uni-lj.si/sl',
        programme: 'Computer Science, BSc',
        detail: 'Thesis is the only remaining requirement.',
        status: 'In progress',
        logo: '/images/schools/fri.png',
        logoWidth: 880,
        logoHeight: 325,
    },
    {
        school: 'Vegova Ljubljana',
        href: 'https://www.vegova.si/',
        programme: 'Software Engineering',
        detail: 'Four-year technical programme.',
        status: 'Completed',
        logo: '/images/schools/vegova.png',
        logoWidth: 466,
        logoHeight: 93,
    },
];

export type Project = {
    name: string;
    year: string;
    summary: string;
    stack: string[];
    source: string;
    live?: string;
};

export const projects: Project[] = [
    {
        name: 'Phosphorland',
        year: 'Internship',
        summary:
            'Front-end build with authentication, file storage and realtime data on Firebase, localised end to end with i18next.',
        stack: ['React', 'Firebase', 'i18next'],
        source: 'https://github.com/TimHrovat/phosphorland-website',
        live: 'https://www.phosphorland.pt/',
    },
    {
        name: 'Save the Animals',
        year: 'Coursework',
        summary:
            'A game written from scratch against SDL2 — an exercise in object-oriented design and in hunting down memory leaks in C++.',
        stack: ['C++', 'SDL2'],
        source: 'https://github.com/TimHrovat/sdl-game',
    },
];

export type Technology = { label: string; icon: string };

export const technologies: Technology[] = [
    { label: 'TypeScript', icon: 'typescript.svg' },
    { label: 'JavaScript', icon: 'javascript.svg' },
    { label: 'React', icon: 'react.svg' },
    { label: 'Vue', icon: 'vuejs.svg' },
    { label: 'Next.js', icon: 'nextjs.svg' },
    { label: 'Nuxt', icon: 'nuxtjs.svg' },
    { label: 'NestJS', icon: 'nestjs.svg' },
    { label: 'Tailwind CSS', icon: 'tailwindcss.svg' },
    { label: 'HTML', icon: 'html5.svg' },
    { label: 'CSS', icon: 'css3.svg' },
    { label: 'PHP', icon: 'php.svg' },
    { label: 'Laravel', icon: 'laravel.svg' },
    { label: 'WordPress', icon: 'wordpress.svg' },
    { label: 'Java', icon: 'java.svg' },
    { label: 'C', icon: 'c.svg' },
    { label: 'C++', icon: 'cplusplus.svg' },
    { label: 'Embedded Systems', icon: 'embeddedc.svg' },
    { label: 'PostgreSQL', icon: 'postgresql.svg' },
    { label: 'MySQL', icon: 'mysql.svg' },
    { label: 'MariaDB', icon: 'mariadb.svg' },
    { label: 'MongoDB', icon: 'mongodb.svg' },
    { label: 'Prisma', icon: 'prisma.svg' },
];

export const navigation = [
    { label: 'About', href: '#about' },
    { label: 'Stack', href: '#stack' },
    { label: 'Work', href: '#work' },
    { label: 'Projects', href: '#projects' },
] as const;
