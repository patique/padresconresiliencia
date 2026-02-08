# 🇧🇷 Educar en la Fe - Configuración Multiidioma (ES + PT)

## ✅ Lo Que Está Listo

### 1. Archivos de Traducción Creados

**Español (`/locales/es/educar-fe.json`):**
- ✅ Todos los textos de la landing extraídos
- ✅ Estructura completa: hero, pain, agitation, solution
- ✅ Precios en EUR (27€)

**Portugués de Brasil (`/locales/pt/educar-fe.json`):**
- ✅ Traducción completa al portugués brasileño
- ✅ Adaptaciones culturales (ej: "Primeira Comunhão")
- ✅ Precios convertidos a BRL (R$ 149)
- ✅ Lenguaje natural de Brasil (não "no", você "tú")

### 2. Configuración de Productos Hotmart

**Archivo:** `/src/config/i18n.ts`

```typescript
'educar-fe': {
    es: 'https://pay.hotmart.com/H103988286K?off=rsw6f2ko', // ✅ URL actual
    pt: 'https://pay.hotmart.com/XXXXXXXX?off=XXXXXX',      // ⚠️ PENDIENTE
}
```

### 3. Sistema i18n Configurado

- ✅ Hook `useTranslation` actualizado con educar-fe
- ✅ Portugués añadido a `SUPPORTED_LOCALES`
- ✅ Selector de idioma listo (muestra 🇪🇸 ES | 🇧🇷 PT)

---

## 🚀 Próximos Pasos

### PASO 1: Crear Producto en Hotmart (Brasil)

**Acción requerida:**

1. **Duplicar producto** en Hotmart
2. **Cambiar idioma** a portugués:
   - Título: "Educar na Fé"
   - Descripción: Usar textos de `/locales/pt/educar-fe.json`
   - Precio: **R$ 149** (equivalente a ~27€)
3. **Copiar URL de checkout**
4. **Actualizar** `/src/config/i18n.ts`:
   ```typescript
   pt: 'https://pay.hotmart.com/TU_URL_AQUI?off=codigo',
   ```

**Importante:** El precio de R$ 149 es una conversión aproximada. Ajusta según:
- Poder adquisitivo de Brasil
- Competencia local
- Estrategia de pricing

---

### PASO 2: Crear la Landing Page Multiidioma

**Opción A: Crear Página Nueva (Recomendado)**

Crear `/src/app/[locale]/educar-fe/page.tsx`:

```tsx
'use client';

import { useTranslation } from '@/hooks/useTranslation';
import { getCheckoutUrl } from '@/config/i18n';
import { useParams } from 'next/navigation';
import LanguageSwitcher from '@/components/i18n/LanguageSwitcher';

export default function EducarFePage() {
  const { t } = useTranslation('educar-fe');
  const { t: tCommon } = useTranslation('common');
  const { locale } = useParams();
  
  const checkoutUrl = getCheckoutUrl('educar-fe', locale as string);

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      {/* Header con selector de idioma */}
      <header className="sticky top-0 z-50 bg-white border-b">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1>{tCommon('header.brand')}</h1>
          <LanguageSwitcher />
        </div>
      </header>

      {/* Hero */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-[#E07A5F]/10 text-[#E07A5F] px-4 py-1.5 rounded-full text-sm font-bold mb-8">
              {t('hero.badge')}
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-stone-900 mb-6">
              {t('hero.title')}
            </h1>
            <p className="text-2xl text-stone-800 font-bold">
              {t('hero.subtitle')}
            </p>
            <p className="text-lg text-stone-500 mt-4">
              {t('hero.subtitleNote')}
            </p>
          </div>

          {/* CTA Box */}
          <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-bold text-center mb-4">
              {t('hero.cta.title')}
            </h3>
            <p className="text-center text-stone-600 mb-6">
              {t('hero.cta.subtitle')}
            </p>
            <div className="flex items-end justify-center gap-2 mb-6">
              <span className="text-5xl font-bold text-[#E07A5F]">
                {t('hero.cta.price')}
              </span>
              <span className="text-xl text-stone-400 line-through mb-1">
                {t('hero.cta.originalPrice')}
              </span>
            </div>
            <a
              href={checkoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-[#E07A5F] hover:bg-[#c96348] text-white font-bold text-lg py-4 rounded-xl text-center transition"
            >
              {t('hero.cta.button')}
            </a>
            <p className="text-xs text-stone-400 mt-4 text-center">
              {t('hero.cta.guarantee')}
            </p>
          </div>
        </div>
      </section>

      {/* Pain Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <h2 className="text-3xl font-bold text-stone-900 mb-8">
            {t('pain.title')}
          </h2>
          <ul className="space-y-4">
            {t('pain.points', []).map((point: string, idx: number) => (
              <li key={idx} className="flex gap-4">
                <div className="bg-red-100 p-2 rounded-lg h-fit text-red-500 shrink-0">
                  ✗
                </div>
                <p className="text-lg text-stone-700">{point}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Más secciones... */}
    </div>
  );
}
```

**Opción B: Componente Reutilizable**

Puedes crear un componente que reciba las traducciones y reutilizar el diseño actual de `EducarFeLanding.tsx`.

---

### PASO 3: Activar la Ruta en el Middleware

Editar `/src/middleware.ts`:

```typescript
const i18nEnabledRoutes: string[] = [
  '/educar-fe',  // ← Añadir esta línea
];
```

**Resultado:**
- `/educar-fe` → Redirige a `/es/educar-fe`
- Usuario brasileño → Redirige a `/pt/educar-fe`
- Selector de idioma → Cambia entre `/es/educar-fe` y `/pt/educar-fe`

---

### PASO 4: Mantener Landing Original Intacta

**Importante:** La landing actual `/educar-fe` (sin locale) seguirá funcionando porque:

1. Está en `excludedPaths` del middleware
2. NO se añade a `i18nEnabledRoutes` hasta que estés listo
3. Las campañas actuales NO se verán afectadas

**Estrategia de migración:**

**Fase 1: Probar (Ahora)**
- Crear `/es/educar-fe` y `/pt/educar-fe`
- Probar con tráfico nuevo (ads en portugués)
- Landing original sigue activa

**Fase 2: Migrar (Cuando estés listo)**
- Añadir `/educar-fe` a `i18nEnabledRoutes`
- La landing original redirigirá a `/es/educar-fe`
- Actualizar enlaces de campañas a `/es/educar-fe`

---

## 📊 Conversión de Precios

### Precio Actual (España)
- **27€** (oferta)
- **97€** (original)

### Precio Sugerido (Brasil)
- **R$ 149** (oferta) ≈ 27€
- **R$ 497** (original) ≈ 90€

**Factores considerados:**
- Tipo de cambio: ~5.5 BRL/EUR
- Poder adquisitivo de Brasil
- Mercado católico brasileño (muy grande)
- Competencia local

**Recomendación:** Prueba con R$ 149 y ajusta según conversión.

---

## 🎯 Estrategia de Lanzamiento

### Semana 1: Preparación
1. ✅ Crear producto en Hotmart (Brasil)
2. ✅ Actualizar URL en `/src/config/i18n.ts`
3. ✅ Crear página `/src/app/[locale]/educar-fe/page.tsx`
4. ✅ Probar localmente

### Semana 2: Soft Launch
1. ✅ Activar ruta en middleware
2. ✅ Crear ads en portugués apuntando a `/pt/educar-fe`
3. ✅ Monitorear conversiones
4. ✅ Ajustar precio si es necesario

### Semana 3: Optimización
1. ✅ A/B testing de copy en portugués
2. ✅ Ajustar imágenes si es necesario
3. ✅ Añadir testimonios en portugués

---

## 🔗 URLs Finales

**Español:**
- URL: `https://padresconresiliencia.com/es/educar-fe`
- Checkout: `https://pay.hotmart.com/H103988286K?off=rsw6f2ko`
- Precio: 27€

**Portugués:**
- URL: `https://padresconresiliencia.com/pt/educar-fe`
- Checkout: `https://pay.hotmart.com/XXXXXXXX?off=XXXXXX` (PENDIENTE)
- Precio: R$ 149

---

## ✅ Checklist Final

- [ ] Crear producto en Hotmart (Brasil)
- [ ] Copiar URL de checkout
- [ ] Actualizar `/src/config/i18n.ts` con URL real
- [ ] Crear página `/src/app/[locale]/educar-fe/page.tsx`
- [ ] Probar localmente ambas versiones
- [ ] Activar ruta en middleware
- [ ] Crear campaña de ads en portugués
- [ ] Monitorear primeras ventas

---

## 📞 Soporte

Si necesitas ayuda:
1. Ver documentación completa: `/docs/I18N_GUIDE.md`
2. Ver guía rápida: `/docs/I18N_QUICKSTART.md`
3. Revisar archivos de traducción: `/locales/`

---

**¡Todo listo para conquistar el mercado brasileño!** 🇧🇷🚀
