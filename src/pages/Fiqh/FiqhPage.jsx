// src/pages/Fiqh/FiqhPage.jsx
// ============================================================
// FiqhPage — URL-BASED FILTERING
//
// All filters stored in URL query params:
// /fiqh?category=salah&madhab=hanafi&search=prayer
//
// When returning from detail page, filters persist!
// ============================================================

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import { fiqhService } from "../../services/fiqh.service";
import { queryKeys } from "../../services/querykeys";

import { FIQH_CATEGORIES, FIQH_MADHABS } from "../../data/fiqhCategories";

import BismillahBanner from "../../components/sections/BismillahBanner";
import SectionTitle from "../../components/sections/SectionTitle";
import FilterBar from "../../components/ui/FilterBar";
import FilterChip from "../../components/ui/FilterChip";
import Pagination from "../../components/ui/Pagination";
import FiqhCard from "../../components/cards/FiqhCard";
import { cn } from "../../utils/cn";

// ── Skeleton ──────────────────────────────────────────────────
const FiqhSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
    {Array.from({ length: 6 }).map((_, i) => (
      <div key={i} className="skeleton h-56 rounded-[var(--radius-xl)]" />
    ))}
  </div>
);

// ── Empty state ───────────────────────────────────────────────
const EmptyState = ({ search, onClear }) => (
  <div className="text-center py-24">
    <p className="font-arabic text-5xl text-accent/30 mb-4" aria-hidden="true">
      ⚖️
    </p>
    <h3 className="heading-sm text-ink mb-2">No topics found</h3>
    <p className="text-body mb-6">
      {search
        ? `No results for "${search}"`
        : "No topics match the selected filters"}
    </p>
    <button type="button" onClick={onClear} className="btn-secondary">
      Clear Filters
    </button>
  </div>
);

// ============================================================
// FiqhPage
// ============================================================
const FiqhPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // ── Read filters from URL ─────────────────────────────────
  const category = searchParams.get("category") || "all";
  const madhab = searchParams.get("madhab") || "all";
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
    newParams.delete("page"); // Reset to page 1
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
    queryKey: queryKeys.fiqh.list({ page, category, madhab, search }),
    queryFn: () =>
      fiqhService.getAll({
        page,
        limit: 12,
        category,
        madhab,
        search,
      }),
    keepPreviousData: true,
  });

  const topics = data?.data ?? [];
  const pagination = data?.pagination ?? {};
  const total = pagination.total ?? 0;
  const totalPages = pagination.totalPages ?? 1;

  // ── Active filters ────────────────────────────────────────
  const activeFilters = [
    category !== "all" && {
      id: "category",
      label: FIQH_CATEGORIES.find((c) => c.id === category)?.label ?? category,
      onRemove: () => updateFilter("category", "all"),
    },
    madhab !== "all" && {
      id: "madhab",
      label: FIQH_MADHABS.find((m) => m.id === madhab)?.label ?? madhab,
      onRemove: () => updateFilter("madhab", "all"),
    },
    search && {
      id: "search",
      label: `"${search}"`,
      onRemove: () => updateSearch(""),
    },
  ].filter(Boolean);

  return (
    <>
      {/* ── Bismillah banner ──────────────────────────────── */}
      <BismillahBanner
        variant="default"
        verseArabic="فَاسْأَلُوا أَهْلَ الذِّكْرِ إِن كُنتُمْ لَا تَعْلَمُونَ"
        verseTranslation="So ask the people of knowledge if you do not know"
        verseRef="An-Nahl 16:43"
      />

      <div className="bg-background min-h-screen">
        <div className="container-custom py-12">
          {/* ── Page heading ──────────────────────────────── */}
          <div className="mb-10">
            <SectionTitle
              eyebrow="الفقه الإسلامي"
              title="Islamic Jurisprudence"
              subtitle="Detailed rulings on worship, transactions, family law, and daily life"
              align="left"
            />
          </div>

          {/* ── Category grid ─────────────────────────────── */}
          <div className="mb-12">
            <p
              className="font-body text-xs font-bold text-muted uppercase
                          tracking-widest mb-4"
            >
              Browse by Chapter
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {FIQH_CATEGORIES.filter((c) => c.id !== "all").map((cat, i) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => updateFilter("category", cat.id)}
                  className={cn(
                    "card-interactive group p-4 flex flex-col items-center text-center gap-2",
                    `animate-slide-up stagger-${Math.min(i + 1, 6)}`,
                    category === cat.id && "ring-2 ring-primary",
                  )}
                >
                  {/* Icon */}
                  <div
                    className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-all duration-300",
                      category === cat.id
                        ? "bg-primary border-primary scale-110"
                        : "bg-primary-soft border-primary/10 group-hover:bg-primary group-hover:scale-110",
                    )}
                  >
                    {cat.icon}
                  </div>

                  {/* Label */}
                  <p
                    className={cn(
                      "font-body text-xs font-semibold leading-tight transition-colors duration-200",
                      category === cat.id
                        ? "text-primary"
                        : "text-ink group-hover:text-primary",
                    )}
                  >
                    {cat.label}
                  </p>

                  {/* Arabic */}
                  <p
                    className="font-arabic-ui text-xs text-accent/70 leading-none"
                    dir="rtl"
                    lang="ar"
                  >
                    {cat.labelAr}
                  </p>

                  {/* Count */}
                  <p className="font-body text-xs text-muted">
                    {cat.topicCount} topics
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* ── Madhab filter ─────────────────────────────── */}
          <div className="mb-6">
            <p
              className="font-body text-xs font-bold text-muted uppercase
                          tracking-widest mb-3"
            >
              Madhab (School of Thought)
            </p>
            <div className="flex flex-wrap gap-2">
              {FIQH_MADHABS.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => updateFilter("madhab", m.id)}
                  className={cn(
                    "font-body text-sm px-4 py-1.5 rounded-full border transition-all duration-200",
                    madhab === m.id
                      ? "bg-primary text-snow border-primary"
                      : "bg-surface text-soft border-border hover:border-primary hover:text-primary",
                  )}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* ── Search bar ────────────────────────────────── */}
          <div className="mb-6">
            <FilterBar
              searchValue={search}
              onSearch={updateSearch}
              searchPlaceholder="Search by topic, ruling, or keyword..."
              totalResults={total}
              isLoading={isLoading}
            />
          </div>

          {/* ── Active filter chips ────────────────────────── */}
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

          {/* ── Content ───────────────────────────────────── */}
          {isError ? (
            <div className="text-center py-24">
              <p className="text-body text-error mb-4">
                Failed to load topics. Please try again.
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
            <FiqhSkeleton />
          ) : topics.length === 0 ? (
            <EmptyState search={search} onClear={clearAll} />
          ) : (
            <>
              {/* Topics grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {topics.map((topic, i) => (
                  <div
                    key={topic.id}
                    className={`animate-slide-up stagger-${Math.min(i + 1, 6)}`}
                  >
                    <FiqhCard topic={topic} />
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
                    Page {page} of {totalPages} — {total} topics total
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

export default FiqhPage;
