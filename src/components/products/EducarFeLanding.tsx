"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, Star, ShieldCheck, Heart, Zap, Clock, Sun, BookOpen, Loader2, CloudRain, X, ArrowRight, BatteryMedium, Users, Brain, Coffee, HelpCircle, MessageCircle, Home } from "lucide-react";
import { joinWaitlist } from "@/actions/waitlist";
import OfferCountdown from "@/components/ui/OfferCountdown";
import InternalRecommendations from "@/components/products/InternalRecommendations";
import ExternalRecommendations from "@/components/products/ExternalRecommendations";


interface Product {
    title: string;
    description: string;
    price: number;
    originalPrice: number | null;
    imageUrl: string | null;
    slug: string;
}

export default function EducarFeLanding({ product }: { product: Product }) {
    const hotmartLink = "https://pay.hotmart.com/H103988286K?off=rsw6f2ko";

    return (
        <div className="min-h-screen bg-[#FDFBF7] font-sans text-stone-800">
            {/* Back to Home Button */}
            <div className="bg-white border-b border-stone-100">
                <div className="container mx-auto px-6 py-3">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-stone-600 hover:text-[#E07A5F] transition-colors"
                    >
                        <Home className="w-4 h-4" />
                        <span>Volver a Padres con Resiliencia</span>
                    </Link>
                </div>
            </div>

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
                            ¿Tus Hijos <span className="text-[#E07A5F]">Abandonarán la Fe</span> en 5 Años?
                            <span className="block text-2xl md:text-4xl mt-4 text-stone-800 font-bold">
                                El Sistema que 1,847 Familias Usan para Que Ellos <span className="underline decoration-4 decoration-[#E07A5F]/30">ELIJAN Creer</span>
                            </span>
                            <span className="block text-lg md:text-2xl mt-4 text-stone-500 font-normal">
                                (Sin Sermones, Obligaciones ni Dramas)
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-stone-600 leading-relaxed max-w-2xl mx-auto font-medium">
                            El Manual del Padre Cristiano Moderno: <br />
                            <span className="text-stone-500 font-normal">Transmite Fe Real en un Mundo que No Para de Distraerlos.</span>
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
                        <div className="relative order-2 md:order-1">
                            <div className="relative z-10 transform rotate-[-2deg] hover:rotate-0 transition duration-500">
                                <Image
                                    src="/images/educar-fe-cover.png"
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
                                    OFERTA FLASH
                                </div>

                                <div className="text-center pt-4">
                                    <h3 className="text-2xl font-bold text-stone-900 mb-2">Acceso Inmediato</h3>
                                    <p className="text-stone-600 mb-6 text-sm">Precio especial de lanzamiento solo para las primeras copias.</p>

                                    <div className="flex items-end justify-center gap-2 mb-6">
                                        <span className="text-5xl font-bold text-[#E07A5F]">17€</span>
                                        <span className="text-xl text-stone-400 line-through mb-1">97€</span>
                                    </div>

                                    <div className="flex justify-center mb-4">
                                        <OfferCountdown className="text-[#E07A5F] text-base" includeDays={true} cycleDays={3} />
                                    </div>

                                    <a
                                        href={hotmartLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={() => (window as any).fbq && (window as any).fbq('track', 'InitiateCheckout', { content_name: 'Educar en la Fe', value: 17.00, currency: 'EUR' })}
                                        className="block w-full bg-[#E07A5F] hover:bg-[#c96348] text-white font-bold text-lg py-4 rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1 flex items-center justify-center gap-2"
                                    >
                                        Quiero Acceso Ahora <ArrowRight className="w-5 h-5" />
                                    </a>
                                    <p className="text-xs text-stone-400 mt-4">Garantía de devolución de 15 días.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* --- SECTION 1: PAIN (DOLOR) --- */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6 max-w-5xl">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="relative h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl">
                            <Image
                                src="/images/educar-fe-problem.png"
                                alt="Niño aburrido o desconectado"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            <div className="absolute bottom-6 left-6 right-6 text-white font-medium italic">
                                "El 68% de jóvenes católicos abandonan la fe antes de los 23 años."
                            </div>
                        </div>
                        <div className="space-y-6">
                            <h2 className="text-3xl font-bold text-stone-900 leading-tight">
                                ¿Te rompe el corazón ver a tus hijos...
                            </h2>
                            <ul className="space-y-4">
                                <li className="flex gap-4">
                                    <div className="bg-red-100 p-2 rounded-lg h-fit text-red-500 shrink-0"><X className="w-5 h-5" /></div>
                                    <p className="text-lg text-stone-700">Poner los ojos en blanco cuando mencionas "Misa" o rezar.</p>
                                </li>
                                <li className="flex gap-4">
                                    <div className="bg-red-100 p-2 rounded-lg h-fit text-red-500 shrink-0"><X className="w-5 h-5" /></div>
                                    <p className="text-lg text-stone-700">Decir que Dios es "aburrido" o "cosa de gente mayor".</p>
                                </li>
                                <li className="flex gap-4">
                                    <div className="bg-red-100 p-2 rounded-lg h-fit text-red-500 shrink-0"><X className="w-5 h-5" /></div>
                                    <p className="text-lg text-stone-700">Preferir YouTube o TikTok antes que 5 minutos de oración.</p>
                                </li>
                                <li className="flex gap-4">
                                    <div className="bg-red-100 p-2 rounded-lg h-fit text-red-500 shrink-0"><X className="w-5 h-5" /></div>
                                    <p className="text-lg text-stone-700">Hacer la Primera Comunión solo "porque toca" (y por los regalos).</p>
                                </li>
                            </ul>
                            <div className="bg-stone-50 p-6 rounded-xl border-l-4 border-[#E07A5F] mt-6">
                                <h4 className="font-bold text-stone-900 mb-2">No estás solo/a.</h4>
                                <p className="text-stone-600">
                                    No se van porque sean rebeldes. Se van porque a menudo nunca la <strong>VIVIERON</strong> realmente en casa.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- SECTION 2: AGITATION (AGITACIÓN) --- */}
            <section className="py-20 bg-stone-900 text-stone-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
                    <Image src="/images/pattern-light.png" alt="pattern" fill className="object-cover mix-blend-overlay" />
                </div>
                <div className="container mx-auto px-6 max-w-4xl text-center relative z-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Y aquí está lo que nadie te dice:</h2>
                    <p className="text-xl mb-12 max-w-2xl mx-auto">
                        La catequesis de 1 hora semanal <strong>NO puede competir</strong> con:
                    </p>

                    <div className="grid md:grid-cols-3 gap-6 mb-16">
                        <div className="bg-white/10 p-6 rounded-xl border border-white/10 backdrop-blur-sm">
                            <div className="text-4xl font-bold text-[#E07A5F] mb-2">40h</div>
                            <p className="text-white font-medium">De colegio secular a la semana</p>
                        </div>
                        <div className="bg-white/10 p-6 rounded-xl border border-white/10 backdrop-blur-sm">
                            <div className="text-4xl font-bold text-[#E07A5F] mb-2">35h</div>
                            <p className="text-white font-medium">De pantallas y redes sociales</p>
                        </div>
                        <div className="bg-white/10 p-6 rounded-xl border border-white/10 backdrop-blur-sm">
                            <div className="text-4xl font-bold text-[#E07A5F] mb-2">∞</div>
                            <p className="text-white font-medium">Amigos que se burlan de la fe</p>
                        </div>
                    </div>

                    <div className="bg-red-500/10 border border-red-500/30 p-8 rounded-2xl max-w-3xl mx-auto">
                        <p className="text-lg md:text-xl leading-relaxed text-red-200">
                            Si la fe es solo una "obligación de domingo", la verán como un castigo, no como un regalo.
                            <br /><br />
                            <span className="text-white font-bold">Y cuando cumplan 18, te dirán: "Respeto tu fe, papá/mamá, pero no es para mí."</span>
                        </p>
                    </div>
                </div>
            </section>

            {/* --- SECTION 3: SOLUTION (SOLUCIÓN) --- */}
            <section className="py-24 bg-[#FDFBF7]">
                <div className="container mx-auto px-6 max-w-5xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-stone-900 mb-6">¿Y si existiera un sistema diferente?</h2>
                        <p className="text-xl text-stone-600 max-w-3xl mx-auto">
                            Presentamos: <span className="text-[#E07A5F] font-bold">EDUCAR EN LA FE</span>. El método probado por 1,847 familias para transmitir una fe viva.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
                        <div className="order-2 md:order-1 space-y-6">
                            <div className="flex gap-4">
                                <div className="bg-green-100 p-3 rounded-full h-fit text-green-600"><Check className="w-6 h-6" /></div>
                                <div>
                                    <h4 className="text-xl font-bold text-stone-900">Convierte lo cotidiano en sagrado</h4>
                                    <p className="text-stone-600">Transforma conversaciones de cena en semillas de fe, sin forzar.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="bg-green-100 p-3 rounded-full h-fit text-green-600"><Check className="w-6 h-6" /></div>
                                <div>
                                    <h4 className="text-xl font-bold text-stone-900">Funciona con tu agenda real</h4>
                                    <p className="text-stone-600">No requiere horas extra. Se integra en tu rutina actual.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="bg-green-100 p-3 rounded-full h-fit text-green-600"><Check className="w-6 h-6" /></div>
                                <div>
                                    <h4 className="text-xl font-bold text-stone-900">Ellos pedirán rezar</h4>
                                    <p className="text-stone-600">Sí, has leído bien. Rituales tan bonitos que ellos mismos los reclaman.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="bg-green-100 p-3 rounded-full h-fit text-green-600"><Check className="w-6 h-6" /></div>
                                <div>
                                    <h4 className="text-xl font-bold text-stone-900">Respuestas a las preguntas difíciles</h4>
                                    <p className="text-stone-600">Los 20 temas "incómodos" explicados para que los entiendan y acepten.</p>
                                </div>
                            </div>
                        </div>
                        <div className="order-1 md:order-2 relative h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white transform rotate-2">
                            <Image
                                src="/images/educar-fe-dream.png"
                                alt="Familia feliz conectando"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>


            {/* --- SECTION 4: TANGIBLE BENEFITS (BENEFICIOS) --- */}
            <section className="py-20 bg-white border-y border-stone-100">
                <div className="container mx-auto px-6 max-w-6xl">
                    <h2 className="text-3xl font-bold text-center text-stone-900 mb-16">Lo que lograrás al aplicar este sistema</h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Benefit 1 */}
                        <div className="bg-stone-50 p-8 rounded-2xl border border-stone-100 hover:shadow-lg transition group">
                            <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center text-[#E07A5F] mb-6 group-hover:scale-110 transition"><Heart className="w-8 h-8" /></div>
                            <h3 className="text-xl font-bold text-stone-900 mb-3">Rituales que AMAN</h3>
                            <p className="text-stone-600">
                                Olvida las peleas para ir a rezar. Implementarás el "Rincón de la Paz" y el "Bote de Gratitud" que tus hijos pedirán usar cada noche.
                            </p>
                        </div>

                        {/* Benefit 2 */}
                        <div className="bg-stone-50 p-8 rounded-2xl border border-stone-100 hover:shadow-lg transition group">
                            <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center text-[#E07A5F] mb-6 group-hover:scale-110 transition"><MessageCircle className="w-8 h-8" /></div>
                            <h3 className="text-xl font-bold text-stone-900 mb-3">Cero Sermones</h3>
                            <p className="text-stone-600">
                                Aprenderás a tener conversaciones naturales sobre Dios. Sin tonos de "deberías", sino compartiendo desde el corazón y la curiosidad.
                            </p>
                        </div>

                        {/* Benefit 3 */}
                        <div className="bg-stone-50 p-8 rounded-2xl border border-stone-100 hover:shadow-lg transition group">
                            <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center text-[#E07A5F] mb-6 group-hover:scale-110 transition"><ShieldCheck className="w-8 h-8" /></div>
                            <h3 className="text-xl font-bold text-stone-900 mb-3">Adolescentes con Criterio</h3>
                            <p className="text-stone-600">
                                Cuando sus amigos se burlen, ellos sabrán por qué creen. Tendrán una identidad sólida que no se rompe con la presión social.
                            </p>
                        </div>

                        {/* Benefit 4 */}
                        <div className="bg-stone-50 p-8 rounded-2xl border border-stone-100 hover:shadow-lg transition group">
                            <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center text-[#E07A5F] mb-6 group-hover:scale-110 transition"><Clock className="w-8 h-8" /></div>
                            <h3 className="text-xl font-bold text-stone-900 mb-3">Plan Día a Día</h3>
                            <p className="text-stone-600">
                                No más improvisar. Sabrás exactamente qué decir y hacer en cada etapa, desde los 0 hasta los 18 años.
                            </p>
                        </div>

                        {/* Benefit 5 */}
                        <div className="bg-stone-50 p-8 rounded-2xl border border-stone-100 hover:shadow-lg transition group">
                            <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center text-[#E07A5F] mb-6 group-hover:scale-110 transition"><Brain className="w-8 h-8" /></div>
                            <h3 className="text-xl font-bold text-stone-900 mb-3">Respuestas Honestas</h3>
                            <p className="text-stone-600">
                                "¿Por qué existe el mal?" "¿El cielo es real?" Guiones listos para usar ante las preguntas que más temes.
                            </p>
                        </div>

                        {/* Benefit 6 */}
                        <div className="bg-stone-50 p-8 rounded-2xl border border-stone-100 hover:shadow-lg transition group">
                            <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center text-[#E07A5F] mb-6 group-hover:scale-110 transition"><Users className="w-8 h-8" /></div>
                            <h3 className="text-xl font-bold text-stone-900 mb-3">Unidad Familiar</h3>
                            <p className="text-stone-600">
                                La fe dejará de ser causa de tensión para convertirse en el pegamento más fuerte de vuestro hogar.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- SECTION 5: SOCIAL PROOF (TESTIMONIO) --- */}
            <section className="py-24 bg-[#E07A5F]">
                <div className="container mx-auto px-6 max-w-4xl text-center">
                    <Star className="w-12 h-12 text-white/80 mx-auto mb-6" fill="currentColor" />
                    <blockquote className="text-2xl md:text-4xl font-serif text-white leading-relaxed italic mb-8">
                        "Mi hija de 9 años me pidió rezar juntas antes de dormir. Llevamos 2 semanas y no quiere saltarse ni un día. Esto es real."
                    </blockquote>
                    <div className="flex items-center justify-center gap-4">
                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-white font-bold text-xl">ML</div>
                        <div className="text-left">
                            <cite className="block text-white font-bold not-italic text-lg">María L.</cite>
                            <span className="text-stone-200">Mamá de 3 hijos</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- SECTION 6: OFFER & GUARANTEE --- */}
            <section className="py-24 bg-[#FDFBF7]" id="offer">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-stone-100 relative overflow-hidden">
                        <div className="absolute top-0 inset-x-0 h-2 bg-[#E07A5F]"></div>

                        <div className="text-center mb-10">
                            <span className="bg-red-100 text-red-600 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide">Oferta por Tiempo Limitado</span>
                            <h2 className="text-4xl md:text-5xl font-bold text-stone-900 mt-6 mb-4">Acceso Inmediato al Sistema Completo</h2>
                            <p className="text-stone-500 text-lg">Todo lo que necesitas para transformar la vida espiritual de tu familia.</p>
                        </div>

                        <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-12">
                            <div className="text-center">
                                <p className="text-stone-400 font-medium line-through text-2xl mb-1">97€</p>
                                <p className="text-6xl font-bold text-[#E07A5F]">17€</p>
                                <p className="text-stone-400 text-sm mt-2">Precio sube en 48 horas</p>
                            </div>
                            <div className="h-16 w-px bg-stone-200 hidden md:block"></div>
                            <div className="text-left space-y-2">
                                <div className="flex items-center gap-2 text-stone-700"><Check className="text-green-500 w-5 h-5" /> <span>Ebook Completo (PDF)</span></div>
                                <div className="flex items-center gap-2 text-stone-700"><Check className="text-green-500 w-5 h-5" /> <span>Audio-guía complementaria</span></div>
                                <div className="flex items-center gap-2 text-stone-700"><Check className="text-green-500 w-5 h-5" /> <span>Plan de Acción 0-18 años</span></div>
                                <div className="flex items-center gap-2 text-stone-700"><Check className="text-green-500 w-5 h-5" /> <span>Acceso de por vida</span></div>
                            </div>
                        </div>

                        <div className="max-w-md mx-auto">
                            <a
                                href={hotmartLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => (window as any).fbq && (window as any).fbq('track', 'InitiateCheckout', { content_name: 'Educar en la Fe', value: 17.00, currency: 'EUR' })}
                                className="block w-full bg-[#E07A5F] hover:bg-[#c96348] text-white font-bold text-2xl py-5 rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1 text-center mb-6"
                            >
                                Quiero Acceso Ahora
                            </a>

                            <div className="bg-stone-50 p-4 rounded-xl text-center border border-stone-100 flex items-center justify-center gap-3">
                                <ShieldCheck className="w-6 h-6 text-[#E07A5F]" />
                                <div className="text-left">
                                    <p className="font-bold text-stone-900 text-sm">Garantía de 15 Días</p>
                                    <p className="text-xs text-stone-500">Si no ves cambios positivos, te devolvemos el dinero. Sin dramas.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- SECTION 7: FAQ --- */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6 max-w-3xl">
                    <h2 className="text-3xl font-bold text-center text-stone-900 mb-12">Preguntas Frecuentes</h2>

                    <div className="space-y-6">
                        <div className="bg-[#FDFBF7] p-6 rounded-xl border border-stone-100">
                            <h4 className="font-bold text-stone-900 flex items-center gap-3 mb-3"><HelpCircle className="w-5 h-5 text-[#E07A5F]" /> "¿Funciona con adolescentes rebeldes?"</h4>
                            <p className="text-stone-600 ml-8">Sí. Hay un módulo completo dedicado a la etapa 12-18 años. Aprenderás a "re-conectar" antes de corregir y cómo plantear la fe desde la libertad, que es lo que ellos más valoran.</p>
                        </div>

                        <div className="bg-[#FDFBF7] p-6 rounded-xl border border-stone-100">
                            <h4 className="font-bold text-stone-900 flex items-center gap-3 mb-3"><HelpCircle className="w-5 h-5 text-[#E07A5F]" /> "No tengo tiempo extra, ¿podré hacerlo?"</h4>
                            <p className="text-stone-600 ml-8">Absolutamente. El sistema se basa en "micro-rituales" de 5-10 minutos que se integran en lo que YA haces (la cena, el trayecto al colegio, la hora de dormir). No es añadir tareas, es transformar momentos.</p>
                        </div>

                        <div className="bg-[#FDFBF7] p-6 rounded-xl border border-stone-100">
                            <h4 className="font-bold text-stone-900 flex items-center gap-3 mb-3"><HelpCircle className="w-5 h-5 text-[#E07A5F]" /> "¿Qué pasa si lo compro y no me sirve?"</h4>
                            <p className="text-stone-600 ml-8">Envías un email y te devolvemos el 100% de tu dinero. Tienes 15 días para probarlo. Queremos que estés feliz con la compra, sin riesgo para ti.</p>
                        </div>

                        <div className="bg-[#FDFBF7] p-6 rounded-xl border border-stone-100">
                            <h4 className="font-bold text-stone-900 flex items-center gap-3 mb-3"><HelpCircle className="w-5 h-5 text-[#E07A5F]" /> "¿Es formato físico o digital?"</h4>
                            <p className="text-stone-600 ml-8">Es un producto 100% digital. Recibirás el acceso a tu email inmediatamente después de la compra. Podrás leerlo en móvil, tablet, ordenador o imprimirlo si prefieres.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Internal Recommendations */}
            <InternalRecommendations currentProductSlug="educar-fe" />

            {/* External Recommendations */}
            <ExternalRecommendations />
        </div>
    );
}
