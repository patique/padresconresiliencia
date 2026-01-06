import prisma from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { Search, Menu, Star } from "lucide-react";

export const revalidate = 60;

export default async function HomePage() {
  const products = await prisma.product.findMany();

  return (
    <div className="min-h-screen bg-[#E3E6E6] font-sans">
      {/* Navbar Main - 100% width, correct hex codes */}
      <header className="bg-[#131921] h-[60px] flex items-center px-4 gap-4 sticky top-0 z-50">
        {/* Logo area */}
        <Link href="/" className="border border-transparent hover:border-white rounded-[2px] px-2 py-1 flex items-center mt-1">
          <span className="text-white text-2xl font-bold tracking-tight">amazon</span>
          <span className="text-white text-sm mb-3">.es</span>
        </Link>

        {/* Address - Hidden on small screens */}
        <div className="hidden md:flex flex-col text-white leading-[14px] border border-transparent hover:border-white p-2 rounded-[2px] cursor-pointer ml-1">
          <span className="text-[#CCCCCC] text-[12px] ml-[18px]">Enviar a Pablo</span>
          <div className="flex items-center">
            <svg className="h-4 w-4 text-white -ml-1 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="font-bold text-[14px]">Madrid 28001</span>
          </div>
        </div>

        {/* Search Bar - Exactly like Amazon */}
        <div className="flex-1 hidden md:flex h-[40px] rounded-[4px] overflow-hidden focus-within:ring-[3px] focus-within:ring-[#F90]">
          <div className="bg-[#F3F3F3] text-[#555] text-[12px] px-3 flex items-center border-r border-[#CDCDCD] cursor-pointer hover:bg-[#DADADA] hover:text-black">
            Todos
            <svg className="ml-1 w-2 h-2 fill-current" viewBox="0 0 10 6"><path d="M10 0L5 6 0 0z" /></svg>
          </div>
          <input type="text" className="flex-1 px-2 text-[15px] outline-none placeholder-gray-500" placeholder="Buscar Amazon.es" />
          <button className="bg-[#FEBD69] hover:bg-[#F3A847] w-[45px] flex items-center justify-center rounded-r-[4px]">
            <Search className="w-5 h-5 text-[#333]" strokeWidth={2.5} />
          </button>
        </div>

        {/* Account & Lists */}
        <div className="hidden md:flex flex-col text-white leading-[14px] border border-transparent hover:border-white p-2 rounded-[2px] cursor-pointer relative group">
          <span className="text-[12px]">Hola, identifícate</span>
          <span className="font-bold text-[14px] flex items-center">
            Cuenta y listas
            <svg className="ml-1 w-2 h-2 fill-[#A7ACAC]" viewBox="0 0 10 6"><path d="M10 0L5 6 0 0z" /></svg>
          </span>
        </div>

        {/* Returns */}
        <div className="hidden md:flex flex-col text-white leading-[14px] border border-transparent hover:border-white p-2 rounded-[2px] cursor-pointer">
          <span className="text-[12px]">Devoluciones</span>
          <span className="font-bold text-[14px]">y Pedidos</span>
        </div>
      </header>

      {/* Sub-header */}
      <div className="bg-[#232f3e] h-[39px] text-white flex items-center px-4 text-[14px] gap-3">
        <button className="flex items-center gap-1 font-bold border border-transparent hover:border-white px-2 py-1 rounded-[2px]">
          <Menu className="w-5 h-5" /> Todo
        </button>
        {["Ofertas del día", "Servicio al Cliente", "Listas", "Tarjetas Regalo", "Vender"].map((item) => (
          <Link key={item} href="#" className="border border-transparent hover:border-white px-2 py-1 rounded-[2px] whitespace-nowrap">{item}</Link>
        ))}
      </div>

      <main className="max-w-none mx-auto relative pb-10">
        {/* Hero Background Image Gradient Mock */}
        <div className="absolute w-full h-[600px] bg-gradient-to-b from-[#dfdfdf] via-[#E3E6E6] to-[#E3E6E6] -z-10 top-0"></div>

        {/* Products Container */}
        <div className="p-4 md:p-6 -mt-0 relative z-10 max-w-[1480px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white p-5 flex flex-col h-full z-20 hover:shadow-lg cursor-pointer">
                <h2 className="text-[21px] font-bold text-[#0F1111] mb-2 leading-[27px] line-clamp-2">{product.title}</h2>

                <Link href={`/products/${product.slug}`} className="cursor-pointer flex-1">
                  <div className="relative w-full aspect-square mb-3">
                    {product.imageUrl ? (
                      <Image src={product.imageUrl} alt={product.title} fill className="object-contain p-2" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">Sin Imagen</div>
                    )}
                  </div>
                </Link>

                <Link href={`/products/${product.slug}`} className="text-[#007185] hover:text-[#C7511F] hover:underline text-[13px] font-medium mt-auto block">
                  Ver más detalles
                </Link>
              </div>
            ))}

            {/* Filler Cards mimicking Amazon's category boxes */}
            <div className="bg-white p-5 flex flex-col z-20">
              <h2 className="text-[21px] font-bold text-[#0F1111] mb-2">Sigue comprando</h2>
              <div className="flex-1 bg-gray-100 flex items-center justify-center text-gray-400 text-sm">Ejemplo historial</div>
            </div>
            <div className="bg-white p-5 flex flex-col z-20">
              <h2 className="text-[21px] font-bold text-[#0F1111] mb-2">Ofertas Top</h2>
              <div className="flex-1 bg-gray-100 flex items-center justify-center text-gray-400 text-sm">Ejemplo ofertas</div>
            </div>
            <div className="bg-white p-5 flex flex-col z-20">
              <h2 className="text-[21px] font-bold text-[#0F1111] mb-2">Novedades en libros</h2>
              <div className="flex-1 bg-gray-100 flex items-center justify-center text-gray-400 text-sm">Ejemplo novedades</div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-[#232f3e] text-white mt-8">
        <div className="bg-[#37475A] py-[15px] text-center text-[13px] font-bold hover:bg-[#485769] cursor-pointer transition">
          Volver arriba
        </div>
        <div className="bg-[#232f3e] py-10 border-t border-[#3a4553] flex justify-center items-center flex-col gap-2">
          <div className="flex items-center gap-20 text-[12px] text-[#DDD]">
            {/* Mock links */}
            <span className="cursor-pointer hover:underline">Condiciones de Uso</span>
            <span className="cursor-pointer hover:underline">Aviso de privacidad</span>
            <span className="cursor-pointer hover:underline">Cookies</span>
            <span className="cursor-pointer hover:underline">Publicidad definida por intereses</span>
          </div>
          <div className="text-[12px] text-[#DDD] mt-2">
            © 1996-{new Date().getFullYear()}, PadresResilientes.com, Inc. o sus afiliados
          </div>
        </div>
      </footer>
    </div>
  );
}
