import Image from 'next/image';
import { Quote } from 'lucide-react';

export default function AuthorSection() {
    return (
        <section id="nosotros" className="py-24 bg-white relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#E07A5F]/5 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>

            <div className="container mx-auto px-6">
                <div className="max-w-5xl mx-auto bg-[#FDFBF7] rounded-3xl p-8 md:p-12 shadow-xl shadow-stone-200/50 border border-stone-100 flex flex-col md:flex-row items-center gap-12 relative overflow-hidden">

                    {/* Decorative element */}
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#E07A5F] to-orange-200"></div>

                    {/* Image Column */}
                    <div className="relative shrink-0">
                        <div className="absolute inset-0 bg-[#E07A5F] rounded-2xl rotate-3 opacity-20 scale-105"></div>
                        <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden border-4 border-white shadow-lg rotate-[-2deg] transition hover:rotate-0 duration-500">
                            <Image
                                src="/maximo tq.png"
                                alt="Máximo - Autor de Padres con Resiliencia"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>

                    {/* Text Column */}
                    <div className="text-center md:text-left flex-1">
                        <span className="inline-block text-[#E07A5F] font-bold tracking-widest uppercase text-xs mb-3">
                            Sobre Nosotros
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-6">
                            Hola, soy Máximo
                        </h2>
                        <div className="space-y-4 text-stone-600 leading-relaxed mb-8">
                            <p>
                                Entiendo perfectamente por lo que estás pasando porque yo también estuve ahí. Mi propósito con <strong>Padres con Resiliencia</strong> es acompañarte en este viaje, aportando claridad donde hay dudas y herramientas prácticas donde hay agotamiento.
                            </p>
                            <p>
                                No creo en las fórmulas mágicas, pero sí en el poder de la paciencia, el amor y el conocimiento para transformar la relación con nuestros hijos.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl p-6 border border-stone-100 flex gap-4 relative">
                            <Quote className="w-8 h-8 text-[#E07A5F]/20 absolute top-4 right-4" />
                            <div className="w-1 bg-[#E07A5F] rounded-full shrink-0"></div>
                            <p className="text-stone-500 italic text-sm font-medium">
                                "Mi misión es que cada padre y madre recupere la confianza en sí mismo para disfrutar de la etapa más importante de sus vidas."
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
