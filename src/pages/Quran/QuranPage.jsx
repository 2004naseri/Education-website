// src/pages/Quran/QuranPage.jsx
// ============================================================
// QuranPage — NurPath
//
// Two views:
//   1. Surah browser (default) — grid of all 114 surahs
//   2. Ayat view — when surah selected, shows all ayat
//
// Layout (Surah browser):
//   - BismillahBanner
//   - SearchBar (filter surahs by name/number)
//   - Surah grid — 114 cards
//
// Layout (Ayat view):
//   - Surah header (name, info, back button)
//   - Ayat list — AyatCard × N
// ============================================================

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, BookOpen, MapPin } from "lucide-react";

// ── Services ──────────────────────────────────────────────────
import { quranService } from "../../services/quran.service";
import { queryKeys } from "../../services/querykeys";

// ── Data ──────────────────────────────────────────────────────
import { SURAHS } from "../../data/quranMeta";

// ── Components ────────────────────────────────────────────────
import BismillahBanner from "../../components/sections/BismillahBanner";
import SectionTitle from "../../components/sections/SectionTitle";
import SearchBar from "../../components/ui/SearchBar";
import AyatCard from "../../components/cards/AyatCard";
import Badge from "../../components/ui/Badge";
import { cn } from "../../utils/cn";

// ============================================================
// COMPONENT — Surah Card (for grid browser)
// ============================================================
const SurahCard = ({ surah }) => {
  const { number, nameEn, nameAr, transliteration, ayat, type, juz } = surah;

  return (
    <Link
      to={`/quran/${number}`}
      className="card-interactive group p-5 flex items-start gap-4"
      aria-label={`Read Surah ${nameEn}`}
    >
      {/* Number badge */}
      <div
        className="shrink-0 w-12 h-12 rounded-xl bg-primary-soft border border-primary/10
                      flex items-center justify-center
                      group-hover:bg-primary group-hover:border-primary
                      transition-all duration-300"
      >
        <span
          className="font-display text-lg font-bold text-primary
                         group-hover:text-snow transition-colors duration-300"
        >
          {number}
        </span>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <div className="flex-1 min-w-0">
            <h3
              className="font-display text-lg font-normal text-ink leading-tight mb-0.5
                           group-hover:text-primary transition-colors duration-200 truncate"
            >
              {nameEn}
            </h3>
            <p className="font-body text-xs text-muted">{transliteration}</p>
          </div>
          <Badge variant={type === "Meccan" ? "accent" : "primary"}>
            {type}
          </Badge>
        </div>

        {/* Arabic name */}
        <p
          className="font-arabic text-base text-accent mb-2 text-right leading-loose"
          dir="rtl"
          lang="ar"
        >
          {nameAr}
        </p>

        {/* Meta */}
        <div className="flex items-center gap-3 text-xs text-muted font-body">
          <span className="flex items-center gap-1">
            <BookOpen size={11} aria-hidden="true" />
            {ayat} ayat
          </span>
          <span className="flex items-center gap-1">
            <MapPin size={11} aria-hidden="true" />
            Juz {juz}
          </span>
        </div>
      </div>
    </Link>
  );
};

// ============================================================
// VIEW — Surah Browser (grid of all surahs)
// ============================================================
const SurahBrowser = () => {
  const [search, setSearch] = useState("");

  // Filter surahs by search
  const filteredSurahs = SURAHS.filter(
    (s) =>
      !search ||
      s.nameEn.toLowerCase().includes(search.toLowerCase()) ||
      s.nameAr.includes(search) ||
      s.transliteration.toLowerCase().includes(search.toLowerCase()) ||
      String(s.number).includes(search),
  );

  return (
    <>
      {/* ── Bismillah banner ──────────────────────────────── */}
      <BismillahBanner
        variant="default"
        verseArabic="إِنَّا نَحْنُ نَزَّلْنَا الذِّكْرَ وَإِنَّا لَهُ لَحَافِظُونَ"
        verseTranslation="Indeed, it is We who sent down the Quran and indeed, We will be its guardian"
        verseRef="Al-Hijr 15:9"
      />

      <div className="bg-background min-h-screen">
        <div className="container-custom py-12">
          {/* ── Page heading ──────────────────────────────── */}
          <div className="mb-10">
            <SectionTitle
              eyebrow="القرآن الكريم"
              title="The Noble Quran"
              subtitle="Read, reflect, and understand the eternal words of Allah — 114 surahs, 6,236 ayat"
              align="left"
            />
          </div>

          {/* ── Search bar ────────────────────────────────── */}
          <div className="mb-8 max-w-xl">
            <SearchBar
              value={search}
              onSearch={setSearch}
              placeholder="Search by surah name, number, or transliteration..."
              size="lg"
            />
          </div>

          {/* ── Stats ──────────────────────────────────────── */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
            {[
              { label: "Total Surahs", value: "114", icon: "📖" },
              { label: "Total Ayat", value: "6,236", icon: "✨" },
              { label: "Meccan", value: "86", icon: "🕋" },
              { label: "Medinan", value: "28", icon: "🕌" },
            ].map((stat) => (
              <div key={stat.label} className="card p-4 text-center">
                <span className="text-2xl mb-2 block" aria-hidden="true">
                  {stat.icon}
                </span>
                <p className="font-display text-2xl text-ink font-light mb-1">
                  {stat.value}
                </p>
                <p className="font-body text-xs text-muted">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* ── Surah grid ────────────────────────────────── */}
          {filteredSurahs.length === 0 ? (
            <div className="text-center py-24">
              <p
                className="font-arabic text-5xl text-accent/30 mb-4"
                aria-hidden="true"
              >
                ؟
              </p>
              <h3 className="heading-sm text-ink mb-2">No surahs found</h3>
              <p className="text-body">Try a different search term</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredSurahs.map((surah, i) => (
                <div
                  key={surah.number}
                  className={`animate-slide-up stagger-${Math.min((i % 6) + 1, 6)}`}
                >
                  <SurahCard surah={surah} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

// ============================================================
// VIEW — Ayat List (single surah)
// ============================================================
const AyatView = ({ surahNumber }) => {
  const navigate = useNavigate();

  // ── Fetch ayat ────────────────────────────────────────────
  const { data, isLoading } = useQuery({
    queryKey: queryKeys.quran.ayat(surahNumber),
    queryFn: () => quranService.getAyat(surahNumber),
  });

  const ayat = data?.data ?? [];
  const surah = data?.surah ?? SURAHS.find((s) => s.number === surahNumber);

  if (!surah) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-body text-error mb-4">Surah not found</p>
          <button onClick={() => navigate("/quran")} className="btn-secondary">
            Back to Quran
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      <div className="container-custom py-12">
        {/* ── Back button + Surah header ────────────────── */}
        <div className="mb-10">
          <button
            onClick={() => navigate("/quran")}
            className="btn-ghost mb-6 -ml-4"
          >
            <ArrowLeft size={16} /> Back to Quran
          </button>

          <div className="card p-6 sm:p-8 bg-primary-soft border-primary/20">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center">
                  <span className="font-display text-xl font-bold text-snow">
                    {surah.number}
                  </span>
                </div>
                <div>
                  <h1 className="font-display text-2xl sm:text-3xl font-normal text-ink leading-tight mb-1">
                    {surah.nameEn}
                  </h1>
                  <p className="font-body text-sm text-soft">
                    {surah.transliteration}
                  </p>
                </div>
              </div>
              <Badge variant={surah.type === "Meccan" ? "accent" : "primary"}>
                {surah.type}
              </Badge>
            </div>

            <p
              className="font-arabic text-2xl text-accent text-right leading-loose mb-4"
              dir="rtl"
              lang="ar"
            >
              {surah.nameAr}
            </p>

            <div className="flex items-center gap-4 text-sm text-soft font-body">
              <span className="flex items-center gap-1.5">
                <BookOpen size={14} aria-hidden="true" />
                {surah.ayat} ayat
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin size={14} aria-hidden="true" />
                Juz {surah.juz}
              </span>
            </div>
          </div>
        </div>

        {/* ── Ayat list ──────────────────────────────────── */}
        {isLoading ? (
          <div className="space-y-5">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="skeleton h-64 rounded-[var(--radius-xl)]"
              />
            ))}
          </div>
        ) : ayat.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-body text-muted">
              No ayat available for this surah
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {ayat.map((a, i) => (
              <div
                key={a.number}
                className={`animate-slide-up stagger-${Math.min((i % 6) + 1, 6)}`}
              >
                <AyatCard ayat={a} surah={surah} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================================
// MAIN — QuranPage
// ============================================================
const QuranPage = () => {
  const { surahNumber } = useParams();
  const surahNum = surahNumber ? parseInt(surahNumber, 10) : null;

  // Show ayat view if surahNumber in URL, otherwise show browser
  return surahNum ? <AyatView surahNumber={surahNum} /> : <SurahBrowser />;
};

export default QuranPage;
