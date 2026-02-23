// src/pages/Quran/QuranPage.jsx
// ============================================================
// QuranPage — NurPath
//
// Two views:
//   1. Surah browser    — grid of all 114 surahs
//   2. Ayat viewer      — selected surah's ayat list
//
// Layout (browser mode):
//   - BismillahBanner with Quran verse
//   - Search bar
//   - Surah grid (6 columns) — each shows number + name + info
//
// Layout (ayat viewer mode):
//   - Back button → returns to browser
//   - Surah header — name + info
//   - Ayat list — AyatCard × N
// ============================================================

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate, Link } from "react-router-dom";
import { BookOpen, ChevronLeft, Search } from "lucide-react";

// ── Services ──────────────────────────────────────────────────
import { quranService } from "../../services/quran.service";
import { queryKeys } from "../../services/querykeys";

// ── Components ────────────────────────────────────────────────
import BismillahBanner from "../../components/sections/Bismillahbanner";
import SectionTitle from "../../components/sections/SectionTitle";
import SearchBar from "../../components/ui/SearchBar";
import AyatCard from "../../components/cards/AyatCard";
import Badge from "../../components/ui/Badge";
import { cn } from "../../utils/cn";

// ── Skeleton ──────────────────────────────────────────────────
const SurahGridSkeleton = () => (
  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
    {Array.from({ length: 12 }).map((_, i) => (
      <div key={i} className="skeleton h-28 rounded-[var(--radius-xl)]" />
    ))}
  </div>
);

const AyatSkeleton = () => (
  <div className="space-y-5">
    {Array.from({ length: 5 }).map((_, i) => (
      <div key={i} className="skeleton h-48 rounded-[var(--radius-xl)]" />
    ))}
  </div>
);

// ============================================================
// Surah Browser — grid view
// ============================================================
const SurahBrowser = ({ surahs, search, onSearch }) => (
  <>
    <BismillahBanner
      variant="default"
      verseArabic="إِنَّا نَحْنُ نَزَّلْنَا الذِّكْرَ وَإِنَّا لَهُ لَحَافِظُونَ"
      verseTranslation="Indeed, it is We who sent down the Quran and indeed, We will be its guardian"
      verseRef="Al-Hijr 15:9"
    />

    <div className="bg-background min-h-screen">
      <div className="container-custom py-12">
        <div className="mb-10">
          <SectionTitle
            eyebrow="القرآن الكريم"
            title="The Holy Quran"
            subtitle="Read, reflect, and understand — 114 surahs with translation and tafsir"
            align="left"
          />
        </div>

        {/* Search */}
        <div className="mb-8 max-w-2xl">
          <SearchBar
            value={search}
            onSearch={onSearch}
            placeholder="Search surah by name or number..."
            size="lg"
          />
        </div>

        {/* Surah grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {surahs.map((surah, i) => (
            <Link
              key={surah.number}
              to={`/quran/${surah.number}`}
              className={cn(
                "card-interactive group p-4 flex flex-col items-center text-center gap-3",
                `animate-slide-up stagger-${Math.min((i % 6) + 1, 6)}`,
              )}
              aria-label={`Read ${surah.nameEn}`}
            >
              {/* Surah number badge */}
              <div
                className="w-12 h-12 rounded-xl bg-primary-soft border border-primary/10
                              flex items-center justify-center
                              group-hover:bg-primary group-hover:border-primary group-hover:text-primary-soft
                              transition-all duration-300"
              >
                <span
                  className="font-body text-lg font-bold text-primary
                                group-hover:text-snow transition-colors duration-300"
                >
                  {surah.number}
                </span>
              </div>

              {/* Arabic name */}
              <p
                className="font-arabic text-lg text-accent leading-loose"
                dir="rtl"
                lang="ar"
              >
                {surah.nameAr}
              </p>

              {/* English name */}
              <p
                className="font-body text-sm font-semibold text-ink
                            group-hover:text-primary transition-colors duration-200 leading-tight"
              >
                {surah.nameEn}
              </p>

              {/* Info row */}
              <div className="flex items-center gap-2 text-xs text-muted">
                <Badge variant={surah.type === "Meccan" ? "accent" : "primary"}>
                  {surah.type}
                </Badge>
                <span className="font-body">{surah.ayat} ayat</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-12 text-center">
          <p className="font-body text-sm text-muted">
            {surahs.length} surahs available
          </p>
        </div>
      </div>
    </div>
  </>
);

// ============================================================
// Ayat Viewer — single surah
// ============================================================
const AyatViewer = ({ surahNumber }) => {
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: queryKeys.quran.ayat(surahNumber),
    queryFn: () => quranService.getAyat(surahNumber),
  });

  const ayat = data?.data ?? [];
  const surah = data?.surah ?? null;

  if (isLoading) {
    return (
      <div className="bg-background min-h-screen">
        <div className="container-custom py-12">
          <div className="mb-8">
            <button
              type="button"
              onClick={() => navigate("/quran")}
              className="btn-ghost"
            >
              <ChevronLeft size={16} /> Back to Surahs
            </button>
          </div>
          <AyatSkeleton />
        </div>
      </div>
    );
  }

  if (!surah) {
    return (
      <div className="bg-background min-h-screen">
        <div className="container-custom py-12 text-center">
          <p className="text-body text-error mb-4">Surah not found</p>
          <button onClick={() => navigate("/quran")} className="btn-secondary">
            Back to Surahs
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Bismillah for this surah */}
      <BismillahBanner variant="default" />

      <div className="bg-background min-h-screen">
        <div className="container-custom py-12">
          {/* Back button */}
          <div className="mb-8">
            <button
              type="button"
              onClick={() => navigate("/quran")}
              className="btn-ghost"
            >
              <ChevronLeft size={16} /> Back to Surahs
            </button>
          </div>

          {/* Surah header */}
          <div className="mb-10 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div
                className="w-14 h-14 rounded-xl bg-primary-soft border border-primary/10
                              flex items-center justify-center"
              >
                <span className="font-body text-xl font-bold text-primary">
                  {surah.number}
                </span>
              </div>
            </div>

            <p
              className="font-arabic text-4xl text-accent mb-3 leading-loose"
              dir="rtl"
              lang="ar"
            >
              {surah.nameAr}
            </p>

            <h1 className="font-display text-3xl font-normal text-ink mb-2">
              {surah.nameEn}
            </h1>

            <p className="font-body text-sm text-soft mb-4">
              {surah.transliteration}
            </p>

            <div className="flex items-center justify-center gap-3 text-sm">
              <Badge variant={surah.type === "Meccan" ? "accent" : "primary"}>
                {surah.type}
              </Badge>
              <span className="font-body text-muted">
                <BookOpen
                  size={14}
                  className="inline mr-1"
                  aria-hidden="true"
                />
                {surah.ayat} ayat
              </span>
              <span className="font-body text-muted">Juz {surah.juz}</span>
            </div>
          </div>

          {/* Ayat list */}
          <div className="max-w-4xl mx-auto space-y-6">
            {ayat.map((ayatItem) => (
              <AyatCard key={ayatItem.number} ayat={ayatItem} surah={surah} />
            ))}
          </div>

          {/* Empty state */}
          {ayat.length === 0 && (
            <div className="text-center py-24">
              <p className="text-body text-muted">
                Ayat data not available yet for this surah.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

// ============================================================
// QuranPage — router
// ============================================================
const QuranPage = () => {
  const { surahNumber } = useParams();
  const [search, setSearch] = useState("");

  // Fetch all surahs for browser
  const { data, isLoading } = useQuery({
    queryKey: queryKeys.quran.surahs(),
    queryFn: () => quranService.getSurahs({ search }),
  });

  const surahs = data?.data ?? [];

  // If surahNumber in URL → show ayat viewer
  if (surahNumber) {
    return <AyatViewer surahNumber={parseInt(surahNumber, 10)} />;
  }

  // Otherwise → show surah browser
  if (isLoading) {
    return (
      <div className="bg-background min-h-screen">
        <div className="container-custom py-12">
          <SurahGridSkeleton />
        </div>
      </div>
    );
  }

  return <SurahBrowser surahs={surahs} search={search} onSearch={setSearch} />;
};

export default QuranPage;
