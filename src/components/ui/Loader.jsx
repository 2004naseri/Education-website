// src/components/ui/Loader.jsx
// ============================================================
// Loader — NurPath UI Primitive
//
// WHAT IT IS:
//   A spinning loading indicator. Comes in two modes:
//   - Inline: small spinner inside a button or next to text
//   - Fullscreen: centered spinner that covers the whole page
//
// WHY WE NEED IT:
//   When React Query is fetching data (books, hadith, articles),
//   we show this instead of a blank page. It tells the user
//   "something is loading, please wait."
//
// WHERE IT'S USED:
//   - AppRouter.jsx — PageLoader while lazy pages load
//   - BooksPage, HadithPage, QuranPage — while API fetches data
//   - Button.jsx — inline spinner when loading={true}
//
// Usage:
//   <Loader />                    — centered fullscreen
//   <Loader fullscreen />         — fullscreen with bg overlay
//   <Loader size="sm" />          — small inline spinner
//   <Loader size="lg" label="Loading books..." />
// ============================================================

import { cn } from "../../utils/cn";

const SIZE_MAP = {
  sm: "w-5 h-5 border-2",
  md: "w-10 h-10 border-2",
  lg: "w-14 h-14 border-[3px]",
};

const Loader = ({
  size = "md",
  // Wrap in a fullscreen centered container
  fullscreen = false,
  // Accessible label for screen readers
  label = "Loading...",
  className,
}) => {
  const spinner = (
    <div
      role="status"
      aria-label={label}
      className={cn(
        "flex flex-col items-center justify-center gap-3",
        className,
      )}
    >
      {/* Spinner ring */}
      <span
        className={cn(
          "rounded-full",
          "border-border", // track color
          "border-t-primary", // active arc color
          "animate-spin",
          SIZE_MAP[size] ?? SIZE_MAP.md,
        )}
        aria-hidden="true"
      />

      {/* Visible label — shown only on lg size */}
      {size === "lg" && (
        <p className="text-sm text-muted font-body animate-pulse">{label}</p>
      )}

      {/* Hidden text for screen readers */}
      <span className="sr-only">{label}</span>
    </div>
  );

  // Fullscreen mode — covers the whole viewport
  if (fullscreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
        {spinner}
      </div>
    );
  }

  // Default — centers in its parent container
  return (
    <div className="flex items-center justify-center w-full py-16">
      {spinner}
    </div>
  );
};

export default Loader;
