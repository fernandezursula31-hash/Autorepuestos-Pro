import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { StoreHero } from './components/store/StoreHero';
import { StoreCatalog } from './components/store/StoreCatalog';
import { CompanyProfileSection } from './components/store/CompanyProfileSection';
import { ProductModal } from './components/store/ProductModal';
import { CartDrawer } from './components/store/CartDrawer';
import { CheckoutModal } from './components/store/CheckoutModal';
import { RegistrationOfferModal } from './components/store/RegistrationOfferModal';
import { LoginModal } from './components/auth/LoginModal';
import { CustomerChatWidget } from './components/chat/CustomerChatWidget';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { VideoBackground } from './components/common/VideoBackground';
import { Toast } from './components/Toast';
import { Footer } from './components/Footer';
import { Product } from './types';

const MainLayout: React.FC = () => {
  const { activeMode } = useApp();
  
  // Modals & Drawers state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Background Automotive Video */}
      <VideoBackground />

      {/* Top Navbar */}
      <Navbar
        onOpenCart={() => setIsCartOpen(true)}
        onOpenChat={() => setIsChatOpen(true)}
        onOpenRegister={() => setIsRegisterOpen(true)}
        onOpenLogin={() => setIsLoginOpen(true)}
      />

      {/* Main View Router */}
      <main className="relative z-10 flex-1">
        {activeMode === 'store' ? (
          <>
            <StoreHero onOpenRegister={() => setIsRegisterOpen(true)} />
            <StoreCatalog onOpenDetails={(prod) => setSelectedProduct(prod)} />
            <CompanyProfileSection onOpenChat={() => setIsChatOpen(true)} />
          </>
        ) : (
          <AdminDashboard />
        )}
      </main>

      {/* Global Footer with business hours and store info */}
      <div className="relative z-10">
        <Footer />
      </div>

      {/* Modals & Slide-overs */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onOpenCheckout={() => setIsCheckoutOpen(true)}
        onOpenRegister={() => setIsRegisterOpen(true)}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />

      {/* 10% Discount Registration Offer Modal */}
      <RegistrationOfferModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
      />

      {/* Login Modal specifically for fernandezursula31@gmail.com */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
      />

      {/* Customer Chat Widget */}
      <CustomerChatWidget
        isOpen={isChatOpen}
        onToggle={() => setIsChatOpen(!isChatOpen)}
      />

      {/* Toast Notifications */}
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
