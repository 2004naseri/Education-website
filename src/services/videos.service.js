// src/services/videos.service.js
// ============================================================
// Videos Service — NurPath (Mock Data)
// ============================================================

import { mockDelay } from "./axios";

const MOCK_VIDEOS = [
  {
    id: "1",
    title: "Understanding Surah Al-Fatiha — Deep Tafsir",
    titleArabic: "فهم سورة الفاتحة — تفسير عميق",
    description:
      "A profound explanation of the opening chapter of the Quran, covering its meanings, virtues, and spiritual significance.",
    thumbnail:
      "https://placehold.co/640x360/1b4332/f0d9a0?text=Surah+Al-Fatiha",
    videoUrl: "https://www.youtube.com/embed/example1",
    duration: "42:15",
    category: "quran",
    instructor: "Sheikh Abdullah al-Farsi",
    views: 8400,
    publishedAt: "2024-10-05",
    featured: true,
    tags: ["tafsir", "quran", "fatiha"],
  },
  {
    id: "2",
    title: "The Life of Prophet Ibrahim (AS)",
    titleArabic: "حياة النبي إبراهيم عليه السلام",
    description:
      "An inspiring series on the life of Prophet Ibrahim, the Friend of Allah, and the lessons we can draw for our lives today.",
    thumbnail:
      "https://placehold.co/640x360/1b4332/f0d9a0?text=Prophet+Ibrahim",
    videoUrl: "https://www.youtube.com/embed/example2",
    duration: "58:30",
    category: "series",
    instructor: "Dr. Ahmad Karimi",
    views: 6200,
    publishedAt: "2024-10-18",
    featured: true,
    tags: ["seerah", "prophets", "ibrahim"],
  },
  {
    id: "3",
    title: "How to Perfect Your Salah",
    titleArabic: "كيف تتقن صلاتك",
    description:
      "Step-by-step guidance on performing salah correctly — from wudu to tashahhud — based on the Sunnah of the Prophet ﷺ.",
    thumbnail: "https://placehold.co/640x360/1b4332/f0d9a0?text=Perfect+Salah",
    videoUrl: "https://www.youtube.com/embed/example3",
    duration: "35:00",
    category: "lecture",
    instructor: "Ustadh Ibrahim Noori",
    views: 11300,
    publishedAt: "2024-09-22",
    featured: true,
    tags: ["salah", "prayer", "fiqh"],
  },
  {
    id: "4",
    title: "10 Lessons from Surah Al-Kahf",
    titleArabic: "10 دروس من سورة الكهف",
    description:
      "Every Friday Muslims are encouraged to recite Surah Al-Kahf. Discover the 10 powerful lessons this chapter holds for our times.",
    thumbnail: "https://placehold.co/640x360/1b4332/f0d9a0?text=Surah+Al-Kahf",
    videoUrl: "https://www.youtube.com/embed/example4",
    duration: "28:45",
    category: "short",
    instructor: "Sheikh Abdullah al-Farsi",
    views: 9700,
    publishedAt: "2024-11-01",
    featured: false,
    tags: ["quran", "kahf", "friday"],
  },
  {
    id: "5",
    title: "Ramadan: A Complete Spiritual Guide",
    titleArabic: "رمضان: دليل روحي كامل",
    description:
      "Prepare for the blessed month with this comprehensive guide covering fasting rules, night prayers, Quran, charity, and spiritual goals.",
    thumbnail: "https://placehold.co/640x360/1b4332/f0d9a0?text=Ramadan+Guide",
    videoUrl: "https://www.youtube.com/embed/example5",
    duration: "1:12:00",
    category: "series",
    instructor: "Dr. Fatima Rahimi",
    views: 14500,
    publishedAt: "2024-12-01",
    featured: false,
    tags: ["ramadan", "fasting", "spirituality"],
  },
];

export const videosService = {
  getAll: async ({
    page = 1,
    limit = 9,
    category = "all",
    search = "",
  } = {}) => {
    await mockDelay(450);

    let results = [...MOCK_VIDEOS];

    if (category && category !== "all") {
      results = results.filter((v) => v.category === category);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      results = results.filter(
        (v) =>
          v.title.toLowerCase().includes(q) ||
          v.description.toLowerCase().includes(q) ||
          v.tags.some((t) => t.includes(q)),
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
    const video = MOCK_VIDEOS.find((v) => v.id === id);
    if (!video) throw new Error("Video not found");
    return { success: true, data: video };
  },

  getFeatured: async () => {
    await mockDelay(350);
    const data = MOCK_VIDEOS.filter((v) => v.featured).slice(0, 3);
    return { success: true, data };
  },
};
