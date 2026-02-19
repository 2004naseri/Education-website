// src/hooks/usePagination.js
// ============================================================
// usePagination — Custom Hook
//
// Manages current page + limit for paginated lists.
// Automatically scrolls to top when page changes.
//
// Usage:
//   const { page, limit, goToPage, nextPage, prevPage, reset } =
//     usePagination({ initialPage: 1, initialLimit: 12 });
//
//   // Pass to service + React Query
//   const { data } = useQuery({
//     queryKey: queryKeys.books.list({ page, limit }),
//     queryFn:  () => booksService.getAll({ page, limit }),
//   });
// ============================================================

import { useState, useCallback } from "react";

/**
 * @param {number} [initialPage=1]    — Starting page number
 * @param {number} [initialLimit=12]  — Items per page
 */
export const usePagination = ({ initialPage = 1, initialLimit = 12 } = {}) => {
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);

  // ── Go to specific page + scroll to top ──────────────────
  const goToPage = useCallback((newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // ── Next / Previous shortcuts ─────────────────────────────
  const nextPage = useCallback(() => {
    setPage((prev) => prev + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const prevPage = useCallback(() => {
    setPage((prev) => Math.max(1, prev - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // ── Reset to page 1 — call when filters change ───────────
  const reset = useCallback(() => {
    setPage(1);
  }, []);

  return {
    page,
    limit,
    setLimit,
    goToPage,
    nextPage,
    prevPage,
    reset,
  };
};
