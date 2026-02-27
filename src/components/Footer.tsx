import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Mail, Phone, MapPin, Linkedin, Twitter, Globe } from "lucide-react";
import LogoCube from "./LogoCube";

const services = [
  { key: "digital",    frHref: "/services/transformation-digitale",  enHref: "/services/digital-transformation"  },
  { key: "telecom",    frHref: "/services/telecom-reseaux-prives",    enHref: "/services/telecom-private-networks" },
  { key: "datacenter", frHref: "/services/datacenter",               enHref: "/services/datacenter"               },
  { key: "mobile",     frHref: "/services/applications-mobiles",     enHref: "/services/mobile-applications"      },
  { key: "ai",         frHref: "/services/agent-ia",                 enHref: "/services/ai-agents"                },
];

export default function Footer() {
  const t  = useTranslations("footer");
  const tn = useTranslations("nav");
  const ts = useTranslations("services.list");
  const locale = useLocale();
  const year   = new Date().getFullYear();

  return (
    <footer className="bg-[#0D0D0D] border-t border-white/8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-1">
            <Link href={`/${locale}`} className="mb-5 block"><LogoCube size={38} showText={true} /></Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">{t("desc")}</p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#F47920] flex items-center justify-center text-slate-400 hover:text-white transition-all"><Linkedin size={16} /></a>
              <a href="#" className="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#6D6E71] flex items-center justify-center text-slate-400 hover:text-white transition-all"><Twitter size={16} /></a>
              <a href="#" className="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#F47920] flex items-center justify-center text-slate-400 hover:text-white transition-all"><Globe size={16} /></a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">{t("services")}</h3>
            <ul className="space-y-3">
              {services.map((svc) => (
                <li key={svc.key}>
                  <Link href={`/${locale}${locale === "fr" ? svc.frHref : svc.enHref}`}
                    className="text-slate-400 hover:text-[#F47920] transition-colors text-sm">{ts(`${svc.key}.name`)}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">{t("company")}</h3>
            <ul className="space-y-3">
              <li><Link href={`/${locale}/${locale === "fr" ? "a-propos" : "about"}`} className="text-slate-400 hover:text-[#F47920] transition-colors text-sm">{tn("about")}</Link></li>
              <li><Link href={`/${locale}/blog`}    className="text-slate-400 hover:text-[#F47920] transition-colors text-sm">{tn("blog")}</Link></li>
              <li><Link href={`/${locale}/contact`} className="text-slate-400 hover:text-[#F47920] transition-colors text-sm">{tn("contact")}</Link></li>
              <li><a href="#" className="text-slate-400 hover:text-[#F47920] transition-colors text-sm">{t("legal")}</a></li>
              <li><a href="#" className="text-slate-400 hover:text-[#F47920] transition-colors text-sm">{t("privacy")}</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3"><MapPin size={16} className="text-[#F47920] mt-0.5 flex-shrink-0" /><span className="text-slate-400 text-sm">Florida Center Park, Sidi Maarouf, Casablanca</span></li>
              <li className="flex items-center gap-3"><Phone size={16} className="text-[#F47920] flex-shrink-0" /><a href="tel:+212520075677" className="text-slate-400 hover:text-white transition-colors text-sm">+212 5 20 07 56 77</a></li>
              <li className="flex items-center gap-3"><Mail size={16} className="text-[#F47920] flex-shrink-0" /><a href="mailto:cubesmartservices@gmail.com" className="text-slate-400 hover:text-white transition-colors text-sm">cubesmartservices@gmail.com</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/8 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">© {year} Smart Cube Services. {t("rights")}.</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#F47920] animate-pulse" />
            <span className="text-slate-500 text-xs">Services opérationnels</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
