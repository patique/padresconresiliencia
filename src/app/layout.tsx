import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react"
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.padresconresiliencia.com"),
  title: {
    default: "Padres con Resiliencia | Guías y Cursos de Crianza",
    template: "%s | Padres con Resiliencia",
  },
  description: "Recursos prácticos, guías y cursos para una crianza consciente y respetuosa. Supera el agotamiento, educa en la fe y conecta con tus hijos.",
  keywords: ["crianza consciente", "educación emocional", "padres primerizos", "fe católica", "adolescencia", "crianza respetuosa", "resiliencia familiar"],
  authors: [{ name: "Máximo" }],
  creator: "Padres con Resiliencia",
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://www.padresconresiliencia.com",
    title: "Padres con Resiliencia | Guías y Cursos de Crianza",
    description: "Recursos prácticos para una crianza consciente. Supera el agotamiento y conecta con tus hijos.",
    siteName: "Padres con Resiliencia",
    images: [
      {
        url: "/og-image.jpg", // We will need to ensure this image exists or use a product image
        width: 1200,
        height: 630,
        alt: "Padres con Resiliencia - Crianza Consciente",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Padres con Resiliencia | Guías y Cursos de Crianza",
    description: "Recursos prácticos para una crianza consciente. Supera el agotamiento y conecta con tus hijos.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1526673325256881');
            fbq('track', 'PageView');
          `}
        </Script>
        {children}
        <Analytics />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1526673325256881&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </body>
    </html>
  );
}
