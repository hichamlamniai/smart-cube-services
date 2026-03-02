import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollToTop from "@/components/ScrollToTop";
import JsonLd from "@/components/JsonLd";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import "../globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-poppins" });

const BASE = "https://www.smartcube.ma";

type Props = { children: React.ReactNode; params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    metadataBase: new URL(BASE),
    title: t("title"),
    description: t("description"),
    keywords: "transformation digitale, télécommunications, datacenter, applications mobiles, agent IA, Maroc, Smart Cube Services",
    alternates: {
      canonical: `${BASE}/${locale}`,
      languages: {
        fr: `${BASE}/fr`,
        en: `${BASE}/en`,
        "x-default": `${BASE}/fr`,
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      type: "website",
      url: `${BASE}/${locale}`,
      siteName: "Smart Cube Services",
      locale: locale === "fr" ? "fr_MA" : "en_US",
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness"],
  "@id": `${BASE}/#organization`,
  name: "Smart Cube Services",
  url: BASE,
  logo: `${BASE}/logo.png`,
  description: "Expert en transformation digitale, télécommunications, datacenter, applications mobiles et intelligence artificielle au Maroc et en Afrique.",
  telephone: "+212520075677",
  email: "cubesmartservices@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Florida Center Park, Sidi Maarouf",
    addressLocality: "Casablanca",
    addressRegion: "Grand Casablanca",
    addressCountry: "MA",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "09:00",
    closes: "17:00",
  },
  areaServed: ["MA", "Africa", "MENA"],
  sameAs: [
    "https://www.linkedin.com/company/smart-cube-services",
  ],
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as "fr" | "en")) notFound();
  const messages = await getMessages();
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "";

  return (
    <html lang={locale} className="scroll-smooth">
      <body className={`${inter.variable} ${poppins.variable} bg-[#111111] font-sans`}>
        <JsonLd data={organizationJsonLd} />
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main>{children}</main>
          <Footer />
          <WhatsAppButton />
          <ScrollToTop />
        </NextIntlClientProvider>
        <GoogleAnalytics measurementId={gaId} />
      </body>
    </html>
  );
}
