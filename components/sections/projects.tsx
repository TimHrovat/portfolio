import { ExternalLink } from 'lucide-react';

import { GithubIcon } from '@/components/brand-icons';
import Reveal from '@/components/reveal';
import Section from '@/components/section';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { projects } from '@/lib/site';

export default function Projects() {
    return (
        <Section
            id="projects"
            eyebrow="Projects"
            title={
                <>
                    Things I&rsquo;ve built
                    <span className="text-primary">.</span>
                </>
            }
        >
            <ul className="grid gap-5 md:grid-cols-2">
                {projects.map((project, index) => (
                    <Reveal
                        as="li"
                        key={project.name}
                        delay={index * 80}
                        // The headline project takes the full width; the rest
                        // pair up underneath it.
                        className={index === 0 ? 'md:col-span-2' : undefined}
                    >
                        <Card glass interactive className="h-full gap-0">
                            <h3 className="font-display text-2xl leading-tight font-bold tracking-tight">
                                {project.name}
                            </h3>
                            <p className="text-muted-foreground mt-3 flex-1 text-sm text-pretty">
                                {project.summary}
                            </p>

                            <ul className="mt-6 flex flex-wrap gap-2">
                                {project.stack.map((item) => (
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
                                {project.source ? (
                                    <Button
                                        href={project.source}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        variant="ghost"
                                        size="sm"
                                    >
                                        <GithubIcon className="size-4" />
                                        Source
                                    </Button>
                                ) : null}
                                {project.live ? (
                                    <Button
                                        href={project.live}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        variant="ghost"
                                        size="sm"
                                    >
                                        <ExternalLink />
                                        Live
                                    </Button>
                                ) : null}
                                {/* Said out loud, so a missing Source button
                                    reads as a fact about the work rather than
                                    an oversight. */}
                                {project.source ? null : (
                                    <Badge
                                        variant="meta"
                                        size="sm"
                                        className="ml-auto"
                                    >
                                        Closed source
                                    </Badge>
                                )}
                            </div>
                        </Card>
                    </Reveal>
                ))}
            </ul>
        </Section>
    );
}
