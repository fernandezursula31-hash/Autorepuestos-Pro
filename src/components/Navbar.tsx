import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShoppingBag, ShieldAlert, Store, Wrench, MessageSquareText, User, LogIn, LogOut, CheckCircle2 } from 'lucide-react';

interface NavbarProps {
  onOpenCart: () => void;
  onOpenChat: () => void;
  onOpenRegister: () => void;
  onOpenLogin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenCart, 
  onOpenChat, 
  onOpenRegister,
  onOpenLogin 
}) => {
  const { 
    activeMode, 
    setActiveMode, 
    cart, 
    alerts,
    chatMessages,
    setSelectedCategory,
    isRegistered,
    discountApplied,
    currentUser,
    logout
  } = useApp();

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const pendingAlertsCount = alerts.filter(a => a.status === 'pending').length;
  const unreadMessagesCount = chatMessages.filter(m => !m.read && m.sender === 'customer').length;

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      {/* 10% Registration Discount Top Banner */}
      {activeMode === 'store' && (
        <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-slate-950 px-4 py-1.5 text-xs font-semibold flex items-center justify-center gap-2 sm:gap-4 shadow-inner">
          <div className="flex items-center gap-1.5">
            <span className="font-bold">🎉 ¡10% DE DESCUENTO ACTIVO!</span>
            <span className="hidden sm:inline">Tu cupón de bienvenida ya está aplicado en todo el catálogo de repuestos:</span>
            <span className="font-mono font-bold bg-slate-950/25 px-2 py-0.5 rounded text-[11px]">BIENVENIDO10</span>
          </div>
          <button
            onClick={onOpenRegister}
            className="px-2.5 py-0.5 bg-slate-950 hover:bg-slate-900 text-amber-400 font-bold text-[11px] rounded-full uppercase tracking-wider transition-transform active:scale-95 shadow-sm"
          >
            {isRegistered ? 'Cliente VIP Activo ✓' : 'Registrar mi Auto (10% OFF ✓)'}
          </button>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <button 
              onClick={() => {
                setActiveMode('store');
                setSelectedCategory('Todos');
              }}
              className="group flex items-center gap-2.5 text-left focus:outline-none"
            >
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                <Wrench className="w-4 h-4" />
              </div>
              <span className="font-display font-extrabold text-xl tracking-tight text-white whitespace-nowrap">
                AUTOREPUESTOS <span className="text-amber-500">PRO</span>
              </span>
            </button>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
            <button 
              onClick={() => {
                setActiveMode('store');
                setSelectedCategory('Todos');
                window.scrollTo({ top: 400, behavior: 'smooth' });
              }}
              className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
            >
              Catálogo de Repuestos
            </button>
            <button 
              onClick={() => {
                setActiveMode('store');
                setSelectedCategory('Frenos');
                window.scrollTo({ top: 400, behavior: 'smooth' });
              }}
              className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
            >
              Frenos & Discos
            </button>
            <button 
              onClick={() => {
                setActiveMode('store');
                setSelectedCategory('Suspensión');
                window.scrollTo({ top: 400, behavior: 'smooth' });
              }}
              className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
            >
              Suspensión
            </button>
            <button 
              onClick={() => {
                setActiveMode('store');
                setSelectedCategory('Motor & Turbo');
                window.scrollTo({ top: 400, behavior: 'smooth' });
              }}
              className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
            >
              Motor & Turbo
            </button>
            <button 
              onClick={() => {
                setActiveMode('store');
                setTimeout(() => {
                  const el = document.getElementById('nosotros-mision-vision');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 50);
              }}
              className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 text-amber-300 font-semibold"
            >
              Misión & Servicios
            </button>
            <button 
              onClick={onOpenChat}
              className="relative hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
            >
              <MessageSquareText className="w-4 h-4 text-slate-400" />
              <span>Soporte Técnico</span>
            </button>
          </nav>

          {/* Zone 3: Primary Action / Mode Switcher */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* User Session Profile / Login Trigger */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 px-2.5 py-1.5 bg-slate-900 hover:bg-slate-850 border border-slate-700/80 rounded-lg text-xs font-semibold text-slate-200 transition-colors"
                  title={`Sesión iniciada: ${currentUser.email}`}
                >
                  <div className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 font-bold text-[10px] flex items-center justify-center shrink-0">
                    {currentUser.name.charAt(0)}
                  </div>
                  <span className="hidden sm:inline text-xs truncate max-w-[110px]">
                    {currentUser.name.split(' ')[0]}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                </button>

                {/* Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-3 text-xs z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="pb-2 border-b border-slate-800">
                      <span className="text-[10px] text-amber-400 font-mono font-bold block uppercase tracking-wider">
                        {currentUser.role === 'admin' ? 'Propietaria & Admin' : 'Cliente VIP'}
                      </span>
                      <span className="font-bold text-white text-sm block">{currentUser.name}</span>
                      <span className="text-[11px] text-slate-400 font-mono block truncate">{currentUser.email}</span>
                    </div>

                    <div className="py-2 space-y-1.5 text-slate-300 text-[11px]">
                      <div className="flex items-center justify-between">
                        <span>Descuento de Tienda:</span>
                        <span className="text-emerald-400 font-semibold font-mono">10% ACTIVO</span>
                      </div>
                      {currentUser.vehicle && (
                        <div className="flex items-center justify-between">
                          <span>Garaje:</span>
                          <span className="text-amber-400 font-mono truncate max-w-[130px]">{currentUser.vehicle}</span>
                        </div>
                      )}
                    </div>

                    <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          setActiveMode('admin');
                        }}
                        className="text-amber-400 hover:text-amber-300 font-semibold text-[11px]"
                      >
                        Abrir ERP Admin
                      </button>
                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          logout();
                        }}
                        className="text-red-400 hover:text-red-300 font-medium text-[11px] flex items-center gap-1"
                      >
                        <LogOut className="w-3 h-3" />
                        <span>Salir</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onOpenLogin}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap"
              >
                <LogIn className="w-3.5 h-3.5 text-amber-500" />
                <span className="hidden sm:inline">Iniciar Sesión</span>
                <span className="sm:hidden">Entrar</span>
              </button>
            )}

            {activeMode === 'store' && (
              <button
                onClick={onOpenCart}
                className="relative p-2 text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors"
                title="Ver carrito de compras"
                aria-label="Carrito de compras"
              >
                <ShoppingBag className="w-5 h-5" />
                {totalCartItems > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-amber-500 text-slate-950 font-bold text-xs rounded-full w-5 h-5 flex items-center justify-center font-mono">
                    {totalCartItems}
                  </span>
                )}
              </button>
            )}

            {/* Switch between Storefront and Admin Panel */}
            <button
              onClick={() => setActiveMode(activeMode === 'store' ? 'admin' : 'store')}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors border whitespace-nowrap shrink-0 ${
                activeMode === 'admin'
                  ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 border-amber-400 font-bold'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border-slate-700 hover:border-slate-600'
              }`}
            >
              {activeMode === 'admin' ? (
                <>
                  <Store className="w-4 h-4" />
                  <span>Ver Tienda</span>
                </>
              ) : (
                <>
                  <Wrench className="w-4 h-4 text-amber-500" />
                  <span>Panel Admin</span>
                  {pendingAlertsCount > 0 && (
                    <span className="ml-1 bg-red-600 text-white font-mono text-[10px] px-1.5 py-0.5 rounded-full flex items-center gap-1">
                      <ShieldAlert className="w-3 h-3 inline" />
                      {pendingAlertsCount}
                    </span>
                  )}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
