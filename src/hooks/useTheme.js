// src/hooks/useTheme.js
// ============================================================
// useTheme — Custom Hook
//
// Reads theme from theme.store and applies .dark class
// to <html> element so Tailwind dark mode works.
//
// Call this ONCE inside AppLayout — not in every component.
//
// Usage:
//   // In AppLayout.jsx
//   useTheme();
//
//   // Anywhere else — just read the store directly
//   const { theme, toggleTheme } = useThemeStore();
// ============================================================

import { useEffect } from "react";
import { useThemeStore } from "../store/theme.store";

export const useTheme = () => {
  const { theme, toggleTheme, setTheme } = useThemeStore();

  // ── Apply .dark class to <html> whenever theme changes ───
  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  // ── Sync with OS preference on first load ────────────────
  // Only runs once — respects stored preference if it exists
  useEffect(() => {
    const stored = localStorage.getItem("nurpath-theme");

    // If user has never set a preference, use OS default
    if (!stored) {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      setTheme(prefersDark ? "dark" : "light");
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return { theme, toggleTheme, setTheme, isDark: theme === "dark" };
};
