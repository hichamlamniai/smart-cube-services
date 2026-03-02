import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import SectionBadge from "@/components/SectionBadge";
import JsonLd from "@/components/JsonLd";
import { ArrowLeft, ArrowRight, BookOpen, Wrench, Users, Award, HelpCircle } from "lucide-react";

const BASE = "https://www.smartcube.ma";

type ServiceConfig = {
  key: string; icon: string; color: string;
  slug: string; slugFr: string; slugEn: string; namespace: string;
};

const serviceConfigs: ServiceConfig[] = [
  { key: "digital",    icon: "🔄", color: "#F47920", slug: "transformation-digitale", slugFr: "transformation-digitale", slugEn: "digital-transformation",  namespace: "digital"     },
  { key: "telecom",    icon: "📡", color: "#F47920", slug: "telecom",                 slugFr: "telecom-reseaux-prives",   slugEn: "telecom-private-networks", namespace: "telecom"     },
  { key: "datacenter", icon: "🖥️", color: "#8B5E3C", slug: "datacenter",              slugFr: "datacenter",              slugEn: "datacenter",               namespace: "datacenter"  },
  { key: "mobile",     icon: "📱", color: "#FF9A4A", slug: "applications-mobiles",    slugFr: "applications-mobiles",    slugEn: "mobile-applications",      namespace: "mobile"      },
  { key: "ai",         icon: "🤖", color: "#C45D0A", slug: "agent-ia",                slugFr: "agent-ia",                slugEn: "ai-agents",                namespace: "ai"          },
];

const pillars = [
  { key: "conseil",    icon: BookOpen, tKey: "conseil"    },
  { key: "ingenierie", icon: Wrench,   tKey: "ingenierie" },
  { key: "formation",  icon: Users,    tKey: "formation"  },
];

export async function generateStaticParams() {
  return serviceConfigs.map((svc) => ({ slug: svc.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; locale: string }> }): Promise<Metadata> {
  const { slug, locale } = await params;
  const config = serviceConfigs.find((s) => s.slug === slug);
  if (!config) return {};
  const t = await getTranslations({ locale, namespace: config.namespace });
  const title = `${t("hero.title")} ${t("hero.titleHighlight")} – Smart Cube Services`;
  const description = t("hero.subtitle");
  const canonicalSlug = locale === "fr" ? config.slugFr : config.slugEn;
  return {
    title,
    description,
    alternates: {
      canonical: `${BASE}/${locale}/services/${canonicalSlug}`,
      languages: {
        fr: `${BASE}/fr/services/${config.slugFr}`,
        en: `${BASE}/en/services/${config.slugEn}`,
        "x-default": `${BASE}/fr/services/${config.slugFr}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${BASE}/${locale}/services/${canonicalSlug}`,
      siteName: "Smart Cube Services",
    },
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug, locale } = await params;
  const config = serviceConfigs.find((s) => s.slug === slug);
  if (!config) notFound();

  const t  = await getTranslations(config.namespace);
  const td = await getTranslations("serviceDetail");

  const faqItems = [0, 1, 2].map((i) => ({
    "@type": "Question",
    name: t(`faq.${i}.q`),
    acceptedAnswer: { "@type": "Answer", text: t(`faq.${i}.a`) },
  }));

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${t("hero.title")} ${t("hero.titleHighlight")}`,
    provider: { "@type": "Organization", "@id": `${BASE}/#organization`, name: "Smart Cube Services" },
    description: t("hero.subtitle"),
    areaServed: ["MA", "Africa", "MENA"],
    url: `${BASE}/${locale}/services/${locale === "fr" ? config.slugFr : config.slugEn}`,
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems,
  };

  return (
    <div className="min-h-screen pt-20">
      <JsonLd data={serviceJsonLd} />
      <JsonLd data={faqJsonLd} />

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

      {/* Partners – Telecom, Datacenter, Mobile & AI */}
      {["telecom","datacenter","mobile","ai"].includes(config.key) && (
        <section className="py-16 bg-[#0D0D0D]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <SectionBadge text={t("partners.title")} color={config.color} />
              <p className="text-slate-400 mt-4 max-w-2xl mx-auto">{t("partners.subtitle")}</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[0, 1, 2].map((i) => (
                <div key={i} className="bg-[#1C1C1C] border border-white/8 hover:border-[#F47920]/40 rounded-2xl p-6 transition-all group">
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

      {/* FAQ */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <SectionBadge text="FAQ" color={config.color} />
            <h2 className="text-3xl font-bold text-white mt-4">{td("faqTitle")}</h2>
          </div>
          <div className="space-y-4">
            {[0, 1, 2].map((i) => (
              <div key={i} className="bg-[#1C1C1C] border border-white/8 hover:border-[#F47920]/20 rounded-2xl p-6 transition-all">
                <div className="flex items-start gap-4 mb-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: `${config.color}18` }}>
                    <HelpCircle size={16} style={{ color: config.color }} />
                  </div>
                  <h3 className="text-white font-semibold leading-snug">{t(`faq.${i}.q`)}</h3>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed pl-12">{t(`faq.${i}.a`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

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
