import type { ReactNode } from 'react';

export default function ExperienceCardCompany({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <div className="text-foreground-primary mt-1.5 font-semibold">
            {children}
        </div>
    );
}
