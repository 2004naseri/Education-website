// src/components/ui/Skeleton.jsx
// ============================================================
// Skeleton — NurPath UI Primitive
//
// WHAT IT IS:
//   Shimmer placeholder blocks that appear while real content
//   is loading. They match the shape and size of the content
//   they replace — so the layout doesn't jump when data arrives.
//
// WHY WE NEED IT:
//   Better UX than a spinner alone. Instead of a blank grid,
//   the user sees grey placeholder cards in the exact shape
//   of a BookCard or ArticleCard. Reduces perceived load time.
//
// WHERE IT'S USED:
//   - BooksPage — while books are loading → show BookCardSkeleton
//   - HadithPage — while hadith load → show HadithCardSkeleton
//   - ArticlesPage — while articles load → show ArticleCardSkeleton
//   - Any page using React Query with isLoading === true
//
// Usage:
//   <Skeleton />                           — one line block
//   <Skeleton width="w-1/2" height="h-6"/> — custom size
//   <BookCardSkeleton />                   — full book card placeholder
//   <ArticleCardSkeleton />                — full article card placeholder
//   <HadithCardSkeleton />                 — full hadith card placeholder
// ============================================================

import { cn } from "../../utils/cn";

// ── Base Skeleton block ───────────────────────────────────────
const Skeleton = ({
  width = "w-full",
  height = "h-4",
  rounded = "rounded-[var(--radius-md)]",
  className,
}) => (
  <div
    className={cn("skeleton", width, height, rounded, className)}
    aria-hidden="true"
  />
);

// ── Book Card Skeleton ────────────────────────────────────────
// Matches the exact layout of BookCard
export const BookCardSkeleton = () => (
  <div className="card overflow-hidden" aria-hidden="true">
    {/* Cover image area */}
    <Skeleton height="h-56" rounded="rounded-none" />
    <div className="p-4 space-y-2.5">
      {/* Arabic title */}
      <Skeleton width="w-3/4" height="h-3" />
      {/* Title */}
      <Skeleton width="w-full" height="h-5" />
      <Skeleton width="w-5/6" height="h-5" />
      {/* Author */}
      <Skeleton width="w-1/2" height="h-3" />
      {/* Footer */}
      <div className="flex justify-between pt-2 border-t border-border">
        <Skeleton width="w-16" height="h-3" />
        <Skeleton width="w-20" height="h-7" />
      </div>
    </div>
  </div>
);

// ── Article Card Skeleton ─────────────────────────────────────
export const ArticleCardSkeleton = () => (
  <div className="card overflow-hidden" aria-hidden="true">
    {/* Cover image */}
    <Skeleton height="h-44" rounded="rounded-none" />
    <div className="p-5 space-y-3">
      {/* Badge + date */}
      <div className="flex gap-2">
        <Skeleton width="w-16" height="h-5" rounded="rounded-full" />
        <Skeleton width="w-24" height="h-5" />
      </div>
      {/* Title */}
      <Skeleton width="w-full" height="h-5" />
      <Skeleton width="w-4/5" height="h-5" />
      {/* Excerpt */}
      <Skeleton width="w-full" height="h-3" />
      <Skeleton width="w-full" height="h-3" />
      <Skeleton width="w-2/3" height="h-3" />
      {/* Author */}
      <div className="flex gap-2 items-center pt-1">
        <Skeleton width="w-8" height="h-8" rounded="rounded-full" />
        <Skeleton width="w-28" height="h-3" />
      </div>
    </div>
  </div>
);

// ── Hadith Card Skeleton ──────────────────────────────────────
export const HadithCardSkeleton = () => (
  <div className="hadith-card" aria-hidden="true">
    {/* Arabic text block */}
    <div className="space-y-2 mb-4 pb-4 border-b border-border">
      <Skeleton width="w-full" height="h-5" />
      <Skeleton width="w-5/6" height="h-5" />
      <Skeleton width="w-4/6" height="h-5" />
    </div>
    {/* Translation */}
    <div className="space-y-2 mb-4">
      <Skeleton width="w-full" height="h-3" />
      <Skeleton width="w-full" height="h-3" />
      <Skeleton width="w-3/4" height="h-3" />
    </div>
    {/* Meta row */}
    <div className="flex justify-between">
      <Skeleton width="w-40" height="h-3" />
      <Skeleton width="w-16" height="h-5" rounded="rounded-full" />
    </div>
  </div>
);

// ── Video Card Skeleton ───────────────────────────────────────
export const VideoCardSkeleton = () => (
  <div className="card overflow-hidden" aria-hidden="true">
    <Skeleton height="h-44" rounded="rounded-none" />
    <div className="p-4 space-y-2.5">
      <Skeleton width="w-full" height="h-5" />
      <Skeleton width="w-3/4" height="h-5" />
      <div className="flex justify-between pt-2 border-t border-border">
        <Skeleton width="w-20" height="h-3" />
        <Skeleton width="w-16" height="h-7" />
      </div>
    </div>
  </div>
);

export default Skeleton;
