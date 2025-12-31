import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bienestar Emocional de los Padres - Guía Práctica",
  description: "Guía práctica para el bienestar emocional de los padres durante el primer año.",
};

export default function Home() {
  return (
    <>
      {/* Header */}
      <header>
        <div className="container nav-flex">
          <div className="logo">Padres con Resiliencia</div>
          <nav>
            {/* Placeholder for future links */}
            <a href="#contacto" style={{ color: "#718096", fontSize: "0.9rem" }}>Contacto</a>
          </nav>
        </div>
      </header>

      {/* Hero Section: The Promise & The Problem */}
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-content">
            <p className="highlight bold" style={{ textTransform: "uppercase", letterSpacing: "1px", fontSize: "0.9rem" }}>
              Para padres que anhelan una noche de paz
            </p>
            <h1>¿Recuerdas cuándo fue la última vez que dormiste 8 horas seguidas?</h1>
            <p className="hero-subtitle">
              Ser padre es maravilloso, pero el agotamiento no tiene por qué ser parte del
              paquete. Descubre el método que está devolviendo el descanso (y la cordura) a cientos de hogares.
            </p>
            <a href="https://pay.hotmart.com/N103419626V" className="btn">Sí, Necesito Descansar</a>
            <p style={{ marginTop: "15px", fontSize: "0.9rem", color: "#718096" }}>
              📥 Acceso Inmediato a la Plataforma | 🔒 Pago Seguro
            </p>
          </div>
          <div className="hero-img">
            <img src="/ebook_cover_real.jpg" alt="Portada del Ebook Bienestar Emocional de los Padres" />
          </div>
        </div>
      </section>

      {/* Empathy / Agitation */}
      <section className="bg-white">
        <div className="container">
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <h2>La Crianza No Debería Sentirse Como una Supervivencia</h2>
            <p>
              Sabemos lo que es. El café ya no hace efecto. Te irritas por cosas pequeñas. Y te sientes culpable por no
              disfrutar de esta etapa tanto como "deberías".
            </p>
            <p>
              No es culpa tuya. Nadie nos enseña a gestionar el tsunami emocional y físico que supone un bebé. Pero
              tenemos una buena noticia: <strong>No tienes que esperar a que "se le pase" para volver a vivir.</strong>
            </p>
          </div>
        </div>
      </section>

      {/* Benefits / Solution */}
      <section className="bg-light">
        <div className="container">
          <h2>Recupera el Control y la Calma</h2>
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">🌙</div>
              <h3>Noches de Sueño Real</h3>
              <p>Estrategias respetuosas para que tu bebé (y tú) durmáis más horas seguidas.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">🧠</div>
              <h3>Salud Mental Blindada</h3>
              <p>Técnicas probadas para reducir la ansiedad y el estrés posparto.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">❤️</div>
              <h3>Conexión de Pareja</h3>
              <p>Herramientas para fortalecer la relación en lugar de desgastarla.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="bg-white">
        <div className="container">
          <h2>Historias de Noches Silenciosas</h2>
          <div className="testimonial-grid">
            <div className="testimonial-card">
              <p>"Pensé que nunca volvería a dormir. En 3 días aplicando el módulo de sueño, pasamos de 5 despertares a solo 1. Gracias."</p>
              <div className="testimonial-author">
                <div className="avatar" style={{ background: "#E07A5F" }}></div>
                <span>María G., Mamá primeriza</span>
              </div>
            </div>
            <div className="testimonial-card">
              <p>"Lo compré por desesperación y me sorprendió la parte emocional. Me ayudó a entender mis propios miedos. Muy recomendado."</p>
              <div className="testimonial-author">
                <div className="avatar" style={{ background: "#76A5AF" }}></div>
                <span>Carlos R., Papá de Sofía</span>
              </div>
            </div>
            <div className="testimonial-card">
              <p>"Directo al grano. Sin paja. Justo lo que necesitas cuando no tienes tiempo ni energía."</p>
              <div className="testimonial-author">
                <div className="avatar" style={{ background: "#F6AD55" }}></div>
                <span>Carla D., Mamá de mellizos</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Deliverables (What do I get exactly?) */}
      <section className="bg-white">
        <div className="container">
          <div className="hero-grid">
            <div className="deliverables-list">
              <h3>Tu Programa Completo de Bienestar Parental</h3>
              <p style={{ marginBottom: "20px" }}>Un recorrido paso a paso dividido en 9 Módulos + Bonus para transformar tu experiencia de crianza:</p>
              <ul>
                <li><strong>Fundamentos Emocionales:</strong> La realidad del primer año, gestión del estrés y ansiedad posparto.</li>
                <li><strong>Recuperación del Sueño:</strong> Estrategias para recuperar energía y plantillas de planificación de descansos.</li>
                <li><strong>Pareja y Equipo:</strong> Rituales de conexión rápidos y cómo construir una red de apoyo sólida.</li>
                <li><strong>Herramientas Prácticas:</strong> Técnicas para calmarte en minutos, equilibrio trabajo-familia y cuándo buscar ayuda.</li>
                <li><strong>Material de Trabajo:</strong> PDFs descargables por capítulo, checklists de autoevaluación y scripts de técnicas.</li>
              </ul>
              <div style={{ background: "#FFF5F5", padding: "15px", borderRadius: "10px", marginTop: "20px", borderLeft: "4px solid #E07A5F" }}>
                <h4 style={{ marginBottom: "5px", color: "#E07A5F" }}>🎁 BONUS EXCLUSIVOS INCLUIDOS</h4>
                <ul style={{ marginBottom: "0", fontSize: "0.95rem", listStyle: "none", paddingLeft: "0" }}>
                  <li style={{ border: "none", padding: "5px 0", margin: "0" }}>✅ Checklist semanal de autoevaluación.</li>
                  <li style={{ border: "none", padding: "5px 0", margin: "0" }}>✅ Plantilla de turnos y descansos.</li>
                  <li style={{ border: "none", padding: "5px 0", margin: "0" }}>✅ Lista de 10 rituales de conexión.</li>
                  <li style={{ border: "none", padding: "5px 0", margin: "0" }}>✅ Tu Plan de Acción Personalizado.</li>
                </ul>
              </div>
            </div>
            <div className="text-center" style={{ alignSelf: "center" }}>
              <h3>Imagina despertar mañana descansado/a</h3>
              <p>Tener energía para jugar, paciencia para enseñar y claridad para disfrutar. Eso es lo que estás comprando hoy.</p>
              <a href="https://pay.hotmart.com/N103419626V" className="btn">Quiero Empezar Esta Noche</a>
            </div>
          </div>
        </div>
      </section>

      {/* Offer, Price & Guarantee */}
      <section id="oferta" className="bg-light">
        <div className="container">
          <div className="pricing-card">
            <p style={{ textTransform: "uppercase", fontWeight: "bold", color: "#718096" }}>Inversión Única en tu Bienestar</p>
            <div className="price-old">129.90 €</div>
            <div className="price-new">19.90 € <span style={{ fontSize: "1rem", fontWeight: "normal", color: "#718096" }}>+ IVA</span></div>
            <p style={{ marginBottom: "30px" }}>Una inversión en la salud de tu familia.</p>

            <a href="https://pay.hotmart.com/N103419626V" className="btn btn-full">Obtener Acceso Inmediato</a>

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

      {/* Urgency (What if I wait?) */}
      <section className="bg-accent text-center">
        <div className="container">
          <h2>El tiempo pasa muy rápido</h2>
          <p style={{ maxWidth: "700px", margin: "0 auto 30px" }}>
            Estos primeros meses no volverán. No dejes que el
            cansancio nuble tus recuerdos. Toma acción hoy y empieza a construir la familia feliz y descansada que
            soñaste.
          </p>
        </div>
      </section>

      {/* FAQ & Contact */}
      <section className="bg-white">
        <div className="container" style={{ maxWidth: "800px" }}>
          <h2 className="text-center">¿Tienes dudas?</h2>

          <div className="faq-item">
            <div className="faq-question">¿Funcionará para mi bebé?</div>
            <div className="faq-answer">
              Cada niño es único, pero los principios biológicos del sueño son universales. La
              guía te enseña a adaptar las rutinas a tu situación específica.
            </div>
          </div>

          <div className="faq-item">
            <div className="faq-question">¿Cómo accedo al contenido?</div>
            <div className="faq-answer">
              El programa consta de 9 módulos principales más bonus en una plataforma online. Podrás ir accediendo a los temas y descargando los materiales de trabajo progresivamente. El PDF completo del libro se desbloqueará a los 30 días para que lo tengas para siempre.
            </div>
          </div>

          <div className="faq-item">
            <div className="faq-question">¿Necesito ayuda extra?</div>
            <div className="faq-answer">
              La guía es muy completa, pero si tienes alguna pregunta técnica sobre la
              descarga, estamos a un clic en <a href="mailto:padresconresiliencia@gmail.com" style={{ color: "#E07A5F" }}>padresconresiliencia@gmail.com</a>.
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-light text-center" style={{ padding: "80px 0" }}>
        <div className="container">
          <h2>Tu nueva vida empieza con una decisión</h2>
          <p style={{ marginBottom: "30px" }}>Dale a tu bebé el regalo de unos padres descansados y felices.</p>
          <a href="https://pay.hotmart.com/N103419626V" className="btn" style={{ fontSize: "1.4rem", padding: "20px 50px" }}>Descargar Guía + Bonos Ahora</a>
        </div>
      </section>

      <footer>
        <div className="container">
          <p>&copy; 2025 Padres con Resiliencia. Todos los derechos reservados.</p>
          <p style={{ fontSize: "0.8rem", marginTop: "10px" }}>Aviso legal | Política de Privacidad | Términos y Condiciones</p>
        </div>
      </footer>
    </>
  );
}
