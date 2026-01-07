"use client";

import { Share2, Link as LinkIcon, Facebook, Twitter, Check } from "lucide-react";
import { useState } from "react";

interface ShareButtonsProps {
    title: string;
    slug: string;
}

export default function ShareButtons({ title, slug }: ShareButtonsProps) {
    const [copied, setCopied] = useState(false);
    const url = typeof window !== 'undefined' ? `${window.location.origin}/blog/${slug}` : `https://padresconresiliencia.com/blog/${slug}`;
    const encodedTitle = encodeURIComponent(title);
    const encodedUrl = encodeURIComponent(url);

    const handleCopy = () => {
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="border-y border-stone-200 py-8 my-12 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="font-bold text-stone-900 text-sm">¿Te ha gustado? Compártelo:</span>
            <div className="flex gap-2">
                {/* WhatsApp */}
                <a
                    href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-full bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-colors"
                    aria-label="Compartir en WhatsApp"
                >
                    <Share2 className="w-5 h-5" />
                </a>

                {/* Twitter / X */}
                <a
                    href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-full bg-stone-100 hover:bg-black hover:text-white transition-colors text-stone-600"
                    aria-label="Compartir en X (Twitter)"
                >
                    <Twitter className="w-5 h-5" />
                </a>

                {/* Facebook */}
                <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors"
                    aria-label="Compartir en Facebook"
                >
                    <Facebook className="w-5 h-5" />
                </a>

                {/* Copy Link */}
                <button
                    onClick={handleCopy}
                    className={`p-2.5 rounded-full transition-all flex items-center gap-2 ${copied ? 'bg-green-100 text-green-700 w-auto px-4' : 'bg-stone-100 text-stone-600 hover:bg-[#E07A5F] hover:text-white'}`}
                    aria-label="Copiar enlace"
                >
                    {copied ? <Check className="w-5 h-5" /> : <LinkIcon className="w-5 h-5" />}
                    {copied && <span className="text-xs font-bold">¡Copiado!</span>}
                </button>
            </div>
        </div>
    );
}
