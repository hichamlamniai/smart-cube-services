import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import SectionBadge from "@/components/SectionBadge";
import HeroEcosystem from "@/components/HeroEcosystem";
import { ArrowRight, CheckCircle, Zap, Shield, TrendingUp } from "lucide-react";

const services = [
  { key: "digital",    icon: "🔄", color: "#F47920", frHref: "/services/transformation-digitale",  enHref: "/services/digital-transformation"  },
  { key: "telecom",    icon: "📡", color: "#F47920", frHref: "/services/telecom-reseaux-prives",    enHref: "/services/telecom-private-networks" },
  { key: "datacenter", icon: "🖥️", color: "#8B5E3C", frHref: "/services/datacenter",               enHref: "/services/datacenter"               },
  { key: "mobile",     icon: "📱", color: "#FF9A4A", frHref: "/services/applications-mobiles",     enHref: "/services/mobile-applications"      },
  { key: "ai",         icon: "🤖", color: "#C45D0A", frHref: "/services/agent-ia",                 enHref: "/services/ai-agents"                },
];

const stats = [
  { value: "150+", labelKey: "projects" },
  { value: "80+",  labelKey: "clients"  },
  { value: "25+",  labelKey: "experts"  },
  { value: "10+",  labelKey: "years"    },
];

const whyIcons = [CheckCircle, Zap, Shield, TrendingUp];

export default function HomePage() {
  const t  = useTranslations("home");
  const ts = useTranslations("services.list");
  const locale = useLocale();

  return (
    <div className="min-h-screen">
      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 gradient-scs-dark" />
        {/* Orange glow blobs */}
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-[#F47920]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-[#C45D0A]/8 rounded-full blur-3xl" />
        {/* Grid overlay */}
        <div className="absolute inset-0 grid-overlay" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="grid xl:grid-cols-2 gap-12 items-center">
            {/* Texte hero */}
            <div>
              <div className="mb-6">
                <SectionBadge text={t("hero.badge")} color="#F47920" />
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
                {t("hero.title")}{" "}
                <span className="bg-gradient-to-r from-[#F47920] to-[#FF9A4A] bg-clip-text text-transparent">
                  {t("hero.titleHighlight")}
                </span>
              </h1>
              <p className="text-xl text-slate-300 leading-relaxed mb-10 max-w-2xl">
                {t("hero.subtitle")}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href={`/${locale}/services`}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#F47920] hover:bg-[#FF9A4A] text-white font-semibold text-lg transition-all hover:shadow-xl hover:shadow-orange-500/25">
                  {t("hero.cta1")} <ArrowRight size={20} />
                </Link>
                <Link href={`/${locale}/contact`}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/20 hover:border-[#F47920]/50 text-white font-semibold text-lg transition-all hover:bg-white/5">
                  {t("hero.cta2")}
                </Link>
              </div>
            </div>

            {/* Visuel animé Digital Ecosystem */}
            <div className="hidden xl:flex justify-center items-center">
              <HeroEcosystem />
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="py-16 border-y border-white/8 bg-[#161616]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.labelKey} className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-[#F47920] to-[#FF9A4A] bg-clip-text text-transparent mb-1">{stat.value}</div>
                <div className="text-slate-400 text-sm">{t(`stats.${stat.labelKey}`)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <SectionBadge text="Expertise" color="#F47920" />
            <h2 className="text-4xl font-bold text-white mt-4 mb-4">{t("services.title")}</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">{t("services.subtitle")}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc) => {
              const href = `/${locale}${locale === "fr" ? svc.frHref : svc.enHref}`;
              return (
                <Link key={svc.key} href={href}
                  className="group relative bg-[#1C1C1C] hover:bg-[#222222] border border-white/8 hover:border-[#F47920]/30 rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-orange-900/20">
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: `radial-gradient(circle at top left, ${svc.color}12, transparent 60%)` }} />
                  <div className="relative">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-5"
                      style={{ background: `${svc.color}18` }}>{svc.icon}</div>
                    <h3 className="text-white font-bold text-xl mb-3">{ts(`${svc.key}.name`)}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-5">{ts(`${svc.key}.shortDesc`)}</p>
                    <div className="flex items-center gap-2 text-sm font-semibold" style={{ color: svc.color }}>
                      {locale === "fr" ? "En savoir plus" : "Learn more"} <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              );
            })}
            {/* All services */}
            <Link href={`/${locale}/services`}
              className="group bg-gradient-to-br from-[#F47920]/15 to-[#C45D0A]/10 border border-[#F47920]/25 hover:border-[#F47920]/50 rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl flex flex-col items-center justify-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-[#F47920]/20 flex items-center justify-center text-3xl mb-5">⚡</div>
              <h3 className="text-white font-bold text-xl mb-3">{locale === "fr" ? "Tous nos services" : "All our services"}</h3>
              <p className="text-slate-400 text-sm mb-5">{locale === "fr" ? "Découvrez l'ensemble de notre offre" : "Discover our complete offering"}</p>
              <div className="flex items-center gap-2 text-sm font-semibold text-[#F47920]">
                {locale === "fr" ? "Voir tout" : "See all"} <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Why Us ── */}
      <section className="py-24 bg-[#161616] border-y border-white/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionBadge text="Smart Cube Services" color="#F47920" />
              <h2 className="text-4xl font-bold text-white mt-4 mb-4">{t("why.title")}</h2>
              <p className="text-slate-400 mb-8">{t("why.subtitle")}</p>
              <div className="space-y-5">
                {[0,1,2,3].map((i) => {
                  const Icon = whyIcons[i];
                  return (
                    <div key={i} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-[#F47920]/15 flex items-center justify-center flex-shrink-0">
                        <Icon size={20} className="text-[#F47920]" />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold mb-1">{t(`why.items.${i}.title`)}</h4>
                        <p className="text-slate-400 text-sm">{t(`why.items.${i}.desc`)}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: "🏆", label: "Top certifié",   value: "ISO 9001"       },
                { icon: "🌍", label: "Présence",        value: "Afrique & MENA" },
                { icon: "⚡", label: "Délai moyen",     value: "< 48h réponse"  },
                { icon: "🔒", label: "Sécurité",        value: "100% confidentiel"},
              ].map((item, i) => (
                <div key={i} className="bg-[#1C1C1C] border border-white/8 rounded-2xl p-6 text-center hover:border-[#F47920]/30 transition-all">
                  <div className="text-3xl mb-2">{item.icon}</div>
                  <div className="text-slate-400 text-xs mb-1">{item.label}</div>
                  <div className="text-white font-bold text-sm">{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Partners ── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-slate-500 text-sm uppercase tracking-widest">Technologies & Partenaires</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 opacity-50">
            {["AWS","Microsoft Azure","Google Cloud","VMware","Cisco","Juniper","Red Hat","Oracle"].map((tech) => (
              <div key={tech}
                className="px-6 py-3 bg-[#1C1C1C] border border-white/8 rounded-xl text-slate-400 text-sm font-medium hover:text-white hover:border-[#F47920]/30 transition-all">
                {tech}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden p-12 text-center">
            <div className="absolute inset-0 gradient-scs" />
            <div className="absolute inset-0 opacity-10"
              style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
            <div className="relative">
              <h2 className="text-4xl font-bold text-white mb-4">{t("cta.title")}</h2>
              <p className="text-orange-100 text-lg mb-8 max-w-2xl mx-auto">{t("cta.subtitle")}</p>
              <Link href={`/${locale}/contact`}
                className="inline-flex items-center gap-2 px-10 py-4 rounded-xl bg-white text-[#C45D0A] font-bold text-lg hover:bg-orange-50 transition-all hover:shadow-2xl">
                {t("cta.btn")} <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
