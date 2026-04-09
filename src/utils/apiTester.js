// src/utils/apiTester.js
// ============================================================
// API Testing Utility - Development Tool
// Run this in browser console to test all API endpoints
// ============================================================

import { healthService } from "../services/health.service";
import { booksService } from "../services/books.service";
import { articlesService } from "../services/articles.service";
import { hadithService } from "../services/hadith.service";
import { quranService } from "../services/quran.service";
import { fiqhService } from "../services/fiqh.service";
import { videosService } from "../services/videos.service";

/**
 * API Tester - Development utility
 * Exposes testing functions to browser console
 */
export const apiTester = {
  /**
   * Test API connectivity
   */
  async testConnection() {
    console.log("🔄 Testing API connection...");
    const result = await healthService.ping();

    if (result.success) {
      console.log("✅ API is reachable");
    } else {
      console.error("❌ API is not reachable:", result.message);
    }

    return result;
  },

  /**
   * Test all endpoints
   */
  async testAll() {
    console.log("🔄 Testing all API endpoints...\n");

    const tests = [
      { name: "Books", fn: () => booksService.getAll({ limit: 1 }) },
      { name: "Articles", fn: () => articlesService.getAll({ limit: 1 }) },
      { name: "Hadith", fn: () => hadithService.getAll({ limit: 1 }) },
      { name: "Quran", fn: () => quranService.getSurahs() },
      { name: "Fiqh", fn: () => fiqhService.getAll({ limit: 1 }) },
      { name: "Videos", fn: () => videosService.getAll({ limit: 1 }) },
    ];

    const results = {};

    for (const test of tests) {
      try {
        const startTime = performance.now();
        const response = await test.fn();
        const endTime = performance.now();
        const duration = (endTime - startTime).toFixed(2);

        results[test.name] = {
          success: response.success !== false,
          duration: `${duration}ms`,
          dataCount: response.data?.length || 0,
        };

        console.log(`✅ ${test.name}: ${duration}ms`);
      } catch (error) {
        results[test.name] = {
          success: false,
          error: error.message,
          status: error.response?.status,
        };

        console.error(
          `❌ ${test.name}: ${error.response?.status || error.message}`
        );
      }
    }

    console.log("\n📊 Test Summary:");
    console.table(results);

    return results;
  },

  /**
   * Get API configuration
   */
  getConfig() {
    const config = healthService.getConfig();
    console.log("⚙️ API Configuration:");
    console.table(config);
    return config;
  },

  /**
   * Test specific endpoint with custom parameters
   */
  async testEndpoint(serviceName, method, params = {}) {
    const services = {
      books: booksService,
      articles: articlesService,
      hadith: hadithService,
      quran: quranService,
      fiqh: fiqhService,
      videos: videosService,
    };

    const service = services[serviceName];
    if (!service) {
      console.error(`❌ Service "${serviceName}" not found`);
      return;
    }

    if (!service[method]) {
      console.error(`❌ Method "${method}" not found in ${serviceName}`);
      return;
    }

    console.log(`🔄 Testing ${serviceName}.${method}(${JSON.stringify(params)})`);

    try {
      const startTime = performance.now();
      const result = await service[method](params);
      const endTime = performance.now();
      const duration = (endTime - startTime).toFixed(2);

      console.log(`✅ Success in ${duration}ms`);
      console.log("Response:", result);

      return result;
    } catch (error) {
      console.error(`❌ Failed:`, error);
      throw error;
    }
  },

  /**
   * Show available services and methods
   */
  showHelp() {
    console.log(`
╔════════════════════════════════════════════════════════════╗
║              API TESTER - Development Tool                 ║
╚════════════════════════════════════════════════════════════╝

Available Commands:
──────────────────────────────────────────────────────────────

  apiTester.testConnection()
    → Test basic API connectivity

  apiTester.testAll()
    → Test all endpoints (books, articles, hadith, etc.)

  apiTester.getConfig()
    → Show current API configuration

  apiTester.testEndpoint(service, method, params)
    → Test specific endpoint
    Example: apiTester.testEndpoint('books', 'getAll', { limit: 5 })

  apiTester.showHelp()
    → Show this help message

──────────────────────────────────────────────────────────────
Available Services:
  - books, articles, hadith, quran, fiqh, videos

Common Methods:
  - getAll(params)    - Get list with filters
  - getById(id)       - Get single item
  - getFeatured()     - Get featured items
──────────────────────────────────────────────────────────────
    `);
  },
};

// Make it globally available in development
if (import.meta.env.DEV) {
  window.apiTester = apiTester;
  console.log(
    "🧪 API Tester loaded! Type 'apiTester.showHelp()' for usage guide."
  );
}

export default apiTester;
