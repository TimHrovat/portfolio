import { ExternalLink } from 'lucide-react';

import { GithubIcon } from '@/components/brand-icons';
import Reveal from '@/components/reveal';
import Section from '@/components/section';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardAction,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
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
                    <Reveal as="li" key={project.name} delay={index * 90}>
                        <Card
                            variant="interactive"
                            className="h-full [--card-spacing:--spacing(6)]"
                        >
                            <CardHeader>
                                <span className="eyebrow">{project.year}</span>
                                <CardAction>
                                    <span className="text-hairline font-display text-4xl leading-none">
                                        {String(index + 1).padStart(2, '0')}
                                    </span>
                                </CardAction>
                            </CardHeader>

                            <CardContent className="flex-1">
                                <CardTitle className="text-3xl">
                                    {project.name}
                                </CardTitle>
                                <p className="text-muted-foreground mt-3 text-sm">
                                    {project.summary}
                                </p>
                                <ul className="mt-6 flex flex-wrap gap-2">
                                    {project.stack.map((item) => (
                                        <Badge
                                            asChild
                                            key={item}
                                            variant="meta"
                                            size="md"
                                        >
                                            <li>{item}</li>
                                        </Badge>
                                    ))}
                                </ul>
                            </CardContent>

                            <CardFooter className="gap-1 px-(--card-spacing) py-3">
                                <Button asChild variant="ghost" size="sm">
                                    <a
                                        href={project.source}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <GithubIcon className="size-4" />
                                        Source
                                    </a>
                                </Button>
                                {project.live ? (
                                    <Button asChild variant="ghost" size="sm">
                                        <a
                                            href={project.live}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <ExternalLink />
                                            Live
                                        </a>
                                    </Button>
                                ) : null}
                            </CardFooter>
                        </Card>
                    </Reveal>
                ))}
            </ul>
        </Section>
    );
}
