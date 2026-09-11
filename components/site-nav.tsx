'use client';

import { Mail, Menu } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

import Drawer from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { navigation, person } from '@/lib/site';
import { cn } from '@/lib/utils';

export default function SiteNav() {
    const [elevated, setElevated] = useState(false);
    const [active, setActive] = useState<string>('');
    const [open, setOpen] = useState(false);

    const list = useRef<HTMLUListElement>(null);
    const indicator = useRef<HTMLSpanElement>(null);

    // The material only thickens once page content is actually passing
    // underneath it — over open space it stays thin and shadowless.
    useEffect(() => {
        const onScroll = () => setElevated(window.scrollY > 24);

        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });

        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Highlights whichever section currently owns the middle of the screen.
    // The hero is observed too, without a nav entry of its own — while it owns
    // the screen no link is current, so the marker steps aside rather than
    // pointing at a section the reader has not reached.
    useEffect(() => {
        const sections = ['#top', ...navigation.map(({ href }) => href)]
            .map((href) => document.querySelector(href))
            .filter((node): node is Element => node !== null);

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort(
                        (a, b) => b.intersectionRatio - a.intersectionRatio,
                    )[0];

                if (visible) {
                    setActive(
                        visible.target.id === 'top'
                            ? ''
                            : `#${visible.target.id}`,
                    );
                }
            },
            { rootMargin: '-45% 0px -45% 0px' },
        );

        sections.forEach((section) => observer.observe(section));

        return () => observer.disconnect();
    }, []);

    // Moves the marker to the active link. Writing transform and width
    // directly keeps the travel off React's render path.
    const place = useCallback(() => {
        const container = list.current;
        const marker = indicator.current;

        if (!container || !marker) {
            return;
        }

        const target = container.querySelector<HTMLElement>(
            '[data-active="true"]',
        );

        if (!target) {
            marker.dataset.shown = 'false';
            return;
        }

        const from = container.getBoundingClientRect();
        const to = target.getBoundingClientRect();

        marker.style.setProperty('--indicator-x', `${to.left - from.left}px`);
        marker.style.setProperty('--indicator-w', `${to.width}px`);
        marker.dataset.shown = 'true';

        // Arm the transition only after the first placement, so the marker
        // fades in where it belongs instead of sliding in from the edge.
        requestAnimationFrame(() => {
            marker.dataset.ready = 'true';
        });
    }, []);

    useEffect(() => {
        place();
    }, [active, place]);

    useEffect(() => {
        window.addEventListener('resize', place);

        return () => window.removeEventListener('resize', place);
    }, [place]);

    return (
        <>
            {/* Scroll edge: the strip of page the nav floats over softens
                rather than meeting a hard divider. */}
            <div
                aria-hidden
                className="scroll-edge"
                data-shown={elevated ? 'true' : 'false'}
            />

            <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
                <nav
                    aria-label="Primary"
                    data-elevated={elevated ? 'true' : 'false'}
                    className="glass flex w-full max-w-3xl items-center gap-2 rounded-full px-2 py-2"
                >
                    <a
                        href="#top"
                        className="ml-2 shrink-0 font-mono text-sm font-medium tracking-tight"
                    >
                        TH<span className="text-primary">.</span>
                    </a>

                    <ul
                        ref={list}
                        className="relative mx-auto hidden items-center gap-1 md:flex"
                    >
                        <span ref={indicator} className="nav-indicator" />
                        {navigation.map(({ label, href }) => (
                            <li key={href} className="relative">
                                <Button
                                    href={href}
                                    variant="ghost"
                                    size="sm"
                                    data-active={
                                        active === href ? 'true' : 'false'
                                    }
                                    aria-current={
                                        active === href ? 'true' : undefined
                                    }
                                    className={cn(
                                        // Vibrancy: text over a translucent
                                        // surface needs more contrast and a
                                        // touch more tracking than it would on
                                        // a solid one.
                                        'px-3.5 tracking-[0.01em] hover:bg-transparent',
                                        active === href
                                            ? 'text-foreground'
                                            : 'text-foreground/65 hover:text-foreground',
                                    )}
                                >
                                    {label}
                                </Button>
                            </li>
                        ))}
                    </ul>

                    <Button
                        href={`mailto:${person.email}`}
                        size="sm"
                        className="ml-auto px-4 md:ml-0"
                    >
                        <Mail />
                        Get in touch
                    </Button>

                    {/* Below `md` the links collapse into a drawer rather than
                        disappearing entirely — five of them no longer fit
                        beside the logo and the button at `sm`. */}
                    <Button
                        variant="ghost"
                        size="icon-sm"
                        className="md:hidden"
                        aria-label="Open menu"
                        aria-haspopup="dialog"
                        onClick={() => setOpen(true)}
                    >
                        <Menu />
                    </Button>
                </nav>
            </header>

            <Drawer open={open} onOpenChange={setOpen} title="Navigation">
                <ul className="mt-4 flex flex-col gap-1">
                    {navigation.map(({ label, href }) => (
                        <li key={href}>
                            <Button
                                href={href}
                                variant="ghost"
                                size="lg"
                                className="w-full justify-start rounded-xl"
                                onClick={() => setOpen(false)}
                            >
                                {label}
                            </Button>
                        </li>
                    ))}
                </ul>
            </Drawer>
        </>
    );
}
