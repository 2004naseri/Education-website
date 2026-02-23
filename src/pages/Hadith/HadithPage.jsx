// src/pages/Hadith/HadithPage.jsx
// ============================================================
// HadithPage — URL-BASED FILTERING
//
// Filters are stored in URL query params:
// /hadith?topic=salah&collection=bukhari&grade=sahih&search=prayer
//
// Benefits:
// - Browser back/forward works
// - Shareable filtered URLs
// - Filters persist when returning from detail page
// ============================================================

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import { hadithService } from "../../services/hadith.service";
import { queryKeys } from "../../services/querykeys";

import {
  HADITH_COLLECTIONS,
  HADITH_GRADES,
  HADITH_TOPICS,
} from "../../data/hadithCollections";

import BismillahBanner from "../../components/sections/BismillahBanner";
import SectionTitle from "../../components/sections/SectionTitle";
import FilterBar from "../../components/ui/FilterBar";
import FilterChip from "../../components/ui/FilterChip";
import Pagination from "../../components/ui/Pagination";
import HadithCard from "../../components/cards/HadithCard";
import Badge from "../../components/ui/Badge";
import { cn } from "../../utils/cn";

import { usePagination } from "../../hooks/usePagination";

// ── Skeleton ──────────────────────────────────────────────────
const HadithSkeleton = () => (
  <div className="space-y-5">
    {Array.from({ length: 4 }).map((_, i) => (
      <div key={i} className="skeleton h-56 rounded-[var(--radius-xl)]" />
    ))}
  </div>
);

// ── Empty state ───────────────────────────────────────────────
const EmptyState = ({ search, onClear }) => (
  <div className="text-center py-24">
    <p className="font-arabic text-5xl text-accent/30 mb-4" aria-hidden="true">
      الحديث
    </p>
    <h3 className="heading-sm text-ink mb-2">No hadith found</h3>
    <p className="text-body mb-6">
      {search
        ? `No results for "${search}"`
        : "No hadith match the selected filters"}
    </p>
    <button type="button" onClick={onClear} className="btn-secondary">
      Clear Filters
    </button>
  </div>
);

// ============================================================
// HadithPage
// ============================================================
const HadithPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // ── Read filters from URL ─────────────────────────────────
  const collection = searchParams.get("collection") || "all";
  const grade = searchParams.get("grade") || "all";
  const topic = searchParams.get("topic") || "all";
  const search = searchParams.get("search") || "";
  const page = parseInt(searchParams.get("page") || "1", 10);

  // ── Update URL when filter changes ────────────────────────
  const updateFilter = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value === "all" || value === "") {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
    // Reset to page 1 when filter changes
    newParams.delete("page");
    setSearchParams(newParams);
  };

  const updateSearch = (value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value.trim()) {
      newParams.set("search", value);
    } else {
      newParams.delete("search");
    }
    newParams.delete("page");
    setSearchParams(newParams);
  };

  const goToPage = (newPage) => {
    const newParams = new URLSearchParams(searchParams);
    if (newPage === 1) {
      newParams.delete("page");
    } else {
      newParams.set("page", String(newPage));
    }
    setSearchParams(newParams);
  };

  const clearAll = () => {
    setSearchParams({});
  };

  // ── React Query ───────────────────────────────────────────
  const { data, isLoading, isError } = useQuery({
    queryKey: queryKeys.hadith.list({ page, collection, grade, topic, search }),
    queryFn: () =>
      hadithService.getAll({
        page,
        limit: 10,
        collection,
        grade,
        topic,
        search,
      }),
    keepPreviousData: true,
  });

  const hadith = data?.data ?? [];
  const pagination = data?.pagination ?? {};
  const total = pagination.total ?? 0;
  const totalPages = pagination.totalPages ?? 1;

  // ── Active filters ────────────────────────────────────────
  const activeFilters = [
    collection !== "all" && {
      id: "collection",
      label:
        HADITH_COLLECTIONS.find((c) => c.id === collection)?.shortLabel ??
        collection,
      onRemove: () => updateFilter("collection", "all"),
    },
    grade !== "all" && {
      id: "grade",
      label: HADITH_GRADES.find((g) => g.id === grade)?.label ?? grade,
      onRemove: () => updateFilter("grade", "all"),
    },
    topic !== "all" && {
      id: "topic",
      label: HADITH_TOPICS.find((t) => t.id === topic)?.label ?? topic,
      onRemove: () => updateFilter("topic", "all"),
    },
    search && {
      id: "search",
      label: `"${search}"`,
      onRemove: () => updateSearch(""),
    },
  ].filter(Boolean);

  const activeCollection = HADITH_COLLECTIONS.find((c) => c.id === collection);

  return (
    <>
      {/* ── Bismillah banner ──────────────────────────────── */}
      <BismillahBanner
        variant="default"
        verseArabic="وَمَا يَنطِقُ عَنِ الْهَوَىٰ ۝ إِنْ هُوَ إِلَّا وَحْيٌ يُوحَىٰ"
        verseTranslation="Nor does he speak from his own desire — it is nothing but revelation revealed"
        verseRef="An-Najm 53:3-4"
      />

      <div className="bg-background min-h-screen">
        <div className="container-custom py-12">
          {/* ── Page heading ──────────────────────────────── */}
          <div className="mb-10">
            <SectionTitle
              eyebrow="الحديث النبوي"
              title="Hadith Collections"
              subtitle="Authentic narrations from the Prophet Muhammad ﷺ — organized by collection, topic, and grade"
              align="left"
            />
          </div>

          {/* ══ TOPIC FILTER ═════════════════════════════════ */}
          <div className="mb-8">
            <p className="font-body text-xs font-bold text-muted uppercase tracking-widest mb-4">
              Browse by Topic
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {HADITH_TOPICS.map((t, i) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => updateFilter("topic", t.id)}
                  className={cn(
                    "card-interactive p-3 flex flex-col items-center text-center gap-2",
                    `animate-slide-up stagger-${Math.min(i + 1, 6)}`,
                    topic === t.id && "ring-2 ring-primary",
                  )}
                >
                  <span className="text-2xl" aria-hidden="true">
                    {t.icon}
                  </span>
                  <p
                    className={cn(
                      "font-body text-xs font-semibold leading-tight transition-colors",
                      topic === t.id ? "text-primary" : "text-ink",
                    )}
                  >
                    {t.label}
                  </p>
                  <p
                    className="font-arabic-ui text-xs text-accent/70"
                    dir="rtl"
                    lang="ar"
                  >
                    {t.labelAr}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* ── Collection tabs ───────────────────────────── */}
          <div className="mb-8">
            <p className="font-body text-xs font-bold text-ink uppercase tracking-widest mb-3">
              Collection
            </p>
            <div className="flex flex-wrap gap-2">
              {HADITH_COLLECTIONS.map((col) => (
                <button
                  key={col.id}
                  type="button"
                  onClick={() => updateFilter("collection", col.id)}
                  className={cn(
                    "font-body text-sm font-medium px-4 py-2 rounded-[var(--radius-md)]",
                    "border transition-all duration-200",
                    collection === col.id
                      ? "bg-primary text-snow border-primary shadow-sm"
                      : "bg-surface text-soft border-border hover:border-primary hover:text-primary",
                  )}
                >
                  {col.shortLabel || col.label}
                </button>
              ))}
            </div>

            {/* Active collection info */}
            {activeCollection && collection !== "all" && (
              <div
                className="mt-4 p-4 bg-primary-soft border border-primary/10
                              rounded-[var(--radius-lg)]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <p
                      className="font-arabic-ui text-sm text-primary font-semibold mb-0.5"
                      dir="rtl"
                      lang="ar"
                    >
                      {activeCollection.labelAr}
                    </p>
                    <p className="font-display text-lg text-ink font-normal mb-1">
                      {activeCollection.label}
                    </p>
                    <p className="font-body text-xs text-soft mb-1">
                      by {activeCollection.author}
                    </p>
                    <p className="font-body text-sm text-soft leading-relaxed">
                      {activeCollection.description}
                    </p>
                  </div>
                  <Badge variant="success">{activeCollection.grade}</Badge>
                </div>
              </div>
            )}
          </div>

          {/* ── Grade filter ───────────────────────────────── */}
          <div className="mb-6">
            <p className="font-body text-xs font-bold text-ink uppercase tracking-widest mb-3">
              Authenticity Grade
            </p>
            <div className="flex flex-wrap gap-2">
              {HADITH_GRADES.map((g) => (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => updateFilter("grade", g.id)}
                  className={cn(
                    "font-body text-sm px-4 py-1.5 rounded-full border transition-all duration-200",
                    grade === g.id
                      ? "bg-primary text-snow border-primary"
                      : "bg-surface text-soft border-border hover:border-primary hover:text-primary",
                  )}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>

          {/* ── Search bar ────────────────────────────────── */}
          <div className="mb-6">
            <FilterBar
              searchValue={search}
              onSearch={updateSearch}
              searchPlaceholder="Search by Arabic text, translation, narrator, or topic..."
              totalResults={total}
              isLoading={isLoading}
            />
          </div>

          {/* ── Active filter chips ────────────────────────── */}
          {activeFilters.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap mb-6">
              <span className="font-body text-xs text-muted">
                Active filters:
              </span>
              {activeFilters.map((f) => (
                <FilterChip key={f.id} label={f.label} onRemove={f.onRemove} />
              ))}
              {activeFilters.length > 1 && (
                <FilterChip
                  label="Clear all"
                  onRemove={clearAll}
                  variant="ghost"
                />
              )}
            </div>
          )}

          {/* ── Hadith list ────────────────────────────────── */}
          {isError ? (
            <div className="text-center py-24">
              <p className="text-body text-error mb-4">
                Failed to load hadith. Please try again.
              </p>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="btn-secondary"
              >
                Retry
              </button>
            </div>
          ) : isLoading ? (
            <HadithSkeleton />
          ) : hadith.length === 0 ? (
            <EmptyState search={search} onClear={clearAll} />
          ) : (
            <>
              <div className="space-y-5">
                {hadith.map((h, i) => (
                  <div
                    key={h.id}
                    className={`animate-slide-up stagger-${Math.min(i + 1, 6)}`}
                  >
                    <HadithCard hadith={h} showExplanation={false} />
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-12">
                  <Pagination
                    page={page}
                    totalPages={totalPages}
                    onPageChange={goToPage}
                  />
                  <p className="font-body text-xs text-muted text-center mt-3">
                    Page {page} of {totalPages} — {total} hadith total
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default HadithPage;
