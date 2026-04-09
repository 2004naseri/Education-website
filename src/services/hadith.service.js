// src/services/hadith.service.js
// ============================================================
// Hadith Service - Connects to PHP Backend
// Endpoint: /api/hadith.php
//
// This file handles all API calls related to hadith
// ============================================================

import api from "./axios";

export const hadithService = {
  /**
   * Get all hadith with optional filters
   *
   * Used by: HadithPage (list view)
   *
   * @param {Object} params - Query parameters
   * @param {number} params.page - Page number (default: 1)
   * @param {number} params.limit - Results per page (default: 10)
   * @param {string} params.collection - Filter by collection (bukhari, muslim, tirmidhi, etc.)
   * @param {string} params.grade - Filter by grade (sahih, hasan, daif)
   * @param {string} params.topic - Filter by topic (faith, salah, fasting, zakah, etc.)
   * @param {string} params.search - Search query (translation, arabic, narrator, explanation)
   *
   * @returns {Promise} Response: { success, data: [...hadith], pagination: {...} }
   *
   * @example
   * const result = await hadithService.getAll({
   *   page: 1,
   *   collection: "bukhari",
   *   grade: "sahih",
   *   topic: "faith"
   * });
   */
  getAll: async ({
    page = 1,
    limit = 10,
    collection,
    grade,
    topic,
    search,
  } = {}) => {
    // Build query parameters
    const params = {
      page,
      limit,
      ...(collection && collection !== "all" && { collection }),
      ...(grade && grade !== "all" && { grade }),
      ...(topic && topic !== "all" && { topic }),
      ...(search && { search }),
    };

    // Make GET request to /api/hadith.php
    // Example URL: /api/hadith.php?page=1&collection=bukhari&grade=sahih
    const response = await api.get("/hadith.php", { params });

    return response.data;
  },

  /**
   * Get single hadith by ID
   *
   * Used by: HadithDetailPage
   *
   * @param {string|number} id - Hadith ID (accepts "hadith_001" or just "1")
   *
   * @returns {Promise} Response: { success, data: {...hadith with full details} }
   *
   * @example
   * const result = await hadithService.getById("hadith_001");
   * // OR
   * const result = await hadithService.getById(1);
   *
   * console.log(result.data.arabic); // Arabic text
   * console.log(result.data.translation); // English translation
   * console.log(result.data.explanation); // Detailed explanation
   */
  getById: async (id) => {
    // Make GET request with id parameter
    // Example URL: /api/hadith.php?id=hadith_001
    const response = await api.get("/hadith.php", {
      params: { id },
    });

    // Check if hadith was found
    if (!response.data.success || !response.data.data) {
      throw new Error("Hadith not found");
    }

    return response.data;
  },

  /**
   * Get featured hadith
   *
   * Used by: HomePage (daily hadith section)
   *
   * @returns {Promise} Response: { success, data: [...top 3 sahih hadith] }
   *
   * @example
   * const result = await hadithService.getFeatured();
   * // Returns the most important sahih hadith for homepage
   */
  getFeatured: async () => {
    // Make GET request with featured=1 parameter
    // Example URL: /api/hadith.php?featured=1
    const response = await api.get("/hadith.php", {
      params: { featured: 1 },
    });

    return response.data;
  },
};
