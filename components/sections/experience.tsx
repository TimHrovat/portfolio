import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';

import Reveal from '@/components/reveal';
import Section from '@/components/section';
import { Badge } from '@/components/ui/badge';
import {
    Card,
    CardAction,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { earlierRoles, education, experience } from '@/lib/site';
import type { Role } from '@/lib/site';

function RoleRow({ role, index }: { role: Role; index: number }) {
    const current = role.to === 'Present';

    return (
        <Reveal as="li" delay={index * 70}>
            <Separator />
            <a
                href={role.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group hover:bg-surface active:bg-surface-strong relative block px-2 py-7 transition-colors duration-200 md:px-4"
            >
                {/* Accent rail grows from the top edge on hover. */}
                <span
                    aria-hidden
                    className="bg-primary absolute top-0 left-0 h-px w-0 transition-[width] duration-500 ease-[var(--ease-settle)] group-hover:w-full"
                />
                <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:gap-8">
                    <p className="text-muted-foreground shrink-0 font-mono text-xs md:w-44">
                        {role.from} — {role.to}
                    </p>
                    <div className="min-w-0 flex-1">
                        <h3 className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xl md:text-2xl">
                            {role.title}
                            {current ? (
                                <Badge variant="accent">Now</Badge>
                            ) : null}
                        </h3>
                        <p className="text-muted-foreground group-hover:text-primary mt-1 text-sm transition-colors duration-200">
                            {role.company}
                        </p>
                        {role.description ? (
                            <p className="text-muted-foreground mt-3 max-w-2xl text-sm">
                                {role.description}
                            </p>
                        ) : null}
                    </div>
                    <ArrowUpRight
                        aria-hidden
                        className="text-muted-foreground group-hover:text-primary hidden size-5 shrink-0 transition-[transform,color] duration-200 ease-[var(--ease-settle)] group-hover:translate-x-1 group-hover:-translate-y-1 md:block"
                    />
                </div>
            </a>
        </Reveal>
    );
}

export default function Experience() {
    return (
        <Section
            id="work"
            eyebrow="Experience"
            title={
                <>
                    Where I&rsquo;ve worked
                    <span className="text-primary">.</span>
                </>
            }
        >
            <ul>
                {experience.map((role, index) => (
                    <RoleRow key={role.company} role={role} index={index} />
                ))}
            </ul>
            <Separator />

            <Reveal className="mt-16">
                <h3 className="eyebrow">Before engineering</h3>
                <p className="text-muted-foreground mt-3 max-w-xl text-sm">
                    Roles that ran alongside school and, in a couple of cases,
                    alongside each other.
                </p>
                <ul className="mt-6 grid gap-x-8 gap-y-5 sm:grid-cols-2">
                    {earlierRoles.map((role) => (
                        <li
                            key={role.company}
                            className="border-hairline border-l pl-4"
                        >
                            <a
                                href={role.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-primary text-sm transition-colors"
                            >
                                {role.title}
                            </a>
                            <p className="text-muted-foreground mt-1 font-mono text-xs">
                                {role.company} · {role.from} — {role.to}
                            </p>
                        </li>
                    ))}
                </ul>
            </Reveal>

            <Reveal className="mt-20">
                <h3 className="eyebrow">Education</h3>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {education.map((item) => (
                        <Card
                            asChild
                            key={item.school}
                            variant="interactive"
                            className="[--card-spacing:--spacing(6)]"
                        >
                            <a
                                href={item.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group"
                            >
                                <CardHeader>
                                    {/* Both logos are dark wordmarks, so they
                                        sit on a light plate to stay legible in
                                        dark mode. */}
                                    <span className="bg-logo-plate flex h-15 w-fit items-center rounded-lg px-4">
                                        <Image
                                            src={item.logo}
                                            alt={`${item.school} logo`}
                                            width={item.logoWidth}
                                            height={item.logoHeight}
                                            className="h-8 w-auto max-w-[9.5rem] object-contain"
                                        />
                                    </span>
                                    <CardAction>
                                        <Badge variant="meta" size="default">
                                            {item.status}
                                        </Badge>
                                    </CardAction>
                                </CardHeader>
                                <CardContent>
                                    <CardTitle className="group-hover:text-primary flex items-center gap-2 text-lg transition-colors">
                                        {item.school}
                                        <ArrowUpRight
                                            aria-hidden
                                            className="size-4 transition-transform duration-200 ease-[var(--ease-settle)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                        />
                                    </CardTitle>
                                    <p className="mt-2 text-sm">
                                        {item.programme}
                                    </p>
                                    <p className="text-muted-foreground mt-1 text-sm">
                                        {item.detail}
                                    </p>
                                </CardContent>
                            </a>
                        </Card>
                    ))}
                </div>
            </Reveal>
        </Section>
    );
}
