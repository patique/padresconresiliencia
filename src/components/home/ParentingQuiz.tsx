"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, RefreshCw, ChevronRight } from "lucide-react";
import Image from "next/image";
import WaitlistModal from "@/components/ui/WaitlistModal";

type Option = {
    label: string;
    value: string;
};

type Question = {
    id: number;
    text: string;
    options: Option[];
};

const QUESTIONS: Question[] = [
    {
        id: 1,
        text: "¿Qué edad tiene tu hijo/a?",
        options: [
            { label: "Bebé (0-12 meses)", value: "ebook" },
            { label: "1 a 3 años", value: "toddler" },
            { label: "Adolescente", value: "teen" },
            { label: "De cualquier edad", value: "faith" },
        ],
    },
    {
        id: 2,
        text: "¿Cuál es tu mayor desafío ahora mismo?",
        options: [
            { label: "Agotamiento, culpa o falta de sueño", value: "ebook" },
            { label: "Rabietas y gestión de límites", value: "toddler" },
            { label: "Falta de comunicación y conflictos", value: "teen" },
            { label: "Transmitir valores y fe en casa", value: "faith" },
        ],
    },
    {
        id: 3,
        text: "¿Qué es lo que más necesitas?",
        options: [
            { label: "Recuperar mi bienestar y calma", value: "ebook" },
            { label: "Herramientas de crianza respetuosa", value: "toddler" },
            { label: "Reconectar con mi hijo/a", value: "teen" },
            { label: "Un hogar con propósito espiritual", value: "faith" },
        ],
    },
];

const RECOMMENDATIONS: Record<string, any> = {
    ebook: {
        title: "Bienestar Emocional de los Padres",
        description: "Tu guía esencial para sobrevivir y disfrutar el primer año. Gestiona la culpa, el sueño y el autocuidado.",
        image: "/ebook_cover_real.jpg",
        cta: "Ver detalles del Ebook",
        link: "/products/bienestar-emocional-padres",
        type: "Producto Disponible"
    },
    toddler: {
        title: "Primeros Pasos: 0 a 3 años",
        description: "El manual definitivo para entender las rabietas, el sueño y la alimentación en la primera infancia.",
        image: "/images/future_course_3.jpg",
        cta: "Unirse a la Lista de Espera",
        link: "#",
        type: "Próximamente"
    },
    teen: {
        title: "Adolescencia sin Dramas",
        description: "Estrategias probadas de comunicación para reconectar con tu hijo adolescente y reducir conflictos.",
        image: "/images/future_course_2.jpg",
        cta: "Unirse a la Lista de Espera",
        link: "#",
        type: "Próximamente"
    },
    faith: {
        title: "Educar en la Fe",
        description: "Recursos prácticos para familias que quieren transmitir la fe católica de forma natural y alegre.",
        image: "/images/future_course_1.jpg",
        cta: "Unirse a la Lista de Espera",
        link: "#",
        type: "Próximamente"
    }
};

export default function ParentingQuiz() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<string[]>([]);
    const [showResult, setShowResult] = useState(false);
    const [result, setResult] = useState<string | null>(null);
    const [waitlistTopic, setWaitlistTopic] = useState<string | null>(null);

    const handleAnswer = (value: string) => {
        const newAnswers = [...answers, value];
        setAnswers(newAnswers);

        if (currentQuestionIndex < QUESTIONS.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            calculateResult(newAnswers);
        }
    };

    const calculateResult = (finalAnswers: string[]) => {
        const ageValue = finalAnswers[0]; // First question is always Age

        // Define valid options based on Age
        let validTypes: string[] = [];
        if (ageValue === "ebook") validTypes = ["ebook", "faith"];
        else if (ageValue === "toddler") validTypes = ["toddler", "faith"];
        else if (ageValue === "teen") validTypes = ["teen", "faith"];
        else validTypes = ["ebook", "toddler", "teen", "faith"]; // "Any age" allows everything

        // Count votes
        const counts: Record<string, number> = {};
        finalAnswers.forEach(a => counts[a] = (counts[a] || 0) + 1);

        // Sort validTypes by count (descending). If tie, the first one in list (Age-based) wins.
        validTypes.sort((a, b) => (counts[b] || 0) - (counts[a] || 0));

        setResult(validTypes[0]);
        setShowResult(true);
    };

    const resetQuiz = () => {
        setCurrentQuestionIndex(0);
        setAnswers([]);
        setShowResult(false);
        setResult(null);
    };

    return (
        <section className="py-20 bg-[#FDFBF7]">
            <div className="container mx-auto px-6">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-10">
                        <span className="text-[#E07A5F] font-bold tracking-widest uppercase text-xs">Test Rápido</span>
                        <h2 className="text-3xl font-bold text-stone-900 mt-2">¿No sabes por dónde empezar?</h2>
                        <p className="text-stone-600 mt-3">Responde 3 preguntas y descubre el recurso ideal para tu etapa actual.</p>
                    </div>

                    <div className="bg-white rounded-3xl shadow-xl shadow-stone-200/50 overflow-hidden border border-stone-100 min-h-[400px] flex flex-col relative">
                        {/* Progress Bar */}
                        {!showResult && (
                            <div className="w-full bg-stone-100 h-2">
                                <div
                                    className="bg-[#E07A5F] h-2 transition-all duration-500 ease-out"
                                    style={{ width: `${((currentQuestionIndex + 1) / QUESTIONS.length) * 100}%` }}
                                ></div>
                            </div>
                        )}

                        <div className="p-8 md:p-12 flex-1 flex flex-col justify-center">
                            {!showResult ? (
                                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <h3 className="text-2xl font-bold text-stone-900 text-center">
                                        {QUESTIONS[currentQuestionIndex].text}
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {QUESTIONS[currentQuestionIndex].options.map((option, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => handleAnswer(option.value)}
                                                className="group text-left p-4 rounded-xl border-2 border-stone-100 hover:border-[#E07A5F] hover:bg-orange-50/30 transition-all duration-200 flex items-center justify-between"
                                            >
                                                <span className="text-stone-700 font-medium group-hover:text-stone-900">{option.label}</span>
                                                <ChevronRight className="w-5 h-5 text-stone-300 group-hover:text-[#E07A5F] opacity-0 group-hover:opacity-100 transition-all" />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center animate-in zoom-in-95 duration-500 flex flex-col items-center">
                                    <div className="bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-sm font-bold mb-6 inline-flex items-center gap-2">
                                        <CheckCircle2 className="w-4 h-4" /> ¡Tenemos tu resultado!
                                    </div>

                                    <h3 className="text-3xl font-bold text-stone-900 mb-2">
                                        Tu recurso ideal es:
                                    </h3>

                                    {result && RECOMMENDATIONS[result] && (
                                        <div className="mt-8 bg-white border border-stone-100 rounded-2xl p-4 shadow-sm max-w-md w-full flex gap-4 text-left items-center group cursor-pointer hover:border-stone-300 transition">
                                            <div className="relative w-24 h-32 shrink-0 rounded-lg overflow-hidden bg-stone-100">
                                                <Image
                                                    src={RECOMMENDATIONS[result].image}
                                                    alt={RECOMMENDATIONS[result].title}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div>
                                                <span className="text-[10px] font-bold uppercase tracking-wider text-[#E07A5F]">{RECOMMENDATIONS[result].type}</span>
                                                <h4 className="font-bold text-stone-900 text-lg leading-tight mt-1 mb-2">
                                                    {RECOMMENDATIONS[result].title}
                                                </h4>
                                                <p className="text-stone-500 text-sm line-clamp-2 leading-relaxed">
                                                    {RECOMMENDATIONS[result].description}
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full max-w-sm">
                                        {result && (
                                            RECOMMENDATIONS[result].type === "Próximamente" ? (
                                                <button
                                                    onClick={() => setWaitlistTopic(RECOMMENDATIONS[result].title)}
                                                    className="btn-primary flex-1 justify-center py-3"
                                                >
                                                    {RECOMMENDATIONS[result].cta}
                                                </button>
                                            ) : (
                                                <a
                                                    href={RECOMMENDATIONS[result].link === "#" ? "#comunidad" : RECOMMENDATIONS[result].link}
                                                    className="btn-primary flex-1 justify-center py-3"
                                                >
                                                    {RECOMMENDATIONS[result].cta}
                                                </a>
                                            )
                                        )}
                                        <button
                                            onClick={resetQuiz}
                                            className="text-stone-400 hover:text-stone-600 font-medium text-sm flex items-center justify-center gap-2 py-3"
                                        >
                                            <RefreshCw className="w-4 h-4" /> Empezar de nuevo
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <WaitlistModal
                isOpen={!!waitlistTopic}
                topic={waitlistTopic || ""}
                onClose={() => setWaitlistTopic(null)}
            />
        </section>
    );
}
label: string;
value: string;
};

type Question = {
    id: number;
    text: string;
    options: Option[];
};

const QUESTIONS: Question[] = [
    {
        id: 1,
        text: "¿Qué edad tiene tu hijo/a?",
        options: [
            { label: "Bebé (0-12 meses)", value: "ebook" },
            { label: "1 a 3 años", value: "toddler" },
            { label: "Adolescente", value: "teen" },
            { label: "De cualquier edad", value: "faith" },
        ],
    },
    {
        id: 2,
        text: "¿Cuál es tu mayor desafío ahora mismo?",
        options: [
            { label: "Agotamiento, culpa o falta de sueño", value: "ebook" },
            { label: "Rabietas y gestión de límites", value: "toddler" },
            { label: "Falta de comunicación y conflictos", value: "teen" },
            { label: "Transmitir valores y fe en casa", value: "faith" },
        ],
    },
    {
        id: 3,
        text: "¿Qué es lo que más necesitas?",
        options: [
            { label: "Recuperar mi bienestar y calma", value: "ebook" },
            { label: "Herramientas de crianza respetuosa", value: "toddler" },
            { label: "Reconectar con mi hijo/a", value: "teen" },
            { label: "Un hogar con propósito espiritual", value: "faith" },
        ],
    },
];

const RECOMMENDATIONS: Record<string, any> = {
    ebook: {
        title: "Bienestar Emocional de los Padres",
        description: "Tu guía esencial para sobrevivir y disfrutar el primer año. Gestiona la culpa, el sueño y el autocuidado.",
        image: "/ebook_cover_real.jpg",
        cta: "Ver detalles del Ebook",
        link: "/products/bienestar-emocional-padres",
        type: "Producto Disponible"
    },
    toddler: {
        title: "Primeros Pasos: 0 a 3 años",
        description: "El manual definitivo para entender las rabietas, el sueño y la alimentación en la primera infancia.",
        image: "/images/future_course_3.jpg",
        cta: "Unirse a la Lista de Espera",
        link: "#",
        type: "Próximamente"
    },
    teen: {
        title: "Adolescencia sin Dramas",
        description: "Estrategias probadas de comunicación para reconectar con tu hijo adolescente y reducir conflictos.",
        image: "/images/future_course_2.jpg",
        cta: "Unirse a la Lista de Espera",
        link: "#",
        type: "Próximamente"
    },
    faith: {
        title: "Educar en la Fe",
        description: "Recursos prácticos para familias que quieren transmitir la fe católica de forma natural y alegre.",
        image: "/images/future_course_1.jpg",
        cta: "Unirse a la Lista de Espera",
        link: "#",
        type: "Próximamente"
    }
};

export default function ParentingQuiz() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<string[]>([]);
    const [showResult, setShowResult] = useState(false);
    const [result, setResult] = useState<string | null>(null);

    const handleAnswer = (value: string) => {
        const newAnswers = [...answers, value];
        setAnswers(newAnswers);

        if (currentQuestionIndex < QUESTIONS.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            calculateResult(newAnswers);
        }
    };

    const calculateResult = (finalAnswers: string[]) => {
        const ageValue = finalAnswers[0]; // First question is always Age

        // Define valid options based on Age
        let validTypes: string[] = [];
        if (ageValue === "ebook") validTypes = ["ebook", "faith"];
        else if (ageValue === "toddler") validTypes = ["toddler", "faith"];
        else if (ageValue === "teen") validTypes = ["teen", "faith"];
        else validTypes = ["ebook", "toddler", "teen", "faith"]; // "Any age" allows everything

        // Count votes
        const counts: Record<string, number> = {};
        finalAnswers.forEach(a => counts[a] = (counts[a] || 0) + 1);

        // Sort validTypes by count (descending). If tie, the first one in list (Age-based) wins.
        validTypes.sort((a, b) => (counts[b] || 0) - (counts[a] || 0));

        setResult(validTypes[0]);
        setShowResult(true);
    };

    const resetQuiz = () => {
        setCurrentQuestionIndex(0);
        setAnswers([]);
        setShowResult(false);
        setResult(null);
    };

    return (
        <section className="py-20 bg-[#FDFBF7]">
            <div className="container mx-auto px-6">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-10">
                        <span className="text-[#E07A5F] font-bold tracking-widest uppercase text-xs">Test Rápido</span>
                        <h2 className="text-3xl font-bold text-stone-900 mt-2">¿No sabes por dónde empezar?</h2>
                        <p className="text-stone-600 mt-3">Responde 3 preguntas y descubre el recurso ideal para tu etapa actual.</p>
                    </div>

                    <div className="bg-white rounded-3xl shadow-xl shadow-stone-200/50 overflow-hidden border border-stone-100 min-h-[400px] flex flex-col relative">
                        {/* Progress Bar */}
                        {!showResult && (
                            <div className="w-full bg-stone-100 h-2">
                                <div
                                    className="bg-[#E07A5F] h-2 transition-all duration-500 ease-out"
                                    style={{ width: `${((currentQuestionIndex + 1) / QUESTIONS.length) * 100}%` }}
                                ></div>
                            </div>
                        )}

                        <div className="p-8 md:p-12 flex-1 flex flex-col justify-center">
                            {!showResult ? (
                                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <h3 className="text-2xl font-bold text-stone-900 text-center">
                                        {QUESTIONS[currentQuestionIndex].text}
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {QUESTIONS[currentQuestionIndex].options.map((option, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => handleAnswer(option.value)}
                                                className="group text-left p-4 rounded-xl border-2 border-stone-100 hover:border-[#E07A5F] hover:bg-orange-50/30 transition-all duration-200 flex items-center justify-between"
                                            >
                                                <span className="text-stone-700 font-medium group-hover:text-stone-900">{option.label}</span>
                                                <ChevronRight className="w-5 h-5 text-stone-300 group-hover:text-[#E07A5F] opacity-0 group-hover:opacity-100 transition-all" />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center animate-in zoom-in-95 duration-500 flex flex-col items-center">
                                    <div className="bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-sm font-bold mb-6 inline-flex items-center gap-2">
                                        <CheckCircle2 className="w-4 h-4" /> ¡Tenemos tu resultado!
                                    </div>

                                    <h3 className="text-3xl font-bold text-stone-900 mb-2">
                                        Tu recurso ideal es:
                                    </h3>

                                    {result && RECOMMENDATIONS[result] && (
                                        <div className="mt-8 bg-white border border-stone-100 rounded-2xl p-4 shadow-sm max-w-md w-full flex gap-4 text-left items-center group cursor-pointer hover:border-stone-300 transition">
                                            <div className="relative w-24 h-32 shrink-0 rounded-lg overflow-hidden bg-stone-100">
                                                <Image
                                                    src={RECOMMENDATIONS[result].image}
                                                    alt={RECOMMENDATIONS[result].title}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div>
                                                <span className="text-[10px] font-bold uppercase tracking-wider text-[#E07A5F]">{RECOMMENDATIONS[result].type}</span>
                                                <h4 className="font-bold text-stone-900 text-lg leading-tight mt-1 mb-2">
                                                    {RECOMMENDATIONS[result].title}
                                                </h4>
                                                <p className="text-stone-500 text-sm line-clamp-2 leading-relaxed">
                                                    {RECOMMENDATIONS[result].description}
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full max-w-sm">
                                        {result && (
                                            <a
                                                href={RECOMMENDATIONS[result].link === "#" ? "#comunidad" : RECOMMENDATIONS[result].link}
                                                className="btn-primary flex-1 justify-center py-3"
                                            >
                                                {RECOMMENDATIONS[result].cta}
                                            </a>
                                        )}
                                        <button
                                            onClick={resetQuiz}
                                            className="text-stone-400 hover:text-stone-600 font-medium text-sm flex items-center justify-center gap-2 py-3"
                                        >
                                            <RefreshCw className="w-4 h-4" /> Empezar de nuevo
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
