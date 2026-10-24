import { Search, ShieldCheck, Zap, Truck, Check, Sparkles, Tag } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface StoreHeroProps {
  onOpenRegister?: () => void;
}

export const StoreHero: React.FC<StoreHeroProps> = ({ onOpenRegister }) => {
  const { searchQuery, setSearchQuery, vehicleFilter, isRegistered, discountApplied } = useApp();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-950/80 via-slate-900/60 to-slate-950/90 border-b border-slate-800 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Left Column: Headline and Search */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Top offer kicker */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <button
                onClick={onOpenRegister}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-300 text-xs font-semibold rounded-full transition-colors group cursor-pointer"
              >
                <Tag className="w-3.5 h-3.5 text-amber-400" />
                <span>🎁 10% DE DESCUENTO ACTIVO: Cupón BIENVENIDO10</span>
                <span className="text-amber-400 font-mono text-[10px] group-hover:underline">
                  (Aplicado en catálogo y carrito ✓)
                </span>
              </button>
              <span className="text-xs text-slate-400 font-mono hidden sm:inline">· Stock en Tiempo Real · Envíos Express</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight mb-4 font-display" style={{ textWrap: 'balance' }}>
              Repuestos y accesorios de ingeniería para tu auto
            </h1>

            <p className="text-base sm:text-lg text-slate-300 mb-6 max-w-xl leading-relaxed">
              Encuentra kits de frenos cerámicos, suspensión regulable, sistemas de turboalimentación y consumibles de alto rendimiento con validación de compatibilidad exacta.
            </p>

            {/* Quick Search */}
            <div className="relative max-w-xl mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Busca por repuesto, código SKU, marca o número de parte..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-slate-900/90 border border-slate-700 focus:border-amber-500 rounded-xl text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-1 focus:ring-amber-500 transition-all shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white px-2 py-1 bg-slate-800 rounded"
                >
                  Limpiar
                </button>
              )}
            </div>

            {/* Value Proof Badges (No pills - clean unboxed typography with icons) */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-800/80 max-w-xl">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <Truck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Envío express en 24h</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Garantía de fábrica</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <Zap className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Stock 100% verificado</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset */}
          <div className="lg:col-span-5 relative flex items-center">
            <div className="relative w-full aspect-[16/9] lg:aspect-auto lg:h-full min-h-[300px] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-900">
              <img
                src="/src/assets/images/hero_automotive_parts_1792689415906.jpg"
                alt="Autorepuestos Pro - Taller de partes de alta performance"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none" />
              
              {/* Overlay banner with live stock guarantee */}
              <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700/80 text-xs text-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-semibold text-white">Bodega Central Conectada</span>
                </div>
                <span className="text-slate-400 font-mono">Despacho en tiempo real</span>
              </div>
            </div>
          </div>
        </div>

        {/* Vehicle filter indicator if active */}
        {vehicleFilter.make !== 'Todas las Marcas' && (
          <div className="mt-6 p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-center justify-between text-xs text-amber-300">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-amber-400" />
              <span>
                Mostrando repuestos compatibles con: <strong>{vehicleFilter.make} {vehicleFilter.model} {vehicleFilter.year}</strong>
              </span>
            </div>
            <button
              onClick={() => useApp().setVehicleFilter({ make: 'Todas las Marcas', model: '', year: '' })}
              className="underline text-amber-200 hover:text-white"
            >
              Restablecer filtro
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
