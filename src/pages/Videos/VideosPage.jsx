// src/pages/Videos/VideosPage.jsx
// ============================================================
// VideosPage — NurPath
//
// Layout:
//   1. Page header
//   2. Featured video — large card at top
//   3. FilterBar — search + category chips
//   4. Active FilterChips
//   5. Video grid — 3 columns
//   6. Pagination
// ============================================================

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

// ── Services ──────────────────────────────────────────────────
import { videosService } from "../../services/videos.service";
import { queryKeys } from "../../services/querykeys";

// ── Data ──────────────────────────────────────────────────────
import { VIDEO_CATEGORIES } from "../../data/categories";

// ── Components ────────────────────────────────────────────────
import SectionTitle from "../../components/sections/SectionTitle";
import FilterBar from "../../components/ui/FilterBar";
import FilterChip from "../../components/ui/FilterChip";
import Pagination from "../../components/ui/Pagination";
import VideoCard from "../../components/cards/VideoCard";

// ── Hooks ─────────────────────────────────────────────────────
import { useSearch } from "../../hooks/useSearch";
import { usePagination } from "../../hooks/usePagination";

// ── Skeleton ──────────────────────────────────────────────────
const VideosSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {Array.from({ length: 6 }).map((_, i) => (
      <div key={i} className="skeleton h-64 rounded-[var(--radius-xl)]" />
    ))}
  </div>
);

// ── Empty state ───────────────────────────────────────────────
const EmptyState = ({ search, onClear }) => (
  <div className="text-center py-24">
    <p className="font-arabic text-5xl text-accent/30 mb-4" aria-hidden="true">
      🎬
    </p>
    <h3 className="heading-sm text-ink mb-2">No videos found</h3>
    <p className="text-body mb-6">
      {search
        ? `No results for "${search}"`
        : "No videos match the selected filters"}
    </p>
    <button type="button" onClick={onClear} className="btn-secondary">
      Clear Filters
    </button>
  </div>
);

// ============================================================
// VideosPage
// ============================================================
const VideosPage = () => {
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

  // ── Featured video ────────────────────────────────────────
  const { data: featuredData } = useQuery({
    queryKey: queryKeys.videos.featured(),
    queryFn: videosService.getFeatured,
  });
  const featuredVideo = featuredData?.data?.[0] ?? null;

  // ── Main videos list ──────────────────────────────────────
  const { data, isLoading, isError } = useQuery({
    queryKey: queryKeys.videos.list({
      page,
      category,
      search: debouncedSearch,
    }),
    queryFn: () =>
      videosService.getAll({
        page,
        limit: 9,
        category,
        search: debouncedSearch,
      }),
    keepPreviousData: true,
  });

  const videos = data?.data ?? [];
  const pagination = data?.pagination ?? {};
  const total = pagination.total ?? 0;
  const totalPages = pagination.totalPages ?? 1;

  // ── Active filters ────────────────────────────────────────
  const activeFilters = [
    category !== "all" && {
      id: "category",
      label: VIDEO_CATEGORIES.find((c) => c.id === category)?.label ?? category,
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
  const gridVideos = videos.filter(
    (v) => !featuredVideo || v.id !== featuredVideo.id,
  );

  return (
    <div className="bg-background min-h-screen">
      <div className="container-custom py-12">
        {/* ── Page heading ──────────────────────────────────── */}
        <div className="mb-10">
          <SectionTitle
            eyebrow="الفيديوهات التعليمية"
            title="Islamic Video Library"
            subtitle="Lectures, series, Quran recitations, and educational content"
            align="left"
          />
        </div>

        {/* ── Featured video ────────────────────────────────── */}
        {!hasSearch && category === "all" && featuredVideo && (
          <div className="mb-12">
            <p
              className="font-body text-xs font-bold text-accent uppercase
                          tracking-widest mb-4"
            >
              ✦ Featured Video
            </p>
            <div className="card-interactive group overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                {/* Thumbnail */}
                <div className="relative aspect-video md:aspect-auto overflow-hidden bg-primary-soft">
                  <img
                    src={featuredVideo.thumbnail}
                    alt=""
                    aria-hidden="true"
                    className="w-full h-full object-cover transition-transform duration-500
                               group-hover:scale-105"
                    loading="lazy"
                  />
                  <div
                    className="absolute inset-0 bg-ink/30 group-hover:bg-ink/20
                                  transition-colors duration-300"
                  />
                  {/* Play button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="w-16 h-16 rounded-full bg-accent text-ink flex items-center
                                    justify-center shadow-[var(--shadow-accent)]
                                    transition-transform duration-300 group-hover:scale-110"
                    >
                      <svg
                        className="w-8 h-8 translate-x-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                      </svg>
                    </div>
                  </div>
                  {/* Duration */}
                  {featuredVideo.duration && (
                    <div className="absolute bottom-3 right-3">
                      <span
                        className="font-body text-sm font-semibold text-snow
                                     bg-ink/70 px-2.5 py-1 rounded"
                      >
                        {featuredVideo.duration}
                      </span>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex flex-col justify-center p-6 md:p-8">
                  {featuredVideo.titleArabic && (
                    <p
                      className="font-arabic-ui text-sm text-accent mb-2 text-right"
                      dir="rtl"
                      lang="ar"
                    >
                      {featuredVideo.titleArabic}
                    </p>
                  )}
                  <h3
                    className="font-display text-2xl font-normal text-ink leading-snug mb-3
                                 group-hover:text-primary transition-colors duration-200"
                  >
                    {featuredVideo.title}
                  </h3>
                  <p className="font-body text-sm text-soft leading-relaxed mb-4">
                    {featuredVideo.description}
                  </p>
                  <p className="font-body text-sm text-muted">
                    {featuredVideo.instructor}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Filter bar ────────────────────────────────────── */}
        <div className="mb-6">
          <FilterBar
            searchValue={searchValue}
            onSearch={handleSearch}
            searchPlaceholder="Search by title, instructor, or topic..."
            categories={VIDEO_CATEGORIES}
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
              Failed to load videos. Please try again.
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
          <VideosSkeleton />
        ) : gridVideos.length === 0 ? (
          <EmptyState search={debouncedSearch} onClear={clearAll} />
        ) : (
          <>
            {/* Videos grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {gridVideos.map((video, i) => (
                <div
                  key={video.id}
                  className={`animate-slide-up stagger-${Math.min(i + 1, 6)}`}
                >
                  <VideoCard video={video} />
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
                  Page {page} of {totalPages} — {total} videos total
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default VideosPage;
