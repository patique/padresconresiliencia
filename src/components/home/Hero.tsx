import Image from 'next/image';
import Button from '../ui/Button';

export default function Hero() {
    return (
        <section className="hero">
            <div className="container hero-grid">
                <div className="hero-content">
                    <p className="highlight bold" style={{ textTransform: "uppercase", letterSpacing: "1px", fontSize: "0.9rem" }}>
                        Para padres que anhelan una noche de paz
                    </p>
                    <h1>Cómo recuperar el Sueño, la Calma y la Conexión con tu Pareja sin dejar de ser tú misma.</h1>
                    <p className="hero-subtitle">
                        Ser padre es maravilloso, pero el agotamiento no tiene por qué ser parte del
                        paquete. Descubre el método que está devolviendo el descanso (y la cordura) a cientos de hogares.
                    </p>
                    <Button href="https://pay.hotmart.com/N103419626V">
                        Sí, Necesito Descansar
                    </Button>
                    <p style={{ marginTop: "15px", fontSize: "0.9rem", color: "#718096" }}>
                        📥 Acceso Inmediato a la Plataforma | 🔒 Pago Seguro
                    </p>
                </div>
                <div className="hero-img">
                    {/* Note: In a real scenario, use actual dimensions or "fill" strategy */}
                    <Image
                        src="/pareja_frustrada_2.jpg"
                        alt="Pareja de padres agotados y distantes en el sofá, ilustrando la desconexión y el estrés que afecta la relación durante la crianza."
                        width={600}
                        height={400}
                        style={{ width: '100%', height: 'auto', borderRadius: '10px', boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)' }}
                        priority
                    />
                </div>
            </div>
        </section>
    );
}
