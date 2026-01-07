import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { Calendar, Clock, ArrowRight, NotebookPen } from "lucide-react";
import prisma from "@/lib/prisma";

export const metadata = {
    title: "Blog | Padres con Resiliencia",
    description: "Artículos y reflexiones sobre crianza consciente, adolescencia y educación en la fe.",
};

export const revalidate = 60; // Revalidate every minute

export default async function BlogIndex() {
    const posts = await prisma.blogPost.findMany({
        orderBy: { date: 'desc' }
    });

    return (
        <div className="min-h-screen flex flex-col bg-stone-50">
            <Navbar />

            <main className="flex-1">
                {/* Blog Hero */}
                <section className="pt-32 pb-16 px-6 text-center bg-white border-b border-stone-100">
                    <div className="max-w-3xl mx-auto">
                        <div className="inline-flex items-center gap-2 bg-orange-100 text-[#E07A5F] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
                            <NotebookPen className="w-4 h-4" /> Blog & Recursos
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-6">Reflexiones para tu día a día</h1>
                        <p className="text-xl text-stone-600 leading-relaxed">
                            Artículos profundos pero rápidos de leer, diseñados para darte paz mental y herramientas prácticas en menos de 5 minutos.
                        </p>
                    </div>
                </section>

                {/* Posts Grid */}
                <section className="py-20 container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {posts.map((post) => (
                            <article key={post.slug} className="group bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
                                <Link href={`/blog/${post.slug}`} className="relative h-56 bg-stone-200 overflow-hidden">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-[#E07A5F] shadow-sm uppercase tracking-wide">
                                        {post.category}
                                    </div>
                                </Link>

                                <div className="p-8 flex-1 flex flex-col">
                                    <div className="flex items-center gap-4 text-xs text-stone-400 font-medium mb-4">
                                        <span className="flex items-center gap-1">
                                            <Calendar className="w-3 h-3" /> {post.date.toLocaleDateString()}
                                        </span>
                                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                                    </div>

                                    <Link href={`/blog/${post.slug}`}>
                                        <h2 className="text-xl font-bold text-stone-900 mb-3 group-hover:text-[#E07A5F] transition-colors leading-tight">
                                            {post.title}
                                        </h2>
                                    </Link>

                                    <p className="text-stone-600 text-sm leading-relaxed mb-6 line-clamp-3">
                                        {post.excerpt}
                                    </p>

                                    <div className="mt-auto pt-6 border-t border-stone-100 flex items-center justify-between">
                                        <span className="text-xs font-bold text-stone-900">Por {post.author}</span>
                                        <Link href={`/blog/${post.slug}`} className="text-[#E07A5F] font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                                            Leer más <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
