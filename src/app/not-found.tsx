import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#111111] flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        {/* Big 404 */}
        <div className="text-[10rem] font-bold leading-none bg-gradient-to-r from-[#F47920] to-[#FF9A4A] bg-clip-text text-transparent select-none mb-4">
          404
        </div>

        <div className="w-16 h-1 bg-gradient-to-r from-[#F47920] to-[#FF9A4A] rounded-full mx-auto mb-8" />

        <h1 className="text-2xl font-bold text-white mb-3">
          Page introuvable
        </h1>
        <p className="text-slate-400 leading-relaxed mb-10">
          La page que vous recherchez n&apos;existe pas ou a été déplacée.
          Retournez à l&apos;accueil pour continuer votre navigation.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/fr"
            className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-[#F47920] hover:bg-[#FF9A4A] text-white font-semibold transition-all hover:shadow-lg hover:shadow-orange-500/25"
          >
            <Home size={18} /> Accueil
          </Link>
          <Link
            href="javascript:history.back()"
            className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl border border-white/15 hover:border-[#F47920]/40 text-white font-semibold transition-all hover:bg-white/5"
          >
            <ArrowLeft size={18} /> Retour
          </Link>
        </div>
      </div>
    </div>
  );
}
