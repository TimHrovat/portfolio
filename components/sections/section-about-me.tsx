import Image from 'next/image';

import Section from './section';

export default function SectionAboutMe() {
    return (
        <Section>
            <div className="animate-in fade-in duration-1000">
                <Image
                    className="size-56 rounded-full bg-cover"
                    src="/images/portrait.png"
                    alt="Tim Hrovat"
                    width={224}
                    height={224}
                    priority
                />
            </div>
            <div className="flex flex-col gap-6">
                <span className="text-4xl font-bold">Hi, I&rsquo;m Tim</span>
                <span className="text-lg">
                    a passionate software developer and dedicated student at{' '}
                    <strong>
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://fri.uni-lj.si/sl/studijski-program/racunalnistvo-informatika-0"
                        >
                            FRI UNI Ljubljana
                        </a>
                    </strong>
                    . With a strong foundation in coding and a professional
                    edge, I thrive on solving complex problems and crafting
                    efficient, scalable solutions. Whether it&rsquo;s building
                    innovative applications or exploring the latest in tech,
                    I&rsquo;m always driven by curiosity and a desire to make an
                    impact.
                </span>
                <span className="text-lg font-semibold">
                    Let&rsquo;s build something amazing together!
                </span>
            </div>
        </Section>
    );
}
