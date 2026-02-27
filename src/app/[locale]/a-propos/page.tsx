import { getTranslations } from "next-intl/server";
import SectionBadge from "@/components/SectionBadge";
import { Target, Eye, Award, Zap, Heart, Shield } from "lucide-react";

const valueIcons = [Award, Zap, Heart, Shield];
const valueColors = ["#F47920","#9B9EA3","#FF9A4A","#6D6E71"];

export default async function AboutPage() {
  const t = await getTranslations("about");

  const values = Array.from({ length: 4 }, (_, i) => ({
    title: t(`values.items.${i}.title`),
    desc:  t(`values.items.${i}.desc`),
  }));

  const team = [
    { name: "Directeur Général",     role: "CEO & Fondateur",               initials: "DG", color: "#F47920" },
    { name: "Directeur Technique",   role: "CTO",                           initials: "DT", color: "#C45D0A" },
    { name: "Expert Digital",        role: "Digital Transformation Lead",   initials: "ED", color: "#FF9A4A" },
    { name: "Expert Réseau",         role: "Network & Telecom Expert",      initials: "ER", color: "#9B9EA3" },
    { name: "Expert IA",             role: "AI & Data Science Lead",        initials: "EA", color: "#8B5E3C" },
    { name: "Responsable Formation", role: "Training Manager",              initials: "RF", color: "#6D6E71" },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 gradient-scs-dark" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#F47920]/8 rounded-full blur-3xl" />
        <div className="absolute inset-0 grid-overlay" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionBadge text={t("hero.badge")} color="#F47920" />
          <h1 className="text-5xl font-bold text-white mt-6 mb-4">
            {t("hero.title")}{" "}
            <span className="bg-gradient-to-r from-[#F47920] to-[#FF9A4A] bg-clip-text text-transparent">
              {t("hero.titleHighlight")}
            </span>
          </h1>
          <p className="text-slate-400 text-xl max-w-3xl mx-auto leading-relaxed">{t("hero.subtitle")}</p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-[#1C1C1C] border border-white/8 rounded-3xl p-10 hover:border-[#F47920]/30 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#F47920]/15 flex items-center justify-center mb-6">
                <Target size={24} className="text-[#F47920]" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">{t("mission.title")}</h2>
              <p className="text-slate-400 leading-relaxed">{t("mission.desc")}</p>
            </div>
            <div className="bg-[#1C1C1C] border border-white/8 rounded-3xl p-10 hover:border-[#9B9EA3]/30 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#9B9EA3]/15 flex items-center justify-center mb-6">
                <Eye size={24} className="text-[#9B9EA3]" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">{t("vision.title")}</h2>
              <p className="text-slate-400 leading-relaxed">{t("vision.desc")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-[#161616] border-y border-white/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white">{t("values.title")}</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, i) => {
              const Icon = valueIcons[i];
              return (
                <div key={i} className="bg-[#1C1C1C] border border-white/8 rounded-2xl p-6 text-center hover:border-[#F47920]/25 transition-all">
                  <div className="w-12 h-12 rounded-2xl mx-auto flex items-center justify-center mb-4"
                    style={{ background: `${valueColors[i]}18` }}>
                    <Icon size={24} style={{ color: valueColors[i] }} />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">{val.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{val.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-2">{t("team.title")}</h2>
            <p className="text-slate-400">{t("team.subtitle")}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member, i) => (
              <div key={i} className="bg-[#1C1C1C] hover:bg-[#222222] border border-white/8 hover:border-[#F47920]/20 rounded-2xl p-6 transition-all text-center">
                <div className="w-20 h-20 rounded-2xl mx-auto flex items-center justify-center text-white font-bold text-2xl mb-4"
                  style={{ background: `linear-gradient(135deg, ${member.color}, ${member.color}80)` }}>
                  {member.initials}
                </div>
                <h3 className="text-white font-bold text-lg">{member.name}</h3>
                <p className="text-slate-400 text-sm mt-1">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Numbers */}
      <section className="py-20 bg-[#161616] border-y border-white/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { value: "2014", label: "Année de création"   },
              { value: "150+", label: "Projets livrés"      },
              { value: "15+",  label: "Secteurs d'activité" },
              { value: "5",    label: "Pays couverts"       },
            ].map((item, i) => (
              <div key={i}>
                <div className="text-4xl font-bold bg-gradient-to-r from-[#F47920] to-[#FF9A4A] bg-clip-text text-transparent mb-2">{item.value}</div>
                <div className="text-slate-400 text-sm">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
