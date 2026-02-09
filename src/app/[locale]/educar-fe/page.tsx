import { Metadata } from 'next';
import { SUPPORTED_LOCALES, type Locale } from '@/config/i18n';
import { getTranslations } from '@/hooks/useTranslation';
import EducarFeClient from './EducarFeClient';

// Generar parámetros estáticos para todas las locales
export async function generateStaticParams() {
    return SUPPORTED_LOCALES.map((locale) => ({
        locale: locale,
    }));
}

// Generar metadata por locale
export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
    const locale = params.locale as Locale;
    const t = getTranslations(locale, 'educar-fe');

    return {
        title: t.meta.title,
        description: t.meta.description,
        alternates: {
            canonical: `https://padresconresiliencia.com/${locale}/educar-fe`,
            languages: {
                'es': 'https://padresconresiliencia.com/es/educar-fe',
                'pt': 'https://padresconresiliencia.com/pt/educar-fe',
            }
        },
        openGraph: {
            title: t.meta.ogTitle,
            description: t.meta.ogDescription,
            locale: locale,
            type: 'website',
            url: `https://padresconresiliencia.com/${locale}/educar-fe`,
            images: [
                {
                    url: '/landing/educar-en-la-fe/educar-fe-cover.png',
                    width: 600,
                    height: 800,
                    alt: t.meta.ogTitle,
                }
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: t.meta.ogTitle,
            description: t.meta.ogDescription,
            images: ['/landing/educar-en-la-fe/educar-fe-cover.png'],
        },
    };
}

// Server Component
export default function EducarFePage({ params }: { params: { locale: string } }) {
    return <EducarFeClient locale={params.locale as Locale} />;
}
