import Image from "next/image";
import { ExternalLink, Sparkles } from "lucide-react";

interface ExternalProduct {
    name: string;
    description: string;
    category: string;
    link: string;
    highlight: string;
    imageUrl?: string;
}

const externalProducts: ExternalProduct[] = [
    {
        name: "Revoluciona Tu Vida",
        description: "Únete al reto y descubre tu mejor versión. Transforma tu cuerpo y mente con un programa diseñado para resultados reales.",
        category: "Fitness & Bienestar",
        link: "https://go.hotmart.com/N104275421B",
        highlight: "Programa completo de transformación",
        imageUrl: "/images/tevasa-revoluciona.jpg"
    },
    {
        name: "Ayuda a tu bebé a dormir mejor",
        description: "Guía completa para padres primerizos. Estrategias respetuosas para establecer hábitos de sueño saludables.",
        category: "Sueño Infantil",
        link: "https://go.hotmart.com/V104268249J",
        highlight: "Rutinas prácticas y adaptables",
        imageUrl: "/images/bebe-dormir-mejor.png"
    }
];

export default function ExternalRecommendations() {
    return (
        <section className="py-20 bg-gradient-to-b from-stone-50 to-white">
            <div className="container mx-auto px-6 max-w-5xl">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-600 px-4 py-2 rounded-full text-sm font-bold mb-4">
                        <Sparkles className="w-4 h-4" />
                        <span>Recursos Recomendados</span>
                    </div>
                    <h2 className="text-3xl font-bold text-stone-900 mb-3">
                        Proyectos que nos encantan
                    </h2>
                    <p className="text-stone-600">
                        Colaboradores de confianza que complementan tu camino
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {externalProducts.map((product, index) => (
                        <a
                            key={index}
                            href={product.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group bg-white rounded-xl overflow-hidden border border-stone-100 hover:border-purple-200 hover:shadow-lg transition-all"
                        >
                            {product.imageUrl && (
                                <div className="relative w-full aspect-square overflow-hidden">
                                    <Image
                                        src={product.imageUrl}
                                        alt={product.name}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                            )}

                            <div className="p-6">
                                <div className="flex items-start justify-between mb-3">
                                    <span className="text-xs font-bold text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                                        {product.category}
                                    </span>
                                    <ExternalLink className="w-4 h-4 text-stone-400 group-hover:text-purple-600 transition-colors" />
                                </div>

                                <h3 className="text-lg font-bold text-stone-900 mb-2 group-hover:text-purple-600 transition-colors">
                                    {product.name}
                                </h3>

                                <p className="text-stone-600 text-sm mb-4 line-clamp-2">
                                    {product.description}
                                </p>

                                <div className="text-xs text-purple-600 font-semibold">
                                    ✨ {product.highlight}
                                </div>
                            </div>
                        </a>
                    ))}
                </div>

                <div className="mt-8 text-center">
                    <p className="text-sm text-stone-600 font-medium">
                        💡 Recursos cuidadosamente seleccionados que complementan tu camino en la crianza consciente
                    </p>
                </div>
            </div>
        </section>
    );
}
