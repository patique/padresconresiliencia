import Image from 'next/image';

export default function AuthorSection() {
    return (
        <section className="bg-white">
            <div className="container" style={{ maxWidth: "1000px" }}>
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "40px",
                    background: "#FDFBF7",
                    padding: "50px",
                    borderRadius: "30px",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.05)"
                }} className="flex-col md:flex-row">
                    <div style={{ width: "220px", height: "220px", flexShrink: 0, position: "relative" }}>
                        <div style={{ position: "absolute", inset: "-5px", background: "#76A5AF", borderRadius: "20px", transform: "rotate(4deg)", opacity: 0.2 }}></div>
                        {/* Note: Use fill or dimensions. Container is 220x220 */}
                        <Image
                            src="/maximo tq.png"
                            alt="Máximo"
                            width={220}
                            height={220}
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                borderRadius: "20px",
                                border: "5px solid white",
                                boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
                            }}
                        />
                    </div>
                    <div className="text-center md:text-left">
                        <h3 style={{ color: "#E07A5F", fontWeight: "bold", textTransform: "uppercase", fontSize: "0.9rem", letterSpacing: "1px", marginBottom: "10px" }}>Conoce al autor</h3>
                        <h2 style={{ marginBottom: "20px", textAlign: "inherit" }}>Hola, soy Máximo</h2>
                        <p style={{ fontSize: "1.1rem", color: "#4A5568", marginBottom: "20px" }}>
                            Entiendo perfectamente por lo que estás pasando porque yo también estuve ahí. Mi propósito con <strong>Padres con Resiliencia</strong> es acompañarte en este viaje, aportando claridad donde hay dudas y herramientas prácticas donde hay agotamiento.
                        </p>
                        <p style={{ fontStyle: "italic", color: "#718096" }}>
                            &quot;Mi misión es que cada padre y madre recupere la confianza en sí mismo para disfrutar de la etapa más importante de sus vidas.&quot;
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
