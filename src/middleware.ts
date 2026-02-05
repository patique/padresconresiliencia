import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        // Middleware ejecutado después de verificar autenticación
        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({ token }) => {
                // Solo permitir acceso si hay un token válido
                return !!token;
            },
        },
        pages: {
            signIn: '/panel-pr2024/login',
        },
    }
);

// Proteger todas las rutas bajo /panel-pr2024 excepto /login
export const config = {
    matcher: [
        '/panel-pr2024/dashboard/:path*',
        '/panel-pr2024/emails/:path*',
        '/panel-pr2024/metrics/:path*',
    ],
};
