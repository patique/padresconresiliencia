import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['es', 'fr', 'en', 'pt', 'it'];
const defaultLocale = 'es';

// ⚠️ IMPORTANTE: Lista de rutas que DEBEN usar i18n
// Solo estas rutas serán redirigidas a /[locale]/...
// El resto de rutas funcionarán normalmente SIN i18n
const i18nEnabledRoutes: string[] = [
    // Añade aquí las rutas que quieras internacionalizar
    // Ejemplo: '/neurodivergencia', '/redes-sociales'
    // Por ahora está vacío para no romper nada existente
];

// Rutas que NUNCA deben tener redirección de idioma
const excludedPaths = [
    '/api',
    '/_next',
    '/favicon.ico',
    '/images',
    '/panel-pr2024',
    '/blog',
    '/products',
    '/primer-ano',
    '/educar-fe',
    '/', // Homepage
];

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // Excluir rutas específicas
    if (excludedPaths.some(path => pathname === path || pathname.startsWith(path + '/'))) {
        return NextResponse.next();
    }

    // Verificar si la URL ya tiene un locale
    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (pathnameHasLocale) {
        // La URL ya tiene locale, continuar normalmente
        return NextResponse.next();
    }

    // ⚠️ CAMBIO IMPORTANTE: Solo aplicar i18n a rutas específicas
    const shouldUseI18n = i18nEnabledRoutes.some(route =>
        pathname === route || pathname.startsWith(`${route}/`)
    );

    if (!shouldUseI18n) {
        // Esta ruta NO usa i18n, dejar pasar sin redirección
        return NextResponse.next();
    }

    // A partir de aquí, solo se ejecuta para rutas en i18nEnabledRoutes
    // (actualmente ninguna, así que este código no se ejecutará)

    // Detectar el idioma preferido del usuario
    let preferredLocale = defaultLocale;

    // 1. Primero, verificar si hay una cookie de idioma guardada
    const localeCookie = request.cookies.get('NEXT_LOCALE');
    if (localeCookie && locales.includes(localeCookie.value)) {
        preferredLocale = localeCookie.value;
    } else {
        // 2. Si no hay cookie, usar el header Accept-Language
        const acceptLanguage = request.headers.get('accept-language');
        if (acceptLanguage) {
            const languages = acceptLanguage
                .split(',')
                .map(lang => {
                    const [code, qValue] = lang.trim().split(';');
                    const quality = qValue ? parseFloat(qValue.split('=')[1]) : 1.0;
                    const langCode = code.split('-')[0].toLowerCase();
                    return { code: langCode, quality };
                })
                .sort((a, b) => b.quality - a.quality);

            const supportedLang = languages.find(lang => locales.includes(lang.code));
            if (supportedLang) {
                preferredLocale = supportedLang.code;
            }
        }
    }

    // Redirigir a la URL con el locale detectado
    const newUrl = request.nextUrl.clone();
    newUrl.pathname = `/${preferredLocale}${pathname}`;

    const response = NextResponse.redirect(newUrl);

    // Guardar el locale en una cookie para futuras visitas
    response.cookies.set('NEXT_LOCALE', preferredLocale, {
        maxAge: 60 * 60 * 24 * 365, // 1 año
        path: '/',
    });

    return response;
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|images).*)',
    ],
};
