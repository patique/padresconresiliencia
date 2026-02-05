# 🔐 Guía de Seguridad y Configuración

## ⚠️ IMPORTANTE: Seguridad de Credenciales

### 🚨 Acción Inmediata Requerida

GitGuardian ha detectado que se expusieron credenciales en el repositorio. **Debes hacer lo siguiente INMEDIATAMENTE:**

1. **Regenerar la contraseña de aplicación de Gmail:**
   - Ve a: https://myaccount.google.com/apppasswords
   - Elimina la contraseña antigua
   - Genera una nueva contraseña de 16 caracteres
   - Actualízala en Vercel (variables de entorno)

2. **Verificar `.env` en `.gitignore`:**
   - ✅ Ya está añadido
   - ✅ Ya se eliminó del repositorio
   - ⚠️ **NUNCA** subas el archivo `.env` al repositorio

3. **Rotar otras credenciales sensibles:**
   - Contraseña de base de datos (si es necesario)
   - Token de webhook de Hotmart (si es necesario)

---

## 📧 Sistema de Notificaciones

### Configuración de Email

Las notificaciones por email ya están configuradas. Recibirás emails automáticos cuando:

- ❌ **PURCHASE_CANCELED** - Alguien cancela una compra
- 🛒 **PURCHASE_OUT_OF_SHOPPING_CART** - Alguien abandona el carrito
- 💸 **PURCHASE_REFUNDED** - Se solicita un reembolso

### Configuración de Telegram (Opcional)

Para recibir notificaciones instantáneas por Telegram:

1. **Crear un bot de Telegram:**
   ```
   1. Habla con @BotFather en Telegram
   2. Envía /newbot
   3. Sigue las instrucciones
   4. Copia el token que te da
   ```

2. **Obtener tu Chat ID:**
   ```
   1. Habla con @userinfobot en Telegram
   2. Te dará tu Chat ID
   ```

3. **Añadir a las variables de entorno:**
   ```env
   TELEGRAM_BOT_TOKEN=tu_token_aquí
   TELEGRAM_CHAT_ID=tu_chat_id_aquí
   ```

4. **Actualizar en Vercel:**
   - Ve a Settings → Environment Variables
   - Añade ambas variables
   - Redeploy

---

## 🔧 Variables de Entorno

### Archivo `.env` Local

Copia `.env.example` a `.env` y completa los valores:

```bash
cp .env.example .env
```

### Variables Requeridas en Vercel

Asegúrate de tener estas variables configuradas en Vercel:

- ✅ `DATABASE_URL`
- ✅ `GMAIL_USER`
- ✅ `GMAIL_APP_PASSWORD` (⚠️ REGENERAR AHORA)
- ✅ `HOTMART_WEBHOOK_SECRET`
- ⚙️ `TELEGRAM_BOT_TOKEN` (opcional)
- ⚙️ `TELEGRAM_CHAT_ID` (opcional)

---

## 📊 Mejoras Implementadas

### 1. Sistema de Notificaciones Automáticas

- ✅ Email al admin cuando hay eventos críticos
- ✅ Telegram (opcional) para notificaciones instantáneas
- ✅ Formato HTML profesional con prioridad según urgencia

### 2. Webhook Mejorado

- ✅ Handler para `PURCHASE_CANCELED`
- ✅ Handler para `PURCHASE_REFUNDED`
- ✅ Notificaciones automáticas para abandonos de carrito
- ✅ URLs dinámicas (eliminadas URLs hardcodeadas)

### 3. Seguridad

- ✅ `.env` añadido a `.gitignore`
- ✅ `.env.example` como plantilla
- ✅ Credenciales eliminadas del repositorio

---

## 🚀 Próximos Pasos

1. **URGENTE**: Regenerar contraseña de Gmail
2. **Opcional**: Configurar Telegram para notificaciones instantáneas
3. **Recomendado**: Revisar y actualizar otras credenciales por seguridad

---

## 📝 Notas

- Las notificaciones por email se envían a `GMAIL_USER`
- Los emails tienen prioridad alta para eventos críticos
- Telegram es opcional pero recomendado para respuesta rápida
- Todos los eventos se siguen guardando en `webhookLog` para auditoría

---

## ❓ Soporte

Si tienes problemas con las notificaciones:

1. Verifica que las variables de entorno estén configuradas en Vercel
2. Revisa los logs de Vercel para ver errores
3. Prueba enviando un email de prueba con el endpoint `/api/send-reminder-test`
