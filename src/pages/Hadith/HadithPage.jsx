// src/pages/Hadith/HadithPage.jsx
// ============================================================
// HadithPage — NurPath (IMPROVED VERSION)
//
// Changes:
//   • Subtle banner instead of dark — better readability
//   • bg-surface instead of bg-background — cleaner white
//   • Improved button/filter contrast
//   • Better collection info card
//   • Clearer text colors throughout
// ============================================================

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { hadithService } from "../../services/hadith.service";
import { queryKeys } from "../../services/querykeys";
import {
  HADITH_COLLECTIONS,
  HADITH_GRADES,
} from "../../data/hadithCollections";

import BismillahBanner from "../../components/sections/BismillahBanner";
import SectionTitle from "../../components/sections/SectionTitle";
import FilterBar from "../../components/ui/FilterBar";
import FilterChip from "../../components/ui/FilterChip";
import Pagination from "../../components/ui/Pagination";
import HadithCard from "../../components/cards/HadithCard";
import Badge from "../../components/ui/Badge";
import { cn } from "../../utils/cn";

import { useSearch } from "../../hooks/useSearch";
import { usePagination } from "../../hooks/usePagination";

const HadithSkeleton = () => (
  <div className="space-y-5">
    {Array.from({ length: 4 }).map((_, i) => (
      <div key={i} className="skeleton h-56 rounded-[var(--radius-xl)]" />
    ))}
  </div>
);

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

const HadithPage = () => {
  const [collection, setCollection] = useState("all");
  const [grade, setGrade] = useState("all");
  const {
    page,
    goToPage,
    reset: resetPage,
  } = usePagination({ initialLimit: 10 });
  const { searchValue, debouncedSearch, handleSearch, clearSearch, hasSearch } =
    useSearch({ onSearch: resetPage });

  const { data, isLoading, isError } = useQuery({
    queryKey: queryKeys.hadith.list({
      page,
      collection,
      grade,
      search: debouncedSearch,
    }),
    queryFn: () =>
      hadithService.getAll({
        page,
        limit: 10,
        collection,
        grade,
        search: debouncedSearch,
      }),
    keepPreviousData: true,
  });

  const hadith = data?.data ?? [];
  const pagination = data?.pagination ?? {};
  const total = pagination.total ?? 0;
  const totalPages = pagination.totalPages ?? 1;

  const activeFilters = [
    collection !== "all" && {
      id: "collection",
      label:
        HADITH_COLLECTIONS.find((c) => c.id === collection)?.shortLabel ??
        collection,
      onRemove: () => {
        setCollection("all");
        resetPage();
      },
    },
    grade !== "all" && {
      id: "grade",
      label: HADITH_GRADES.find((g) => g.id === grade)?.label ?? grade,
      onRemove: () => {
        setGrade("all");
        resetPage();
      },
    },
    hasSearch && {
      id: "search",
      label: `"${debouncedSearch}"`,
      onRemove: () => {
        clearSearch();
        resetPage();
      },
    },
  ].filter(Boolean);

  const clearAll = () => {
    setCollection("all");
    setGrade("all");
    clearSearch();
    resetPage();
  };

  const activeCollection = HADITH_COLLECTIONS.find((c) => c.id === collection);

  return (
    <>
      {/* ── Bismillah banner — deep green matching BooksPage ── */}
      <BismillahBanner
        variant="default"
        verseArabic="وَمَا يَنطِقُ عَنِ الْهَوَىٰ ۝ إِنْ هُوَ إِلَّا وَحْيٌ يُوحَىٰ"
        verseTranslation="Nor does he speak from his own desire — it is nothing but revelation revealed"
        verseRef="An-Najm 53:3-4"
      />

      <div className="bg-surface min-h-screen">
        <div className="container-custom py-12">
          <div className="mb-10">
            <SectionTitle
              eyebrow="الحديث النبوي"
              title="Hadith Collections"
              subtitle="Authentic narrations from the Prophet Muhammad ﷺ from the six major collections"
              align="left"
            />
          </div>

          {/* ── Collection tabs — IMPROVED contrast ─────────── */}
          <div className="mb-8">
            <p className="font-body text-xs font-bold text-ink uppercase tracking-widest mb-3">
              Collection
            </p>
            <div className="flex flex-wrap gap-2">
              {HADITH_COLLECTIONS.map((col) => (
                <button
                  key={col.id}
                  type="button"
                  onClick={() => {
                    setCollection(col.id);
                    resetPage();
                  }}
                  className={cn(
                    "font-body text-sm font-medium px-5 py-2.5 rounded-[var(--radius-md)]",
                    "border transition-all duration-200",
                    collection === col.id
                      ? "bg-primary text-snow border-primary shadow-md"
                      : "bg-card text-ink border-border hover:border-primary hover:bg-primary-soft hover:text-primary",
                  )}
                >
                  {col.shortLabel || col.label}
                </button>
              ))}
            </div>

            {/* Collection info card — IMPROVED styling */}
            {activeCollection && collection !== "all" && (
              <div className="mt-5 p-5 bg-card border-l-4 border-accent rounded-[var(--radius-lg)] shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <p
                      className="font-arabic-ui text-base text-accent font-semibold mb-1"
                      dir="rtl"
                      lang="ar"
                    >
                      {activeCollection.labelAr}
                    </p>
                    <p className="font-display text-xl font-normal text-ink mb-2">
                      {activeCollection.label}
                    </p>
                    <p className="font-body text-sm text-soft leading-relaxed">
                      {activeCollection.description}
                    </p>
                    <p className="font-body text-xs text-muted mt-2">
                      {activeCollection.totalAhadith?.toLocaleString()} hadith
                      in this collection
                    </p>
                  </div>
                  <Badge variant="success">{activeCollection.grade}</Badge>
                </div>
              </div>
            )}
          </div>

          {/* ── Grade filter — IMPROVED contrast ──────────────── */}
          <div className="mb-6">
            <p className="font-body text-xs font-bold text-ink uppercase tracking-widest mb-3">
              Grade
            </p>
            <div className="flex flex-wrap gap-2">
              {HADITH_GRADES.map((g) => (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => {
                    setGrade(g.id);
                    resetPage();
                  }}
                  className={cn(
                    "font-body text-sm font-medium px-4 py-2 rounded-full border transition-all duration-200",
                    grade === g.id
                      ? "bg-primary text-snow border-primary shadow-sm"
                      : "bg-card text-ink border-border hover:border-primary hover:bg-primary-soft hover:text-primary",
                  )}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <FilterBar
              searchValue={searchValue}
              onSearch={handleSearch}
              searchPlaceholder="Search by Arabic text, translation, narrator, or topic..."
              totalResults={total}
              isLoading={isLoading}
            />
          </div>

          {activeFilters.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap mb-6">
              <span className="font-body text-xs text-muted">Filters:</span>
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
            <EmptyState search={debouncedSearch} onClear={clearAll} />
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
