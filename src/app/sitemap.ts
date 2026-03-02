import type { MetadataRoute } from "next";

const base = "https://www.smartcube.ma";

const locales = ["fr", "en"] as const;

const servicesFr = [
  "transformation-digitale",
  "telecom-reseaux-prives",
  "datacenter",
  "applications-mobiles",
  "agent-ia",
];

const servicesEn = [
  "digital-transformation",
  "telecom-private-networks",
  "datacenter",
  "mobile-applications",
  "ai-agents",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ["", "/services", "/blog", "/contact"];
  const aboutPaths: Record<string, string> = { fr: "/a-propos", en: "/about" };

  const entries: MetadataRoute.Sitemap = [];

  // Static pages per locale
  for (const locale of locales) {
    for (const page of staticPages) {
      entries.push({
        url: `${base}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === "" ? "weekly" : "monthly",
        priority: page === "" ? 1 : 0.8,
      });
    }
    entries.push({
      url: `${base}/${locale}${aboutPaths[locale]}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  // Service detail pages
  servicesFr.forEach((slug) => {
    entries.push({
      url: `${base}/fr/services/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    });
  });

  servicesEn.forEach((slug) => {
    entries.push({
      url: `${base}/en/services/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    });
  });

  return entries;
}
