// src/data/fiqhCategories.js
// ============================================================
// Fiqh Categories — Single Source of Truth
//
// Used by:
//   • FiqhPage.jsx       → category grid + filter chips
//   • FiqhCard.jsx       → category label display
//   • fiqh.service.js    → API filter param
// ============================================================

// ── Main Fiqh Chapters ────────────────────────────────────────
export const FIQH_CATEGORIES = [
  {
    id: "all",
    label: "All Topics",
    labelAr: "كل المواضيع",
    icon: "📚",
    description: "Browse all fiqh topics",
    topicCount: 240,
  },
  {
    id: "taharah",
    label: "Taharah",
    labelAr: "الطهارة",
    icon: "💧",
    description: "Purification — wudu, ghusl, tayammum",
    topicCount: 28,
  },
  {
    id: "salah",
    label: "Salah",
    labelAr: "الصلاة",
    icon: "🕌",
    description: "Prayer — conditions, pillars, times, congregational prayer",
    topicCount: 45,
  },
  {
    id: "zakah",
    label: "Zakah",
    labelAr: "الزكاة",
    icon: "💰",
    description: "Obligatory charity — nisab, rates, eligible recipients",
    topicCount: 18,
  },
  {
    id: "sawm",
    label: "Sawm",
    labelAr: "الصوم",
    icon: "🌙",
    description: "Fasting — Ramadan, voluntary fasts, expiation",
    topicCount: 22,
  },
  {
    id: "hajj",
    label: "Hajj & Umrah",
    labelAr: "الحج والعمرة",
    icon: "🕋",
    description: "Pilgrimage — rites, conditions, and rulings",
    topicCount: 30,
  },
  {
    id: "muamalat",
    label: "Mu'amalat",
    labelAr: "المعاملات",
    icon: "🤝",
    description: "Transactions — trade, contracts, finance",
    topicCount: 35,
  },
  {
    id: "nikah",
    label: "Nikah",
    labelAr: "النكاح",
    icon: "💍",
    description: "Marriage — conditions, rights, divorce",
    topicCount: 28,
  },
  {
    id: "inheritance",
    label: "Inheritance",
    labelAr: "المواريث",
    icon: "📜",
    description: "Islamic inheritance law — shares and calculation",
    topicCount: 15,
  },
  {
    id: "food",
    label: "Food & Drink",
    labelAr: "الأطعمة والأشربة",
    icon: "🍽️",
    description: "Halal and haram food, slaughter, intoxicants",
    topicCount: 12,
  },
  {
    id: "hudud",
    label: "Hudud & Qisas",
    labelAr: "الحدود والقصاص",
    icon: "⚖️",
    description: "Islamic criminal law and prescribed punishments",
    topicCount: 7,
  },
];

// ── Helper — get category by id ───────────────────────────────
export const getFiqhCategoryById = (id) =>
  FIQH_CATEGORIES.find((c) => c.id === id) ?? FIQH_CATEGORIES[0];
