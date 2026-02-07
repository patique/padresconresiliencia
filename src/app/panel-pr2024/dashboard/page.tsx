'use client';

import { useSession, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Sale {
    transactionId: string;
    productName: string;
    pricePaid: number;
    currency: string;
    purchaseDate: string;
    customerEmail: string;
    customerName: string;
    customerCountry: string;
}

interface DashboardStats {
    totalSales: number;
    salesToday: number;
    totalAbandoned: number;
    totalCanceled: number;
    revenueTodayEUR: number;
    totalRevenueEUR: number;
    revenueByCurrency: Record<string, number>;
}

interface DashboardData {
    stats: DashboardStats;
    sales: Sale[];
    negativeEvents: any[];
}

type TabType = 'overview' | 'sales' | 'issues' | 'emails';

export default function DashboardPage() {
    const { data: session } = useSession();
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<TabType>('overview');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('/api/admin/stats');
            const result = await response.json();

            if (result.success) {
                setData(result);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
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
                            <button
                                onClick={fetchData}
                                className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition"
                            >
                                🔄 Actualizar
                            </button>
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
                {/* KPIs Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <KPICard
                        title="Ventas Totales"
                        value={data?.stats.totalSales || 0}
                        subtitle={`${data?.stats.salesToday || 0} hoy`}
                        icon="💰"
                        color="green"
                        loading={loading}
                    />
                    <KPICard
                        title="Ingresos Totales"
                        value={`${(data?.stats.totalRevenueEUR || 0).toFixed(2)} €`}
                        subtitle="Convertido a EUR"
                        icon="💵"
                        color="blue"
                        loading={loading}
                    />
                    <KPICard
                        title="Carritos Abandonados"
                        value={data?.stats.totalAbandoned || 0}
                        subtitle="Oportunidades de recuperación"
                        icon="🛒"
                        color="yellow"
                        loading={loading}
                    />
                    <KPICard
                        title="Compras Canceladas"
                        value={data?.stats.totalCanceled || 0}
                        subtitle="Requieren seguimiento"
                        icon="❌"
                        color="red"
                        loading={loading}
                    />
                </div>

                {/* Tabs */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="border-b border-gray-200">
                        <nav className="flex -mb-px">
                            <TabButton
                                active={activeTab === 'overview'}
                                onClick={() => setActiveTab('overview')}
                                icon="📊"
                                label="Resumen"
                            />
                            <TabButton
                                active={activeTab === 'sales'}
                                onClick={() => setActiveTab('sales')}
                                icon="✅"
                                label={`Ventas (${data?.sales.length || 0})`}
                            />
                            <TabButton
                                active={activeTab === 'issues'}
                                onClick={() => setActiveTab('issues')}
                                icon="⚠️"
                                label={`Problemas (${data?.negativeEvents.length || 0})`}
                            />
                            <TabButton
                                active={activeTab === 'emails'}
                                onClick={() => setActiveTab('emails')}
                                icon="📧"
                                label="Gestión de Emails"
                            />
                        </nav>
                    </div>

                    <div className="p-6">
                        {activeTab === 'overview' && (
                            <OverviewTab data={data} loading={loading} />
                        )}
                        {activeTab === 'sales' && (
                            <SalesTab sales={data?.sales || []} loading={loading} />
                        )}
                        {activeTab === 'issues' && (
                            <IssuesTab issues={data?.negativeEvents || []} loading={loading} />
                        )}
                        {activeTab === 'emails' && (
                            <EmailsTab />
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}

function KPICard({ title, value, subtitle, icon, color, loading }: any) {
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
            <h3 className="text-sm font-medium text-gray-600 mb-2">{title}</h3>
            {loading ? (
                <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
            ) : (
                <>
                    <div className="text-3xl font-bold text-gray-900 mb-1">{value}</div>
                    <p className="text-xs text-gray-500">{subtitle}</p>
                </>
            )}
        </div>
    );
}

function TabButton({ active, onClick, icon, label }: any) {
    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition ${active
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
        >
            <span>{icon}</span>
            <span>{label}</span>
        </button>
    );
}

function OverviewTab({ data, loading }: any) {
    if (loading) {
        return <div className="text-center py-12 text-gray-500">Cargando...</div>;
    }

    const recentSales = data?.sales.slice(0, 5) || [];
    const recentIssues = data?.negativeEvents.slice(0, 5) || [];

    return (
        <div className="space-y-6">
            {/* Sales Chart */}
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Ventas Últimos 30 Días</h3>
                <SalesChart chartData={data?.chartData || []} />
            </div>

            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Últimas Ventas</h3>
                {recentSales.length > 0 ? (
                    <div className="space-y-3">
                        {recentSales.map((sale: Sale, idx: number) => (
                            <div key={idx} className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                                <div>
                                    <p className="font-medium text-gray-900">{sale.customerName}</p>
                                    <p className="text-sm text-gray-600">{sale.productName}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-green-600">{sale.pricePaid} {sale.currency}</p>
                                    <p className="text-xs text-gray-500">{new Date(sale.purchaseDate).toLocaleDateString('es-ES')}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 text-center py-8">No hay ventas recientes</p>
                )}
            </div>

            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Problemas Recientes</h3>
                {recentIssues.length > 0 ? (
                    <div className="space-y-3">
                        {recentIssues.map((issue: any, idx: number) => (
                            <div key={idx} className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                                <div>
                                    <p className="font-medium text-gray-900">{issue.name}</p>
                                    <p className="text-sm text-gray-600">{issue.product}</p>
                                </div>
                                <span className={`px-3 py-1 text-xs font-medium rounded-full ${issue.event === 'PURCHASE_CANCELED'
                                    ? 'bg-red-100 text-red-700'
                                    : 'bg-yellow-100 text-yellow-700'
                                    }`}>
                                    {issue.event === 'PURCHASE_CANCELED' ? 'Cancelado' : 'Abandonado'}
                                </span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 text-center py-8">No hay problemas recientes</p>
                )}
            </div>
        </div>
    );
}

function SalesTab({ sales, loading }: { sales: Sale[], loading: boolean }) {
    if (loading) {
        return <div className="text-center py-12 text-gray-500">Cargando ventas...</div>;
    }

    if (sales.length === 0) {
        return <div className="text-center py-12 text-gray-500">No hay ventas registradas</div>;
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cliente</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Producto</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Monto</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">País</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {sales.map((sale, idx) => (
                        <tr key={idx} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">{sale.customerName}</div>
                                <div className="text-sm text-gray-500">{sale.customerEmail}</div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="text-sm text-gray-900">{sale.productName}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className="text-sm font-semibold text-green-600">
                                    {sale.pricePaid.toFixed(2)} {sale.currency}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {sale.customerCountry || 'N/A'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {new Date(sale.purchaseDate).toLocaleDateString('es-ES')}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function IssuesTab({ issues, loading }: any) {
    if (loading) {
        return <div className="text-center py-12 text-gray-500">Cargando problemas...</div>;
    }

    if (issues.length === 0) {
        return <div className="text-center py-12 text-gray-500">¡No hay problemas! 🎉</div>;
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Usuario</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Producto</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tipo</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">País</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {issues.map((issue: any, idx: number) => (
                        <tr key={idx} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">{issue.name}</div>
                                <div className="text-sm text-gray-500">{issue.email}</div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="text-sm text-gray-900">{issue.product}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${issue.event === 'PURCHASE_CANCELED'
                                    ? 'bg-red-100 text-red-700'
                                    : 'bg-yellow-100 text-yellow-700'
                                    }`}>
                                    {issue.event === 'PURCHASE_CANCELED' ? 'Cancelado' : 'Abandonado'}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {issue.country || 'N/A'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {new Date(issue.date).toLocaleDateString('es-ES')}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function EmailsTab() {
    return (
        <div className="text-center py-12">
            <div className="text-6xl mb-4">📧</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Gestión de Emails</h3>
            <p className="text-gray-600 mb-6">
                Accede a la página completa de gestión de emails para enviar recordatorios
            </p>
            <Link
                href="/panel-pr2024/emails"
                className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
            >
                Ir a Gestión de Emails
            </Link>
        </div>
    );
}

function SalesChart({ chartData }: { chartData: any[] }) {
    if (!chartData || chartData.length === 0) {
        return (
            <div className="bg-gray-50 rounded-lg p-8 text-center text-gray-500">
                No hay datos suficientes para mostrar el gráfico
            </div>
        );
    }

    // Formatear datos para el gráfico
    const formattedData = chartData.map(item => ({
        ...item,
        fecha: new Date(item.date).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' })
    }));

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={formattedData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis
                        dataKey="fecha"
                        tick={{ fontSize: 12 }}
                        stroke="#9ca3af"
                    />
                    <YAxis
                        tick={{ fontSize: 12 }}
                        stroke="#9ca3af"
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#fff',
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                            padding: '12px'
                        }}
                        labelStyle={{ fontWeight: 'bold', marginBottom: '4px' }}
                    />
                    <Line
                        type="monotone"
                        dataKey="sales"
                        stroke="#10b981"
                        strokeWidth={2}
                        dot={{ fill: '#10b981', r: 4 }}
                        activeDot={{ r: 6 }}
                        name="Ventas"
                    />
                </LineChart>
            </ResponsiveContainer>
            <p className="text-center text-sm text-gray-500 mt-4">
                Número de ventas por día (últimos 30 días)
            </p>
        </div>
    );
}

