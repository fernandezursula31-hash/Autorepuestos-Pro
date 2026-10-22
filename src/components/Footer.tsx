import React from 'react';
import { Wrench, Phone, Mail, MapPin, Clock } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { setActiveMode, setSelectedCategory } = useApp();

  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500">
                <Wrench className="w-3.5 h-3.5" />
              </div>
              <span className="font-display font-extrabold text-base tracking-tight text-white">
                AUTOREPUESTOS <span className="text-amber-500">PRO</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Distribuidor líder de repuestos, frenos de alto rendimiento, suspensión deportiva y consumibles de automoción con inventario en tiempo real.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-2.5">
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">Categorías</h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button
                  onClick={() => {
                    setActiveMode('store');
                    setSelectedCategory('Frenos');
                    window.scrollTo({ top: 400, behavior: 'smooth' });
                  }}
                  className="hover:text-amber-400 transition-colors"
                >
                  Kits de Frenos Cerámicos
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveMode('store');
                    setSelectedCategory('Suspensión');
                    window.scrollTo({ top: 400, behavior: 'smooth' });
                  }}
                  className="hover:text-amber-400 transition-colors"
                >
                  Suspensión Coilover & Barras
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveMode('store');
                    setSelectedCategory('Motor & Turbo');
                    window.scrollTo({ top: 400, behavior: 'smooth' });
                  }}
                  className="hover:text-amber-400 transition-colors"
                >
                  Turbos & Sistemas de Admisión
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveMode('store');
                    setSelectedCategory('Iluminación');
                    window.scrollTo({ top: 400, behavior: 'smooth' });
                  }}
                  className="hover:text-amber-400 transition-colors"
                >
                  Faros Bi-LED Laser
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Service & Hours */}
          <div className="space-y-2.5">
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">Horarios de Atención</h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2 text-slate-300">
                <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="text-slate-300"><span className="text-white font-medium">• Lunes a viernes:</span> 8:30 a.m. – 6:00 p.m.</div>
                  <div className="text-slate-300"><span className="text-white font-medium">• Sábado:</span> 8:30 a.m. – 1:30 p.m.</div>
                  <div className="text-slate-400"><span className="text-slate-300 font-medium">• Domingo:</span> <span className="text-rose-400 font-semibold">Cerrado</span></div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-slate-400 pt-1 border-t border-slate-900">
                <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>Bodega Central: Parque Industrial Norte #42</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <Phone className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>Atención: +52 (55) 4192-8831</span>
              </div>
            </div>
          </div>

          {/* Guarantee */}
          <div className="space-y-2.5">
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">Seguridad Garantizada</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Pagos cifrados bajo protocolo SSL de 256 bits y certificación PCI-DSS. Todos los envíos cuentan con seguro de tránsito contra pérdida o daño.
            </p>
            <div className="pt-2 text-xs font-mono text-slate-500">
              Inventario sincronizado en tiempo real
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <span>&copy; {new Date().getFullYear()} Autorepuestos Pro. Todos los derechos reservados.</span>
          <div className="flex items-center gap-4">
            <span>Términos de Servicio</span>
            <span>·</span>
            <span>Política de Devoluciones</span>
            <span>·</span>
            <span>Garantías OEM</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
