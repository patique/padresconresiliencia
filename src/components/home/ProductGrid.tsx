"use client";

import { useState } from "react";
import Image from "next/image";
import { BookOpen, Star, Plus, GraduationCap, Heart, Cross, Calendar, Check } from "lucide-react";
import WaitlistModal from "@/components/ui/WaitlistModal";

interface Product {
    id: string;
    title: string;
    description: string;
    price: number;
    originalPrice: number | null;
    imageUrl: string | null;
    slug: string;
}

export default function ProductGrid({ initialProducts }: { initialProducts: Product[] }) {
    const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

    const availableProducts = initialProducts.filter(p => p.price > 0);
    const waitlistProducts = initialProducts.filter(p => p.price === 0);

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {/* Available Products (Ebooks) */}
                {availableProducts.map((product) => {
                    // Override logic for specific product branding
                    const displayTitle = product.slug === 'bienestar-emocional-padres'
                        ? "Cómo Disfrutar del Primer Año de tu Bebé"
                        : product.title;

                    const displayImage = product.slug === 'bienestar-emocional-padres'
                        ? "/images/portada-ebook-final.png"
                        : product.slug === 'educar-en-la-fe'
                            ? "/images/educar-fe-cover.png"
                            : product.imageUrl;

                    return (
                        <div key={product.id} className="group flex flex-col bg-white rounded-2xl border border-stone-200 overflow-hidden hover:shadow-xl hover:shadow-stone-200/50 transition-all duration-300 transform hover:-translate-y-1">
                            <a href={`/products/${product.slug}`} className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
                                {displayImage ? (
                                    <Image
                                        src={displayImage}
                                        alt={displayTitle}
                                        fill
                                        className="object-cover group-hover:scale-105 transition duration-500"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-stone-400">
                                        <BookOpen className="w-12 h-12 opacity-50" />
                                    </div>
                                )}
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-stone-800 shadow-sm">
                                    Digital PDF
                                </div>
                            </a>

                            <div className="p-6 flex-1 flex flex-col">
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="flex text-yellow-400">
                                        {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="w-4 h-4 fill-current" />)}
                                    </div>
                                    <span className="text-xs text-stone-400">(128 reseñas)</span>
                                </div>

                                <a href={`/products/${product.slug}`}>
                                    <h3 className="text-xl font-bold text-stone-900 mb-2 group-hover:text-[#E07A5F] transition">
                                        {displayTitle}
                                    </h3>
                                </a>

                                <p className="text-stone-600 text-sm leading-relaxed mb-6 line-clamp-3">
                                    {product.description}
                                </p>

                                <div className="mt-auto flex items-center justify-between pt-6 border-t border-stone-100">
                                    <div className="flex flex-col">
                                        <div className="flex flex-col">
                                            {product.originalPrice && (
                                                <span className="text-xs text-stone-400 line-through">
                                                    {product.originalPrice.toFixed(2)} {product.slug === 'bienestar-emocional-padres' ? 'US$' : '€'}
                                                </span>
                                            )}
                                            <span className="text-2xl font-bold text-stone-900">
                                                {product.price.toFixed(2)} {product.slug === 'bienestar-emocional-padres' ? 'US$' : '€'}
                                            </span>
                                        </div>
                                    </div>
                                    <a href={`/products/${product.slug}`} className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors ${product.slug === 'educar-en-la-fe' ? 'bg-[#E07A5F] text-white hover:bg-[#c96348]' : 'bg-stone-900 text-white hover:bg-[#E07A5F]'}`}>
                                        {product.slug === 'educar-en-la-fe' ? "Comprar Ahora" : "Ver Detalles"}
                                    </a>
                                </div>
                            </div>
                        </div>
                    );
                })}

                {/* Waitlist / Future Products */}
                {/* Waitlist / Future Products */}
                {waitlistProducts.map((course) => {
                    const displayImage = course.slug === 'educar-en-la-fe'
                        ? "/images/como-educar-en-la-fe.png"
                        : course.imageUrl;

                    return (
                        <div key={course.id} className="group flex flex-col bg-white rounded-2xl border border-stone-200 overflow-hidden hover:shadow-xl hover:shadow-stone-200/50 transition-all duration-300 transform hover:-translate-y-1">
                            <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
                                {displayImage ? (
                                    <Image
                                        src={displayImage}
                                        alt={course.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition duration-500 opacity-90 group-hover:opacity-100 grayscale hover:grayscale-0"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-stone-400">
                                        <GraduationCap className="w-12 h-12 opacity-50" />
                                    </div>
                                )}
                                {course.slug !== 'educar-en-la-fe' && (
                                    <div className="absolute top-4 right-4 bg-stone-900/80 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm">
                                        Próximamente
                                    </div>
                                )}
                                {course.slug === 'educar-en-la-fe' && (
                                    <div className="absolute top-4 right-4 bg-[#E07A5F] text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm animate-pulse">
                                        -30% DETO
                                    </div>
                                )}
                            </div>

                            <div className="p-6 flex-1 flex flex-col">
                                <h3 className="text-xl font-bold text-stone-800 mb-2 group-hover:text-[#E07A5F] transition">
                                    {course.title}
                                </h3>
                                <p className="text-stone-500 text-sm leading-relaxed mb-6">
                                    {course.description}
                                </p>

                                <div className="mt-auto pt-6 border-t border-stone-100">
                                    {course.slug === 'educar-en-la-fe' ? (
                                        <div className="flex flex-col gap-3">
                                            <div className="flex items-center justify-between">
                                                <div className="flex flex-col leading-none">
                                                    <span className="text-xs text-stone-400 line-through mb-1">7.00€</span>
                                                    <span className="text-2xl font-bold text-stone-900">4.90€</span>
                                                </div>
                                                <span className="bg-[#E07A5F]/10 text-[#E07A5F] px-2 py-1 rounded text-xs font-bold uppercase tracking-wide">Preventa</span>
                                            </div>
                                            <a
                                                href={`/products/${course.slug}`}
                                                className="w-full bg-stone-900 text-white hover:bg-[#E07A5F] px-5 py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                                            >
                                                Comprar Ahora
                                            </a>
                                        </div>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={() => setSelectedTopic(course.title)}
                                            className="w-full bg-stone-100 text-stone-600 hover:bg-[#E07A5F] hover:text-white border border-transparent hover:border-[#E07A5F] px-5 py-3 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 group-hover:bg-[#E07A5F]/10 group-hover:text-[#E07A5F] group-hover:hover:bg-[#E07A5F] group-hover:hover:text-white"
                                        >
                                            <Heart className="w-4 h-4" /> Avisadme
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <WaitlistModal
                key={selectedTopic || "waitlist"}
                isOpen={!!selectedTopic}
                topic={selectedTopic || ""}
                onClose={() => setSelectedTopic(null)}
                previewContent={selectedTopic?.includes("Educar en la Fe") ? (
                    <div className="space-y-6 text-left">
                        <h3 className="font-bold text-stone-900 text-xl leading-tight">
                            ¿Sientes que la fe de tus hijos se te escapa entre los dedos?
                        </h3>

                        <div className="space-y-4 text-stone-600 text-sm leading-relaxed">
                            <p>
                                Seamos honestos: educar en la fe hoy es difícil. Te preocupa que el día de mañana tus hijos no encuentren sentido en la Iglesia. Te duele ver que se aburren en Misa o que cuestionan todo lo que les has enseñado con tanto amor.
                            </p>

                            <p className="font-medium text-stone-800 italic border-l-4 border-[#E07A5F] pl-4 py-1 bg-stone-50 rounded-r-lg">
                                "Lo que nadie nos dijo es que la fe no se enseña con sermones, se contagia con asombro."
                            </p>

                            <p>
                                He escrito este ebook para padres como tú: que aman a Dios, que aman a sus hijos, pero que se sienten agotados por intentar "cumplir" con todo.
                            </p>
                        </div>

                        <div>
                            <h4 className="font-bold text-stone-900 mb-3 text-sm">En este libro descubrirás:</h4>
                            <ul className="space-y-3 text-sm text-stone-600">
                                <li className="flex gap-3">
                                    <div className="bg-green-100 text-green-700 rounded-full p-1 shrink-0 h-fit mt-0.5"><Check className="w-3 h-3" /></div>
                                    <span><strong>0 a 7 años:</strong> Cómo crear rituales sencillos que den seguridad y paz a tu hogar.</span>
                                </li>
                                <li className="flex gap-3">
                                    <div className="bg-green-100 text-green-700 rounded-full p-1 shrink-0 h-fit mt-0.5"><Check className="w-3 h-3" /></div>
                                    <span><strong>7 a 12 años:</strong> Cómo responder a las preguntas difíciles sobre el mal y el sufrimiento sin miedo.</span>
                                </li>
                                <li className="flex gap-3">
                                    <div className="bg-green-100 text-green-700 rounded-full p-1 shrink-0 h-fit mt-0.5"><Check className="w-3 h-3" /></div>
                                    <span><strong>Adolescentes:</strong> El arte de "conectar antes de corregir" para no perder el vínculo cuando lleguen las dudas.</span>
                                </li>
                                <li className="flex gap-3">
                                    <div className="bg-green-100 text-green-700 rounded-full p-1 shrink-0 h-fit mt-0.5"><Check className="w-3 h-3" /></div>
                                    <span><strong>Para ti:</strong> Cómo recuperar tus propios 5 minutos de paz para volver a disfrutar de tu familia.</span>
                                </li>
                            </ul>
                        </div>

                        <p className="text-stone-600 text-sm italic bg-[#E07A5F]/10 p-4 rounded-xl border border-[#E07A5F]/20">
                            Este no es un libro para padres perfectos. Es un libro para padres reales. Si estás listo para dejar atrás la culpa y empezar a vivir una fe que respira, que ríe y que conecta de verdad con el corazón de tus hijos, este libro es para ti.
                        </p>
                    </div>
                ) : undefined}
            />
        </>
    );
}
