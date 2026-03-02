"use client";
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Retour en haut"
      className="fixed bottom-24 right-5 z-40 w-11 h-11 rounded-xl bg-[#1C1C1C] border border-white/15 hover:border-[#F47920]/50 text-slate-300 hover:text-white flex items-center justify-center transition-all hover:shadow-lg hover:shadow-orange-900/30"
    >
      <ArrowUp size={18} />
    </button>
  );
}
