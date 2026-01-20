import { Metadata } from 'next';

const siteUrl = "https://www.padresconresiliencia.com";

export default function sitemap() {
    const routes = [
        "",
        "/products/bienestar-emocional-padres",
        // Add other existing slugs if available
    ].map((route) => ({
        url: `${siteUrl}${route}`,
        lastModified: new Date().toISOString(),
    }));

    return routes;
}
