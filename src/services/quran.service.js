// src/services/quran.service.js
// ============================================================
// Quran Service - Connects to PHP Backend
// Endpoint: /api/quran.php
//
// This file handles all API calls related to Quran
// ============================================================

import api from "./axios";

export const quranService = {
  /**
   * Get all surahs (metadata only, no ayat)
   *
   * Used by: QuranPage (surah browser)
   *
   * Returns all 114 surahs with:
   * - Name (English + Arabic)
   * - Number, ayat count, type (Meccan/Medinan), juz
   *
   * @param {Object} params - Query parameters
   * @param {string} params.search - Search surahs by name, number, or transliteration
   *
   * @returns {Promise} Response: { success, data: [...114 surahs] }
   *
   * @example
   * const result = await quranService.getSurahs();
   * // Returns all 114 surahs
   *
   * const result = await quranService.getSurahs({ search: "fatiha" });
   * // Returns Al-Fatiha
   */
  getSurahs: async ({ search } = {}) => {
    // Build query parameters
    const params = search ? { search } : {};

    // Make GET request to /api/quran.php
    // Example URL: /api/quran.php (all surahs)
    // OR: /api/quran.php?search=fatiha
    const response = await api.get("/quran.php", { params });

    return response.data;
  },

  /**
   * Get all ayat for a specific surah
   *
   * Used by: SurahDetailPage
   *
   * Returns:
   * - Surah metadata (name, number, type, etc.)
   * - All ayat with arabic, translation, transliteration, tafsir
   *
   * @param {number} surahNumber - Surah number (1-114)
   *
   * @returns {Promise} Response: { success, surah: {...}, data: [...ayat] }
   *
   * @example
   * const result = await quranService.getAyat(1);
   *
   * console.log(result.surah); // Al-Fatiha metadata
   * console.log(result.data); // All 7 ayat
   *
   * result.data.forEach(ayah => {
   *   console.log(ayah.number); // Ayah number
   *   console.log(ayah.arabic); // Arabic text
   *   console.log(ayah.translation); // English translation
   *   console.log(ayah.tafsir); // Explanation
   * });
   */
  getAyat: async (surahNumber) => {
    // Make GET request with surah parameter
    // Example URL: /api/quran.php?surah=1
    const response = await api.get("/quran.php", {
      params: { surah: surahNumber },
    });

    // Check if surah was found
    if (!response.data.success) {
      throw new Error("Surah not found");
    }

    return response.data;
  },

  /**
   * Get single ayah with detailed tafsir
   *
   * Used by: Ayah detail modal/page (if you add one)
   *
   * @param {number} surahNumber - Surah number (1-114)
   * @param {number} ayahNumber - Ayah number within the surah
   *
   * @returns {Promise} Response: { success, surah: {...}, data: {...single ayah} }
   *
   * @example
   * const result = await quranService.getAyahDetail(2, 255);
   * // Returns Ayat al-Kursi
   *
   * console.log(result.data.arabic); // Arabic text
   * console.log(result.data.translation); // English translation
   * console.log(result.data.tafsir); // Full tafsir explanation
   */
  getAyahDetail: async (surahNumber, ayahNumber) => {
    // Make GET request with surah + ayah parameters
    // Example URL: /api/quran.php?surah=2&ayah=255
    const response = await api.get("/quran.php", {
      params: {
        surah: surahNumber,
        ayah: ayahNumber,
      },
    });

    // Check if ayah was found
    if (!response.data.success || !response.data.data) {
      throw new Error("Ayah not found");
    }

    return response.data;
  },

  /**
   * Get featured ayat (Ayat al-Kursi)
   *
   * Used by: HomePage (featured Quran verse section)
   *
   * @returns {Promise} Response: { success, data: {...Ayat al-Kursi} }
   *
   * @example
   * const result = await quranService.getFeaturedAyat();
   * // Returns Surah 2, Ayah 255 (Ayat al-Kursi)
   */
  getFeaturedAyat: async () => {
    // Make GET request with featured=1 parameter
    // Example URL: /api/quran.php?featured=1
    const response = await api.get("/quran.php", {
      params: { featured: 1 },
    });

    return response.data;
  },
};
