import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import SectionBadge from "@/components/SectionBadge";
import { ArrowRight } from "lucide-react";

const serviceDetails = [
  { key: "digital",    icon: "🔄", color: "#F47920", frHref: "/services/transformation-digitale",  enHref: "/services/digital-transformation"  },
  { key: "telecom",    icon: "📡", color: "#F47920", frHref: "/services/telecom-reseaux-prives",    enHref: "/services/telecom-private-networks" },
  { key: "datacenter", icon: "🖥️", color: "#8B5E3C", frHref: "/services/datacenter",               enHref: "/services/datacenter"               },
  { key: "mobile",     icon: "📱", color: "#FF9A4A", frHref: "/services/applications-mobiles",     enHref: "/services/mobile-applications"      },
  { key: "ai",         icon: "🤖", color: "#C45D0A", frHref: "/services/agent-ia",                 enHref: "/services/ai-agents"                },
];

export default function ServicesPage() {
  const t  = useTranslations("services");
  const ts = useTranslations("services.list");
  const locale = useLocale();

  return (
    <div className="min-h-screen pt-20">
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 gradient-scs-dark" />
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-[#F47920]/8 rounded-full blur-3xl" />
        <div className="absolute inset-0 grid-overlay" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionBadge text={t("title")} color="#F47920" />
          <h1 className="text-5xl font-bold text-white mt-6 mb-4">{t("title")}</h1>
          <p className="text-slate-400 text-xl max-w-3xl mx-auto">{t("subtitle")}</p>
        </div>
      </section>

      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceDetails.map((svc) => {
            const href = `/${locale}${locale === "fr" ? svc.frHref : svc.enHref}`;
            return (
              <Link key={svc.key} href={href}
                className="group relative bg-[#1C1C1C] hover:bg-[#222222] border border-white/8 hover:border-[#F47920]/30 rounded-3xl p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-900/20">
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: `radial-gradient(circle at top left, ${svc.color}15, transparent 60%)` }} />
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl mb-6" style={{ background: `${svc.color}18` }}>
                    {svc.icon}
                  </div>
                  <h2 className="text-white font-bold text-2xl mb-3">{ts(`${svc.key}.name`)}</h2>
                  <p className="text-slate-400 leading-relaxed mb-6">{ts(`${svc.key}.shortDesc`)}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {[t("tabs.conseil"), t("tabs.ingenierie"), t("tabs.formation")].map((tab) => (
                      <span key={tab} className="px-3 py-1 rounded-full text-xs border"
                        style={{ color: svc.color, borderColor: `${svc.color}40`, background: `${svc.color}10` }}>{tab}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 font-semibold" style={{ color: svc.color }}>
                    {locale === "fr" ? "Découvrir" : "Discover"} <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
