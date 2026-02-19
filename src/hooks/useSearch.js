// src/hooks/useSearch.js
// ============================================================
// useSearch — Custom Hook
//
// Combines search input state + debounce in one hook.
// Resets pagination to page 1 whenever search changes.
//
// Usage:
//   const { searchValue, debouncedSearch, handleSearch, clearSearch } =
//     useSearch({ onSearch: reset });   // pass pagination reset
//
//   // Use debouncedSearch in React Query — not raw searchValue
//   useQuery({
//     queryKey: queryKeys.books.list({ search: debouncedSearch }),
//     queryFn:  () => booksService.getAll({ search: debouncedSearch }),
//   });
// ============================================================

import { useState, useCallback } from "react";
import { useDebounce } from "./useDebounce";

/**
 * @param {Function} [onSearch]  — Called when search changes (e.g. pagination reset)
 * @param {number}   [delay=400] — Debounce delay in ms
 */
export const useSearch = ({ onSearch, delay = 400 } = {}) => {
  const [searchValue, setSearchValue] = useState("");

  // ── Debounced value — use this in API calls ───────────────
  const debouncedSearch = useDebounce(searchValue, delay);

  // ── Handle input change ───────────────────────────────────
  const handleSearch = useCallback(
    (value) => {
      setSearchValue(value);
      // Reset pagination to page 1 on new search
      if (onSearch) onSearch();
    },
    [onSearch],
  );

  // ── Clear search ──────────────────────────────────────────
  const clearSearch = useCallback(() => {
    setSearchValue("");
    if (onSearch) onSearch();
  }, [onSearch]);

  return {
    searchValue, // raw — bind to <input> value
    debouncedSearch, // delayed — use in queryKey + queryFn
    handleSearch, // pass to onChange
    clearSearch, // pass to clear button
    hasSearch: debouncedSearch.trim().length > 0,
  };
};
