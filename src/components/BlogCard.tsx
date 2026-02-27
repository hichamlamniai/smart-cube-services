import { Calendar, ExternalLink } from "lucide-react";

interface BlogCardProps {
  title: string;
  description: string;
  url: string;
  urlToImage?: string;
  publishedAt: string;
  source: string;
  category?: string;
}

const categoryColors: Record<string, string> = {
  digital: "#6366F1",
  telecom: "#0EA5E9",
  datacenter: "#8B5CF6",
  mobile: "#10B981",
  ai: "#F59E0B",
  national: "#EF4444",
  international: "#06B6D4",
};

export default function BlogCard({ title, description, url, urlToImage, publishedAt, source, category = "international" }: BlogCardProps) {
  const color = categoryColors[category] || "#F47920";
  const date = new Date(publishedAt).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });

  return (
    <a href={url} target="_blank" rel="noopener noreferrer"
      className="group flex flex-col bg-white/5 hover:bg-white/8 border border-white/10 hover:border-white/20 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
      {urlToImage && (
        <div className="relative h-48 overflow-hidden">
          <img src={urlToImage} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute top-3 left-3">
            <span className="px-2.5 py-1 rounded-full text-xs font-medium text-white" style={{ backgroundColor: color }}>
              {category}
            </span>
          </div>
        </div>
      )}
      <div className="flex flex-col flex-1 p-5">
        {!urlToImage && (
          <div className="mb-3">
            <span className="px-2.5 py-1 rounded-full text-xs font-medium text-white" style={{ backgroundColor: color }}>
              {category}
            </span>
          </div>
        )}
        <h3 className="text-white font-semibold text-base leading-snug mb-2 line-clamp-2 group-hover:text-[#F47920] transition-colors">{title}</h3>
        <p className="text-slate-400 text-sm leading-relaxed line-clamp-2 flex-1 mb-4">{description}</p>
        <div className="flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <Calendar size={12} />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#F47920]">
            <span>{source}</span>
            <ExternalLink size={12} />
          </div>
        </div>
      </div>
    </a>
  );
}
