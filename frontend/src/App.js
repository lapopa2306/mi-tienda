import { useEffect } from "react";
import Lenis from "lenis";
import { Toaster } from "sonner";
import "@/App.css";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import Nav from "@/components/Nav";
import CouponCountdownBar from "@/components/CouponCountdownBar";
import Hero from "@/components/Hero";
import MarqueeStrip from "@/components/MarqueeStrip";
import Catalog from "@/components/Catalog";
import Manifesto from "@/components/Manifesto";
import InfoStrip from "@/components/InfoStrip";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import AdminPanel from "@/components/AdminPanel";

function Store() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    window.__lenis = lenis;
    let raf;
    const loop = (time) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);

  return (
    <CartProvider>
      <WishlistProvider>
        <div className="App bg-paper text-ink min-h-screen">
          <div className="fixed inset-x-0 top-0 z-50">
            <CouponCountdownBar />
            <Nav />
          </div>
          <main>
            <Hero />
            <MarqueeStrip />
            <Catalog />
            <Manifesto />
            <InfoStrip />
          </main>
          <Footer />
          <CartDrawer />
          <FloatingWhatsApp />
          <div aria-hidden className="noise-overlay" />
          <Toaster
            position="bottom-center"
            toastOptions={{
              style: {
                background: "#0A0A0A",
                color: "#F9F8F6",
                border: "1px solid rgba(244,197,214,0.35)",
                borderRadius: "999px",
                fontFamily: "Outfit, sans-serif",
              },
            }}
          />
        </div>
      </WishlistProvider>
    </CartProvider>
  );
}

function App() {
  if (window.location.pathname.startsWith("/admin")) {
    return <AdminPanel />;
  }
  return <Store />;
}

export default App;
