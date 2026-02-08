import { notFound } from 'next/navigation';
import { SUPPORTED_LOCALES, type Locale } from '@/config/i18n';
import FacebookPixel from '@/components/layout/FacebookPixel';

export async function generateStaticParams() {
    return SUPPORTED_LOCALES.map((locale) => ({
        locale,
    }));
}

export default function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: { locale: string };
}) {
    // Verificar que el locale es válido
    if (!SUPPORTED_LOCALES.includes(params.locale as Locale)) {
        notFound();
    }

    return (
        <>
            <FacebookPixel />
            {children}
        </>
    );
}
