// src/data/categories.js
// ============================================================
// Categories — Single Source of Truth
//
// Used by:
//   • FilterBar on Books, Articles, Videos pages
//   • CategoryNav section on Home page
//   • Badge labels across cards
//
// RULE: Never define categories inline in any component.
//       Always import from here.
// ============================================================

// ── Book categories ───────────────────────────────────────────
export const BOOK_CATEGORIES = [
  { id: "all", label: "All Books", labelAr: "كل الكتب", icon: "📚" },
  { id: "tafsir", label: "Tafsir", labelAr: "التفسير", icon: "📖" },
  { id: "hadith", label: "Hadith", labelAr: "الحديث", icon: "📜" },
  { id: "fiqh", label: "Fiqh", labelAr: "الفقه", icon: "⚖️" },
  { id: "aqeedah", label: "Aqeedah", labelAr: "العقيدة", icon: "🌟" },
  { id: "seerah", label: "Seerah", labelAr: "السيرة", icon: "🕌" },
  { id: "ethics", label: "Ethics", labelAr: "الأخلاق", icon: "✨" },
  { id: "general", label: "General", labelAr: "عام", icon: "📗" },
];

// ── Article categories ────────────────────────────────────────
export const ARTICLE_CATEGORIES = [
  { id: "all", label: "All", labelAr: "الكل", icon: "📝" },
  { id: "knowledge", label: "Knowledge", labelAr: "العلم", icon: "💡" },
  { id: "practice", label: "Practice", labelAr: "العبادة", icon: "🤲" },
  {
    id: "spirituality",
    label: "Spirituality",
    labelAr: "الروحانية",
    icon: "✨",
  },
  { id: "history", label: "History", labelAr: "التاريخ", icon: "📜" },
  {
    id: "current-affairs",
    label: "Current",
    labelAr: "الشؤون الراهنة",
    icon: "🌍",
  },
];

// ── Video categories ──────────────────────────────────────────
export const VIDEO_CATEGORIES = [
  { id: "all", label: "All Videos", labelAr: "كل الفيديوهات", icon: "🎬" },
  { id: "lecture", label: "Lectures", labelAr: "المحاضرات", icon: "🎙️" },
  { id: "series", label: "Series", labelAr: "السلاسل", icon: "📺" },
  { id: "short", label: "Short", labelAr: "مقاطع قصيرة", icon: "⚡" },
  { id: "quran", label: "Quran", labelAr: "القرآن", icon: "📖" },
];

// ── Home page category navigation ────────────────────────────
// Shown as icon grid on Home page
export const HOME_CATEGORIES = [
  {
    id: "quran",
    label: "Quran & Tafsir",
    labelAr: "القرآن والتفسير",
    icon: "📖",
    path: "/quran",
    count: "6,236 Ayat",
  },
  {
    id: "hadith",
    label: "Hadith",
    labelAr: "الحديث",
    icon: "📜",
    path: "/hadith",
    count: "7,500+ Ahadith",
  },
  {
    id: "fiqh",
    label: "Fiqh",
    labelAr: "الفقه",
    icon: "⚖️",
    path: "/fiqh",
    count: "240 Topics",
  },
  {
    id: "aqeedah",
    label: "Aqeedah",
    labelAr: "العقيدة",
    icon: "🌟",
    path: "/articles",
    count: "85 Articles",
  },
  {
    id: "seerah",
    label: "Seerah",
    labelAr: "السيرة",
    icon: "🕌",
    path: "/articles",
    count: "120 Resources",
  },
  {
    id: "books",
    label: "Books & PDFs",
    labelAr: "الكتب",
    icon: "📚",
    path: "/books",
    count: "1,200+ Books",
  },
];

// ── Book languages ────────────────────────────────────────────
export const BOOK_LANGUAGES = [
  { id: "all", label: "All Languages" },
  { id: "arabic", label: "Arabic — العربية" },
  { id: "english", label: "English" },
  { id: "dari", label: "Dari — دری" },
  { id: "pashto", label: "Pashto — پښتو" },
  { id: "urdu", label: "Urdu — اردو" },
];

// ── Sort options — shared across pages ────────────────────────
export const SORT_OPTIONS = [
  { id: "popular", label: "Most Popular" },
  { id: "newest", label: "Newest First" },
  { id: "oldest", label: "Oldest First" },
  { id: "az", label: "A → Z" },
];
