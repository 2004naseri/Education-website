// src/services/hadith.service.js
// ============================================================
// Hadith Service — NurPath (Mock Data)
// Swap mockDelay + return with apiClient.get() for real API
// ============================================================

import { mockDelay } from "./axios";

const MOCK_HADITH = [
  {
    id: "1",
    number: 1,
    arabic:
      "إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى",
    translation:
      "Actions are judged by intentions, and every person will get what they intended.",
    narrator: "Umar ibn al-Khattab (رضي الله عنه)",
    collection: "bukhari",
    book: "Book of Revelation",
    chapter: "How the Divine Revelation Started",
    grade: "sahih",
    explanation:
      "This is one of the most important hadith in Islam, forming the foundation for all actions in worship and daily life.",
    tags: ["intention", "niyyah", "actions", "fundamentals"],
  },
  {
    id: "2",
    number: 2,
    arabic: "الْمُسْلِمُ مَنْ سَلِمَ الْمُسْلِمُونَ مِنْ لِسَانِهِ وَيَدِهِ",
    translation:
      "A Muslim is the one from whose tongue and hand other Muslims are safe.",
    narrator: "Abdullah ibn Amr (رضي الله عنه)",
    collection: "bukhari",
    book: "Book of Faith",
    chapter: "The Signs of Faith",
    grade: "sahih",
    explanation:
      "This hadith defines a true Muslim as one who does not harm others with words or actions.",
    tags: ["character", "Muslim", "harm", "speech"],
  },
  {
    id: "3",
    number: 6018,
    arabic:
      "لاَ تَحَاسَدُوا، وَلاَ تَنَاجَشُوا، وَلاَ تَبَاغَضُوا، وَلاَ تَدَابَرُوا",
    translation:
      "Do not envy one another, do not inflate prices for one another, do not hate one another, and do not turn away from one another.",
    narrator: "Abu Hurairah (رضي الله عنه)",
    collection: "muslim",
    book: "Book of Virtue",
    chapter: "The Prohibition of Envy and Hatred",
    grade: "sahih",
    explanation:
      "This hadith outlines key social ethics that preserve brotherhood and community bonds.",
    tags: ["envy", "brotherhood", "character", "society"],
  },
  {
    id: "4",
    number: 3597,
    arabic:
      "مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ",
    translation:
      "Whoever believes in Allah and the Last Day, let him say good or remain silent.",
    narrator: "Abu Hurairah (رضي الله عنه)",
    collection: "bukhari",
    book: "Book of Good Manners",
    chapter: "Honoring the Guest",
    grade: "sahih",
    explanation:
      "A powerful reminder about the weight of our words — to speak good or stay silent.",
    tags: ["speech", "silence", "faith", "character"],
  },
  {
    id: "5",
    number: 2318,
    arabic: "طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ",
    translation: "Seeking knowledge is an obligation upon every Muslim.",
    narrator: "Anas ibn Malik (رضي الله عنه)",
    collection: "ibn-majah",
    book: "Book of the Sunnah",
    chapter: "Virtue of Scholars",
    grade: "hasan",
    explanation:
      "This hadith establishes that acquiring Islamic knowledge is a religious duty for every Muslim, not just scholars.",
    tags: ["knowledge", "education", "obligation", "learning"],
  },
  {
    id: "6",
    number: 13,
    arabic:
      "لاَ يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ",
    translation:
      "None of you truly believes until he loves for his brother what he loves for himself.",
    narrator: "Anas ibn Malik (رضي الله عنه)",
    collection: "bukhari",
    book: "Book of Faith",
    chapter:
      "From Faith is to Love for Your Brother What You Love for Yourself",
    grade: "sahih",
    explanation:
      "This golden rule of Islam calls for empathy, selflessness and genuine concern for others.",
    tags: ["faith", "brotherhood", "love", "empathy"],
  },
];

export const hadithService = {
  getAll: async ({
    page = 1,
    limit = 10,
    collection = "all",
    grade = "all",
    search = "",
  } = {}) => {
    await mockDelay(450);

    let results = [...MOCK_HADITH];

    if (collection && collection !== "all") {
      results = results.filter((h) => h.collection === collection);
    }

    if (grade && grade !== "all") {
      results = results.filter((h) => h.grade === grade);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      results = results.filter(
        (h) =>
          h.translation.toLowerCase().includes(q) ||
          h.arabic.includes(q) ||
          h.narrator.toLowerCase().includes(q) ||
          h.tags.some((t) => t.includes(q)),
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
    const hadith = MOCK_HADITH.find((h) => h.id === id);
    if (!hadith) throw new Error("Hadith not found");
    return { success: true, data: hadith };
  },

  // Get a few hadith for Home page highlight
  getFeatured: async () => {
    await mockDelay(350);
    const data = MOCK_HADITH.filter((h) => h.grade === "sahih").slice(0, 3);
    return { success: true, data };
  },
};
