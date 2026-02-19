// src/components/layout/AppLayout.jsx
// ============================================================
// AppLayout — NurPath Root Layout
//
// Wraps every page via React Router's <Outlet />.
// Structure:
//   <Header />            ← sticky top
//   <main id="main-content">
//     <Outlet />          ← page content renders here
//   </main>
//   <Footer />            ← always at bottom
//
// Also:
//   • Applies theme (.dark class) on mount via useTheme hook
//   • Applies language direction (dir attr) via useLanguage hook
//   • Scroll restoration on route change
// ============================================================

import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";

// ── Layout components ─────────────────────────────────────────
import Header from "./Header";
import Footer from "./Footer";

// ── Hooks — apply theme + language to <html> ─────────────────
import { useTheme } from "../../hooks/useTheme";
import { useLanguage } from "../../hooks/useLanguage";

// ── AppLayout ─────────────────────────────────────────────────
const AppLayout = () => {
  // ── Apply .dark class to <html> based on theme store ──────
  useTheme();

  // ── Apply dir + lang attrs to <html> based on lang store ──
  useLanguage();

  // ── Scroll to top on every route change ───────────────────
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return (
    // min-h-screen + flex col ensures footer sticks to bottom
    // even on short pages
    <div className="min-h-screen flex flex-col bg-background">
      {/* ── Top navigation ─────────────────────────────────── */}
      <Header />

      {/* ── Page content ───────────────────────────────────── */}
      {/* id="main-content" → skip link target in Header */}
      <main
        id="main-content"
        className="flex-1"
        tabIndex={-1} // allows skip link to focus this element
      >
        <Outlet />
      </main>

      {/* ── Site footer ────────────────────────────────────── */}
      <Footer />
    </div>
  );
};

export default AppLayout;
