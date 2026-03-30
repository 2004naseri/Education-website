// src/components/layout/Header.jsx
// ============================================================
// Header — NurPath Layout Component
//
// Features:
//   • Sticky top — shrinks + gets shadow on scroll
//   • Logo (EN + Arabic)
//   • Desktop nav links with active state
//   • Dropdown for "Islamic Sciences" group
//   • Search icon toggle
//   • Language switcher (EN / FA / PS) → sets dir on <html>
//   • Theme toggle (light / dark)
//   • Mobile hamburger → opens MobileMenu drawer
//
// Data:  nav links from src/data/navigation.js
// Store: theme from theme.store.js · UI from ui.store.js · lang from lang.store.js
// ============================================================

import { useState, useEffect, useRef } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, Search, X, Sun, Moon, ChevronDown } from "lucide-react";
import { cn } from "../../utils/cn";

// ── Data ──────────────────────────────────────────────────────
import { NAVIGATION } from "../../data/navigation";

// ── Stores ───────────────────────────────────────────────────
import { useThemeStore } from "../../store/theme.store";
import { useUIStore } from "../../store/ui.store";
import { useLangStore } from "../../store/lang.store";
import MobileMenu from "./Mobilemenu.jsx";

// ── Child component ───────────────────────────────────────────

// ── Language options ──────────────────────────────────────────
// Defined here — single source of language config
const LANGUAGES = [
  { code: "en", label: "EN", dir: "ltr", full: "English" },
  // { code: "fa", label: "FA", dir: "rtl", full: "دری" },
  // { code: "ps", label: "PS", dir: "rtl", full: "پښتو" },
];

// ── Header ────────────────────────────────────────────────────
const Header = () => {
  // ── Scroll state — adds shadow + shrinks padding ──────────
  const [isScrolled, setIsScrolled] = useState(false);

  // ── Search bar visible ────────────────────────────────────
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const searchInputRef = useRef(null);

  // ── Dropdown open (desktop nav) ───────────────────────────
  const [openDropdown, setOpenDropdown] = useState(null);
  // ── Dropdown refs ─────────────────────────────
  const desktopDropdownRef = useRef(null); // for nav links dropdown
  const langDropdownRef = useRef(null); // for language dropdown

  // ── Lang dropdown ─────────────────────────────────────────
  const [isLangOpen, setIsLangOpen] = useState(false);

  // ── Zustand stores ────────────────────────────────────────
  const { theme, toggleTheme } = useThemeStore();
  const { toggleMobileMenu } = useUIStore();
  const { lang, setLang } = useLangStore();

  const isDark = theme === "dark";

  // ── Scroll listener ───────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Focus search input when opened ────────────────────────
  useEffect(() => {
    if (isSearchOpen) searchInputRef.current?.focus();
  }, [isSearchOpen]);

  // ── ESC closes search ─────────────────────────────────────
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setIsSearchOpen(false);
        setOpenDropdown(null);
        setIsLangOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // ── Click outside closes dropdowns ───────────────────────
  useEffect(() => {
    const onClick = (e) => {
      // Close desktop nav dropdown if clicked outside
      if (!desktopDropdownRef.current?.contains(e.target)) {
        setOpenDropdown(null);
      }

      // Close language dropdown if clicked outside
      if (!langDropdownRef.current?.contains(e.target)) {
        setIsLangOpen(false);
      }
    };

    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  // ── Handle language change ────────────────────────────────
  const handleLangChange = (langCode) => {
    setLang(langCode);
    setIsLangOpen(false);
  };

  // ── Handle search submit ──────────────────────────────────
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      // TODO: navigate to /search?q=searchValue when search page is built
      console.log("Search:", searchValue);
    }
  };

  const currentLang = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0];

  // ── Render ────────────────────────────────────────────────
  return (
    <>
      <header
        className={cn(
          // Position — sticky to top
          "sticky top-0 z-30",

          // Background + border
          "bg-surface border-b border-border",

          // Smooth transition on scroll
          "transition-all duration-300",

          // Shadow + glass on scroll
          isScrolled &&
            "shadow-[var(--shadow-md)] backdrop-blur-md bg-surface/95",
        )}
        role="banner"
      >
        {/* ── Skip to main content (accessibility) ─────────── */}
        <a href="#main-content" className="skip-to-main">
          Skip to main content
        </a>

        {/* ── Main header row ──────────────────────────────── */}
        <div className="container-custom">
          <div
            className={cn(
              "flex items-center justify-between gap-4",
              // Height shrinks on scroll
              "transition-all duration-300",
              isScrolled ? "h-14" : "h-16 sm:h-18",
            )}
          >
            {/* ══ LEFT — Logo ════════════════════════════════ */}
            <Link
              to="/"
              aria-label="NurPath — Home"
              className="flex items-center gap-2.5 shrink-0 group"
            >
              {/* Logo mark — geometric Islamic star */}
              <div
                className={cn(
                  "flex items-center justify-center rounded-lg",
                  "bg-primary transition-all duration-300",
                  isScrolled ? "w-8 h-8" : "w-9 h-9",
                )}
                aria-hidden="true"
              >
                <span className="text-accent font-display font-bold text-base leading-none">
                  ن
                </span>
              </div>

              {/* Logo text */}
              <div>
                <p className="font-display font-bold text-base text-base leading-none group-hover:text-primary transition-colors duration-200">
                  NurPath
                </p>
                <p className="font-arabic-ui text-xs text-accent leading-none mt-0.5">
                  نورالطريق
                </p>
              </div>
            </Link>

            {/* ══ CENTER — Desktop nav ════════════════════════ */}
            <nav
              aria-label="Main navigation"
              className="hidden lg:flex items-center gap-1"
              ref={desktopDropdownRef} // NEW
            >
              {NAVIGATION.map((item) => {
                const hasChildren = item.children?.length > 0;
                const isOpen = openDropdown === item.label;

                return (
                  <div key={item.label} className="relative">
                    {/* Nav link — or dropdown trigger */}
                    {hasChildren ? (
                      /* Dropdown trigger button */
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-haspopup="true"
                        onClick={() =>
                          setOpenDropdown(isOpen ? null : item.label)
                        }
                        className={cn(
                          "flex items-center gap-1 px-3 py-2 rounded-lg",
                          "font-body text-sm font-medium",
                          "transition-all duration-200",
                          "text-soft hover:text-primary hover:bg-primary-soft",
                          isOpen && "text-primary bg-primary-soft",
                        )}
                      >
                        {item.label}
                        <ChevronDown
                          size={14}
                          aria-hidden="true"
                          className={cn(
                            "transition-transform duration-200",
                            isOpen && "rotate-180",
                          )}
                        />
                      </button>
                    ) : (
                      /* Regular nav link */
                      <NavLink
                        to={item.path}
                        className={({ isActive }) =>
                          cn(
                            "flex items-center px-3 py-2 rounded-lg",
                            "font-body text-sm font-medium",
                            "transition-all duration-200",
                            isActive
                              ? "text-primary bg-primary-soft font-semibold"
                              : "text-soft hover:text-primary hover:bg-primary-soft",
                          )
                        }
                      >
                        {item.label}
                      </NavLink>
                    )}

                    {/* ── Dropdown panel ─────────────────────── */}
                    {hasChildren && isOpen && (
                      <div
                        role="menu"
                        className={cn(
                          // Position
                          "absolute top-full left-0 mt-2 z-50",
                          "min-w-[180px]",

                          // Appearance
                          "bg-surface border border-border",
                          "rounded-[var(--radius-lg)]",
                          "shadow-[var(--shadow-lg)]",

                          // Animation
                          "animate-scale-in",
                        )}
                      >
                        {item.children.map((child) => (
                          <NavLink
                            key={child.path}
                            to={child.path}
                            role="menuitem"
                            onClick={() => setOpenDropdown(null)}
                            className={({ isActive }) =>
                              cn(
                                "flex items-center gap-2 px-4 py-2.5",
                                "font-body text-sm",
                                "transition-colors duration-150",
                                "first:rounded-t-[var(--radius-lg)]",
                                "last:rounded-b-[var(--radius-lg)]",
                                isActive
                                  ? "bg-primary-soft text-primary font-semibold"
                                  : "text-soft hover:bg-primary-soft hover:text-primary",
                              )
                            }
                          >
                            {child.icon && (
                              <span aria-hidden="true">{child.icon}</span>
                            )}
                            {child.label}
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* ══ RIGHT — Actions ════════════════════════════ */}
            <div className="flex items-center gap-2 shrink-0">
              {/* ── Search toggle ──────────────────────────── */}
              <button
                type="button"
                aria-label={isSearchOpen ? "Close search" : "Open search"}
                aria-expanded={isSearchOpen}
                onClick={() => {
                  setIsSearchOpen((prev) => !prev);
                  setSearchValue("");
                }}
                className="btn-icon"
              >
                {isSearchOpen ? (
                  <X size={18} aria-hidden="true" />
                ) : (
                  <Search size={18} aria-hidden="true" />
                )}
              </button>

              {/* ── Language switcher ──────────────────────── */}
              <div className="relative" ref={langDropdownRef}>
                <button
                  type="button"
                  aria-label="Switch language"
                  aria-expanded={isLangOpen}
                  aria-haspopup="true"
                  onClick={() => setIsLangOpen((prev) => !prev)}
                  className={cn(
                    "btn-icon",
                    "font-body text-xs font-bold",
                    "min-w-[40px] px-1",
                  )}
                >
                  {currentLang.label}
                </button>

                {/* Lang dropdown */}
                {isLangOpen && (
                  <div
                    role="menu"
                    className={cn(
                      "absolute top-full right-0 mt-2 z-50",
                      "w-32",
                      "bg-surface border border-border",
                      "rounded-[var(--radius-lg)]",
                      "shadow-[var(--shadow-lg)]",
                      "animate-scale-in overflow-hidden",
                    )}
                  >
                    {LANGUAGES.map((l) => (
                      <button
                        key={l.code}
                        role="menuitem"
                        type="button"
                        onClick={() => handleLangChange(l.code)}
                        className={cn(
                          "w-full flex items-center justify-between",
                          "px-3 py-2.5",
                          "font-body text-sm",
                          "transition-colors duration-150",
                          "hover:bg-primary-soft hover:text-primary",
                          lang === l.code
                            ? "bg-primary-soft text-primary font-semibold"
                            : "text-soft",
                        )}
                      >
                        {/* Full language name */}
                        <span
                          className={cn(l.dir === "rtl" && "font-arabic-ui")}
                        >
                          {l.full}
                        </span>

                        {/* Active indicator */}
                        {lang === l.code && (
                          <span
                            className="w-1.5 h-1.5 rounded-full bg-primary"
                            aria-hidden="true"
                          />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* ── Theme toggle ───────────────────────────── */}
              <button
                type="button"
                aria-label={
                  isDark ? "Switch to light mode" : "Switch to dark mode"
                }
                onClick={toggleTheme}
                className="btn-icon"
              >
                {isDark ? (
                  <Sun size={18} aria-hidden="true" />
                ) : (
                  <Moon size={18} aria-hidden="true" />
                )}
              </button>

              {/* ── Donate CTA — hidden on small screens ───── */}
              <Link
                to="/contact"
                className={cn(
                  "btn-accent hidden md:inline-flex",
                  "text-xs px-4 py-2",
                )}
              >
                ✦ Donate
              </Link>

              {/* ── Mobile hamburger ───────────────────────── */}
              <button
                type="button"
                aria-label="Open menu"
                aria-controls="mobile-menu"
                aria-expanded={false}
                onClick={toggleMobileMenu}
                className="btn-icon lg:hidden"
              >
                <Menu size={20} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        {/* ══ SEARCH BAR — slides down under header ══════════ */}
        <div
          className={cn(
            "overflow-hidden border-t border-border",
            "transition-all duration-300 ease-in-out",
            isSearchOpen ? "max-h-20 opacity-100" : "max-h-0 opacity-0",
          )}
          aria-hidden={!isSearchOpen}
        >
          <div className="container-custom py-3">
            <form
              role="search"
              onSubmit={handleSearchSubmit}
              className="relative flex items-center gap-2"
            >
              {/* Search icon inside input */}
              <Search
                size={16}
                aria-hidden="true"
                className="absolute left-4 text-muted pointer-events-none"
              />

              {/* Search input */}
              <input
                ref={searchInputRef}
                type="search"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search books, hadith, Quran ayat, articles..."
                aria-label="Search Islamic content"
                className={cn(
                  "input input-search w-full",
                  "rounded-full pl-10 pr-4",
                )}
              />

              {/* Submit button */}
              <button
                type="submit"
                className="btn-primary text-xs px-5 py-2.5 rounded-full shrink-0"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* ══ Mobile drawer — rendered outside header ════════════ */}
      <MobileMenu />
    </>
  );
};

export default Header;
