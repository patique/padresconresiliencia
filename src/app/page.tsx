import prisma from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, Star, Users } from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductGrid from "@/components/home/ProductGrid";
import AuthorSection from "@/components/home/AuthorSection";
import StatsBar from "@/components/home/StatsBar";
import SocialProofToast from "@/components/ui/SocialProofToast";

import ParentingQuiz from "@/components/home/ParentingQuiz";

export const revalidate = 60;

export default async function HomePage() {
  const dbProducts = await prisma.product.findMany();

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

        {/* Stats Bar */}
        <StatsBar />

        {/* Interactive Quiz */}
        <ParentingQuiz />

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

            <ProductGrid initialProducts={products} />
          </div>
        </section>

        <AuthorSection />

        <SocialProofToast />
      </main>

      <Footer />
    </div>
  );
}
