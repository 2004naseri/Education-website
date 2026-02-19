// src/components/layout/MobileMenu.jsx
// ============================================================
// MobileMenu — NurPath Layout Component
//
// Slide-in drawer from the left for mobile navigation.
// Reads open/close state from ui.store.js (Zustand).
// Closes on: backdrop click · ESC key · route change.
//
// Usage (called inside Header only):
//   <MobileMenu />
// ============================================================

import { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { X } from "lucide-react";
import { cn } from "../../utils/cn";

// ── Data — nav items live here, not hardcoded inline ────────
// Will be replaced by src/data/navigation.js import later
import { NAVIGATION } from "../../data/navigation";

// ── Zustand store — UI state ─────────────────────────────────
import { useUIStore } from "../../store/ui.store";

const MobileMenu = () => {
  // ── State from store ──────────────────────────────────────
  const { isMobileMenuOpen, closeMobileMenu } = useUIStore();

  // ── Current route — closes menu on navigation ────────────
  const location = useLocation();
  useEffect(() => {
    closeMobileMenu();
  }, [location.pathname, closeMobileMenu]);

  // ── ESC key closes menu ───────────────────────────────────
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeMobileMenu();
    };
    if (isMobileMenuOpen) {
      document.addEventListener("keydown", handleKeyDown);
      // Prevent body scroll while menu is open
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen, closeMobileMenu]);

  return (
    <>
      {/* ── Backdrop overlay ─────────────────────────────── */}
      <div
        aria-hidden="true"
        onClick={closeMobileMenu}
        className={cn(
          "fixed inset-0 z-40",
          "bg-primary/40 backdrop-blur-sm",
          "transition-opacity duration-300",
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        )}
      />

      {/* ── Drawer ───────────────────────────────────────── */}
      <nav
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
        className={cn(
          // Position — slides in from left
          "fixed top-0 left-0 z-50",
          "h-full w-[280px] sm:w-[320px]",

          // Appearance
          "bg-surface border-r border-border",
          "shadow-[var(--shadow-xl)]",

          // Slide animation
          "transition-transform duration-300 ease-in-out",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* ── Drawer header ──────────────────────────────── */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          {/* Logo mark */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-accent text-sm font-bold font-display">
                ن
              </span>
            </div>
            <div>
              <p className="font-display font-bold  text-base leading-none">
                NurPath
              </p>
              <p className="font-arabic-ui text-xs text-accent leading-none mt-0.5">
                نورالطريق
              </p>
            </div>
          </div>

          {/* Close button */}
          <button
            type="button"
            onClick={closeMobileMenu}
            aria-label="Close menu"
            className="btn-icon w-8 h-8"
          >
            <X size={16} aria-hidden="true" />
          </button>
        </div>

        {/* ── Nav links ──────────────────────────────────── */}
        <div className="flex flex-col px-4 py-6 gap-1 overflow-y-auto h-[calc(100%-80px)]">
          {NAVIGATION.map((item) => (
            <div key={item.path}>
              {/* Top-level link */}
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg",
                    "font-body text-sm font-medium",
                    "transition-all duration-200",
                    isActive
                      ? "bg-primary text-light"
                      : "text-soft hover:bg-primary-soft hover:text-primary",
                  )
                }
              >
                {/* Optional icon from nav data */}
                {item.icon && (
                  <span className="text-lg" aria-hidden="true">
                    {item.icon}
                  </span>
                )}
                {item.label}
              </NavLink>

              {/* Dropdown children — rendered as sub-links */}
              {item.children?.map((child) => (
                <NavLink
                  key={child.path}
                  to={child.path}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 pl-11 pr-4 py-2.5 rounded-lg",
                      "font-body text-sm",
                      "transition-all duration-200",
                      isActive
                        ? "text-primary font-semibold"
                        : "text-muted hover:text-primary",
                    )
                  }
                >
                  {child.label}
                </NavLink>
              ))}
            </div>
          ))}

          {/* ── Divider ────────────────────────────────── */}
          <div className="border-t border-border my-4" />

          {/* ── Bottom CTA ─────────────────────────────── */}
          <a
            href="mailto:contact@nurpath.com"
            className="btn-accent w-full justify-center text-sm py-3 rounded-lg"
          >
            ✦ Support Us
          </a>
        </div>
      </nav>
    </>
  );
};

export default MobileMenu;
