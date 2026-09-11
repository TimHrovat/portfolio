import type { ReactNode } from 'react';

export default function ExperienceCardTitle({
    children,
    from,
    to,
}: {
    children: ReactNode;
    from: string;
    to: string;
}) {
    return (
        <div className="flex items-center justify-between">
            <span className="text-2xl font-bold">{children}</span>
            <div className="flex items-center gap-2 font-semibold">
                <span>{from}</span>
                <span>-</span>
                <span>{to}</span>
            </div>
        </div>
    );
}
