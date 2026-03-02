const C = 200; // centre du SVG
const R = 130; // rayon orbite

const nodes = [
  { key: "digital",    label: "Digital",    emoji: "🔄", color: "#F47920", deg: -90  },
  { key: "telecom",    label: "Télécom",    emoji: "📡", color: "#F47920", deg: -18  },
  { key: "datacenter", label: "Datacenter", emoji: "🖥",  color: "#8B5E3C", deg:  54  },
  { key: "mobile",     label: "Mobile",     emoji: "📱", color: "#FF9A4A", deg: 126  },
  { key: "ai",         label: "Agent IA",   emoji: "🤖", color: "#C45D0A", deg: 198  },
].map((n) => ({
  ...n,
  x: Math.round(C + R * Math.cos((n.deg * Math.PI) / 180)),
  y: Math.round(C + R * Math.sin((n.deg * Math.PI) / 180)),
}));

function hexPoints(cx: number, cy: number, r: number): string {
  return Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i - Math.PI / 6;
    return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`;
  }).join(" ");
}

export default function HeroEcosystem() {
  return (
    <svg
      width="400" height="400"
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="hubGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#FF9A4A" />
          <stop offset="100%" stopColor="#C45D0A" />
        </radialGradient>

        <radialGradient id="bgGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#F47920" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#F47920" stopOpacity="0"    />
        </radialGradient>

        <filter id="hubGlow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Ambient background glow */}
      <circle cx={C} cy={C} r="180" fill="url(#bgGlow)" />

      {/* Orbit ring (pointillés discrets) */}
      <circle
        cx={C} cy={C} r={R}
        stroke="#F47920" strokeWidth="0.5"
        strokeDasharray="3 9" opacity="0.25"
      />

      {/* Anneaux de pulse depuis le hub (3 staggered) */}
      {[0, 1, 2].map((i) => (
        <circle
          key={i}
          cx={C} cy={C} r="38"
          fill="none" stroke="#F47920" strokeWidth="1.5"
          style={{
            transformOrigin: `${C}px ${C}px`,
            animation: `ringPulse 3s ease-out ${i * 1}s infinite`,
          }}
        />
      ))}

      {/* Lignes de connexion hub → nœuds (pointillés animés) */}
      {nodes.map((node) => (
        <line
          key={node.key}
          x1={C} y1={C} x2={node.x} y2={node.y}
          stroke={node.color}
          strokeWidth="1.5"
          strokeDasharray="5 7"
          opacity="0.45"
          style={{ animation: `dashTravel 2.5s linear infinite` }}
        />
      ))}

      {/* Nœuds de service (halo + cercle + emoji + label) */}
      {nodes.map((node, i) => (
        <g
          key={node.key}
          style={{
            animation: `float 3s ease-in-out ${i * 0.6}s infinite`,
          }}
        >
          {/* Halo extérieur */}
          <circle cx={node.x} cy={node.y} r="40" fill={node.color} opacity="0.06" />
          {/* Cercle principal */}
          <circle
            cx={node.x} cy={node.y} r="28"
            fill={node.color} fillOpacity="0.13"
            stroke={node.color} strokeWidth="1.5"
          />
          {/* Emoji service */}
          <text
            x={node.x} y={node.y - 2}
            textAnchor="middle" dominantBaseline="central"
            fontSize="18"
            style={{
              userSelect: "none",
              fontFamily: "'Apple Color Emoji','Segoe UI Emoji','Noto Color Emoji',sans-serif",
            }}
          >
            {node.emoji}
          </text>
          {/* Label */}
          <text
            x={node.x} y={node.y + 20}
            textAnchor="middle" fontSize="9"
            fill="white" fillOpacity="0.55"
            style={{ fontFamily: "Inter, system-ui, sans-serif" }}
          >
            {node.label}
          </text>
        </g>
      ))}

      {/* Hub central — hexagone CUBE */}
      <g filter="url(#hubGlow)">
        <polygon
          points={hexPoints(C, C, 38)}
          fill="url(#hubGrad)"
          stroke="#FF9A4A" strokeWidth="1.5"
        />
        <text
          x={C} y={C - 3}
          textAnchor="middle" dominantBaseline="central"
          fontSize="11" fontWeight="900" fill="white"
          style={{ fontFamily: "'Arial Black', Arial, sans-serif", letterSpacing: "0.5px" }}
        >
          CUBE
        </text>
        <text
          x={C} y={C + 11}
          textAnchor="middle" fontSize="7"
          fill="white" fillOpacity="0.65"
          style={{ fontFamily: "Inter, system-ui, sans-serif", letterSpacing: "0.15em" }}
        >
          SMART
        </text>
      </g>
    </svg>
  );
}
