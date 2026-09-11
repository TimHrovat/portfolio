import Image from 'next/image';

import { cn } from '@/lib/utils';

/**
 * The small square mark at the head of a timeline row. Third-party logos are
 * arbitrary colours and several are dark-on-transparent, so they all sit on a
 * light plate rather than being asked to work against two page backgrounds.
 *
 * Falls back to initials when an organisation has no usable logo — Simpliservers
 * is the case that forced this, its site is gone — so a missing file degrades
 * to something deliberate instead of a hole in the row.
 */
export default function OrgMark({
    name,
    logo,
    className,
}: {
    name: string;
    logo?: string;
    className?: string;
}) {
    const initials = name
        .replace(/[^\p{L}\p{N} ]/gu, '')
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((word) => word[0]?.toUpperCase())
        .join('');

    return (
        <span
            aria-hidden
            className={cn(
                'ring-hairline flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-xl ring-1',
                logo
                    ? 'bg-logo-plate'
                    : 'bg-surface-strong text-muted-foreground font-mono text-[0.6875rem] font-medium',
                className,
            )}
        >
            {logo ? (
                <Image
                    src={logo}
                    alt=""
                    width={72}
                    height={72}
                    className="size-7 object-contain p-0.5"
                    unoptimized={logo.endsWith('.svg')}
                />
            ) : (
                initials
            )}
        </span>
    );
}
