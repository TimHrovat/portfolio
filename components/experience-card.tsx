import type { ReactNode } from 'react';

export default function ExperienceCard({ children }: { children: ReactNode }) {
    return (
        <div className="bg-surface-secondary-default-bg w-full rounded-2xl p-6 text-left">
            {children}
        </div>
    );
}
