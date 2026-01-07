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

    const availableProducts = initialProducts.filter(p => p.price > 0);
    const waitlistProducts = initialProducts.filter(p => p.price === 0);

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {/* Available Products (Ebooks) */}
                {availableProducts.map((product) => (
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

                {/* Waitlist / Future Products */}
                {waitlistProducts.map((course) => (
                    <div key={course.id} className="group flex flex-col bg-white rounded-2xl border border-stone-200 overflow-hidden hover:shadow-xl hover:shadow-stone-200/50 transition-all duration-300 transform hover:-translate-y-1">
                        <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
                            {course.imageUrl ? (
                                <Image
                                    src={course.imageUrl}
                                    alt={course.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition duration-500 opacity-90 group-hover:opacity-100 grayscale group-hover:grayscale-0"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-stone-400">
                                    <GraduationCap className="w-12 h-12 opacity-50" />
                                </div>
                            )}
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
                key={selectedTopic || "waitlist"}
                isOpen={!!selectedTopic}
                topic={selectedTopic || ""}
                onClose={() => setSelectedTopic(null)}
                previewContent={selectedTopic?.includes("Educar en la Fe") ? (
                    <div className="space-y-8">
                        <div>
                            <h4 className="font-bold text-[#E07A5F] mb-1 uppercase text-xs tracking-wider">Introducción</h4>
                            <h3 className="font-bold text-stone-800 text-lg mb-3">La fe como refugio, no como carga</h3>
                            <ul className="space-y-2 text-stone-600">
                                <li className="flex gap-2 items-start"><span className="text-[#E07A5F] mt-1">•</span> El peso de la lista de tareas y el error de la "Asignatura Religión".</li>
                                <li className="flex gap-2 items-start"><span className="text-[#E07A5F] mt-1">•</span> Lo que este libro no es (y lo que sí es).</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold text-[#E07A5F] mb-1 uppercase text-xs tracking-wider">Módulo 1</h4>
                            <h3 className="font-bold text-stone-800 text-lg mb-3">El Cambio de Mentalidad (Los Cimientos)</h3>
                            <ul className="space-y-2 text-stone-600">
                                <li className="flex gap-2 items-start"><span className="text-[#E07A5F] mt-1">•</span> <strong>Dios no es un policía:</strong> Jubilar al vigilante para encontrar al Padre.</li>
                                <li className="flex gap-2 items-start"><span className="text-[#E07A5F] mt-1">•</span> <strong>La fe se contagia, no se impone:</strong> El poder del testimonio.</li>
                                <li className="flex gap-2 items-start"><span className="text-[#E07A5F] mt-1">•</span> <strong>Vulnerabilidad:</strong> Por qué pedir perdón a tus hijos es un acto de fe.</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold text-[#E07A5F] mb-1 uppercase text-xs tracking-wider">Módulo 2</h4>
                            <h3 className="font-bold text-stone-800 text-lg mb-3">Lo Sagrado en lo Cotidiano (0 a 7 años)</h3>
                            <ul className="space-y-2 text-stone-600">
                                <li className="flex gap-2 items-start"><span className="text-[#E07A5F] mt-1">•</span> <strong>Micro-liturgias domésticas:</strong> Momentos "ancla" que crean seguridad.</li>
                                <li className="flex gap-2 items-start"><span className="text-[#E07A5F] mt-1">•</span> <strong>El asombro en la naturaleza:</strong> Leer el libro de la Creación.</li>
                                <li className="flex gap-2 items-start"><span className="text-[#E07A5F] mt-1">•</span> <strong>La teología del juego:</strong> Dios entre los juguetes y las risas.</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold text-[#E07A5F] mb-1 uppercase text-xs tracking-wider">Módulo 3</h4>
                            <h3 className="font-bold text-stone-800 text-lg mb-3">Preguntas Difíciles (7 a 12 años)</h3>
                            <ul className="space-y-2 text-stone-600">
                                <li className="flex gap-2 items-start"><span className="text-[#E07A5F] mt-1">•</span> <strong>¿Por qué existe el mal?:</strong> Libertad, dolor y esperanza real.</li>
                                <li className="flex gap-2 items-start"><span className="text-[#E07A5F] mt-1">•</span> <strong>La Misa sin dramas:</strong> De la obligación a la fiesta.</li>
                                <li className="flex gap-2 items-start"><span className="text-[#E07A5F] mt-1">•</span> <strong>Héroes de verdad:</strong> Los santos como referentes de aventura.</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold text-[#E07A5F] mb-1 uppercase text-xs tracking-wider">Módulo 4</h4>
                            <h3 className="font-bold text-stone-800 text-lg mb-3">Adolescencia y Rebeldía (12+ años)</h3>
                            <ul className="space-y-2 text-stone-600">
                                <li className="flex gap-2 items-start"><span className="text-[#E07A5F] mt-1">•</span> <strong>La duda como motor:</strong> Por qué cuestionar la fe es necesario.</li>
                                <li className="flex gap-2 items-start"><span className="text-[#E07A5F] mt-1">•</span> <strong>Conectar antes de corregir:</strong> Hablar el idioma de los valores.</li>
                                <li className="flex gap-2 items-start"><span className="text-[#E07A5F] mt-1">•</span> <strong>Jesús el Revolucionario:</strong> El imán del compromiso social.</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold text-[#E07A5F] mb-1 uppercase text-xs tracking-wider">Módulo 5</h4>
                            <h3 className="font-bold text-stone-800 text-lg mb-3">Cuidar al Cuidador</h3>
                            <ul className="space-y-2 text-stone-600">
                                <li className="flex gap-2 items-start"><span className="text-[#E07A5F] mt-1">•</span> <strong>No puedes dar lo que no tienes:</strong> Tus 5 minutos de oasis.</li>
                                <li className="flex gap-2 items-start"><span className="text-[#E07A5F] mt-1">•</span> <strong>Soltar el control:</strong> Confiar en que Dios los quiere más que tú.</li>
                            </ul>
                        </div>

                        <div className="bg-[#E07A5F]/10 p-4 rounded-xl border border-[#E07A5F]/20">
                            <h3 className="font-bold text-stone-900 mb-2">✨ Bonus Incluidos</h3>
                            <ul className="space-y-1 text-sm text-stone-700">
                                <li>• Cinefórum familiar: Películas para hablar de Dios.</li>
                                <li>• El bote de la gratitud: Ritual de fin de año.</li>
                                <li>• Voluntariado en familia: La fe que se pone las botas.</li>
                            </ul>
                        </div>
                    </div>
                ) : undefined}
            />
        </>
    );
}
