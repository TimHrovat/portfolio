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
        "Currently finishing my Computer Science degree at FRI UNI Ljubljana. The thesis is all that's left.",
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
    /** Display label. */
    from: string;
    to: string;
    /** `YYYY-MM`. Orders the timeline; `end: null` means ongoing, which is
     *  what draws the "Now" marker. */
    start: string;
    end: string | null;
    /** Engineering roles get the accented mark; the rest read plain. */
    kind: 'engineering' | 'other';
    /** One paragraph per entry. Most roles need one. */
    description: string[];
    /** Only the role substantial enough to be worth itemising carries these,
     *  which is also what marks it as the featured one. Grouped rather than
     *  flat: nine equal bullets are a list to skim past, three named groups
     *  are three things to remember. */
    highlights?: { label: string; items: string[] }[];
    /** Square-ish mark in public/images/logos/. Omitted where the company has
     *  no usable logo — the rail falls back to a monogram. */
    logo?: string;
    stack?: string[];
};

/**
 * Every role. The timeline sorts by `start`, so the order here is only for
 * reading the file.
 */
export const roles: Role[] = [
    {
        title: 'Software Developer',
        company: 'eŠola d.o.o. (eAsistent)',
        href: 'https://www.easistent.com/stran/',
        from: 'Dec 2022',
        to: 'Present',
        start: '2022-12',
        end: null,
        kind: 'engineering',
        logo: '/images/logos/easistent.webp',
        description: [
            'My first engineering job, and the one that taught me the most. Full stack work on eAsistent, the school platform used by schools, teachers, students and parents across Slovenia. A student contract on paper, but effectively full time for three years, and independent enough to take projects end to end.',
        ],
        highlights: [
            {
                label: 'Built alone',
                items: [
                    'The company UI library. Designed and built on my own, and every new project now starts on it.',
                    'The public landing page and the sign-in behind it, end to end.',
                ],
            },
            {
                label: 'Across the stack',
                items: [
                    'Keeping the legacy code running and integrating with it, then the migrations off it: Laravel 5 to 12, Vue 2 to 3.',
                    'The CI/CD pipelines, and the infrastructure they deploy onto.',
                    'Backend, frontend and database. The whole path rather than a slice of it.',
                    'Prediction models, and the constraint-heavy algorithms behind the timetable generator.',
                ],
            },
            {
                label: 'Beyond the code',
                items: [
                    'Mentoring new hires and students on placement.',
                    'The technical side of our hiring interviews.',
                    'Planning and leading projects.',
                ],
            },
        ],
        stack: ['PHP', 'Laravel', 'Vue', 'TypeScript', 'NestJS', 'PostgreSQL'],
    },
    {
        title: 'Software Development Intern',
        company: 'Phosphorland',
        href: 'https://www.phosphorland.pt/',
        from: 'May 2022',
        to: 'Jun 2022',
        start: '2022-05',
        end: '2022-06',
        kind: 'engineering',
        logo: '/images/logos/phosphorland.png',
        description: [
            'Built the company website front to back during a month-long internship in Portugal: authentication, file storage and realtime data on Firebase, localised end to end with i18next.',
        ],
        stack: ['React', 'Firebase', 'i18next'],
    },
    {
        title: 'Engineering Intern',
        company: 'Hella Saturnus Slovenia',
        href: 'https://www.hella.com/hella-si/sl/HELLA-Saturnus-Slovenija-61.html',
        from: 'Aug 2021',
        to: 'Aug 2021',
        start: '2021-08',
        end: '2021-08',
        kind: 'engineering',
        logo: '/images/logos/hella.svg',
        description: [
            'A week on the factory floor building a quality-checking system for car headlight assembly. It automated a step of the build process that had been done by hand.',
        ],
    },
    {
        title: 'Assistant & Community Support',
        company: 'Simpliservers',
        href: 'https://simpliservers.com/',
        from: 'Jan 2022',
        to: 'Jul 2022',
        start: '2022-01',
        end: '2022-07',
        kind: 'other',
        logo: '/images/logos/simpliservers.png',
        description: [
            'Front-line support for a game server hosting provider: troubleshooting customer setups, answering the community, and escalating the problems that turned out to be real bugs.',
        ],
    },
    {
        title: 'Data Analyst',
        company: 'P&P InterSearch Slovenia',
        href: 'https://www.pp-intersearch.si/',
        from: 'Jun 2019',
        to: 'Sep 2019',
        start: '2019-06',
        end: '2019-09',
        kind: 'other',
        logo: '/images/logos/pp-intersearch.png',
        description: [
            'A summer at an executive search firm, cleaning and structuring candidate and company data so it could actually be searched and reported on.',
        ],
    },
    {
        title: 'Online Store Admin & Digital Print Operator',
        company: 'Printboutiq',
        href: 'https://www.printboutiq.com/',
        from: 'Apr 2017',
        to: 'Mar 2022',
        start: '2017-04',
        end: '2022-03',
        kind: 'other',
        logo: '/images/logos/printboutiq.png',
        description: [
            'Five years alongside school running the online store and the digital printing equipment. Product listings and orders on one side, operating and maintaining the machines on the other.',
        ],
    },
];

export type Education = {
    school: string;
    href: string;
    /** `YYYY-MM`, `null` while it is still running — which is what promotes
     *  `status` to a marked badge on the card. */
    end: string | null;
    /** Year-only label, which is the precision actually confirmed. */
    years: string;
    programme: string;
    detail: string;
    status: string;
    logo: string;
};

export const education: Education[] = [
    {
        school: 'FRI UNI Ljubljana',
        href: 'https://fri.uni-lj.si/sl',
        end: null,
        years: '2023 – Present',
        programme: 'Computer Science, BSc',
        detail: 'Thesis is the only remaining requirement.',
        status: 'In progress',
        logo: '/images/logos/fri.png',
    },
    {
        school: 'Vegova Ljubljana',
        href: 'https://www.vegova.si/',
        end: '2023-06',
        years: '2019 – 2023',
        programme: 'Software Engineering',
        detail: 'Four-year technical programme.',
        status: 'Completed',
        logo: '/images/logos/vegova.png',
    },
];

export type Certification = {
    name: string;
    issuer: string;
    href?: string;
    /** Certificates are a point in time, not a span. */
    date: string;
    detail: string;
    logo: string;
};

export const certifications: Certification[] = [
    {
        name: 'CCNA: Introduction to Networks',
        issuer: 'Cisco',
        href: 'https://www.netacad.com/courses/ccna-introduction-networks',
        date: 'Issued May 2023',
        detail: 'Networking fundamentals: the model, routing and switching, addressing.',
        logo: '/images/logos/cisco.svg',
    },
];

export type Project = {
    name: string;
    summary: string;
    stack: string[];
    /** Omitted where the work is not public. The card says so rather than
     *  quietly dropping the link. */
    source?: string;
    live?: string;
};

/** First entry is the headline and gets the full width of the grid. */
export const projects: Project[] = [
    {
        name: 'eAsistent landing page',
        summary:
            'The public face of eAsistent, built end to end, and the sign-in behind it: two-factor, YubiKey, QR-code login from a signed-in phone, PIN and CAPTCHA. That is a lot of ways in, for an audience that ranges from teachers to parents to a fourteen-year-old on a school laptop.',
        stack: ['PHP', 'Laravel', 'Vue'],
        live: 'https://www.easistent.com/',
    },
    {
        name: 'Phosphorland',
        summary:
            'Company site with authentication, file storage and realtime data on Firebase, localised end to end with i18next.',
        stack: ['React', 'Firebase', 'i18next'],
        source: 'https://github.com/TimHrovat/phosphorland-website',
        live: 'https://www.phosphorland.pt/',
    },
    {
        name: 'Save the Animals',
        summary:
            'A game written from scratch against SDL2. An exercise in object-oriented design, and in hunting down memory leaks in C++.',
        stack: ['C++', 'SDL2'],
        source: 'https://github.com/TimHrovat/sdl-game',
    },
    {
        name: 'Wordle Engine',
        summary:
            'A solver that plays Wordle against a dictionary, narrowing the candidate set from each guess. Written in Java with its own test harness to score it over every word in the list.',
        stack: ['Java'],
        source: 'https://github.com/TimHrovat/wordle-engine',
    },
    {
        name: 'Image Editor',
        summary:
            'An in-browser image editor built on the canvas API with no framework and no dependencies. Just plain HTML, CSS and JavaScript.',
        stack: ['JavaScript', 'Canvas', 'CSS'],
        source: 'https://github.com/TimHrovat/image-editor',
    },
];

export type Technology = {
    label: string;
    icon: string;
    /** Marks are drawn straight onto the chip, which only works while they
     *  carry their own colour. A logo that is a single near-black gets the
     *  `--logo-plate` ground instead, or it disappears in dark mode. */
    plate?: true;
};

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
    { label: 'PostgreSQL', icon: 'postgresql.svg' },
    { label: 'MySQL', icon: 'mysql.svg' },
    { label: 'MariaDB', icon: 'mariadb.svg' },
    { label: 'MongoDB', icon: 'mongodb.svg' },
    { label: 'Prisma', icon: 'prisma.svg' },
    { label: 'Redis', icon: 'redis.svg' },
    { label: 'Kafka', icon: 'apachekafka.svg' },
    { label: 'RabbitMQ', icon: 'rabbitmq.svg' },
    { label: 'Kubernetes', icon: 'kubernetes.svg' },
    { label: 'Argo CD', icon: 'argocd.svg' },
    { label: 'Rancher', icon: 'rancher.svg' },
    { label: 'Netlify', icon: 'netlify.svg' },
    { label: 'Go', icon: 'go.svg' },
    { label: 'Jest', icon: 'jest.svg' },
    { label: 'GitHub', icon: 'github.svg', plate: true },
    { label: 'GitLab', icon: 'gitlab.svg' },
    { label: 'npm', icon: 'npm.svg' },
    { label: 'pnpm', icon: 'pnpm.svg' },
    { label: 'Figma', icon: 'figma.svg' },
    { label: 'Claude', icon: 'claude.svg' },
];

export const navigation = [
    { label: 'About', href: '#about' },
    { label: 'Work', href: '#work' },
    { label: 'Education', href: '#education' },
    { label: 'Stack', href: '#stack' },
    { label: 'Projects', href: '#projects' },
] as const;
