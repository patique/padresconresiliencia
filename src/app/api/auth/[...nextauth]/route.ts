import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// Lista de emails autorizados para acceder al panel
const AUTHORIZED_EMAILS = process.env.ADMIN_EMAILS?.split(',').map(email => email.trim()) || [];

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
    ],

    callbacks: {
        async signIn({ user }) {
            // Solo permitir emails autorizados
            if (user.email && AUTHORIZED_EMAILS.includes(user.email)) {
                return true;
            }

            // Rechazar acceso
            console.log(`❌ Unauthorized login attempt: ${user.email}`);
            return false;
        },

        async session({ session, token }) {
            // Añadir información adicional a la sesión si es necesario
            return session;
        },
    },

    pages: {
        signIn: '/panel-pr2024/login',
        error: '/panel-pr2024/login',
    },

    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
