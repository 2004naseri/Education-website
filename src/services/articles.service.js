// src/services/articles.service.js
// ============================================================
// Articles Service — NurPath (Mock Data)
// Swap mockDelay + return with apiClient.get() for real API
// ============================================================

import { mockDelay } from "./axios";

const MOCK_ARTICLES = [
  {
    id: "1",
    slug: "importance-of-seeking-knowledge",
    title: "The Importance of Seeking Knowledge in Islam",
    titleArabic: "أهمية طلب العلم في الإسلام",
    excerpt:
      "Islam places tremendous emphasis on seeking knowledge. The very first word revealed to the Prophet ﷺ was 'Read' — a command that reverberates through centuries.",
    content: "Full article content here...",
    author: "Sheikh Abdullah al-Farsi",
    authorBio: "Islamic scholar and educator based in Kabul",
    coverImage:
      "https://placehold.co/800x450/1b4332/f0d9a0?text=Seeking+Knowledge",
    category: "knowledge",
    tags: ["knowledge", "education", "Islam"],
    readTime: 6,
    publishedAt: "2024-11-15",
    featured: true,
    views: 4200,
  },
  {
    id: "2",
    slug: "virtues-of-quran-recitation",
    title: "The Virtues and Etiquettes of Quran Recitation",
    titleArabic: "فضائل تلاوة القرآن وآدابها",
    excerpt:
      "Reciting the Quran is among the greatest acts of worship. Each letter carries immense reward, and the one who recites it with difficulty receives a double reward.",
    content: "Full article content here...",
    author: "Ustadh Ibrahim Noori",
    authorBio: "Hafiz and Quran teacher",
    coverImage:
      "https://placehold.co/800x450/1b4332/f0d9a0?text=Quran+Recitation",
    category: "practice",
    tags: ["quran", "recitation", "worship"],
    readTime: 8,
    publishedAt: "2024-11-20",
    featured: true,
    views: 3800,
  },
  {
    id: "3",
    slug: "ramadan-spiritual-preparation",
    title: "Preparing Your Heart for Ramadan",
    titleArabic: "تهيئة القلب لاستقبال رمضان",
    excerpt:
      "Ramadan is not merely about abstaining from food and drink. It is a complete spiritual overhaul — a month of intense devotion, reflection, and nearness to Allah.",
    content: "Full article content here...",
    author: "Dr. Fatima Rahimi",
    authorBio: "Islamic studies researcher",
    coverImage: "https://placehold.co/800x450/1b4332/f0d9a0?text=Ramadan",
    category: "spirituality",
    tags: ["ramadan", "fasting", "spirituality"],
    readTime: 10,
    publishedAt: "2024-12-01",
    featured: true,
    views: 6100,
  },
  {
    id: "4",
    slug: "history-of-islamic-scholarship",
    title: "The Golden Age of Islamic Scholarship",
    titleArabic: "العصر الذهبي للعلوم الإسلامية",
    excerpt:
      "From the 8th to 14th centuries, Muslim scholars made extraordinary contributions to science, philosophy, medicine, mathematics and theology.",
    content: "Full article content here...",
    author: "Prof. Ahmad Karimi",
    authorBio: "Professor of Islamic history",
    coverImage:
      "https://placehold.co/800x450/1b4332/f0d9a0?text=Islamic+Scholarship",
    category: "history",
    tags: ["history", "scholarship", "golden-age"],
    readTime: 12,
    publishedAt: "2024-10-10",
    featured: false,
    views: 2900,
  },
  {
    id: "5",
    slug: "purification-of-the-soul",
    title: "Tazkiyah: The Path to Purification of the Soul",
    titleArabic: "التزكية: طريق تطهير النفس",
    excerpt:
      "Tazkiyah — the purification and development of the soul — is one of the primary objectives of Islamic practice and the path to closeness with Allah.",
    content: "Full article content here...",
    author: "Sheikh Abdullah al-Farsi",
    authorBio: "Islamic scholar and educator",
    coverImage: "https://placehold.co/800x450/1b4332/f0d9a0?text=Tazkiyah",
    category: "spirituality",
    tags: ["tazkiyah", "soul", "purification"],
    readTime: 7,
    publishedAt: "2024-12-10",
    featured: false,
    views: 3300,
  },
];

export const articlesService = {
  getAll: async ({
    page = 1,
    limit = 9,
    category = "all",
    search = "",
  } = {}) => {
    await mockDelay(450);

    let results = [...MOCK_ARTICLES];

    if (category && category !== "all") {
      results = results.filter((a) => a.category === category);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      results = results.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q) ||
          a.tags.some((t) => t.includes(q)),
      );
    }

    const total = results.length;
    const totalPages = Math.ceil(total / limit);
    const start = (page - 1) * limit;
    const data = results.slice(start, start + limit);

    return {
      success: true,
      data,
      pagination: { page, limit, total, totalPages },
    };
  },

  getBySlug: async (slug) => {
    await mockDelay(300);
    const article = MOCK_ARTICLES.find((a) => a.slug === slug);
    if (!article) throw new Error("Article not found");
    return { success: true, data: article };
  },

  getFeatured: async () => {
    await mockDelay(400);
    const data = MOCK_ARTICLES.filter((a) => a.featured).slice(0, 3);
    return { success: true, data };
  },
};
