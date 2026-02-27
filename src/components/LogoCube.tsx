interface LogoCubeProps {
  size?: number;
  showText?: boolean;
  className?: string;
}

/**
 * SVG logo fidèle au logo Smart Cube Services :
 * 4 lettres C·U·B·E sur des rectangles orange et gris entrelacés.
 */
export default function LogoCube({ size = 48, showText = true, className = "" }: LogoCubeProps) {
  const w = size * 2.6;  // ratio largeur logo
  const h = size;

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* SVG CUBE logo */}
      <svg
        width={w}
        height={h}
        viewBox="0 0 130 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Smart Cube Services logo"
      >
        {/* ── Rectangles de fond ── */}
        {/* C – rectangle orange gauche */}
        <rect x="0"   y="6"  width="34" height="38" rx="2" fill="#F47920" />
        {/* U – rectangle gris centre-gauche */}
        <rect x="25"  y="0"  width="28" height="44" rx="2" fill="#6D6E71" />
        {/* Overlap C∩U → brun */}
        <rect x="25"  y="6"  width="9"  height="38" rx="0" fill="#8B5E3C" />
        {/* B – rectangle gris centre-droit */}
        <rect x="62"  y="0"  width="28" height="44" rx="2" fill="#6D6E71" />
        {/* E – rectangle orange droite */}
        <rect x="79"  y="6"  width="34" height="38" rx="2" fill="#F47920" />
        {/* Overlap B∩E → brun */}
        <rect x="79"  y="6"  width="11" height="38" rx="0" fill="#8B5E3C" />

        {/* ── Lettres blanches ── */}
        <text
          x="8"   y="37"
          fontFamily="Arial Black, Arial, sans-serif"
          fontWeight="900"
          fontSize="28"
          fill="white"
          letterSpacing="-1"
        >C</text>
        <text
          x="30"  y="37"
          fontFamily="Arial Black, Arial, sans-serif"
          fontWeight="900"
          fontSize="28"
          fill="white"
          letterSpacing="-1"
        >U</text>
        <text
          x="63"  y="37"
          fontFamily="Arial Black, Arial, sans-serif"
          fontWeight="900"
          fontSize="28"
          fill="white"
          letterSpacing="-1"
        >B</text>
        <text
          x="88"  y="37"
          fontFamily="Arial Black, Arial, sans-serif"
          fontWeight="900"
          fontSize="28"
          fill="white"
          letterSpacing="-1"
        >E</text>
      </svg>

      {/* Texte "Services" si demandé */}
      {showText && (
        <div className="flex flex-col leading-tight">
          <span className="text-[#9B9EA3] text-[10px] font-semibold tracking-[0.2em] uppercase">
            Smart
          </span>
          <span className="text-white text-[11px] font-bold tracking-[0.15em] uppercase">
            Services
          </span>
        </div>
      )}
    </div>
  );
}
