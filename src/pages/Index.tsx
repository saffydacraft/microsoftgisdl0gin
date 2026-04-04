import { lazy, Suspense, useState } from "react";
import { Radiation, ChevronDown } from "lucide-react";
import nukeHero from "@/assets/nuke-hero.jpg";
import PasswordGate from "@/components/PasswordGate";

const ProxyGames = lazy(() => import("@/components/ProxyGames"));
const GoogleResources = lazy(() => import("@/components/GoogleResources"));
const HtmlGames = lazy(() => import("@/components/HtmlGames"));
const SectionLoader = () => (
  <div className="flex items-center justify-center py-12">
    <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full" />
  </div>
);

const Index = () => {
  const [unlocked, setUnlocked] = useState(() => sessionStorage.getItem("na_unlocked") === "1");

  if (!unlocked) return <PasswordGate onUnlock={() => setUnlocked(true)} />;

  return (
    <div className="min-h-screen bg-background scan-overlay">
      <div className="hazard-stripe h-2" />

      <header className="relative overflow-hidden">
        <img src={nukeHero} alt="Nuclear backdrop" className="absolute inset-0 w-full h-full object-cover opacity-30" loading="lazy" />
        <div className="relative z-10 text-center py-20 px-4">
          <Radiation className="w-16 h-16 text-primary mx-auto mb-4 nuke-glow" />
          <h1 className="text-5xl md:text-6xl font-black text-primary nuke-glow tracking-wider">NUCLEAR ARCADE</h1>
          <p className="text-muted-foreground mt-4 max-w-md mx-auto text-sm tracking-widest uppercase">
            Classified Gaming Terminal — Authorized Personnel Only
          </p>
          <nav className="flex justify-center gap-6 mt-8 flex-wrap">
            <a href="#proxy" className="text-primary hover:text-accent text-sm font-bold tracking-wider transition-colors">☢ PROXY</a>
            <a href="#google" className="text-accent hover:text-primary text-sm font-bold tracking-wider transition-colors">⚠ GOOGLE</a>
            <a href="#html-games" className="text-[hsl(var(--nuke-cyan))] hover:text-primary text-sm font-bold tracking-wider transition-colors">🎮 HTML</a>
          </nav>
          <ChevronDown className="w-6 h-6 text-muted-foreground mx-auto mt-8 animate-bounce" />
        </div>
      </header>

      <Suspense fallback={<SectionLoader />}><ProxyGames /></Suspense>
      <div className="hazard-stripe h-1 max-w-4xl mx-auto rounded" />
      <Suspense fallback={<SectionLoader />}><GoogleResources /></Suspense>
      <div className="hazard-stripe h-1 max-w-4xl mx-auto rounded" />
      <Suspense fallback={<SectionLoader />}><HtmlGames /></Suspense>

      <footer className="py-8 text-center border-t border-border">
        <p className="text-muted-foreground text-xs tracking-widest">☢ NUCLEAR ARCADE — HANDLE WITH CARE ☢</p>
      </footer>
      <div className="hazard-stripe h-2" />
    </div>
  );
};

export default Index;
