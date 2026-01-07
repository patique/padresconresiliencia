import Button from '../ui/Button';

export default function DeliverablesSection() {
    const modules = [
        { title: "Fundamentos Emocionales", desc: "La realidad del primer año, gestión del estrés y ansiedad posparto." },
        { title: "Recuperación del Sueño", desc: "Estrategias para recuperar energía y plantillas de planificación de descansos." },
        { title: "Pareja y Equipo", desc: "Rituales de conexión rápidos y cómo construir una red de apoyo sólida." },
        { title: "Herramientas Prácticas", desc: "Técnicas para calmarte en minutos, equilibrio trabajo-familia y cuándo buscar ayuda." },
        { title: "Material de Trabajo", desc: "PDFs descargables por capítulo, checklists de autoevaluación y scripts de técnicas." }
    ];

    const bonuses = [
        "Checklist semanal de autoevaluación.",
        "Plantilla de turnos y descansos.",
        "Lista de 10 rituales de conexión.",
        "Tu Plan de Acción Personalizado."
    ];

    return (
        <section className="bg-white">
            <div className="container">
                <div className="hero-grid">
                    <div className="deliverables-list">
                        <h3>Tu Programa Completo de Bienestar Parental</h3>
                        <p style={{ marginBottom: "20px" }}>Un recorrido paso a paso dividido en 9 Módulos + Bonus para transformar tu experiencia de crianza:</p>
                        <ul>
                            {modules.map((mod, i) => (
                                <li key={i}><strong>{mod.title}:</strong> {mod.desc}</li>
                            ))}
                        </ul>
                        <div style={{ background: "#FFF5F5", padding: "15px", borderRadius: "10px", marginTop: "20px", borderLeft: "4px solid #E07A5F" }}>
                            <h4 style={{ marginBottom: "5px", color: "#E07A5F" }}>🎁 BONUS EXCLUSIVOS INCLUIDOS</h4>
                            <ul style={{ marginBottom: "0", fontSize: "0.95rem", listStyle: "none", paddingLeft: "0" }}>
                                {bonuses.map((bonus, i) => (
                                    <li key={i} style={{ border: "none", padding: "5px 0", margin: "0" }}>✅ {bonus}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="text-center" style={{ alignSelf: "center" }}>
                        <h3>Imagina despertar mañana descansado/a</h3>
                        <p>Tener energía para jugar, paciencia para enseñar y claridad para disfrutar. Eso es lo que estás comprando hoy.</p>
                        <Button href="https://pay.hotmart.com/N103419626V">
                            Quiero Empezar Esta Noche
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
