import Link from 'next/link';

export default function Header() {
    return (
        <header>
            <div className="container nav-flex">
                <div className="logo">Padres con Resiliencia</div>
                <nav>
                    <Link href="#contacto" style={{ color: "#718096", fontSize: "0.9rem" }}>
                        Contacto
                    </Link>
                </nav>
            </div>
        </header>
    );
}
