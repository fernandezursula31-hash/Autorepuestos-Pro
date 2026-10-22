import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Mail, Lock, ShieldCheck, UserCheck, ArrowRight, Wrench, Sparkles } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const { loginWithEmail, currentUser } = useApp();
  const [email, setEmail] = useState('fernandezursula31@gmail.com');
  const [password, setPassword] = useState('••••••••••••');
  const [rememberMe, setRememberMe] = useState(true);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    const success = loginWithEmail(email, password);
    if (success) {
      onClose();
    }
  };

  const handleQuickLoginUrsula = () => {
    loginWithEmail('fernandezursula31@gmail.com');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Glow accent */}
        <div className="h-1 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600" />

        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500">
              <Wrench className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-white">
                Iniciar Sesión en Autorepuestos Pro
              </h3>
              <span className="text-[11px] text-slate-400 font-mono">
                Autenticación de Propietario & Clientes
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          {/* Quick Login Card Specifically for fernandezursula31@gmail.com */}
          <div className="p-4 bg-gradient-to-br from-amber-500/15 via-slate-900 to-slate-950 rounded-xl border border-amber-500/30 shadow-lg space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-wider font-mono font-bold text-amber-400 block mb-1">
                  Cuenta Verificada del Propietario
                </span>
                <h4 className="font-display font-bold text-sm text-white">
                  Ursula Fernandez
                </h4>
                <span className="text-xs text-slate-300 font-mono">
                  fernandezursula31@gmail.com
                </span>
              </div>
              <span className="px-2 py-0.5 bg-amber-500 text-slate-950 text-[10px] font-bold rounded-full font-mono uppercase">
                ADMIN & VIP
              </span>
            </div>

            <button
              onClick={handleQuickLoginUrsula}
              className="w-full py-2.5 px-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg transition-all shadow flex items-center justify-center gap-2 active:scale-95"
            >
              <UserCheck className="w-4 h-4" />
              <span>Acceso Rápido con fernandezursula31@gmail.com</span>
            </button>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-slate-800 w-full" />
            <span className="bg-slate-900 px-3 text-[11px] text-slate-500 font-mono uppercase">
              O con credenciales
            </span>
            <div className="border-t border-slate-800 w-full" />
          </div>

          {/* Regular Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Correo Electrónico
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="fernandezursula31@gmail.com"
                  className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-700 focus:border-amber-500 rounded-lg text-xs text-white placeholder-slate-500 font-mono focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-700 focus:border-amber-500 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-700 bg-slate-950 text-amber-500 focus:ring-amber-500 w-3.5 h-3.5"
                />
                <span>Recordar sesión</span>
              </label>
              <span className="text-[11px] text-amber-500/80">Acceso Seguro SSL</span>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors border border-slate-700"
            >
              <span>Iniciar Sesión</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Security guarantee */}
          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-center gap-2 text-[11px] text-slate-500">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Panel Administrador ERP habilitado para fernandezursula31@gmail.com</span>
          </div>
        </div>
      </div>
    </div>
  );
};
