// src/utils/cn.js
// ============================================================
// Class Name Utility
// Combines clsx (conditional classes) + tailwind-merge
// (deduplicates conflicting Tailwind classes)
//
// Usage:
//   cn("px-4 py-2", isActive && "bg-primary", className)
//   cn("text-sm", large && "text-lg")   ← merge wins, no conflict
// ============================================================

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge class names safely.
 * Resolves Tailwind conflicts (e.g. px-2 + px-4 → px-4 wins).
 *
 * @param {...import("clsx").ClassValue} inputs
 * @returns {string}
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
