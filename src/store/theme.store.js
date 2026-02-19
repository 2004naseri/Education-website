// src/store/theme.store.js
// ============================================================
// Theme Store — Zustand
//
// Manages: light | dark mode
// Persists: to localStorage so theme survives page refresh
//
// Usage:
//   const { theme, toggleTheme } = useThemeStore();
// ============================================================

import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useThemeStore = create(
  persist(
    (set, get) => ({
      // ── State ─────────────────────────────────────────────
      theme: "light", // "light" | "dark"

      // ── Actions ───────────────────────────────────────────

      // Toggle between light and dark
      toggleTheme: () =>
        set({ theme: get().theme === "light" ? "dark" : "light" }),

      // Set explicitly (e.g. from OS preference)
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: "nurpath-theme", // localStorage key
    },
  ),
);
