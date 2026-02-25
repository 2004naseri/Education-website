// src/pages/Quran/SurahDetailPage.jsx
// ============================================================
// SurahDetailPage — STUNNING UX REDESIGN
// Accordion-style: Click ayah → expands inline with tafsir
// No modals, smooth animations, perfect reading flow
// ============================================================

import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Info,
  Bookmark,
} from "lucide-react";

import { quranService } from "../../services/quran.service";
import { queryKeys } from "../../services/querykeys";

import BismillahBanner from "../../components/sections/BismillahBanner";
import ArabicText from "../../components/sections/ArabicText";
import Badge from "../../components/ui/Badge";
import { cn } from "../../utils/cn";

const SurahDetailPage = () => {
  const { surahNumber } = useParams();
  const navigate = useNavigate();
  const [expandedAyah, setExpandedAyah] = useState(null);

  const surahNum = parseInt(surahNumber, 10);

  // ── Fetch surah + all ayat ───────────────────────────────────
  const { data, isLoading } = useQuery({
    queryKey: queryKeys.quran.ayat(surahNum),
    queryFn: () => quranService.getAyat(surahNum),
  });

  const ayat = data?.data ?? [];
  const surah = data?.surah;

  const toggleAyah = (ayahNumber) => {
    setExpandedAyah(expandedAyah === ayahNumber ? null : ayahNumber);
  };

  if (isLoading || !surah) {
    return (
      <div className="bg-background min-h-screen">
        <div className="container-custom py-12">
          <div className="skeleton h-96" />
        </div>
      </div>
    );
  }

  return (
    <>
      <BismillahBanner variant="default" />

      <div className="bg-background min-h-screen">
        <div className="container-custom py-12">
          {/* Back button */}
          <button onClick={() => navigate("/quran")} className="btn-ghost mb-8">
            <ChevronLeft size={16} /> Back to Surahs
          </button>

          {/* ══ SURAH HEADER ══════════════════════════════════ */}
          <div className="mb-12">
            <div
              className="relative overflow-hidden rounded-[var(--radius-2xl)]
                            bg-gradient-to-br from-primary to-primary-dark p-8 sm:p-12"
            >
              {/* Pattern overlay */}
              <div className="absolute inset-0 pattern-geometric opacity-10" />

              {/* Content */}
              <div className="relative text-center">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <div
                    className="w-16 h-16 rounded-2xl bg-snow/20 backdrop-blur-sm
                                  border border-snow/30 flex items-center justify-center"
                  >
                    <span className="font-body text-2xl font-bold text-snow">
                      {surah.number}
                    </span>
                  </div>
                </div>

                <p
                  className="font-arabic text-5xl sm:text-6xl text-accent mb-4 leading-loose"
                  dir="rtl"
                  lang="ar"
                >
                  {surah.nameAr}
                </p>

                <h1 className="font-display text-4xl sm:text-5xl font-normal text-snow mb-3">
                  {surah.nameEn}
                </h1>

                <p className="font-body text-lg text-snow/80 mb-6">
                  {surah.transliteration}
                </p>

                <div className="flex items-center justify-center gap-4 flex-wrap">
                  <div
                    className="px-5 py-2 bg-snow/20 backdrop-blur-sm rounded-full
                                  border border-snow/30"
                  >
                    <span className="font-body text-sm font-semibold text-snow">
                      {surah.type === "Meccan" ? "🕋 Meccan" : "🕌 Medinan"}
                    </span>
                  </div>
                  <div
                    className="px-5 py-2 bg-snow/20 backdrop-blur-sm rounded-full
                                  border border-snow/30"
                  >
                    <span className="font-body text-sm font-semibold text-snow">
                      📖 {surah.ayat} Ayat
                    </span>
                  </div>
                  <div
                    className="px-5 py-2 bg-snow/20 backdrop-blur-sm rounded-full
                                  border border-snow/30"
                  >
                    <span className="font-body text-sm font-semibold text-snow">
                      📚 Juz {surah.juz}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ══ AYAT LIST — ACCORDION STYLE ═══════════════════ */}
          <div className="max-w-4xl mx-auto space-y-4">
            {ayat.length === 0 ? (
              <div
                className="text-center py-16 p-8 bg-surface border border-border 
                              rounded-[var(--radius-2xl)]"
              >
                <BookOpen size={48} className="mx-auto text-muted mb-4" />
                <p className="font-body text-lg text-soft mb-2">
                  Ayat data coming soon for this surah
                </p>
                <p className="font-body text-sm text-muted">
                  Check back later, insha'Allah
                </p>
              </div>
            ) : (
              ayat.map((ayah) => {
                const isExpanded = expandedAyah === ayah.number;
                const hasTafsir = ayah.tafsir && ayah.tafsir.trim() !== "";

                return (
                  <article
                    key={ayah.number}
                    className={cn(
                      "ayat-card transition-all duration-300",
                      isExpanded && "ring-2 ring-primary shadow-lg",
                    )}
                  >
                    {/* ── AYAH HEADER (Always visible) ──────────── */}
                    <div
                      className="cursor-pointer"
                      onClick={() => hasTafsir && toggleAyah(ayah.number)}
                    >
                      <div className="flex items-start justify-between gap-4 mb-4">
                        {/* Number badge */}
                        <div
                          className={cn(
                            "w-12 h-12 rounded-full flex items-center justify-center shrink-0",
                            "transition-all duration-200",
                            isExpanded
                              ? "bg-primary border-2 border-primary scale-110"
                              : "bg-primary-soft border border-primary/10",
                          )}
                        >
                          <span
                            className={cn(
                              "font-body text-base font-bold",
                              isExpanded ? "text-snow" : "text-primary",
                            )}
                          >
                            {ayah.number}
                          </span>
                        </div>

                        {/* Right side badges */}
                        <div className="flex items-center gap-2">
                          {hasTafsir ? (
                            <Badge
                              variant={isExpanded ? "primary" : "accent"}
                              className="text-xs"
                            >
                              <Info size={12} /> Tafsir
                            </Badge>
                          ) : (
                            <Badge variant="muted" className="text-xs">
                              Coming soon
                            </Badge>
                          )}
                          <button
                            className="w-8 h-8 rounded-full bg-surface hover:bg-accent-soft
                                       flex items-center justify-center transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                              // Bookmark functionality
                            }}
                            aria-label="Bookmark ayah"
                          >
                            <Bookmark size={14} className="text-muted" />
                          </button>
                        </div>
                      </div>

                      {/* Arabic text */}
                      <ArabicText
                        size="xl"
                        color="default"
                        className="mb-4 leading-[2.4] transition-all duration-300"
                      >
                        {ayah.arabic}
                      </ArabicText>

                      {/* Translation */}
                      <p className="font-body text-base text-soft leading-relaxed italic mb-3">
                        "{ayah.translation}"
                      </p>

                      {/* Transliteration */}
                      {ayah.transliteration && (
                        <p className="font-body text-sm text-muted mb-3">
                          {ayah.transliteration}
                        </p>
                      )}

                      {/* Expand/collapse hint */}
                      {hasTafsir && (
                        <div
                          className="flex items-center justify-center gap-2 pt-3 
                                        border-t border-border"
                        >
                          <p className="font-body text-xs text-primary font-medium">
                            {isExpanded ? "Hide tafsir" : "Read tafsir"}
                          </p>
                          {isExpanded ? (
                            <ChevronUp size={16} className="text-primary" />
                          ) : (
                            <ChevronDown size={16} className="text-primary" />
                          )}
                        </div>
                      )}
                    </div>

                    {/* ── EXPANDED CONTENT (Tafsir + extras) ──────── */}
                    <div
                      className={cn(
                        "overflow-hidden transition-all duration-500 ease-in-out",
                        isExpanded
                          ? "max-h-[5000px] opacity-100"
                          : "max-h-0 opacity-0",
                      )}
                    >
                      <div className="pt-6 mt-6 border-t-2 border-primary/20 space-y-6">
                        {/* Word by word */}
                        {ayah.wordByWord?.length > 0 && (
                          <div>
                            <h3
                              className="flex items-center gap-2 font-body text-sm 
                                           font-bold text-muted uppercase tracking-wider mb-4"
                            >
                              <span
                                className="w-6 h-6 rounded bg-accent-soft flex 
                                             items-center justify-center"
                              >
                                📝
                              </span>
                              Word by Word
                            </h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                              {ayah.wordByWord.map((word, i) => (
                                <div
                                  key={i}
                                  className="p-4 bg-accent-soft/30 border 
                                                        border-accent/10 rounded-lg text-center
                                                        hover:bg-accent-soft hover:border-accent/30
                                                        transition-all duration-200"
                                >
                                  <p
                                    className="font-arabic text-2xl text-accent mb-2"
                                    dir="rtl"
                                    lang="ar"
                                  >
                                    {word.arabic}
                                  </p>
                                  <p className="font-body text-xs text-soft">
                                    {word.meaning}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Tafsir */}
                        {hasTafsir && (
                          <div>
                            <h3
                              className="flex items-center gap-2 font-body text-sm 
                                           font-bold text-muted uppercase tracking-wider mb-4"
                            >
                              <span
                                className="w-6 h-6 rounded bg-primary-soft flex 
                                             items-center justify-center"
                              >
                                📖
                              </span>
                              Tafsir (Explanation)
                            </h3>
                            <div
                              className="p-6 bg-gradient-to-br from-primary-soft/50 to-accent-soft/20
                                            border border-primary/10 rounded-[var(--radius-lg)]"
                            >
                              <div className="prose-article">
                                <div
                                  className="font-body text-base text-ink leading-relaxed
                                                [&>p]:mb-4 [&>strong]:text-primary [&>strong]:font-semibold
                                                [&>ul]:mb-4 [&>ul]:list-disc [&>ul]:pl-6
                                                whitespace-pre-line"
                                >
                                  {ayah.tafsir}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })
            )}
          </div>

          {/* ══ BACK TO TOP BUTTON ═══════════════════════════ */}
          {ayat.length > 10 && (
            <div className="mt-12 text-center">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="btn-secondary inline-flex items-center gap-2"
              >
                <ChevronUp size={16} />
                Back to Top
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SurahDetailPage;
