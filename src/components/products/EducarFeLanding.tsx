"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, Star, ShieldCheck, Heart, Zap, Clock, Sun, BookOpen, Loader2, CloudRain, X } from "lucide-react";
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");

        const formData = new FormData();
        formData.append("email", email);
        formData.append("topic", "Educar en la Fe");

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
                        <div className="inline-flex items-center gap-2 bg-[#E07A5F]/10 text-[#E07A5F] px-4 py-1.5 rounded-full text-sm font-bold tracking-wide mb-8">
                            <Star className="w-4 h-4 fill-current" />
                            <span>PRÓXIMAMENTE: MÉTODO "ESPIRITUALIDAD RESILIENTE"</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-stone-900 mb-6 leading-tight">
                            ¿Y si la Fe no fuera otra tarea más, sino el <span className="text-[#E07A5F] underline decoration-4 decoration-[#E07A5F]/20">Refugio</span> al que tus hijos querrán volver siempre?
                        </h1>
                        <p className="text-xl md:text-2xl text-stone-600 leading-relaxed max-w-2xl mx-auto">
                            Deja de ser el "policía de Dios" y conviértete en el guía que contagia el asombro. Apúntate a la lista de espera para ser el primero en enterarte del lanzamiento.
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
                                    className="rounded-2xl shadow-2xl border-8 border-white grayscale hover:grayscale-0 transition duration-500"
                                    priority
                                />
                            </div>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#E07A5F]/20 blur-3xl rounded-full -z-10"></div>
                        </div>

                        <div className="order-1 md:order-2 flex flex-col gap-6">
                            <div className="bg-white p-8 rounded-2xl shadow-lg border border-stone-100 relative overflow-hidden">
                                {status === "success" ? (
                                    <div className="text-center py-8 animate-in fade-in zoom-in duration-300">
                                        <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Check className="w-8 h-8 text-green-600" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-stone-900 mb-2">¡Estás dentro!</h3>
                                        <p className="text-stone-600">Te avisaremos en cuanto abramos las puertas. Prepárate para el asombro.</p>
                                    </div>
                                ) : (
                                    <>
                                        <h3 className="text-2xl font-bold text-stone-900 mb-2">Únete a la Lista de Espera</h3>
                                        <p className="text-stone-600 mb-6">Este recurso aún no está disponible para el público general. Déjanos tu email para tener acceso prioritario y un descuento de lanzamiento.</p>

                                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                            <input
                                                type="email"
                                                required
                                                placeholder="Tu mejor email..."
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="w-full px-5 py-3 rounded-xl border border-stone-200 focus:border-[#E07A5F] focus:ring-2 focus:ring-[#E07A5F]/20 outline-none transition"
                                            />
                                            <button
                                                type="submit"
                                                disabled={status === "loading"}
                                                className="w-full bg-[#E07A5F] hover:bg-[#c96348] text-white font-bold text-lg py-3 rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                            >
                                                {status === "loading" && <Loader2 className="w-5 h-5 animate-spin" />}
                                                {status === "loading" ? "Apuntando..." : "Avísame cuando salga"}
                                            </button>
                                        </form>
                                        <p className="text-center text-xs text-stone-400 mt-4 flex items-center justify-center gap-1">
                                            <ShieldCheck className="w-3 h-3" /> Sin spam. Solo asombro.
                                        </p>
                                    </>
                                )}
                            </div>
                            <div className="flex flex-col gap-3 text-stone-600 pl-2">
                                <div className="flex items-center gap-2"><Check className="w-5 h-5 text-green-500 shrink-0" /> <span>Lectura ágil y directa (sin teología compleja)</span></div>
                                <div className="flex items-center gap-2"><Check className="w-5 h-5 text-green-500 shrink-0" /> <span>Estrategias por edad (0 a 12+ años)</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* --- AGITATION: THE NIGHTMARE SCENARIO --- */}
            <section className="py-24 bg-white relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-[#FDFBF7] to-white z-10"></div>
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="text-center mb-16">
                        <span className="text-red-500 font-bold tracking-widest uppercase text-xs mb-2 block animate-pulse">La Verdad Incómoda</span>
                        <h2 className="text-3xl md:text-5xl font-extrabold text-stone-900 leading-tight">
                            ¿Estás vacunando a tus hijos contra la Fe sin darte cuenta? 💉
                        </h2>
                    </div>

                    <div className="prose prose-lg text-stone-600 mx-auto leading-relaxed mb-16">
                        <p>
                            Es una escena que se repite en miles de hogares cada domingo. Tú estás nervioso, mirando el reloj. Ellos están quejándose, arrastrando los pies.
                        </p>
                        <p className="font-bold text-stone-800">
                            <em>"¡Si no te vistes ya, no vamos al parque luego!" "¡En Misa se está callado porque lo digo yo!"</em>
                        </p>
                        <p>
                            Y ahí, en ese preciso instante, algo se rompe. Sin querer, estás enseñando que Dios es una <strong>obligación pesada</strong>, un peaje que hay que pagar para que "papá no se enfade".
                        </p>
                        <p>
                            El resultado es devastador: A los 8 años obedecen por miedo. A los 12 se aburren. A los 15, cuando tú ya no tienes el control, <strong>se marchan para no volver.</strong>
                        </p>
                    </div>

                    <div className="bg-stone-50 rounded-3xl p-8 md:p-12 border border-stone-100 shadow-xl relative overflow-hidden group hover:shadow-2xl transition duration-500">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-red-100 rounded-full blur-3xl opacity-50 -mr-20 -mt-20"></div>
                        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
                            <div className="md:w-1/2">
                                <h3 className="text-2xl font-bold text-stone-900 mb-4">El "Efecto Rebote" Espiritual</h3>
                                <ul className="space-y-4">
                                    <li className="flex gap-3 text-stone-700 items-start">
                                        <div className="bg-red-100 p-1.5 rounded-full mt-1 shrink-0"><CloudRain className="w-4 h-4 text-red-500" /></div>
                                        <span>Asociar a Dios con el <strong>castigo</strong> y el aburrimiento.</span>
                                    </li>
                                    <li className="flex gap-3 text-stone-700 items-start">
                                        <div className="bg-red-100 p-1.5 rounded-full mt-1 shrink-0"><CloudRain className="w-4 h-4 text-red-500" /></div>
                                        <span>Sentirse culpables por tener dudas naturales.</span>
                                    </li>
                                    <li className="flex gap-3 text-stone-700 items-start">
                                        <div className="bg-red-100 p-1.5 rounded-full mt-1 shrink-0"><CloudRain className="w-4 h-4 text-red-500" /></div>
                                        <span>Buscar respuestas en TikTok porque en casa solo hay silencio o dogmas rígidos.</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="md:w-1/2 relative h-64 w-full rounded-xl overflow-hidden shadow-lg rotate-2 group-hover:rotate-0 transition duration-500">
                                <Image
                                    src="/images/educar-fe-adolescente.png"
                                    alt="Adolescente desconectado"
                                    fill
                                    className="object-cover grayscale group-hover:grayscale-0 transition duration-700"
                                />
                                <div className="absolute inset-0 bg-stone-900/20 group-hover:bg-transparent transition"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- THE DREAM SCENARIO --- */}
            <section className="py-24 bg-[#E07A5F] text-white overflow-hidden relative">
                <div className="absolute inset-0 bg-[url('/images/pattern-light.png')] opacity-10 mix-blend-overlay"></div>

                <div className="container mx-auto px-6 max-w-5xl relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">Pero imagina por un momento que fuera distinto... ✨</h2>
                        <p className="text-xl md:text-2xl text-stone-100 max-w-3xl mx-auto font-light">
                            Imagina que la fe no fuera una "lección" que les das, sino el aire que respiráis en casa juntos.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 transform hover:scale-105 transition duration-500">
                            <Image
                                src="/images/educar-fe-orando.png"
                                alt="Padre e hija orando felices"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="space-y-8">
                            <div className="flex gap-4">
                                <div className="bg-white/20 p-3 rounded-full h-fit"><Sun className="w-8 h-8 text-yellow-300" /></div>
                                <div>
                                    <h4 className="text-xl font-bold mb-2">De la Batalla a la Conexión</h4>
                                    <p className="text-stone-100 leading-relaxed opacity-90">
                                        Imagina que, al acostarse, tu hija no te pide otro cuento para alargar el tiempo, sino que te dice: <em>"Papá, ¿rezamos juntos para dar las gracias por el día?"</em>. Y lo hace sonriendo.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="bg-white/20 p-3 rounded-full h-fit"><ShieldCheck className="w-8 h-8 text-yellow-300" /></div>
                                <div>
                                    <h4 className="text-xl font-bold mb-2">Un Refugio en la Tormenta</h4>
                                    <p className="text-stone-100 leading-relaxed opacity-90">
                                        Imagina que tu hijo adolescente llega del colegio tras un mal día. No se encierra. Se sienta contigo y te dice: <em>"Mamá, hoy he sentido que Dios estaba lejos... ¿a ti te pasa a veces?"</em>. Y podéis hablar de ello sin miedo.
                                    </p>
                                </div>
                            </div>

                            <div className="bg-white/10 p-6 rounded-xl border border-white/20 backdrop-blur-sm mt-8">
                                <p className="font-serif italic text-lg text-center">
                                    "Esto no es una utopía. Es lo que sucede cuando cambias la OBLIGACIÓN por el ASOMBRO."
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- SCRIPT FLIP --- */}
            <section className="py-24 bg-[#FDFBF7]">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="text-center mb-16">
                        <span className="bg-stone-900 text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase">El Método Práctico</span>
                        <h2 className="text-3xl md:text-5xl font-bold text-stone-900 mt-4 mb-6">Pequeños cambios de guion, resultados gigantes</h2>
                        <p className="text-stone-600">No necesitas ser teólogo. Solo necesitas cambiar cómo hablas.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Example 1 */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-200">
                            <div className="flex items-center gap-3 mb-4 opacity-50">
                                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center font-bold text-red-500"><X className="w-4 h-4" /></div>
                                <span className="font-bold text-stone-400 uppercase text-sm">Antes (Modo Policía)</span>
                            </div>
                            <p className="text-stone-600 italic mb-6">"Pórtate bien que el Niño Jesús te está mirando y se va a enfadar."</p>

                            <div className="w-full h-px bg-stone-100 mb-6"></div>

                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center font-bold text-green-600"><Check className="w-4 h-4" /></div>
                                <span className="font-bold text-green-700 uppercase text-sm">Ahora (Modo Refugio)</span>
                            </div>
                            <p className="text-stone-800 font-medium">"Veo que estás muy enfadado y lo entiendo. Jesús también se enfadaba a veces. Cuando estés listo, vamos a pedirle juntos que nos ayude a hacer las paces."</p>
                        </div>
                        {/* Example 2 */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-200">
                            <div className="flex items-center gap-3 mb-4 opacity-50">
                                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center font-bold text-red-500"><X className="w-4 h-4" /></div>
                                <span className="font-bold text-stone-400 uppercase text-sm">Antes (Modo Sermón)</span>
                            </div>
                            <p className="text-stone-600 italic mb-6">"Tienes que ser agradecido porque hay niños que no tienen nada." (Culpa)</p>

                            <div className="w-full h-px bg-stone-100 mb-6"></div>

                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center font-bold text-green-600"><Check className="w-4 h-4" /></div>
                                <span className="font-bold text-green-700 uppercase text-sm">Ahora (Modo Asombro)</span>
                            </div>
                            <p className="text-stone-800 font-medium">"¡Guau! Mira qué comida más rica tenemos hoy. Vamos a meter un papelito en el Bote de la Gratitud para celebrar este regalo." (Gozo)</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- THE SOLUTION (MODULES DEEP DIVE WITH IMAGE) --- */}
            <section className="py-24 bg-white relative">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="flex flex-col lg:flex-row gap-16 items-start">
                        <div className="lg:w-1/3 sticky top-24">
                            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-6 leading-tight">
                                El Mapa Completo: <br /><span className="text-[#E07A5F]">De la Obligación al Asombro</span>
                            </h2>
                            <p className="text-stone-600 mb-8 leading-relaxed">
                                Más que un ebook es una hoja de ruta, paso a paso, desde los 0 años hasta la adolescencia, para construir una espiritualidad que dure toda la vida.
                            </p>
                            <div className="relative h-80 rounded-2xl overflow-hidden shadow-2xl rotate-1 hover:rotate-0 transition duration-500 border border-stone-100">
                                <Image
                                    src="/images/educar-fe-bote.png"
                                    alt="Familia feliz con bote de gratitud"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-stone-900/70 p-4 backdrop-blur-sm">
                                    <p className="text-white text-sm font-medium text-center">Incluye dinámicas prácticas para vivir en familia</p>
                                </div>
                            </div>
                        </div>

                        <div className="lg:w-2/3 grid gap-8">
                            {/* Module 1 */}
                            <div className="bg-stone-50 rounded-2xl p-8 flex gap-6 hover:bg-white hover:shadow-xl transition duration-300 border border-stone-100 group">
                                <div className="bg-white w-14 h-14 rounded-xl flex items-center justify-center text-[#E07A5F] shadow-sm shrink-0 font-bold text-xl group-hover:scale-110 transition">1</div>
                                <div>
                                    <h3 className="text-xl font-bold text-stone-900 mb-2">Fase 1: Sanar la Imagen de Dios</h3>
                                    <p className="text-stone-600 leading-relaxed mb-3">
                                        Desmontamos al "Dios Policía". Descubrirás cómo reparar el daño si has usado la fe como amenaza y cómo validar las emociones "negativas" de tu hijo como parte de su vida espiritual.
                                    </p>
                                </div>
                            </div>

                            {/* Module 2 */}
                            <div className="bg-stone-50 rounded-2xl p-8 flex gap-6 hover:bg-white hover:shadow-xl transition duration-300 border border-stone-100 group">
                                <div className="bg-white w-14 h-14 rounded-xl flex items-center justify-center text-[#E07A5F] shadow-sm shrink-0 font-bold text-xl group-hover:scale-110 transition">2</div>
                                <div>
                                    <h3 className="text-xl font-bold text-stone-900 mb-2">Fase 2: Magia y Asombro (0-7 años)</h3>
                                    <p className="text-stone-600 leading-relaxed mb-3">
                                        Olvídate de las clases teóricas. Aprenderás rituales sensoriales: La "Bendición de Contacto", la Teología de la Naturaleza y cómo orar con el cuerpo para niños inquietos.
                                    </p>
                                </div>
                            </div>

                            {/* Module 3 */}
                            <div className="bg-stone-50 rounded-2xl p-8 flex gap-6 hover:bg-white hover:shadow-xl transition duration-300 border border-stone-100 group">
                                <div className="bg-white w-14 h-14 rounded-xl flex items-center justify-center text-[#E07A5F] shadow-sm shrink-0 font-bold text-xl group-hover:scale-110 transition">3</div>
                                <div>
                                    <h3 className="text-xl font-bold text-stone-900 mb-2">Fase 3: La Madurez y la Crisis (7-12+ años)</h3>
                                    <p className="text-stone-600 leading-relaxed mb-3">
                                        El momento de la verdad. Cómo responder a "¿Por qué existe el mal?" sin mentir. Estrategias de supervivencia para la Misa. Y lo más importante: cómo acompañar la duda adolescente sin romper el vínculo.
                                    </p>
                                </div>
                            </div>

                            {/* BONUS */}
                            <div className="bg-gradient-to-r from-stone-900 to-stone-800 rounded-2xl p-8 text-white relative overflow-hidden shadow-2xl transform hover:scale-[1.02] transition duration-300">
                                <div className="absolute top-0 right-0 -mr-10 -mt-10 w-32 h-32 bg-[#E07A5F] rounded-full blur-3xl opacity-30"></div>
                                <div className="relative z-10">
                                    <div className="flex items-center gap-3 mb-4">
                                        <Heart className="file:text-[#E07A5F] fill-current text-[#E07A5F] w-6 h-6" />
                                        <span className="font-bold tracking-widest uppercase text-sm">Bonus Exclusivo: Kit "Fe en Acción"</span>
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4">Herramientas Anti-Teoría</h3>
                                    <ul className="grid sm:grid-cols-2 gap-4">
                                        <li className="flex items-center gap-2"><Check className="w-5 h-5 text-green-400" /> <span>El Bote de la Gratitud</span></li>
                                        <li className="flex items-center gap-2"><Check className="w-5 h-5 text-green-400" /> <span>Misiones Secretas de Servicio</span></li>
                                        <li className="flex items-center gap-2"><Check className="w-5 h-5 text-green-400" /> <span>Cinefórum con Valores</span></li>
                                        <li className="flex items-center gap-2"><Check className="w-5 h-5 text-green-400" /> <span>Recuperar tu Oasis Espiritual</span></li>
                                    </ul>
                                </div>
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

            {/* --- WAITING LIST CTA --- */}
            <section className="py-20 bg-[#E07A5F]">
                <div className="container mx-auto px-6 text-center max-w-4xl">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">El mejor legado que puedes dejarles no es dinero, es un Refugio.</h2>
                    <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-lg mx-auto transform hover:scale-105 transition duration-300">

                        <h3 className="text-2xl font-bold text-stone-900 mb-4">¿Te aviso cuando salga?</h3>
                        {status === "success" ? (
                            <div className="bg-green-50 p-4 rounded-xl">
                                <p className="text-green-700 font-bold">¡Apuntado! Te avisaremos pronto.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                <input
                                    type="email"
                                    required
                                    placeholder="Tu email aquí..."
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-5 py-3 rounded-xl border border-stone-200 outline-none focus:ring-2 focus:ring-[#E07A5F]"
                                />
                                <button type="submit" className="w-full bg-[#E07A5F] hover:bg-[#c96348] text-white font-bold text-xl py-4 rounded-xl shadow-lg transition disabled:opacity-70">
                                    {status === "loading" ? "Apuntando..." : "Sí, avísame"}
                                </button>
                            </form>
                        )}
                        <p className="text-stone-400 text-xs mt-4">Únete a otros 1.200 padres en la lista de espera.</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
