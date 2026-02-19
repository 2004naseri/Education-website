// src/store/lang.store.js
// ============================================================
// Language Store — Zustand
//
// Manages: active language code (en | fa | ps)
// Persists: to localStorage
//
// The actual dir + lang attributes on <html> are applied
// by the useLanguage() hook — not here.
// This store is the single source of truth for the choice.
//
// Usage:
//   const { lang, setLang } = useLangStore();
// ============================================================

import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useLangStore = create(
  persist(
    (set) => ({
      // ── State ───────────────────────────────────────────
      lang: "en", // "en" | "fa" | "ps"

      // ── Actions ─────────────────────────────────────────
      setLang: (lang) => set({ lang }),
    }),
    {
      name: "nurpath-lang", // localStorage key
    },
  ),
);
