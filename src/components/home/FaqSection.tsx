import { HelpCircle } from "lucide-react";

export default function FaqSection() {
    const faqs = [
        {
            q: "¿Cómo accedo al contenido?",
            a: "El acceso es 100% digital e inmediato. Al realizar la compra, recibirás un email con el enlace de descarga o acceso a la plataforma, dependiendo del recurso."
        },
        {
            q: "¿Sirve para todas las edades?",
            a: "Tenemos recursos específicos para cada etapa: desde guías de sueño para bebés hasta cursos de comunicación para padres de adolescentes. Verifica en la descripción de cada producto para quién está diseñado."
        },
        {
            q: "¿Tengo garantía?",
            a: "Sí. Queremos que compres con confianza. Tienes 14 días de garantía de devolución si el contenido no cumple con tus expectativas."
        },
        {
            q: "¿Necesito ayuda extra?",
            a: (
                <>
                    Si tienes alguna duda técnica o sobre qué recurso elegir, escríbenos a <a href="mailto:padresconresiliencia@gmail.com" className="text-[#E07A5F] font-bold hover:underline">padresconresiliencia@gmail.com</a> y te orientaremos encantados.
                </>
            )
        }
    ];

    return (
        <section className="py-24 bg-stone-50">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <span className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full text-[#E07A5F] font-bold text-sm shadow-sm mb-4">
                        <HelpCircle className="w-4 h-4" /> Dudas Frecuentes
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-stone-900">Resolvemos tus inquietudes</h2>
                </div>

                <div className="max-w-3xl mx-auto space-y-4">
                    {faqs.map((faq, i) => (
                        <div key={i} className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-stone-100 hover:shadow-md transition-shadow">
                            <h3 className="font-bold text-lg text-stone-900 mb-3">{faq.q}</h3>
                            <div className="text-stone-600 leading-relaxed">{faq.a}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
