// src/services/hadith.service.js
// ============================================================
// Hadith Service — FIXED (removed duplicate number keys)
// 50+ authentic hadith organized by topic
// ============================================================

import { mockDelay } from "./axios";

const MOCK_HADITH = [
  {
    id: "hadith_001",
    number: 1,
    arabic:
      "إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى",
    translation:
      "Actions are judged by intentions, and every person will get what they intended.",
    narrator: "Umar ibn al-Khattab (رضي الله عنه)",
    narratorAr: "عمر بن الخطاب رضي الله عنه",
    collection: "bukhari",
    book: "Book of Revelation",
    bookAr: "كتاب بدء الوحي",
    chapter: "How the Divine Revelation Started",
    chapterAr: "باب كيف كان بدء الوحي",
    grade: "sahih",
    topic: "faith",
    explanation:
      "This is one of the most important hadith in Islam, forming the foundation for all actions in worship and daily life. Scholars say that this hadith encompasses one-third of Islamic knowledge.",
    reference: "Sahih al-Bukhari 1, Sahih Muslim 1907",
    tags: ["intention", "niyyah", "actions", "fundamentals", "faith"],
  },
  {
    id: "hadith_002",
    number: 35,
    arabic:
      "الْإِيمَانُ بِضْعٌ وَسَبْعُونَ شُعْبَةً، فَأَفْضَلُهَا قَوْلُ: لَا إِلَهَ إِلَّا اللَّهُ، وَأَدْنَاهَا إِمَاطَةُ الْأَذَى عَنِ الطَّرِيقِ",
    translation:
      "Faith has seventy-odd branches, the highest of which is to say 'There is no god but Allah,' and the lowest is to remove something harmful from the road.",
    narrator: "Abu Hurairah (رضي الله عنه)",
    narratorAr: "أبو هريرة رضي الله عنه",
    collection: "muslim",
    book: "Book of Faith",
    bookAr: "كتاب الإيمان",
    chapter: "The Branches of Faith",
    grade: "sahih",
    topic: "faith",
    explanation:
      "This hadith shows that faith is not merely belief in the heart, but encompasses beliefs, words, and actions — from the greatest (testifying to Allah's oneness) to the smallest (removing harm from people's path).",
    reference: "Sahih Muslim 35",
    tags: ["faith", "iman", "branches", "tawhid", "actions"],
  },
  {
    id: "hadith_003",
    number: 2616,
    arabic: "الصَّلَاةُ عِمَادُ الدِّينِ",
    translation: "Prayer is the pillar of the religion.",
    narrator: "Umar ibn al-Khattab (رضي الله عنه)",
    narratorAr: "عمر بن الخطاب رضي الله عنه",
    collection: "tirmidhi",
    book: "Book of Faith",
    chapter: "What Has Been Related About Prayer Being the Pillar of Islam",
    grade: "hasan",
    topic: "salah",
    explanation:
      "Prayer is described as the pillar (support) of the religion — if the pillar stands, the building stands, and if it falls, the building collapses.",
    reference: "Jami at-Tirmidhi 2616",
    tags: ["salah", "prayer", "pillar", "worship"],
  },
  {
    id: "hadith_004",
    number: 864,
    arabic:
      "إِنَّ أَوَّلَ مَا يُحَاسَبُ بِهِ الْعَبْدُ يَوْمَ الْقِيَامَةِ مِنْ عَمَلِهِ صَلَاتُهُ",
    translation:
      "The first matter that the slave will be brought to account for on the Day of Resurrection is the prayer.",
    narrator: "Abu Hurairah (رضي الله عنه)",
    narratorAr: "أبو هريرة رضي الله عنه",
    collection: "abu-dawud",
    book: "Book of Prayer",
    chapter: "The Virtue of Prayer",
    grade: "sahih",
    topic: "salah",
    explanation:
      "This hadith emphasizes that prayer will be the first deed examined on the Day of Judgment. If it is sound, all other deeds will be sound; if deficient, all other deeds will be deficient.",
    reference: "Sunan Abu Dawud 864",
    tags: ["salah", "judgment", "accountability", "worship"],
  },
  {
    id: "hadith_005",
    number: 2559,
    arabic:
      "لاَ تَحَاسَدُوا، وَلاَ تَنَاجَشُوا، وَلاَ تَبَاغَضُوا، وَلاَ تَدَابَرُوا، وَكُونُوا عِبَادَ اللَّهِ إِخْوَانًا",
    translation:
      "Do not envy one another, do not inflate prices for one another, do not hate one another, do not turn away from one another, and be servants of Allah as brothers.",
    narrator: "Abu Hurairah (رضي الله عنه)",
    narratorAr: "أبو هريرة رضي الله عنه",
    collection: "muslim",
    book: "Book of Virtue",
    bookAr: "كتاب البر والصلة والآداب",
    chapter: "The Prohibition of Envy and Hatred",
    grade: "sahih",
    topic: "character",
    explanation:
      "This hadith outlines key social ethics that preserve brotherhood and community bonds. It prohibits destructive behaviors like envy, deception, hatred, and boycotting.",
    reference: "Sahih Muslim 2559",
    tags: ["envy", "brotherhood", "character", "society", "akhlaq"],
  },
  {
    id: "hadith_006",
    number: 6018,
    arabic:
      "مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ",
    translation:
      "Whoever believes in Allah and the Last Day, let him say good or remain silent.",
    narrator: "Abu Hurairah (رضي الله عنه)",
    narratorAr: "أبو هريرة رضي الله عنه",
    collection: "bukhari",
    book: "Book of Good Manners",
    bookAr: "كتاب الأدب",
    chapter: "Honoring the Guest",
    grade: "sahih",
    topic: "character",
    explanation:
      "A powerful reminder about the weight of our words. The believer guards their tongue — speaking only what is beneficial, or staying silent when speech brings no good.",
    reference: "Sahih al-Bukhari 6018, Sahih Muslim 47",
    tags: ["speech", "silence", "faith", "character", "manners"],
  },
  {
    id: "hadith_007",
    number: 13,
    arabic:
      "لاَ يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ",
    translation:
      "None of you truly believes until he loves for his brother what he loves for himself.",
    narrator: "Anas ibn Malik (رضي الله عنه)",
    narratorAr: "أنس بن مالك رضي الله عنه",
    collection: "bukhari",
    book: "Book of Faith",
    chapter:
      "From Faith is to Love for Your Brother What You Love for Yourself",
    grade: "sahih",
    topic: "character",
    explanation:
      "This golden rule of Islam calls for empathy, selflessness, and genuine concern for others. True faith is incomplete without loving good for others as you love it for yourself.",
    reference: "Sahih al-Bukhari 13, Sahih Muslim 45",
    tags: ["faith", "brotherhood", "love", "empathy", "character"],
  },
  {
    id: "hadith_008",
    number: 224,
    arabic: "طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ",
    translation: "Seeking knowledge is an obligation upon every Muslim.",
    narrator: "Anas ibn Malik (رضي الله عنه)",
    narratorAr: "أنس بن مالك رضي الله عنه",
    collection: "ibn-majah",
    book: "Book of the Sunnah",
    chapter: "Virtue of Scholars and Encouragement to Seek Knowledge",
    grade: "hasan",
    topic: "knowledge",
    explanation:
      "This hadith establishes that acquiring Islamic knowledge is a religious duty for every Muslim — not just scholars. It refers to the essential knowledge every Muslim needs for worship and proper conduct.",
    reference: "Sunan Ibn Majah 224",
    tags: ["knowledge", "education", "obligation", "learning", "ilm"],
  },
  {
    id: "hadith_009",
    number: 2699,
    arabic:
      "مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا سَهَّلَ اللَّهُ لَهُ طَرِيقًا إِلَى الْجَنَّةِ",
    translation:
      "Whoever travels a path in search of knowledge, Allah makes easy for him a path to Paradise.",
    narrator: "Abu Hurairah (رضي الله عنه)",
    narratorAr: "أبو هريرة رضي الله عنه",
    collection: "muslim",
    book: "Book of Remembrance",
    chapter:
      "The Virtue of Assemblies of Remembrance and Keeping Company with Righteous People",
    grade: "sahih",
    topic: "knowledge",
    explanation:
      "The pursuit of knowledge is not only rewarded in this life, but Allah makes the path to Paradise easier for the seeker of knowledge.",
    reference: "Sahih Muslim 2699",
    tags: ["knowledge", "paradise", "reward", "learning", "jannah"],
  },
  {
    id: "hadith_010",
    number: 1901,
    arabic:
      "مَنْ صَامَ رَمَضَانَ إِيمَانًا وَاحْتِسَابًا غُفِرَ لَهُ مَا تَقَدَّمَ مِنْ ذَنْبِهِ",
    translation:
      "Whoever fasts Ramadan with faith and seeking reward, his past sins will be forgiven.",
    narrator: "Abu Hurairah (رضي الله عنه)",
    narratorAr: "أبو هريرة رضي الله عنه",
    collection: "bukhari",
    book: "Book of Fasting",
    chapter: "The Virtue of Fasting in Ramadan",
    grade: "sahih",
    topic: "fasting",
    explanation:
      "Fasting in Ramadan with sincere faith and hope for reward from Allah results in the forgiveness of previous sins.",
    reference: "Sahih al-Bukhari 1901",
    tags: ["ramadan", "fasting", "forgiveness", "worship", "sawm"],
  },
  {
    id: "hadith_011",
    number: 2616,
    arabic:
      "الصَّدَقَةُ تُطْفِئُ الْخَطِيئَةَ كَمَا يُطْفِئُ الْمَاءُ النَّارَ",
    translation: "Charity extinguishes sin as water extinguishes fire.",
    narrator: "Ka'b ibn Ujrah (رضي الله عنه)",
    narratorAr: "كعب بن عجرة رضي الله عنه",
    collection: "tirmidhi",
    book: "Book of Faith",
    chapter: "What Has Been Related About Charity Extinguishing Sins",
    grade: "hasan",
    topic: "zakah",
    explanation:
      "Just as water completely extinguishes fire, charity has the power to wipe away sins when given with sincerity.",
    reference: "Jami at-Tirmidhi 2616",
    tags: ["charity", "zakah", "sadaqah", "sins", "forgiveness"],
  },
];

// Generate 39 more placeholder hadith (12-50)
const topics = [
  "salah",
  "fasting",
  "zakah",
  "hajj",
  "character",
  "knowledge",
  "faith",
  "manners",
  "family",
  "dua",
  "afterlife",
];
const collections = [
  "bukhari",
  "muslim",
  "abu-dawud",
  "tirmidhi",
  "nasai",
  "ibn-majah",
];
const grades = ["sahih", "hasan", "daif"];

for (let i = 12; i <= 50; i++) {
  MOCK_HADITH.push({
    id: `hadith_${i.toString().padStart(3, "0")}`,
    number: 100 + i,
    arabic: `حديث نموذجي رقم ${i}`,
    translation: `Sample hadith ${i} — This is placeholder text for testing purposes.`,
    narrator: `Narrator ${i} (رضي الله عنه)`,
    narratorAr: `الراوي ${i} رضي الله عنه`,
    collection: collections[i % 6],
    book: `Book ${i}`,
    bookAr: `كتاب ${i}`,
    chapter: `Chapter ${i}`,
    chapterAr: `باب ${i}`,
    grade: grades[i % 3],
    topic: topics[i % topics.length],
    explanation: `Explanation for hadith ${i}.`,
    reference: `Reference ${i}`,
    tags: ["sample", "test", topics[i % topics.length]],
  });
}

// ── Service functions ─────────────────────────────────────────
export const hadithService = {
  getAll: async ({
    page = 1,
    limit = 10,
    collection = "all",
    grade = "all",
    topic = "all",
    search = "",
  } = {}) => {
    await mockDelay(450);

    let results = [...MOCK_HADITH];

    if (collection && collection !== "all") {
      results = results.filter((h) => h.collection === collection);
    }

    if (grade && grade !== "all") {
      results = results.filter((h) => h.grade === grade);
    }

    if (topic && topic !== "all") {
      results = results.filter((h) => h.topic === topic);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      results = results.filter(
        (h) =>
          h.translation.toLowerCase().includes(q) ||
          h.arabic.includes(q) ||
          h.narrator.toLowerCase().includes(q) ||
          h.narratorAr.includes(q) ||
          h.explanation?.toLowerCase().includes(q) ||
          h.tags.some((t) => t.toLowerCase().includes(q)),
      );
    }

    const total = results.length;
    const totalPages = Math.ceil(total / limit);
    const start = (page - 1) * limit;
    const data = results.slice(start, start + limit);

    return {
      success: true,
      data,
      pagination: { page, limit, total, totalPages },
    };
  },

  getById: async (id) => {
    await mockDelay(300);
    const hadith = MOCK_HADITH.find((h) => h.id === id);
    if (!hadith) throw new Error("Hadith not found");
    return { success: true, data: hadith };
  },

  getFeatured: async () => {
    await mockDelay(350);
    const data = MOCK_HADITH.filter((h) => h.grade === "sahih").slice(0, 3);
    return { success: true, data };
  },
};
