import { Star } from "lucide-react";

export default function SocialProofSection() {
    const testimonials = [
        {
            text: "Pensé que nunca volvería a dormir. En 3 días aplicando el módulo de sueño, pasamos de 5 despertares a solo 1. Gracias.",
            author: "María G.",
            role: "Mamá primeriza",
            initial: "M",
            color: "bg-orange-100 text-orange-600"
        },
        {
            text: "Lo compré por desesperación y me sorprendió la parte emocional. Me ayudó a entender mis propios miedos. Muy recomendado.",
            author: "Carlos R.",
            role: "Papá de Sofía",
            initial: "C",
            color: "bg-blue-100 text-blue-600"
        },
        {
            text: "Directo al grano. Sin paja. Justo lo que necesitas cuando no tienes tiempo ni energía.",
            author: "Carla D.",
            role: "Mamá de mellizos",
            initial: "C",
            color: "bg-yellow-100 text-yellow-600"
        }
    ];

    return (
        <section className="py-24 bg-white border-y border-stone-100">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">Lo que dicen otros padres</h2>
                    <p className="text-stone-500 max-w-2xl mx-auto">Más de 500 familias ya han recuperado la calma con nuestros recursos.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="bg-stone-50 p-8 rounded-2xl border border-stone-100">
                            <div className="flex gap-1 mb-4 text-[#E07A5F]">
                                {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="w-4 h-4 fill-current" />)}
                            </div>
                            <p className="text-stone-700 leading-relaxed mb-6 font-medium">"{testimonial.text}"</p>
                            <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${testimonial.color}`}>
                                    {testimonial.initial}
                                </div>
                                <div>
                                    <div className="font-bold text-stone-900 text-sm">{testimonial.author}</div>
                                    <div className="text-xs text-stone-500">{testimonial.role}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
