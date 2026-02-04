import Link from "next/link";
import { ArrowRight, ShoppingBag } from "lucide-react";

interface InternalProduct {
    title: string;
    description: string;
    price: number;
    slug: string;
    imageUrl: string;
}

interface InternalRecommendationsProps {
    currentProductSlug?: string;
}

// Productos internos de ejemplo - estos deberían venir de la base de datos
const internalProducts: InternalProduct[] = [
    {
        title: "El Primer Año",
        description: "Guía completa para sobrevivir y disfrutar los primeros 12 meses con tu bebé.",
        price: 27,
        slug: "primer-ano",
        imageUrl: "/images/primer-ano-cover.png"
    },
    {
        title: "Educar en la Fe",
        description: "El sistema probado para transmitir una fe viva a tus hijos sin sermones.",
        price: 17,
        slug: "educar-fe",
        imageUrl: "/images/educar-fe-cover.png"
    }
];

export default function InternalRecommendations({ currentProductSlug }: InternalRecommendationsProps) {
    // Filtrar el producto actual
    const recommendations = internalProducts.filter(p => p.slug !== currentProductSlug).slice(0, 2);

    if (recommendations.length === 0) return null;

    return (
        <section className="py-20 bg-white border-t border-stone-100">
            <div className="container mx-auto px-6 max-w-5xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-stone-900 mb-3">
                        También te puede interesar
                    </h2>
                    <p className="text-stone-600">
                        Otros recursos de Padres con Resiliencia
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {recommendations.map((product) => (
                        <Link
                            key={product.slug}
                            href={`/products/${product.slug}`}
                            className="group bg-stone-50 rounded-2xl overflow-hidden hover:shadow-lg transition-all border border-stone-100 hover:border-[#E07A5F]/30"
                        >
                            <div className="aspect-[4/3] relative overflow-hidden bg-gradient-to-br from-stone-100 to-stone-200">
                                <img
                                    src={product.imageUrl}
                                    alt={product.title}
                                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-stone-900 mb-2 group-hover:text-[#E07A5F] transition-colors">
                                    {product.title}
                                </h3>
                                <p className="text-stone-600 text-sm mb-4 line-clamp-2">
                                    {product.description}
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className="text-2xl font-bold text-[#E07A5F]">
                                        {product.price}€
                                    </span>
                                    <span className="flex items-center gap-2 text-sm font-semibold text-stone-600 group-hover:text-[#E07A5F] transition-colors">
                                        Ver más <ArrowRight className="w-4 h-4" />
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="mt-10 text-center">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-stone-900 text-white font-bold rounded-xl hover:bg-stone-800 transition-colors"
                    >
                        <ShoppingBag className="w-5 h-5" />
                        Ver todos los recursos
                    </Link>
                </div>
            </div>
        </section>
    );
}
