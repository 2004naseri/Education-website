// src/services/health.service.js
// ============================================================
// Health Check Service - Test API connectivity
// Use this to verify that your backend is accessible
// ============================================================

import api from "./axios";

export const healthService = {
  /**
   * Test basic API connectivity
   * Pings a lightweight endpoint to check if backend is reachable
   *
   * @returns {Promise<Object>} { success: boolean, message: string, timestamp: string }
   *
   * @example
   * const health = await healthService.ping();
   * if (health.success) {
   *   console.log("✅ API is healthy");
   * }
   */
  ping: async () => {
    try {
      // Try to fetch a lightweight endpoint
      // You can create a dedicated health.php endpoint, or use any existing one
      const response = await api.get("/health.php", { timeout: 5000 });

      return {
        success: true,
        message: "API is reachable",
        timestamp: new Date().toISOString(),
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        timestamp: new Date().toISOString(),
        error: {
          code: error.code,
          status: error.response?.status,
          statusText: error.response?.statusText,
        },
      };
    }
  },

  /**
   * Test all API endpoints
   * Makes a simple request to each service to verify they're working
   *
   * @returns {Promise<Object>} Object with test results for each endpoint
   *
   * @example
   * const results = await healthService.testAllEndpoints();
   * console.log(results.books.success); // true/false
   */
  testAllEndpoints: async () => {
    const endpoints = [
      { name: "books", path: "/books.php", params: { limit: 1 } },
      { name: "articles", path: "/articles.php", params: { limit: 1 } },
      { name: "hadith", path: "/hadith.php", params: { limit: 1 } },
      { name: "quran", path: "/quran.php" },
      { name: "fiqh", path: "/fiqh.php", params: { limit: 1 } },
      { name: "videos", path: "/videos.php", params: { limit: 1 } },
    ];

    const results = {};

    for (const endpoint of endpoints) {
      try {
        const response = await api.get(endpoint.path, {
          params: endpoint.params,
          timeout: 5000,
        });

        results[endpoint.name] = {
          success: true,
          status: response.status,
          responseTime: response.headers["x-response-time"] || "N/A",
        };
      } catch (error) {
        results[endpoint.name] = {
          success: false,
          error: error.message,
          status: error.response?.status,
        };
      }
    }

    return results;
  },

  /**
   * Get API configuration info
   * Returns current API URL and environment
   *
   * @returns {Object} Configuration info
   */
  getConfig: () => {
    return {
      baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api",
      environment: import.meta.env.MODE,
      isDevelopment: import.meta.env.DEV,
      isProduction: import.meta.env.PROD,
    };
  },
};

export default healthService;
