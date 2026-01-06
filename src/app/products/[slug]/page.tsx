import prisma from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Search, Menu, Star, ChevronRight, Lock } from "lucide-react";

interface ProductPageProps {
    params: { slug: string };
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { slug } = params;
    const product = await prisma.product.findUnique({
        where: { slug: slug },
    });

    if (!product) {
        notFound();
    }

    // Formatting price logic
    const priceString = product.price.toFixed(2);
    const [whole, fraction] = priceString.split('.');
    const originalPrice = (product.price * 1.5).toFixed(2);

    return (
        <div className="min-h-screen bg-white font-sans text-[#0F1111]">
            {/* Navbar Minimal Clone */}
            <header className="bg-[#131921] h-[60px] flex items-center px-4 gap-4 sticky top-0 z-50">
                <Link href="/" className="border border-transparent hover:border-white rounded-[2px] px-2 py-1 flex items-center mt-1">
                    <span className="text-white text-2xl font-bold tracking-tight">amazon</span>
                    <span className="text-white text-sm mb-3">.es</span>
                </Link>
                <div className="flex-1 hidden md:flex h-[40px] rounded-[4px] overflow-hidden focus-within:ring-[3px] focus-within:ring-[#F90]">
                    <div className="bg-[#F3F3F3] text-[#555] text-[12px] px-3 flex items-center border-r border-[#CDCDCD] cursor-pointer">Todos</div>
                    <input type="text" className="flex-1 px-2 text-[15px] outline-none" placeholder="Buscar..." />
                    <button className="bg-[#FEBD69] hover:bg-[#F3A847] w-[45px] flex items-center justify-center rounded-r-[4px]">
                        <Search className="w-5 h-5 text-[#333]" />
                    </button>
                </div>
            </header>
            <div className="bg-[#232f3e] h-[39px] text-white flex items-center px-4 text-[14px] gap-3">
                <button className="flex items-center gap-1 font-bold border border-transparent hover:border-white px-2 py-1 rounded-[2px]">
                    <Menu className="w-5 h-5" /> Todo
                </button>
                <Link href="/" className="border border-transparent hover:border-white px-2 py-1 rounded-[2px]">Volver a resultados</Link>
            </div>

            <main className="max-w-[1500px] mx-auto p-4 bg-white">

                {/* Breadcrumbs */}
                <div className="text-[12px] text-[#565959] mb-2 flex items-center">
                    <Link href="/" className="hover:text-[#C7511F] hover:underline">Infoproductos</Link>
                    <ChevronRight className="w-3 h-3 mx-1 text-gray-400" />
                    <Link href="/" className="hover:text-[#C7511F] hover:underline">Crianza</Link>
                    <ChevronRight className="w-3 h-3 mx-1 text-gray-400" />
                    <span className="text-[#C7511F] font-bold">{product.title}</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[40px_minmax(300px,45%)_1fr_minmax(220px,280px)] gap-8 mt-6">

                    {/* 1. Thumbnails Column */}
                    <div className="hidden lg:flex flex-col gap-3">
                        {[1, 2].map(i => (
                            <div key={i} className="w-[40px] h-[55px] border border-[#888c8c] hover:border-[#e77600] cursor-pointer rounded-[2px] overflow-hidden p-[2px]">
                                <div className="w-full h-full bg-gray-100 relative">
                                    {product.imageUrl && <Image src={product.imageUrl} alt="" fill className="object-cover opacity-70" />}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* 2. Main Image */}
                    <div className="relative w-full aspect-[4/5] max-h-[600px] min-h-[400px]">
                        {product.imageUrl ? (
                            <Image src={product.imageUrl} alt={product.title} fill className="object-contain" priority />
                        ) : (
                            <div className="w-full h-full bg-gray-50 flex items-center justify-center text-gray-300">Imagen no disponible</div>
                        )}
                    </div>

                    {/* 3. Central Details */}
                    <div className="flex-1 min-w-0">
                        <h1 className="text-[24px] font-medium leading-[32px] mb-1 text-[#0F1111]">{product.title}</h1>
                        <div className="text-[14px] text-[#007185] mb-2 hover:text-[#C7511F] hover:underline cursor-pointer">
                            Visita la tienda de Padres con Resiliencia
                        </div>

                        <div className="flex items-center gap-2 mb-4">
                            <div className="flex text-[#F08804]">
                                {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-4 h-4 fill-current stroke-none" />)}
                            </div>
                            <span className="text-[14px] text-[#007185] hover:text-[#C7511F] hover:underline cursor-pointer">128 valoraciones</span>
                        </div>

                        <hr className="border-gray-200 mb-4" />

                        <div className="mb-2">
                            <span className="text-[#B12704] text-[28px] font-medium leading-none font-sans">
                                <span className="text-[14px] align-top relative top-[4px] mr-[1px] font-normal">€</span>
                                {whole}<span className="text-[14px] align-top relative top-[4px] font-normal">{fraction}</span>
                            </span>
                            <span className="text-[14px] text-gray-500 ml-2">
                                P.V.P.: <span className="line-through">€{originalPrice}</span>
                            </span>
                            <span className="text-[14px] text-[#007185] ml-2 font-medium">Ahorras: €{(Number(originalPrice) - product.price).toFixed(2)}</span>
                        </div>

                        <div className="text-[14px] text-[#007185] mb-6">
                            Los precios incluyen el IVA.
                        </div>

                        <div className="mb-6">
                            <h2 className="font-bold text-[16px] mb-2">Acerca de este producto</h2>
                            <ul className="list-disc pl-5 space-y-1 text-[14px] text-[#0F1111]">
                                {product.description.split('. ').map((item, i) => (
                                    item && <li key={i}>{item}.</li>
                                ))}
                                <li>Formato digital descargable (PDF).</li>
                                <li>Acceso inmediato tras la compra.</li>
                            </ul>
                        </div>
                    </div>

                    {/* 4. Buy Box (Right) */}
                    <div className="border border-[#D5D9D9] rounded-[8px] p-[18px] h-fit bg-white">
                        <div className="text-[#B12704] text-[28px] font-medium leading-none font-sans mb-4">
                            <span className="text-[14px] align-top relative top-[4px] mr-[1px] font-normal">€</span>
                            {whole}<span className="text-[14px] align-top relative top-[4px] font-normal">{fraction}</span>
                        </div>

                        <div className="text-[14px] text-[#007185] mb-2">
                            Entrega GRATIS <span className="text-black font-bold">inmediata</span> por email.
                        </div>

                        <div className="text-[18px] text-[#007600] font-medium mb-4">En Stock.</div>

                        <div className="mb-4">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-[13px] text-gray-500 w-[80px]">Vendido por</span>
                                <span className="text-[13px] text-[#007185]">PadresResilientes</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-[13px] text-gray-500 w-[80px]">Enviado por</span>
                                <span className="text-[13px] text-[#007185]">Hotmart</span>
                            </div>
                        </div>

                        {/* Buy Buttons */}
                        <div className="space-y-3">
                            <a
                                href="https://pay.hotmart.com/N103419626V"
                                className="block w-full bg-[#FFA41C] hover:bg-[#FA8900] border border-[#FF8F00] rounded-full text-center py-[6px] text-[13px] text-[#0F1111] shadow-sm cursor-pointer"
                            >
                                Comprar ahora
                            </a>
                            <div className="text-center text-[12px] text-gray-500 flex items-center justify-center gap-1 mt-2">
                                <Lock className="w-3 h-3" /> Transacción segura
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
