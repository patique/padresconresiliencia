export default function FaqSection() {
    const faqs = [
        {
            q: "¿Funcionará para mi bebé?",
            a: "Cada niño es único, pero los principios biológicos del sueño son universales. La guía te enseña a adaptar las rutinas a tu situación específica."
        },
        {
            q: "¿Cómo accedo al contenido?",
            a: "El programa consta de 9 módulos principales más bonus en una plataforma online. Podrás ir accediendo a los temas y descargando los materiales de trabajo progresivamente. El PDF completo del libro se desbloqueará a los 30 días para que lo tengas para siempre."
        },
        {
            q: "¿Necesito ayuda extra?",
            a: (
                <>
                    La guía es muy completa, pero si tienes alguna pregunta técnica sobre la
                    descarga, estamos a un clic en <a href="mailto:padresconresiliencia@gmail.com" style={{ color: "#E07A5F" }}>padresconresiliencia@gmail.com</a>.
                </>
            )
        }
    ];

    return (
        <section className="bg-white">
            <div className="container" style={{ maxWidth: "800px" }}>
                <h2 className="text-center">¿Tienes dudas?</h2>
                {faqs.map((faq, i) => (
                    <div key={i} className="faq-item">
                        <div className="faq-question">{faq.q}</div>
                        <div className="faq-answer">{faq.a}</div>
                    </div>
                ))}
            </div>
        </section>
    );
}
