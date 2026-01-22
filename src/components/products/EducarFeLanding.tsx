"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, Star, ShieldCheck, Heart, Zap, Clock, Sun, BookOpen, Loader2, CloudRain, X, ArrowRight, BatteryMedium, Users, Brain, Coffee } from "lucide-react";
import { joinWaitlist } from "@/actions/waitlist";
import OfferCountdown from "@/components/ui/OfferCountdown";
import maximoImg from "@/assets/images/maximo-con-libro.png";

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
                                    -30% DTO
                                </div>

                                <div className="text-center pt-4">
                                    <h3 className="text-2xl font-bold text-stone-900 mb-2">Oferta de Lanzamiento</h3>
                                    <p className="text-stone-600 mb-6 text-sm">Adquiere la guía hoy con un <span className="text-[#E07A5F] font-bold">30% de descuento</span> antes del lanzamiento oficial.</p>

                                    <div className="flex items-end justify-center gap-2 mb-6">
                                        <span className="text-5xl font-bold text-[#E07A5F]">4.90€</span>
                                        <span className="text-xl text-stone-400 line-through mb-1">7.00€</span>
                                    </div>

                                    <div className="flex justify-center mb-4">
                                        <OfferCountdown targetDate="2026-02-01T00:00:00" className="text-[#E07A5F] text-base" />
                                    </div>

                                    <a
                                        href={hotmartLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={() => (window as any).fbq && (window as any).fbq('track', 'InitiateCheckout', { content_name: 'Educar en la Fe', value: 4.90, currency: 'EUR' })}
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
                <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-[#FDFBF7] to-white z-10"></div>
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="text-center mb-16">
                        <span className="text-stone-400 font-bold tracking-widest uppercase text-xs mb-2 block">La Realidad Silenciosa</span>
                        <h2 className="text-3xl md:text-5xl font-extrabold text-stone-900 leading-tight">
                            "¿Serán capaces de distinguir el bien del mal cuando yo no esté?"
                        </h2>
                    </div>

                    <div className="prose prose-lg text-stone-600 mx-auto leading-relaxed mb-16">
                        <p>
                            Vivimos rodeados de ruido. Pantallas, ideologías cambiantes y una cultura que a menudo ridiculiza lo que tú más valoras. Como padres, sentimos ese <strong>nudo en el estómago</strong> al pensar en el futuro.
                        </p>
                        <ul className="list-none space-y-4 pl-0 mt-8 mb-8">
                            <li className="flex gap-4 items-start">
                                <CloudRain className="w-6 h-6 text-red-400 shrink-0 mt-1" />
                                <span><strong>El miedo a la desconexión:</strong> Ver que tus hijos se aburren en la iglesia o ponen los ojos en blanco cuando hablas de Dios.</span>
                            </li>
                            <li className="flex gap-4 items-start">
                                <BatteryMedium className="w-6 h-6 text-red-400 shrink-0 mt-1" />
                                <span><strong>La culpa del "No hago suficiente":</strong> Sentir que deberías rezar más con ellos, pero llegas agotado/a al final del día.</span>
                            </li>
                            <li className="flex gap-4 items-start">
                                <Users className="w-6 h-6 text-red-400 shrink-0 mt-1" />
                                <span><strong>La presión del entorno:</strong> ¿Cómo explicarles verdades difíciles sin que se sientan excluidos por sus amigos?</span>
                            </li>
                        </ul>
                    </div>

                    <div className="relative h-96 w-full rounded-2xl overflow-hidden shadow-2xl group">
                        <Image
                            src="/images/educar-fe-problem.png"
                            alt="Desconexión familiar tecnología"
                            fill
                            className="object-cover transition duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 to-transparent flex items-end p-8">
                            <p className="text-white text-lg font-medium">"No es que no quieran creer. Es que a veces nuestro mensaje no llega entre tanto ruido."</p>
                        </div>
                    </div>

                    {/* CTA AFTER AGITATION */}
                    <div className="flex flex-col items-center mt-12">
                        <a
                            href={hotmartLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => (window as any).fbq && (window as any).fbq('track', 'InitiateCheckout', { content_name: 'Educar en la Fe', value: 4.90, currency: 'EUR' })}
                            className="bg-[#E07A5F] hover:bg-[#c96348] text-white font-bold text-xl py-5 px-10 rounded-full shadow-xl hover:shadow-2xl transition transform hover:-translate-y-1 flex items-center gap-2"
                        >
                            Quiero romper esa barrera <Check className="w-5 h-5" />
                        </a>
                        <p className="mt-3 text-sm text-stone-400 font-medium">Oferta limitada de preventa</p>
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
                                src="/images/educar-fe-dream.png"
                                alt="Familia cenando feliz y conectada"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="space-y-8 order-1 md:order-2">
                            <h2 className="text-3xl md:text-5xl font-bold mb-6">Imagina que la fe sea el "lugar seguro" de tu familia.</h2>

                            <div className="flex gap-4">
                                <div className="bg-white/20 p-3 rounded-full h-fit"><Sun className="w-6 h-6 text-yellow-300" /></div>
                                <div>
                                    <h4 className="text-xl font-bold mb-2">Alegría, no obligación</h4>
                                    <p className="text-stone-100 opacity-90">
                                        Niños que asocian a Jesús con las mejores historias, con cenas divertidas y con padres que sonríen, no que solo regañan.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="bg-white/20 p-3 rounded-full h-fit"><Heart className="w-6 h-6 text-yellow-300" /></div>
                                <div>
                                    <h4 className="text-xl font-bold mb-2">Conversaciones profundas</h4>
                                    <p className="text-stone-100 opacity-90">
                                        Adolescentes que, en lugar de cerrarse, vienen a ti con sus dudas más difíciles porque saben que no les juzgarás.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="bg-white/20 p-3 rounded-full h-fit"><Coffee className="w-6 h-6 text-yellow-300" /></div>
                                <div>
                                    <h4 className="text-xl font-bold mb-2">Paz en el caos</h4>
                                    <p className="text-stone-100 opacity-90">
                                        Tener rituales sencillos que, pase lo que pase en el día, os devuelvan la calma y la gratitud antes de dormir.
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
                            onClick={() => (window as any).fbq && (window as any).fbq('track', 'InitiateCheckout', { content_name: 'Educar en la Fe', value: 4.90, currency: 'EUR' })}
                            className="bg-white text-[#E07A5F] hover:bg-stone-50 font-bold text-xl py-5 px-10 rounded-full shadow-xl hover:shadow-2xl transition transform hover:-translate-y-1"
                        >
                            Quiero construir ese hogar
                        </a>
                    </div>
                </div>
            </section>

            {/* --- SOLUTIONS (MODULES) --- */}
            <section className="py-24 bg-stone-50">
                <div className="container mx-auto px-6 max-w-5xl">
                    <div className="text-center mb-16">
                        <span className="text-[#E07A5F] font-bold tracking-widest uppercase text-xs">Lo que incluye la guía</span>
                        <h2 className="text-3xl md:text-5xl font-bold text-stone-900 mt-2">Más que un libro, un plan de acción</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Card 1 */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100 hover:shadow-md transition">
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-4"><Sun className="w-6 h-6" /></div>
                            <h3 className="text-xl font-bold mb-3">1. La Pedagogía del Asombro</h3>
                            <p className="text-stone-600 text-sm leading-relaxed">Olvídate de los sermones aburridos. Aprende a usar la naturaleza, el arte y las historias para despertar la curiosidad espiritual innata de tus hijos.</p>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100 hover:shadow-md transition">
                            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center text-yellow-600 mb-4"><Clock className="w-6 h-6" /></div>
                            <h3 className="text-xl font-bold mb-3">2. Rituales de 5 Minutos</h3>
                            <p className="text-stone-600 text-sm leading-relaxed">No necesitas horas. Descubre cómo bendecir la mesa, orar al ir al cole o agradecer por la noche puede transformar la atmósfera de tu casa.</p>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100 hover:shadow-md transition">
                            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 mb-4"><Brain className="w-6 h-6" /></div>
                            <h3 className="text-xl font-bold mb-3">3. Respuestas "Anti-Crisis"</h3>
                            <p className="text-stone-600 text-sm leading-relaxed">Guiones exactos para responder a las preguntas difíciles: "¿Por qué existe el mal?", "¿El cielo es real?", "¿Por qué tengo que ir a Misa?". Sin miedo.</p>
                        </div>

                        {/* Card 4 */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100 hover:shadow-md transition">
                            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600 mb-4"><ShieldCheck className="w-6 h-6" /></div>
                            <h3 className="text-xl font-bold mb-3">4. Blindaje Digital</h3>
                            <p className="text-stone-600 text-sm leading-relaxed">Cómo educar en valores en la era de TikTok. Estrategias para fomentar el pensamiento crítico frente a las pantallas.</p>
                        </div>
                    </div>

                    {/* BONUS KIT */}
                    <div className="mt-12 bg-white border-2 border-[#E07A5F]/20 rounded-3xl p-8 md:p-12 text-stone-800 relative overflow-hidden shadow-xl">
                        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-[#E07A5F] rounded-full blur-3xl opacity-10"></div>
                        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
                            <div className="md:w-2/3">
                                <div className="inline-block bg-[#E07A5F] text-white text-xs font-bold px-3 py-1 rounded-full mb-4">BONUS EXCLUSIVO PREVENTA</div>
                                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-stone-900">Kit de Conexión Familiar 🏠</h3>
                                <p className="text-stone-600 mb-6">Recursos imprimibles para pasar a la acción desde el día uno.</p>
                                <ul className="space-y-3">
                                    <li className="flex items-center gap-3"><Check className="text-green-500 w-5 h-5" /> <span><strong>Tarjetas de Conversación:</strong> 50 preguntas para cenas divertidas.</span></li>
                                    <li className="flex items-center gap-3"><Check className="text-green-500 w-5 h-5" /> <span><strong>Checklist Semanal:</strong> Sencillo evaluador de clima familiar.</span></li>
                                    <li className="flex items-center gap-3"><Check className="text-green-500 w-5 h-5" /> <span><strong>Guía de Oraciones:</strong> Textos simples para niños.</span></li>
                                </ul>
                            </div>
                            <div className="md:w-1/3 h-48 w-full rounded-xl overflow-hidden shadow-lg border border-stone-100 relative bg-stone-100">
                                <Image
                                    src="/images/educar-fe-bonus.png"
                                    alt="Kit de Conexión Familiar Mockup"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </div>

                    {/* SECONDARY CTA IN SOLUTION */}
                    <div className="container mx-auto px-6 max-w-5xl pt-12 pb-4 text-center">
                        <a href={hotmartLink} target="_blank" rel="noopener noreferrer" onClick={() => (window as any).fbq && (window as any).fbq('track', 'InitiateCheckout', { content_name: 'Educar en la Fe', value: 4.90, currency: 'EUR' })} className="inline-flex items-center gap-2 bg-stone-100 hover:bg-stone-200 text-stone-600 font-bold py-3 px-6 rounded-lg transition">
                            Prefiero ir directo al pago <ArrowRight className="w-4 h-4" />
                        </a>
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
                                Entiendo perfectamente ese nudo en el estómago cuando piensas en el futuro espiritual de tus hijos. Mi propósito con <strong>Padres con Resiliencia</strong> y esta guía es darte la tranquilidad de saber que estás construyendo sobre roca firme, con amor y sin miedos.
                            </p>
                            <div className="bg-stone-50 rounded-xl p-6 border-l-4 border-[#E07A5F]">
                                <p className="text-stone-500 italic font-medium">
                                    "La fe no se impone, se propone y se testimonia. Aquí tienes el mapa para hacerlo con alegría."
                                </p>
                            </div>
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
                            onClick={() => (window as any).fbq && (window as any).fbq('track', 'InitiateCheckout', { content_name: 'Educar en la Fe', value: 4.90, currency: 'EUR' })}
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
