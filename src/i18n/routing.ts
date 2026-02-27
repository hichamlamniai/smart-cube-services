import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["fr", "en"],
  defaultLocale: "fr",
  pathnames: {
    "/": "/",
    "/about": { fr: "/a-propos", en: "/about" },
    "/contact": "/contact",
    "/blog": "/blog",
    "/blog/[slug]": "/blog/[slug]",
    "/services": { fr: "/services", en: "/services" },
    "/services/transformation-digitale": {
      fr: "/services/transformation-digitale",
      en: "/services/digital-transformation",
    },
    "/services/telecom": {
      fr: "/services/telecom-reseaux-prives",
      en: "/services/telecom-private-networks",
    },
    "/services/datacenter": "/services/datacenter",
    "/services/applications-mobiles": {
      fr: "/services/applications-mobiles",
      en: "/services/mobile-applications",
    },
    "/services/agent-ia": {
      fr: "/services/agent-ia",
      en: "/services/ai-agents",
    },
  },
});

export type Locale = (typeof routing.locales)[number];
