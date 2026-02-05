import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ShieldCheck, Download, Star, Check, Brain, AlertTriangle, Smartphone, Home, Shield, Sparkles } from "lucide-react";
import OfferCountdown from "@/components/ui/OfferCountdown";
import InternalRecommendations from "@/components/products/InternalRecommendations";
import ExternalRecommendations from "@/components/products/ExternalRecommendations";

interface Product {
    id: string;
    title: string;
    slug: string;
    description: string | null;
    price: number;
    originalPrice: number | null;
    imageUrl: string | null;
    affiliateLink: string | null;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

interface CerebroPantallasLandingProps {
    product: Product;
}

export default function CerebroPantallasLanding({ product }: CerebroPantallasLandingProps) {
    const testimonials = [
        {
            text: "Llevaba 3 años gritándole para que dejara el móvil. En 7 días, todo cambió. Ahora cenamos hablando de verdad.",
            author: "Laura M.",
            role: "Madre de dos (9 y 12 años)",
            initials: "LM",
            color: "blue"
        },
        {
            text: "Mi hijo sacaba sobresalientes. Desde que descubrió TikTok, empezó a suspender. Este libro me dio el plan exacto para recuperar su concentración.",
            author: "Carlos R.",
            role: "Padre de adolescente",
            initials: "CR",
            color: "purple"
        },
        {
            text: "No es otro libro de teoría. Son herramientas reales que funcionan. El Contrato Familiar está en mi nevera y lo cumplimos todos.",
            author: "Ana S.",
            role: "Maestra y madre",
            initials: "AS",
            color: "emerald"
        }
    ];

    const painPoints = [
        "Tu hijo grita cuando le quitas el móvil",
        "No puede concentrarse en los deberes más de 5 minutos",
        "Prefiere TikTok a jugar contigo",
        "Duerme con el móvil debajo de la almohada",
        "Has intentado poner límites, pero siempre acabas cediendo"
    ];

    const benefits = [
        {
            icon: Brain,
            title: "Por qué la dopamina barata está secuestrando su cerebro",
            description: "Y cómo revertirlo con neurociencia aplicada"
        },
        {
            icon: AlertTriangle,
            title: "El plan de desintoxicación de 7 días",
            description: "Paso a paso, sin teoría aburrida, con resultados reales"
        },
        {
            icon: Home,
            title: "Zonas Rojas en casa",
            description: "Dormitorio, mesa... donde las pantallas NO entran"
        },
        {
            icon: Shield,
            title: "El Contrato Familiar que funciona",
            description: "Sin gritos, con plantilla incluida lista para imprimir"
        },
        {
            icon: AlertTriangle,
            title: "Señales de alerta de ciberbullying",
            description: "Cómo detectarlo y actuar antes de que sea tarde"
        },
        {
            icon: Sparkles,
            title: "El superpoder del aburrimiento",
            description: "Por qué tu hijo NECESITA aburrirse para ser creativo"
        }
    ];

    const modules = [
        {
            emoji: "📖",
            title: "Introducción: La Niñera Digital",
            items: [
                "Por qué criar hoy es más difícil que nunca",
                "La mentira de \"todos sus amigos tienen uno\""
            ]
        },
        {
            emoji: "🧠",
            title: "Módulo 1: Anatomía de un Secuestro",
            items: [
                "Dopamina barata vs. Dopamina real",
                "El lóbulo frontal en obras (por qué no pueden controlarse)"
            ]
        },
        {
            emoji: "🚨",
            title: "Módulo 2: El Plan de Rescate (7 Días)",
            items: [
                "La reunión familiar (guion incluido)",
                "Qué esperar los primeros 3 días (síndrome de abstinencia)",
                "La regla del reemplazo"
            ]
        },
        {
            emoji: "🏠",
            title: "Módulo 3: Límites Sanos",
            items: [
                "Zonas Rojas y Zonas Verdes",
                "Consumo Pasivo vs. Activo",
                "El Contrato Familiar (plantilla descargable)"
            ]
        },
        {
            emoji: "⚠️",
            title: "Módulo 4: Peligros Ocultos",
            items: [
                "Algoritmos depredadores",
                "TikTok y la atención fragmentada",
                "Ciberbullying: Señales de alerta"
            ]
        },
        {
            emoji: "✨",
            title: "Módulo 5: El Superpoder del Aburrimiento",
            items: [
                "Por qué tu hijo necesita aburrirse",
                "Actividades de reconexión"
            ]
        }
    ];

    const faqs = [
        {
            question: "¿Para qué edades es este ebook?",
            answer: "Para niños de 6 a 16 años. Los principios son los mismos, pero adaptarás el lenguaje según la edad."
        },
        {
            question: "¿Tengo que prohibir la tecnología para siempre?",
            answer: "No. Se trata de uso intencional, no de vivir en una cueva. Tu hijo seguirá usando tecnología, pero de forma sana."
        },
        {
            question: "¿Funciona si mi hijo ya es adolescente?",
            answer: "Sí. El cerebro es plástico a cualquier edad. Cuanto antes empieces, mejor, pero nunca es tarde."
        },
        {
            question: "¿Qué formato tiene el ebook?",
            answer: "PDF descargable. Lo recibes al instante por email tras la compra."
        },
        {
            question: "¿Hay garantía de devolución?",
            answer: "Sí, 15 días de garantía. Si aplicas el plan de 7 días y no ves ningún cambio, te devolvemos el dinero sin preguntas."
        }
    ];

    return (
        <div className="min-h-screen bg-[#FDFBF7] font-sans">
            {/* Simple Header */}
            <header className="bg-white border-b border-stone-100 py-4 sticky top-0 z-50">
                <div className="container mx-auto px-6">
                    <Link href="/" className="inline-flex items-center text-stone-500 hover:text-[#1e3a8a] transition font-medium">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Volver al catálogo
                    </Link>
                </div>
            </header>

            {/* HERO SECTION */}
            <section className="relative bg-gradient-to-br from-[#1e3a8a] via-[#1e40af] to-[#1e3a8a] text-white overflow-hidden">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/cerebro-pantallas/hero_background.png"
                        alt="Niño absorto en pantalla"
                        fill
                        className="object-cover opacity-20"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a8a]/90 via-[#1e40af]/85 to-[#1e3a8a]/90"></div>
                </div>

                <div className="container mx-auto px-6 py-20 md:py-32 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full mb-8">
                            <span className="text-sm font-bold">✅ Basado en Neurociencia</span>
                            <span className="text-white/50">|</span>
                            <span className="text-sm font-bold">⭐ +500 Familias Transformadas</span>
                        </div>

                        {/* Main Headline */}
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                            ¿Tu Hijo Parece un <span className="text-[#f97316]">Zombi</span> Cuando Mira la Pantalla?
                        </h1>

                        {/* Subheadline */}
                        <p className="text-xl md:text-2xl text-blue-100 mb-10 leading-relaxed max-w-3xl mx-auto">
                            Descubre el plan científico de 7 días para desintoxicar su cerebro, recuperar su atención y poner límites sin gritos.
                        </p>

                        {/* CTA Button */}
                        <div className="flex flex-col items-center gap-4">
                            <a
                                href="#precio"
                                className="inline-block bg-[#f97316] hover:bg-[#ea580c] text-white font-bold text-xl px-12 py-5 rounded-xl shadow-2xl transition transform hover:-translate-y-1 active:translate-y-0"
                            >
                                Descargar Ahora por 27€
                            </a>
                            <p className="text-sm text-blue-200">🔒 Compra segura. Recíbelo en tu email en 1 minuto.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* PROBLEMA SECTION */}
            <section className="py-20 bg-stone-50">
                <div className="container mx-auto px-6 max-w-4xl">
                    <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-12 text-center">
                        ¿Te Suena Familiar?
                    </h2>

                    <div className="space-y-4 mb-10">
                        {painPoints.map((point, index) => (
                            <div key={index} className="flex items-start gap-4 bg-white p-6 rounded-xl border border-red-100 shadow-sm">
                                <span className="text-red-500 text-2xl flex-shrink-0">❌</span>
                                <p className="text-lg text-stone-700 font-medium">{point}</p>
                            </div>
                        ))}
                    </div>

                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-2xl border border-blue-100">
                        <p className="text-lg text-stone-700 text-center leading-relaxed">
                            <strong className="text-stone-900">No es culpa tuya.</strong> Estás luchando contra algoritmos diseñados por los mejores ingenieros de Silicon Valley.
                            <br /><br />
                            <span className="text-xl font-bold text-[#1e3a8a]">Pero hay una salida.</span>
                        </p>
                    </div>
                </div>
            </section>

            {/* SOLUCIÓN SECTION */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="text-center mb-16">
                        <span className="text-[#f97316] font-bold tracking-widest uppercase text-sm">Presentamos</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-stone-900 mt-2 mb-6">
                            El Cerebro de tu Hijo en Pantallas
                        </h2>
                        <p className="text-xl text-stone-600 max-w-3xl mx-auto">
                            La guía definitiva para padres que quieren recuperar la mente de sus hijos sin prohibir la tecnología para siempre.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Mockup Image */}
                        <div className="relative">
                            <div className="relative aspect-[4/5] w-full max-w-md mx-auto rounded-2xl overflow-hidden shadow-2xl bg-white border-8 border-white transform rotate-2 hover:rotate-0 transition duration-500">
                                <Image
                                    src="/images/cerebro-pantallas/ebook_mockup.png"
                                    alt="Mockup del ebook El Cerebro de tu Hijo en Pantallas"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>

                        {/* Benefits */}
                        <div className="space-y-6">
                            <h3 className="text-2xl font-bold text-stone-900 mb-8">Lo que aprenderás:</h3>
                            {benefits.map((benefit, index) => {
                                const Icon = benefit.icon;
                                return (
                                    <div key={index} className="flex gap-4 items-start">
                                        <div className="bg-[#1e3a8a]/10 p-3 rounded-xl flex-shrink-0">
                                            <Icon className="w-6 h-6 text-[#1e3a8a]" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-stone-900 mb-1">{benefit.title}</h4>
                                            <p className="text-sm text-stone-600">{benefit.description}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* TESTIMONIOS */}
            <section className="py-20 bg-stone-50">
                <div className="container mx-auto px-6 max-w-6xl">
                    <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-12 text-center">
                        Lo Que Dicen Otros Padres
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100 flex flex-col">
                                <div className="flex text-yellow-500 mb-4 text-lg">{"★★★★★"}</div>
                                <p className="text-stone-600 mb-6 leading-relaxed flex-1 italic">
                                    "{testimonial.text}"
                                </p>
                                <div className="flex items-center gap-3 mt-auto">
                                    <div className={`w-12 h-12 rounded-full bg-${testimonial.color}-100 text-${testimonial.color}-600 flex items-center justify-center font-bold`}>
                                        {testimonial.initials}
                                    </div>
                                    <div>
                                        <p className="font-bold text-stone-900">{testimonial.author}</p>
                                        <p className="text-sm text-stone-400">{testimonial.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CONTENIDO DEL EBOOK */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6 max-w-5xl">
                    <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-12 text-center">
                        ¿Qué Incluye el Ebook?
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {modules.map((module, index) => (
                            <div key={index} className="bg-gradient-to-br from-white to-stone-50 p-6 rounded-2xl border border-stone-100 shadow-sm hover:shadow-md transition">
                                <div className="flex items-start gap-4">
                                    <span className="text-4xl">{module.emoji}</span>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-stone-900 mb-3 text-lg">{module.title}</h3>
                                        <ul className="space-y-2">
                                            {module.items.map((item, itemIndex) => (
                                                <li key={itemIndex} className="flex items-start gap-2 text-sm text-stone-600">
                                                    <Check className="w-4 h-4 text-[#f97316] flex-shrink-0 mt-0.5" />
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Bonus */}
                    <div className="mt-8 bg-gradient-to-r from-[#f97316]/10 to-[#ea580c]/10 p-8 rounded-2xl border-2 border-[#f97316]/30">
                        <div className="flex items-center gap-4 mb-4">
                            <span className="text-4xl">🎁</span>
                            <h3 className="text-2xl font-bold text-stone-900">BONUS Incluidos</h3>
                        </div>
                        <ul className="space-y-2 ml-14">
                            <li className="flex items-start gap-2 text-stone-700">
                                <Check className="w-5 h-5 text-[#f97316] flex-shrink-0 mt-0.5" />
                                <span className="font-medium">Contrato Digital Familiar Imprimible</span>
                            </li>
                            <li className="flex items-start gap-2 text-stone-700">
                                <Check className="w-5 h-5 text-[#f97316] flex-shrink-0 mt-0.5" />
                                <span className="font-medium">Checklist de Detox Digital de 7 Días</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* PRECIO SECTION */}
            <section id="precio" className="py-20 bg-gradient-to-br from-[#1e3a8a] to-[#1e40af] text-white">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            No Esperes a que Sea Demasiado Tarde
                        </h2>
                        <p className="text-xl text-blue-100 leading-relaxed max-w-2xl mx-auto">
                            Cada día que pasa enganchado a TikTok, su cerebro se aleja más de poder concentrarse con normalidad.
                            Cada noche que duerme con el móvil, pierdes una oportunidad de conexión.
                            <br /><br />
                            <strong className="text-white">El cambio empieza hoy. Empieza contigo.</strong>
                        </p>
                    </div>

                    {/* Price Card */}
                    <div className="bg-white rounded-2xl p-8 md:p-12 text-stone-900 max-w-2xl mx-auto shadow-2xl">
                        <div className="text-center mb-8">
                            <span className="bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm font-bold inline-block mb-4">
                                Oferta de Lanzamiento
                            </span>
                            <OfferCountdown className="text-red-600 text-3xl md:text-4xl justify-center mb-6" />

                            <div className="flex items-center justify-center gap-4 mb-8">
                                {product.originalPrice && (
                                    <span className="text-stone-400 line-through text-2xl font-medium">{product.originalPrice.toFixed(2)} €</span>
                                )}
                                <div className="flex items-baseline gap-1">
                                    <span className="text-6xl font-bold text-stone-900 leading-none">{product.price.toFixed(2)}</span>
                                    <span className="text-stone-500 text-lg font-bold">€ + IVA</span>
                                </div>
                            </div>
                        </div>

                        <a
                            href={product.affiliateLink || "https://pay.hotmart.com/R104271494E?checkoutMode=10"}
                            className="block w-full bg-[#f97316] hover:bg-[#ea580c] text-white text-center font-bold text-xl py-5 rounded-xl shadow-lg transition transform hover:-translate-y-1 active:translate-y-0 mb-6"
                        >
                            Descargar Ahora
                        </a>

                        <div className="space-y-3 text-center text-sm text-stone-600">
                            <p className="flex items-center justify-center gap-2">
                                <Check className="w-5 h-5 text-green-600" />
                                Acceso inmediato
                            </p>
                            <p className="flex items-center justify-center gap-2">
                                <Check className="w-5 h-5 text-green-600" />
                                Garantía de 15 días
                            </p>
                            <p className="flex items-center justify-center gap-2">
                                <Check className="w-5 h-5 text-green-600" />
                                Pago seguro vía Hotmart
                            </p>
                        </div>
                    </div>

                    {/* Guarantee Badge */}
                    <div className="mt-12 flex justify-center">
                        <div className="relative w-48 h-48">
                            <Image
                                src="/images/cerebro-pantallas/garantia_badge.png"
                                alt="Garantía de 15 días"
                                fill
                                className="object-contain"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ SECTION */}
            <section className="py-20 bg-stone-50">
                <div className="container mx-auto px-6 max-w-3xl">
                    <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-12 text-center">
                        Preguntas Frecuentes
                    </h2>

                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <details key={index} className="bg-white p-6 rounded-xl border border-stone-100 shadow-sm group">
                                <summary className="font-bold text-stone-900 cursor-pointer list-none flex items-center justify-between">
                                    {faq.question}
                                    <span className="text-[#1e3a8a] text-2xl group-open:rotate-45 transition-transform">+</span>
                                </summary>
                                <p className="text-stone-600 mt-4 leading-relaxed">{faq.answer}</p>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* Internal Recommendations */}
            <InternalRecommendations currentProductSlug={product.slug} />

            {/* External Recommendations */}
            <ExternalRecommendations />

            {/* Sticky Mobile CTA */}
            <div className="fixed bottom-0 left-0 w-full bg-[#f97316] border-t border-[#ea580c] p-4 lg:hidden z-50 shadow-[0_-5px_15px_rgba(0,0,0,0.1)]">
                <div className="flex items-center justify-between gap-4">
                    <div className="flex flex-col">
                        {product.originalPrice && (
                            <span className="text-xs text-orange-100 font-medium line-through">{product.originalPrice.toFixed(2)} €</span>
                        )}
                        <span className="text-xl font-bold text-white leading-none">{product.price.toFixed(2)} €</span>
                    </div>
                    <a
                        href={product.affiliateLink || "https://pay.hotmart.com/R104271494E?checkoutMode=10"}
                        className="bg-white text-[#f97316] hover:bg-stone-50 font-bold py-3 px-6 rounded-xl flex-1 text-center shadow-lg active:scale-95 transition"
                    >
                        Comprar Ahora
                    </a>
                </div>
            </div>
        </div>
    );
}
