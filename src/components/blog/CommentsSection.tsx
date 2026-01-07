"use client";

import { useState } from "react";
import { MessageSquare, ThumbsUp, User } from "lucide-react";

type Comment = {
    id: string;
    author: string;
    text: string;
    date: string;
    likes: number;
};

const INITIAL_COMMENTS: Comment[] = [
    {
        id: "c1",
        author: "Laura G.",
        text: "¡Justo necesitaba leer esto hoy! La estrategia de delegar la 'responsabilidad completa' me ha abierto los ojos. Gracias.",
        date: "Hace 2 horas",
        likes: 12
    },
    {
        id: "c2",
        author: "Pedro M.",
        text: "Muy buen artículo. A veces como padres nos cuesta soltar el control pensando que 'nadie lo hará como yo'.",
        date: "Hace 5 horas",
        likes: 8
    }
];

export default function CommentsSection() {
    const [comments, setComments] = useState<Comment[]>(INITIAL_COMMENTS);
    const [newComment, setNewComment] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        const comment: Comment = {
            id: Date.now().toString(),
            author: "Usuario Invitado", // Placeholder for now
            text: newComment,
            date: "Ahora mismo",
            likes: 0
        };

        setComments([comment, ...comments]);
        setNewComment("");
    };

    return (
        <section className="border-t border-stone-200 mt-16 pt-12">
            <h3 className="text-2xl font-bold text-stone-900 mb-8 flex items-center gap-2">
                <MessageSquare className="w-6 h-6" /> Comentarios ({comments.length})
            </h3>

            {/* Comment Form */}
            <form onSubmit={handleSubmit} className="mb-12 bg-stone-50 p-6 rounded-xl border border-stone-200">
                <h4 className="text-sm font-bold text-stone-700 mb-4 uppercase tracking-wider">Deja tu opinión</h4>
                <textarea
                    className="w-full p-4 rounded-lg border border-stone-200 focus:ring-2 focus:ring-[#E07A5F] focus:border-[#E07A5F] transition-all outline-none text-stone-700 min-h-[120px]"
                    placeholder="¿Qué opinas sobre este tema? Comparte tu experiencia..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                />
                <div className="flex justify-end mt-4">
                    <button
                        type="submit"
                        disabled={!newComment.trim()}
                        className="bg-stone-900 text-white px-6 py-2 rounded-lg font-bold hover:bg-[#E07A5F] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Publicar Comentario
                    </button>
                </div>
            </form>

            {/* Comments List */}
            <div className="space-y-8">
                {comments.map((comment) => (
                    <div key={comment.id} className="flex gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="bg-stone-100 p-3 rounded-full h-fit shrink-0">
                            <User className="w-6 h-6 text-stone-400" />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                                <span className="font-bold text-stone-900">{comment.author}</span>
                                <span className="text-xs text-stone-400">{comment.date}</span>
                            </div>
                            <p className="text-stone-600 leading-relaxed bg-white p-4 rounded-xl border border-stone-100 shadow-sm">
                                {comment.text}
                            </p>
                            <div className="flex items-center gap-4 mt-2 ml-1">
                                <button className="text-xs font-bold text-stone-500 hover:text-[#E07A5F] flex items-center gap-1 transition-colors">
                                    <ThumbsUp className="w-3 h-3" /> Me gusta ({comment.likes})
                                </button>
                                <button className="text-xs font-bold text-stone-500 hover:text-stone-800 transition-colors">
                                    Responder
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
