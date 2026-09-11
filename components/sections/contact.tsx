import { ArrowUpRight, Mail } from 'lucide-react';
import type { ComponentType } from 'react';

import {
    DiscordIcon,
    GithubIcon,
    LinkedinIcon,
} from '@/components/brand-icons';
import Reveal from '@/components/reveal';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { person, socials } from '@/lib/site';

const icons: Record<string, ComponentType<{ className?: string }>> = {
    github: GithubIcon,
    linkedin: LinkedinIcon,
    discord: DiscordIcon,
    mail: Mail,
};

export default function Contact() {
    return (
        <section
            id="contact"
            className="relative scroll-mt-28 overflow-hidden px-6 py-28 md:py-40"
        >
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-10"
                style={{
                    background:
                        'radial-gradient(50rem 30rem at 50% 100%, color-mix(in oklab, var(--primary) calc(var(--glow-strength) * 110%), transparent), transparent 70%)',
                }}
            />

            <div className="mx-auto w-full max-w-5xl">
                <Reveal>
                    <p className="eyebrow flex items-center gap-3">
                        <span className="bg-primary h-px w-8" aria-hidden />
                        Contact
                    </p>
                </Reveal>

                <Reveal delay={80}>
                    <h2 className="mt-6 max-w-3xl text-[clamp(2.25rem,6vw_+_1.25rem,6rem)] leading-[0.95] text-balance">
                        Let&rsquo;s build something{' '}
                        <span className="text-primary italic">together</span>.
                    </h2>
                </Reveal>

                <Reveal delay={140}>
                    <Button
                        asChild
                        variant="link"
                        size="xl"
                        className="group mt-12 h-auto px-0 text-lg md:text-2xl"
                    >
                        <a href={`mailto:${person.email}`}>
                            <span className="border-hairline group-hover:border-primary border-b pb-1 transition-colors duration-200">
                                {person.email}
                            </span>
                            <ArrowUpRight
                                aria-hidden
                                className="text-primary size-6! shrink-0 transition-transform duration-200 ease-[var(--ease-settle)] group-hover:translate-x-1 group-hover:-translate-y-1"
                            />
                        </a>
                    </Button>
                </Reveal>

                <Reveal delay={200}>
                    <Separator className="mt-16" />
                    <ul className="mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
                        {socials.map((social) => {
                            const Icon = icons[social.icon];
                            const content = (
                                <>
                                    <span className="eyebrow flex items-center gap-2">
                                        <Icon className="text-primary size-3.5" />
                                        {social.label}
                                    </span>
                                    <span className="mt-1.5 block text-sm break-all">
                                        {social.handle}
                                    </span>
                                </>
                            );

                            return (
                                <li key={social.label}>
                                    {social.href ? (
                                        <a
                                            href={social.href}
                                            target={
                                                social.href.startsWith(
                                                    'mailto:',
                                                )
                                                    ? undefined
                                                    : '_blank'
                                            }
                                            rel="noopener noreferrer"
                                            className="hover:text-primary active:text-primary block transition-colors duration-200"
                                        >
                                            {content}
                                        </a>
                                    ) : (
                                        <div className="text-muted-foreground">
                                            {content}
                                        </div>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </Reveal>
            </div>
        </section>
    );
}
