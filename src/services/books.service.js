// src/services/books.service.js
// ============================================================
// Books Service - Connects to PHP Backend
// Endpoint: /api/books.php
//
// This file handles all API calls related to books
// ============================================================

import api from "./axios";

export const booksService = {
  /**
   * Get all books with optional filters
   *
   * Used by: BooksPage (list view)
   *
   * @param {Object} params - Query parameters
   * @param {number} params.page - Page number (default: 1)
   * @param {number} params.limit - Results per page (default: 12)
   * @param {string} params.category - Filter by category (hadith, fiqh, aqeedah, etc.)
   * @param {string} params.language - Filter by language (arabic, english, dari, pashto)
   * @param {string} params.search - Search query (title, author, description, tags)
   *
   * @returns {Promise} Response: { success, data: [...books], pagination: {...} }
   *
   * @example
   * const result = await booksService.getAll({
   *   page: 1,
   *   category: "hadith",
   *   language: "english"
   * });
   */
  getAll: async ({ page = 1, limit = 12, category, language, search } = {}) => {
    // Build query parameters object
    // Only include filters that are actually set (not "all" or empty)
    const params = {
      page,
      limit,
      ...(category && category !== "all" && { category }),
      ...(language && language !== "all" && { language }),
      ...(search && { search }),
    };

    // Make GET request to /api/books.php with parameters
    // Example URL: /api/books.php?page=1&limit=12&category=hadith
    const response = await api.get("/books.php", { params });

    // Return the full response from PHP
    // PHP returns: { success: true, data: [...], pagination: {...} }
    return response.data;
  },

  /**
   * Get single book by ID or slug
   *
   * Used by: BookDetailPage, BookReaderPage
   *
   * @param {string} id - Book ID (e.g., "book_001" or slug like "riyad-as-salihin")
   *
   * @returns {Promise} Response: { success, data: {...book with all details} }
   *
   * @example
   * const result = await booksService.getById("book_001");
   * console.log(result.data.title); // Book title
   * console.log(result.data.files.arabic.pdfUrl); // PDF download link
   */
  getById: async (id) => {
    // Make GET request with id parameter
    // Example URL: /api/books.php?id=book_001
    const response = await api.get("/books.php", {
      params: { id },
    });

    // Check if book was found
    if (!response.data.success || !response.data.data) {
      throw new Error("Book not found");
    }

    return response.data;
  },

  /**
   * Get featured books
   *
   * Used by: HomePage (featured books section)
   *
   * @returns {Promise} Response: { success, data: [...featured books] }
   *
   * @example
   * const result = await booksService.getFeatured();
   * // Returns books where featured = true
   */
  getFeatured: async () => {
    // Make GET request with featured=1 parameter
    // Example URL: /api/books.php?featured=1
    const response = await api.get("/books.php", {
      params: { featured: 1 },
    });

    return response.data;
  },
};
