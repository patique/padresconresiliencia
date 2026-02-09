import { Metadata } from 'next';
import { getTranslations } from '@/hooks/useTranslation';
import { SUPPORTED_LOCALES, type Locale } from '@/config/i18n';

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
                    url: '/images/educar-fe-cover.png',
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
            images: ['/images/educar-fe-cover.png'],
        },
    };
}

export async function generateStaticParams() {
    return SUPPORTED_LOCALES.map((locale) => ({
        locale,
    }));
}
