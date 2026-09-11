export default function SectionHero() {
    return (
        <section className="animate-in fade-in slide-in-from-bottom-8 flex min-h-screen flex-col items-center justify-center gap-8 text-center duration-700">
            <span className="bg-surface-primary-default-bg text-surface-primary-default-text border-surface-primary-default-border w-fit rounded-full border border-solid px-4 py-1.5 text-xl font-semibold">
                Welcome to my portfolio!
            </span>
            <h1 className="text-6xl font-bold md:text-8xl">Tim Hrovat</h1>
            <h2 className="text-foreground-muted text-2xl font-semibold md:text-3xl">
                Full Stack Developer
            </h2>
        </section>
    );
}
