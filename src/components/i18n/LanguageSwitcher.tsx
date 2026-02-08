'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { SUPPORTED_LOCALES, LOCALE_FLAGS, LOCALE_NAMES, type Locale } from '@/config/i18n';
import { useLocale } from '@/hooks/useTranslation';

export default function LanguageSwitcher() {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const currentLocale = useLocale();
    const pathname = usePathname();
    const router = useRouter();

    // Cerrar dropdown al hacer clic fuera
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const switchLanguage = (newLocale: Locale) => {
        // Obtener la ruta sin el locale actual
        const pathWithoutLocale = pathname?.replace(`/${currentLocale}`, '') || '/';

        // Construir la nueva ruta con el nuevo locale
        const newPath = `/${newLocale}${pathWithoutLocale}`;

        // Guardar preferencia en cookie
        document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=${60 * 60 * 24 * 365}`;

        // Navegar a la nueva ruta
        router.push(newPath);
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Botón del selector */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition"
                aria-label="Seleccionar idioma"
            >
                <span className="text-lg">{LOCALE_FLAGS[currentLocale]}</span>
                <span className="hidden sm:inline">{LOCALE_NAMES[currentLocale]}</span>
                <svg
                    className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {/* Dropdown */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                    {SUPPORTED_LOCALES.map((locale) => (
                        <button
                            key={locale}
                            onClick={() => switchLanguage(locale)}
                            className={`w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-50 transition ${locale === currentLocale ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700'
                                }`}
                        >
                            <span className="text-lg">{LOCALE_FLAGS[locale]}</span>
                            <span>{LOCALE_NAMES[locale]}</span>
                            {locale === currentLocale && (
                                <svg className="w-4 h-4 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
