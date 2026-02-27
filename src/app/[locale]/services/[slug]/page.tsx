import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import SectionBadge from "@/components/SectionBadge";
import { ArrowLeft, ArrowRight, BookOpen, Wrench, Users, Award } from "lucide-react";

type ServiceConfig = {
  key: string; icon: string; color: string;
  slugsFr: string[]; slugsEn: string[]; namespace: string;
};

const serviceConfigs: ServiceConfig[] = [
  { key: "digital",    icon: "🔄", color: "#F47920", slugsFr: ["transformation-digitale"], slugsEn: ["digital-transformation"],   namespace: "digital"     },
  { key: "telecom",    icon: "📡", color: "#9B9EA3", slugsFr: ["telecom-reseaux-prives"],   slugsEn: ["telecom-private-networks"], namespace: "telecom"     },
  { key: "datacenter", icon: "🖥️", color: "#8B5E3C", slugsFr: ["datacenter"],               slugsEn: ["datacenter"],               namespace: "datacenter"  },
  { key: "mobile",     icon: "📱", color: "#FF9A4A", slugsFr: ["applications-mobiles"],     slugsEn: ["mobile-applications"],      namespace: "mobile"      },
  { key: "ai",         icon: "🤖", color: "#C45D0A", slugsFr: ["agent-ia"],                 slugsEn: ["ai-agents"],                namespace: "ai"          },
];

const pillars = [
  { key: "conseil",    icon: BookOpen, tKey: "conseil"    },
  { key: "ingenierie", icon: Wrench,   tKey: "ingenierie" },
  { key: "formation",  icon: Users,    tKey: "formation"  },
];

export async function generateStaticParams() {
  const params: { slug: string }[] = [];
  serviceConfigs.forEach((svc) => {
    [...svc.slugsFr, ...svc.slugsEn].forEach((slug) => params.push({ slug }));
  });
  return params;
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug, locale } = await params;
  const config = serviceConfigs.find((s) =>
    locale === "fr" ? s.slugsFr.includes(slug) : s.slugsEn.includes(slug)
  );
  if (!config) notFound();

  const t  = await getTranslations(config.namespace);
  const td = await getTranslations("serviceDetail");

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 gradient-scs-dark" />
        <div className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full blur-3xl opacity-15" style={{ background: config.color }} />
        <div className="absolute inset-0 grid-overlay" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href={`/${locale}/services`}
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 text-sm">
            <ArrowLeft size={16} /> {td("back")}
          </Link>
          <div className="max-w-3xl">
            <SectionBadge text={t("hero.badge")} color={config.color} />
            <h1 className="text-5xl font-bold text-white mt-6 mb-4 leading-tight">
              {t("hero.title")}{" "}
              <span className="bg-clip-text text-transparent"
                style={{ backgroundImage: `linear-gradient(to right, ${config.color}, #FF9A4A)` }}>
                {t("hero.titleHighlight")}
              </span>
            </h1>
            <p className="text-slate-400 text-xl leading-relaxed">{t("hero.subtitle")}</p>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          {pillars.map((pillar, idx) => {
            const Icon    = pillar.icon;
            const isEven  = idx % 2 === 0;
            const items   = Array.from({ length: 4 }, (_, i) => ({
              title: t(`${pillar.tKey}.items.${i}.title`),
              desc:  t(`${pillar.tKey}.items.${i}.desc`),
            }));
            const itemIcons = ["✅","🔧","🎓","💡"];

            return (
              <div key={pillar.key} className={`grid lg:grid-cols-2 gap-12 items-center`}>
                <div className={!isEven ? "lg:order-2" : ""}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${config.color}20` }}>
                      <Icon size={20} style={{ color: config.color }} />
                    </div>
                    <span className="text-sm font-medium uppercase tracking-wider" style={{ color: config.color }}>
                      {td(`${pillar.tKey}.title`)}
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-4">{t(`${pillar.tKey}.title`)}</h2>
                  <p className="text-slate-400 mb-8 leading-relaxed">{td(`${pillar.tKey}.desc`)}</p>
                  <Link href={`/${locale}/contact`}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold transition-all hover:opacity-90 hover:shadow-lg"
                    style={{ background: config.color }}>
                    {td("cta")} <ArrowRight size={16} />
                  </Link>
                </div>
                <div className={`grid grid-cols-2 gap-4 ${!isEven ? "lg:order-1" : ""}`}>
                  {items.map((item, i) => (
                    <div key={i} className="bg-[#1C1C1C] hover:bg-[#222222] border border-white/8 hover:border-[#F47920]/20 rounded-2xl p-5 transition-all">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-3 text-lg" style={{ background: `${config.color}18` }}>
                        {itemIcons[i]}
                      </div>
                      <h4 className="text-white font-semibold text-sm mb-1">{item.title}</h4>
                      <p className="text-slate-400 text-xs leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Partners – Telecom only */}
      {config.key === "telecom" && (
        <section className="py-16 bg-[#0D0D0D]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <SectionBadge text={t("partners.title")} color={config.color} />
              <p className="text-slate-400 mt-4 max-w-2xl mx-auto">{t("partners.subtitle")}</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[0, 1, 2].map((i) => (
                <div key={i} className="bg-[#1C1C1C] border border-white/8 rounded-2xl p-6 hover:border-[#9B9EA3]/40 transition-all group">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: `${config.color}18` }}>
                    <Award size={24} style={{ color: config.color }} />
                  </div>
                  <h4 className="text-white font-bold text-lg mb-2">{t(`partners.items.${i}.name`)}</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">{t(`partners.items.${i}.desc`)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden p-12 text-center">
          <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${config.color}25, #8B5E3C18)` }} />
          <div className="absolute inset-0 border border-white/8 rounded-3xl" />
          <div className="relative">
            <div className="text-5xl mb-4">{config.icon}</div>
            <h2 className="text-3xl font-bold text-white mb-4">
              {locale === "fr" ? "Intéressé par ce service ?" : "Interested in this service?"}
            </h2>
            <p className="text-slate-400 mb-8">
              {locale === "fr" ? "Contactez-nous pour un devis personnalisé" : "Contact us for a personalized quote"}
            </p>
            <Link href={`/${locale}/contact`}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-bold text-lg transition-all hover:opacity-90 hover:shadow-xl"
              style={{ background: config.color }}>
              {td("cta")} <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
