// src/data/hadithCollections.js
// ============================================================
// Hadith Collections + Topics — UPDATED
// ============================================================

// ── The Six Major Collections ─────────────────────────────────
export const HADITH_COLLECTIONS = [
  {
    id: "all",
    label: "All Collections",
    labelAr: "كل الكتب",
    shortLabel: "All",
    author: "",
    description: "Browse all hadith collections",
    totalAhadith: 7563,
  },
  {
    id: "bukhari",
    label: "Sahih al-Bukhari",
    labelAr: "صحيح البخاري",
    shortLabel: "Bukhari",
    author: "Imam Muhammad al-Bukhari",
    authorAr: "الإمام محمد البخاري",
    description:
      "The most authentic collection of hadith, compiled by Imam al-Bukhari.",
    totalAhadith: 7563,
    grade: "Sahih",
  },
  {
    id: "muslim",
    label: "Sahih Muslim",
    labelAr: "صحيح مسلم",
    shortLabel: "Muslim",
    author: "Imam Muslim ibn al-Hajjaj",
    authorAr: "الإمام مسلم بن الحجاج",
    description:
      "The second most authentic hadith collection after Sahih al-Bukhari.",
    totalAhadith: 7500,
    grade: "Sahih",
  },
  {
    id: "abu-dawud",
    label: "Sunan Abu Dawud",
    labelAr: "سنن أبي داود",
    shortLabel: "Abu Dawud",
    author: "Imam Abu Dawud al-Sijistani",
    authorAr: "الإمام أبو داود السجستاني",
    description:
      "A major hadith collection focusing on legal rulings and fiqh.",
    totalAhadith: 5274,
    grade: "Mixed",
  },
  {
    id: "tirmidhi",
    label: "Jami al-Tirmidhi",
    labelAr: "جامع الترمذي",
    shortLabel: "Tirmidhi",
    author: "Imam al-Tirmidhi",
    authorAr: "الإمام الترمذي",
    description:
      "Known for grading each hadith and mentioning scholarly opinions.",
    totalAhadith: 3956,
    grade: "Mixed",
  },
  {
    id: "nasai",
    label: "Sunan an-Nasa'i",
    labelAr: "سنن النسائي",
    shortLabel: "An-Nasa'i",
    author: "Imam Ahmad al-Nasa'i",
    authorAr: "الإمام أحمد النسائي",
    description:
      "Known for its strict grading criteria, closest to Sahihayn in rigor.",
    totalAhadith: 5761,
    grade: "Mixed",
  },
  {
    id: "ibn-majah",
    label: "Sunan Ibn Majah",
    labelAr: "سنن ابن ماجه",
    shortLabel: "Ibn Majah",
    author: "Imam Ibn Majah al-Qazwini",
    authorAr: "الإمام ابن ماجه القزويني",
    description:
      "The sixth of the major hadith collections, completing the Kutub al-Sittah.",
    totalAhadith: 4341,
    grade: "Mixed",
  },
];

// ── Hadith Topics (NEW CATEGORIES) ────────────────────────────
export const HADITH_TOPICS = [
  { id: "all", label: "All Topics", labelAr: "كل المواضيع", icon: "📚" },
  { id: "salah", label: "Prayer", labelAr: "الصلاة", icon: "🕌" },
  { id: "fasting", label: "Fasting", labelAr: "الصيام", icon: "🌙" },
  { id: "zakah", label: "Charity", labelAr: "الزكاة", icon: "💰" },
  { id: "hajj", label: "Hajj", labelAr: "الحج", icon: "🕋" },
  { id: "character", label: "Character", labelAr: "الأخلاق", icon: "✨" },
  { id: "knowledge", label: "Knowledge", labelAr: "العلم", icon: "📖" },
  { id: "faith", label: "Faith", labelAr: "الإيمان", icon: "🌟" },
  { id: "manners", label: "Manners", labelAr: "الآداب", icon: "🤝" },
  { id: "family", label: "Family", labelAr: "الأسرة", icon: "👨‍👩‍👧‍👦" },
  { id: "dua", label: "Supplication", labelAr: "الدعاء", icon: "🤲" },
  { id: "afterlife", label: "Afterlife", labelAr: "الآخرة", icon: "🌌" },
];

// ── Hadith grade options ──────────────────────────────────────
export const HADITH_GRADES = [
  { id: "all", label: "All Grades", badge: "muted" },
  { id: "sahih", label: "Sahih ✓", badge: "success" },
  { id: "hasan", label: "Hasan ◈", badge: "accent" },
  { id: "daif", label: "Da'if ○", badge: "warning" },
];

// ── Helper ────────────────────────────────────────────────────
export const getCollectionById = (id) =>
  HADITH_COLLECTIONS.find((c) => c.id === id) ?? HADITH_COLLECTIONS[0];

export const getTopicById = (id) =>
  HADITH_TOPICS.find((t) => t.id === id) ?? HADITH_TOPICS[0];
