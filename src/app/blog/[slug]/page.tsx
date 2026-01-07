import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CommentsSection from "@/components/blog/CommentsSection";
import AuthorSection from "@/components/home/AuthorSection";
import { Calendar, Clock, ArrowLeft, Share2 } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";

// We can keep generateStaticParams if we want SSG for known slugs, 
// but we'll need to fetch them from DB or keep the static list for now.
// For simplicity, let's switch to dynamic rendering or just fetch inside the component.

export async function generateStaticParams() {
    const posts = await prisma.blogPost.findMany({ select: { slug: true } });
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
    const post = await prisma.blogPost.findUnique({
        where: { slug: params.slug }
    });

    if (!post) {
        notFound();
    }

    return (
        <div className="min-h-screen flex flex-col bg-[#FDFBF7]">
            <Navbar />

            <main className="flex-1 pb-24">
                {/* Article Header */}
                <header className="pt-32 pb-12 px-6 bg-white border-b border-stone-100 text-center">
                    <div className="max-w-4xl mx-auto">
                        <Link href="/blog" className="inline-flex items-center gap-2 text-stone-500 hover:text-[#E07A5F] text-sm font-bold mb-8 transition-colors">
                            <ArrowLeft className="w-4 h-4" /> Volver al Blog
                        </Link>

                        <div className="flex items-center justify-center gap-2 mb-6">
                            <span className="bg-orange-100 text-[#E07A5F] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">{post.category}</span>
                        </div>

                        <h1 className="text-3xl md:text-5xl font-bold text-stone-900 mb-6 leading-tight max-w-3xl mx-auto">
                            {post.title}
                        </h1>

                        <div className="flex items-center justify-center gap-6 text-sm text-stone-500 font-medium">
                            <span className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" /> {post.date.toLocaleDateString()}
                            </span>
                            <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> {post.readTime} lectura</span>
                            <span className="font-bold text-stone-900">Por {post.author}</span>
                        </div>
                    </div>
                </header>

                <div className="container mx-auto px-6 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-7xl">
                    {/* Main Content */}
                    <div className="lg:col-span-8 lg:col-start-3">
                        {/* Featured Image Placeholder */}
                        <div className="aspect-video bg-stone-200 rounded-2xl mb-12 flex items-center justify-center relative overflow-hidden shadow-sm">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
                        </div>

                        {/* Article Body */}
                        <article
                            className="prose prose-stone prose-lg max-w-none
                            prose-headings:font-bold prose-headings:text-stone-900
                            prose-p:text-stone-600 prose-p:leading-8
                            prose-blockquote:border-l-[#E07A5F] prose-blockquote:bg-orange-50/50 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:not-italic
                            prose-a:text-[#E07A5F] prose-a:font-bold hover:prose-a:text-stone-900
                            prose-li:text-stone-600"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />

                        {/* Share Section - (Visual only for now) */}
                        <div className="border-y border-stone-200 py-8 my-12 flex items-center justify-between">
                            <span className="font-bold text-stone-900 text-sm">¿Te ha gustado? Compártelo:</span>
                            <div className="flex gap-4">
                                <button className="p-2 rounded-full bg-stone-100 hover:bg-[#E07A5F] hover:text-white transition-all text-stone-600">
                                    <Share2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Comments */}
                        <CommentsSection postId={post.id} />
                    </div>
                </div>

                {/* Author Box at bottom (simplified reuse) */}
                <div className="mt-20">
                    <AuthorSection />
                </div>
            </main>

            <Footer />
        </div>
    );
}
