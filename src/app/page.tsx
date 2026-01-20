import prisma from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, Star, Users, Calendar } from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductGrid from "@/components/home/ProductGrid";
import AuthorSection from "@/components/home/AuthorSection";
import StatsBar from "@/components/home/StatsBar";

import ProblemSection from "@/components/home/ProblemSection";
import SocialProofSection from "@/components/home/SocialProofSection";
import FaqSection from "@/components/home/FaqSection";

import ParentingQuiz from "@/components/home/ParentingQuiz";

export const revalidate = 60;

export default async function HomePage() {
  const [dbProducts, latestPosts] = await Promise.all([
    prisma.product.findMany(),
    prisma.blogPost.findMany({
      take: 3,
      orderBy: { date: 'desc' },
    })
  ]);

  // Serialize products (convert Dates to strings/numbers or omit) to avoid "Date object" warning in Client Components
  const products = dbProducts.map(p => ({
    id: p.id,
    title: p.title,
    description: p.description,
    price: p.price,
    originalPrice: p.originalPrice,
    imageUrl: p.imageUrl,
    slug: p.slug,
  }));

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
                <Link href="#blog" className="text-stone-600 font-medium hover:text-[#E07A5F] px-8 py-4 transition flex items-center gap-2">
                  <BookOpen className="w-5 h-5" /> Leer Artículos
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

        {/* Stats Bar */}
        <StatsBar />

        {/* Problem Section (Agitation) */}
        <ProblemSection />

        {/* Interactive Quiz */}
        <ParentingQuiz />

        {/* Products Grid */}
        <section id="productos" className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold mb-4 text-stone-900">Nuestros Recursos</h2>
                <p className="text-stone-500 max-w-xl">Guías digitales diseñadas para resolver problemas específicos de la crianza moderna. Acceso inmediato.</p>
              </div>
              <Link href="#" className="hidden md:flex items-center gap-2 text-[#E07A5F] font-bold hover:underline">
                Ver todo <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <ProductGrid initialProducts={products} />
          </div>
        </section>

        {/* Social Proof */}
        <SocialProofSection />

        {/* Latest Blog Posts */}
        <section id="blog" className="py-24 bg-stone-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-stone-900 mb-4">Últimas lecturas</h2>
              <p className="text-stone-500 max-w-2xl mx-auto">Reflexiones y estrategias para el día a día.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {latestPosts.map((post) => (
                <Link href={`/blog/${post.slug}`} key={post.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all">
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#E07A5F] uppercase tracking-wider mb-3">
                      <span>{post.category}</span>
                    </div>
                    <h3 className="font-bold text-stone-900 text-lg mb-3 line-clamp-2 group-hover:text-[#E07A5F] transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-stone-500 text-sm mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center text-xs text-stone-400 font-medium">
                      <Calendar className="w-3 h-3 mr-1" />
                      {post.date.toLocaleDateString()}
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link href="/blog" className="inline-flex items-center gap-2 font-bold text-stone-900 hover:text-[#E07A5F] transition-colors">
                Ver todos los artículos <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <FaqSection />

        <AuthorSection />


      </main>

      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Organization",
                "name": "Padres con Resiliencia",
                "url": "https://www.padresconresiliencia.com",
                "logo": "https://www.padresconresiliencia.com/icon.png",
                "sameAs": [
                  "https://instagram.com/padresconresiliencia",
                  "https://twitter.com/padresresilia"
                ],
                "description": "Recursos prácticos y guías para una crianza consciente, respetuosa y basada en la fe."
              },
              {
                "@type": "WebSite",
                "name": "Padres con Resiliencia",
                "url": "https://www.padresconresiliencia.com",
                "potentialAction": {
                  "@type": "SearchAction",
                  "target": "https://www.padresconresiliencia.com/search?q={search_term_string}",
                  "query-input": "required name=search_term_string"
                }
              }
            ]
          })
        }}
      />
    </div>
  );
}
