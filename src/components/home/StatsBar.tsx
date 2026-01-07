import { Users, Star, Download } from "lucide-react";

export default function StatsBar() {
    return (
        <section className="bg-white border-y border-stone-100 relative z-20 shadow-sm relative -mt-8 mx-6 md:mx-auto max-w-5xl rounded-2xl">
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-stone-100">
                {/* Stat 1 */}
                <div className="p-6 flex items-center justify-center gap-4">
                    <div className="bg-orange-50 p-3 rounded-full text-[#E07A5F]">
                        <Users className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-stone-900">+1,250</p>
                        <p className="text-xs text-stone-500 uppercase tracking-wider font-semibold">Padres ayudados</p>
                    </div>
                </div>

                {/* Stat 2 */}
                <div className="p-6 flex items-center justify-center gap-4">
                    <div className="bg-yellow-50 p-3 rounded-full text-yellow-500">
                        <Star className="w-6 h-6 fill-current" />
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-stone-900">4.9/5</p>
                        <p className="text-xs text-stone-500 uppercase tracking-wider font-semibold">Valoración Media</p>
                    </div>
                </div>

                {/* Stat 3 */}
                <div className="p-6 flex items-center justify-center gap-4">
                    <div className="bg-blue-50 p-3 rounded-full text-blue-500">
                        <Download className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-stone-900">+500</p>
                        <p className="text-xs text-stone-500 uppercase tracking-wider font-semibold">Descargas este mes</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
