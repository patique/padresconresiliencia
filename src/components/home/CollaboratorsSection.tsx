import { ExternalLink, BookOpen, Heart, Sparkles } from "lucide-react";
import Image from "next/image";

interface Collaborator {
    name: string;
    description: string;
    category: string;
    imageUrl: string;
    link: string;
    highlight: string;
}

const collaborators: Collaborator[] = [
    {
        name: "Código Nutrición Inteligente",
        description: "Aprende a alimentar a tu familia de forma saludable y equilibrada sin complicaciones.",
        category: "Nutrición",
        imageUrl: "/images/collaborators/nutricion-inteligente.jpg",
        link: "https://tintaviva.info/codigo-nutricion-inteligente/#aff=Pablotq",
        highlight: "Recetas fáciles y saludables"
    },
    {
        name: "Emprende con Repostería",
        description: "Convierte tu pasión por la repostería en un negocio rentable desde casa.",
        category: "Emprendimiento",
        imageUrl: "/images/collaborators/emprende-reposteria.jpg",
        link: "https://tintaviva.info/landing-emprende-con-reposteria/#aff=Pablotq",
        highlight: "De hobby a negocio"
    },
    {
        name: "Educar con Propósito",
        description: "Recursos y estrategias para una educación consciente y respetuosa en el hogar.",
        category: "Educación",
        imageUrl: "/images/collaborators/educar-proposito.jpg",
        link: "#",
        highlight: "Método Montessori adaptado"
    }
];

export default function CollaboratorsSection() {
    return (
        <section className="py-24 bg-gradient-to-b from-stone-50 to-white">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-600 px-4 py-2 rounded-full text-sm font-bold mb-6">
                        <Sparkles className="w-4 h-4" />
                        <span>Recursos Recomendados</span>
                    </div>
                    <h2 className="text-4xl font-bold text-stone-900 mb-4">
                        Colaboradores de Confianza
                    </h2>
                    <p className="text-xl text-stone-600 max-w-2xl mx-auto">
                        Proyectos y recursos que compartimos valores y que pueden complementar tu camino en la crianza consciente.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {collaborators.map((collab, index) => (
                        <a
                            key={index}
                            href={collab.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-100 hover:border-[#E07A5F]/30"
                        >
                            <div className="aspect-video relative overflow-hidden bg-gradient-to-br from-stone-100 to-stone-200">
                                {/* Placeholder for image - replace with actual images */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <BookOpen className="w-16 h-16 text-stone-400" />
                                </div>
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-stone-700">
                                    {collab.category}
                                </div>
                            </div>

                            <div className="p-6">
                                <h3 className="text-xl font-bold text-stone-900 mb-2 group-hover:text-[#E07A5F] transition-colors">
                                    {collab.name}
                                </h3>

                                <p className="text-stone-600 text-sm mb-4 line-clamp-2">
                                    {collab.description}
                                </p>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-xs text-purple-600 font-semibold">
                                        <Heart className="w-4 h-4 fill-current" />
                                        <span>{collab.highlight}</span>
                                    </div>
                                    <ExternalLink className="w-4 h-4 text-stone-400 group-hover:text-[#E07A5F] transition-colors" />
                                </div>
                            </div>
                        </a>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <p className="text-sm text-stone-500">
                        ¿Tienes un proyecto afín? <a href="mailto:contacto@padresconresiliencia.com" className="text-[#E07A5F] font-semibold hover:underline">Contáctanos</a>
                    </p>
                </div>
            </div>
        </section>
    );
}
