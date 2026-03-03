// src/services/quran.service.js
// ============================================================
// Quran Service — COMPLETE & ADMIN-READY
// Sample data: Al-Fatiha (3 ayat) + Al-Baqarah (3 ayat)
// Others return "tafsir coming soon"
// ============================================================

import { mockDelay } from "./axios";
import { SURAHS } from "../data/quranMeta";

// ══════════════════════════════════════════════════════════════
// AYAT DATABASE
// Admin adds ayat one-by-one. Empty tafsir = "coming soon"
// ══════════════════════════════════════════════════════════════

const AYAT_DATABASE = {
  // ──────────────────────────────────────────────────────────
  // SURAH 1: AL-FATIHA (Samples: 1, 5, 7)
  // ──────────────────────────────────────────────────────────
  1: [
    {
      number: 1,
      arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
      translation: "In the name of Allah, the Most Gracious, the Most Merciful",
      transliteration: "Bismillah ir-Rahman ir-Raheem",
      tafsir: `The opening verse of the Quran and the most recited verse in Islam.

**Allah:** The proper name of God — the One who possesses all perfect attributes.

**Ar-Rahman (Most Gracious):** His mercy encompasses everything in this world — believer and disbeliever alike.

**Ar-Raheem (Most Merciful):** Specifically for believers in the Hereafter.

The Prophet ﷺ said: "Every important matter that does not begin with Bismillah is cut off from blessing" (Abu Dawud).`,
    },
    {
      number: 2,
      arabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
      translation: "All praise is due to Allah, Lord of all the worlds",
      transliteration: "Alhamdu lillahi rabbil 'aalameen",
      tafsir: "", // Coming soon
    },
    {
      number: 3,
      arabic: "الرَّحْمَٰنِ الرَّحِيمِ",
      translation: "The Most Gracious, the Most Merciful",
      transliteration: "Ar-Rahman ir-Raheem",
      tafsir: "", // Coming soon
    },
    {
      number: 4,
      arabic: "مَالِكِ يَوْمِ الدِّينِ",
      translation: "Master of the Day of Judgment",
      transliteration: "Maliki yawm id-deen",
      tafsir: "", // Coming soon
    },
    {
      number: 5,
      arabic: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
      translation: "You alone we worship, and You alone we ask for help",
      transliteration: "Iyyaka na'budu wa iyyaka nasta'een",
      tafsir: `This is the heart of Al-Fatiha and the purpose of our existence.

**Iyyaka (You Alone):** Comes BEFORE the verb for emphasis — worship is for You ONLY.

**Na'budu (We Worship):** Comprehensive term for all acts of obedience and devotion.

**Nasta'een (We Seek Help):** Acknowledging complete dependence on Allah.

**Why This Order?**
- Worship comes first (Allah's right)
- Then seeking help (our need)
- True worship requires His help

The Prophet ﷺ taught: "If you ask, ask Allah. If you seek help, seek help from Allah" (Tirmidhi).

This verse balances two extremes: worship without seeking help (arrogance) and seeking help without worship (materialism).`,
    },
    {
      number: 6,
      arabic: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
      translation: "Guide us to the straight path",
      transliteration: "Ihdina as-sirat al-mustaqeem",
      tafsir: "", // Coming soon
    },
    {
      number: 7,
      arabic:
        "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ",
      translation:
        "The path of those upon whom You have bestowed favor, not of those who have earned [Your] anger or of those who have gone astray",
      transliteration:
        "Sirat alladhina an'amta 'alayhim ghayril maghdubi 'alayhim wa la ad-dalleen",
      tafsir: `This verse clarifies WHICH path we're asking for.

**Those You Favored:** Prophets, truthful, martyrs, and righteous (Quran 4:69).

**Those Who Earned Anger:** The Prophet ﷺ explained these are those who had knowledge but didn't act — they knew truth but rejected it. Their sin: knowledge without action.

**Those Who Went Astray:** Those who worshipped with zeal but without knowledge — sincere but on wrong path. Their sin: action without knowledge.

**The Two Extremes:**
- Knowledge without action → Arrogance
- Action without knowledge → Innovation

**The Straight Path:** Knowledge + Action = True Guidance

Every deviant group falls into one of these categories. This verse protects us from both extremes.

After this, say "Ameen." The Prophet ﷺ said: "When the Imam says 'wa la ad-dalleen,' say 'Ameen,' for whoever's Ameen coincides with the angels' will have past sins forgiven" (Bukhari).`,
    },
  ],

  // ──────────────────────────────────────────────────────────
  // SURAH 2: AL-BAQARAH (Samples: 1, 255, 286)
  // ──────────────────────────────────────────────────────────
  2: [
    {
      number: 1,
      arabic: "الم",
      translation: "Alif, Lam, Meem",
      transliteration: "Alif Lam Meem",
      tafsir: `These are "Huroof Muqatta'at" — disjointed letters at the beginning of 29 surahs.

**What Do They Mean?**
Only Allah knows with certainty. Possible wisdoms:
1. Attention grabbers for the Arabs
2. Proof of Quran's inimitability — made from same letters they use
3. Among the unseen knowledge

After these letters, Allah mentions "THE BOOK"- as if to say: "This Quran is made from these simple letters (Alif, Lam, Meem), yet you cannot produce anything like it."`,
    },
    // Generate placeholders for ayat 2-254
    ...Array.from({ length: 253 }, (_, i) => ({
      number: i + 2,
      arabic: `آية ${i + 2} من سورة البقرة`,
      translation: `Ayah ${i + 2} of Surah Al-Baqarah`,
      transliteration: "",
      tafsir: "", // Coming soon
    })),
    {
      number: 255,
      arabic:
        "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ",
      translation:
        "Allah - there is no deity except Him, the Ever-Living, the Sustainer. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and whatever is on the earth. Who is it that can intercede with Him except by His permission? He knows what is before them and what will be after them, and they encompass not a thing of His knowledge except for what He wills. His Kursi extends over the heavens and the earth, and their preservation tires Him not. And He is the Most High, the Most Great.",
      transliteration: "Allahu la ilaha illa huwa al-hayyu al-qayyoom...",
      tafsir: `**AYAT AL-KURSI** — The greatest verse in the Quran.

The Prophet ﷺ said: "The greatest verse in the Quran is Ayat al-Kursi" (Muslim).

**Why Is It Greatest?**
Most comprehensive description of Allah's attributes in a single verse.

**Al-Hayy (Ever-Living):** Perfect life with no beginning or end.

**Al-Qayyoom (Sustainer):** Establishes, maintains, and sustains everything.

**No Sleep:** Unlike creation, Allah never tires. If He did, the universe would collapse.

**Perfect Knowledge:** He knows past, present, future — nothing escapes Him.

**The Kursi:** Ibn Abbas said it's the footstool. The Prophet ﷺ said the seven heavens compared to the Kursi are like a ring in a desert.

**Blessings:**
- Recite before sleep → protected until morning (Bukhari)
- Recite after prayer → nothing prevents Paradise except death (Authentic)

Revealed from a treasure beneath the Throne that no prophet before received.`,
    },
    // Placeholders for 256-285
    ...Array.from({ length: 30 }, (_, i) => ({
      number: i + 256,
      arabic: `آية ${i + 256} من سورة البقرة`,
      translation: `Ayah ${i + 256} of Surah Al-Baqarah`,
      transliteration: "",
      tafsir: "",
    })),
    {
      number: 286,
      arabic:
        "لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا ۚ لَهَا مَا كَسَبَتْ وَعَلَيْهَا مَا اكْتَسَبَتْ ۗ رَبَّنَا لَا تُؤَاخِذْنَا إِن نَّسِينَا أَوْ أَخْطَأْنَا ۚ رَبَّنَا وَلَا تَحْمِلْ عَلَيْنَا إِصْرًا كَمَا حَمَلْتَهُ عَلَى الَّذِينَ مِن قَبْلِنَا ۚ رَبَّنَا وَلَا تُحَمِّلْنَا مَا لَا طَاقَةَ لَنَا بِهِ ۖ وَاعْفُ عَنَّا وَاغْفِرْ لَنَا وَارْحَمْنَا ۚ أَنتَ مَوْلَانَا فَانصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ",
      translation:
        "Allah does not burden a soul beyond that it can bear. For it is what it has earned, and against it is what it has earned. Our Lord, do not take us to account if we forget or make a mistake. Our Lord, do not place upon us a burden like that which You placed upon those before us. Our Lord, do not burden us with that which we have no ability to bear. And pardon us, and forgive us, and have mercy upon us. You are our protector, so give us victory over the disbelieving people.",
      transliteration: "La yukallifu Allahu nafsan illa wus'aha...",
      tafsir: `The final verse of Al-Baqarah with powerful supplications.

**Allah Does Not Burden Beyond Capacity:**
Perfect mercy. He tests but never breaks us.

**Five Accepted Duas:**
When you recite each, Allah says "I have done so" (Muslim):

1. **"Don't punish for mistakes"** → Accepted
2. **"Don't burden us like previous nations"** → Accepted (our shariah is easier)
3. **"Don't burden beyond ability"** → Accepted
4. **"Pardon, forgive, have mercy"** → Three levels of seeking mercy
5. **"You are our Protector, give victory"** → When Allah is your Mawla, who can defeat you?

**The Power of This Verse:**
The Prophet ﷺ said: "Whoever recites the last two verses of Al-Baqarah at night, they will suffice him" (Bukhari, Muslim) — protection, blessing, acceptance.

Recite these verses every night. The Prophet ﷺ never missed them.`,
    },
  ],
};

// ══════════════════════════════════════════════════════════════
// SERVICE FUNCTIONS
// ══════════════════════════════════════════════════════════════

export const quranService = {
  getSurahs: async ({ search = "" } = {}) => {
    await mockDelay(400);
    let results = [...SURAHS];

    if (search.trim()) {
      const q = search.toLowerCase();
      results = results.filter(
        (s) =>
          s.nameEn.toLowerCase().includes(q) ||
          s.nameAr.includes(q) ||
          s.transliteration.toLowerCase().includes(q) ||
          String(s.number).includes(q),
      );
    }

    return { success: true, data: results };
  },

  getAyat: async (surahNumber) => {
    await mockDelay(500);

    const surah = SURAHS.find((s) => s.number === surahNumber);
    if (!surah) throw new Error("Surah not found");

    const ayat = AYAT_DATABASE[surahNumber] || [];

    return {
      success: true,
      data: ayat,
      surah: surah,
    };
  },

  getAyahDetail: async (surahNumber, ayahNumber) => {
    await mockDelay(300);

    const surah = SURAHS.find((s) => s.number === surahNumber);
    if (!surah) throw new Error("Surah not found");

    const ayat = AYAT_DATABASE[surahNumber] || [];
    const ayah = ayat.find((a) => a.number === ayahNumber);

    if (!ayah) throw new Error("Ayah not found");

    return {
      success: true,
      data: ayah,
      surah: surah,
    };
  },

  getFeaturedAyat: async () => {
    await mockDelay(350);
    const ayah = AYAT_DATABASE[2]?.find((a) => a.number === 255);
    const surah = SURAHS.find((s) => s.number === 2);

    return {
      success: true,
      data: ayah ? [{ ...ayah, surah }] : [],
    };
  },
};
