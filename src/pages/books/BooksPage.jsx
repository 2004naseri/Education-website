// src/pages/Books/BooksPage.jsx
// ============================================================
// BooksPage — NurPath
//
// Layout (top to bottom):
//   1. BismillahBanner   — Arabic header
//   2. FilterBar         — search + category chips + sort
//   3. Active FilterChips — shows applied filters
//   4. Results grid      — BookCard × N
//   5. Pagination        — page controls
//   6. EmptyState        — when no results
//
// State: search, category, language, sort, page
// Data:  booksService via React Query
// ============================================================

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

// ── Services ──────────────────────────────────────────────────
import { booksService } from "../../services/books.service";
import { queryKeys } from "../../services/querykeys";

// ── Data ──────────────────────────────────────────────────────
import {
  BOOK_CATEGORIES,
  BOOK_LANGUAGES,
  SORT_OPTIONS,
} from "../../data/categories";

// ── Components ────────────────────────────────────────────────
import BismillahBanner from "../../components/sections/BismillahBanner";
import SectionTitle from "../../components/sections/SectionTitle";
import FilterBar from "../../components/ui/FilterBar";
import FilterChip from "../../components/ui/FilterChip";
import Pagination from "../../components/ui/Pagination";
import BookCard from "../../components/cards/BookCard";
import { cn } from "../../utils/cn";

// ── Hooks ─────────────────────────────────────────────────────
import { useSearch } from "../../hooks/useSearch";
import { usePagination } from "../../hooks/usePagination";

// ── Skeleton grid while loading ───────────────────────────────
const BooksSkeleton = () => (
  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
    {Array.from({ length: 10 }).map((_, i) => (
      <div
        key={i}
        className="skeleton aspect-[3/4] rounded-[var(--radius-xl)]"
      />
    ))}
  </div>
);

// ── Empty state ───────────────────────────────────────────────
const EmptyState = ({ search, onClear }) => (
  <div className="text-center py-24">
    <p className="font-arabic text-5xl text-accent/30 mb-4" aria-hidden="true">
      ؟
    </p>
    <h3 className="heading-sm text-ink mb-2">No books found</h3>
    <p className="text-body mb-6">
      {search
        ? `No results for "${search}" — try different keywords`
        : "No books match the selected filters"}
    </p>
    <button type="button" onClick={onClear} className="btn-secondary">
      Clear Filters
    </button>
  </div>
);

// ============================================================
// BooksPage
// ============================================================
const BooksPage = () => {
  // ── Filter state ──────────────────────────────────────────
  const [category, setCategory] = useState("all");
  const [language, setLanguage] = useState("all");
  const [sort, setSort] = useState("popular");

  // ── Pagination ────────────────────────────────────────────
  const {
    page,
    goToPage,
    reset: resetPage,
  } = usePagination({ initialLimit: 12 });

  // ── Search — debounced ────────────────────────────────────
  const { searchValue, debouncedSearch, handleSearch, clearSearch, hasSearch } =
    useSearch({ onSearch: resetPage });

  // ── React Query ───────────────────────────────────────────
  const { data, isLoading, isError } = useQuery({
    queryKey: queryKeys.books.list({
      page,
      category,
      language,
      sort,
      search: debouncedSearch,
    }),
    queryFn: () =>
      booksService.getAll({
        page,
        limit: 12,
        category,
        language,
        sort,
        search: debouncedSearch,
      }),
    keepPreviousData: true,
  });

  const books = data?.data ?? [];
  const pagination = data?.pagination ?? {};
  const total = pagination.total ?? 0;
  const totalPages = pagination.totalPages ?? 1;

  // ── Active filters list (for FilterChip row) ──────────────
  const activeFilters = [
    category !== "all" && {
      id: "category",
      label: `Category: ${BOOK_CATEGORIES.find((c) => c.id === category)?.label ?? category}`,
      onRemove: () => {
        setCategory("all");
        resetPage();
      },
    },
    language !== "all" && {
      id: "language",
      label: `Language: ${BOOK_LANGUAGES.find((l) => l.id === language)?.label ?? language}`,
      onRemove: () => {
        setLanguage("all");
        resetPage();
      },
    },
    hasSearch && {
      id: "search",
      label: `Search: "${debouncedSearch}"`,
      onRemove: () => {
        clearSearch();
        resetPage();
      },
    },
  ].filter(Boolean);

  // ── Clear all filters ─────────────────────────────────────
  const clearAll = () => {
    setCategory("all");
    setLanguage("all");
    clearSearch();
    resetPage();
  };

  return (
    <>
      {/* ── Bismillah banner ──────────────────────────────── */}
      <BismillahBanner
        variant="default"
        verseArabic="اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ"
        verseTranslation="Read in the name of your Lord who created"
        verseRef="Al-'Alaq 96:1"
      />

      <div className="bg-background min-h-screen">
        <div className="container-custom py-12">
          {/* ── Page heading ────────────────────────────────── */}
          <div className="mb-10">
            <SectionTitle
              eyebrow="المكتبة الإسلامية"
              title="Islamic Book Library"
              subtitle="Browse over 1,200 authenticated Islamic texts — Tafsir, Hadith, Fiqh, Seerah and more"
              align="left"
            />
          </div>

          {/* ── Filter bar ──────────────────────────────────── */}
          <div className="mb-6">
            <FilterBar
              searchValue={searchValue}
              onSearch={handleSearch}
              searchPlaceholder="Search by title, author, or topic..."
              categories={BOOK_CATEGORIES}
              activeCategory={category}
              onCategoryChange={(id) => {
                setCategory(id);
                resetPage();
              }}
              sortOptions={SORT_OPTIONS}
              activeSort={sort}
              onSortChange={(val) => {
                setSort(val);
                resetPage();
              }}
              totalResults={total}
              isLoading={isLoading}
            />

            {/* ── Language filter row ────────────────────────── */}
            <div className="flex items-center gap-2 mt-3 flex-wrap">
              <span className="font-body text-xs text-muted shrink-0">
                Language:
              </span>
              {BOOK_LANGUAGES.map((lang) => (
                <button
                  key={lang.id}
                  type="button"
                  onClick={() => {
                    setLanguage(lang.id);
                    resetPage();
                  }}
                  className={cn(
                    "font-body text-xs px-3 py-1 rounded-full border transition-all duration-200",
                    language === lang.id
                      ? "bg-primary text-snow border-primary"
                      : "bg-surface text-soft border-border hover:border-primary hover:text-primary",
                  )}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>

          {/* ── Active filter chips ──────────────────────────── */}
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

          {/* ── Content ─────────────────────────────────────── */}
          {isError ? (
            // Error state
            <div className="text-center py-24">
              <p className="text-body text-error mb-4">
                Failed to load books. Please try again.
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
            <BooksSkeleton />
          ) : books.length === 0 ? (
            <EmptyState search={debouncedSearch} onClear={clearAll} />
          ) : (
            <>
              {/* Books grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                {books.map((book, i) => (
                  <div
                    key={book.id}
                    className={`animate-slide-up stagger-${Math.min(i + 1, 6)}`}
                  >
                    <BookCard book={book} />
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
                    Page {page} of {totalPages} — {total} books total
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

export default BooksPage;
