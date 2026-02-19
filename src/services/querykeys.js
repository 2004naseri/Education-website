// src/utils/queryKeys.js
// ============================================================
// React Query Key Factory — NurPath
//
// Centralized key factory so every useQuery/useInfiniteQuery
// uses consistent, predictable cache keys.
//
// Pattern:
//   queryKeys.books.all        → ["books"]
//   queryKeys.books.list(f)    → ["books", "list", { ...filters }]
//   queryKeys.books.detail(id) → ["books", "detail", "abc123"]
//
// Usage:
//   useQuery({
//     queryKey: queryKeys.books.list({ page: 1, category: "fiqh" }),
//     queryFn:  () => booksService.getAll({ page: 1, category: "fiqh" }),
//   });
// ============================================================

export const queryKeys = {
  // ── Books ──────────────────────────────────────────────────
  books: {
    all: () => ["books"],
    list: (filters) => ["books", "list", filters],
    detail: (id) => ["books", "detail", id],
    featured: () => ["books", "featured"],
  },

  // ── Articles ───────────────────────────────────────────────
  articles: {
    all: () => ["articles"],
    list: (filters) => ["articles", "list", filters],
    detail: (slug) => ["articles", "detail", slug],
    featured: () => ["articles", "featured"],
  },

  // ── Hadith ─────────────────────────────────────────────────
  hadith: {
    all: () => ["hadith"],
    list: (filters) => ["hadith", "list", filters],
    detail: (id) => ["hadith", "detail", id],
    byCollection: (collection) => ["hadith", "collection", collection],
  },

  // ── Quran ──────────────────────────────────────────────────
  quran: {
    all: () => ["quran"],
    surahs: () => ["quran", "surahs"],
    ayat: (surahNum) => ["quran", "ayat", surahNum],
    search: (query) => ["quran", "search", query],
  },

  // ── Fiqh ───────────────────────────────────────────────────
  fiqh: {
    all: () => ["fiqh"],
    list: (filters) => ["fiqh", "list", filters],
    detail: (id) => ["fiqh", "detail", id],
    byCategory: (category) => ["fiqh", "category", category],
  },

  // ── Videos ─────────────────────────────────────────────────
  videos: {
    all: () => ["videos"],
    list: (filters) => ["videos", "list", filters],
    detail: (id) => ["videos", "detail", id],
    featured: () => ["videos", "featured"],
  },
};
