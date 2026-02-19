// src/pages/Articles/ArticlesPage.jsx
// ============================================================
// ArticlesPage — NurPath
//
// Layout (top to bottom):
//   1. Page header       — title + subtitle
//   2. Featured article  — large horizontal card (top article)
//   3. FilterBar         — search + category chips
//   4. Active FilterChips
//   5. Articles grid     — 3 columns
//   6. Pagination
// ============================================================

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

// ── Services ──────────────────────────────────────────────────
import { articlesService } from "../../services/articles.service";
import { queryKeys } from "../../services/querykeys";

// ── Data ──────────────────────────────────────────────────────
import { ARTICLE_CATEGORIES } from "../../data/categories";

// ── Components ────────────────────────────────────────────────
import SectionTitle from "../../components/sections/SectionTitle";
import FilterBar from "../../components/ui/FilterBar";
import FilterChip from "../../components/ui/FilterChip";
import Pagination from "../../components/ui/Pagination";
import ArticleCard from "../../components/cards/ArticleCard";

// ── Hooks ─────────────────────────────────────────────────────
import { useSearch } from "../../hooks/useSearch";
import { usePagination } from "../../hooks/usePagination";

// ── Skeleton ──────────────────────────────────────────────────
const ArticlesSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {Array.from({ length: 6 }).map((_, i) => (
      <div key={i} className="skeleton h-80 rounded-[var(--radius-xl)]" />
    ))}
  </div>
);

// ── Empty state ───────────────────────────────────────────────
const EmptyState = ({ search, onClear }) => (
  <div className="text-center py-24">
    <p className="font-arabic text-5xl text-accent/30 mb-4" aria-hidden="true">
      ✍
    </p>
    <h3 className="heading-sm text-ink mb-2">No articles found</h3>
    <p className="text-body mb-6">
      {search
        ? `No results for "${search}" — try different keywords`
        : "No articles match the selected filters"}
    </p>
    <button type="button" onClick={onClear} className="btn-secondary">
      Clear Filters
    </button>
  </div>
);

// ============================================================
// ArticlesPage
// ============================================================
const ArticlesPage = () => {
  // ── Filter state ──────────────────────────────────────────
  const [category, setCategory] = useState("all");

  // ── Pagination ────────────────────────────────────────────
  const {
    page,
    goToPage,
    reset: resetPage,
  } = usePagination({ initialLimit: 9 });

  // ── Search ────────────────────────────────────────────────
  const { searchValue, debouncedSearch, handleSearch, clearSearch, hasSearch } =
    useSearch({ onSearch: resetPage });

  // ── Featured article — always first featured result ───────
  const { data: featuredData } = useQuery({
    queryKey: queryKeys.articles.featured(),
    queryFn: articlesService.getFeatured,
  });
  const featuredArticle = featuredData?.data?.[0] ?? null;

  // ── Main articles list ────────────────────────────────────
  const { data, isLoading, isError } = useQuery({
    queryKey: queryKeys.articles.list({
      page,
      category,
      search: debouncedSearch,
    }),
    queryFn: () =>
      articlesService.getAll({
        page,
        limit: 9,
        category,
        search: debouncedSearch,
      }),
    keepPreviousData: true,
  });

  const articles = data?.data ?? [];
  const pagination = data?.pagination ?? {};
  const total = pagination.total ?? 0;
  const totalPages = pagination.totalPages ?? 1;

  // ── Active filters ────────────────────────────────────────
  const activeFilters = [
    category !== "all" && {
      id: "category",
      label: `${ARTICLE_CATEGORIES.find((c) => c.id === category)?.label ?? category}`,
      onRemove: () => {
        setCategory("all");
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
    setCategory("all");
    clearSearch();
    resetPage();
  };

  // ── Filter out featured from grid to avoid duplicate ──────
  const gridArticles = articles.filter(
    (a) => !featuredArticle || a.id !== featuredArticle.id,
  );

  return (
    <div className="bg-background min-h-screen">
      <div className="container-custom py-12">
        {/* ── Page heading ──────────────────────────────────── */}
        <div className="mb-10">
          <SectionTitle
            eyebrow="المقالات"
            title="Islamic Articles"
            subtitle="In-depth writings on knowledge, practice, spirituality, history, and current affairs"
            align="left"
          />
        </div>

        {/* ── Featured article ──────────────────────────────── */}
        {!hasSearch && category === "all" && featuredArticle && (
          <div className="mb-12">
            <p
              className="font-body text-xs font-bold text-accent uppercase
                          tracking-widest mb-4"
            >
              ✦ Featured
            </p>
            <ArticleCard article={featuredArticle} featured />
          </div>
        )}

        {/* ── Filter bar ────────────────────────────────────── */}
        <div className="mb-6">
          <FilterBar
            searchValue={searchValue}
            onSearch={handleSearch}
            searchPlaceholder="Search articles by title, topic, or keyword..."
            categories={ARTICLE_CATEGORIES}
            activeCategory={category}
            onCategoryChange={(id) => {
              setCategory(id);
              resetPage();
            }}
            totalResults={total}
            isLoading={isLoading}
          />
        </div>

        {/* ── Active filter chips ────────────────────────────── */}
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

        {/* ── Content ───────────────────────────────────────── */}
        {isError ? (
          <div className="text-center py-24">
            <p className="text-body text-error mb-4">
              Failed to load articles. Please try again.
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
          <ArticlesSkeleton />
        ) : gridArticles.length === 0 ? (
          <EmptyState search={debouncedSearch} onClear={clearAll} />
        ) : (
          <>
            {/* Articles grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {gridArticles.map((article, i) => (
                <div
                  key={article.id}
                  className={`animate-slide-up stagger-${Math.min(i + 1, 6)}`}
                >
                  <ArticleCard article={article} />
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
                  Page {page} of {totalPages} — {total} articles total
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ArticlesPage;
