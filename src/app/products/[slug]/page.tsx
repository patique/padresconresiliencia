import prisma from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, ShieldCheck, Download, Star, Check } from "lucide-react";
import AuthorSection from "@/components/home/AuthorSection";
import OfferCountdown from "@/components/ui/OfferCountdown";

interface ProductPageProps {
    params: { slug: string };
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
    console.log(`👀 SERVER LOG CHECK: Visiting product page for slug: ${params.slug} at ${new Date().toISOString()}`);

    const product = await prisma.product.findUnique({
        where: { slug: params.slug },
    });

    if (!product) {
        notFound();
    }

    const benefits = [
        "Descarga Inmediata del Ebook Completo (PDF)",
        "Lectura ágil y directa (sin relleno)",
        "Formato compatible con Móvil, Tablet y PC",
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
                        <div className="relative lg:sticky lg:top-24">
                            <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden shadow-2xl bg-white border-8 border-white transform rotate-1 lg:-rotate-1 hover:rotate-0 transition duration-500">
                                {product?.slug === 'bienestar-emocional-padres' ? (
                                    <Image src="/images/madre-leyendo.png" alt="Madre leyendo Mi Bebé Llora con calma" fill className="object-cover" priority />
                                ) : (
                                    product?.imageUrl ? (
                                        <Image src={product.imageUrl} alt={product.title} fill className="object-cover" priority />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-stone-100 text-stone-300">Sin Imagen</div>
                                    )
                                )}
                            </div>

                            {/* Floating Trust Badge */}
                            <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg flex items-center gap-3 animate-bounce-slow hidden md:flex">
                                <div className="bg-green-100 p-2 rounded-full text-green-600">
                                    <ShieldCheck className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-xs text-stone-400 font-bold uppercase tracking-wider">Garantía</p>
                                    <p className="text-sm font-bold text-stone-800">15 Días</p>
                                </div>
                            </div>
                        </div>

                        {/* Content Column (Hero Right) */}
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

                            <h1 className="text-3xl md:text-5xl font-bold text-stone-900 mb-6 leading-tight">
                                {product?.slug === 'bienestar-emocional-padres'
                                    ? <span>El "Interruptor" Biológico para <span className="text-[#E07A5F]">Detener el Caos</span> y Recuperar tu Vida <span className="block text-lg md:text-2xl font-normal text-stone-500 mt-4">Sin dormirte en el intento. Sin perder los nervios.</span></span>
                                    : product?.title
                                }
                            </h1>

                            {/* Short Intro for Hero */}
                            <p className="text-lg text-stone-600 mb-8 leading-relaxed">
                                {product?.slug === 'bienestar-emocional-padres'
                                    ? "Descubre por qué los métodos tradicionales fallan y cómo la neurociencia afectiva puede devolverte la paz en 7 días o menos."
                                    : product?.description
                                }
                            </p>

                            {/* Price Block (Hero) */}
                            <div className="bg-white rounded-2xl p-6 border border-stone-100 shadow-sm mb-8">
                                <div className="flex flex-col items-center justify-center mb-6">
                                    <span className="bg-red-100 text-red-600 px-4 py-1 rounded-full text-sm font-bold mb-2">
                                        Oferta Limitada
                                    </span>
                                    <OfferCountdown className="text-red-600 text-3xl sm:text-4xl justify-center" />
                                    <div className="flex items-center justify-center gap-3 mt-4">
                                        <span className="text-stone-400 line-through text-lg font-medium">{product?.slug === 'bienestar-emocional-padres' ? '19.90' : product?.originalPrice?.toFixed(2)} {product?.slug === 'bienestar-emocional-padres' ? 'US$' : '€'}</span>
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-5xl font-bold text-stone-900 leading-none">{product?.slug === 'bienestar-emocional-padres' ? '5.90' : product?.price?.toFixed(2)}</span>
                                            <span className="text-stone-500 text-xs font-bold self-end mb-1"> {product?.slug === 'bienestar-emocional-padres' ? 'US$' : '€ + IVA'}</span>
                                        </div>
                                    </div>
                                </div>

                                <a href="https://pay.hotmart.com/D103873545U" className="block w-full bg-[#E07A5F] hover:bg-[#D06950] text-white text-center font-bold text-lg py-4 rounded-xl shadow-lg transition transform hover:-translate-y-1 active:translate-y-0">
                                    Comprar Ahora
                                </a>
                                <p className="text-center text-xs text-stone-400 mt-3 flex items-center justify-center gap-1">
                                    🔒 Compra segura. Recíbelo en tu email en 1 minuto.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- LONG FORM CONTENT SECTIONS --- */}

                {/* 1. THE PROBLEM (Agitation) */}
                <div className="bg-stone-50 py-20 border-t border-stone-100">
                    <div className="container mx-auto px-6 max-w-3xl text-center">
                        <h2 className="text-3xl font-bold text-stone-900 mb-8 leading-tight">¿Te suena esta historia?</h2>
                        <div className="space-y-6 text-lg text-stone-600 text-left leading-relaxed">
                            <p>
                                Son las 7 de la tarde. O las 3 de la mañana. Tu bebé llora. Tú estás agotado/a.
                                Intentas calmarlo, pero nada funciona.
                            </p>
                            <p className="font-medium text-stone-800 bg-white p-6 rounded-xl border-l-4 border-red-400 shadow-sm">
                                "Sientes que el pecho se te cierra. La paciencia se rompe. Y entonces... gritas. O das un portazo. O te encierras en el baño a llorar."
                            </p>
                            <p>
                                Y después viene lo peor: <strong>LA CULPA.</strong>
                                <br />Te prometes que mañana será diferente. Que serás ese padre o madre zen que ves en Instagram.
                                Pero al día siguiente, el ciclo se repite.
                            </p>
                            <p>
                                No es que seas un mal padre. No es que tu hijo sea "difícil".
                                <br /><strong>Es que estás luchando contra la biología sin las armas adecuadas.</strong>
                            </p>
                        </div>
                    </div>
                </div>

                {/* 2. THE FALSE SOLUTION (Mechanism Gap) */}
                <div className="py-20 bg-white">
                    <div className="container mx-auto px-6 max-w-3xl">
                        <h2 className="text-3xl font-bold text-stone-900 mb-6 text-center">Por qué "contar hasta 10" NO funciona</h2>
                        <div className="space-y-6 text-lg text-stone-600 leading-relaxed">
                            <p>
                                Nos han dicho que la crianza es cuestión de "paciencia" o "instinto". Mentira.
                                Cuando tú (o tu bebé) estáis desbordados, <strong>la parte racional del cerebro se APAGA</strong>.
                            </p>
                            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                                <h3 className="font-bold text-blue-900 mb-2">El Secuestro de la Amígdala</h3>
                                <p className="text-blue-800 text-base">
                                    La ciencia demuestra que bajo estrés por falta de sueño, tu cerebro entra en modo "lucha o huida". Pedirte paciencia ahí es como pedirle a alguien que se ahoga que respire tranquilo. <strong>Necesitas un salvavidas, no un consejo.</strong>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. THE SOLUTION (The Product Promise) */}
                <div className="py-20 bg-[#FDFBF7]">
                    <div className="container mx-auto px-6 max-w-4xl">
                        <div className="text-center mb-12">
                            <span className="text-[#E07A5F] font-bold tracking-widest uppercase text-sm">Presentamos</span>
                            <h2 className="text-4xl md:text-5xl font-bold text-stone-900 mt-2 mb-6">El Método de Resiliencia Parental</h2>
                            <p className="text-xl text-stone-600 max-w-2xl mx-auto">
                                No es solo un libro. Es tu manual de emergencia para desactivar el caos y volver a conectar.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100">
                                <h3 className="text-xl font-bold text-[#E07A5F] mb-4">Lo que la gente cree que es:</h3>
                                <ul className="space-y-3 text-stone-500">
                                    <li className="flex gap-2"><span className="text-red-400">✕</span> Aguantar sin dormir</li>
                                    <li className="flex gap-2"><span className="text-red-400">✕</span> "Dejarlo llorar"</li>
                                    <li className="flex gap-2"><span className="text-red-400">✕</span> Teoría psicológica densa</li>
                                    <li className="flex gap-2"><span className="text-red-400">✕</span> Ser un padre "perfecto"</li>
                                </ul>
                            </div>
                            <div className="bg-stone-900 text-white p-8 rounded-2xl shadow-xl transform scale-105">
                                <h3 className="text-xl font-bold text-white mb-4">Lo que REALMENTE es:</h3>
                                <ul className="space-y-3 text-stone-300">
                                    <li className="flex gap-2"><span className="text-[#E07A5F] font-bold">✓</span> Protocolos de sueño realistas</li>
                                    <li className="flex gap-2"><span className="text-[#E07A5F] font-bold">✓</span> Guiones para no gritar</li>
                                    <li className="flex gap-2"><span className="text-[#E07A5F] font-bold">✓</span> Herramientas de 2 minutos</li>
                                    <li className="flex gap-2"><span className="text-[#E07A5F] font-bold">✓</span> Recuperar a tu pareja</li>
                                </ul>
                            </div>
                        </div>

                        <div className="flex justify-center mt-12">
                            <a href="https://pay.hotmart.com/D103873545U" className="inline-flex items-center gap-2 text-[#E07A5F] font-bold text-lg hover:text-[#D06950] transition group">
                                Sí, quiero dejar de sufrir y empezar a disfrutar
                                <ArrowLeft className="w-5 h-5 rotate-180 transition-transform group-hover:translate-x-1" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* 4. WHAT'S INSIDE (Bullets) */}
                <div className="py-20 bg-white border-y border-stone-100">
                    <div className="container mx-auto px-6 max-w-4xl">
                        <h2 className="text-3xl font-bold text-stone-900 mb-10 text-center">Lo que descubrirás en estas páginas:</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <span className="text-2xl">🧠</span>
                                    <div>
                                        <h4 className="font-bold text-stone-900">El Interruptor de la Calma</h4>
                                        <p className="text-sm text-stone-600">La técnica neuro-científica para detener tu propio estallido de ira en menos de 60 segundos.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <span className="text-2xl">😴</span>
                                    <div>
                                        <h4 className="font-bold text-stone-900">El Plan de Sueño por Turnos</h4>
                                        <p className="text-sm text-stone-600">Cómo dormir 5 horas seguidas sin descuidar al bebé (y sin dormir en habitaciones separadas para siempre).</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <span className="text-2xl">🤝</span>
                                    <div>
                                        <h4 className="font-bold text-stone-900">Protocolo Anti-Divorcio</h4>
                                        <p className="text-sm text-stone-600">Las 3 frases que debéis deciros cada mañana para seguir siendo un equipo, no enemigos.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <span className="text-2xl">🛡️</span>
                                    <div>
                                        <h4 className="font-bold text-stone-900">Blindaje contra la Culpa</h4>
                                        <p className="text-sm text-stone-600">Entiende por qué la culpa es basura biológica y cómo eliminarla de tu sistema operativo.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <span className="text-2xl">👶</span>
                                    <div>
                                        <h4 className="font-bold text-stone-900">Decodificador de Llanto</h4>
                                        <p className="text-sm text-stone-600">Aprende a distinguir si es hambre, sueño o simplemente necesidad de contacto, sin adivinar.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <span className="text-2xl">🚀</span>
                                    <div>
                                        <h4 className="font-bold text-stone-900">Tu Nueva Identidad</h4>
                                        <p className="text-sm text-stone-600">Cómo integrar tu rol de padre/madre sin perder a la persona que eras antes.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-center mt-14">
                            <a href="https://pay.hotmart.com/D103873545U" className="bg-[#E07A5F] hover:bg-[#D06950] text-white font-bold text-xl py-4 px-12 rounded-xl shadow-xl transition transform hover:-translate-y-1 active:translate-y-0 flex items-center gap-3">
                                <Download className="w-6 h-6" />
                                Descargar Guía Completa Ahora
                            </a>
                        </div>
                    </div>
                </div>



                {/* Visual Transformation Journey (Only for Bienestar) */}
                {
                    product.slug === 'bienestar-emocional-padres' && (
                        <div className="container mx-auto px-6 max-w-6xl mt-24 mb-24">
                            <div className="text-center mb-16">
                                <h2 className="text-3xl md:text-4xl font-bold text-stone-900">¿En qué lado quieres estar?</h2>
                                <p className="text-stone-600 mt-4 text-lg">Tu maternidad/paternidad no tiene por qué ser una batalla constante.</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
                                {/* State A: Pain */}
                                <div className="relative aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden shadow-xl transform -rotate-1 border-4 border-white">
                                    <Image
                                        src="/images/landing/emotional-noise.png"
                                        alt="Madre abrumada por el ruido mental"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="space-y-6">
                                    <div className="bg-red-50 text-red-800 font-bold px-4 py-1 rounded-full w-fit text-sm">SITUACIÓN ACTUAL</div>
                                    <h3 className="text-2xl font-bold text-stone-900">El Ruido Mental te impide disfrutar</h3>
                                    <p className="text-stone-600 leading-relaxed text-lg">
                                        Sientes que estás sobreviviendo, no viviendo. La culpa, el agotamiento y la sensación de soledad crean una "estática" constante que te aleja de tu pareja y te impide conectar realmente con tu bebé.
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                                {/* State B: Pleasure (Order swapped on desktop for visual flow) */}
                                <div className="space-y-6 order-2 md:order-1">
                                    <div className="bg-[#E07A5F]/10 text-[#E07A5F] font-bold px-4 py-1 rounded-full w-fit text-sm">SITUACIÓN DESEADA</div>
                                    <h3 className="text-2xl font-bold text-stone-900">Calma, Conexión y Presencia</h3>
                                    <p className="text-stone-600 leading-relaxed text-lg">
                                        Imagina bajar el volumen del ruido. Recuperar la complicidad con tu pareja y poder sostener a tu hijo desde la calma, no desde el estrés. Esto es lo que conseguirás al aplicar las herramientas del libro.
                                    </p>
                                </div>
                                <div className="relative aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden shadow-xl transform rotate-1 border-4 border-white order-1 md:order-2">
                                    <Image
                                        src="/images/landing/peaceful-parenting.png"
                                        alt="Pareja tranquila y conectada con su bebé"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    )
                }

                {/* Testimonials Section */}
                <div className="container mx-auto px-6 max-w-6xl mt-24 border-t border-stone-200 pt-16">
                    <h2 className="text-2xl font-bold text-stone-900 mb-10 text-center">Lo que dicen otros padres</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Testimonial 1: Sleep */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 flex flex-col h-full">
                            <div className="flex text-yellow-500 mb-4 text-sm">{"★★★★★"}</div>
                            <p className="text-stone-600 mb-6 text-sm leading-relaxed flex-1 italic">
                                "Pensaba que era normal no dormir nada y 'aguantar'. Este libro me enseñó a establecer turnos lógicos con mi mujer. Nos ha salvado la vida (y el humor por las mañanas)."
                            </p>
                            <div className="flex items-center gap-3 mt-auto">
                                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">JM</div>
                                <div>
                                    <p className="text-sm font-bold text-stone-900">Javier M.</p>
                                    <p className="text-xs text-stone-400">Papá de mellizos</p>
                                </div>
                            </div>
                        </div>

                        {/* Testimonial 2: Guilt */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 flex flex-col h-full">
                            <div className="flex text-yellow-500 mb-4 text-sm">{"★★★★★"}</div>
                            <p className="text-stone-600 mb-6 text-sm leading-relaxed flex-1 italic">
                                "La culpa me comía por querer 5 minutos para mí. Leer que es una necesidad biológica para poder cuidar mejor a mi hijo fue el 'clic' que necesitaba. Gracias por validarnos."
                            </p>
                            <div className="flex items-center gap-3 mt-auto">
                                <div className="w-10 h-10 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center font-bold text-sm">ER</div>
                                <div>
                                    <p className="text-sm font-bold text-stone-900">Elena R.</p>
                                    <p className="text-xs text-stone-400">Mamá primeriza</p>
                                </div>
                            </div>
                        </div>

                        {/* Testimonial 3: Relationship */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 flex flex-col h-full">
                            <div className="flex text-yellow-500 mb-4 text-sm">{"★★★★★"}</div>
                            <p className="text-stone-600 mb-6 text-sm leading-relaxed flex-1 italic">
                                "Estábamos en un bucle de discusiones absurdas a las 3 AM. Las herramientas de comunicación 'en crisis' funcionan desde el primer día. Hemos vuelto a ser un equipo."
                            </p>
                            <div className="flex items-center gap-3 mt-auto">
                                <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-sm">RC</div>
                                <div>
                                    <p className="text-sm font-bold text-stone-900">Roberto y Clara</p>
                                    <p className="text-xs text-stone-400">Padres de Leo (6 meses)</p>
                                </div>
                            </div>
                        </div>

                        {/* Testimonial 4: Anxiety */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 flex flex-col h-full">
                            <div className="flex text-yellow-500 mb-4 text-sm">{"★★★★★"}</div>
                            <p className="text-stone-600 mb-6 text-sm leading-relaxed flex-1 italic">
                                "El primer mes fue un caos de ansiedad brutal. La técnica de los 2 minutos para el 'secuestro de amígdala' es mano de santo. Ojalá lo hubiera leído antes de dar a luz."
                            </p>
                            <div className="flex items-center gap-3 mt-auto">
                                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-sm">SL</div>
                                <div>
                                    <p className="text-sm font-bold text-stone-900">Sofía L.</p>
                                    <p className="text-xs text-stone-400">Mamá de 2 semanas</p>
                                </div>
                            </div>
                        </div>

                        {/* Testimonial 5: Skeptic */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 flex flex-col h-full">
                            <div className="flex text-yellow-500 mb-4 text-sm">{"★★★★★"}</div>
                            <p className="text-stone-600 mb-6 text-sm leading-relaxed flex-1 italic">
                                "No soy de comprar ebooks 'milagro', pero este va al grano. Sin paja teórica aburrida, solo estrategias que puedes aplicar mientras calientas el biberón."
                            </p>
                            <div className="flex items-center gap-3 mt-auto">
                                <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-sm">MA</div>
                                <div>
                                    <p className="text-sm font-bold text-stone-900">Miguel Á.</p>
                                    <p className="text-xs text-stone-400">Papá práctico</p>
                                </div>
                            </div>
                        </div>

                        {/* Testimonial 6: Experience */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 flex flex-col h-full">
                            <div className="flex text-yellow-500 mb-4 text-sm">{"★★★★★"}</div>
                            <p className="text-stone-600 mb-6 text-sm leading-relaxed flex-1 italic">
                                "Es mi segundo hijo y pensé que ya lo sabía todo. Error. Este enfoque emocional es lo que me faltó con el primero. Estoy disfrutando el doble y sufriendo la mitad."
                            </p>
                            <div className="flex items-center gap-3 mt-auto">
                                <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center font-bold text-sm">LP</div>
                                <div>
                                    <p className="text-sm font-bold text-stone-900">Laura P.</p>
                                    <p className="text-xs text-stone-400">Bimadre</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Second CTA with Price Comparison */}
                <div className="container mx-auto px-6 max-w-4xl mt-24 mb-24 bg-[#E07A5F] rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                        <div className="absolute top-[-50%] left-[-50%] w-[100%] h-[100%] bg-white rounded-full blur-3xl"></div>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold mb-6 relative z-10 text-white">¿Cuánto vale tu paz mental?</h2>
                    <p className="text-stone-100 text-lg mb-8 max-w-2xl mx-auto relative z-10 font-medium">
                        Una sola sesión con un especialista en sueño o psicólogo perinatal cuesta más de 80€. Aquí tienes la hoja de ruta completa para siempre.
                    </p>

                    <div className="flex justify-center relative z-10 mb-10">
                        <OfferCountdown className="text-white text-3xl md:text-5xl bg-white/10 px-6 py-4 rounded-xl backdrop-blur-md border border-white/25 shadow-inner" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg mx-auto mb-10 relative z-10">
                        <div className="bg-white/20 p-4 rounded-xl border border-white/30 backdrop-blur-sm">
                            <p className="text-stone-100 text-sm mb-1 font-medium">Precio Habitual</p>
                            <p className="text-2xl font-bold text-stone-200 line-through decoration-stone-200/70">{product?.slug === 'bienestar-emocional-padres' ? '19.90 US$' : `${product?.originalPrice?.toFixed(2)}€`}</p>
                        </div>
                        <div className="bg-white text-stone-900 p-4 rounded-xl border-4 border-white transform scale-105 shadow-xl">
                            <p className="text-[#E07A5F] text-sm font-bold mb-1">OFERTA HOY</p>
                            <div className="flex items-baseline justify-center gap-1">
                                <p className="text-4xl font-bold">{product?.slug === 'bienestar-emocional-padres' ? '5.90' : product?.price?.toFixed(2)}</p>
                                <span className="text-stone-400 text-xs font-bold">{product?.slug === 'bienestar-emocional-padres' ? 'US$' : '€+IVA'}</span>
                            </div>
                        </div>
                    </div>

                    <a href="https://pay.hotmart.com/D103873545U" className="inline-block bg-white text-[#E07A5F] hover:bg-stone-50 font-bold text-xl py-4 px-10 rounded-xl shadow-lg transition transform hover:-translate-y-1 active:translate-y-0 relative z-10">
                        Quiero Acceso Inmediato
                    </a>
                    <p className="text-stone-200 text-xs mt-4 relative z-10 font-medium">Garantía de 15 días. Si no te sirve, te devolvemos el dinero.</p>
                </div>





            </main>

            {/* Sticky Mobile CTA */}
            <div className="fixed bottom-0 left-0 w-full bg-[#E07A5F] border-t border-[#E07A5F] p-4 lg:hidden z-50 shadow-[0_-5px_15px_rgba(0,0,0,0.1)]">
                <div className="flex items-center justify-between gap-4">
                    <div className="flex flex-col">
                        <span className="text-xs text-stone-100 font-medium line-through">
                            {product?.slug === 'bienestar-emocional-padres' ? '19.90 US$' : (product?.originalPrice ? `${product.originalPrice}€` : '')}
                        </span>
                        <span className="text-xl font-bold text-white leading-none">
                            {product?.slug === 'bienestar-emocional-padres' ? '5.90 US$' : `${product?.price}€`}
                        </span>
                    </div>
                    <a
                        href="https://pay.hotmart.com/D103873545U"
                        className="bg-white text-[#E07A5F] hover:bg-stone-50 font-bold py-3 px-6 rounded-xl flex-1 text-center shadow-lg active:scale-95 transition"
                    >
                        Comprar Ahora
                    </a>
                </div>
            </div>
        </div>
    );
}
