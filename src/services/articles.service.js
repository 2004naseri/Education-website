// src/services/articles.service.js
// ============================================================
// Articles Service - Connects to PHP Backend
// Endpoint: /api/articles.php
// ============================================================

import api from "./axios";

export const articlesService = {
  /**
   * Get all articles with optional filters
   *
   * @param {Object} params - Query parameters
   * @param {number} params.page - Page number (default: 1)
   * @param {number} params.limit - Results per page (default: 9)
   * @param {string} params.category - Filter by category
   * @param {string} params.search - Search query
   *
   * @returns {Promise} { success, data: [...], pagination: {...} }
   *
   * @example
   * const result = await articlesService.getAll({
   *   page: 1,
   *   category: "knowledge",
   *   search: "fasting"
   * });
   */
  getAll: async ({ page = 1, limit = 9, category, search } = {}) => {
    const params = {
      page,
      limit,
      ...(category && category !== "all" && { category }),
      ...(search && { search }),
    };

    const response = await api.get("/articles.php", { params });
    return response.data;
  },

  /**
   * Get single article by slug
   *
   * @param {string} slug - Article slug
   * @returns {Promise} { success, data: { ...article, content } }
   *
   * @example
   * const result = await articlesService.getBySlug("importance-of-seeking-knowledge");
   * console.log(result.data.content); // Full markdown content
   */
  getBySlug: async (slug) => {
    const response = await api.get("/articles.php", {
      params: { slug },
    });

    if (!response.data.success || !response.data.data) {
      throw new Error("Article not found");
    }

    return response.data;
  },

  /**
   * Get featured articles
   *
   * @returns {Promise} { success, data: [...] }
   *
   * @example
   * const result = await articlesService.getFeatured();
   * // Returns top featured articles
   */
  getFeatured: async () => {
    const response = await api.get("/articles.php", {
      params: { featured: 1 },
    });
    return response.data;
  },
};
