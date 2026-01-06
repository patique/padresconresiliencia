export default function SolutionSection() {
    const benefits = [
        {
            icon: "🌙",
            title: "Noches de Sueño Real",
            description: "Estrategias respetuosas para que tu bebé (y tú) durmáis más horas seguidas."
        },
        {
            icon: "🧠",
            title: "Salud Mental Blindada",
            description: "Técnicas probadas para reducir la ansiedad y el estrés posparto."
        },
        {
            icon: "❤️",
            title: "Conexión de Pareja",
            description: "Herramientas para fortalecer la relación en lugar de desgastarla."
        }
    ];

    return (
        <section className="bg-light">
            <div className="container">
                <h2>Recupera el Control y la Calma</h2>
                <div className="benefits-grid">
                    {benefits.map((benefit, index) => (
                        <div key={index} className="benefit-card">
                            <div className="benefit-icon">{benefit.icon}</div>
                            <h3>{benefit.title}</h3>
                            <p>{benefit.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
