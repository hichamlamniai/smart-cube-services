import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const securityHeaders = [
  // Force HTTPS pour 2 ans, incluant sous-domaines
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // Empêche le clickjacking (iframe depuis un autre domaine)
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  // Empêche le MIME-type sniffing
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  // Protection XSS pour les navigateurs anciens
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  // Contrôle les informations du Referer envoyées
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  // Désactive les APIs sensibles inutilisées
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  // Content Security Policy
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      // Scripts : self + Next.js inline + GA4
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",
      // Styles : self + inline (Tailwind) + Google Fonts
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      // Fonts
      "font-src 'self' https://fonts.gstatic.com",
      // Images : self + data URIs + tout HTTPS (nécessaire pour les articles de blog)
      "img-src 'self' data: https:",
      // Connexions API : self + GA4 + Vercel analytics
      "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://vitals.vercel-insights.com",
      // Pas d'iframes tierces
      "frame-src 'none'",
      // Empêche ce site d'être embedé dans des iframes
      "frame-ancestors 'self'",
      // Formulaires : uniquement vers ce site
      "form-action 'self'",
      // Manifests et workers
      "manifest-src 'self'",
      "worker-src 'self' blob:",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Articles de blog depuis NewsAPI (images depuis n'importe quel domaine HTTPS)
      { protocol: "https", hostname: "**" },
    ],
  },
  async headers() {
    return [
      {
        // Applique les en-têtes à toutes les routes
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
