// src/store/ui.store.js
// ============================================================
// UI Store — Zustand
//
// Manages: mobile menu open/close, search open/close
// NOT persisted — resets on every page load (correct behavior)
//
// Usage:
//   const { isMobileMenuOpen, toggleMobileMenu } = useUIStore();
// ============================================================

import { create } from "zustand";

export const useUIStore = create((set) => ({
  // ── State ───────────────────────────────────────────────
  isMobileMenuOpen: false,
  isSearchOpen: false,

  // ── Actions ─────────────────────────────────────────────

  // Mobile menu
  toggleMobileMenu: () =>
    set((s) => ({ isMobileMenuOpen: !s.isMobileMenuOpen })),
  openMobileMenu: () => set({ isMobileMenuOpen: true }),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),

  // Search bar
  toggleSearch: () => set((s) => ({ isSearchOpen: !s.isSearchOpen })),
  openSearch: () => set({ isSearchOpen: true }),
  closeSearch: () => set({ isSearchOpen: false }),
}));
