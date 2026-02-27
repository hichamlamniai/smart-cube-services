import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ServiceCardProps {
  name: string;
  shortDesc: string;
  color: string;
  icon: string;
  href: string;
}

export default function ServiceCard({ name, shortDesc, color, icon, href }: ServiceCardProps) {
  return (
    <Link href={href} className="group relative bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl block">
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `radial-gradient(circle at top left, ${color}15, transparent 60%)` }} />
      <div className="relative">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4"
          style={{ background: `${color}20` }}>
          {icon}
        </div>
        <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-white transition-colors">{name}</h3>
        <p className="text-slate-400 text-sm leading-relaxed mb-4">{shortDesc}</p>
        <div className="flex items-center gap-2 text-sm font-medium transition-colors" style={{ color }}>
          En savoir plus <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}
