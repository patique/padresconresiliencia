"use client";

import { useState } from "react";
import Image from "next/image";
import { BookOpen, Star, Plus, GraduationCap, Heart, Cross, Calendar } from "lucide-react";
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

    const futureCourses = [
        {
            id: "fc-1",
            title: "Educar en la Fe: Guía para Padres",
            description: "Recursos prácticos para transmitir la fe católica en casa de forma natural y alegre.",
            price: 27.00,
            imageUrl: "/images/future_course_1.png"
        },
        {
            id: "fc-2",
            title: "Adolescencia sin Dramas",
            description: "Estrategias de comunicación para conectar con tu hijo adolescente y evitar conflictos.",
            price: 34.00,
            imageUrl: "/images/future_course_2.png"
        },
        {
            id: "fc-3",
            title: "Primeros Pasos: 0 a 3 años",
            description: "El manual definitivo para los primeros años de vida. Sueño, alimentación y apego.",
            price: 29.00,
            imageUrl: "/images/future_course_3.png"
        }
    ];

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {/* Existing Products */}
                {initialProducts.map((product) => (
                    <div key={product.id} className="group flex flex-col bg-white rounded-2xl border border-stone-200 overflow-hidden hover:shadow-xl hover:shadow-stone-200/50 transition-all duration-300 transform hover:-translate-y-1">
                        <a href={`/products/${product.slug}`} className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
                            {product.imageUrl ? (
                                <Image
                                    src={product.imageUrl}
                                    alt={product.title}
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
                                    {product.title}
                                </h3>
                            </a>

                            <p className="text-stone-600 text-sm leading-relaxed mb-6 line-clamp-3">
                                {product.description}
                            </p>

                            <div className="mt-auto flex items-center justify-between pt-6 border-t border-stone-100">
                                <div className="flex flex-col">
                                    {product.originalPrice && (
                                        <span className="text-xs text-stone-400 line-through">{product.originalPrice.toFixed(2)}€</span>
                                    )}
                                    <span className="text-2xl font-bold text-stone-900">{product.price.toFixed(2)}€</span>
                                </div>
                                <a href={`/products/${product.slug}`} className="bg-stone-900 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#E07A5F] transition-colors">
                                    Ver Detalles
                                </a>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Future Mockup Products */}
                {futureCourses.map((course) => (
                    <div key={course.id} className="group flex flex-col bg-white rounded-2xl border border-stone-200 overflow-hidden hover:shadow-xl hover:shadow-stone-200/50 transition-all duration-300 transform hover:-translate-y-1">
                        <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
                            <Image
                                src={course.imageUrl}
                                alt={course.title}
                                fill
                                className="object-cover group-hover:scale-105 transition duration-500 opacity-90 group-hover:opacity-100 grayscale group-hover:grayscale-0"
                            />
                            <div className="absolute top-4 right-4 bg-stone-900/80 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm">
                                Próximamente
                            </div>
                        </div>

                        <div className="p-6 flex-1 flex flex-col">
                            <h3 className="text-xl font-bold text-stone-800 mb-2 group-hover:text-[#E07A5F] transition">
                                {course.title}
                            </h3>
                            <p className="text-stone-500 text-sm leading-relaxed mb-6">
                                {course.description}
                            </p>

                            <div className="mt-auto pt-6 border-t border-stone-100">
                                <button
                                    type="button"
                                    onClick={() => setSelectedTopic(course.title)}
                                    className="w-full bg-stone-100 text-stone-600 hover:bg-[#E07A5F] hover:text-white border border-transparent hover:border-[#E07A5F] px-5 py-3 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 group-hover:bg-[#E07A5F]/10 group-hover:text-[#E07A5F] group-hover:hover:bg-[#E07A5F] group-hover:hover:text-white"
                                >
                                    <Heart className="w-4 h-4" /> Lo quiero
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <WaitlistModal
                isOpen={!!selectedTopic}
                topic={selectedTopic || ""}
                onClose={() => setSelectedTopic(null)}
            />
        </>
    );
}
