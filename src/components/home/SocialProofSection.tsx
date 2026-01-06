export default function SocialProofSection() {
    const testimonials = [
        {
            text: "Pensé que nunca volvería a dormir. En 3 días aplicando el módulo de sueño, pasamos de 5 despertares a solo 1. Gracias.",
            author: "María G., Mamá primeriza",
            color: "#E07A5F"
        },
        {
            text: "Lo compré por desesperación y me sorprendió la parte emocional. Me ayudó a entender mis propios miedos. Muy recomendado.",
            author: "Carlos R., Papá de Sofía",
            color: "#76A5AF"
        },
        {
            text: "Directo al grano. Sin paja. Justo lo que necesitas cuando no tienes tiempo ni energía.",
            author: "Carla D., Mamá de mellizos",
            color: "#F6AD55"
        }
    ];

    return (
        <section className="bg-white">
            <div className="container">
                <h2>Historias de Noches Silenciosas</h2>
                <div className="testimonial-grid">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="testimonial-card">
                            <p>&quot;{testimonial.text}&quot;</p>
                            <div className="testimonial-author">
                                <div className="avatar" style={{ background: testimonial.color }}></div>
                                <span>{testimonial.author}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
