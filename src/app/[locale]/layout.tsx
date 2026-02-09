import { notFound } from 'next/navigation';
import { SUPPORTED_LOCALES, type Locale } from '@/config/i18n';
import FacebookPixel from '@/components/layout/FacebookPixel';
import { Suspense } from 'react';

export async function generateStaticParams() {
    return SUPPORTED_LOCALES.map((locale) => ({
        locale,
    }));
}

const FacebookPixelWrapper = () => (
    <Suspense fallback={null}>
        <FacebookPixel />
    </Suspense>
);

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
            <FacebookPixelWrapper />
            {children}
        </>
    );
}
