# 🌍 Sistema de Internacionalización (i18n) - Modo Opt-In

## ⚠️ IMPORTANTE: Sistema Opt-In

Este sistema de i18n está configurado en **modo opt-in**, lo que significa que:

- ✅ **Las páginas existentes NO se ven afectadas** (homepage, /primer-ano, /educar-fe, etc.)
- ✅ **Solo las rutas que TÚ especifiques** usarán i18n
- ✅ **No hay riesgo de romper nada** al activar el sistema

---

## 🚀 Cómo Activar i18n para una Ruta

### Paso 1: Añadir la ruta al middleware

Edita `/src/middleware.ts` y añade la ruta a `i18nEnabledRoutes`:

```typescript
const i18nEnabledRoutes: string[] = [
  '/neurodivergencia',  // ← Añadir aquí
  '/redes-sociales',    // ← Y aquí
];
```

### Paso 2: Crear las traducciones

Crea los archivos JSON en `/locales/{locale}/{slug}.json`

### Paso 3: Crear la página en `[locale]/[slug]`

Crea `/src/app/[locale]/neurodivergencia/page.tsx`

---

## 📁 Estructura Actual

```
/                          → Homepage (SIN i18n)
/primer-ano                → Landing existente (SIN i18n)
/educar-fe                 → Landing existente (SIN i18n)
/panel-pr2024              → Admin panel (SIN i18n)

/es/neurodivergencia       → Landing con i18n (cuando lo actives)
/fr/neurodivergencia       → Landing con i18n (cuando lo actives)
```

---

## 🛠️ Ejemplo Completo: Activar i18n para "Neurodivergencia"

### 1. Crear traducciones

**`/locales/es/neurodivergencia.json`:**
```json
{
  "hero": {
    "title": "Neurodivergencia Sin Misterios",
    "cta": "Descargar Ahora"
  }
}
```

**`/locales/fr/neurodivergencia.json`:**
```json
{
  "hero": {
    "title": "Neurodivergence Sans Mystères",
    "cta": "Télécharger Maintenant"
  }
}
```

### 2. Importar en useTranslation

Edita `/src/hooks/useTranslation.ts`:

```typescript
import es_neuro from '@/../locales/es/neurodivergencia.json';
import fr_neuro from '@/../locales/fr/neurodivergencia.json';

const translations: Record<Locale, Record<string, any>> = {
  es: {
    common: es_common,
    'neurodivergencia': es_neuro,  // ← Añadir
  },
  fr: {
    common: fr_common,
    'neurodivergencia': fr_neuro,  // ← Añadir
  },
};
```

### 3. Crear la página

**`/src/app/[locale]/neurodivergencia/page.tsx`:**
```tsx
'use client';

import { useTranslation } from '@/hooks/useTranslation';
import LanguageSwitcher from '@/components/i18n/LanguageSwitcher';

export default function NeurodivergenciaPage() {
  const { t } = useTranslation('neurodivergencia');
  
  return (
    <div>
      <header>
        <LanguageSwitcher />
      </header>
      <h1>{t('hero.title')}</h1>
      <button>{t('hero.cta')}</button>
    </div>
  );
}
```

### 4. Activar en middleware

Edita `/src/middleware.ts`:

```typescript
const i18nEnabledRoutes: string[] = [
  '/neurodivergencia',  // ← Añadir esta línea
];
```

### 5. Probar

- Accede a `/neurodivergencia` → Redirige a `/es/neurodivergencia`
- Cambia idioma → Redirige a `/fr/neurodivergencia`

---

## 📝 Rutas Excluidas (No usan i18n)

Estas rutas están en `excludedPaths` y **nunca** usarán i18n:

- `/` - Homepage
- `/primer-ano` - Landing existente
- `/educar-fe` - Landing existente
- `/panel-pr2024` - Admin panel
- `/blog` - Blog
- `/products` - Productos
- `/api` - API routes

---

## ✅ Ventajas de este Enfoque

1. **Sin riesgo**: Las páginas existentes siguen funcionando
2. **Gradual**: Activas i18n solo cuando estés listo
3. **Flexible**: Puedes tener páginas con y sin i18n
4. **Escalable**: Añadir nuevos idiomas es fácil

---

## 🔄 Migración Gradual

Puedes migrar tus landing pages existentes gradualmente:

### Opción A: Mantener ambas versiones

```
/primer-ano              → Versión española (sin i18n)
/es/primer-ano           → Versión española (con i18n)
/fr/primer-ano           → Versión francesa (con i18n)
```

### Opción B: Redirigir la antigua a la nueva

1. Activa i18n para `/primer-ano`
2. La ruta antigua redirigirá automáticamente a `/es/primer-ano`
3. Los usuarios franceses irán a `/fr/primer-ano`

---

## 🚨 Solución de Problemas

### "La web se redirige a /es y no hay nada"

**Causa:** Activaste una ruta en `i18nEnabledRoutes` pero no creaste la página en `[locale]/`

**Solución:** 
1. Quita la ruta de `i18nEnabledRoutes`, O
2. Crea la página en `/src/app/[locale]/tu-ruta/page.tsx`

### "El selector de idioma no aparece"

**Causa:** No añadiste el componente `<LanguageSwitcher />`

**Solución:** Importa y añade el componente en tu layout/header

---

## 📚 Recursos Adicionales

- Ver archivo completo de documentación: `/docs/I18N_GUIDE.md`
- Ejemplos de traducciones: `/locales/`
- Configuración de productos: `/src/config/i18n.ts`

---

**Última actualización:** 2026-02-08
