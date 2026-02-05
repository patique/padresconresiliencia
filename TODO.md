# 📋 Tareas Pendientes - Padres con Resiliencia

## 📅 Esta Semana

### ⚙️ Configurar Telegram (opcional pero recomendado)
**Prioridad:** Media
**Tiempo estimado:** 15 minutos

**Pasos:**
1. Crear bot con @BotFather en Telegram
2. Obtener Chat ID con @userinfobot
3. Añadir variables a Vercel:
   - `TELEGRAM_BOT_TOKEN`
   - `TELEGRAM_CHAT_ID`
4. Redeploy y probar

**Beneficio:** Notificaciones instantáneas en el móvil

---

### 📊 Monitorear emails de notificación
**Prioridad:** Alta
**Tiempo estimado:** Continuo

**Acciones:**
- Revisar bandeja de entrada diariamente
- Verificar que llegan notificaciones de eventos de Hotmart
- Comprobar que el formato es correcto
- Ajustar si es necesario

**Métricas a observar:**
- Número de cancelaciones diarias
- Número de abandonos de carrito
- Tasa de respuesta a emails de recordatorio

---

### 📧 Hacer seguimiento a Yamille (México - 6 intentos fallidos)
**Prioridad:** Alta
**Tiempo estimado:** 30 minutos

**Contexto:**
- Email: yamille_liz@hotmail.com
- Nombre: Yamille Dayanira Gonzalez Tapia
- País: México
- Producto: El Primer Año
- Problema: 6 intentos de compra cancelados

**Acciones sugeridas:**
1. Enviar email personalizado ofreciendo ayuda
2. Sugerir métodos de pago alternativos
3. Ofrecer descuento especial por las molestias (opcional)
4. Verificar si el problema es técnico o de método de pago

**Template de email personalizado:**
```
Asunto: Yamille, ¿podemos ayudarte con tu compra?

Hola Yamille,

Notamos que intentaste adquirir "El Primer Año" varias veces 
pero algo no funcionó correctamente.

Queremos ayudarte. ¿Tuviste algún problema con el pago?

Podemos:
- Ayudarte con métodos de pago alternativos
- Resolver cualquier duda sobre el producto
- Ofrecerte asistencia personalizada

Responde a este email y te ayudaremos encantados.

Un abrazo,
Pablo - Padres con Resiliencia
```

---

## 🚀 Mejoras Futuras

### 🤖 Automatizar envío de recordatorios (webhook automático)
**Prioridad:** Alta
**Tiempo estimado:** 4-6 horas

**Descripción:**
Actualmente los recordatorios se envían manualmente. Automatizar para que:
- Se envíen automáticamente 24h después de una cancelación
- Se envíen 48h después de un abandono de carrito
- Se envíe un segundo recordatorio a los 7 días si no hay conversión

**Implementación:**
1. Crear tabla `scheduled_emails` en la base de datos
2. Crear cron job o usar Vercel Cron
3. Verificar estado antes de enviar (evitar duplicados)
4. Marcar como enviado en la base de datos

**Beneficios:**
- Recuperación automática de ventas
- Sin intervención manual
- Mayor tasa de conversión

---

### 📊 Dashboard de métricas de conversión
**Prioridad:** Media
**Tiempo estimado:** 8-12 horas

**Descripción:**
Panel de control para visualizar:
- Ventas totales por producto
- Tasa de conversión
- Abandonos de carrito (%)
- Recuperación de carritos (%)
- Ingresos por país
- Gráficos de tendencias

**Tecnologías sugeridas:**
- Next.js + React
- Recharts o Chart.js para gráficos
- Prisma para consultas
- Autenticación simple (password)

**Métricas clave:**
- Conversión general
- Tasa de abandono
- Tasa de recuperación
- Revenue por producto
- Países top

**URL sugerida:** `/admin/dashboard`

---

### 🎨 Personalizar emails según el producto
**Prioridad:** Media
**Tiempo estimado:** 3-4 horas

**Descripción:**
Actualmente todos los emails usan el mismo template genérico.
Crear templates específicos para cada producto:

**Estructura:**
```
emails/
  templates/
    primer-ano/
      - reminder.html
      - delivery.html
    educar-fe/
      - reminder.html
      - delivery.html
    cerebro-pantallas/
      - reminder.html
      - delivery.html
```

**Personalización:**
- Imágenes del producto específico
- Beneficios destacados del producto
- Testimonios específicos
- CTA personalizado

**Beneficios:**
- Mayor relevancia
- Mejor tasa de apertura
- Mayor conversión

---

### 📱 App móvil para gestión (opcional)
**Prioridad:** Baja
**Tiempo estimado:** 40-60 horas

**Descripción:**
App móvil para gestionar el negocio desde el móvil:

**Funcionalidades:**
- Ver ventas en tiempo real
- Recibir notificaciones push
- Ver métricas del dashboard
- Responder a clientes
- Gestionar productos

**Tecnologías sugeridas:**
- React Native o Flutter
- Expo para desarrollo rápido
- API REST existente

**Alternativa más simple:**
- PWA (Progressive Web App)
- Mismo código que la web
- Instalable en móvil
- Notificaciones push

**Beneficio:**
- Gestión desde cualquier lugar
- Respuesta rápida a eventos
- Mejor control del negocio

---

## 📝 Notas

- Priorizar según impacto en ventas
- Automatización de recordatorios tiene mayor ROI
- Dashboard ayuda a tomar decisiones basadas en datos
- App móvil es opcional, PWA puede ser suficiente

---

## ✅ Completadas

- [x] Sistema de notificaciones por email
- [x] Handler para PURCHASE_CANCELED
- [x] Scripts de extracción de emails
- [x] Envío masivo de recordatorios
- [x] Seguridad mejorada (.env eliminado)
- [x] Documentación de seguridad

---

**Última actualización:** 5 de febrero de 2026
