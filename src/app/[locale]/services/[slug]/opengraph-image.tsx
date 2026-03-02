import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Smart Cube Services";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const serviceMap: Record<string, { icon: string; color: string; titleFr: string; titleEn: string; category: string }> = {
  "transformation-digitale": { icon: "🔄", color: "#F47920", titleFr: "Transformation Digitale",            titleEn: "Digital Transformation",       category: "Conseil & Ingénierie" },
  "telecom":                 { icon: "📡", color: "#F47920", titleFr: "Télécom & Réseaux Privés",           titleEn: "Telecom & Private Networks",   category: "Infrastructure" },
  "datacenter":              { icon: "🖥️", color: "#8B5E3C", titleFr: "Datacenter",                        titleEn: "Datacenter",                   category: "Infrastructure" },
  "applications-mobiles":    { icon: "📱", color: "#FF9A4A", titleFr: "Applications Mobiles",               titleEn: "Mobile Applications",          category: "Développement" },
  "agent-ia":                { icon: "🤖", color: "#C45D0A", titleFr: "Agent IA",                          titleEn: "AI Agents",                    category: "Intelligence Artificielle" },
};

export default async function Image({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug, locale } = await params;
  const svc = serviceMap[slug] ?? { icon: "⚡", color: "#F47920", titleFr: "Service", titleEn: "Service", category: "Expertise" };
  const title = locale === "en" ? svc.titleEn : svc.titleFr;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          backgroundColor: "#111111",
          position: "relative",
        }}
      >
        {/* Top color bar */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 6, backgroundColor: svc.color, display: "flex" }} />

        {/* Colored blob */}
        <div style={{
          position: "absolute", top: 60, right: 60,
          width: 350, height: 350,
          borderRadius: "50%",
          backgroundColor: svc.color,
          opacity: 0.08,
          display: "flex",
        }} />

        <div style={{ display: "flex", flexDirection: "column", flex: 1, padding: "80px 80px 60px", justifyContent: "space-between" }}>
          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ color: "#9B9EA3", fontSize: 20, fontFamily: "sans-serif" }}>Smart Cube Services · smartcube.ma</span>
          </div>

          {/* Icon + Title */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
              <div style={{
                width: 80, height: 80,
                borderRadius: 20,
                backgroundColor: svc.color + "25",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 42,
              }}>
                {svc.icon}
              </div>
              <span style={{ color: svc.color, fontSize: 20, fontFamily: "sans-serif", fontWeight: 600 }}>{svc.category}</span>
            </div>
            <span style={{ color: "#ffffff", fontSize: 68, fontFamily: "sans-serif", fontWeight: 700, lineHeight: 1.05 }}>
              {title}
            </span>
            <span style={{ color: "#9B9EA3", fontSize: 26, fontFamily: "sans-serif" }}>
              {locale === "en"
                ? "Consulting · Engineering & Design · Training"
                : "Conseil · Ingénierie & Design · Formation"}
            </span>
          </div>

          {/* Footer */}
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 40, height: 3, backgroundColor: svc.color, borderRadius: 2, display: "flex" }} />
            <span style={{ color: "#6D6E71", fontSize: 18, fontFamily: "sans-serif" }}>
              {locale === "en" ? "Contact us for a personalized quote" : "Contactez-nous pour un devis personnalisé"}
            </span>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 4, backgroundColor: svc.color, display: "flex" }} />
      </div>
    ),
    { ...size },
  );
}
