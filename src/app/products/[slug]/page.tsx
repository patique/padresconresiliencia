import prisma from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, ShieldCheck, Download, Star, Check } from "lucide-react";
import AuthorSection from "@/components/home/AuthorSection";

interface ProductPageProps {
    params: { slug: string };
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
    const product = await prisma.product.findUnique({
        where: { slug: params.slug },
    });

    if (!product) {
        notFound();
    }

    const benefits = [
        "Acceso inmediato al Curso (11 Módulos)",
        "PDF completo desbloqueable a los 15 días",
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
                        <div className="relative lg:sticky lg:top-24">
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
                                    <p className="text-sm font-bold text-stone-800">15 Días</p>
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

                            {product.slug === 'bienestar-emocional-padres' ? (
                                <div className="space-y-6 text-stone-600 mb-8 leading-relaxed">
                                    <h2 className="text-2xl font-bold text-stone-900 leading-tight">
                                        Nadie te avisó de que el amor más grande de tu vida vendría acompañado de tanto <span className="text-[#E07A5F]">ruido</span>.
                                    </h2>
                                    <p>
                                        ¿Recuerdas cuando te decían "aprovecha para dormir ahora"? Te reías. Ahora darías lo que fuera por 4 horas seguidas de silencio.
                                    </p>
                                    <p>
                                        La realidad del primer año te atropella: La culpa, la sensación de ser compañeros de piso con tu pareja, el ruido mental...
                                    </p>
                                    <div className="font-medium text-stone-900 bg-[#E07A5F]/10 p-4 border-l-4 border-[#E07A5F] rounded-r-lg">
                                        Te han vendido que ser padres es instintivo y maravilloso todo el tiempo. <strong>Mentira.</strong> Es maravilloso, sí. Pero también agotador.
                                    </div>
                                    <div className="bg-stone-50 rounded-2xl p-6 border border-stone-100 shadow-sm mt-6">
                                        <h3 className="font-bold text-stone-900 mb-4 text-lg">En este ebook aprenderás a:</h3>
                                        <div className="grid grid-cols-1 gap-4">
                                            <div className="flex gap-3">
                                                <div className="bg-[#E07A5F]/20 text-[#E07A5F] rounded-full p-1 h-fit shrink-0"><Check className="w-4 h-4" /></div>
                                                <div><strong className="text-stone-900">Blindar tu descanso:</strong> Estrategias reales para dormir sin dejarle llorar.</div>
                                            </div>
                                            <div className="flex gap-3">
                                                <div className="bg-[#E07A5F]/20 text-[#E07A5F] rounded-full p-1 h-fit shrink-0"><Check className="w-4 h-4" /></div>
                                                <div><strong className="text-stone-900">Desactivar la bomba de la pareja:</strong> Cómo hablaros bonito cuando estáis a punto de explotar.</div>
                                            </div>
                                            <div className="flex gap-3">
                                                <div className="bg-[#E07A5F]/20 text-[#E07A5F] rounded-full p-1 h-fit shrink-0"><Check className="w-4 h-4" /></div>
                                                <div><strong className="text-stone-900">Gestionar la "opinología":</strong> Poner límites a suegros y cuñados sin culpa.</div>
                                            </div>
                                            <div className="flex gap-3">
                                                <div className="bg-[#E07A5F]/20 text-[#E07A5F] rounded-full p-1 h-fit shrink-0"><Check className="w-4 h-4" /></div>
                                                <div><strong className="text-stone-900">Recuperar tu identidad:</strong> Recordar quién eras tú antes de ser "mamá/papá de...".</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-lg text-stone-600 leading-relaxed mb-8 space-y-4">
                                    <p>{product.description}</p>
                                    <p>Una guía esencial diseñada para padres que buscan respuestas claras y prácticas, sin perderse en teoría innecesaria.</p>
                                </div>
                            )}

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
                                    Comprar Ahora
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

                {/* SYLLABUS SECTION */}
                <div className="container mx-auto px-6 max-w-4xl mt-24">
                    <div className="text-center mb-16">
                        <span className="text-[#E07A5F] font-bold uppercase tracking-wider text-sm">Contenido del Programa</span>
                        <h2 className="text-3xl lg:text-4xl font-bold text-stone-900 mt-2 mb-6">¿Qué encontrarás dentro?</h2>
                        <p className="text-stone-600">Acceso digital inmediato a todos los módulos y recursos a través de Hotmart.</p>
                    </div>

                    <div className="space-y-8">
                        {/* Introduction */}
                        <div className="border border-stone-200 rounded-2xl overflow-hidden bg-white shadow-sm">
                            <div className="bg-stone-50 px-6 py-4 border-b border-stone-100 font-bold text-stone-800 flex items-center gap-3">
                                <span className="bg-[#E07A5F]/10 text-[#E07A5F] py-1 px-3 rounded text-sm">Intro</span>
                                Bienvenida e Inicio del viaje
                            </div>
                            <div className="p-6 space-y-3">
                                <div className="flex items-start gap-3 text-stone-600">
                                    <CheckCircle2 className="w-5 h-5 text-[#E07A5F] mt-0.5" />
                                    <span>Clase 1: Cómo sacarle el máximo provecho a este curso</span>
                                </div>
                                <div className="flex items-start gap-3 text-stone-600">
                                    <CheckCircle2 className="w-5 h-5 text-[#E07A5F] mt-0.5" />
                                    <span>Clase 2: Acceso al tema: Introducción al curso</span>
                                </div>
                            </div>
                        </div>

                        {/* Módulo 1 */}
                        <div className="border border-stone-200 rounded-2xl overflow-hidden bg-white shadow-sm">
                            <div className="bg-stone-50 px-6 py-4 border-b border-stone-100 font-bold text-stone-800 flex items-center gap-3">
                                <span className="bg-stone-200 text-stone-700 py-1 px-3 rounded text-sm">Módulo 1</span>
                                La realidad emocional del primer año
                            </div>
                            <div className="p-6 space-y-3">
                                <div className="flex items-start gap-3 text-stone-600">
                                    <CheckCircle2 className="w-5 h-5 text-[#E07A5F] mt-0.5" />
                                    <span>Clase 3: Acceso al tema: La realidad emocional (Lo que nadie te cuenta)</span>
                                </div>
                                <div className="flex items-start gap-3 text-stone-600">
                                    <Star className="w-5 h-5 text-yellow-500 mt-0.5" />
                                    <span>Clase 4: Reflexión guiada (bonus)</span>
                                </div>
                            </div>
                        </div>

                        {/* Módulo 2 */}
                        <div className="border border-stone-200 rounded-2xl overflow-hidden bg-white shadow-sm">
                            <div className="bg-stone-50 px-6 py-4 border-b border-stone-100 font-bold text-stone-800 flex items-center gap-3">
                                <span className="bg-stone-200 text-stone-700 py-1 px-3 rounded text-sm">Módulo 2</span>
                                Estrés y ansiedad posparto
                            </div>
                            <div className="p-6 space-y-3">
                                <div className="flex items-start gap-3 text-stone-600">
                                    <CheckCircle2 className="w-5 h-5 text-[#E07A5F] mt-0.5" />
                                    <span>Clase 5: Acceso al tema: Estrés y ansiedad posparto</span>
                                </div>
                                <div className="flex items-start gap-3 text-stone-600">
                                    <CheckCircle2 className="w-5 h-5 text-[#E07A5F] mt-0.5" />
                                    <span>Clase 6: Checklist semanal de autoevaluación (bonus)</span>
                                </div>
                            </div>
                        </div>

                        {/* Módulo 3 */}
                        <div className="border border-stone-200 rounded-2xl overflow-hidden bg-white shadow-sm">
                            <div className="bg-stone-50 px-6 py-4 border-b border-stone-100 font-bold text-stone-800 flex items-center gap-3">
                                <span className="bg-stone-200 text-stone-700 py-1 px-3 rounded text-sm">Módulo 3</span>
                                El poder del sueño
                            </div>
                            <div className="p-6 space-y-3">
                                <div className="flex items-start gap-3 text-stone-600">
                                    <CheckCircle2 className="w-5 h-5 text-[#E07A5F] mt-0.5" />
                                    <span>Clase 7: Acceso al tema: Recupera tu energía</span>
                                </div>
                                <div className="flex items-start gap-3 text-stone-600">
                                    <CheckCircle2 className="w-5 h-5 text-[#E07A5F] mt-0.5" />
                                    <span>Clase 8: Plantilla de planificación (bonus)</span>
                                </div>
                            </div>
                        </div>

                        {/* Módulo 4 */}
                        <div className="border border-stone-200 rounded-2xl overflow-hidden bg-white shadow-sm">
                            <div className="bg-stone-50 px-6 py-4 border-b border-stone-100 font-bold text-stone-800 flex items-center gap-3">
                                <span className="bg-stone-200 text-stone-700 py-1 px-3 rounded text-sm">Módulo 4</span>
                                Fortaleciendo la relación de pareja
                            </div>
                            <div className="p-6 space-y-3">
                                <div className="flex items-start gap-3 text-stone-600">
                                    <CheckCircle2 className="w-5 h-5 text-[#E07A5F] mt-0.5" />
                                    <span>Clase 9: Acceso al tema: Fortaleciendo la relación</span>
                                </div>
                                <div className="flex items-start gap-3 text-stone-600">
                                    <Star className="w-5 h-5 text-yellow-500 mt-0.5" />
                                    <span>Clase 10: Lista de 10 rituales de conexión</span>
                                </div>
                            </div>
                        </div>

                        {/* Módulo 5 */}
                        <div className="border border-stone-200 rounded-2xl overflow-hidden bg-white shadow-sm">
                            <div className="bg-stone-50 px-6 py-4 border-b border-stone-100 font-bold text-stone-800 flex items-center gap-3">
                                <span className="bg-stone-200 text-stone-700 py-1 px-3 rounded text-sm">Módulo 5</span>
                                Equilibrio trabajo y familia
                            </div>
                            <div className="p-6 space-y-3">
                                <div className="flex items-start gap-3 text-stone-600">
                                    <CheckCircle2 className="w-5 h-5 text-[#E07A5F] mt-0.5" />
                                    <span>Clase 11: Acceso al tema: Equilibrio trabajo y familia</span>
                                </div>
                            </div>
                        </div>

                        {/* Módulo 6 */}
                        <div className="border border-stone-200 rounded-2xl overflow-hidden bg-white shadow-sm">
                            <div className="bg-stone-50 px-6 py-4 border-b border-stone-100 font-bold text-stone-800 flex items-center gap-3">
                                <span className="bg-stone-200 text-stone-700 py-1 px-3 rounded text-sm">Módulo 6</span>
                                Pedir ayuda y construir red de apoyo
                            </div>
                            <div className="p-6 space-y-3">
                                <div className="flex items-start gap-3 text-stone-600">
                                    <CheckCircle2 className="w-5 h-5 text-[#E07A5F] mt-0.5" />
                                    <span>Clase 12: Acceso al tema: Pedir ayuda sin culpa</span>
                                </div>
                                <div className="flex items-start gap-3 text-stone-600">
                                    <CheckCircle2 className="w-5 h-5 text-[#E07A5F] mt-0.5" />
                                    <span>Clase 13: Acceso al tema: Tu red de apoyo ideal</span>
                                </div>
                            </div>
                        </div>

                        {/* Módulo 7 */}
                        <div className="border border-stone-200 rounded-2xl overflow-hidden bg-white shadow-sm">
                            <div className="bg-stone-50 px-6 py-4 border-b border-stone-100 font-bold text-stone-800 flex items-center gap-3">
                                <span className="bg-stone-200 text-stone-700 py-1 px-3 rounded text-sm">Módulo 7</span>
                                Técnicas prácticas para calmarte
                            </div>
                            <div className="p-6 space-y-3">
                                <div className="flex items-start gap-3 text-stone-600">
                                    <CheckCircle2 className="w-5 h-5 text-[#E07A5F] mt-0.5" />
                                    <span>Clase 14: Acceso al tema: Técnicas prácticas</span>
                                </div>
                                <div className="flex items-start gap-3 text-stone-600">
                                    <Star className="w-5 h-5 text-yellow-500 mt-0.5" />
                                    <span>Clase 15: Scripts de técnicas (bonus)</span>
                                </div>
                            </div>
                        </div>

                        {/* Módulo 8 */}
                        <div className="border border-stone-200 rounded-2xl overflow-hidden bg-white shadow-sm">
                            <div className="bg-stone-50 px-6 py-4 border-b border-stone-100 font-bold text-stone-800 flex items-center gap-3">
                                <span className="bg-stone-200 text-stone-700 py-1 px-3 rounded text-sm">Módulo 8</span>
                                Ayuda profesional y cierre
                            </div>
                            <div className="p-6 space-y-3">
                                <div className="flex items-start gap-3 text-stone-600">
                                    <CheckCircle2 className="w-5 h-5 text-[#E07A5F] mt-0.5" />
                                    <span>Clase 16: Acceso al tema: Cuándo buscar ayuda</span>
                                </div>
                                <div className="flex items-start gap-3 text-stone-600">
                                    <CheckCircle2 className="w-5 h-5 text-[#E07A5F] mt-0.5" />
                                    <span>Clase 17: Acceso al tema: Conclusión y recursos</span>
                                </div>
                            </div>
                        </div>

                        {/* Bonus */}
                        <div className="border border-stone-200 rounded-2xl overflow-hidden bg-white shadow-sm">
                            <div className="bg-[#E07A5F]/5 px-6 py-4 border-b border-[#E07A5F]/20 font-bold text-stone-800 flex items-center gap-3">
                                <span className="bg-[#E07A5F]/20 text-[#E07A5F] py-1 px-3 rounded text-sm">Bonus</span>
                                Material Extra
                            </div>
                            <div className="p-6 space-y-3">
                                <div className="flex items-start gap-3 text-stone-600">
                                    <Star className="w-5 h-5 text-yellow-500 mt-0.5" />
                                    <span>Clase 18: Tu Plan de Acción Personalizado</span>
                                </div>
                                <div className="flex items-start gap-3 text-stone-600">
                                    <Star className="w-5 h-5 text-yellow-500 mt-0.5" />
                                    <span>Clase 19: Recursos extra</span>
                                </div>
                            </div>
                        </div>

                        {/* Módulo Final */}
                        <div className="border-2 border-[#E07A5F] rounded-2xl overflow-hidden shadow-lg shadow-[#E07A5F]/10">
                            <div className="bg-[#E07A5F] px-6 py-4 text-white font-bold flex items-center gap-3">
                                <span className="bg-white text-[#E07A5F] py-1 px-3 rounded text-sm font-bold">IMPORTANTE</span>
                                Módulo Final
                            </div>
                            <div className="p-6 bg-white">
                                <div className="flex items-start gap-4 text-stone-700 font-medium">
                                    <div className="bg-[#E07A5F]/10 p-2 rounded-lg">
                                        <Download className="w-6 h-6 text-[#E07A5F]" />
                                    </div>
                                    <div>
                                        <span className="text-lg font-bold block mb-1">Descarga del Ebook Completo</span>
                                        <p className="text-sm text-stone-500 font-normal">
                                            Para garantizar tu satisfacción y el buen uso del material, la descarga del archivo PDF completo se desbloqueará automáticamente tras el periodo de garantía de 15 días.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Testimonials Section */}
                <div className="container mx-auto px-6 max-w-6xl mt-24 border-t border-stone-200 pt-16">
                    <h2 className="text-2xl font-bold text-stone-900 mb-10 text-center">Lo que dicen otros padres</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Testimonial 1 */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 flex flex-col h-full">
                            <div className="flex text-yellow-500 mb-4">{"★★★★★"}</div>
                            <p className="text-stone-600 mb-6 text-sm leading-relaxed flex-1">
                                "La 'carga mental' me estaba consumiendo. Este libro me hizo ver que pedir ayuda no es fracasar, sino una responsabilidad. Entender por qué me sentía así biológicamente cambió mi postparto por completo."
                            </p>
                            <div className="flex items-center gap-4 mt-auto">
                                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm shrink-0">
                                    <Image
                                        src="/images/testimonials/testimonial-1.jpg"
                                        alt="María López"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-stone-900">María López</p>
                                    <p className="text-xs text-stone-400">Mamá de un bebé de 4 meses</p>
                                </div>
                            </div>
                        </div>

                        {/* Testimonial 2 */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 flex flex-col h-full">
                            <div className="flex text-yellow-500 mb-4">{"★★★★★"}</div>
                            <p className="text-stone-600 mb-6 text-sm leading-relaxed flex-1">
                                "El capítulo sobre el estrés y la falta de sueño fue revelador. Dejé de luchar contra mi realidad y empecé a usar las herramientas prácticas para gestionarla. Por fin siento que tengo el control de nuevo."
                            </p>
                            <div className="flex items-center gap-4 mt-auto">
                                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm shrink-0">
                                    <Image
                                        src="/images/testimonials/testimonial-2.jpg"
                                        alt="Carlos Ruiz"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-stone-900">Carlos Ruiz</p>
                                    <p className="text-xs text-stone-400">Papá primerizo</p>
                                </div>
                            </div>
                        </div>

                        {/* Testimonial 3 */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 flex flex-col h-full">
                            <div className="flex text-yellow-500 mb-4">{"★★★★★"}</div>
                            <p className="text-stone-600 mb-6 text-sm leading-relaxed flex-1">
                                "Necesitaba esto: validación emocional pura. Saber que mis emociones 'crudas' son compartidas por millones de padres y tienen una explicación científica me quitó la culpa de golpe. Gracias."
                            </p>
                            <div className="flex items-center gap-4 mt-auto">
                                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm shrink-0">
                                    <Image
                                        src="/images/testimonials/testimonial-3.jpg"
                                        alt="Ana Sánchez"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-stone-900">Ana Sánchez</p>
                                    <p className="text-xs text-stone-400">Mamá de un bebé de 8 meses</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Author Section Integration */}
                <div className="mt-20">
                    <AuthorSection />
                </div>

                {/* FAQ Section */}
                <div className="container mx-auto px-6 max-w-4xl mt-20 mb-20">
                    <h2 className="text-2xl font-bold text-stone-900 mb-8 text-center">Preguntas Frecuentes</h2>
                    <div className="space-y-4">
                        <details className="group bg-white rounded-xl border border-stone-100 shadow-sm [&_summary::-webkit-details-marker]:hidden">
                            <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-6 text-stone-900 font-bold hover:bg-stone-50 transition">
                                <span>¿Cómo recibo el libro?</span>
                                <span className="shrink-0 rounded-full bg-white p-1.5 text-stone-900 sm:p-3 group-open:-rotate-180 transition duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="size-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </span>
                            </summary>
                            <p className="px-6 pb-6 text-stone-600 leading-relaxed">
                                Recibirás acceso inmediato a la plataforma de Hotmart. Los 11 módulos del curso se irán activando progresivamente uno a uno. Todo el contenido se gestiona de forma sencilla y segura a través de dicha plataforma.
                            </p>
                        </details>

                        <details className="group bg-white rounded-xl border border-stone-100 shadow-sm [&_summary::-webkit-details-marker]:hidden">
                            <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-6 text-stone-900 font-bold hover:bg-stone-50 transition">
                                <span>¿Puedo leerlo en el móvil?</span>
                                <span className="shrink-0 rounded-full bg-white p-1.5 text-stone-900 sm:p-3 group-open:-rotate-180 transition duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="size-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </span>
                            </summary>
                            <p className="px-6 pb-6 text-stone-600 leading-relaxed">
                                Sí, el formato está 100% optimizado para leerse cómodamente en cualquier dispositivo: móvil, tablet, ordenador o tu lector de libros electrónicos favorito.
                            </p>
                        </details>

                        <details className="group bg-white rounded-xl border border-stone-100 shadow-sm [&_summary::-webkit-details-marker]:hidden">
                            <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-6 text-stone-900 font-bold hover:bg-stone-50 transition">
                                <span>¿Qué pasa si no me sirve?</span>
                                <span className="shrink-0 rounded-full bg-white p-1.5 text-stone-900 sm:p-3 group-open:-rotate-180 transition duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="size-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </span>
                            </summary>
                            <p className="px-6 pb-6 text-stone-600 leading-relaxed">
                                Tienes 15 días de garantía total. Si sientes que el contenido no te aporta valor o no resuena contigo, nos escribes a través de Hotmart y te devolvemos el 100% de tu dinero. Sin preguntas ni letras pequeñas.
                            </p>
                        </details>

                        <details className="group bg-white rounded-xl border border-stone-100 shadow-sm [&_summary::-webkit-details-marker]:hidden">
                            <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-6 text-stone-900 font-bold hover:bg-stone-50 transition">
                                <span>¿Para qué edad es adecuado?</span>
                                <span className="shrink-0 rounded-full bg-white p-1.5 text-stone-900 sm:p-3 group-open:-rotate-180 transition duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="size-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </span>
                            </summary>
                            <p className="px-6 pb-6 text-stone-600 leading-relaxed">
                                Aunque el ebook se centra en los desafíos inmensos del primer año (0-12 meses) y el puerperio, las herramientas de gestión emocional, comunicación en pareja y autocuidado te servirán como base sólida para toda la crianza.
                            </p>
                        </details>
                    </div>
                </div>

            </main>

            {/* Sticky Mobile CTA */}
            <div className="fixed bottom-0 left-0 w-full bg-white border-t border-stone-200 p-4 lg:hidden z-50 shadow-[0_-5px_15px_rgba(0,0,0,0.05)]">
                <div className="flex items-center justify-between gap-4">
                    <div className="flex flex-col">
                        <span className="text-xs text-stone-500 font-medium line-through">
                            {product.originalPrice ? `${product.originalPrice}€` : ''}
                        </span>
                        <span className="text-xl font-bold text-stone-900 leading-none">
                            {product.price}€
                        </span>
                    </div>
                    <a
                        href="https://pay.hotmart.com/N103419626V"
                        className="bg-[#E07A5F] hover:bg-[#D06950] text-white font-bold py-3 px-6 rounded-xl flex-1 text-center shadow-lg active:scale-95 transition"
                    >
                        Comprar Ahora
                    </a>
                </div>
            </div>

        </div>
    );
}
