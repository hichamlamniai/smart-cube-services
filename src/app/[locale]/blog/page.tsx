import { getTranslations } from "next-intl/server";
import SectionBadge from "@/components/SectionBadge";
import BlogCard from "@/components/BlogCard";
import { fetchAllArticles } from "@/lib/newsapi";

const categories = ["all","digital","telecom","datacenter","mobile","ai","national","international"];

const categoryColors: Record<string, string> = {
  all:           "#F47920",
  digital:       "#FF9A4A",
  telecom:       "#9B9EA3",
  datacenter:    "#8B5E3C",
  mobile:        "#C45D0A",
  ai:            "#F47920",
  national:      "#EF4444",
  international: "#6D6E71",
};

export default async function BlogPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const sp             = await searchParams;
  const activeCategory = sp.category || "all";
  const t              = await getTranslations("blog");
  const articles       = await fetchAllArticles(24);
  const filtered       = activeCategory === "all"
    ? articles
    : articles.filter((a) => a.category === activeCategory);

  return (
    <div className="min-h-screen pt-20">
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 gradient-scs-dark" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#F47920]/8 rounded-full blur-3xl" />
        <div className="absolute inset-0 grid-overlay" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionBadge text={t("title")} color="#F47920" />
          <h1 className="text-5xl font-bold text-white mt-6 mb-4">{t("title")}</h1>
          <p className="text-slate-400 text-xl max-w-3xl mx-auto">{t("subtitle")}</p>
        </div>
      </section>

      {/* Sticky filter */}
      <section className="sticky top-20 z-30 bg-[#111111]/95 backdrop-blur-md border-b border-white/8 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {categories.map((cat) => {
              const color    = categoryColors[cat];
              const isActive = activeCategory === cat;
              return (
                <a key={cat} href={`?category=${cat}`}
                  className="flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all"
                  style={isActive
                    ? { background: color, color: "white" }
                    : { color: "#94a3b8", border: `1px solid ${color}40` }}>
                  {t(`categories.${cat}`)}
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <div className="text-center py-24">
              <div className="text-5xl mb-4">📰</div>
              <p className="text-slate-400 text-lg">{t("noArticles")}</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((article, i) => (
                <BlogCard key={i}
                  title={article.title}
                  description={article.description || ""}
                  url={article.url}
                  urlToImage={article.urlToImage}
                  publishedAt={article.publishedAt}
                  source={article.source.name}
                  category={article.category || activeCategory}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
