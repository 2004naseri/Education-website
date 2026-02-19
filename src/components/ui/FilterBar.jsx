// src/components/ui/FilterBar.jsx
// ============================================================
// FilterBar — NurPath UI Component
//
// Combines: SearchBar + CategoryNav chips + optional sort dropdown
// Used at the top of every list page (Books, Articles, Videos etc.)
//
// Usage:
//   <FilterBar
//     searchValue={search}
//     onSearch={handleSearch}
//     categories={BOOK_CATEGORIES}
//     activeCategory={category}
//     onCategoryChange={(id) => { setCategory(id); reset(); }}
//     sortOptions={SORT_OPTIONS}
//     activeSort={sort}
//     onSortChange={setSort}
//     totalResults={120}
//   />
// ============================================================

import { SlidersHorizontal } from "lucide-react";
import { cn } from "../../utils/cn";
import SearchBar from "./SearchBar";
import CategoryNav from "../sections/CategoryNav";

const FilterBar = ({
  // Search
  searchValue = "",
  onSearch,
  searchPlaceholder = "Search...",

  // Category chips
  categories = [],
  activeCategory = "all",
  onCategoryChange,

  // Sort
  sortOptions = [],
  activeSort = "popular",
  onSortChange,

  // Results info
  totalResults,
  isLoading = false,

  className,
}) => {
  return (
    <div className={cn("space-y-4", className)}>
      {/* ── Row 1: Search + Sort ──────────────────────────── */}
      <div className="flex items-center gap-3">
        {/* Search — takes all remaining space */}
        <SearchBar
          value={searchValue}
          onSearch={onSearch}
          placeholder={searchPlaceholder}
          className="flex-1"
        />

        {/* Sort dropdown — only shown when sortOptions provided */}
        {sortOptions.length > 0 && (
          <div className="relative shrink-0">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <SlidersHorizontal
                size={14}
                className="text-muted"
                aria-hidden="true"
              />
            </div>
            <select
              value={activeSort}
              onChange={(e) => onSortChange?.(e.target.value)}
              aria-label="Sort results"
              className={cn(
                "h-11 pl-9 pr-8 text-sm font-body font-medium",
                "bg-surface text-ink",
                "border border-border rounded-[var(--radius-md)]",
                "appearance-none cursor-pointer",
                "transition-all duration-200 outline-none",
                "focus:border-primary focus:ring-2 focus:ring-primary/10",
                "hover:border-border-strong",
              )}
            >
              {sortOptions.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
            {/* Custom dropdown arrow */}
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M1 1l4 4 4-4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-muted"
                />
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* ── Row 2: Category chips + result count ─────────── */}
      {categories.length > 0 && (
        <div className="flex items-center gap-4">
          {/* Category chips — scrollable */}
          <CategoryNav
            categories={categories}
            active={activeCategory}
            onSelect={onCategoryChange}
            className="flex-1 min-w-0"
          />

          {/* Result count — shown when not loading */}
          {totalResults !== undefined && !isLoading && (
            <p className="shrink-0 font-body text-xs text-muted whitespace-nowrap">
              {totalResults.toLocaleString()} result
              {totalResults !== 1 ? "s" : ""}
            </p>
          )}

          {/* Loading indicator */}
          {isLoading && (
            <div className="shrink-0 loader-sm" aria-label="Loading results" />
          )}
        </div>
      )}
    </div>
  );
};

export default FilterBar;
