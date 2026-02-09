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
 * Función para cargar traducciones en Server Components
 * @param locale - Locale a cargar
 * @param namespace - Namespace de traducción
 */
export function getServerTranslations(locale: Locale, namespace: string = 'common') {
    const namespaceTranslations = translations[locale]?.[namespace];

    if (!namespaceTranslations) {
        console.warn(`Namespace '${namespace}' no encontrado para locale '${locale}'`);
        return translations[DEFAULT_LOCALE][namespace] || {};
    }

    return namespaceTranslations;
}
