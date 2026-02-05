'use client';

import { useSession, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface DashboardStats {
    totalSales: number;
    totalAbandoned: number;
    totalCanceled: number;
    revenueToday: number;
    canceledEmails: Array<{
        email: string;
        name: string;
        product: string;
        country: string;
        date: string;
        event: string;
    }>;
}

export default function DashboardPage() {
    const { data: session } = useSession();
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const response = await fetch('/api/get-canceled-emails');
            const data = await response.json();

            setStats({
                totalSales: 0, // TODO: Implementar
                totalAbandoned: data.stats?.abandoned || 0,
                totalCanceled: data.stats?.canceled || 0,
                revenueToday: 0, // TODO: Implementar
                canceledEmails: data.details || [],
            });
        } catch (error) {
            console.error('Error fetching stats:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">PR</span>
                            </div>
                            <div>
                                <h1 className="text-lg font-bold text-gray-900">Panel de Administración</h1>
                                <p className="text-xs text-gray-500">Padres con Resiliencia</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="text-right">
                                <p className="text-sm font-medium text-gray-900">{session?.user?.name}</p>
                                <p className="text-xs text-gray-500">{session?.user?.email}</p>
                            </div>
                            <button
                                onClick={() => signOut({ callbackUrl: '/panel-pr2024/login' })}
                                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition"
                            >
                                Cerrar Sesión
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard
                        title="Ventas Hoy"
                        value={stats?.totalSales || 0}
                        icon="💰"
                        color="green"
                        loading={loading}
                    />
                    <StatCard
                        title="Carritos Abandonados"
                        value={stats?.totalAbandoned || 0}
                        icon="🛒"
                        color="yellow"
                        loading={loading}
                    />
                    <StatCard
                        title="Compras Canceladas"
                        value={stats?.totalCanceled || 0}
                        icon="❌"
                        color="red"
                        loading={loading}
                    />
                    <StatCard
                        title="Ingresos Hoy"
                        value={`${stats?.revenueToday || 0}€`}
                        icon="📈"
                        color="blue"
                        loading={loading}
                    />
                </div>

                {/* Recent Canceled/Abandoned */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-900">
                            Compras Canceladas y Carritos Abandonados
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">
                            Usuarios que no completaron la compra
                        </p>
                    </div>

                    <div className="divide-y divide-gray-200">
                        {loading ? (
                            <div className="p-8 text-center">
                                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-blue-600"></div>
                                <p className="mt-2 text-sm text-gray-500">Cargando datos...</p>
                            </div>
                        ) : stats?.canceledEmails && stats.canceledEmails.length > 0 ? (
                            stats.canceledEmails.slice(0, 10).map((item, index) => (
                                <div key={index} className="p-6 hover:bg-gray-50 transition">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="font-semibold text-gray-900">{item.name}</h3>
                                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${item.event === 'PURCHASE_CANCELED'
                                                        ? 'bg-red-100 text-red-700'
                                                        : 'bg-yellow-100 text-yellow-700'
                                                    }`}>
                                                    {item.event === 'PURCHASE_CANCELED' ? 'Cancelado' : 'Abandonado'}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-600 mb-1">
                                                📧 {item.email}
                                            </p>
                                            <p className="text-sm text-gray-600 mb-1">
                                                📚 {item.product}
                                            </p>
                                            <div className="flex items-center gap-4 text-xs text-gray-500 mt-2">
                                                <span>🌍 {item.country || 'N/A'}</span>
                                                <span>🕐 {new Date(item.date).toLocaleDateString('es-ES')}</span>
                                            </div>
                                        </div>
                                        <button className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition">
                                            Enviar Recordatorio
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="p-8 text-center text-gray-500">
                                <p>No hay compras canceladas o carritos abandonados</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <QuickAction
                        title="Gestión de Emails"
                        description="Ver y enviar recordatorios"
                        icon="📧"
                        href="/panel-pr2024/emails"
                    />
                    <QuickAction
                        title="Métricas Detalladas"
                        description="Gráficos y análisis"
                        icon="📊"
                        href="/panel-pr2024/metrics"
                    />
                    <QuickAction
                        title="Configuración"
                        description="Ajustes del sistema"
                        icon="⚙️"
                        href="/panel-pr2024/settings"
                    />
                </div>
            </main>
        </div>
    );
}

function StatCard({ title, value, icon, color, loading }: any) {
    const colorClasses = {
        green: 'from-green-500 to-emerald-600',
        yellow: 'from-yellow-500 to-orange-600',
        red: 'from-red-500 to-rose-600',
        blue: 'from-blue-500 to-indigo-600',
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
                <span className="text-3xl">{icon}</span>
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${colorClasses[color]} opacity-10`}></div>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">{title}</h3>
            {loading ? (
                <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
            ) : (
                <p className="text-3xl font-bold text-gray-900">{value}</p>
            )}
        </div>
    );
}

function QuickAction({ title, description, icon, href }: any) {
    return (
        <Link
            href={href}
            className="block bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-blue-300 transition group"
        >
            <div className="text-4xl mb-3">{icon}</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition">
                {title}
            </h3>
            <p className="text-sm text-gray-600">{description}</p>
        </Link>
    );
}
