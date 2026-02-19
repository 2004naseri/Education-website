// src/services/books.service.js
// ============================================================
// Books Service — NurPath
//
// Currently: returns mock data with simulated delay
// Later:     swap mockDelay + return with apiClient.get()
//
// To switch to real API — replace each function body with:
//   return apiClient.get("/books", { params: filters }).then(r => r.data)
// ============================================================

import { mockDelay } from "./axios";

// ── Mock data ─────────────────────────────────────────────────
const MOCK_BOOKS = [
  {
    id: "1",
    title: "Riyad as-Salihin",
    titleArabic: "رياض الصالحين",
    author: "Imam al-Nawawi",
    authorArabic: "الإمام النووي",
    description:
      "A comprehensive collection of Quranic verses and hadith on Islamic conduct, compiled by the great scholar Imam al-Nawawi.",
    category: "hadith",
    language: ["arabic", "english"],
    coverImage: "https://placehold.co/300x400/1b4332/f0d9a0?text=رياض+الصالحين",
    pdfUrl: "#",
    pages: 654,
    publishedYear: 1272,
    tags: ["hadith", "ethics", "spirituality"],
    featured: true,
    downloadCount: 12400,
  },
  {
    id: "2",
    title: "Tafsir Ibn Kathir",
    titleArabic: "تفسير ابن كثير",
    author: "Imam Ibn Kathir",
    authorArabic: "الإمام ابن كثير",
    description:
      "One of the most celebrated and widely respected Quran commentaries, known for its reliance on Quranic verses and authentic hadith.",
    category: "tafsir",
    language: ["arabic", "english", "urdu"],
    coverImage:
      "https://placehold.co/300x400/1b4332/f0d9a0?text=تفسير+ابن+كثير",
    pdfUrl: "#",
    pages: 1200,
    publishedYear: 1370,
    tags: ["tafsir", "quran", "commentary"],
    featured: true,
    downloadCount: 18900,
  },
  {
    id: "3",
    title: "Al-Aqeedah al-Wasitiyyah",
    titleArabic: "العقيدة الواسطية",
    author: "Ibn Taymiyyah",
    authorArabic: "ابن تيمية",
    description:
      "A foundational text on Islamic creed covering the essential beliefs of Ahlus-Sunnah wal-Jama'ah.",
    category: "aqeedah",
    language: ["arabic", "english"],
    coverImage:
      "https://placehold.co/300x400/1b4332/f0d9a0?text=العقيدة+الواسطية",
    pdfUrl: "#",
    pages: 180,
    publishedYear: 1300,
    tags: ["aqeedah", "creed", "beliefs"],
    featured: false,
    downloadCount: 8700,
  },
  {
    id: "4",
    title: "Fiqh us-Sunnah",
    titleArabic: "فقه السنة",
    author: "Sayyid Sabiq",
    authorArabic: "السيد سابق",
    description:
      "A modern comprehensive work on Islamic jurisprudence based on the Quran and Sunnah, covering all major acts of worship and daily life.",
    category: "fiqh",
    language: ["arabic", "english"],
    coverImage: "https://placehold.co/300x400/1b4332/f0d9a0?text=فقه+السنة",
    pdfUrl: "#",
    pages: 980,
    publishedYear: 1945,
    tags: ["fiqh", "jurisprudence", "worship"],
    featured: true,
    downloadCount: 14200,
  },
  {
    id: "5",
    title: "The Sealed Nectar",
    titleArabic: "الرحيق المختوم",
    author: "Safi-ur-Rahman al-Mubarakpuri",
    authorArabic: "صفي الرحمن المباركفوري",
    description:
      "An award-winning biography of the Prophet Muhammad ﷺ, meticulously researched and beautifully written.",
    category: "seerah",
    language: ["arabic", "english", "urdu"],
    coverImage:
      "https://placehold.co/300x400/1b4332/f0d9a0?text=الرحيق+المختوم",
    pdfUrl: "#",
    pages: 580,
    publishedYear: 1976,
    tags: ["seerah", "prophet", "biography"],
    featured: true,
    downloadCount: 22100,
  },
  {
    id: "6",
    title: "Hisnul Muslim",
    titleArabic: "حصن المسلم",
    author: "Said ibn Ali al-Qahtani",
    authorArabic: "سعيد بن علي القحطاني",
    description:
      "A pocket-sized collection of authentic supplications from the Quran and Sunnah for every occasion in daily life.",
    category: "general",
    language: ["arabic", "english", "dari", "pashto"],
    coverImage: "https://placehold.co/300x400/1b4332/f0d9a0?text=حصن+المسلم",
    pdfUrl: "#",
    pages: 120,
    publishedYear: 1990,
    tags: ["dua", "supplication", "daily"],
    featured: false,
    downloadCount: 31500,
  },
];

// ── Service functions ─────────────────────────────────────────

export const booksService = {
  // Get paginated list with optional filters
  getAll: async ({
    page = 1,
    limit = 12,
    category = "all",
    search = "",
    language = "all",
  } = {}) => {
    await mockDelay(500);

    let results = [...MOCK_BOOKS];

    // Filter by category
    if (category && category !== "all") {
      results = results.filter((b) => b.category === category);
    }

    // Filter by language
    if (language && language !== "all") {
      results = results.filter((b) => b.language.includes(language));
    }

    // Filter by search
    if (search.trim()) {
      const q = search.toLowerCase();
      results = results.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.titleArabic?.includes(q) ||
          b.author.toLowerCase().includes(q) ||
          b.tags.some((t) => t.includes(q)),
      );
    }

    // Paginate
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

  // Get single book by ID
  getById: async (id) => {
    await mockDelay(300);
    const book = MOCK_BOOKS.find((b) => b.id === id);
    if (!book) throw new Error("Book not found");
    return { success: true, data: book };
  },

  // Get featured books for Home page
  getFeatured: async () => {
    await mockDelay(400);
    const data = MOCK_BOOKS.filter((b) => b.featured).slice(0, 4);
    return { success: true, data };
  },
};
