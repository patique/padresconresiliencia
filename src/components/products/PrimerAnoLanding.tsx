"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, Star, ShieldCheck, Heart, Zap, Clock, Sun, BookOpen, BatteryMedium, Coffee, Users, Brain, ArrowRight, Loader2 } from "lucide-react";
import OfferCountdown from "@/components/ui/OfferCountdown";
import { joinWaitlist } from "@/actions/waitlist";

// Importing images directly to ensure they load correctly
import portadaImg from "@/assets/images/primer-ano-portada.png";
import caosImg from "@/assets/images/primer-ano-caos.png";
import conexionImg from "@/assets/images/primer-ano-conexion.png";
import herramientasImg from "@/assets/images/primer-ano-herramientas.png";
import educarFeImg from "@/assets/images/educar-en-la-fe-portada.png";
import maximoImg from "@/assets/images/maximo-con-libro.png";

interface Product {
    title: string;
    description: string;
    price: number;
    originalPrice: number | null;
    imageUrl: string | null;
    slug: string;
}

export default function PrimerAnoLanding({ product }: { product: Product }) {
    const hotmartLink = "https://pay.hotmart.com/D103873545U"; // DO NOT CHANGE THIS LINK
    const [waitlistEmail, setWaitlistEmail] = useState("");
    const [waitlistStatus, setWaitlistStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleWaitlistSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setWaitlistStatus("loading");

        const formData = new FormData();
        formData.append("email", waitlistEmail);
        formData.append("topic", "Educar en la Fe (desde Primer Año Landing)");

        try {
            const result = await joinWaitlist(null, formData);
            if (result.success) {
                setWaitlistStatus("success");
                setWaitlistEmail("");
            } else {
                setWaitlistStatus("error");
            }
        } catch (error) {
            setWaitlistStatus("error");
        }
    };

    return (
        <div className="min-h-screen bg-[#FDFBF7] font-sans text-stone-800">
            {/* --- HERO SECTION --- */}
            <header className="relative pt-10 pb-20 md:pt-16 md:pb-32 overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/pattern-light.png')] opacity-50 z-0"></div>
                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-4xl mx-auto text-center mb-12">
                        <div className="inline-flex items-center gap-2 bg-[#E07A5F]/10 text-[#E07A5F] px-4 py-1.5 rounded-full text-sm font-bold tracking-wide mb-8">
                            <Star className="w-4 h-4 fill-current" />
                            <span>GUÍA PRÁCTICA DE SUPERVIVENCIA EMOCIONAL</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-stone-900 mb-6 leading-tight">
                            ¿Sobrevivir al Primer Año o <span className="text-[#E07A5F] underline decoration-4 decoration-[#E07A5F]/20">Disfrutarlo</span>?
                        </h1>
                        <p className="text-xl md:text-2xl text-stone-600 leading-relaxed max-w-2xl mx-auto">
                            No es solo cansancio, es transformación. Recupera tu sueño, tu pareja y tu identidad mientras crías con apego seguro.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
                        <div className="relative order-2 md:order-1">
                            <div className="relative z-10 transform rotate-[-2deg] hover:rotate-0 transition duration-500">
                                <Image
                                    src={portadaImg}
                                    alt="Portada Ebook Primer Año"
                                    className="rounded-2xl shadow-2xl border-8 border-white hover:scale-[1.02] transition duration-500 w-full h-auto"
                                    priority
                                    placeholder="blur"
                                />
                            </div>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#E07A5F]/20 blur-3xl rounded-full -z-10"></div>
                        </div>

                        <div className="order-1 md:order-2 flex flex-col gap-6">
                            <div className="bg-white p-8 rounded-2xl shadow-lg border border-stone-100 relative overflow-hidden">
                                <div className="absolute top-0 right-0 bg-[#E07A5F] text-white text-xs font-bold px-3 py-1 rounded-bl-xl">
                                    OFERTA ESPECIAL
                                </div>

                                <h3 className="text-2xl font-bold text-stone-900 mb-2">Edición Digital Completa</h3>
                                <p className="text-stone-500 mb-6 text-sm">Acceso inmediato • PDF High Quality • Bonus Incluidos</p>

                                <div className="flex items-baseline gap-4 mb-6">
                                    <span className="text-5xl font-bold text-[#E07A5F]">{product.price} US$</span>
                                    {product.originalPrice && (
                                        <span className="text-xl text-stone-400 line-through">{product.originalPrice} US$</span>
                                    )}
                                </div>

                                <OfferCountdown targetDate="2026-01-18T23:59:59" />

                                <a
                                    href={hotmartLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block w-full text-center bg-[#E07A5F] hover:bg-[#c96348] text-white font-bold text-xl py-5 px-10 rounded-full shadow-xl hover:shadow-2xl transition transform hover:-translate-y-1 mb-4"
                                >
                                    ¡Lo quiero ahora!
                                </a>

                                <p className="text-center text-xs text-stone-400 flex items-center justify-center gap-1">
                                    <ShieldCheck className="w-3 h-3" /> Garantía de devolución de 15 días
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* --- AGITATION: THE NIGHTMARE --- */}
            <section className="py-24 bg-white relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-[#FDFBF7] to-white z-10"></div>
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="text-center mb-16">
                        <span className="text-stone-400 font-bold tracking-widest uppercase text-xs mb-2 block">La Realidad Silenciosa</span>
                        <h2 className="text-3xl md:text-5xl font-extrabold text-stone-900 leading-tight">
                            El Lado B de la Maternidad (del que nadie habla en Instagram)
                        </h2>
                    </div>

                    <div className="prose prose-lg text-stone-600 mx-auto leading-relaxed mb-16">
                        <p>
                            Te preparaste para el parto, pintaste la habitación y compraste el carrito más seguro. Pero nadie te preparó para el <strong>tsunami emocional</strong> que venía después.
                        </p>
                        <ul className="list-none space-y-4 pl-0 mt-8 mb-8">
                            <li className="flex gap-4 items-start">
                                <BatteryMedium className="w-6 h-6 text-red-400 shrink-0 mt-1" />
                                <span><strong>Agotamiento crónico:</strong> Los padres pierden una media de 750 horas de sueño el primer año. Es como vivir con jet lag permanente.</span>
                            </li>
                            <li className="flex gap-4 items-start">
                                <Users className="w-6 h-6 text-red-400 shrink-0 mt-1" />
                                <span><strong>Crisis de Pareja:</strong> El 67% de las parejas reportan una caída drástica en su satisfacción relacional tras el primer hijo. De amantes a "compañeros de logística".</span>
                            </li>
                            <li className="flex gap-4 items-start">
                                <Brain className="w-6 h-6 text-red-400 shrink-0 mt-1" />
                                <span><strong>La Culpa y el "Baby Blues":</strong> Sentir que no eres suficiente, que deberías estar más feliz, o llorar sin saber por qué.</span>
                            </li>
                        </ul>
                        <p className="font-bold text-stone-800 text-center text-xl">
                            ¿Te suena? No estás fallando. Solo te faltan las herramientas.
                        </p>
                    </div>

                    <div className="relative h-96 w-full rounded-2xl overflow-hidden shadow-2xl group">
                        <Image
                            src={caosImg}
                            alt="Caos y cansancio parental"
                            fill
                            className="object-cover transition duration-700 group-hover:scale-105"
                            placeholder="blur"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 to-transparent flex items-end p-8">
                            <p className="text-white text-lg font-medium">"Amamos a nuestro bebé, pero sentimos que estamos perdiendo nuestra vida."</p>
                        </div>
                    </div>

                    {/* CTA AFTER AGITATION */}
                    <div className="flex flex-col items-center mt-12">
                        <a
                            href={hotmartLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#E07A5F] hover:bg-[#c96348] text-white font-bold text-xl py-5 px-10 rounded-full shadow-xl hover:shadow-2xl transition transform hover:-translate-y-1 flex items-center gap-2"
                        >
                            Quiero dejar de sobrevivir y empezar a disfrutar <Check className="w-5 h-5" />
                        </a>
                        <p className="mt-3 text-sm text-stone-400 font-medium">Oferta limitada: Solo {product.price} US$</p>
                    </div>
                </div>
            </section>

            {/* --- DREAM STATE --- */}
            <section className="py-24 bg-[#E07A5F] text-white overflow-hidden relative">
                <div className="absolute inset-0 bg-[url('/images/pattern-light.png')] opacity-10 mix-blend-overlay"></div>

                <div className="container mx-auto px-6 max-w-5xl relative z-10">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="relative order-2 md:order-1 h-[450px] w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 transform hover:rotate-1 transition duration-500">
                            <Image
                                src={conexionImg}
                                alt="Conexión padre e hijo"
                                fill
                                className="object-cover"
                                placeholder="blur"
                            />
                        </div>
                        <div className="space-y-8 order-1 md:order-2">
                            <h2 className="text-3xl md:text-5xl font-bold mb-6">Imagina criar desde la Calma, no desde el Caos.</h2>

                            <div className="flex gap-4">
                                <div className="bg-white/20 p-3 rounded-full h-fit"><Coffee className="w-6 h-6 text-yellow-300" /></div>
                                <div>
                                    <h4 className="text-xl font-bold mb-2">Tu propio oxígeno</h4>
                                    <p className="text-stone-100 opacity-90">
                                        Aprender a tomar "micro-descansos" sin culpa. Porque para cuidar, primero tienes que cuidarte.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="bg-white/20 p-3 rounded-full h-fit"><Heart className="w-6 h-6 text-yellow-300" /></div>
                                <div>
                                    <h4 className="text-xl font-bold mb-2">Conexión Real</h4>
                                    <p className="text-stone-100 opacity-90">
                                        Mirar a tu bebé y sentir paz, no ansiedad. Entender sus señales y saber que "eres suficiente".
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="bg-white/20 p-3 rounded-full h-fit"><Users className="w-6 h-6 text-yellow-300" /></div>
                                <div>
                                    <h4 className="text-xl font-bold mb-2">Equipo Indestructible</h4>
                                    <p className="text-stone-100 opacity-90">
                                        Recuperar la complicidad con tu pareja. Negociar turnos sin peleas y volver a ser "nosotros".
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CTA AFTER DREAM */}
                    <div className="flex justify-center mt-12">
                        <a
                            href={hotmartLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white text-[#E07A5F] hover:bg-stone-50 font-bold text-xl py-5 px-10 rounded-full shadow-xl hover:shadow-2xl transition transform hover:-translate-y-1"
                        >
                            Quiero esta calma para mi familia
                        </a>
                    </div>
                </div>
            </section>

            {/* --- THE SOLUTION (MODULES MAP) --- */}
            <section className="py-24 bg-stone-50">
                <div className="container mx-auto px-6 max-w-5xl">
                    <div className="text-center mb-16">
                        <span className="text-[#E07A5F] font-bold tracking-widest uppercase text-xs">Lo que incluye la guía</span>
                        <h2 className="text-3xl md:text-5xl font-bold text-stone-900 mt-2">Tu Hoja de Ruta para el Primer Año</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Card 1 */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100 hover:shadow-md transition">
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-4"><Brain className="w-6 h-6" /></div>
                            <h3 className="text-xl font-bold mb-3">1. La Realidad Emocional</h3>
                            <p className="text-stone-600 text-sm leading-relaxed">Entender qué le pasa a tu cerebro y hormonas. Diferenciar "Baby Blues" de Depresión Posparto y cómo manejar la culpa irracional.</p>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100 hover:shadow-md transition">
                            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 mb-4"><Clock className="w-6 h-6" /></div>
                            <h3 className="text-xl font-bold mb-3">2. Estrategias de Sueño Reales</h3>
                            <p className="text-stone-600 text-sm leading-relaxed">Nada de "duerme cuando el bebé duerma". Tácticas de turnos, higiene del sueño y descanso fragmentado para no colapsar.</p>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100 hover:shadow-md transition">
                            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center text-red-600 mb-4"><Heart className="w-6 h-6" /></div>
                            <h3 className="text-xl font-bold mb-3">3. Cuidar la Pareja</h3>
                            <p className="text-stone-600 text-sm leading-relaxed">Cómo evitar que el cansancio destruya la relación. Comunicación en "modo zombi" y rituales de conexión de 5 minutos.</p>
                        </div>

                        {/* Card 4 */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100 hover:shadow-md transition">
                            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600 mb-4"><ShieldCheck className="w-6 h-6" /></div>
                            <h3 className="text-xl font-bold mb-3">4. El Arte de Pedir Ayuda</h3>
                            <p className="text-stone-600 text-sm leading-relaxed">Romper el mito del superhéroe. Cómo construir tu tribu y delegar sin sentirte como un fracaso.</p>
                        </div>
                    </div>

                    {/* BONUS KIT */}
                    <div className="mt-12 bg-white border-2 border-[#E07A5F]/20 rounded-3xl p-8 md:p-12 text-stone-800 relative overflow-hidden shadow-xl">
                        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-[#E07A5F] rounded-full blur-3xl opacity-10"></div>
                        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
                            <div className="md:w-2/3">
                                <div className="inline-block bg-[#E07A5F] text-white text-xs font-bold px-3 py-1 rounded-full mb-4">BONUS EXCLUSIVO</div>
                                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-stone-900">Kit de Emergencia Emocional 🚑</h3>
                                <p className="text-stone-600 mb-6">Herramientas para usar YA, cuando sientes que vas a explotar.</p>
                                <ul className="space-y-3">
                                    <li className="flex items-center gap-3"><Check className="text-green-500 w-5 h-5" /> <span>Técnica de Respiración 4-7-8 (Calma en 60 seg)</span></li>
                                    <li className="flex items-center gap-3"><Check className="text-green-500 w-5 h-5" /> <span>Grounding 5-4-3-2-1 para ataques de ansiedad</span></li>
                                    <li className="flex items-center gap-3"><Check className="text-green-500 w-5 h-5" /> <span>Checklist de Autoevaluación Semanal</span></li>
                                </ul>
                            </div>
                            <div className="md:w-1/3 h-48 w-full rounded-xl overflow-hidden shadow-lg border border-stone-100 relative">
                                <Image
                                    src={herramientasImg}
                                    alt="Kit herramientas calma"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </div>

                    {/* SECONDARY CTA IN SOLUTION */}
                    <div className="container mx-auto px-6 max-w-5xl pt-12 pb-4 text-center">
                        <a href={hotmartLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-stone-100 hover:bg-stone-200 text-stone-600 font-bold py-3 px-6 rounded-lg transition">
                            Prefiero ir directo al pago <ArrowRight className="w-4 h-4" />
                        </a>
                    </div>
                </div>
            </section>

            {/* --- AUTHOR SECTION --- */}
            <section className="py-20 bg-[#FDFBF7] overflow-hidden">
                <div className="container mx-auto px-6 max-w-5xl">
                    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-stone-100 flex flex-col md:flex-row items-center gap-12 relative">
                        <div className="relative shrink-0 w-64 h-64 md:w-80 md:h-80 transform rotate-[-2deg] hover:rotate-0 transition duration-500">
                            <Image
                                src={maximoImg}
                                alt="Máximo con su libro"
                                className="rounded-2xl shadow-lg border-4 border-white object-cover"
                                fill
                            />
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <h2 className="text-3xl font-bold text-stone-900 mb-6">Hola, soy Máximo</h2>
                            <p className="text-lg text-stone-600 mb-6 leading-relaxed">
                                Entiendo perfectamente por lo que estás pasando porque yo también estuve ahí. Mi propósito con <strong>Padres con Resiliencia</strong> es acompañarte en este viaje, aportando claridad donde hay dudas y herramientas prácticas donde hay agotamiento.
                            </p>
                            <div className="bg-stone-50 rounded-xl p-6 border-l-4 border-[#E07A5F]">
                                <p className="text-stone-500 italic font-medium">
                                    "Mi misión es que cada padre y madre recupere la confianza en sí mismo para disfrutar de la etapa más importante de sus vidas."
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- FINAL CTA --- */}
            <section className="py-20 bg-white border-t border-stone-100">
                <div className="container mx-auto px-6 text-center max-w-3xl">
                    <h2 className="text-3xl md:text-5xl font-bold text-stone-900 mb-6">Tu bebé te necesita bien.</h2>
                    <p className="text-xl text-stone-600 mb-10 leading-relaxed">
                        No tienes que hacerlo solo/a. Invierte en tu bienestar y dale a tu hijo el mejor regalo posible: unos padres felices y presentes.
                    </p>

                    <div className="flex items-baseline justify-center gap-4 mb-8">
                        <span className="text-5xl font-bold text-[#E07A5F]">{product.price} US$</span>
                        {product.originalPrice && (
                            <span className="text-xl text-stone-400 line-through">{product.originalPrice} US$</span>
                        )}
                    </div>


                    <a
                        href={hotmartLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 bg-[#E07A5F] hover:bg-[#c96348] text-white font-bold text-xl py-5 px-10 rounded-full shadow-xl hover:shadow-2xl transition transform hover:-translate-y-1"
                    >
                        <span>Descargar la Guía Ahora</span>
                        <BookOpen className="w-6 h-6" />
                    </a>
                    <p className="mt-6 text-sm text-stone-400">Descarga inmediata • Lectura compatible con móvil</p>
                </div>
            </section>

            {/* --- CROSS-SELL WAITLIST: EDUCAR EN LA FE --- */}
            <section className="py-24 bg-stone-100 border-t border-stone-200 overflow-hidden">
                <div className="container mx-auto px-6 max-w-5xl">

                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 bg-[#E07A5F] text-white px-6 py-2 rounded-full text-xs md:text-sm font-bold tracking-widest shadow-[0_0_20px_rgba(224,122,95,0.6)] animate-pulse border border-white/20">
                            <Star className="w-4 h-4 fill-current" />
                            <span>PRÓXIMAMENTE - NUEVO LANZAMIENTO</span>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        {/* Column 1: Image */}
                        <div className="relative flex justify-center md:justify-end">
                            <div className="relative w-64 md:w-80 transform rotate-[-3deg] hover:rotate-0 transition duration-700 hover:scale-105 z-10">
                                <Image
                                    src={educarFeImg}
                                    alt="Portada Educar en la Fe"
                                    className="rounded-xl shadow-2xl border-4 border-white"
                                    placeholder="blur"
                                />
                            </div>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#E07A5F]/20 blur-3xl rounded-full -z-0"></div>
                        </div>

                        {/* Column 2: Content */}
                        <div className="text-left">
                            <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-4 leading-tight">
                                ¿Te interesa también <span className="text-[#E07A5F] underline decoration-[#E07A5F]/30">Educar en la Fe</span>?
                            </h2>
                            <p className="text-lg text-stone-600 mb-6 leading-relaxed">
                                Estamos escribiendo la guía definitiva para dejar de ser el "policía de Dios" y convertir la fe en un refugio de asombro para tus hijos. <br /><span className="font-bold text-stone-800">Sin obligaciones, solo conexión.</span>
                            </p>

                            <Link href="/products/educar-en-la-fe" className="inline-block bg-white text-[#E07A5F] border-2 border-[#E07A5F] font-bold py-3 px-8 rounded-full hover:bg-[#E07A5F] hover:text-white transition mb-8 shadow-sm hover:shadow-md">
                                Descubre el Método Completo →
                            </Link>

                            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-stone-200">
                                <h4 className="font-bold text-stone-900 mb-2 flex items-center gap-2"><Clock className="w-4 h-4 text-[#E07A5F]" /> Lista de Espera Prioritaria</h4>
                                <p className="text-sm text-stone-500 mb-4">Apúntate para recibir el aviso de lanzamiento y un descuento exclusivo.</p>

                                {waitlistStatus === "success" ? (
                                    <div className="text-center py-4 animate-in fade-in zoom-in duration-300">
                                        <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                                            <Check className="w-6 h-6 text-green-600" />
                                        </div>
                                        <h3 className="text-xl font-bold text-stone-900 mb-1">¡Apuntado/a!</h3>
                                        <p className="text-stone-500 text-sm">Te avisaremos en exclusiva.</p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleWaitlistSubmit} className="flex flex-col gap-3">
                                        <div className="flex flex-col sm:flex-row gap-3">
                                            <input
                                                type="email"
                                                required
                                                placeholder="Tu email principal..."
                                                value={waitlistEmail}
                                                onChange={(e) => setWaitlistEmail(e.target.value)}
                                                className="flex-1 px-4 py-3 rounded-xl border border-stone-200 focus:border-[#E07A5F] focus:ring-2 focus:ring-[#E07A5F]/20 outline-none transition text-stone-800 placeholder:text-stone-400"
                                            />
                                            <button
                                                type="submit"
                                                disabled={waitlistStatus === 'loading'}
                                                className="px-6 py-3 bg-stone-800 hover:bg-stone-700 text-white font-bold rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap"
                                            >
                                                {waitlistStatus === 'loading' ? <Loader2 className="w-4 h-4 animate-spin" /> : "Avisadme"}
                                            </button>
                                        </div>
                                        <p className="text-[10px] text-stone-400 text-center sm:text-left">Cero spam. Solo te escribiremos cuando esté listo.</p>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
