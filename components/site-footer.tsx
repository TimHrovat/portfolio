import { getTranslations } from 'next-intl/server';

export default async function SiteFooter() {
    const t = await getTranslations();

    return (
        <footer className="border-hairline border-t px-6 py-10">
            <p className="text-muted-foreground mx-auto w-full max-w-5xl text-center font-mono text-xs">
                {t('footer.copyright', {
                    // A string rather than a number: the year is a label, and
                    // ICU would otherwise group it into "2,026".
                    year: String(new Date().getFullYear()),
                    name: t('person.name'),
                })}
            </p>
        </footer>
    );
}
