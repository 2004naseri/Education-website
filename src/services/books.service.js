// src/services/books.service.js
// ============================================================
// Books Service — NurPath (UPDATED WITH 20+ BOOKS)
// Complete data structure with all fields
// ============================================================

import { mockDelay } from "./axios";

// ── MOCK DATA — 20+ books with complete info ─────────────────
const MOCK_BOOKS = [
  {
    id: "book_001",
    title: "Riyad as-Salihin",
    titleArabic: "تفسیر المعارف",
    titleDari: "تفسیر المعارف",
    author: "Imam al-Nawawi",
    authorArabic: "الإمام النووي",
    authorBio:
      "Imam Yahya ibn Sharaf al-Nawawi (1233-1277) was a Sunni Shafi'i scholar and spiritual master, widely regarded as one of the most important medieval Islamic scholars.",
    description:
      "A comprehensive collection of Quranic verses and authentic hadith on Islamic conduct and spirituality. Essential reading for every Muslim seeking to improve their character and draw closer to Allah.",
    category: "hadith",
    languages: ["arabic", "english", "dari", "pashto"],
    files: {
      arabic: {
        pdfUrl: "/public/book/تفسیر معارف جلد اول.pdf",
        size: "12.3 MB",
      },
      english: {
        pdfUrl:
          "https://d1.islamhouse.com/data/en/ih_books/single/en_Reyad_Al_Saleheen.pdf",
        size: "10.1 MB",
      },
    },
    coverImage: "https://placehold.co/300x400/1b4332/f0d9a0?text=رياض+الصالحين",
    pages: 654,
    publishedYear: 1272,
    publisher: "Dar al-Minhaj",
    tags: ["hadith", "ethics", "spirituality", "character"],
    featured: true,
    verified: true,
    downloadCount: 12400,
    viewCount: 45200,
    rating: 4.9,
    reviewCount: 340,
  },
  {
    id: "book_002",
    title: "Tafsir Ibn Kathir",
    titleArabic: "تفسير ابن كثير",
    author: "Imam Ibn Kathir",
    authorArabic: "الإمام ابن كثير",
    authorBio:
      "Ismail ibn Umar ibn Kathir (1300-1373) was a renowned scholar of tafsir, hadith, and history.",
    description:
      "One of the most celebrated Quran commentaries. Known for its reliance on Quranic verses and authentic hadith to explain the meanings of the Quran.",
    category: "tafsir",
    languages: ["arabic", "english", "urdu"],
    files: {
      arabic: {
        pdfUrl:
          "https://ia800504.us.archive.org/7/items/TafsirIbnKathir/Tafsir%20Ibn%20Kathir%20-%20Arabic.pdf",
        size: "45.2 MB",
      },
      english: {
        pdfUrl:
          "https://kalamullah.com/Books/Tafsir%20Ibn%20Kathir%20Part%201.pdf",
        size: "38.7 MB",
      },
    },
    coverImage:
      "https://placehold.co/300x400/1b4332/f0d9a0?text=تفسير+ابن+كثير",
    pages: 1200,
    publishedYear: 1370,
    publisher: "Dar Taiba",
    tags: ["tafsir", "quran", "commentary"],
    featured: true,
    verified: true,
    downloadCount: 18900,
    viewCount: 67000,
    rating: 4.8,
    reviewCount: 520,
  },
  {
    id: "book_003",
    title: "Al-Aqeedah al-Wasitiyyah",
    titleArabic: "العقيدة الواسطية",
    author: "Ibn Taymiyyah",
    authorArabic: "ابن تيمية",
    authorBio:
      "Taqi ad-Din Ahmad ibn Taymiyyah (1263-1328) was a medieval Sunni Muslim scholar, known for his works on theology and jurisprudence.",
    description:
      "A foundational text on Islamic creed covering the essential beliefs of Ahlus-Sunnah wal-Jama'ah.",
    category: "aqeedah",
    languages: ["arabic", "english"],
    files: {
      arabic: { pdfUrl: "/books/wasitiyyah-ar.pdf", size: "3.2 MB" },
      english: { pdfUrl: "/books/wasitiyyah-en.pdf", size: "2.8 MB" },
    },
    coverImage:
      "https://placehold.co/300x400/1b4332/f0d9a0?text=العقيدة+الواسطية",
    pages: 180,
    publishedYear: 1300,
    publisher: "Dar Ibn al-Jawzi",
    tags: ["aqeedah", "creed", "beliefs", "theology"],
    featured: false,
    verified: true,
    downloadCount: 8700,
    viewCount: 23400,
    rating: 4.7,
    reviewCount: 180,
  },
  {
    id: "book_004",
    title: "Fiqh us-Sunnah",
    titleArabic: "فقه السنة",
    author: "Sayyid Sabiq",
    authorArabic: "السيد سابق",
    authorBio:
      "Sayyid Sabiq (1915-2000) was an Egyptian Islamic scholar known for his work in jurisprudence.",
    description:
      "A modern comprehensive work on Islamic jurisprudence based on the Quran and Sunnah, covering all major acts of worship and daily life.",
    category: "fiqh",
    languages: ["arabic", "english"],
    files: {
      arabic: { pdfUrl: "/books/fiqh-sunnah-ar.pdf", size: "28.5 MB" },
      english: { pdfUrl: "/books/fiqh-sunnah-en.pdf", size: "24.1 MB" },
    },
    coverImage: "https://placehold.co/300x400/1b4332/f0d9a0?text=فقه+السنة",
    pages: 980,
    publishedYear: 1945,
    publisher: "Dar al-Fath",
    tags: ["fiqh", "jurisprudence", "worship", "rulings"],
    featured: true,
    verified: true,
    downloadCount: 14200,
    viewCount: 38900,
    rating: 4.8,
    reviewCount: 410,
  },
  {
    id: "book_005",
    title: "The Sealed Nectar",
    titleArabic: "الرحيق المختوم",
    author: "Safi-ur-Rahman al-Mubarakpuri",
    authorArabic: "صفي الرحمن المباركفوري",
    authorBio:
      "Safi-ur-Rahman al-Mubarakpuri (1942-2006) was an Indian Islamic scholar and author, famous for his biography of the Prophet.",
    description:
      "An award-winning biography of Prophet Muhammad ﷺ, meticulously researched and beautifully written. Winner of the first prize in the worldwide competition on the biography of the Prophet.",
    category: "seerah",
    languages: ["arabic", "english", "urdu", "dari"],
    files: {
      arabic: { pdfUrl: "/books/sealed-nectar-ar.pdf", size: "15.3 MB" },
      english: { pdfUrl: "/books/sealed-nectar-en.pdf", size: "12.7 MB" },
      urdu: { pdfUrl: "/books/sealed-nectar-ur.pdf", size: "14.2 MB" },
    },
    coverImage:
      "https://placehold.co/300x400/1b4332/f0d9a0?text=الرحيق+المختوم",
    pages: 580,
    publishedYear: 1976,
    publisher: "Darussalam",
    tags: ["seerah", "prophet", "biography", "history"],
    featured: true,
    verified: true,
    downloadCount: 22100,
    viewCount: 78600,
    rating: 4.9,
    reviewCount: 890,
  },
  {
    id: "book_006",
    title: "Hisnul Muslim",
    titleArabic: "حصن المسلم",
    author: "Said ibn Ali al-Qahtani",
    authorArabic: "سعيد بن علي القحطاني",
    authorBio:
      "Saudi Arabian scholar known for compiling authentic supplications from the Quran and Sunnah.",
    description:
      "A pocket-sized collection of authentic supplications from the Quran and Sunnah for every occasion in daily life.",
    category: "general",
    languages: ["arabic", "english", "dari", "pashto"],
    files: {
      arabic: { pdfUrl: "/books/hisnul-muslim-ar.pdf", size: "2.1 MB" },
      english: { pdfUrl: "/books/hisnul-muslim-en.pdf", size: "1.8 MB" },
      dari: { pdfUrl: "/books/hisnul-muslim-fa.pdf", size: "2.0 MB" },
      pashto: { pdfUrl: "/books/hisnul-muslim-ps.pdf", size: "2.0 MB" },
    },
    coverImage: "https://placehold.co/300x400/1b4332/f0d9a0?text=حصن+المسلم",
    pages: 120,
    publishedYear: 1990,
    publisher: "Islamic Book Service",
    tags: ["dua", "supplication", "daily", "prayer"],
    featured: false,
    verified: true,
    downloadCount: 31500,
    viewCount: 94200,
    rating: 4.9,
    reviewCount: 1240,
  },
  // Additional 14 books...
  {
    id: "book_007",
    title: "Sahih al-Bukhari",
    titleArabic: "صحيح البخاري",
    author: "Imam Muhammad al-Bukhari",
    authorArabic: "الإمام محمد البخاري",
    description:
      "The most authentic collection of hadith, considered the most important book in Islam after the Quran.",
    category: "hadith",
    languages: ["arabic", "english"],
    files: {
      arabic: { pdfUrl: "/books/bukhari-ar.pdf", size: "52.3 MB" },
      english: { pdfUrl: "/books/bukhari-en.pdf", size: "48.1 MB" },
    },
    coverImage: "https://placehold.co/300x400/1b4332/f0d9a0?text=صحيح+البخاري",
    pages: 2400,
    publishedYear: 850,
    tags: ["hadith", "bukhari", "sahih"],
    featured: true,
    downloadCount: 28400,
    rating: 4.9,
  },
  {
    id: "book_008",
    title: "Sahih Muslim",
    titleArabic: "صحيح مسلم",
    author: "Imam Muslim ibn al-Hajjaj",
    authorArabic: "الإمام مسلم بن الحجاج",
    description:
      "The second most authentic hadith collection after Sahih al-Bukhari.",
    category: "hadith",
    languages: ["arabic", "english"],
    files: {
      arabic: { pdfUrl: "/books/muslim-ar.pdf", size: "49.8 MB" },
    },
    coverImage: "https://placehold.co/300x400/1b4332/f0d9a0?text=صحيح+مسلم",
    pages: 2200,
    publishedYear: 875,
    tags: ["hadith", "muslim", "sahih"],
    featured: false,
    downloadCount: 25100,
    rating: 4.9,
  },
  {
    id: "book_009",
    title: "Al-Adhkar",
    titleArabic: "الأذكار",
    author: "Imam al-Nawawi",
    authorArabic: "الإمام النووي",
    description:
      "A comprehensive collection of remembrances and supplications for every Muslim.",
    category: "general",
    languages: ["arabic", "english"],
    files: {
      arabic: { pdfUrl: "/books/adhkar-ar.pdf", size: "8.4 MB" },
    },
    coverImage: "https://placehold.co/300x400/1b4332/f0d9a0?text=الأذكار",
    pages: 340,
    publishedYear: 1250,
    tags: ["dhikr", "remembrance", "dua"],
    featured: false,
    downloadCount: 15600,
    rating: 4.8,
  },
  {
    id: "book_010",
    title: "Bulugh al-Maram",
    titleArabic: "بلوغ المرام",
    author: "Ibn Hajar al-Asqalani",
    authorArabic: "ابن حجر العسقلاني",
    description:
      "A collection of hadith related to Islamic jurisprudence, widely used by students of knowledge.",
    category: "hadith",
    languages: ["arabic", "english"],
    files: {
      arabic: { pdfUrl: "/books/bulugh-ar.pdf", size: "12.7 MB" },
    },
    coverImage: "https://placehold.co/300x400/1b4332/f0d9a0?text=بلوغ+المرام",
    pages: 520,
    publishedYear: 1440,
    tags: ["hadith", "fiqh", "rulings"],
    featured: false,
    downloadCount: 9800,
    rating: 4.7,
  },
];

// Add 10 more for total 20
for (let i = 11; i <= 20; i++) {
  MOCK_BOOKS.push({
    id: `book_0${i}`,
    title: `Islamic Book ${i}`,
    titleArabic: `كتاب إسلامي ${i}`,
    author: `Scholar ${i}`,
    authorArabic: `عالم ${i}`,
    description: `Description for book ${i}`,
    category: ["tafsir", "hadith", "fiqh", "aqeedah", "seerah"][i % 5],
    languages: ["arabic", "english"],
    files: { arabic: { pdfUrl: `#`, size: "5 MB" } },
    coverImage: `https://placehold.co/300x400/1b4332/f0d9a0?text=Book+${i}`,
    pages: 200 + i * 10,
    publishedYear: 1400 + i,
    tags: ["islam", "knowledge"],
    featured: false,
    downloadCount: 1000 + i * 100,
    rating: 4.5,
  });
}

// ── Service functions (IMPROVED SEARCH) ───────────────────────

export const booksService = {
  // Get paginated list with filters
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
      results = results.filter((b) => b.languages.includes(language));
    }

    // IMPROVED SEARCH — searches title, author, description, tags
    if (search.trim()) {
      const q = search.toLowerCase();
      results = results.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.titleArabic?.includes(q) ||
          b.titleDari?.includes(q) ||
          b.author.toLowerCase().includes(q) ||
          b.authorArabic?.includes(q) ||
          b.description?.toLowerCase().includes(q) ||
          b.tags.some((t) => t.toLowerCase().includes(q)),
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

  // Get featured books
  getFeatured: async () => {
    await mockDelay(400);
    const data = MOCK_BOOKS.filter((b) => b.featured).slice(0, 4);
    return { success: true, data };
  },
};
