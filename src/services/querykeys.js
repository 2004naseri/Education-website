// src/utils/queryKeys.js
// ============================================================
// React Query Keys — Centralized & Type-Safe
// ============================================================

export const queryKeys = {
  // ── Books ───────────────────────────────────────────────────
  books: {
    all: () => ["books"],
    list: (filters) => ["books", "list", filters],
    detail: (id) => ["books", "detail", id],
    featured: () => ["books", "featured"],
  },

  // ── Articles ────────────────────────────────────────────────
  articles: {
    all: () => ["articles"],
    list: (filters) => ["articles", "list", filters],
    detail: (slug) => ["articles", "detail", slug],
    featured: () => ["articles", "featured"],
  },

  // ── Hadith ──────────────────────────────────────────────────
  hadith: {
    all: () => ["hadith"],
    list: (filters) => ["hadith", "list", filters],
    detail: (id) => ["hadith", "detail", id],
    featured: () => ["hadith", "featured"],
  },

  // ── Quran ───────────────────────────────────────────────────
  quran: {
    all: () => ["quran"],
    surahs: (filters) => ["quran", "surahs", filters],
    ayat: (surahNumber) => ["quran", "ayat", surahNumber],
    ayahDetail: (surahNumber, ayahNumber) => [
      "quran",
      "ayah",
      surahNumber,
      ayahNumber,
    ],
    featured: () => ["quran", "featured"],
  },

  // ── Fiqh ────────────────────────────────────────────────────
  fiqh: {
    all: () => ["fiqh"],
    list: (filters) => ["fiqh", "list", filters],
    detail: (slug) => ["fiqh", "detail", slug],
  },

  // ── Videos ──────────────────────────────────────────────────
  videos: {
    all: () => ["videos"],
    list: (filters) => ["videos", "list", filters],
    detail: (id) => ["videos", "detail", id],
    featured: () => ["videos", "featured"],
  },
};
