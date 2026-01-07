import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function TestStorePage() {
    return (
        <div className="min-h-screen bg-[#FDFBF7] font-sans text-slate-800">
            {/* Navigation */}
            <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex-shrink-0 flex items-center gap-2">
                            <span className="text-2xl font-bold text-[#76A5AF]">PadresConResiliencia</span>
                        </div>
                        <div className="hidden md:flex space-x-8">
                            <Link href="#" className="text-slate-600 hover:text-[#E07A5F] transition-colors font-medium">Inicio</Link>
                            <Link href="#shop" className="text-slate-600 hover:text-[#E07A5F] transition-colors font-medium">Tienda</Link>
                            <Link href="#guides" className="text-slate-600 hover:text-[#E07A5F] transition-colors font-medium">Guías</Link>
                            <Link href="#about" className="text-slate-600 hover:text-[#E07A5F] transition-colors font-medium">Nosotros</Link>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button className="p-2 text-slate-600 hover:text-[#E07A5F]">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                </svg>
                            </button>
                            <button className="p-2 text-slate-600 hover:text-[#E07A5F] relative">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 5.41c.493 2.112-.324 3.54-1.84 4.257-1.07.505-2.383.676-3.694.753-2.62.153-5.24.153-7.86 0-1.311-.077-2.624-.248-3.694-.753-1.516-.717-2.333-2.145-1.84-4.257l1.263-5.41a2.25 2.25 0 012.192-1.738h11.63c1.07 0 1.99.768 2.192 1.738z" />
                                </svg>
                                <span className="absolute top-0 right-0 bg-[#E07A5F] text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">2</span>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative bg-[#E8F3F1] overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 flex flex-col-reverse lg:flex-row items-center gap-12">
                    <div className="lg:w-1/2 space-y-8 text-center lg:text-left">
                        <h1 className="text-4xl lg:text-6xl font-extrabold text-[#2D3748] leading-tight">
                            Crianza con <span className="text-[#76A5AF]">Propósito</span>, <br />
                            Padres con <span className="text-[#E07A5F]">Resiliencia</span>.
                        </h1>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0">
                            Tu espacio seguro para encontrar herramientas digitales, guías prácticas y el apoyo que necesitas en cada etapa del crecimiento de tus hijos.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <button className="px-8 py-4 bg-[#E07A5F] text-white font-bold rounded-full shadow-lg hover:bg-[#D06950] transition-transform hover:-translate-y-1">
                                Ver Productos
                            </button>
                            <button className="px-8 py-4 bg-white text-[#2D3748] font-bold rounded-full shadow-md hover:bg-gray-50 transition-transform hover:-translate-y-1 border border-gray-200">
                                Nuestra Misión
                            </button>
                        </div>
                    </div>
                    <div className="lg:w-1/2 relative">
                        <div className="absolute inset-0 bg-[#76A5AF]/20 rounded-full blur-3xl transform translate-x-10 translate-y-10"></div>
                        {/* Placeholder for Hero Image - Using a colored div for now */}
                        <div className="relative bg-white p-6 rounded-2xl shadow-2xl rotate-2 border-4 border-white">
                            <div className="aspect-[4/3] bg-slate-100 rounded-lg flex items-center justify-center overflow-hidden">
                                <span className="text-slate-400 font-medium">Imagen Hero: Familia Feliz / Madre Leyendo</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories / Needs Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-[#2D3748]">¿Qué necesitas hoy?</h2>
                        <p className="text-slate-500 mt-4">Encuentra la guía perfecta para el momento que estás viviendo.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: "Primeros Pasos", desc: "Guías para el primer año, sueño y lactancia.", color: "bg-blue-50", icon: "👶" },
                            { title: "Gestión Emocional", desc: "Herramientas para berrinches y emociones fuertes.", color: "bg-orange-50", icon: "❤️" },
                            { title: "Aprendizaje y Juego", desc: "Actividades para estimular su desarrollo.", color: "bg-green-50", icon: "🧩" },
                        ].map((cat, idx) => (
                            <div key={idx} className={`p-8 rounded-2xl ${cat.color} hover:shadow-lg transition-shadow cursor-pointer group`}>
                                <div className="text-4xl mb-4 group-transform group-hover:scale-110 transition-transform duration-300">{cat.icon}</div>
                                <h3 className="text-xl font-bold text-[#2D3748] mb-2">{cat.title}</h3>
                                <p className="text-slate-600">{cat.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Products Section */}
            <section id="shop" className="py-20 bg-[#FDFBF7]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-3xl font-bold text-[#2D3748]">Destacados de la Tienda</h2>
                            <p className="text-slate-500 mt-2">Los recursos favoritos de nuestra comunidad.</p>
                        </div>
                        <Link href="#" className="hidden md:block text-[#E07A5F] font-bold hover:underline">Ver todo el catálogo &rarr;</Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { name: "Guía de Sueño Infantil", price: "€19.99", tag: "Best Seller", image: "🌙" },
                            { name: "Kit de Emociones", price: "€24.99", tag: "Nuevo", image: "🎨" },
                            { name: "Recetario Saludable", price: "€14.99", tag: null, image: "🥦" },
                            { name: "Pack Primer Año", price: "€49.99", tag: "Oferta", image: "🎁" },
                        ].map((product, idx) => (
                            <div key={idx} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group">
                                <div className="aspect-square bg-slate-100 relative flex items-center justify-center text-6xl group-hover:bg-slate-50 transition-colors">
                                    {product.image}
                                    {product.tag && (
                                        <span className="absolute top-4 left-4 bg-[#2D3748] text-white text-xs font-bold px-3 py-1 rounded-full">
                                            {product.tag}
                                        </span>
                                    )}
                                </div>
                                <div className="p-6">
                                    <h3 className="font-bold text-[#2D3748] text-lg mb-2">{product.name}</h3>
                                    <div className="flex justify-between items-center">
                                        <span className="text-[#E07A5F] font-bold text-xl">{product.price}</span>
                                        <button className="p-2 bg-slate-100 rounded-full text-slate-600 hover:bg-[#E07A5F] hover:text-white transition-colors">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-12 text-center md:hidden">
                        <Link href="#" className="text-[#E07A5F] font-bold hover:underline">Ver todo el catálogo &rarr;</Link>
                    </div>
                </div>
            </section>

            {/* Mission / Emotional Connection */}
            <section className="py-24 bg-[#2D3748] text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#E07A5F] rounded-full blur-[100px] opacity-20"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#76A5AF] rounded-full blur-[100px] opacity-20"></div>

                <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                    <h2 className="text-3xl md:text-5xl font-bold mb-8">"No estás solo en esto"</h2>
                    <p className="text-xl text-slate-300 mb-12 leading-relaxed">
                        Sabemos que la crianza puede ser abrumadora. Nuestra misión es darte las herramientas para que transformes la duda en confianza y el caos en conexión.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div>
                            <div className="text-4xl font-bold text-[#E07A5F] mb-2">5000+</div>
                            <div className="text-slate-400">Padres ayudados</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-[#76A5AF] mb-2">50+</div>
                            <div className="text-slate-400">Recursos digitales</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-[#E07A5F] mb-2">24/7</div>
                            <div className="text-slate-400">Acceso inmediato</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-2">
                        <span className="text-2xl font-bold text-white block mb-4">PadresConResiliencia</span>
                        <p className="max-w-sm">
                            Tu tienda de confianza para recursos educativos y guías de crianza. Construyendo familias más fuertes, un día a la vez.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-4">Tienda</h4>
                        <ul className="space-y-2">
                            <li><Link href="#" className="hover:text-[#E07A5F]">Novedades</Link></li>
                            <li><Link href="#" className="hover:text-[#E07A5F]">Más Vendidos</Link></li>
                            <li><Link href="#" className="hover:text-[#E07A5F]">Ofertas</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-4">Ayuda</h4>
                        <ul className="space-y-2">
                            <li><Link href="#" className="hover:text-[#E07A5F]">Contacto</Link></li>
                            <li><Link href="#" className="hover:text-[#E07A5F]">Preguntas Frecuentes</Link></li>
                            <li><Link href="#" className="hover:text-[#E07A5F]">Términos y Condiciones</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-slate-800 text-center text-sm">
                    &copy; {new Date().getFullYear()} PadresConResiliencia. Todos los derechos reservados.
                </div>
            </footer>
        </div>
    );
}
