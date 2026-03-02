import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Smart Cube Services – Expert en Transformation Digitale";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
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
        {/* Top orange bar */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 6, backgroundColor: "#F47920", display: "flex" }} />

        {/* Orange blob */}
        <div style={{
          position: "absolute", top: 80, right: 80,
          width: 320, height: 320,
          borderRadius: "50%",
          backgroundColor: "#F47920",
          opacity: 0.07,
          display: "flex",
        }} />

        {/* Content */}
        <div style={{ display: "flex", flexDirection: "column", flex: 1, padding: "80px 80px 60px", justifyContent: "space-between" }}>
          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 40, height: 40, backgroundColor: "#F47920", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 20, height: 20, backgroundColor: "#ffffff", display: "flex", borderRadius: 4 }} />
            </div>
            <span style={{ color: "#9B9EA3", fontSize: 22, fontFamily: "sans-serif" }}>smartcube.ma</span>
          </div>

          {/* Main content */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 48, height: 3, backgroundColor: "#F47920", borderRadius: 2, display: "flex" }} />
              <span style={{ color: "#F47920", fontSize: 20, fontFamily: "sans-serif", fontWeight: 600 }}>Expert en Innovation Technologique</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <span style={{ color: "#ffffff", fontSize: 64, fontFamily: "sans-serif", fontWeight: 700, lineHeight: 1.1 }}>
                Smart Cube
              </span>
              <span style={{ color: "#F47920", fontSize: 64, fontFamily: "sans-serif", fontWeight: 700, lineHeight: 1.1 }}>
                Services
              </span>
            </div>
            <span style={{ color: "#9B9EA3", fontSize: 26, fontFamily: "sans-serif", maxWidth: 700 }}>
              Transformation digitale · Télécom · Datacenter · Mobile · IA
            </span>
          </div>

          {/* Stats */}
          <div style={{ display: "flex", gap: 48 }}>
            {[["150+", "Projets"], ["80+", "Clients"], ["25+", "Experts"], ["10+", "Ans"]].map(([val, label]) => (
              <div key={label} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <span style={{ color: "#F47920", fontSize: 32, fontFamily: "sans-serif", fontWeight: 700 }}>{val}</span>
                <span style={{ color: "#6D6E71", fontSize: 16, fontFamily: "sans-serif" }}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom gradient bar */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 4, backgroundColor: "#C45D0A", display: "flex" }} />
      </div>
    ),
    { ...size },
  );
}
