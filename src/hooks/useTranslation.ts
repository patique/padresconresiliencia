import { useParams } from 'next/navigation';
import { Locale, DEFAULT_LOCALE } from '@/config/i18n';

// Importar todos los archivos de traducción
import es_common from '@/../locales/es/common.json';
import fr_common from '@/../locales/fr/common.json';
import en_common from '@/../locales/en/common.json';
import pt_common from '@/../locales/pt/common.json';

import es_cerebro from '@/../locales/es/cerebro-pantallas.json';
import fr_cerebro from '@/../locales/fr/cerebro-pantallas.json';
import en_cerebro from '@/../locales/en/cerebro-pantallas.json';

import es_educar from '@/../locales/es/educar-fe.json';
import pt_educar from '@/../locales/pt/educar-fe.json';

type TranslationNamespace = 'common' | 'cerebro-pantallas' | 'educar-fe' | string;

const translations: Record<Locale, Record<string, any>> = {
    es: {
        common: es_common,
        'cerebro-pantallas': es_cerebro,
        'educar-fe': es_educar,
    },
    fr: {
        common: fr_common,
        'cerebro-pantallas': fr_cerebro,
        'educar-fe': es_educar, // Fallback temporal
    },
    en: {
        common: en_common,
        'cerebro-pantallas': en_cerebro,
        'educar-fe': es_educar, // Fallback temporal
    },
    pt: {
        common: pt_common,
        'cerebro-pantallas': es_cerebro, // Fallback temporal
        'educar-fe': pt_educar,
    },
    it: {
        common: es_common, // Fallback temporal
        'cerebro-pantallas': es_cerebro,
        'educar-fe': es_educar,
    },
};

/**
 * Hook para acceder a las traducciones
 * @param namespace - Namespace de traducción (ej: 'common', 'neurodivergencia')
 * @returns Objeto con función t() y locale actual
 * 
 * @example
 * const { t, locale } = useTranslation('common');
 * return <h1>{t('header.brand')}</h1>;
 */
export function useTranslation(namespace: TranslationNamespace = 'common') {
    const params = useParams();
    const locale = (params?.locale as Locale) || DEFAULT_LOCALE;

    /**
     * Función para obtener una traducción por su clave
     * @param key - Clave de traducción en formato dot notation (ej: 'header.brand')
     * @param fallback - Texto de respaldo si no se encuentra la traducción
     */
    const t = (key: string, fallback?: string): string => {
        try {
            const namespaceTranslations = translations[locale]?.[namespace];

            if (!namespaceTranslations) {
                console.warn(`Namespace '${namespace}' no encontrado para locale '${locale}'`);
                return fallback || key;
            }

            // Navegar por la estructura del objeto usando dot notation
            const value = key.split('.').reduce((obj: any, k: string) => {
                return obj?.[k];
            }, namespaceTranslations);

            if (value === undefined || value === null) {
                console.warn(`Traducción no encontrada: ${namespace}.${key} (${locale})`);
                return fallback || key;
            }

            return value;
        } catch (error) {
            console.error(`Error al obtener traducción: ${key}`, error);
            return fallback || key;
        }
    };

    return { t, locale };
}

/**
 * Hook para acceder a las traducciones con locale explícito (para SSG)
 * @param locale - Locale explícito
 * @param namespace - Namespace de traducción
 * @returns Objeto con función t() y locale
 */
export function useTranslationWithLocale(locale: Locale, namespace: TranslationNamespace = 'common') {
    const t = (key: string, fallback?: string): any => {
        try {
            const namespaceTranslations = translations[locale]?.[namespace];

            if (!namespaceTranslations) {
                console.warn(`Namespace '${namespace}' no encontrado para locale '${locale}'`);
                return fallback || key;
            }

            const value = key.split('.').reduce((obj: any, k: string) => {
                return obj?.[k];
            }, namespaceTranslations);

            if (value === undefined || value === null) {
                console.warn(`Traducción no encontrada: ${namespace}.${key} (${locale})`);
                return fallback || key;
            }

            return value;
        } catch (error) {
            console.error(`Error al obtener traducción ${namespace}.${key}:`, error);
            return fallback || key;
        }
    };

    return { t, locale };
}

/**
 * Hook para obtener el locale actual sin cargar traducciones
 */
export function useLocale(): Locale {
    const params = useParams();
    return (params?.locale as Locale) || DEFAULT_LOCALE;
}

/**
 * Función para cargar traducciones en el servidor (Server Components)
 * @param locale - Locale a cargar
 * @param namespace - Namespace de traducción
 */
export function getTranslations(locale: Locale, namespace: string = 'common') {
    const namespaceTranslations = translations[locale]?.[namespace];

    if (!namespaceTranslations) {
        console.warn(`Namespace '${namespace}' no encontrado para locale '${locale}'`);
        return translations[DEFAULT_LOCALE][namespace] || {};
    }

    return namespaceTranslations;
}
