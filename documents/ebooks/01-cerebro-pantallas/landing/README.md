# 📁 RECURSOS PARA LA LANDING PAGE

Esta carpeta contiene todos los recursos necesarios para crear la landing page del ebook en tu proyecto Next.js.

---

## 📄 ARCHIVOS INCLUIDOS

### 1. PROMPT_LANDING_PAGE.md
Documento completo con toda la estructura, copy y especificaciones técnicas para generar la landing page.

### 2. IMÁGENES

**hero_background.png**
- **Uso:** Imagen de fondo de la sección Hero (Above the Fold)
- **Descripción:** Padre preocupado mirando a su hijo absorto en el móvil
- **Dimensiones recomendadas:** 1920x1080px (ya optimizada)

**ebook_mockup.png**
- **Uso:** Sección de "Solución" - Presentación del producto
- **Descripción:** Mockup 3D del ebook con portada profesional
- **Nota:** Esta es la imagen principal del producto

**familia_feliz.png**
- **Uso:** Sección de "Solución" o "Testimonios"
- **Descripción:** Familia jugando junta sin pantallas (el "después")
- **Contraste:** Perfecto para mostrar el resultado positivo

**nino_estudiando.png**
- **Uso:** Sección de "Beneficios" o "Contenido"
- **Descripción:** Niña concentrada estudiando feliz
- **Mensaje:** Recuperación de la concentración

**garantia_badge.png**
- **Uso:** Sección de "Garantía" y footer
- **Descripción:** Badge de "Garantía de 30 Días"
- **Formato:** PNG con fondo transparente (listo para overlay)

---

## 🎨 PALETA DE COLORES SUGERIDA

```css
/* Primarios */
--color-primary: #1e3a8a;        /* Azul oscuro - Confianza */
--color-secondary: #f97316;      /* Naranja - Urgencia/CTA */

/* Neutros */
--color-background: #f9fafb;     /* Gris muy claro */
--color-text: #1f2937;           /* Gris oscuro */
--color-text-light: #6b7280;     /* Gris medio */

/* Acentos */
--color-success: #10b981;        /* Verde - Garantía */
--color-warning: #fbbf24;        /* Amarillo - Atención */
```

---

## 📐 ESTRUCTURA DE SECCIONES

1. **Hero** → hero_background.png
2. **Problema** → (Solo texto + iconos)
3. **Solución** → ebook_mockup.png + familia_feliz.png
4. **Testimonios** → (Avatares genéricos o familia_feliz.png)
5. **Contenido** → nino_estudiando.png
6. **Garantía** → garantia_badge.png
7. **FAQ** → (Solo texto)
8. **CTA Final** → hero_background.png (reutilizar con overlay)

---

## 🚀 CÓMO USAR ESTOS RECURSOS

### Opción A: Generar con IA
1. Abre `PROMPT_LANDING_PAGE.md`
2. Copia todo el contenido
3. Pégalo en tu agente IA (Claude, ChatGPT, etc.)
4. Añade: "Usa las imágenes de esta carpeta: hero_background.png, ebook_mockup.png, etc."

### Opción B: Desarrollo manual
1. Crea un nuevo componente en tu proyecto Next.js: `pages/ebook-cerebro-pantallas.tsx`
2. Importa las imágenes desde esta carpeta
3. Sigue la estructura del PROMPT_LANDING_PAGE.md sección por sección

---

## 📊 OPTIMIZACIÓN RECOMENDADA

**Antes de subir a producción:**
- [ ] Comprimir imágenes con TinyPNG o similar (target: <200KB cada una)
- [ ] Convertir a formato WebP para mejor rendimiento
- [ ] Añadir lazy loading a imágenes below the fold
- [ ] Configurar alt text descriptivo para SEO

**Ejemplo:**
```jsx
<Image 
  src="/images/hero_background.webp"
  alt="Padre preocupado viendo a su hijo absorto en el móvil"
  width={1920}
  height={1080}
  priority // Solo para hero
/>
```

---

## 🔗 ENLACE DE HOTMART

**Recuerda reemplazar en el código:**
```jsx
const HOTMART_LINK = "TU_ENLACE_AQUI";
```

---

## 📧 CONTACTO

Si necesitas ajustes o tienes dudas:
contacto@padresconresiliencia.com

---

© 2026 Padres con Resiliencia
