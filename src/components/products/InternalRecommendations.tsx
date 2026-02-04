import Link from "next/link";
import { ArrowRight, ShoppingBag } from "lucide-react";
import prisma from "@/lib/prisma";

interface InternalRecommendationsProps {
    currentProductSlug?: string;
}

export default async function InternalRecommendations({ currentProductSlug }: InternalRecommendationsProps) {
    // Obtener productos de la base de datos
    const allProducts = await prisma.product.findMany({
        where: {
            price: {
                gt: 0 // Solo productos con precio mayor a 0
            }
        },
        select: {
            title: true,
            description: true,
            price: true,
            slug: true,
            imageUrl: true,
            isActive: true
        }
    });

    // Filtrar el producto actual
    const recommendations = allProducts
        .filter(p => p.slug !== currentProductSlug)
        .slice(0, 2);

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
                    {recommendations.map((product) => {
                        const CardWrapper = product.isActive ? Link : 'div';
                        const cardProps = product.isActive
                            ? { href: `/products/${product.slug}` }
                            : {};

                        return (
                            <CardWrapper
                                key={product.slug}
                                {...cardProps}
                                className={`group bg-stone-50 rounded-2xl overflow-hidden transition-all border border-stone-100 ${product.isActive
                                        ? 'hover:shadow-lg hover:border-[#E07A5F]/30 cursor-pointer'
                                        : 'opacity-90'
                                    }`}
                            >
                                <div className="aspect-[4/3] relative overflow-hidden bg-gradient-to-br from-stone-100 to-stone-200">
                                    {product.imageUrl && (
                                        <img
                                            src={product.imageUrl}
                                            alt={product.title}
                                            className={`object-cover w-full h-full ${product.isActive ? 'group-hover:scale-105' : ''
                                                } transition-transform duration-500`}
                                        />
                                    )}
                                    {!product.isActive && (
                                        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center">
                                            <span className="bg-[#f97316] text-white px-6 py-3 rounded-full font-bold text-lg shadow-lg">
                                                Próximamente
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <div className="p-6">
                                    <h3 className={`text-xl font-bold text-stone-900 mb-2 transition-colors ${product.isActive ? 'group-hover:text-[#E07A5F]' : ''
                                        }`}>
                                        {product.title}
                                    </h3>
                                    <p className="text-stone-600 text-sm mb-4 line-clamp-2">
                                        {product.description}
                                    </p>
                                    <div className="flex items-center justify-between">
                                        {product.isActive ? (
                                            <>
                                                <span className="text-2xl font-bold text-[#E07A5F]">
                                                    {product.price}€
                                                </span>
                                                <span className="flex items-center gap-2 text-sm font-semibold text-stone-600 group-hover:text-[#E07A5F] transition-colors">
                                                    Ver más <ArrowRight className="w-4 h-4" />
                                                </span>
                                            </>
                                        ) : (
                                            <>
                                                <span className="text-xl font-bold text-stone-400">
                                                    {product.price}€
                                                </span>
                                                <Link
                                                    href="/#waitlist"
                                                    className="flex items-center gap-2 text-sm font-semibold text-[#E07A5F] hover:text-[#D06950] transition-colors"
                                                >
                                                    Apúntate al waitlist <ArrowRight className="w-4 h-4" />
                                                </Link>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </CardWrapper>
                        );
                    })}
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
