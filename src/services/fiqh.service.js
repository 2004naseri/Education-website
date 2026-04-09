// src/services/fiqh.service.js
// ============================================================
// Fiqh Service - Connects to PHP Backend
// Endpoint: /api/fiqh.php
//
// This file handles all API calls related to fiqh topics
// ============================================================

import api from "./axios";

export const fiqhService = {
  /**
   * Get all fiqh topics with optional filters
   *
   * Used by: FiqhPage (list view)
   *
   * @param {Object} params - Query parameters
   * @param {number} params.page - Page number (default: 1)
   * @param {number} params.limit - Results per page (default: 12)
   * @param {string} params.category - Filter by category (taharah, salah, zakah, hajj, etc.)
   * @param {string} params.madhab - Filter by madhab (hanafi, maliki, shafi, hanbali, all)
   * @param {string} params.difficulty - Filter by level (beginner, intermediate, advanced)
   * @param {string} params.search - Search query (title, excerpt, tags)
   *
   * @returns {Promise} Response: { success, data: [...topics], pagination: {...} }
   *
   * @example
   * const result = await fiqhService.getAll({
   *   page: 1,
   *   category: "salah",
   *   madhab: "hanafi",
   *   difficulty: "beginner"
   * });
   */
  getAll: async ({
    page = 1,
    limit = 12,
    category,
    madhab,
    difficulty,
    search,
  } = {}) => {
    // Build query parameters
    const params = {
      page,
      limit,
      ...(category && category !== "all" && { category }),
      ...(madhab && madhab !== "all" && { madhab }),
      ...(difficulty && difficulty !== "all" && { difficulty }),
      ...(search && { search }),
    };

    // Make GET request to /api/fiqh.php
    // Example URL: /api/fiqh.php?page=1&category=salah&madhab=hanafi
    const response = await api.get("/fiqh.php", { params });

    return response.data;
  },

  /**
   * Get single fiqh topic by slug
   *
   * Used by: FiqhDetailPage
   *
   * Returns complete topic with:
   * - Full markdown content
   * - Evidence (Quran verses + Hadith)
   * - Views from all 4 madhabs
   * - References (scholarly books)
   *
   * @param {string} slug - Topic slug (e.g., "wudu-conditions-and-nullifiers")
   *
   * @returns {Promise} Response: { success, data: {...topic with content, evidence, madhab views} }
   *
   * @example
   * const result = await fiqhService.getBySlug("wudu-conditions-and-nullifiers");
   *
   * console.log(result.data.content); // Full markdown content
   * console.log(result.data.evidence); // Array of Quran/Hadith evidence
   * console.log(result.data.madhabViews); // All 4 madhab opinions
   * console.log(result.data.references); // Scholarly sources
   */
  getBySlug: async (slug) => {
    // Make GET request with slug parameter
    // Example URL: /api/fiqh.php?slug=wudu-conditions-and-nullifiers
    const response = await api.get("/fiqh.php", {
      params: { slug },
    });

    // Check if topic was found
    if (!response.data.success || !response.data.data) {
      throw new Error("Fiqh topic not found");
    }

    return response.data;
  },
};
