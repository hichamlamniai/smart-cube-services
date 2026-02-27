"use client";
import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import SectionBadge from "@/components/SectionBadge";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from "lucide-react";

const services = ["digital","telecom","datacenter","mobile","ai"];

export default function ContactPage() {
  const t  = useTranslations("contact");
  const ts = useTranslations("services.list");
  const locale = useLocale();
  const [submitted, setSubmitted] = useState(false);
  const [loading,   setLoading]   = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted(true);
  };

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
          <p className="text-slate-400 text-xl max-w-2xl mx-auto">{t("hero.subtitle")}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Form */}
            <div className="lg:col-span-3">
              <div className="bg-[#1C1C1C] border border-white/8 rounded-3xl p-8">
                {submitted ? (
                  <div className="text-center py-16">
                    <CheckCircle size={64} className="text-[#F47920] mx-auto mb-6" />
                    <h3 className="text-white text-2xl font-bold mb-3">{locale === "fr" ? "Message envoyé !" : "Message sent!"}</h3>
                    <p className="text-slate-400">{t("form.success")}</p>
                    <button onClick={() => setSubmitted(false)}
                      className="mt-6 px-6 py-3 rounded-xl bg-[#F47920] text-white font-semibold hover:bg-[#FF9A4A] transition-all">
                      {locale === "fr" ? "Envoyer un autre message" : "Send another message"}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-slate-300 text-sm font-medium mb-2">{t("form.name")} *</label>
                        <input required type="text"
                          className="w-full bg-[#111111] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-[#F47920]/60 transition-colors"
                          placeholder="John Doe" />
                      </div>
                      <div>
                        <label className="block text-slate-300 text-sm font-medium mb-2">{t("form.email")} *</label>
                        <input required type="email"
                          className="w-full bg-[#111111] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-[#F47920]/60 transition-colors"
                          placeholder="john@company.com" />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-slate-300 text-sm font-medium mb-2">{t("form.phone")}</label>
                        <input type="tel"
                          className="w-full bg-[#111111] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-[#F47920]/60 transition-colors"
                          placeholder="+212 6XX XXX XXX" />
                      </div>
                      <div>
                        <label className="block text-slate-300 text-sm font-medium mb-2">{t("form.company")}</label>
                        <input type="text"
                          className="w-full bg-[#111111] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-[#F47920]/60 transition-colors"
                          placeholder="Company SA" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-slate-300 text-sm font-medium mb-2">{t("form.service")}</label>
                      <select className="w-full bg-[#111111] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#F47920]/60 transition-colors appearance-none">
                        <option value="" className="bg-[#1C1C1C]">{t("form.selectService")}</option>
                        {services.map((svc) => (
                          <option key={svc} value={svc} className="bg-[#1C1C1C]">{ts(`${svc}.name`)}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-slate-300 text-sm font-medium mb-2">{t("form.message")} *</label>
                      <textarea required rows={5}
                        className="w-full bg-[#111111] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-[#F47920]/60 transition-colors resize-none"
                        placeholder={locale === "fr" ? "Décrivez votre projet ou votre besoin..." : "Describe your project or need..."} />
                    </div>
                    <button type="submit" disabled={loading}
                      className="w-full py-4 rounded-xl bg-[#F47920] hover:bg-[#FF9A4A] text-white font-bold text-lg transition-all hover:shadow-lg hover:shadow-orange-500/25 disabled:opacity-70 flex items-center justify-center gap-3">
                      {loading ? (
                        <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        {locale === "fr" ? "Envoi..." : "Sending..."}</>
                      ) : (
                        <><Send size={20} /> {t("form.submit")}</>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Info */}
            <div className="lg:col-span-2 space-y-6">
              {[
                { icon: MapPin, label: t("info.address"), value: "Florida Center Park, Sidi Maarouf, Casablanca", color: "#F47920" },
                { icon: Phone,  label: t("info.phone"),   value: "+212 5 20 07 56 77",                               color: "#FF9A4A" },
                { icon: Mail,   label: t("info.email"),   value: "cubesmartservices@gmail.com",                      color: "#C45D0A" },
                { icon: Clock,  label: t("info.hours"),   value: locale === "fr" ? "Lun–Dim : 9h–17h" : "Mon–Sun: 9am–5pm", color: "#9B9EA3" },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex items-start gap-4 p-5 bg-[#1C1C1C] border border-white/8 rounded-2xl hover:border-[#F47920]/20 transition-all">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${item.color}18` }}>
                      <Icon size={20} style={{ color: item.color }} />
                    </div>
                    <div>
                      <div className="text-slate-500 text-xs uppercase tracking-wider mb-1">{item.label}</div>
                      <div className="text-white font-medium">{item.value}</div>
                    </div>
                  </div>
                );
              })}
              <div className="bg-[#1C1C1C] border border-white/8 rounded-2xl overflow-hidden h-48 flex items-center justify-center">
                <div className="text-center text-slate-400">
                  <MapPin size={32} className="mx-auto mb-2 text-[#F47920]" />
                  <p className="text-sm font-medium text-white">Florida Center Park</p>
                  <p className="text-xs mt-1">Sidi Maarouf, Casablanca, MA</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
