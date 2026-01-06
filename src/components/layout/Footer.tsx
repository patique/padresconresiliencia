export default function Footer() {
    return (
        <footer>
            <div className="container">
                <p>&copy; {new Date().getFullYear()} Padres con Resiliencia. Todos los derechos reservados.</p>
                <p style={{ fontSize: "0.8rem", marginTop: "10px" }}>
                    Aviso legal | Política de Privacidad | Términos y Condiciones
                </p>
            </div>
        </footer>
    );
}
