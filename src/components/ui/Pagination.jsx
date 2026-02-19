// src/components/ui/Pagination.jsx
// ============================================================
// Pagination — NurPath UI Component
//
// Page number controls for any paginated list.
// Shows: Prev | 1 2 3 ... 8 9 | Next
// Smart: collapses middle pages with ellipsis when many pages.
//
// Usage:
//   <Pagination
//     page={page}
//     totalPages={totalPages}
//     onPageChange={goToPage}
//   />
// ============================================================

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../../utils/cn";

// ── Build page number array with ellipsis ─────────────────────
// e.g. page=5, total=10 → [1, "...", 4, 5, 6, "...", 10]
const buildPages = (current, total) => {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages = [];
  pages.push(1);

  if (current > 3) pages.push("...");

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  for (let i = start; i <= end; i++) pages.push(i);

  if (current < total - 2) pages.push("...");

  pages.push(total);
  return pages;
};

// ── Page button ───────────────────────────────────────────────
const PageBtn = ({ children, active, disabled, onClick, ariaLabel }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    aria-label={ariaLabel}
    aria-current={active ? "page" : undefined}
    className={cn(
      "inline-flex items-center justify-center",
      "w-9 h-9 rounded-[var(--radius-md)]",
      "font-body text-sm font-medium",
      "transition-all duration-200",
      "border",

      // Active page
      active && "bg-primary text-snow border-primary shadow-sm",

      // Normal page
      !active &&
        !disabled && [
          "bg-surface text-soft border-border",
          "hover:border-primary hover:text-primary hover:bg-primary-soft",
        ],

      // Disabled (prev/next arrows)
      disabled &&
        "opacity-30 cursor-not-allowed bg-surface text-muted border-border",
    )}
  >
    {children}
  </button>
);

// ── Pagination ────────────────────────────────────────────────
const Pagination = ({ page = 1, totalPages = 1, onPageChange, className }) => {
  // Don't render if only one page
  if (totalPages <= 1) return null;

  const pages = buildPages(page, totalPages);

  return (
    <nav
      role="navigation"
      aria-label="Pagination"
      className={cn("flex items-center justify-center gap-1.5", className)}
    >
      {/* ── Previous ──────────────────────────────────────── */}
      <PageBtn
        onClick={() => onPageChange?.(page - 1)}
        disabled={page <= 1}
        ariaLabel="Go to previous page"
      >
        <ChevronLeft size={16} aria-hidden="true" />
      </PageBtn>

      {/* ── Page numbers ──────────────────────────────────── */}
      {pages.map((p, i) =>
        p === "..." ? (
          // Ellipsis
          <span
            key={`ellipsis-${i}`}
            className="w-9 h-9 flex items-center justify-center text-muted text-sm select-none"
            aria-hidden="true"
          >
            ···
          </span>
        ) : (
          // Page number button
          <PageBtn
            key={p}
            active={p === page}
            onClick={() => onPageChange?.(p)}
            ariaLabel={`Go to page ${p}`}
          >
            {p}
          </PageBtn>
        ),
      )}

      {/* ── Next ──────────────────────────────────────────── */}
      <PageBtn
        onClick={() => onPageChange?.(page + 1)}
        disabled={page >= totalPages}
        ariaLabel="Go to next page"
      >
        <ChevronRight size={16} aria-hidden="true" />
      </PageBtn>
    </nav>
  );
};

export default Pagination;
