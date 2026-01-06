import Button from '../ui/Button';

export default function FinalCtaSection() {
    return (
        <section className="bg-light text-center" style={{ padding: "80px 0" }}>
            <div className="container">
                <h2>Tu nueva vida empieza con una decisión</h2>
                <p style={{ marginBottom: "30px" }}>Dale a tu bebé el regalo de unos padres descansados y felices.</p>
                <Button
                    href="https://pay.hotmart.com/N103419626V"
                    style={{ fontSize: "1.4rem", padding: "20px 50px" }}
                >
                    Descargar Guía + Bonos Ahora
                </Button>
            </div>
        </section>
    );
}
