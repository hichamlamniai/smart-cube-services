"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Globe } from "lucide-react";
import LogoCube from "./LogoCube";

const services = [
  { key: "digital",     frHref: "/services/transformation-digitale",  enHref: "/services/digital-transformation",   icon: "🔄", color: "#F47920" },
  { key: "telecom",     frHref: "/services/telecom-reseaux-prives",    enHref: "/services/telecom-private-networks",  icon: "📡", color: "#9B9EA3" },
  { key: "datacenter",  frHref: "/services/datacenter",                enHref: "/services/datacenter",                icon: "🖥️", color: "#8B5E3C" },
  { key: "mobile",      frHref: "/services/applications-mobiles",      enHref: "/services/mobile-applications",       icon: "📱", color: "#FF9A4A" },
  { key: "ai",          frHref: "/services/agent-ia",                  enHref: "/services/ai-agents",                 icon: "🤖", color: "#C45D0A" },
];

export default function Header() {
  const t  = useTranslations("nav");
  const ts = useTranslations("services.list");
  const locale   = useLocale();
  const pathname = usePathname();
  const [isOpen,       setIsOpen]       = useState(false);
  const [scrolled,     setScrolled]     = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const otherLocale = locale === "fr" ? "en" : "fr";
  const newPath     = pathname.replace(`/${locale}`, `/${otherLocale}`);
  const getHref     = (svc: typeof services[0]) =>
    `/${locale}${locale === "fr" ? svc.frHref : svc.enHref}`;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? "bg-[#111111]/96 backdrop-blur-md shadow-lg shadow-black/40 border-b border-white/5" : "bg-transparent"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href={`/${locale}`}><LogoCube size={40} showText={true} /></Link>

          <nav className="hidden lg:flex items-center gap-8">
            <Link href={`/${locale}`} className="text-slate-300 hover:text-white transition-colors text-sm font-medium">{t("home")}</Link>

            <div className="relative group" onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => setServicesOpen(false)}>
              <button className="flex items-center gap-1 text-slate-300 hover:text-white transition-colors text-sm font-medium">
                {t("services")} <ChevronDown size={14} className={`transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`} />
              </button>
              {servicesOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-72">
                  <div className="bg-[#1C1C1C] border border-white/8 rounded-2xl p-3 shadow-2xl shadow-black/60">
                    {services.map((svc) => (
                      <Link key={svc.key} href={getHref(svc)} onClick={() => setServicesOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition-colors group/item">
                        <span className="text-xl">{svc.icon}</span>
                        <span className="text-sm text-slate-300 group-hover/item:text-white transition-colors">{ts(`${svc.key}.name`)}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link href={`/${locale}/blog`} className="text-slate-300 hover:text-white transition-colors text-sm font-medium">{t("blog")}</Link>
            <Link href={`/${locale}/${locale === "fr" ? "a-propos" : "about"}`} className="text-slate-300 hover:text-white transition-colors text-sm font-medium">{t("about")}</Link>
            <Link href={`/${locale}/contact`} className="text-slate-300 hover:text-white transition-colors text-sm font-medium">{t("contact")}</Link>
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <Link href={newPath} className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors text-sm">
              <Globe size={14} /> {t("lang")}
            </Link>
            <Link href={`/${locale}/contact`}
              className="px-5 py-2.5 rounded-xl bg-[#F47920] hover:bg-[#FF9A4A] text-white text-sm font-semibold transition-all hover:shadow-lg hover:shadow-orange-500/30">
              {t("cta")}
            </Link>
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-white p-2">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-[#111111]/98 backdrop-blur-md border-t border-white/8">
          <div className="px-4 py-6 space-y-4">
            <Link href={`/${locale}`} onClick={() => setIsOpen(false)} className="block text-slate-300 hover:text-white py-2">{t("home")}</Link>
            <div className="border-t border-white/8 pt-4">
              <div className="text-xs text-slate-500 uppercase tracking-wider mb-3">{t("services")}</div>
              {services.map((svc) => (
                <Link key={svc.key} href={getHref(svc)} onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 text-slate-300 hover:text-white py-2 pl-2">
                  <span>{svc.icon}</span> {ts(`${svc.key}.name`)}
                </Link>
              ))}
            </div>
            <Link href={`/${locale}/blog`} onClick={() => setIsOpen(false)} className="block text-slate-300 hover:text-white py-2">{t("blog")}</Link>
            <Link href={`/${locale}/${locale === "fr" ? "a-propos" : "about"}`} onClick={() => setIsOpen(false)} className="block text-slate-300 hover:text-white py-2">{t("about")}</Link>
            <Link href={`/${locale}/contact`} onClick={() => setIsOpen(false)} className="block text-slate-300 hover:text-white py-2">{t("contact")}</Link>
            <div className="border-t border-white/8 pt-4 flex items-center justify-between">
              <Link href={newPath} className="text-slate-400 flex items-center gap-1 text-sm"><Globe size={14} /> {t("lang")}</Link>
              <Link href={`/${locale}/contact`} onClick={() => setIsOpen(false)}
                className="px-4 py-2 rounded-xl bg-[#F47920] text-white text-sm font-semibold">{t("cta")}</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
