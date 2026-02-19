// src/components/sections/CategoryNav.jsx
// ============================================================
// CategoryNav — NurPath Section Component
//
// Horizontal scrollable chip row for filtering by category.
// Highlights the active chip. Calls onSelect when chip clicked.
//
// Usage:
//   <CategoryNav
//     categories={BOOK_CATEGORIES}
//     active={category}
//     onSelect={(id) => { setCategory(id); resetPage(); }}
//   />
// ============================================================

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../../utils/cn";

const CategoryNav = ({
  categories = [], // array from data/categories.js
  active = "all", // currently selected category id
  onSelect, // (id: string) => void
  className,
}) => {
  const scrollRef = useRef(null);

  // ── Scroll left / right with arrow buttons ────────────────
  const scroll = (dir) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -200 : 200,
      behavior: "smooth",
    });
  };

  return (
    <div className={cn("relative flex items-center gap-2", className)}>
      {/* ── Left scroll arrow ──────────────────────────────── */}
      <button
        type="button"
        aria-label="Scroll categories left"
        onClick={() => scroll("left")}
        className={cn(
          "shrink-0 w-8 h-8 rounded-full",
          "flex items-center justify-center",
          "bg-surface border border-border",
          "text-muted hover:text-primary hover:border-primary",
          "transition-all duration-200",
          "shadow-sm",
        )}
      >
        <ChevronLeft size={16} aria-hidden="true" />
      </button>

      {/* ── Scrollable chip row ────────────────────────────── */}
      <div
        ref={scrollRef}
        role="tablist"
        aria-label="Filter by category"
        className={cn(
          "flex items-center gap-2",
          "overflow-x-auto",
          // Hide scrollbar visually but keep functionality
          "scrollbar-none",
          "[&::-webkit-scrollbar]:hidden",
          "[-ms-overflow-style:none]",
          "[scrollbar-width:none]",
          "flex-1",
        )}
      >
        {categories.map((cat) => {
          const isActive = active === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onSelect?.(cat.id)}
              className={cn(
                // Base chip styles
                "inline-flex items-center gap-1.5 shrink-0",
                "px-4 py-1.5 text-sm font-medium font-body",
                "rounded-full border",
                "cursor-pointer transition-all duration-200",
                "select-none whitespace-nowrap",

                // Active vs inactive
                isActive
                  ? "bg-primary text-snow border-primary"
                  : "bg-card text-soft border-border hover:border-primary hover:text-primary hover:bg-primary-soft",
              )}
            >
              {/* Icon */}
              {cat.icon && (
                <span className="text-base leading-none" aria-hidden="true">
                  {cat.icon}
                </span>
              )}

              {/* Label */}
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* ── Right scroll arrow ─────────────────────────────── */}
      <button
        type="button"
        aria-label="Scroll categories right"
        onClick={() => scroll("right")}
        className={cn(
          "shrink-0 w-8 h-8 rounded-full",
          "flex items-center justify-center",
          "bg-surface border border-border",
          "text-muted hover:text-primary hover:border-primary",
          "transition-all duration-200",
          "shadow-sm",
        )}
      >
        <ChevronRight size={16} aria-hidden="true" />
      </button>
    </div>
  );
};

export default CategoryNav;
