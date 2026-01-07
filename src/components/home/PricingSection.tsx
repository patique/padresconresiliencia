import Button from '../ui/Button';

export default function PricingSection() {
    return (
        <section id="oferta" className="bg-light">
            <div className="container">
                <div className="pricing-card">
                    <p style={{ textTransform: "uppercase", fontWeight: "bold", color: "#718096" }}>Inversión Única en tu Bienestar</p>
                    <div className="price-old">129.90 €</div>
                    <p className="price" style={{ fontSize: "2.5rem", fontWeight: "bold", lineHeight: "1.2" }}>Hoy: <span className="highlight" style={{ fontSize: "4.5rem" }}>7.99€</span> <span style={{ fontSize: "1.5rem", fontWeight: "normal", color: "#718096" }}>+ IVA</span></p>
                    <p style={{ marginBottom: "30px" }}>Una inversión en la salud de tu familia.</p>

                    <Button href="https://pay.hotmart.com/N103419626V" variant="full">
                        Obtener Acceso Inmediato
                    </Button>

                    <div style={{ marginTop: "30px" }}>
                        <p style={{ fontSize: "0.9rem", color: "#718096", marginBottom: "10px" }}>Métodos de pago aceptados:</p>
                        <div style={{ display: "flex", justifyContent: "center", gap: "15px", flexWrap: "wrap", color: "#4A5568", fontWeight: 600, fontSize: "0.9rem" }}>
                            <span>💳 Tarjeta de crédito</span>
                            <span>🅿️ Paypal</span>
                            <span>📱 Google Pay</span>
                            <span>🍎 Apple Pay</span>
                            <span>🛍️ Klarna</span>
                        </div>
                    </div>
                </div>

                {/* Guarantee Block */}
                <div className="guarantee-box" style={{ maxWidth: "800px", margin: "50px auto 0" }}>
                    <div className="guarantee-badge">
                        GARANTÍA<br />TOTAL
                    </div>
                    <div>
                        <h3>Nuestra Promesa de Tranquilidad</h3>
                        <p>
                            No queremos que arriesgues ni un centavo. Prueba el método durante 15 días completos. Si no
                            sientes que tu vida familiar ha mejorado, si no duermes mejor, simplemente escríbenos y te
                            devolveremos tu dinero. Sin letra pequeña.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
