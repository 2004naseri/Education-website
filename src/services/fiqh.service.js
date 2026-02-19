// src/services/fiqh.service.js
// ============================================================
// Fiqh Service — NurPath (Mock Data)
// ============================================================

import { mockDelay } from "./axios";

const MOCK_FIQH = [
  {
    id: "1",
    title: "The Conditions of Valid Wudu",
    titleArabic: "شروط صحة الوضوء",
    category: "taharah",
    madhab: "all",
    excerpt:
      "Wudu (ablution) is a prerequisite for salah. It has specific conditions, obligatory acts, and recommended practices that every Muslim should know.",
    content: "Full fiqh content here...",
    tags: ["wudu", "taharah", "salah"],
    difficulty: "beginner",
    references: ["Sahih al-Bukhari 135", "Fiqh us-Sunnah Vol.1"],
  },
  {
    id: "2",
    title: "Zakat on Gold and Silver",
    titleArabic: "زكاة الذهب والفضة",
    category: "zakah",
    madhab: "all",
    excerpt:
      "Zakat becomes obligatory on gold and silver when they reach the nisab (minimum threshold) and a full lunar year has passed.",
    content: "Full fiqh content here...",
    tags: ["zakah", "gold", "nisab"],
    difficulty: "intermediate",
    references: ["Quran 9:34", "Sunan Abu Dawud 1558"],
  },
  {
    id: "3",
    title: "Rules of Prayer for the Traveler",
    titleArabic: "أحكام صلاة المسافر",
    category: "salah",
    madhab: "all",
    excerpt:
      "A traveler is permitted to shorten four-unit prayers to two units and, according to some schools, combine certain prayers.",
    content: "Full fiqh content here...",
    tags: ["salah", "travel", "qasr", "jam"],
    difficulty: "intermediate",
    references: ["Quran 4:101", "Sahih Muslim 686"],
  },
  {
    id: "4",
    title: "Marriage Contract: Conditions and Pillars",
    titleArabic: "عقد الزواج: شروطه وأركانه",
    category: "nikah",
    madhab: "all",
    excerpt:
      "For a nikah to be valid it requires an offer (ijab), acceptance (qabul), a wali (guardian), two witnesses, and a mahr (dowry).",
    content: "Full fiqh content here...",
    tags: ["nikah", "marriage", "contract"],
    difficulty: "intermediate",
    references: ["Quran 4:4", "Sunan al-Tirmidhi 1101"],
  },
  {
    id: "5",
    title: "Fasting: What Nullifies and What Does Not",
    titleArabic: "الصيام: ما يفسده وما لا يفسده",
    category: "sawm",
    madhab: "all",
    excerpt:
      "Understanding what breaks the fast is essential for every fasting Muslim. Some acts break the fast and require both making up the day and expiation.",
    content: "Full fiqh content here...",
    tags: ["sawm", "fasting", "ramadan"],
    difficulty: "beginner",
    references: ["Quran 2:187", "Sahih al-Bukhari 1933"],
  },
];

export const fiqhService = {
  getAll: async ({
    page = 1,
    limit = 12,
    category = "all",
    madhab = "all",
    search = "",
  } = {}) => {
    await mockDelay(400);

    let results = [...MOCK_FIQH];

    if (category && category !== "all") {
      results = results.filter((f) => f.category === category);
    }

    if (madhab && madhab !== "all") {
      results = results.filter(
        (f) => f.madhab === madhab || f.madhab === "all",
      );
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      results = results.filter(
        (f) =>
          f.title.toLowerCase().includes(q) ||
          f.titleArabic.includes(q) ||
          f.excerpt.toLowerCase().includes(q) ||
          f.tags.some((t) => t.includes(q)),
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

  getById: async (id) => {
    await mockDelay(300);
    const topic = MOCK_FIQH.find((f) => f.id === id);
    if (!topic) throw new Error("Fiqh topic not found");
    return { success: true, data: topic };
  },
};
