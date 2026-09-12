import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import type { CSSProperties } from 'react';

import { Badge } from '@/components/ui/badge';
import { technologies, type Technology } from '@/lib/site';
import { cn } from '@/lib/utils';

/**
 * The technologies as two rows drifting in opposite directions. It replaced a
 * wall of chips a screen tall: two rows of motion in the height of two chips.
 *
 * Pure CSS. Each row is its list followed by an `aria-hidden` copy of the same
 * list, and the track moves by exactly half its width, so the copy lands where
 * the original started and the loop has no seam. Each list carries a trailing
 * padding equal to the gap, so the join between the two is the same width as
 * every other gap.
 *
 * The chips switch off their own backdrop blur. They sit on a glass tile that
 * is already blurring, and a backdrop filter on a moving element has to be
 * recomputed every frame — fifty-eight of them would be the most expensive
 * thing on the page for no visible difference.
 *
 * Under reduced motion the copies are hidden and the rows wrap in place.
 */
export default async function StackStrip() {
    const t = await getTranslations('stack');

    // Alternate rather than halve, so neither row is all frontend.
    const rows = [
        technologies.filter((_, index) => index % 2 === 0),
        technologies.filter((_, index) => index % 2 === 1),
    ];

    return (
        <div
            role="group"
            aria-label={t('listLabel')}
            className="flex flex-col gap-2.5"
        >
            {rows.map((row, index) => (
                <div
                    key={index}
                    className="marquee"
                    style={
                        {
                            '--marquee-duration': `${row.length * 3}s`,
                            '--marquee-direction':
                                index === 0 ? 'normal' : 'reverse',
                        } as CSSProperties
                    }
                >
                    <div className="marquee-track">
                        <Chips row={row} label={t} />
                        <Chips row={row} label={t} copy />
                    </div>
                </div>
            ))}
        </div>
    );
}

function Chips({
    row,
    label,
    copy = false,
}: {
    row: Technology[];
    label: (key: `technologies.${Technology['id']}`) => string;
    copy?: boolean;
}) {
    return (
        <ul
            aria-hidden={copy || undefined}
            className={cn(
                'flex shrink-0 gap-2.5 pr-2.5',
                copy && 'marquee-copy',
            )}
        >
            {row.map(({ id, plate }) => (
                <Badge
                    as="li"
                    key={id}
                    variant="tech"
                    size="lg"
                    className="backdrop-filter-none"
                >
                    <Image
                        src={`/images/technology-icons/${id}.svg`}
                        alt=""
                        width={20}
                        height={20}
                        className={cn(
                            'h-5 w-5 object-contain',
                            plate && 'bg-logo-plate rounded-full p-0.5',
                        )}
                        unoptimized
                    />
                    {label(`technologies.${id}`)}
                </Badge>
            ))}
        </ul>
    );
}
