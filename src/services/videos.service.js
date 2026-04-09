// src/services/videos.service.js
// ============================================================
// Videos Service - Connects to PHP Backend
// Endpoint: /api/videos.php
//
// This file handles all API calls related to videos
// ============================================================

import api from "./axios";

export const videosService = {
  /**
   * Get all videos with optional filters
   *
   * Used by: VideosPage (list view)
   *
   * @param {Object} params - Query parameters
   * @param {number} params.page - Page number (default: 1)
   * @param {number} params.limit - Results per page (default: 9, max: 50)
   * @param {string} params.category - Filter by category (seerah, aqeedah, quran, fiqh, etc.)
   * @param {string} params.search - Search query (title, description, instructor, tags)
   *
   * @returns {Promise} Response: { success, data: [...videos], pagination: {...} }
   *
   * @example
   * const result = await videosService.getAll({
   *   page: 1,
   *   category: "seerah",
   *   search: "prophet"
   * });
   */
  getAll: async ({ page = 1, limit = 9, category, search } = {}) => {
    // Build query parameters
    const params = {
      page,
      limit,
      ...(category && category !== "all" && { category }),
      ...(search && { search }),
    };

    // Make GET request to /api/videos.php
    // Example URL: /api/videos.php?page=1&limit=9&category=seerah
    const response = await api.get("/videos.php", { params });

    return response.data;
  },

  /**
   * Get single video by ID or slug
   *
   * Used by: VideoDetailPage
   *
   * IMPORTANT: This endpoint automatically increments the view count!
   * Every time you call this, the video's view count increases by 1.
   *
   * @param {string} id - Video ID or slug (e.g., "video_001" or "life-of-prophet-muhammad-seerah")
   *
   * @returns {Promise} Response: { success, data: {...video with all details} }
   *
   * @example
   * const result = await videosService.getById("video_001");
   *
   * console.log(result.data.title); // Video title
   * console.log(result.data.videoUrl); // YouTube/Vimeo URL or uploaded file
   * console.log(result.data.chapters); // Array of chapter timestamps
   * console.log(result.data.views); // View count (incremented automatically!)
   */
  getById: async (id) => {
    // Make GET request with id parameter
    // Example URL: /api/videos.php?id=video_001
    //
    // NOTE: PHP backend will automatically increment view count
    const response = await api.get("/videos.php", {
      params: { id },
    });

    // Check if video was found
    if (!response.data.success || !response.data.data) {
      throw new Error("Video not found");
    }

    return response.data;
  },

  /**
   * Get featured videos
   *
   * Used by: HomePage (featured videos section)
   *
   * @returns {Promise} Response: { success, data: [...top 3 videos by view count] }
   *
   * @example
   * const result = await videosService.getFeatured();
   * // Returns the 3 most viewed videos
   */
  getFeatured: async () => {
    // Make GET request with featured=1 parameter
    // Example URL: /api/videos.php?featured=1
    const response = await api.get("/videos.php", {
      params: { featured: 1 },
    });

    return response.data;
  },
};
