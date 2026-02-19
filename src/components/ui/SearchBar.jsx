// src/components/ui/SearchBar.jsx
// ============================================================
// SearchBar — NurPath UI Component
//
// Standalone search input with icon, clear button, submit.
// Uses useSearch hook internally for debounce.
//
// Usage:
//   <SearchBar
//     placeholder="Search books..."
//     onSearch={(val) => setSearch(val)}
//     value={searchValue}
//   />
//   <SearchBar size="lg" autoFocus />
// ============================================================

import { useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import { cn } from "../../utils/cn";

const SearchBar = ({
  value = "", // controlled value — bind from parent
  onSearch, // (value: string) => void — called on every keystroke
  onSubmit, // (value: string) => void — called on Enter / button click
  placeholder = "Search...",
  size = "md", // "sm" | "md" | "lg"
  autoFocus = false,
  className,
  ...props
}) => {
  const inputRef = useRef(null);

  // ── Auto focus on mount ───────────────────────────────────
  useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);

  // ── Size variants ─────────────────────────────────────────
  const sizeClasses = {
    sm: { wrap: "h-9", input: "pl-9  pr-8  text-xs", icon: 14, clear: 12 },
    md: { wrap: "h-11", input: "pl-10 pr-10 text-sm", icon: 16, clear: 14 },
    lg: { wrap: "h-13", input: "pl-12 pr-12 text-base", icon: 18, clear: 16 },
  }[size] ?? {
    wrap: "h-11",
    input: "pl-10 pr-10 text-sm",
    icon: 16,
    clear: 14,
  };

  const handleChange = (e) => {
    onSearch?.(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") onSubmit?.(value);
    if (e.key === "Escape") {
      onSearch?.("");
      inputRef.current?.blur();
    }
  };

  const handleClear = () => {
    onSearch?.("");
    inputRef.current?.focus();
  };

  return (
    <div
      className={cn("relative flex items-center", sizeClasses.wrap, className)}
      {...props}
    >
      {/* ── Search icon ──────────────────────────────────── */}
      <Search
        size={sizeClasses.icon}
        aria-hidden="true"
        className="absolute left-3 text-muted pointer-events-none shrink-0"
      />

      {/* ── Input ────────────────────────────────────────── */}
      <input
        ref={inputRef}
        type="search"
        role="searchbox"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        aria-label={placeholder}
        className={cn(
          // Base input styles (mirrors .input class from CSS)
          "w-full h-full font-body",
          "bg-surface text-ink",
          "border border-border",
          "rounded-[var(--radius-md)]",
          "placeholder:text-muted",
          "transition-all duration-200 outline-none",
          "focus:border-primary focus:ring-2 focus:ring-primary/10",
          "hover:border-border-strong",
          // Dynamic padding from size
          sizeClasses.input,
          // Hide browser's default X button (we use our own)
          "[&::-webkit-search-cancel-button]:hidden",
        )}
      />

      {/* ── Clear button — shown only when there's a value ── */}
      {value && (
        <button
          type="button"
          aria-label="Clear search"
          onClick={handleClear}
          className={cn(
            "absolute right-3",
            "w-5 h-5 rounded-full",
            "flex items-center justify-center",
            "text-muted hover:text-ink hover:bg-border",
            "transition-all duration-150",
          )}
        >
          <X size={sizeClasses.clear} aria-hidden="true" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
