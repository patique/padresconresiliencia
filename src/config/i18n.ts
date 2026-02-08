// Configuración de productos Hotmart por idioma
// Cada ebook tiene un producto diferente en Hotmart para cada idioma

export const HOTMART_PRODUCTS = {
    // El Cerebro de tu Hijo en Pantallas
    'cerebro-pantallas': {
        es: 'https://pay.hotmart.com/X1234567?off=abc123', // TODO: Reemplazar con URL real
        fr: 'https://pay.hotmart.com/Y7654321?off=def456', // TODO: Crear producto en francés
        en: 'https://pay.hotmart.com/Z9876543?off=ghi789', // TODO: Crear producto en inglés
    },

    // Neurodivergencia (futuro)
    'neurodivergencia': {
        es: 'https://pay.hotmart.com/...',
        fr: 'https://pay.hotmart.com/...',
        en: 'https://pay.hotmart.com/...',
    },

    // Redes Sociales (futuro)
    'redes-sociales': {
        es: 'https://pay.hotmart.com/...',
        fr: 'https://pay.hotmart.com/...',
        en: 'https://pay.hotmart.com/...',
    },
} as const;

export type EbookSlug = keyof typeof HOTMART_PRODUCTS;
export type Locale = 'es' | 'fr' | 'en' | 'pt' | 'it';

export const SUPPORTED_LOCALES: Locale[] = ['es', 'fr', 'en'];
export const DEFAULT_LOCALE: Locale = 'es';

export const LOCALE_NAMES: Record<Locale, string> = {
    es: 'Español',
    fr: 'Français',
    en: 'English',
    pt: 'Português',
    it: 'Italiano',
};

export const LOCALE_FLAGS: Record<Locale, string> = {
    es: '🇪🇸',
    fr: '🇫🇷',
    en: '🇬🇧',
    pt: '🇵🇹',
    it: '🇮🇹',
};

/**
 * Obtiene la URL de checkout de Hotmart para un ebook y locale específicos
 */
export function getCheckoutUrl(slug: string, locale: Locale): string {
    const product = HOTMART_PRODUCTS[slug as EbookSlug];

    if (!product) {
        console.error(`Producto no encontrado: ${slug}`);
        return '#';
    }

    const url = product[locale];

    if (!url) {
        console.warn(`URL no disponible para ${slug} en ${locale}, usando español por defecto`);
        return product.es || '#';
    }

    return url;
}
