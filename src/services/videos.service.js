// src/services/videos.service.js
// ============================================================
// Videos Service — UPDATED with detail method & sample data
// ============================================================

import { mockDelay } from "./axios";

const MOCK_VIDEOS = [
  {
    id: "video_001",
    title: "The Life of Prophet Muhammad ﷺ - Complete Seerah",
    titleArabic: "سيرة النبي محمد صلى الله عليه وسلم",
    description: `Join us for a comprehensive journey through the life of Prophet Muhammad ﷺ, from his birth in Mecca to his final days in Medina.

This series covers:
- Early life and childhood
- The first revelation in Cave Hira
- The Meccan period and persecution
- The Hijrah to Medina
- Major battles and treaties
- The conquest of Mecca
- Final sermon and legacy

Perfect for those wanting to understand the Prophet's life in depth.`,
    instructor: "Sheikh Omar Suleiman",
    instructorBio: "Islamic scholar and president of the Yaqeen Institute",
    category: "lecture",
    thumbnail:
      "https://images.unsplash.com/photo-1591604466107-ec97de05596a?w=800&h=450&fit=crop",
    videoUrl: "https://www.youtube.com/embed/XLVgg4F1ONM", // Example embed
    duration: "45:32",
    views: 125000,
    publishedAt: "2024-01-15",
    chapters: [
      { timestamp: "0:00", title: "Introduction" },
      { timestamp: "3:15", title: "Birth and Early Life" },
      { timestamp: "12:30", title: "The First Revelation" },
      { timestamp: "25:45", title: "Persecution in Mecca" },
      { timestamp: "38:20", title: "The Hijrah" },
    ],
    tags: ["seerah", "prophet", "biography", "history", "islamic-history"],
  },
  {
    id: "video_002",
    title: "Understanding Tawheed - The Oneness of Allah",
    titleArabic: "فهم التوحيد - وحدانية الله",
    description: `A comprehensive explanation of Tawheed, the fundamental concept in Islam.

Topics covered:
- Definition and importance of Tawheed
- The three categories: Tawheed ar-Rububiyyah, al-Uluhiyyah, al-Asma was-Sifat
- Common misconceptions
- Practical application in daily life

Essential knowledge for every Muslim.`,
    instructor: "Dr. Yasir Qadhi",
    instructorBio: "Dean of Academic Affairs at Al-Maghrib Institute",
    category: "lecture",
    thumbnail:
      "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=800&h=450&fit=crop",
    videoUrl: "/public/video/video.mp4", // No embed = shows thumbnail with play button
    duration: "1:12:45",
    views: 89000,
    publishedAt: "2024-02-20",
    chapters: [
      { timestamp: "0:00", title: "What is Tawheed?" },
      { timestamp: "8:30", title: "The Three Categories" },
      { timestamp: "28:15", title: "Tawheed ar-Rububiyyah" },
      { timestamp: "45:00", title: "Tawheed al-Uluhiyyah" },
      { timestamp: "58:30", title: "Tawheed al-Asma was-Sifat" },
    ],
    tags: ["tawheed", "aqeedah", "theology", "fundamentals"],
  },
  {
    id: "video_003",
    title: "Beautiful Quran Recitation - Surah Ar-Rahman",
    titleArabic: "تلاوة جميلة - سورة الرحمن",
    description: `Experience the beauty of Surah Ar-Rahman recited with perfect tajweed.

This surah is known as "the beauty of the Quran" and reminds us of Allah's countless blessings.

Reciter: Sheikh Mishary Rashid Alafasy`,
    instructor: "Sheikh Mishary Rashid Alafasy",
    instructorBio: "Renowned Quran reciter from Kuwait",
    category: "quran",
    thumbnail:
      "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=800&h=450&fit=crop",
    videoUrl: "",
    duration: "18:23",
    views: 245000,
    publishedAt: "2023-12-10",
    tags: ["quran", "recitation", "surah-rahman", "tajweed"],
  },
  {
    id: "video_004",
    title: "How to Pray - Step by Step Guide",
    titleArabic: "كيفية الصلاة - دليل خطوة بخطوة",
    description: `Learn how to perform Salah correctly with this detailed step-by-step guide.

Covers:
- Wudu (ablution)
- Conditions of prayer
- Fard, Sunnah, and Nafl prayers
- Common mistakes to avoid
- Tips for concentration

Perfect for new Muslims or anyone wanting to perfect their prayer.`,
    instructor: "Ustadh Nouman Ali Khan",
    instructorBio: "Founder and CEO of Bayyinah Institute",
    category: "short",
    thumbnail:
      "https://images.unsplash.com/photo-1591604466107-ec97de05596a?w=800&h=450&fit=crop",
    videoUrl: "",
    duration: "12:15",
    views: 178000,
    publishedAt: "2024-03-05",
    tags: ["prayer", "salah", "worship", "how-to", "tutorial"],
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
          v.titleArabic?.includes(q) ||
          v.description.toLowerCase().includes(q) ||
          v.instructor.toLowerCase().includes(q) ||
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
    await mockDelay(400);
    const data = MOCK_VIDEOS.slice(0, 3);
    return { success: true, data };
  },
};
