'use client';

import Link from 'next/link';

export default function MetricsPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/panel-pr2024/dashboard" className="text-gray-500 hover:text-gray-700">
                            ← Volver
                        </Link>
                        <h1 className="text-xl font-bold text-gray-900">Métricas Detalladas</h1>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
                    <div className="text-6xl mb-4">📊</div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Próximamente</h2>
                    <p className="text-gray-500 max-w-md mx-auto">
                        Estamos trabajando en visualizaciones avanzadas de tus ventas, tasas de conversión y análisis por país.
                    </p>
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto opacity-50 pointer-events-none select-none filter blur-sm">
                        {/* Mockups de gráficos difuminados para dar idea de lo que vendrá */}
                        <div className="h-48 bg-gray-100 rounded-lg"></div>
                        <div className="h-48 bg-gray-100 rounded-lg"></div>
                        <div className="h-48 bg-gray-100 rounded-lg"></div>
                    </div>
                </div>
            </main>
        </div>
    );
}
