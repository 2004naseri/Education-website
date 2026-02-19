// src/data/navigation.js
// ============================================================
// Navigation — Single Source of Truth
//
// Used by:
//   • Header.jsx        → desktop nav links + dropdown
//   • MobileMenu.jsx    → mobile drawer links
//   • Footer.jsx        → footer link columns
//
// RULE: Never hardcode nav links anywhere else.
//       Always import from here.
// ============================================================

// ── Main navigation — top header ─────────────────────────────
// Add children[] to create a dropdown group
export const NAVIGATION = [
  {
    label: "Home",
    path: "/",
    icon: "🏠",
  },
  {
    label: "Books",
    path: "/books",
    icon: "📚",
  },
  {
    label: "Articles",
    path: "/articles",
    icon: "📝",
  },
  {
    // Dropdown group — path is "#" (not a real route)
    label: "Islamic Sciences",
    path: "#",
    icon: "🌿",
    children: [
      { label: "Fiqh", path: "/fiqh", icon: "⚖️" },
      { label: "Hadith", path: "/hadith", icon: "📜" },
      { label: "Quran & Tafsir", path: "/quran", icon: "📖" },
    ],
  },
  {
    label: "Videos",
    path: "/videos",
    icon: "🎬",
  },
  {
    label: "About",
    path: "/about",
    icon: "ℹ️",
  },
];

// ── Footer link columns ───────────────────────────────────────
// Separate from NAVIGATION so footer can have different grouping
export const FOOTER_LINKS = {
  explore: [
    { label: "PDF Books", path: "/books" },
    { label: "Articles", path: "/articles" },
    { label: "Video Library", path: "/videos" },
    { label: "About Us", path: "/about" },
    { label: "Contact", path: "/contact" },
  ],
  learn: [
    { label: "Quran & Tafsir", path: "/quran" },
    { label: "Hadith", path: "/hadith" },
    { label: "Fiqh", path: "/fiqh" },
  ],
};
