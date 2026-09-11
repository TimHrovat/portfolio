'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';

import TechnologyBadge from '@/components/technology-badge';

import Section from './section';

type Technology = { label: string; icon: string };

const initialTechnologies: Technology[] = [
    { label: 'Tailwind CSS', icon: 'tailwind.svg' },
    { label: 'HTML', icon: 'html5.svg' },
    { label: 'CSS', icon: 'css3.svg' },
    { label: 'JavaScript', icon: 'javascript.svg' },
    { label: 'TypeScript', icon: 'typescript.svg' },
    { label: 'VueJS', icon: 'vuejs.svg' },
    { label: 'ReactJS', icon: 'react.svg' },
    { label: 'Nuxt', icon: 'nuxt.svg' },
    { label: 'NestJS', icon: 'nest.svg' },
    { label: 'NextJS', icon: 'next.svg' },
    { label: 'C', icon: 'c.svg' },
    { label: 'C++', icon: 'cpp.svg' },
    { label: 'Java', icon: 'java.svg' },
    { label: 'PHP', icon: 'php.svg' },
    { label: 'Laravel', icon: 'laravel.png' },
    { label: 'Wordpress', icon: 'wordpress.svg' },
    { label: 'Embedded Systems', icon: 'embedded.png' },
    { label: 'MariaDB', icon: 'mariadb.svg' },
    { label: 'MongoDB', icon: 'mongo.png' },
    { label: 'MySQL', icon: 'mysql.png' },
    { label: 'Postgres', icon: 'postgres.png' },
    { label: 'Prisma ORM', icon: 'prisma.png' },
];

export default function SectionTechnologies() {
    const grid = useRef<HTMLDivElement>(null);

    // Shuffled by reordering the rendered badges rather than the array: the
    // page is prerendered, so a shuffle during render would bake one order
    // into the HTML and mismatch on hydration.
    useEffect(() => {
        const badges = [...(grid.current?.children ?? [])] as HTMLElement[];
        const order = badges
            .map((_, index) => index)
            .sort(() => Math.random() - 0.5);

        badges.forEach((badge, index) => {
            badge.style.order = String(order[index]);
        });
    }, []);

    return (
        <Section>
            <h2 className="text-3xl font-semibold md:text-3xl">
                Technologies I&apos;ve worked with
            </h2>
            <div
                ref={grid}
                className="flex flex-wrap items-center justify-center gap-4"
            >
                {initialTechnologies.map((technology) => (
                    <TechnologyBadge
                        key={technology.icon}
                        className="flex cursor-default gap-2.5"
                    >
                        <Image
                            src={`/images/technology-icons/${technology.icon}`}
                            alt=""
                            width={32}
                            height={32}
                            className="h-auto w-8"
                            unoptimized
                        />
                        {technology.label}
                    </TechnologyBadge>
                ))}
            </div>
        </Section>
    );
}
