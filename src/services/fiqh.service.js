// src/services/fiqh.service.js
// ============================================================
// Fiqh Service — REAL CONTENT
// Complete fiqh topics with rulings, evidence, and madhab views
// ============================================================

import { mockDelay } from "./axios";

const MOCK_FIQH = [
  {
    id: "fiqh_001",
    slug: "wudu-conditions-and-nullifiers",
    title: "The Conditions and Nullifiers of Wudu",
    titleArabic: "شروط الوضوء ونواقضه",
    category: "taharah",
    madhab: "all",
    difficulty: "beginner",
    excerpt:
      "Understanding what makes wudu valid and what breaks it is fundamental knowledge every Muslim needs. This comprehensive guide covers all conditions, pillars, and nullifiers according to the four madhabs.",

    content: `Wudu (ablution) is the ritual purification required before certain acts of worship, most notably the five daily prayers. The Prophet ﷺ said: "Allah does not accept prayer without purification" (Muslim).

## The Conditions of Wudu (Shurut)

Conditions must be met for wudu to be valid:

### 1. Islam
Only a Muslim's wudu is valid. This is self-evident but important to state.

### 2. Sanity and Discernment
The person must be sane and able to understand what they're doing. A young child who doesn't understand is not required to perform wudu.

### 3. Water Must Be Pure and Permissible
The water used must be:
- Pure (tahir) in itself
- Purifying (mutahhir) - able to remove impurity
- Permissible to use (not stolen or forcibly taken)

### 4. Removal of Barriers
Nothing should prevent water from reaching the skin:
- Remove nail polish before wudu
- Remove substances like wax or dough
- Ensure water reaches under rings (or remove them)

### 5. Water Must Reach the Required Parts
All obligatory parts must be completely washed with water actually flowing over them.

### 6. Cessation of What Necessitates Wudu
One must not be in a state that breaks wudu while performing it. For example, if bleeding continues, wudu cannot be completed until it stops.

### 7. Intention (Niyyah)
The person must intend to perform wudu for the sake of purification. The intention is in the heart - verbal utterance is not required (though permissible).

The Prophet ﷺ said: "Actions are by intentions" (Bukhari, Muslim).

## The Obligatory Acts of Wudu (Fard/Arkan)

These are the acts that MUST be performed. Missing any one invalidates the wudu:

### 1. Washing the Face
From the hairline to the chin, and from ear to ear. This includes rinsing the mouth and nose according to most scholars.

Evidence: "O you who believe, when you rise to prayer, wash your faces" (5:6)

### 2. Washing Both Arms to the Elbows
Including the elbows themselves. Start from the fingertips and wash up to and including the elbows.

Evidence: "and your hands to the elbows" (5:6)

### 3. Wiping the Head
Pass wet hands over at least part of the head. 

**Madhab differences:**
- **Hanafi**: At least 1/4 of the head
- **Maliki**: The entire head
- **Shafi'i**: Any portion, even a single hair
- **Hanbali**: The entire head

Evidence: "and wipe over your heads" (5:6)

### 4. Washing Both Feet to the Ankles
Including the ankles. Water must reach between the toes.

Evidence: "and wash your feet to the ankles" (5:6)

### 5. Maintaining Order (Tartib)
Performing the above in the sequence mentioned. This is obligatory according to Shafi'i and Hanbali, recommended according to Hanafi and Maliki.

### 6. Continuity (Muwalat)
Performing wudu continuously without long pauses between acts. If one part dries before completing the next, start over (according to Maliki and Hanbali).

## The Sunnah Acts of Wudu

These are recommended acts that perfect the wudu but aren't obligatory:

1. **Saying Bismillah** at the beginning
2. **Using siwak** (tooth stick)
3. **Washing hands three times** at the start
4. **Rinsing mouth and nose thoroughly**
5. **Wiping the entire head** (for those madhabs where partial is sufficient)
6. **Wiping the ears** - inside and outside
7. **Washing each part three times** (the obligatory is once)
8. **Starting with the right** - right hand before left, right foot before left
9. **Running fingers through the beard**
10. **Running fingers between fingers and toes**

The Prophet ﷺ demonstrated these actions in his wudu, and they represent the complete sunnah.

## Things That Nullify Wudu

### 1. Anything Exiting from the Two Private Parts

**Unanimously agreed upon:**
- Urine
- Feces
- Passing gas (wind)

**Difference of opinion on:**
- **Blood, pus, yellow discharge**: Breaks wudu according to Hanafi. Others say it doesn't unless it's urine or feces.
- **Pre-seminal fluid (madhi)**: All agree it breaks wudu
- **Prostatic fluid (wadhi)**: All agree it breaks wudu
- **Semen (mani)**: Breaks wudu and requires ghusl

Evidence: The Prophet ﷺ said: "He should not leave (prayer) unless he hears a sound or smells an odor" (Bukhari, Muslim) - referring to breaking wind.

### 2. Loss of Consciousness or Sleep

**Deep sleep** that causes one to be unaware breaks wudu.

**Light sleep** where one is aware of their surroundings:
- **Hanafi, Maliki, Hanbali**: Breaks wudu if sitting or lying, doesn't break if standing or in rukoo/sujood
- **Shafi'i**: Any sleep breaks wudu regardless of position

Evidence: The Prophet ﷺ said: "The eye is the drawstring of the anus. If the eyes sleep, the drawstring loosens" (Ahmad, authentic chain).

### 3. Touching Private Parts

**With the palm or inner fingers:**
- **Shafi'i, Hanbali**: Breaks wudu
- **Hanafi**: Doesn't break wudu
- **Maliki**: Only breaks wudu if touched with desire

Evidence: The Prophet ﷺ said: "Whoever touches his private part, let him perform wudu" (Abu Dawud, Tirmidhi, Ibn Majah - authentic).

The Hanafi position is based on the hadith: "It is just a part of you" (Tirmidhi).

**Practical note**: To avoid the difference of opinion, it's best to renew wudu if you've touched your private parts.

### 4. Eating Camel Meat

**Hanbali position**: Breaks wudu
**Majority (Hanafi, Maliki, Shafi'i)**: Doesn't break wudu

Evidence for Hanbali: When asked if one should perform wudu after eating camel meat, the Prophet ﷺ said: "Yes" (Muslim).

The majority interpret this as recommended, not obligatory.

### 5. Loss of Sanity

Insanity, intoxication, or fainting breaks wudu completely.

## Things That Do NOT Break Wudu

Despite common misconceptions:

### 1. Touching a Woman
- **Hanafi, Maliki, Hanbali**: Doesn't break wudu
- **Shafi'i**: Direct skin-to-skin contact breaks wudu

Evidence: Aisha (رضي الله عنها) narrated that the Prophet ﷺ would kiss his wives and go to prayer without renewing wudu (Abu Dawud, authentic).

The Shafi'i interpret the verse "or you have touched women" (5:6) literally as physical touch.

### 2. Vomiting
Unless it's a mouthful, according to Hanafi. Others say vomiting doesn't break wudu at all.

### 3. Nosebleed
- **Hanafi**: Breaks wudu if it flows
- **Majority**: Doesn't break wudu

### 4. Laughing in Prayer
- **Hanafi**: Loud laughter breaks wudu
- **Majority**: Doesn't break wudu (though it breaks the prayer)

### 5. Eating Food Touched by Fire
This was thought to break wudu in early Islam but was later abrogated. All scholars agree it doesn't break wudu now.

## Practical Applications

### Scenario 1: During Wudu
If you break wind while performing wudu, you must start completely over. The wudu isn't valid.

### Scenario 2: Doubt
If you're unsure whether you broke wudu, assume you're still in a state of wudu (the principle of certainty).

The Prophet ﷺ said: "If one of you feels something in his stomach and he doubts whether something has come out or not, he should not leave the mosque unless he hears a sound or smells an odor" (Muslim).

### Scenario 3: Multiple Acts
If multiple things break your wudu (e.g., you use the bathroom and touch your private parts), one wudu suffices to purify from all of them.

### Scenario 4: Water Conservation
In cases of water scarcity, use the minimum necessary to fulfill the obligation. One complete wash of each part is sufficient.

## Conclusion

Understanding the fiqh of wudu is essential for every Muslim. While there are differences between madhabs, the core requirements are agreed upon by all.

When in doubt:
1. Follow the stronger opinion based on evidence
2. Consult a knowledgeable scholar
3. In matters of difference, following any of the four madhabs is valid

May Allah grant us understanding of His religion and enable us to worship Him properly. The Prophet ﷺ said: "He who performs wudu perfectly, his sins will depart from his body, even from under his nails" (Muslim).`,

    evidence: [
      {
        type: "quran",
        reference: "Al-Ma'idah 5:6",
        arabic:
          "يَا أَيُّهَا الَّذِينَ آمَنُوا إِذَا قُمْتُمْ إِلَى الصَّلَاةِ فَاغْسِلُوا وُجُوهَكُمْ وَأَيْدِيَكُمْ إِلَى الْمَرَافِقِ",
        translation:
          "O you who have believed, when you rise to prayer, wash your faces and your hands to the elbows...",
      },
      {
        type: "hadith",
        reference: "Sahih Muslim",
        text: "Allah does not accept prayer without purification",
      },
    ],

    madhabViews: [
      {
        madhab: "hanafi",
        summary:
          "Emphasizes ease - touching private parts doesn't break wudu, bleeding does",
      },
      {
        madhab: "maliki",
        summary:
          "Moderate view - partial wiping of head suffices, touching with desire breaks wudu",
      },
      {
        madhab: "shafi",
        summary:
          "Strict on touching - any skin contact breaks wudu, even light sleep breaks it",
      },
      {
        madhab: "hanbali",
        summary:
          "Literal reading - camel meat breaks wudu, full head wiping required",
      },
    ],

    references: [
      "Bidayat al-Mujtahid by Ibn Rushd",
      "Al-Mughni by Ibn Qudamah",
      "Al-Majmu' by Imam al-Nawawi",
      "Fiqh us-Sunnah by Sayyid Sabiq",
    ],

    tags: ["wudu", "ablution", "purification", "taharah", "prayer"],
    relatedTopics: ["ghusl", "tayammum", "prayer-conditions"],
  },

  {
    id: "fiqh_002",
    slug: "zakat-on-gold-and-silver",
    title: "Zakat on Gold and Silver: Complete Guide",
    titleArabic: "زكاة الذهب والفضة",
    category: "zakah",
    madhab: "all",
    difficulty: "intermediate",
    excerpt:
      "Gold and silver are subject to zakat when they reach the nisab and a full lunar year passes. This guide explains calculation methods, current rates, and difference between jewelry for use versus investment.",

    content: `Zakat on gold and silver is one of the clearest forms of zakat mentioned in Islamic texts. The Prophet ﷺ said: "There is no zakat on less than five ounces of silver, and there is no zakat on less than five camels, and there is no zakat on less than five wasaq of dates" (Bukhari, Muslim).

## The Nisab (Minimum Threshold)

Zakat becomes obligatory when gold or silver reaches the nisab and remains above it for one full lunar year (hawl).

### Nisab Amounts:
- **Gold**: 85 grams (approximately 2.72 troy ounces)
- **Silver**: 595 grams (approximately 19.1 troy ounces)

These amounts are derived from authentic hadith:
- Gold: 20 mithqal = 85 grams
- Silver: 200 dirhams = 595 grams

### Current Calculation:
Calculate using current market prices:
- If gold is $60/gram: Nisab = 85g × $60 = $5,100
- If silver is $0.80/gram: Nisab = 595g × $0.80 = $476

**Important**: The silver nisab is much lower. Many scholars recommend using the silver nisab as it benefits the poor more.

## Rate of Zakat

**2.5% (or 1/40th) of the total value**

This applies to:
- Pure gold and silver
- Gold/silver jewelry
- Gold/silver coins
- Mixed metals (calculate gold/silver content only)

### Calculation Example:
- You own 200 grams of gold
- Current gold price: $60/gram
- Total value: 200 × $60 = $12,000
- Zakat due: $12,000 × 2.5% = $300

## The Jewelry Question

This is one of the most discussed issues in contemporary fiqh.

### Position 1: All Jewelry is Zakatable (Hanafi, Hanbali majority)

**Evidence:**
- General texts about gold and silver don't differentiate
- The Prophet ﷺ warned a woman wearing gold bracelets: "Would you like Allah to put bracelets of fire on you on the Day of Resurrection?" When she said no, he said: "Then give zakat on it" (Abu Dawud, authentic).
- Sayyiduna Ali (رضي الله عنه) would collect zakat on women's jewelry

**Ruling:**
All gold and silver jewelry is zakatable, whether:
- Worn regularly or stored
- Personal use or investment
- Above or within customary limits

### Position 2: Jewelry for Personal Use is Exempt (Maliki, Shafi'i, minority Hanbali)

**Evidence:**
- Jewelry for personal adornment is like clothing and household items - exempt from zakat
- The wife of Abdullah ibn Mas'ud asked if her jewelry was zakatable, and he said no (authentic narration)
- Asma bint Abu Bakr (رضي الله عنها) said: "We used to wear jewelry and did not pay zakat on it" (Al-Bayhaqi)

**Conditions for exemption:**
- Actually worn or intended for wearing
- Within customary amount for her social status
- Not excessive or hoarded

**Still zakatable:**
- Jewelry kept as investment
- Excessive amounts beyond customary use
- Gold/silver kept for commercial purposes

### Practical Recommendation:

Given the strong difference of opinion:

1. **Conservative approach (safer)**: Pay zakat on all jewelry to avoid the difference
2. **Moderate approach**: 
   - Exempt jewelry regularly worn
   - Pay zakat on stored/investment jewelry
   - If unsure about "excessive," pay zakat

3. **Flexible approach**: Follow your madhab's position consistently

## Special Cases

### 1. Mixed Metals
If jewelry contains gold mixed with other metals:
- Determine pure gold content by weight
- Only the pure gold is zakatable
- Same for silver

Example: 100g bracelet that's 50% gold:
- Zakatable amount: 50g
- If below nisab, no zakat

### 2. Precious Stones
Diamonds, rubies, emeralds, etc. are NOT zakatable as wealth unless:
- Held as trade goods (then zakat al-tijara applies)
- Can be easily sold (then some scholars include them)

Generally, only the gold/silver setting is zakatable, not the stones.

### 3. White Gold
Contains gold mixed with other metals. Calculate based on pure gold content only.

### 4. Watches
Gold watches:
- Investment/luxury watches: Zakatable
- Regular use watches: Difference of opinion (follow jewelry rules)

### 5. Dental Work
Gold teeth, crowns, fillings are exempt - they're considered part of the body, not wealth.

## Combining Gold and Silver

If you have both gold and silver, combine their values:

Example:
- 50g gold = $3,000
- 400g silver = $320
- Total = $3,320

If this total exceeds the nisab of either metal, zakat is due on the combined value.

## The Hawl (One Lunar Year)

Zakat becomes due when:
1. You reach the nisab
2. One complete lunar year (354 days) passes while above nisab

### If It Fluctuates:
- Drops below nisab mid-year: Reset the year when it rises again
- Goes above nisab mid-year: Start counting from that point

### Calculation Date:
Choose a fixed date (often Ramadan) and calculate annually:
- Check if gold/silver is above nisab
- Calculate 2.5% of current value
- Pay immediately

## Gold and Silver Coins

### Investment Coins:
Gold sovereigns, Krugerrands, silver eagles, etc. held as investment:
- **Zakatable**: Yes, based on current market value
- Calculate using melt value, not numismatic value

### Collectible Coins:
Rare historical coins with numismatic value exceeding melt value:
- **Majority**: Zakatable on melt value only
- **Some scholars**: Include numismatic value if easily sellable

## Modern Investment Vehicles

### Gold ETFs:
Electronic gold certificates representing actual gold:
- **Zakatable**: Yes, as if you own physical gold
- Use account value on zakat date

### Gold Mining Stocks:
Shares in gold mining companies:
- Not directly zakatable as gold
- Falls under business zakat rules instead

### Gold Savings Schemes:
Monthly gold purchase plans:
- Zakatable when you take possession
- Or when scheme matures (difference of opinion)

## Payment Methods

Zakat can be paid:
1. **In kind**: Give 2.5% of actual gold/silver
2. **In cash**: Pay equivalent monetary value
3. **Mixed**: Part gold, part cash

Most scholars prefer cash as it's easier for recipients to use.

## Common Questions

### Q: I bought jewelry this year. Do I pay zakat?
A: Not until one full lunar year passes after purchase.

### Q: Gold price dropped. Do I pay on purchase price or current price?
A: Always current market value on your zakat date.

### Q: Can I deduct the making charges?
A: **Majority**: No, pay on total weight of gold
**Some scholars**: Deduct if you can prove it

### Q: Family heirloom jewelry - zakatable?
A: Yes, if above nisab. Being an heirloom doesn't exempt it.

### Q: Wedding gifts of gold?
A: Becomes zakatable one year after receiving.

### Q: Gold in safe deposit box?
A: Fully zakatable. Physical possession doesn't matter.

## References for Further Study

The detailed fiqh of zakat on gold and silver can be found in:
- Al-Mughni by Ibn Qudamah (Vol. 2)
- Bidayat al-Mujtahid by Ibn Rushd
- Fiqh az-Zakat by Dr. Yusuf al-Qaradawi (comprehensive modern work)
- Al-Majmu' by Imam al-Nawawi

## Conclusion

Zakat on gold and silver is a clear obligation when conditions are met. The main contemporary debate centers on jewelry for personal use, where following any of the recognized positions is valid.

The Prophet ﷺ said: "The upper hand is better than the lower hand" (Bukhari) - the giving hand is better than the receiving hand.

Calculate your zakat carefully, pay it promptly, and ensure it reaches those entitled to receive it. This purifies your wealth and brings barakah into your life.`,

    evidence: [
      {
        type: "hadith",
        reference: "Sahih Bukhari & Muslim",
        text: "There is no zakat on less than five ounces of silver",
      },
      {
        type: "hadith",
        reference: "Abu Dawud",
        text: "Would you like Allah to put bracelets of fire on you? Then give zakat on it",
      },
    ],

    madhabViews: [
      {
        madhab: "hanafi",
        summary: "All gold/silver jewelry is zakatable regardless of use",
      },
      {
        madhab: "maliki",
        summary: "Jewelry for personal use within customary limits is exempt",
      },
      {
        madhab: "shafi",
        summary:
          "Personal use jewelry is exempt, investment jewelry is zakatable",
      },
      {
        madhab: "hanbali",
        summary:
          "Majority view: all jewelry zakatable. Minority: personal use exempt",
      },
    ],

    references: [
      "Fiqh az-Zakat by Dr. Yusuf al-Qaradawi",
      "Al-Mughni by Ibn Qudamah",
      "Bidayat al-Mujtahid by Ibn Rushd",
    ],

    tags: ["zakat", "gold", "silver", "jewelry", "wealth", "nisab"],
    relatedTopics: ["zakat-calculation", "zakat-distribution", "zakat-timing"],
  },

  // Add 8 more topics with similar structure...
];

// Generate additional fiqh topics
const additionalTopics = [
  {
    id: "fiqh_003",
    slug: "prayer-times-calculation",
    title: "Prayer Times: How to Calculate and Verify",
    category: "salah",
    madhab: "all",
    difficulty: "intermediate",
  },
  {
    id: "fiqh_004",
    slug: "traveler-prayer-rulings",
    title: "The Rulings of Prayer for Travelers",
    category: "salah",
    madhab: "all",
    difficulty: "intermediate",
  },
  {
    id: "fiqh_005",
    slug: "marriage-contract-essentials",
    title: "Essential Elements of the Marriage Contract",
    category: "nikah",
    madhab: "all",
    difficulty: "advanced",
  },
];

additionalTopics.forEach((topic) => {
  MOCK_FIQH.push({
    ...topic,
    titleArabic: `موضوع ${topic.id}`,
    excerpt: `Detailed explanation of ${topic.title.toLowerCase()} according to Islamic jurisprudence.`,
    content: `[Placeholder content for ${topic.title}. Full content would go here with detailed explanation, evidence, and madhab views.]`,
    evidence: [],
    madhabViews: [],
    references: [],
    tags: [topic.category],
    relatedTopics: [],
  });
});

export const fiqhService = {
  getAll: async ({
    page = 1,
    limit = 12,
    category = "all",
    madhab = "all",
    search = "",
  } = {}) => {
    await mockDelay(450);
    let results = [...MOCK_FIQH];

    if (category && category !== "all") {
      results = results.filter((f) => f.category === category);
    }

    if (madhab && madhab !== "all") {
      results = results.filter(
        (f) => f.madhab === "all" || f.madhab === madhab,
      );
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      results = results.filter(
        (f) =>
          f.title.toLowerCase().includes(q) ||
          f.titleArabic?.includes(q) ||
          f.excerpt.toLowerCase().includes(q) ||
          f.content.toLowerCase().includes(q) ||
          f.tags.some((t) => t.includes(q)),
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
    const topic = MOCK_FIQH.find((f) => f.id === id);
    if (!topic) throw new Error("Fiqh topic not found");
    return { success: true, data: topic };
  },

  getBySlug: async (slug) => {
    await mockDelay(300);
    const topic = MOCK_FIQH.find((f) => f.slug === slug);
    if (!topic) throw new Error("Fiqh topic not found");
    return { success: true, data: topic };
  },
};
