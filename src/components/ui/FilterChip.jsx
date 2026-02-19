// src/components/ui/FilterChip.jsx
// ============================================================
// FilterChip — NurPath UI Component
//
// Active filter badge with X to remove it.
// Shown above results when filters are applied.
//
// Usage:
//   {activeCategory !== "all" && (
//     <FilterChip
//       label={`Category: ${activeCategory}`}
//       onRemove={() => setCategory("all")}
//     />
//   )}
//
//   // Or render a row of active filters:
//   <div className="flex flex-wrap gap-2">
//     {activeFilters.map(f => (
//       <FilterChip key={f.id} label={f.label} onRemove={() => removeFilter(f.id)} />
//     ))}
//     {activeFilters.length > 1 && (
//       <FilterChip label="Clear all" onRemove={clearAllFilters} variant="ghost" />
//     )}
//   </div>
// ============================================================

import { X } from "lucide-react";
import { cn } from "../../utils/cn";

const FilterChip = ({
  label, // text shown inside chip
  onRemove, // () => void — called when X clicked
  variant = "default", // "default" | "ghost"
  className,
}) => {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5",
        "px-3 py-1",
        "text-xs font-medium font-body",
        "rounded-full border",
        "whitespace-nowrap",
        "animate-scale-in",

        // Variant styles
        variant === "default" && [
          "bg-primary-soft text-primary border-primary/20",
        ],
        variant === "ghost" && [
          "bg-surface text-muted border-border",
          "hover:text-error hover:border-error/30 hover:bg-error-soft",
        ],

        className,
      )}
    >
      {/* Label */}
      {label}

      {/* Remove button */}
      {onRemove && (
        <button
          type="button"
          aria-label={`Remove filter: ${label}`}
          onClick={onRemove}
          className={cn(
            "ml-0.5 -mr-0.5",
            "w-4 h-4 rounded-full",
            "inline-flex items-center justify-center",
            "transition-colors duration-150",
            "focus:outline-none focus-visible:ring-1 focus-visible:ring-accent",
            variant === "default"
              ? "text-primary/60 hover:text-primary hover:bg-primary/10"
              : "text-muted/60 hover:text-error hover:bg-error-soft",
          )}
        >
          <X size={10} strokeWidth={2.5} aria-hidden="true" />
        </button>
      )}
    </span>
  );
};

export default FilterChip;
