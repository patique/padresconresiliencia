"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, Star, ShieldCheck, ArrowRight, Heart, BookOpen, Clock, Users, Sun, Moon, CloudRain, Zap } from "lucide-react";
import OfferCountdown from "@/components/ui/OfferCountdown";
import AuthorSection from "@/components/home/AuthorSection";

interface Product {
    title: string;
    description: string;
    price: number;
    originalPrice: number | null;
    imageUrl: string | null;
    slug: string;
}

export default function EducarFeLanding({ product }: { product: Product }) {
    return (
        <div className="min-h-screen bg-[#FDFBF7] font-sans text-stone-800">
            {/* --- HERO SECTION --- */}
            <header className="relative pt-10 pb-20 md:pt-16 md:pb-32 overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/pattern-light.png')] opacity-50 z-0"></div>
                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-4xl mx-auto text-center mb-12">
                        <div className="inline-flex items-center gap-2 bg-[#E07A5F]/10 text-[#E07A5F] px-4 py-1.5 rounded-full text-sm font-bold tracking-wide mb-8">
                            <Star className="w-4 h-4 fill-current" />
                            <span>MÉTODO "ESPIRITUALIDAD RESILIENTE"</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-stone-900 mb-6 leading-tight">
                            ¿Y si la Fe no fuera otra tarea más, sino el <span className="text-[#E07A5F] underline decoration-4 decoration-[#E07A5F]/20">Refugio</span> al que tus hijos querrán volver siempre?
                        </h1>
                        <p className="text-xl md:text-2xl text-stone-600 leading-relaxed max-w-2xl mx-auto">
                            Deja de ser el "policía de Dios" y conviértete en el guía que contagia el asombro. Sin peleas, sin aburrimiento y sin juicios.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                        <div className="relative order-2 md:order-1">
                            <div className="relative z-10 transform rotate-[-2deg] hover:rotate-0 transition duration-500">
                                <Image
                                    src={product.imageUrl || "/images/educar-en-la-fe-portada.png"}
                                    alt="Portada Ebook Educar en la Fe"
                                    width={600}
                                    height={800}
                                    className="rounded-2xl shadow-2xl border-8 border-white"
                                    priority
                                />
                            </div>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#E07A5F]/20 blur-3xl rounded-full -z-10"></div>
                        </div>

                        <div className="order-1 md:order-2 flex flex-col gap-6">
                            <div className="bg-white p-6 rounded-2xl shadow-lg border border-stone-100">
                                <div className="flex items-center gap-4 mb-4 border-b border-stone-100 pb-4">
                                    <div className="text-center">
                                        <p className="text-xs text-stone-400 uppercase font-bold">Precio Habitual</p>
                                        <p className="text-lg line-through text-stone-400 font-medium">{product.originalPrice}€</p>
                                    </div>
                                    <div className="flex-1 text-center bg-[#E07A5F]/10 rounded-lg py-2">
                                        <p className="text-xs text-[#E07A5F] uppercase font-bold">Oferta Hoy</p>
                                        <p className="text-3xl font-bold text-[#E07A5F]">{product.price}€</p>
                                    </div>
                                </div>
                                <OfferCountdown className="justify-center mb-4 text-[#E07A5F]" />
                                <a href="https://pay.hotmart.com/YOUR_HOTMART_LINK_HERE" className="block w-full bg-[#E07A5F] hover:bg-[#c96348] text-white text-center font-bold text-lg py-4 rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
                                    Quiero mi Guía Ahora
                                </a>
                                <p className="text-center text-xs text-stone-400 mt-3 flex items-center justify-center gap-1">
                                    <ShieldCheck className="w-3 h-3" /> Compra segura. Garantía de 15 días.
                                </p>
                            </div>
                            <div className="flex flex-col gap-3 text-stone-600">
                                <div className="flex items-center gap-2"><Check className="w-5 h-5 text-green-500 shrink-0" /> <span>Lectura ágil y directa (sin teología compleja)</span></div>
                                <div className="flex items-center gap-2"><Check className="w-5 h-5 text-green-500 shrink-0" /> <span>Estrategias por edad (0 a 12+ años)</span></div>
                                <div className="flex items-center gap-2"><Check className="w-5 h-5 text-green-500 shrink-0" /> <span>Formato PDF compatible con todos los dispositivos</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* --- AGITATION --- */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6 max-w-3xl text-center">
                    <h2 className="text-3xl font-bold text-stone-900 mb-8">La Trampa del "Dios Policía" 👮‍♂️</h2>
                    <div className="text-lg text-stone-600 text-left space-y-6 leading-relaxed">
                        <p>
                            Muchos crecimos con la frase: <em>"Pórtate bien que el Niño Jesús te está mirando"</em>. Sin querer, convertimos a Dios en un sistema de vigilancia 24/7, un policía cósmico listo para anotar fallos.
                        </p>
                        <p>
                            El problema de esta imagen es que <strong>genera miedo, no amor</strong>. Y el miedo tiene patas cortas. En la adolescencia, el miedo se pierde, y con él, se pierde a ese Dios a medida.
                        </p>
                        <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-r-lg my-8">
                            <p className="font-bold text-red-800 mb-2">¿Te suena esto?</p>
                            <ul className="space-y-2 text-red-700">
                                <li className="flex items-start gap-2"><CloudRain className="w-5 h-5 mt-0.5 shrink-0" /> Intentas que recen y se convierte en una batalla campal.</li>
                                <li className="flex items-start gap-2"><CloudRain className="w-5 h-5 mt-0.5 shrink-0" /> Se aburren en Misa y tú te pasas la hora mandando callar.</li>
                                <li className="flex items-start gap-2"><CloudRain className="w-5 h-5 mt-0.5 shrink-0" /> Tienes miedo de que al crecer, abandonen la fe por completo.</li>
                            </ul>
                        </div>
                        <p className="text-xl font-medium text-stone-800 text-center">
                            Hay otra forma. Una forma basada en el ASOMBRO, no en la OBLIGACIÓN.
                        </p>
                    </div>
                </div>
            </section>

            {/* --- THE SOLUTION (MODULES) --- */}
            <section className="py-24 bg-stone-50">
                <div className="container mx-auto px-6 max-w-5xl">
                    <div className="text-center mb-16">
                        <span className="text-[#E07A5F] font-bold tracking-widest uppercase text-xs">Lo que descubrirás dentro</span>
                        <h2 className="text-3xl md:text-5xl font-bold text-stone-900 mt-2">El Mapa de la Espiritualidad Resiliente</h2>
                    </div>

                    <div className="space-y-8">
                        {/* Module 1 */}
                        <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm hover:shadow-md transition border border-stone-100 flex flex-col md:flex-row gap-8">
                            <div className="md:w-1/3 flex flex-col items-center justify-center bg-[#E07A5F]/5 rounded-xl p-6 text-center">
                                <div className="bg-[#E07A5F]/10 w-16 h-16 rounded-full flex items-center justify-center mb-4 text-[#E07A5F]">
                                    <Sun className="w-8 h-8" />
                                </div>
                                <h3 className="font-bold text-xl text-stone-900">Módulo 1: El Cambio de Mentalidad</h3>
                            </div>
                            <div className="md:w-2/3">
                                <p className="text-stone-600 mb-4">Los cimientos para no derrumbarse.</p>
                                <ul className="space-y-3">
                                    <li className="flex gap-3 text-stone-700"><Check className="w-5 h-5 text-[#E07A5F] shrink-0" /> <span><strong>Dios no es un Policía:</strong> Cómo pasar de la vigilancia a la reparación.</span></li>
                                    <li className="flex gap-3 text-stone-700"><Check className="w-5 h-5 text-[#E07A5F] shrink-0" /> <span><strong>La Fe se contagia:</strong> La regla de oro para proponer sin imponer.</span></li>
                                    <li className="flex gap-3 text-stone-700"><Check className="w-5 h-5 text-[#E07A5F] shrink-0" /> <span><strong>Validar Emociones:</strong> Por qué un "buen cristiano" también se enfada y llora (como Jesús).</span></li>
                                </ul>
                            </div>
                        </div>

                        {/* Module 2 */}
                        <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm hover:shadow-md transition border border-stone-100 flex flex-col md:flex-row gap-8">
                            <div className="md:w-1/3 flex flex-col items-center justify-center bg-[#E07A5F]/5 rounded-xl p-6 text-center">
                                <div className="bg-[#E07A5F]/10 w-16 h-16 rounded-full flex items-center justify-center mb-4 text-[#E07A5F]">
                                    <Star className="w-8 h-8" />
                                </div>
                                <h3 className="font-bold text-xl text-stone-900">Módulo 2: Lo Sagrado en lo Cotidiano (0-7 años)</h3>
                            </div>
                            <div className="md:w-2/3">
                                <p className="text-stone-600 mb-4">La etapa del misterio y la magia.</p>
                                <ul className="space-y-3">
                                    <li className="flex gap-3 text-stone-700"><Check className="w-5 h-5 text-[#E07A5F] shrink-0" /> <span><strong>Micro-Liturgias Domésticas:</strong> La "Bendición Nocturna" y juegos de gratitud en la mesa.</span></li>
                                    <li className="flex gap-3 text-stone-700"><Check className="w-5 h-5 text-[#E07A5F] shrink-0" /> <span><strong>Místicos Naturales:</strong> Cómo usar la naturaleza para explicar a Dios mejor que cualquier catequesis.</span></li>
                                    <li className="flex gap-3 text-stone-700"><Check className="w-5 h-5 text-[#E07A5F] shrink-0" /> <span><strong>Orar con el Cuerpo:</strong> Para niños que no pueden quedarse quietos.</span></li>
                                </ul>
                            </div>
                        </div>

                        {/* Module 3 */}
                        <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm hover:shadow-md transition border border-stone-100 flex flex-col md:flex-row gap-8">
                            <div className="md:w-1/3 flex flex-col items-center justify-center bg-[#E07A5F]/5 rounded-xl p-6 text-center">
                                <div className="bg-[#E07A5F]/10 w-16 h-16 rounded-full flex items-center justify-center mb-4 text-[#E07A5F]">
                                    <Zap className="w-8 h-8" />
                                </div>
                                <h3 className="font-bold text-xl text-stone-900">Módulos 3, 4 y 5: De las Preguntas a la Rebeldía</h3>
                            </div>
                            <div className="md:w-2/3">
                                <p className="text-stone-600 mb-4">Cuando la fe madura (y a veces duele).</p>
                                <ul className="space-y-3">
                                    <li className="flex gap-3 text-stone-700"><Check className="w-5 h-5 text-[#E07A5F] shrink-0" /> <span><strong>La Pregunta del Millón:</strong> "¿Por qué existe el mal?" (Respuestas honestas sin fantasía).</span></li>
                                    <li className="flex gap-3 text-stone-700"><Check className="w-5 h-5 text-[#E07A5F] shrink-0" /> <span><strong>Misa sin Dramas:</strong> Estrategias para sobrevivir al aburrimiento litúrgico.</span></li>
                                    <li className="flex gap-3 text-stone-700"><Check className="w-5 h-5 text-[#E07A5F] shrink-0" /> <span><strong>Adolescencia:</strong> "Conectar antes de corregir" y por qué la duda es necesaria para creer de verdad.</span></li>
                                </ul>
                            </div>
                        </div>

                        {/* BONUS */}
                        <div className="bg-gradient-to-r from-stone-900 to-stone-800 rounded-2xl p-8 md:p-10 shadow-lg text-white flex flex-col md:flex-row gap-8 items-center">
                            <div className="md:w-1/4 flex justify-center">
                                <div className="bg-white/10 w-20 h-20 rounded-full flex items-center justify-center text-yellow-400">
                                    <Heart className="w-10 h-10" />
                                </div>
                            </div>
                            <div className="md:w-3/4">
                                <h3 className="font-bold text-2xl mb-2 text-white">BONUS: El Kit de "Fe en Acción"</h3>
                                <p className="text-stone-300 mb-4">Herramientas prácticas para bajar la fe de la cabeza al corazón.</p>
                                <ul className="space-y-3">
                                    <li className="flex gap-3 text-stone-200"><Star className="w-5 h-5 text-yellow-400 shrink-0" /> <span><strong>El Bote de la Gratitud:</strong> Un ritual semanal para entrenar la mirada positiva en familia.</span></li>
                                    <li className="flex gap-3 text-stone-200"><Star className="w-5 h-5 text-yellow-400 shrink-0" /> <span><strong>Misiones de Voluntariado:</strong> "Operación Despensa" y otras ideas para curar el egoísmo.</span></li>
                                    <li className="flex gap-3 text-stone-200"><Star className="w-5 h-5 text-yellow-400 shrink-0" /> <span><strong>Cinefórum con Valores:</strong> Películas que abren conversaciones profundas sin que se den cuenta.</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- VISION / EMOTIONAL HOOK --- */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6 max-w-4xl text-center">
                    <BookOpen className="w-12 h-12 text-[#E07A5F] mx-auto mb-6 opacity-80" />
                    <blockquote className="text-2xl md:text-3xl font-serif text-stone-800 italic leading-relaxed mb-8">
                        "Lo que les quedará no será una lista de normas morales... será una <span className="text-[#E07A5F] font-bold">memoria celular de la esperanza</span>. La certeza de que, pase lo que pase, son amados infinitamente."
                    </blockquote>
                    <p className="text-stone-500 font-medium">— Del Epílogo de "Educar en la Fe"</p>
                </div>
            </section>
            <div className="py-10 bg-white">
                <AuthorSection />
            </div>

            {/* --- FINAL CTA --- */}
            <section className="py-20 bg-[#E07A5F]">
                <div className="container mx-auto px-6 text-center max-w-4xl">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">El mejor legado que puedes dejarles no es dinero, es un Refugio.</h2>
                    <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-lg mx-auto transform hover:scale-105 transition duration-300">
                        <div className="flex justify-center mb-6">
                            <Image
                                src={product.imageUrl || "/images/educar-en-la-fe-portada.png"}
                                alt="Portada Ebook"
                                width={150}
                                height={200}
                                className="shadow-md rounded-lg rotate-3"
                            />
                        </div>
                        <div className="flex items-center justify-center gap-4 mb-6">
                            <div className="text-stone-400 line-through text-xl font-medium">{product.originalPrice}€</div>
                            <div className="text-[#E07A5F] text-5xl font-bold">{product.price}€</div>
                        </div>
                        <OfferCountdown className="justify-center mb-6 text-[#E07A5F]" />
                        <a href="https://pay.hotmart.com/YOUR_HOTMART_LINK_HERE" className="block w-full bg-[#E07A5F] hover:bg-[#c96348] text-white font-bold text-xl py-4 rounded-xl shadow-lg mb-4">
                            Descargar Ebook Ahora
                        </a>
                        <p className="text-stone-400 text-xs">Pago único. Acceso de por vida. Garantía 100%.</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
