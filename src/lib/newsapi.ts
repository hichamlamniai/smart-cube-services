const API_KEY = process.env.NEWS_API_KEY;
const BASE_URL = "https://newsapi.org/v2";

export interface Article {
  title: string;
  description: string;
  url: string;
  urlToImage?: string;
  publishedAt: string;
  source: { name: string };
  category?: string;
}

const categoryQueries: Record<string, string> = {
  digital: "digital transformation OR digitalisation enterprise",
  telecom: "telecommunications OR 5G network infrastructure",
  datacenter: "datacenter OR data center cloud infrastructure",
  mobile: "mobile application development iOS Android",
  ai: "artificial intelligence AI agents automation LLM",
  national: "Maroc digital technologie innovation numérique",
  international: "technology innovation tech startup",
};

export async function fetchArticlesByCategory(category: string, pageSize = 9): Promise<Article[]> {
  if (!API_KEY) return getMockArticles(category);

  const query = categoryQueries[category] || categoryQueries.international;
  try {
    const res = await fetch(
      `${BASE_URL}/everything?q=${encodeURIComponent(query)}&language=${category === "national" ? "fr" : "en"}&sortBy=publishedAt&pageSize=${pageSize}&apiKey=${API_KEY}`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return getMockArticles(category);
    const data = await res.json();
    return (data.articles || []).filter((a: Article) => a.title && a.description && a.url).map((a: Article) => ({ ...a, category }));
  } catch {
    return getMockArticles(category);
  }
}

export async function fetchAllArticles(pageSize = 24): Promise<Article[]> {
  if (!API_KEY) return getMockArticlesMixed();

  try {
    const res = await fetch(
      `${BASE_URL}/everything?q=technology+OR+digital+OR+AI+OR+telecom+OR+innovation&sortBy=publishedAt&pageSize=${pageSize}&apiKey=${API_KEY}`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return getMockArticlesMixed();
    const data = await res.json();
    return (data.articles || []).filter((a: Article) => a.title && a.description && a.url);
  } catch {
    return getMockArticlesMixed();
  }
}

function getMockArticlesMixed(): Article[] {
  const categories = ["digital", "telecom", "datacenter", "mobile", "ai", "international"];
  return mockArticlesData.map((a, i) => ({ ...a, category: categories[i % categories.length] }));
}

function getMockArticles(category: string): Article[] {
  return mockArticlesData.slice(0, 9).map(a => ({ ...a, category }));
}

const mockArticlesData: Article[] = [
  {
    title: "L'IA générative révolutionne la transformation digitale des entreprises",
    description: "Les entreprises adoptent massivement les agents IA pour automatiser leurs processus métier et gagner en compétitivité sur le marché mondial.",
    url: "#",
    urlToImage: undefined,
    publishedAt: new Date().toISOString(),
    source: { name: "Tech Journal" },
    category: "ai",
  },
  {
    title: "5G et réseaux privés : l'accélérateur de l'industrie 4.0",
    description: "Le déploiement des réseaux 5G privés ouvre de nouvelles perspectives pour l'automatisation industrielle et les applications temps réel.",
    url: "#",
    urlToImage: undefined,
    publishedAt: new Date(Date.now() - 86400000).toISOString(),
    source: { name: "Telecom Review" },
    category: "telecom",
  },
  {
    title: "Cloud hybride : les datacenters se réinventent",
    description: "L'architecture cloud hybride devient la norme pour les entreprises cherchant à équilibrer performance, sécurité et coûts d'infrastructure.",
    url: "#",
    urlToImage: undefined,
    publishedAt: new Date(Date.now() - 172800000).toISOString(),
    source: { name: "DC Magazine" },
    category: "datacenter",
  },
  {
    title: "Applications mobiles : les tendances qui façonnent 2025",
    description: "De la réalité augmentée aux applications IA natives, le développement mobile évolue rapidement avec de nouveaux paradigmes d'expérience utilisateur.",
    url: "#",
    urlToImage: undefined,
    publishedAt: new Date(Date.now() - 259200000).toISOString(),
    source: { name: "Mobile World" },
    category: "mobile",
  },
  {
    title: "Maroc : stratégie nationale pour la transformation digitale 2025-2030",
    description: "Le Maroc accélère sa transformation numérique avec un plan ambitieux visant à faire du royaume un hub digital régional d'ici 2030.",
    url: "#",
    urlToImage: undefined,
    publishedAt: new Date(Date.now() - 345600000).toISOString(),
    source: { name: "Maroc Digital" },
    category: "national",
  },
  {
    title: "Cybersécurité : les nouvelles menaces et comment s'en protéger",
    description: "Face à la sophistication croissante des cyberattaques, les entreprises renforcent leurs stratégies de sécurité avec l'IA défensive.",
    url: "#",
    urlToImage: undefined,
    publishedAt: new Date(Date.now() - 432000000).toISOString(),
    source: { name: "CyberSec Today" },
    category: "digital",
  },
  {
    title: "Rapport Gartner : les 10 tendances tech qui redéfinissent l'entreprise",
    description: "Le cabinet Gartner identifie les technologies émergentes qui transformeront les organisations d'ici 2026, de l'IA générative au edge computing.",
    url: "#",
    urlToImage: undefined,
    publishedAt: new Date(Date.now() - 518400000).toISOString(),
    source: { name: "Gartner" },
    category: "international",
  },
  {
    title: "SD-WAN : la révolution silencieuse des réseaux d'entreprise",
    description: "L'adoption du SD-WAN transforme la gestion des réseaux d'entreprise, offrant flexibilité et réduction des coûts opérationnels.",
    url: "#",
    urlToImage: undefined,
    publishedAt: new Date(Date.now() - 604800000).toISOString(),
    source: { name: "Network World" },
    category: "telecom",
  },
  {
    title: "Flutter 4.0 : le futur du développement mobile cross-platform",
    description: "La nouvelle version de Flutter apporte des améliorations majeures de performance et de nouvelles fonctionnalités pour le développement multi-plateforme.",
    url: "#",
    urlToImage: undefined,
    publishedAt: new Date(Date.now() - 691200000).toISOString(),
    source: { name: "Dev News" },
    category: "mobile",
  },
];
