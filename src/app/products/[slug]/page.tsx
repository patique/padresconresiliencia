import prisma from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, ShieldCheck, Download, Star } from "lucide-react";

interface ProductPageProps {
    params: { slug: string };
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { slug } = params;
    const product = await prisma.product.findUnique({
        where: { slug: slug },
    });

    if (!product) {
        notFound();
    }

    const benefits = [
        "Acceso inmediato al Curso (11 Módulos)",
        "PDF completo desbloqueable a los 28 días",
        "Formato compatible con todos los dispositivos",
        "Garantía de devolución de 15 días"
    ];

    return (
        <div className="min-h-screen bg-[#FDFBF7] font-sans">
            {/* Simple Header */}
            <header className="bg-white border-b border-stone-100 py-4 sticky top-0 z-50">
                <div className="container mx-auto px-6">
                    <Link href="/" className="inline-flex items-center text-stone-500 hover:text-[#E07A5F] transition font-medium">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Volver al catálogo
                    </Link>
                </div>
            </header>

            <main className="py-12 md:py-20">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                        {/* Product Image Column */}
                        <div className="relative sticky top-24">
                            <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden shadow-2xl bg-white border-8 border-white transform rotate-1 lg:-rotate-1 hover:rotate-0 transition duration-500">
                                {product.imageUrl ? (
                                    <Image src={product.imageUrl} alt={product.title} fill className="object-cover" priority />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-stone-100 text-stone-300">Sin Imagen</div>
                                )}
                            </div>

                            {/* Floating Trust Badge */}
                            <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg flex items-center gap-3 animate-bounce-slow hidden md:flex">
                                <div className="bg-green-100 p-2 rounded-full text-green-600">
                                    <ShieldCheck className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-xs text-stone-400 font-bold uppercase tracking-wider">Garantía</p>
                                    <p className="text-sm font-bold text-stone-800">100% Satisfacción</p>
                                </div>
                            </div>
                        </div>

                        {/* Content Column */}
                        <div className="flex flex-col justify-center">
                            <div className="mb-6 flex items-center gap-2">
                                <span className="bg-[#E07A5F]/10 text-[#E07A5F] px-4 py-1.5 rounded-full text-sm font-bold tracking-wide">
                                    EBOOK PREMIUM
                                </span>
                                <div className="flex items-center gap-1 text-yellow-400 ml-4">
                                    <Star className="w-4 h-4 fill-current" />
                                    <span className="text-stone-600 text-sm font-semibold ml-1">4.9/5</span>
                                </div>
                            </div>

                            <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-6 leading-tight">
                                {product.title}
                            </h1>

                            <div className="text-lg text-stone-600 leading-relaxed mb-8 space-y-4">
                                <p>{product.description}</p>
                                <p>Una guía esencial diseñada para padres que buscan respuestas claras y prácticas, sin perderse en teoría innecesaria.</p>
                            </div>

                            {/* Price Block */}
                            <div className="bg-white rounded-2xl p-6 border border-stone-100 shadow-sm mb-8">
                                <div className="flex items-end justify-between mb-6">
                                    <div>
                                        {product.originalPrice && (
                                            <p className="text-stone-400 text-sm mb-1 line-through">Precio Habitual: {product.originalPrice.toFixed(2)}€</p>
                                        )}
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-4xl font-bold text-stone-900">{product.price.toFixed(2)}€</span>
                                            <span className="text-stone-500 text-sm">+ IVA</span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className="bg-red-100 text-red-600 px-3 py-1 rounded-md text-sm font-bold">
                                            Oferta Limitada
                                        </span>
                                    </div>
                                </div>

                                <a href="https://pay.hotmart.com/N103419626V" className="block w-full bg-[#E07A5F] hover:bg-[#D06950] text-white text-center font-bold text-lg py-4 rounded-xl shadow-lg transition transform hover:-translate-y-1 active:translate-y-0">
                                    Comprar Ahora y Descargar
                                </a>
                                <p className="text-center text-xs text-stone-400 mt-3 flex items-center justify-center gap-1">
                                    <Download className="w-3 h-3" /> Acceso inmediato y seguro a través de la plataforma Hotmart
                                </p>
                            </div>

                            {/* Benefits List */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {benefits.map((benefit, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-[#81B0B2] shrink-0 mt-0.5" />
                                        <span className="text-stone-600 text-sm">{benefit}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
