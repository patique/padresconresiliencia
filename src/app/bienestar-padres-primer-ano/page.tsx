import type { Metadata } from "next";
import { Check, Heart, Moon, Brain, Shield, Clock, BookOpen, Star, AlertCircle, X } from "lucide-react";

export const metadata: Metadata = {
    title: "Bienestar Emocional de los Padres | Guía Práctica",
    description: "Descubre el método para recuperar tu descanso, tu calma y tu pareja en el primer año de crianza.",
};

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
            {/* Navigation */}
            <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
                <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                    <span className="font-bold text-xl tracking-tight text-slate-900">Padres con Resiliencia</span>
                    <a
                        href="#oferta"
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-sm hover:shadow-md"
                    >
                        Comenzar Ahora
                    </a>
                </div>
            </nav>

            <main>
                {/* HERO SECTION */}
                <section className="relative pt-20 pb-32 overflow-hidden">
                    <div className="container mx-auto px-6">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div className="max-w-2xl">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wide mb-6">
                                    <Star className="w-3 h-3" fill="currentColor" />
                                    Método Comprobado 9 Pasos
                                </div>

                                <h1 className="text-4xl lg:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
                                    Recupera el Sueño, la Calma y la Conexión <br />
                                    <span className="text-emerald-600">sin dejar de ser tú misma.</span>
                                </h1>

                                <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                                    La guía paso a paso para padres que quieren salir del "modo supervivencia", gestionar la culpa y volver a disfrutar de la vida familiar.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <a href="#oferta" className="inline-flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white text-lg font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-emerald-500/20 transition-all transform hover:-translate-y-1">
                                        Quiero Recuperar mi Vida
                                    </a>
                                    <div className="flex items-center gap-4 px-4 py-2 text-sm text-slate-500">
                                        <div className="flex -space-x-2">
                                            {/* Placeholder avatars based on colors strictly */}
                                            <div className="w-8 h-8 rounded-full bg-blue-100 border-2 border-white"></div>
                                            <div className="w-8 h-8 rounded-full bg-green-100 border-2 border-white"></div>
                                            <div className="w-8 h-8 rounded-full bg-orange-100 border-2 border-white"></div>
                                        </div>
                                        <span>Únete a +100 padres</span>
                                    </div>
                                </div>
                            </div>

                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-200/20 to-blue-200/20 rounded-3xl transform rotate-3 scale-105 -z-10"></div>
                                <img
                                    src="/hero_baby_crying.jpg"
                                    alt="Padres buscando soluciones"
                                    className="rounded-2xl shadow-2xl border border-slate-100 w-full object-cover aspect-[4/3]"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* AGITATION: THE SILENT STRUGGLE */}
                <section className="py-24 bg-white">
                    <div className="container mx-auto px-6 max-w-4xl">
                        <h2 className="text-3xl lg:text-4xl font-bold text-center text-slate-900 mb-4">
                            ¿Te han dicho que "es solo una etapa"?
                        </h2>
                        <p className="text-xl text-center text-slate-500 mb-16">
                            Quizás sea cierto, pero tú sientes que te estás ahogando ahora mismo.
                        </p>

                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-red-100 transition-colors group">
                                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <AlertCircle className="w-6 h-6 text-red-600" />
                                </div>
                                <h3 className="font-bold text-xl text-slate-900 mb-3">Irritabilidad</h3>
                                <p className="text-slate-600 leading-relaxed">
                                    Te asusta la rabia que sientes cuando el bebé no se duerme. No eres mala persona, estás simplemente agotada.
                                </p>
                            </div>

                            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors group">
                                <div className="w-12 h-12 bg-slate-200 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <Brain className="w-6 h-6 text-slate-700" />
                                </div>
                                <h3 className="font-bold text-xl text-slate-900 mb-3">Duelo de Identidad</h3>
                                <p className="text-slate-600 leading-relaxed">
                                    Amas a tu hijo, pero extrañas tu antigua libertad y tu cuerpo. Y encima, te sientes culpable por pensarlo.
                                </p>
                            </div>

                            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors group">
                                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <Heart className="w-6 h-6 text-blue-600" />
                                </div>
                                <h3 className="font-bold text-xl text-slate-900 mb-3">Pareja "Roommate"</h3>
                                <p className="text-slate-600 leading-relaxed">
                                    Las conversaciones son solo logística. Miras a tu pareja y sientes distancia, como compañeros de piso gestionando una crisis.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SOLUTION */}
                <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
                    {/* Abstract Background Design */}
                    <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                        <div className="absolute right-0 top-0 w-96 h-96 bg-emerald-500 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
                        <div className="absolute left-0 bottom-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
                    </div>

                    <div className="container mx-auto px-6 relative z-10">
                        <div className="max-w-3xl mx-auto text-center mb-20">
                            <h2 className="text-3xl lg:text-5xl font-bold mb-6">Tu Hoja de Ruta para Volver a Vivir</h2>
                            <p className="text-xl text-slate-300">
                                Un sistema integral que aborda las 3 columnas de tu bienestar: sueño, mente y relación.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                            {/* Card 1 */}
                            <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 hover:border-emerald-500/50 transition-all">
                                <div className="w-14 h-14 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-6">
                                    <Moon className="w-8 h-8 text-emerald-400" />
                                </div>
                                <h3 className="text-2xl font-bold mb-4">1. Sueño Reparador</h3>
                                <p className="text-slate-400 leading-relaxed">
                                    Entiende la biología del sueño infantil y aplica estrategias respetuosas para que todos descanséis más horas seguidas.
                                </p>
                            </div>

                            {/* Card 2 */}
                            <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 hover:border-emerald-500/50 transition-all">
                                <div className="w-14 h-14 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-6">
                                    <Brain className="w-8 h-8 text-emerald-400" />
                                </div>
                                <h3 className="text-2xl font-bold mb-4">2. Calma Mental</h3>
                                <p className="text-slate-400 leading-relaxed">
                                    Herramientas prácticas para reducir el cortisol, gestionar la ansiedad posparto y recuperar tu paciencia en minutos.
                                </p>
                            </div>

                            {/* Card 3 */}
                            <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 hover:border-emerald-500/50 transition-all">
                                <div className="w-14 h-14 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-6">
                                    <Heart className="w-8 h-8 text-emerald-400" />
                                </div>
                                <h3 className="text-2xl font-bold mb-4">3. Reconexión</h3>
                                <p className="text-slate-400 leading-relaxed">
                                    Deja de competir por ver quién está más cansado y vuelve a ser un equipo. Rituales de 5 minutos que cambian el día.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* AUTHOR BIO - PROFESSIONAL */}
                <section className="py-24 bg-white border-b border-slate-100">
                    <div className="container mx-auto px-6 max-w-4xl">
                        <div className="flex flex-col md:flex-row items-center gap-10">
                            <div className="w-40 h-40 shrink-0 relative">
                                <div className="absolute inset-0 bg-slate-200 rounded-full transform translate-x-1 translate-y-1"></div>
                                <img src="/maximo tq.png" alt="Máximo TQ" className="w-full h-full object-cover rounded-full relative z-10 border-4 border-white shadow-xl" />
                            </div>
                            <div className="text-center md:text-left flex-1">
                                <div className="inline-block px-3 py-1 bg-slate-100 rounded-md text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">El Autor</div>
                                <h3 className="text-3xl font-bold text-slate-900 mb-4">Hola, soy Máximo TQ</h3>
                                <blockquote className="text-xl text-slate-600 italic mb-6">
                                    "Escribí esta guía porque yo también estuve ahí. Sé lo que es sentir que fallas, que no sabes lo que haces y que el cansancio te roba la alegría."
                                </blockquote>
                                <p className="text-slate-500 leading-relaxed">
                                    Creador de <strong>Padres con Resiliencia</strong>. Mi misión es acompañarte para que disfrutes de la crianza real, con sus luces y sus sombras, pero siempre desde la calma y el amor, no desde la supervivencia.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* PRICING TABLE - "VALUE STACK" */}
                <section id="oferta" className="py-24 bg-slate-50">
                    <div className="container mx-auto px-6 max-w-6xl">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <img src="/ebook_cover_real.jpg" alt="Pack Completo" className="rounded-2xl shadow-2xl w-full max-w-md mx-auto transform hover:rotate-2 transition-all duration-500" />
                            </div>

                            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-slate-100">
                                <h2 className="text-3xl font-bold text-slate-900 mb-2">Pack Bienestar Total</h2>
                                <p className="text-slate-500 mb-8">Acceso inmediato digital a todo el sistema.</p>

                                <div className="space-y-4 mb-8">
                                    <div className="flex justify-between items-center p-4 bg-slate-50 rounded-xl border border-slate-100">
                                        <div className="flex items-center gap-3">
                                            <BookOpen className="w-5 h-5 text-emerald-600" />
                                            <span className="font-medium text-slate-700">Ebook "Bienestar para Padres"</span>
                                        </div>
                                        <span className="font-bold text-slate-400">47€</span>
                                    </div>
                                    <div className="flex justify-between items-center p-4 bg-slate-50 rounded-xl border border-slate-100">
                                        <div className="flex items-center gap-3">
                                            <Moon className="w-5 h-5 text-emerald-600" />
                                            <span className="font-medium text-slate-700">Bonus: Plan de Sueño</span>
                                        </div>
                                        <span className="font-bold text-slate-400">19€</span>
                                    </div>
                                    <div className="flex justify-between items-center p-4 bg-slate-50 rounded-xl border border-slate-100">
                                        <div className="flex items-center gap-3">
                                            <Heart className="w-5 h-5 text-emerald-600" />
                                            <span className="font-medium text-slate-700">Bonus: Guía de Pareja</span>
                                        </div>
                                        <span className="font-bold text-slate-400">25€</span>
                                    </div>
                                    <div className="flex justify-between items-center p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                                        <div className="flex items-center gap-3">
                                            <Check className="w-5 h-5 text-emerald-600" />
                                            <span className="font-bold text-emerald-900">Bonus: Plan de Acción</span>
                                        </div>
                                        <span className="font-bold text-emerald-700">29€</span>
                                    </div>
                                </div>

                                <div className="flex items-baseline justify-between mb-8 border-t border-slate-100 pt-6">
                                    <span className="text-lg font-medium text-slate-500">Valor Total Real</span>
                                    <div className="text-right">
                                        <span className="block text-xl text-slate-400 line-through decoration-red-400">120€</span>
                                        <span className="block text-5xl font-extrabold text-slate-900 tracking-tight">19,90€</span>
                                    </div>
                                </div>

                                <a
                                    href="https://pay.hotmart.com/N103419626V"
                                    className="block w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xl py-5 rounded-xl text-center shadow-lg hover:shadow-emerald-500/25 transition-all transform hover:-translate-y-0.5"
                                >
                                    Descargar Todo Ahora
                                </a>

                                <div className="mt-6 flex items-center justify-center gap-2 text-slate-500 text-sm">
                                    <Shield className="w-4 h-4" />
                                    <span>Garantía de devolución de 15 días sin preguntas</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* QUALIFICATION - "IS THIS FOR ME?" */}
                <section className="py-24 bg-white">
                    <div className="container mx-auto px-6 max-w-5xl">
                        <div className="grid md:grid-cols-2 border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
                            <div className="bg-red-50/50 p-10 md:p-12 border-b md:border-b-0 md:border-r border-slate-100">
                                <h3 className="text-red-900 font-bold text-xl mb-6 flex items-center gap-2">
                                    <X className="w-6 h-6 text-red-500" /> Este programa NO es para ti si...
                                </h3>
                                <ul className="space-y-4 text-slate-700">
                                    <li className="flex gap-3">
                                        <span className="text-red-400">•</span>
                                        Buscas una fórmula mágica instantánea para que tu bebé no llore nunca.
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="text-red-400">•</span>
                                        Crees que la crianza es solo "instinto" y no se puede aprender.
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="text-red-400">•</span>
                                        No estás dispuesto/a a mirar hacia adentro y trabajar tus propias emociones.
                                    </li>
                                </ul>
                            </div>
                            <div className="bg-emerald-50/50 p-10 md:p-12">
                                <h3 className="text-emerald-900 font-bold text-xl mb-6 flex items-center gap-2">
                                    <Check className="w-6 h-6 text-emerald-500" /> SÍ es para ti si...
                                </h3>
                                <ul className="space-y-4 text-slate-700">
                                    <li className="flex gap-3">
                                        <span className="text-emerald-500">•</span>
                                        Quieres herramientas reales basadas en la psicología y el desarrollo.
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="text-emerald-500">•</span>
                                        Estás listo/a para priorizar tu bienestar mental para cuidar mejor.
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="text-emerald-500">•</span>
                                        Quieres recuperar tu relación de pareja y disfrutar del viaje.
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FOOTER */}
                <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
                    <div className="container mx-auto px-6 text-center">
                        <p className="mb-6">&copy; {new Date().getFullYear()} Padres con Resiliencia. Todos los derechos reservados.</p>
                        <div className="flex justify-center gap-8 text-sm font-medium">
                            <a href="#" className="hover:text-white transition-colors">Aviso Legal</a>
                            <a href="#" className="hover:text-white transition-colors">Política de Privacidad</a>
                            <a href="mailto:padresconresiliencia@gmail.com" className="hover:text-white transition-colors">Contacto</a>
                        </div>
                    </div>
                </footer>
            </main>
        </div>
    );
}
