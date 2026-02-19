// src/services/quran.service.js
// ============================================================
// Quran Service — NurPath (Mock Data)
// Surah list comes from src/data/quranMeta.js (static)
// Ayat data is mocked here — swap for real API later
// ============================================================

import { mockDelay } from "./axios";
import { SURAHS } from "../data/quranMeta";

// ── Mock Ayat (sample from Al-Fatiha + Al-Baqarah) ───────────
const MOCK_AYAT = {
  1: [
    {
      number: 1,
      arabic: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ",
      translation:
        "In the name of Allah, the Most Gracious, the Most Merciful.",
    },
    {
      number: 2,
      arabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
      translation: "All praise is due to Allah, Lord of all the worlds.",
    },
    {
      number: 3,
      arabic: "الرَّحْمَنِ الرَّحِيمِ",
      translation: "The Most Gracious, the Most Merciful.",
    },
    {
      number: 4,
      arabic: "مَالِكِ يَوْمِ الدِّينِ",
      translation: "Master of the Day of Judgment.",
    },
    {
      number: 5,
      arabic: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
      translation: "It is You we worship and You we ask for help.",
    },
    {
      number: 6,
      arabic: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
      translation: "Guide us to the straight path.",
    },
    {
      number: 7,
      arabic:
        "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ",
      translation:
        "The path of those upon whom You have bestowed favor, not of those who have evoked anger or of those who are astray.",
    },
  ],
  2: [
    { number: 1, arabic: "الم", translation: "Alif, Lam, Meem." },
    {
      number: 2,
      arabic: "ذَلِكَ الْكِتَابُ لَا رَيْبَ فِيهِ هُدًى لِّلْمُتَّقِينَ",
      translation:
        "This is the Book about which there is no doubt, a guidance for those conscious of Allah.",
    },
    {
      number: 255,
      arabic:
        "اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ",
      translation:
        "Allah — there is no deity except Him, the Ever-Living, the Sustainer of existence. Neither drowsiness overtakes Him nor sleep.",
    },
  ],
};

// ── Featured ayat for Home page ───────────────────────────────
const FEATURED_AYAT = [
  {
    surahNumber: 2,
    surahName: "Al-Baqarah",
    surahNameAr: "البقرة",
    ayatNumber: 255,
    arabic:
      "اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ",
    translation:
      "Allah — there is no deity except Him, the Ever-Living, the Sustainer of existence. Neither drowsiness overtakes Him nor sleep.",
    reference: "Ayat al-Kursi — 2:255",
  },
  {
    surahNumber: 94,
    surahName: "Ash-Sharh",
    surahNameAr: "الشرح",
    ayatNumber: 5,
    arabic: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا",
    translation: "For indeed, with hardship will be ease.",
    reference: "94:5",
  },
  {
    surahNumber: 3,
    surahName: "Ali 'Imran",
    surahNameAr: "آل عمران",
    ayatNumber: 159,
    arabic: "فَبِمَا رَحْمَةٍ مِّنَ اللَّهِ لِنتَ لَهُمْ",
    translation: "So by mercy from Allah, you were lenient with them.",
    reference: "3:159",
  },
];

export const quranService = {
  // Get all surahs (from static data — no delay needed)
  getSurahs: async ({ search = "" } = {}) => {
    await mockDelay(200);
    let results = [...SURAHS];
    if (search.trim()) {
      const q = search.toLowerCase();
      results = results.filter(
        (s) =>
          s.nameEn.toLowerCase().includes(q) ||
          s.nameAr.includes(q) ||
          s.transliteration.toLowerCase().includes(q) ||
          String(s.number).includes(q),
      );
    }
    return { success: true, data: results };
  },

  // Get ayat for a specific surah
  getAyat: async (surahNumber) => {
    await mockDelay(400);
    const ayat = MOCK_AYAT[surahNumber] || [];
    const surah = SURAHS.find((s) => s.number === surahNumber);
    return { success: true, data: ayat, surah };
  },

  // Get featured ayat for Home page
  getFeaturedAyat: async () => {
    await mockDelay(300);
    return { success: true, data: FEATURED_AYAT };
  },
};
