import prisma from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, Star, Users } from "lucide-react";

import Navbar from "@/components/layout/Navbar";

export const revalidate = 60;

export default async function HomePage() {
  const products = await prisma.product.findMany();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-20 pb-32">
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block py-1 px-3 rounded-full bg-orange-100 text-[#E07A5F] text-xs font-bold tracking-wider uppercase mb-6">
                Para padres reales
              </span>
              <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight text-stone-900">
                Crianza consciente,<br /> familias felices.
              </h1>
              <p className="text-xl text-stone-600 mb-10 leading-relaxed max-w-2xl mx-auto">
                Herramientas prácticas, guías y recursos para navegar la paternidad con calma, confianza y conexión. Sin juicios, solo apoyo.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="#productos" className="btn-primary text-lg px-8 py-4 w-full sm:w-auto">
                  Ver Recursos Disponibles
                </Link>
                <Link href="#comunidad" className="text-stone-600 font-medium hover:text-[#E07A5F] px-8 py-4 transition flex items-center gap-2">
                  <Users className="w-5 h-5" /> Unirme a la comunidad
                </Link>
              </div>
            </div>
          </div>

          {/* Abstract Background Shapes */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-30 pointer-events-none">
            <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#F2CC8F] rounded-full blur-3xl mix-blend-multiply filter"></div>
            <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-[#E07A5F] rounded-full blur-3xl mix-blend-multiply filter"></div>
            <div className="absolute top-[20%] left-[20%] w-[400px] h-[400px] bg-[#81B0B2] rounded-full blur-3xl mix-blend-multiply filter"></div>
          </div>
        </section>

        {/* Products Grid */}
        <section id="productos" className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold mb-4">Nuestros Recursos</h2>
                <p className="text-stone-500 max-w-xl">Guías digitales diseñadas para resolver problemas específicos de la crianza moderna. Acceso inmediato.</p>
              </div>
              <Link href="#" className="hidden md:flex items-center gap-2 text-[#E07A5F] font-bold hover:underline">
                Ver todo <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {products.map((product) => (
                <div key={product.id} className="group flex flex-col bg-white rounded-2xl border border-stone-200 overflow-hidden hover:shadow-xl hover:shadow-stone-200/50 transition-all duration-300 transform hover:-translate-y-1">
                  <Link href={`/products/${product.slug}`} className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
                    {product.imageUrl ? (
                      <Image
                        src={product.imageUrl}
                        alt={product.title}
                        fill
                        className="object-cover group-hover:scale-105 transition duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-stone-400">
                        <BookOpen className="w-12 h-12 opacity-50" />
                      </div>
                    )}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-stone-800 shadow-sm">
                      Digital PDF
                    </div>
                  </Link>

                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex text-yellow-400">
                        {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="w-4 h-4 fill-current" />)}
                      </div>
                      <span className="text-xs text-stone-400">(128 reseñas)</span>
                    </div>

                    <Link href={`/products/${product.slug}`}>
                      <h3 className="text-xl font-bold text-stone-900 mb-2 group-hover:text-[#E07A5F] transition">
                        {product.title}
                      </h3>
                    </Link>

                    <p className="text-stone-600 text-sm leading-relaxed mb-6 line-clamp-3">
                      {product.description}
                    </p>

                    <div className="mt-auto flex items-center justify-between pt-6 border-t border-stone-100">
                      <div className="flex flex-col">
                        <span className="text-xs text-stone-400 line-through">{(product.price * 1.5).toFixed(2)}€</span>
                        <span className="text-2xl font-bold text-stone-900">{product.price.toFixed(2)}€</span>
                      </div>
                      <Link href={`/products/${product.slug}`} className="bg-stone-900 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#E07A5F] transition-colors">
                        Ver Detalles
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
              ))}

              {/* Coming Soon Card */}
              <div className="flex flex-col items-center justify-center bg-stone-50 rounded-2xl border-2 border-dashed border-stone-200 p-10 text-center opacity-75 grayscale hover:grayscale-0 transition duration-500">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                  <BookOpen className="w-8 h-8 text-stone-300" />
                </div>
                <h3 className="text-lg font-bold text-stone-800 mb-2">Más recursos en camino</h3>
                <p className="text-stone-500 text-sm mb-4 max-w-xs">
                  Estamos trabajando en nuevas guías y cursos.
                </p>
                <span className="inline-block bg-stone-100 text-stone-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Próximamente
                </span>
              </div>
            </div>
          </div>
        </section>

      </main>

      <footer className="bg-stone-900 text-stone-400 py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-1">
              <h4 className="text-white font-bold text-lg mb-6">Padres con Resiliencia</h4>
              <p className="text-sm leading-relaxed">
                Acompañando a familias en el viaje de la crianza con herramientas basadas en evidencia y mucho amor.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Recursos</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="#" className="hover:text-white transition">Guías PDF</Link></li>
                <li><Link href="#" className="hover:text-white transition">Cursos Online</Link></li>
                <li><Link href="#" className="hover:text-white transition">Plantillas Gratuitas</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Legal</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="#" className="hover:text-white transition">Aviso Legal</Link></li>
                <li><Link href="#" className="hover:text-white transition">Política de Privacidad</Link></li>
                <li><Link href="#" className="hover:text-white transition">Cookies</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Contacto</h4>
              <p className="text-sm mb-4">¿Tienes dudas? Escríbenos:</p>
              <a href="mailto:hola@padresconresiliencia.com" className="text-[#E07A5F] font-bold hover:text-white transition">hola@padresconresiliencia.com</a>
            </div>
          </div>
          <div className="border-t border-stone-800 pt-8 text-center text-xs">
            &copy; {new Date().getFullYear()} Padres con Resiliencia. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div >
  );
}
