// src/components/ui/EmptyState.jsx
// ============================================================
// EmptyState — NurPath UI Primitive
//
// WHAT IT IS:
//   A centered illustration + message shown when a list or
//   search returns zero results.
//
// WHY WE NEED IT:
//   Without this, the user sees a completely blank page and
//   doesn't know if something broke or if there's just no data.
//   EmptyState gives a clear, friendly message and optionally
//   a button to reset or try again.
//
// WHERE IT'S USED:
//   - BooksPage — no books match the search/filter
//   - HadithPage — no hadith found for a collection
//   - ArticlesPage — no articles in a category
//   - SearchResults — query returns nothing
//
// Usage:
//   <EmptyState />
//   <EmptyState title="No books found" description="Try a different search." />
//   <EmptyState
//     icon="📚"
//     title="No results"
//     description="We couldn't find any books matching your search."
//     action={{ label: "Clear filters", onClick: handleClear }}
//   />
// ============================================================

import Button from "./Button";
import { cn } from "../../utils/cn";

const EmptyState = ({
  // Emoji or icon component shown at top
  icon = "🔍",
  // Main heading
  title = "Nothing found",
  // Supporting description
  description = "Try adjusting your search or filters.",
  // Optional CTA button — { label, onClick, href }
  action,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center",
        "text-center py-20 px-6",
        className,
      )}
      role="status"
      aria-live="polite"
    >
      {/* Icon */}
      <div className="text-5xl mb-5 select-none" aria-hidden="true">
        {icon}
      </div>

      {/* Title */}
      <h3 className="heading-sm text-base mb-2">{title}</h3>

      {/* Description */}
      <p className="text-body text-muted max-w-xs mx-auto mb-6">
        {description}
      </p>

      {/* Optional action button */}
      {action &&
        (action.href ? (
          <Button as="a" href={action.href} variant="secondary" size="sm">
            {action.label}
          </Button>
        ) : (
          <Button variant="secondary" size="sm" onClick={action.onClick}>
            {action.label}
          </Button>
        ))}
    </div>
  );
};

export default EmptyState;
