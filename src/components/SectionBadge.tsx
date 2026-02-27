interface SectionBadgeProps {
  text: string;
  color?: string;
}

export default function SectionBadge({ text, color = "#F47920" }: SectionBadgeProps) {
  return (
    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium border"
      style={{ color, borderColor: `${color}40`, backgroundColor: `${color}15` }}>
      <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: color }} />
      {text}
    </span>
  );
}
