import type { ReactNode } from 'react';

export default function Section({ children }: { children: ReactNode }) {
    return (
        <section className="mx-auto flex max-w-[700px] flex-col items-center justify-center gap-8 py-24 text-center">
            {children}
        </section>
    );
}
