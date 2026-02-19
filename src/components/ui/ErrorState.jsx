// src/components/ui/ErrorState.jsx
// ============================================================
// ErrorState — NurPath UI Primitive
//
// WHAT IT IS:
//   A centered error message shown when an API request fails.
//   Displays the error message and a "Try Again" button that
//   triggers React Query's refetch function.
//
// WHY WE NEED IT:
//   When the backend is down or returns an error, the user
//   needs to know what happened and have a way to retry.
//   Without this, they'd see a blank page with no explanation.
//
// WHERE IT'S USED:
//   - BooksPage    — if books API fails
//   - HadithPage   — if hadith API fails
//   - QuranPage    — if Quran API fails
//   - Any page using React Query with isError === true
//
// Usage:
//   <ErrorState />
//   <ErrorState message={error.message} onRetry={refetch} />
//   <ErrorState
//     title="Failed to load books"
//     message="Server is not responding."
//     onRetry={refetch}
//   />
// ============================================================

import Button from "./Button";
import { cn } from "../../utils/cn";

const ErrorState = ({
  // Main heading
  title = "Something went wrong",
  // Error detail — pass error.message from React Query
  message = "We couldn't load this content. Please try again.",
  // Retry function — pass refetch from useQuery
  onRetry,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center",
        "text-center py-20 px-6",
        className,
      )}
      role="alert"
      aria-live="assertive"
    >
      {/* Error icon */}
      <div className="text-5xl mb-5 select-none" aria-hidden="true">
        ⚠️
      </div>

      {/* Title */}
      <h3 className="heading-sm text-base mb-2">{title}</h3>

      {/* Error message */}
      <p className="text-body text-muted max-w-xs mx-auto mb-6">{message}</p>

      {/* Retry button */}
      {onRetry && (
        <Button variant="primary" size="sm" onClick={onRetry}>
          Try Again
        </Button>
      )}
    </div>
  );
};

export default ErrorState;
