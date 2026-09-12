import { ExternalLink } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import { GithubIcon } from '@/components/brand-icons';
import Reveal from '@/components/reveal';
import Section from '@/components/section';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import ProjectPreview from '@/components/project-preview';
import { projects } from '@/lib/site';
import { cn } from '@/lib/utils';

export default async function Projects() {
    const t = await getTranslations('projects');

    return (
        <Section id="projects" eyebrow={t('eyebrow')} title={t('title')}>
            {/* A swipeable row on phones, where five cards stacked were most
                of the page; the grid from `md` up. The next card peeks in
                from the edge, which is what says the row scrolls. */}
            <div className="projects-carousel">
                <ul className="-mx-6 flex snap-x snap-mandatory scroll-px-6 gap-4 overflow-x-auto px-6 pb-2 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:px-0 md:pb-0">
                    {projects.map((project, index) => (
                        <Reveal
                            as="li"
                            key={project.id}
                            delay={index * 80}
                            // The headline project takes the full width; the rest
                            // pair up underneath it.
                            className={cn(
                                'w-[85%] shrink-0 snap-start md:w-auto',
                                index === 0 && 'md:col-span-2',
                            )}
                        >
                            <Card
                                glass
                                interactive
                                className={cn(
                                    'h-full gap-0',
                                    // The headline puts its scene beside the copy,
                                    // so it gains no height; the rest lead with it.
                                    index === 0 &&
                                        'md:grid md:grid-cols-[1fr_20rem] md:gap-x-8',
                                )}
                            >
                                <ProjectPreview
                                    id={project.id}
                                    className={cn(
                                        'mb-6',
                                        index === 0 &&
                                            'md:col-start-2 md:row-span-5 md:row-start-1 md:mb-0 md:h-auto md:min-h-40',
                                    )}
                                />
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
                                <div className="-mb-1 flex items-center gap-1 pt-3">
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
                                    {project.live ? (
                                        <Button
                                            href={project.live}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            variant="ghost"
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
                {/* How far through the row the reader is, filled by the row's
                own scroll position. Phones only, like the row. */}
                <div
                    aria-hidden
                    className="projects-progress mx-auto mt-4 w-24 md:hidden"
                >
                    <span />
                </div>
            </div>
        </Section>
    );
}
