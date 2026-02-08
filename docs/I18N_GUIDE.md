# 🌍 Sistema de Internacionalización (i18n)

## Resumen

Este proyecto implementa un sistema completo de internacionalización para landing pages de ebooks en múltiples idiomas.

### Idiomas Soportados

- 🇪🇸 **Español (ES)** - Idioma por defecto
- 🇫🇷 **Francés (FR)**
- 🇬🇧 **Inglés (EN)**
- 🇵🇹 **Portugués (PT)** - Próximamente
- 🇮🇹 **Italiano (IT)** - Próximamente

---

## 📁 Estructura de Archivos

```
/locales
  /es
    common.json                    # Traducciones globales (header, footer, botones)
    cerebro-pantallas.json         # Traducciones del ebook "Cerebro en Pantallas"
  /fr
    common.json
    cerebro-pantallas.json
  /en
    common.json
    cerebro-pantallas.json

/src
  /config
    i18n.ts                        # Configuración de idiomas y productos Hotmart
  /hooks
    useTranslation.ts              # Hook para acceder a traducciones
  /components
    /i18n
      LanguageSwitcher.tsx         # Selector de idioma
  /app
    /[locale]
      layout.tsx                   # Layout para rutas con locale
      /[slug]
        page.tsx                   # Página dinámica de ebook
  middleware.ts                    # Detección automática de idioma
```

---

## 🚀 Cómo Usar

### 1. Crear una Nueva Landing Page

#### Paso 1: Crear archivos de traducción

Crea un archivo JSON para cada idioma en `/locales/{locale}/{ebook-slug}.json`:

**Ejemplo: `/locales/es/neurodivergencia.json`**
```json
{
  "meta": {
    "title": "Neurodivergencia - Guía para Padres",
    "description": "Guía práctica sobre TDAH y Autismo"
  },
  "hero": {
    "title": "Neurodivergencia Sin Misterios",
    "subtitle": "La guía que necesitas",
    "cta": "Descargar Ahora"
  },
  "price": {
    "original": "47€",
    "offer": "19€"
  }
}
```

#### Paso 2: Añadir traducciones al hook

Edita `/src/hooks/useTranslation.ts`:

```typescript
// Importar las traducciones
import es_neuro from '@/../locales/es/neurodivergencia.json';
import fr_neuro from '@/../locales/fr/neurodivergencia.json';
import en_neuro from '@/../locales/en/neurodivergencia.json';

// Añadir al objeto translations
const translations: Record<Locale, Record<string, any>> = {
  es: {
    common: es_common,
    'neurodivergencia': es_neuro,  // ← Añadir aquí
  },
  // ... repetir para fr, en, etc.
};
```

#### Paso 3: Configurar producto en Hotmart

Edita `/src/config/i18n.ts`:

```typescript
export const HOTMART_PRODUCTS = {
  'neurodivergencia': {
    es: 'https://pay.hotmart.com/ABC123',
    fr: 'https://pay.hotmart.com/DEF456',
    en: 'https://pay.hotmart.com/GHI789',
  },
};
```

#### Paso 4: Crear la página

Crea `/src/app/[locale]/neurodivergencia/page.tsx`:

```tsx
'use client';

import { useTranslation } from '@/hooks/useTranslation';
import { getCheckoutUrl } from '@/config/i18n';
import { useParams } from 'next/navigation';
import LanguageSwitcher from '@/components/i18n/LanguageSwitcher';

export default function NeurodivergenciaPage() {
  const { t } = useTranslation('neurodivergencia');
  const { t: tCommon } = useTranslation('common');
  const { locale } = useParams();
  
  const checkoutUrl = getCheckoutUrl('neurodivergencia', locale as string);

  return (
    <div>
      {/* Header con selector de idioma */}
      <header>
        <h1>{tCommon('header.brand')}</h1>
        <LanguageSwitcher />
      </header>

      {/* Hero */}
      <section>
        <h2>{t('hero.title')}</h2>
        <p>{t('hero.subtitle')}</p>
        <a href={checkoutUrl}>{t('hero.cta')}</a>
      </section>

      {/* Precio */}
      <section>
        <span>{t('price.original')}</span>
        <span>{t('price.offer')}</span>
      </section>
    </div>
  );
}
```

---

### 2. Usar Traducciones en Componentes

#### En Client Components

```tsx
'use client';

import { useTranslation } from '@/hooks/useTranslation';

export default function MyComponent() {
  const { t, locale } = useTranslation('common');
  
  return (
    <button>{t('buttons.buy')}</button>
  );
}
```

#### En Server Components

```tsx
import { getTranslations } from '@/hooks/useTranslation';

export default async function MyServerComponent({ params }: { params: { locale: string } }) {
  const t = getTranslations(params.locale, 'common');
  
  return (
    <h1>{t.header.brand}</h1>
  );
}
```

---

### 3. Añadir un Nuevo Idioma

#### Paso 1: Crear carpeta de traducciones

```bash
mkdir locales/pt
```

#### Paso 2: Crear archivos JSON

Copia los archivos de español y traduce:

```bash
cp locales/es/common.json locales/pt/common.json
cp locales/es/cerebro-pantallas.json locales/pt/cerebro-pantallas.json
```

#### Paso 3: Actualizar configuración

En `/src/config/i18n.ts`:

```typescript
export const SUPPORTED_LOCALES: Locale[] = ['es', 'fr', 'en', 'pt']; // ← Añadir 'pt'

export const LOCALE_NAMES: Record<Locale, string> = {
  // ...
  pt: 'Português',
};

export const LOCALE_FLAGS: Record<Locale, string> = {
  // ...
  pt: '🇵🇹',
};
```

#### Paso 4: Importar traducciones

En `/src/hooks/useTranslation.ts`:

```typescript
import pt_common from '@/../locales/pt/common.json';
import pt_cerebro from '@/../locales/pt/cerebro-pantallas.json';

const translations: Record<Locale, Record<string, any>> = {
  // ...
  pt: {
    common: pt_common,
    'cerebro-pantallas': pt_cerebro,
  },
};
```

#### Paso 5: Añadir productos Hotmart

En `/src/config/i18n.ts`:

```typescript
export const HOTMART_PRODUCTS = {
  'cerebro-pantallas': {
    // ...
    pt: 'https://pay.hotmart.com/PT123',
  },
};
```

---

## 🔗 Rutas y URLs

### Estructura de URLs

```
/es/cerebro-pantallas  → Landing en español
/fr/cerebro-pantallas  → Landing en francés
/en/cerebro-pantallas  → Landing en inglés
```

### Redirección Automática

Si un usuario accede a `/cerebro-pantallas` (sin locale):

1. El middleware detecta su idioma preferido
2. Verifica cookie `NEXT_LOCALE`
3. Si no existe, usa header `Accept-Language`
4. Redirige a `/es/cerebro-pantallas` (o el idioma detectado)
5. Guarda cookie para futuras visitas

---

## 🎨 Selector de Idioma

El componente `LanguageSwitcher` se puede añadir en cualquier parte:

```tsx
import LanguageSwitcher from '@/components/i18n/LanguageSwitcher';

export default function Header() {
  return (
    <header>
      <nav>
        <LanguageSwitcher />
      </nav>
    </header>
  );
}
```

**Características:**
- Dropdown con banderas
- Guarda preferencia en cookie
- Redirige a la misma página en el nuevo idioma
- Muestra idioma actual marcado

---

## 📊 SEO y Metadata

### Implementar hreflang

En tu página, añade metadata:

```tsx
export async function generateMetadata({ params }: { params: { locale: string } }) {
  const t = getTranslations(params.locale, 'cerebro-pantallas');
  
  return {
    title: t.meta.title,
    description: t.meta.description,
    alternates: {
      canonical: `https://padresconresiliencia.com/${params.locale}/cerebro-pantallas`,
      languages: {
        'es': 'https://padresconresiliencia.com/es/cerebro-pantallas',
        'fr': 'https://padresconresiliencia.com/fr/cerebro-pantallas',
        'en': 'https://padresconresiliencia.com/en/cerebro-pantallas',
      }
    },
    openGraph: {
      title: t.meta.ogTitle,
      description: t.meta.ogDescription,
      locale: params.locale,
    }
  };
}
```

---

## 🛒 Enlaces de Compra (Hotmart)

### Obtener URL de checkout

```tsx
import { getCheckoutUrl } from '@/config/i18n';
import { useParams } from 'next/navigation';

export default function BuyButton() {
  const { locale } = useParams();
  const checkoutUrl = getCheckoutUrl('cerebro-pantallas', locale as string);
  
  return (
    <a href={checkoutUrl} className="btn-primary">
      {t('buttons.buy')}
    </a>
  );
}
```

**Nota:** Cada idioma debe tener su propio producto en Hotmart.

---

## 🧪 Testing

### Checklist de Pruebas

- [ ] Acceder a `/cerebro-pantallas` redirige según idioma del navegador
- [ ] Selector de idioma cambia la URL correctamente
- [ ] Cookie `NEXT_LOCALE` se guarda y persiste
- [ ] Todas las traducciones se muestran (sin claves tipo `hero.title`)
- [ ] Enlaces de Hotmart apuntan al producto correcto
- [ ] Metadata (title, description) están traducidos
- [ ] Etiquetas hreflang están en el HTML

### Probar Detección de Idioma

1. **Borrar cookies** del sitio
2. **Cambiar idioma del navegador** a francés
3. **Acceder a** `/cerebro-pantallas`
4. **Verificar** que redirige a `/fr/cerebro-pantallas`

---

## 📝 Convenciones

### Nombres de Archivos

- **Slugs de ebooks:** Usar kebab-case (`cerebro-pantallas`, `neurodivergencia`)
- **Archivos JSON:** Mismo nombre que el slug (`cerebro-pantallas.json`)
- **Locales:** Códigos ISO 639-1 (`es`, `fr`, `en`, `pt`, `it`)

### Estructura de Traducciones

```json
{
  "meta": { ... },      // SEO y metadata
  "hero": { ... },      // Sección hero
  "pain": { ... },      // Puntos de dolor
  "solution": { ... },  // Solución
  "modules": [ ... ],   // Módulos del ebook
  "price": { ... },     // Precios
  "testimonials": [ ... ]  // Testimonios
}
```

---

## 🚨 Problemas Comunes

### Error: "Namespace no encontrado"

**Causa:** No importaste las traducciones en `useTranslation.ts`

**Solución:** Añade el import y actualiza el objeto `translations`

### Error: "Traducción no encontrada"

**Causa:** La clave no existe en el JSON o hay un typo

**Solución:** Verifica que la clave existe: `t('hero.title')` → JSON debe tener `{ "hero": { "title": "..." } }`

### Producto Hotmart no definido

**Causa:** No añadiste el producto en `/src/config/i18n.ts`

**Solución:** Añade la URL en `HOTMART_PRODUCTS`

---

## 📚 Recursos

- [Next.js Internationalization](https://nextjs.org/docs/app/building-your-application/routing/internationalization)
- [Accept-Language Header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Language)
- [Hreflang Tags](https://developers.google.com/search/docs/specialty/international/localized-versions)

---

**Última actualización:** 2026-02-08
