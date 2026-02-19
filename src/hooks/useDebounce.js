// src/hooks/useDebounce.js
// ============================================================
// useDebounce — Custom Hook
//
// Delays updating a value until the user stops typing.
// Used in SearchBar to avoid firing API calls on every keystroke.
//
// Usage:
//   const debouncedSearch = useDebounce(searchValue, 400);
//
//   useEffect(() => {
//     if (debouncedSearch) fetchResults(debouncedSearch);
//   }, [debouncedSearch]);
// ============================================================

import { useState, useEffect } from "react";

/**
 * @param {any}    value  — The value to debounce
 * @param {number} delay  — Milliseconds to wait (default 400ms)
 * @returns Debounced value — only updates after delay
 */
export const useDebounce = (value, delay = 400) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Start timer on value change
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup — cancel timer if value changes before delay ends
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};
