import { ExternalLink } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import { GithubIcon } from '@/components/brand-icons';
import Reveal from '@/components/reveal';
import Section from '@/components/section';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { projects } from '@/lib/site';

export default async function Projects() {
    const t = await getTranslations('projects');

    return (
        <Section id="projects" eyebrow={t('eyebrow')} title={t('title')}>
            <ul className="grid gap-5 md:grid-cols-2">
                {projects.map((project, index) => (
                    <Reveal
                        as="li"
                        key={project.id}
                        delay={index * 80}
                        // The headline project takes the full width; the rest
                        // pair up underneath it.
                        className={index === 0 ? 'md:col-span-2' : undefined}
                    >
                        <Card glass interactive className="h-full gap-0">
                            <h3 className="font-display text-2xl leading-tight font-bold tracking-tight">
                                {t(`items.${project.id}.name`)}
                            </h3>
                            <p className="text-muted-foreground mt-3 flex-1 text-sm text-pretty">
                                {t(`items.${project.id}.summary`)}
                            </p>

                            <ul className="mt-6 flex flex-wrap gap-2">
                                {(
                                    t.raw(
                                        `items.${project.id}.stack`,
                                    ) as string[]
                                ).map((item) => (
                                    <Badge
                                        as="li"
                                        key={item}
                                        variant="meta"
                                        size="sm"
                                    >
                                        {item}
                                    </Badge>
                                ))}
                            </ul>

                            <Separator className="mt-6" />
                            <div className="-mb-1 flex items-center gap-2 pt-3">
                                {/* Source and its absence occupy the same slot:
                                    the row reads the same whether the code is
                                    public or not, and a closed-source project
                                    says so rather than quietly showing one
                                    button fewer. */}
                                {project.source ? (
                                    <Button
                                        href={project.source}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        variant="ghost"
                                        size="sm"
                                    >
                                        <GithubIcon className="size-4" />
                                        {t('source')}
                                    </Button>
                                ) : (
                                    <Badge variant="meta" size="sm">
                                        {t('closedSource')}
                                    </Badge>
                                )}
                                {/* The one thing on the card a reader can go
                                    and use, so it carries the accent. */}
                                {project.live ? (
                                    <Button
                                        href={project.live}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        variant="primary"
                                        size="sm"
                                    >
                                        <ExternalLink />
                                        {t('live')}
                                    </Button>
                                ) : null}
                            </div>
                        </Card>
                    </Reveal>
                ))}
            </ul>
        </Section>
    );
}
