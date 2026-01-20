"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, Star, ShieldCheck, Heart, Zap, Clock, Sun, BookOpen, Loader2, CloudRain, X, ArrowRight, BatteryMedium, Users, Brain } from "lucide-react";
import { joinWaitlist } from "@/actions/waitlist";

interface Product {
    title: string;
    description: string;
    price: number;
    originalPrice: number | null;
    imageUrl: string | null;
    slug: string;
}

export default function EducarFeLanding({ product }: { product: Product }) {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const hotmartLink = "https://pay.hotmart.com/H103988286K?off=rsw6f2ko";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");

        const formData = new FormData();
        formData.append("email", email);
        formData.append("topic", "Educar en la Fe - Preventa");

        try {
            const result = await joinWaitlist(null, formData);
            if (result.success) {
                setStatus("success");
                setEmail("");
            } else {
                setStatus("error");
            }
        } catch (error) {
            setStatus("error");
        }
    };

    return (
        <div className="min-h-screen bg-[#FDFBF7] font-sans text-stone-800">
            {/* --- HERO SECTION --- */}
            <header className="relative pt-10 pb-20 md:pt-16 md:pb-32 overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/pattern-light.png')] opacity-50 z-0"></div>
                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-4xl mx-auto text-center mb-12">
                        <div className="inline-flex items-center gap-2 bg-[#E07A5F]/10 text-[#E07A5F] px-4 py-1.5 rounded-full text-sm font-bold tracking-wide mb-8 animate-pulse border border-[#E07A5F]/20">
                            <Star className="w-4 h-4 fill-current" />
                            <span>LANZAMIENTO PREVIO - PLAZAS LIMITADAS</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-extrabold text-stone-900 mb-6 leading-tight">
                            ¿Te preocupa que tus hijos pierdan el rumbo en un mundo cada vez más <span className="text-[#E07A5F] underline decoration-4 decoration-[#E07A5F]/20">confuso</span>?
                        </h1>
                        <p className="text-xl md:text-2xl text-stone-600 leading-relaxed max-w-2xl mx-auto">
                            La fe no se hereda por inercia, se contagia con vivencia. Descubre cómo convertir la mesa de tu comedor en el púlpito más importante.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
                        <div className="relative order-2 md:order-1">
                            <div className="relative z-10 transform rotate-[-2deg] hover:rotate-0 transition duration-500">
                                <Image
                                    src={product.imageUrl || "/images/educar-en-la-fe-portada.png"}
                                    alt="Portada Ebook Educar en la Fe"
                                    width={600}
                                    height={800}
                                    className="rounded-2xl shadow-2xl border-8 border-white hover:scale-[1.02] transition duration-500"
                                    priority
                                />
                            </div>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#E07A5F]/20 blur-3xl rounded-full -z-10"></div>
                        </div>

                        <div className="order-1 md:order-2 flex flex-col gap-6">
                            <div className="bg-white p-8 rounded-2xl shadow-lg border border-stone-100 relative overflow-hidden">
                                {/* HERO SECTION CTA */}
                                <div className="absolute top-0 right-0 bg-stone-900 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">
                                    -30% DTO
                                </div>

                                <div className="text-center pt-4">
                                    <h3 className="text-2xl font-bold text-stone-900 mb-2">Oferta de Lanzamiento</h3>
                                    <p className="text-stone-600 mb-6 text-sm">Adquiere la guía hoy con un <span className="text-[#E07A5F] font-bold">30% de descuento</span> antes del lanzamiento oficial el 1 de Febrero.</p>

                                    <div className="flex items-end justify-center gap-2 mb-6">
                                        <span className="text-5xl font-bold text-[#E07A5F]">4.90€</span>
                                        <span className="text-xl text-stone-400 line-through mb-1">7.00€</span>
                                    </div>

                                    <a
                                        href={hotmartLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block w-full bg-[#E07A5F] hover:bg-[#c96348] text-white font-bold text-lg py-4 rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1 flex items-center justify-center gap-2"
                                    >
                                        ¡Aprovechar Oferta Ahora! <ArrowRight className="w-5 h-5" />
                                    </a>
                                    <p className="text-xs text-stone-400 mt-4">Oferta válida hasta el 1 de Febrero.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* --- AGITATION: THE CHALLENGE --- */}
            <section className="py-24 bg-white relative overflow-hidden">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="prose prose-lg text-stone-600 mx-auto leading-relaxed mb-16">
                        <p className="lead text-2xl font-serif italic text-stone-800 text-center mb-12">
                            "Ser padres hoy es un desafío titánico."
                        </p>
                        <p>
                            Vivimos rodeados de ruido, pantallas y mensajes contradictorios que compiten por la atención y el corazón de nuestros hijos. Como padre o madre creyente, es normal sentir miedo:
                        </p>
                        <ul className="space-y-4 my-8">
                            <li className="flex gap-4 items-start bg-red-50 p-4 rounded-xl border border-red-100">
                                <CloudRain className="w-6 h-6 text-red-400 shrink-0 mt-1" />
                                <span className="font-medium text-stone-800">"¿Serán capaces de distinguir el bien del mal cuando yo no esté?"</span>
                            </li>
                            <li className="flex gap-4 items-start bg-red-50 p-4 rounded-xl border border-red-100">
                                <CloudRain className="w-6 h-6 text-red-400 shrink-0 mt-1" />
                                <span className="font-medium text-stone-800">"¿Cómo les hablo de Dios sin que suene aburrido o impuesto?"</span>
                            </li>
                            <li className="flex gap-4 items-start bg-red-50 p-4 rounded-xl border border-red-100">
                                <CloudRain className="w-6 h-6 text-red-400 shrink-0 mt-1" />
                                <span className="font-medium text-stone-800">"¿Es suficiente con llevarlos a la iglesia o debería hacer algo más en casa?"</span>
                            </li>
                        </ul>
                        <p className="font-bold text-stone-800 text-center text-xl mt-12">
                            La verdad es que el púlpito más importante no es el de la iglesia, es la mesa de tu comedor.
                        </p>
                    </div>
                </div>
            </section>

            {/* --- PRODUCT REVEAL --- */}
            <section className="py-24 bg-[#E07A5F] text-white">
                <div className="container mx-auto px-6 max-w-5xl text-center">
                    <span className="inline-block border border-white/30 bg-white/10 px-4 py-1 rounded-full text-sm font-bold tracking-widest mb-6 backdrop-blur-sm">
                        PRESENTAMOS
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                        Cómo Educar en la Fe: <br />El legado más importante para tus hijos
                    </h2>
                    <p className="text-xl text-stone-100 max-w-3xl mx-auto font-light leading-relaxed mb-12">
                        Este ebook no es un tratado teológico denso. Es una <strong>caja de herramientas para familias reales</strong>, con horarios apretados, que quieren poner a Dios en el centro de su hogar de forma natural, alegre y auténtica.
                    </p>

                    <div className="grid md:grid-cols-2 gap-6 text-left max-w-4xl mx-auto">
                        <div className="bg-white/10 p-6 rounded-2xl border border-white/20 backdrop-blur-sm hover:bg-white/20 transition">
                            <h4 className="font-bold text-xl mb-2 flex items-center gap-2"><Sun className="w-5 h-5 text-yellow-300" /> La Pedagogía del Ejemplo</h4>
                            <p className="text-sm text-stone-100 opacity-90">Cómo tu vida impacta más que tus sermones (y cómo quitarte la presión de ser "perfecto").</p>
                        </div>
                        <div className="bg-white/10 p-6 rounded-2xl border border-white/20 backdrop-blur-sm hover:bg-white/20 transition">
                            <h4 className="font-bold text-xl mb-2 flex items-center gap-2"><Heart className="w-5 h-5 text-yellow-300" /> Rutinas Espirituales Simples</h4>
                            <p className="text-sm text-stone-100 opacity-90">Ideas creativas para orar, leer la Biblia y reflexionar en familia sin que se sienta como una obligación pesada.</p>
                        </div>
                        <div className="bg-white/10 p-6 rounded-2xl border border-white/20 backdrop-blur-sm hover:bg-white/20 transition">
                            <h4 className="font-bold text-xl mb-2 flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-yellow-300" /> Valores vs. Mundo</h4>
                            <p className="text-sm text-stone-100 opacity-90">Cómo equipar a tus hijos con pensamiento crítico y valores sólidos para enfrentar la presión social.</p>
                        </div>
                        <div className="bg-white/10 p-6 rounded-2xl border border-white/20 backdrop-blur-sm hover:bg-white/20 transition">
                            <h4 className="font-bold text-xl mb-2 flex items-center gap-2"><Brain className="w-5 h-5 text-yellow-300" /> Respuestas a Preguntas Difíciles</h4>
                            <p className="text-sm text-stone-100 opacity-90">Guiones sencillos para cuando tus hijos pregunten "¿Por qué existe el mal?" o "¿Dios me escucha?".</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- BENEFITS: VENTAJAS (HOTMART STYLE) --- */}
            <section className="py-24 bg-stone-50">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-stone-900">¿Por qué este libro es diferente?</h2>
                    </div>

                    <div className="space-y-6">
                        {/* Benefit 1 */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200 flex flex-col sm:flex-row gap-4 items-start">
                            <div className="bg-green-100 p-3 rounded-full shrink-0">
                                <Check className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                                <h4 className="text-lg font-bold text-stone-900 mb-1">Acaba con la improvisación</h4>
                                <p className="text-stone-600">Obtén un plan paso a paso para integrar la fe en la rutina diaria, sin tener que inventar nada.</p>
                            </div>
                        </div>

                        {/* Benefit 2 */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200 flex flex-col sm:flex-row gap-4 items-start">
                            <div className="bg-green-100 p-3 rounded-full shrink-0">
                                <Check className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                                <h4 className="text-lg font-bold text-stone-900 mb-1">Conecta profundamente</h4>
                                <p className="text-stone-600">Fortalece el vínculo emocional con tus hijos a través de conversaciones trascendentes que recordaréis siempre.</p>
                            </div>
                        </div>

                        {/* Benefit 3 */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200 flex flex-col sm:flex-row gap-4 items-start">
                            <div className="bg-green-100 p-3 rounded-full shrink-0">
                                <Check className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                                <h4 className="text-lg font-bold text-stone-900 mb-1">Lenguaje actual</h4>
                                <p className="text-stone-600">Explicaciones claras diseñadas para conectar con la mente de niños y adolescentes de la era digital.</p>
                            </div>
                        </div>

                        {/* Benefit 4 */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200 flex flex-col sm:flex-row gap-4 items-start">
                            <div className="bg-green-100 p-3 rounded-full shrink-0">
                                <Check className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                                <h4 className="text-lg font-bold text-stone-900 mb-1">Flexible y adaptable</h4>
                                <p className="text-stone-600">Funciona tanto si tienes niños pequeños como adolescentes, adaptándose a cada etapa.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- TARGET AUDIENCE --- */}
            <section className="py-24 bg-white border-t border-stone-100">
                <div className="container mx-auto px-6 max-w-4xl text-center">
                    <h2 className="text-3xl font-bold text-stone-900 mb-12">Este libro es para ti si...</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-[#FDFBF7] p-8 rounded-2xl border border-stone-100 hover:border-[#E07A5F]/30 transition">
                            <div className="w-12 h-12 bg-stone-200 rounded-full mx-auto mb-4 flex items-center justify-center font-serif font-bold text-stone-600">1</div>
                            <p className="font-medium text-stone-800">Deseas que tus hijos tengan una relación personal con Dios, no solo una religión heredada.</p>
                        </div>
                        <div className="bg-[#FDFBF7] p-8 rounded-2xl border border-stone-100 hover:border-[#E07A5F]/30 transition">
                            <div className="w-12 h-12 bg-stone-200 rounded-full mx-auto mb-4 flex items-center justify-center font-serif font-bold text-stone-600">2</div>
                            <p className="font-medium text-stone-800">Buscas recursos prácticos para hacer "devocionales" o tiempos en familia divertidos.</p>
                        </div>
                        <div className="bg-[#FDFBF7] p-8 rounded-2xl border border-stone-100 hover:border-[#E07A5F]/30 transition">
                            <div className="w-12 h-12 bg-stone-200 rounded-full mx-auto mb-4 flex items-center justify-center font-serif font-bold text-stone-600">3</div>
                            <p className="font-medium text-stone-800">Quieres dejar un legado que dure por la eternidad.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- FINAL CTA / WAITING LIST --- */}
            <section className="py-20 bg-[#E07A5F]">
                <div className="container mx-auto px-6 text-center max-w-4xl">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">No dejes la educación espiritual al azar.</h2>
                    <p className="text-xl text-stone-100 mb-10 max-w-2xl mx-auto">
                        Empieza hoy a construir los cimientos que sostendrán a tus hijos toda su vida.
                    </p>

                    <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-lg mx-auto transform hover:scale-105 transition duration-300">
                        <h3 className="text-2xl font-bold text-stone-900 mb-2">Asegura tu copia hoy</h3>
                        <p className="text-sm text-stone-500 mb-6">Precio especial de preventa disponible por tiempo limitado.</p>

                        <div className="flex items-center justify-center gap-4 mb-8 bg-stone-50 py-3 rounded-lg">
                            <span className="text-stone-400 line-through text-lg">7.00€</span>
                            <span className="text-4xl font-bold text-[#E07A5F]">4.90€</span>
                        </div>

                        <a
                            href={hotmartLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full bg-[#E07A5F] hover:bg-[#c96348] text-white font-bold text-xl py-4 rounded-xl shadow-lg transition flex items-center justify-center gap-2"
                        >
                            Comprar en Preventa <ArrowRight className="w-5 h-5" />
                        </a>

                        <p className="text-stone-400 text-xs mt-6 flex items-center justify-center gap-1">
                            <ShieldCheck className="w-3 h-3" /> Pago 100% Seguro vía Hotmart
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
