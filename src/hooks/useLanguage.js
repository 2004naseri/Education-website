// src/hooks/useLanguage.js
// ============================================================
// useLanguage — Custom Hook
//
// Reads language from lang.store and applies:
//   • lang attribute on <html>  (e.g. lang="fa")
//   • dir  attribute on <html>  (e.g. dir="rtl")
//
// RTL languages: fa (Dari), ps (Pashto)
// LTR languages: en (English)
//
// Call this ONCE inside AppLayout — not in every component.
//
// Usage:
//   // In AppLayout.jsx
//   useLanguage();
//
//   // Anywhere else — just read the store
//   const { lang, setLang } = useLangStore();
// ============================================================

import { useEffect } from "react";
import { useLangStore } from "../store/lang.store";

// ── Language → direction map ──────────────────────────────────
const LANG_DIR = {
  en: "ltr",
  fa: "rtl",
  ps: "rtl",
};

export const useLanguage = () => {
  const { lang, setLang } = useLangStore();

  // ── Apply lang + dir to <html> whenever language changes ──
  useEffect(() => {
    const root = document.documentElement;

    // Set lang attribute (used by screen readers + CSS [lang] selectors)
    root.setAttribute("lang", lang);

    // Set dir attribute — flips entire layout for RTL languages
    root.setAttribute("dir", LANG_DIR[lang] ?? "ltr");
  }, [lang]);

  return {
    lang,
    setLang,
    isRTL: LANG_DIR[lang] === "rtl",
    dir: LANG_DIR[lang] ?? "ltr",
  };
};
