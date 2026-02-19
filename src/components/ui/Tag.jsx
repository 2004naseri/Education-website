// src/components/ui/Tag.jsx
// ============================================================
// Tag — NurPath UI Primitive
// Topic labels — removable or static
//
// Usage:
//   <Tag>Tafsir</Tag>
//   <Tag onRemove={() => handleRemove("tafsir")}>Tafsir</Tag>
//   <Tag active>Fiqh</Tag>
//   <Tag onClick={() => setFilter("hadith")}>Hadith</Tag>
// ============================================================

import { X } from "lucide-react";
import { cn } from "../../utils/cn";

// ── Tag ───────────────────────────────────────────────────────
/**
 * @param {boolean}  [active=false]     Highlighted state (e.g. selected filter)
 * @param {Function} [onRemove]         If provided, shows X button — makes tag removable
 * @param {Function} [onClick]          Makes tag clickable (filter chip behavior)
 * @param {string}   [className]
 * @param {React.ReactNode} children
 */
const Tag = ({
  active = false,
  onRemove,
  onClick,
  className,
  children,
  ...props
}) => {
  const isClickable = Boolean(onClick);
  const isRemovable = Boolean(onRemove);

  return (
    <span
      role={isClickable ? "button" : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onClick={onClick}
      onKeyDown={
        isClickable
          ? (e) => (e.key === "Enter" || e.key === " ") && onClick(e)
          : undefined
      }
      className={cn(
        // Base
        "inline-flex items-center gap-1",
        "px-3 py-1",
        "text-xs font-medium font-body",
        "rounded-full border",
        "transition-all duration-200",
        "whitespace-nowrap",

        // Default state
        !active && [
          "bg-surface text-soft border-border",
          isClickable &&
            "cursor-pointer hover:border-primary hover:text-primary hover:bg-primary-soft",
        ],

        // Active state
        active && [
          "bg-primary text-light border-primary",
          isClickable &&
            "cursor-pointer hover:bg-primary-dark hover:border-primary-dark",
        ],

        // Focus ring for keyboard nav
        isClickable &&
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1",

        className,
      )}
      {...props}
    >
      {children}

      {/* Remove button */}
      {isRemovable && (
        <button
          type="button"
          aria-label={`Remove ${children}`}
          onClick={(e) => {
            e.stopPropagation(); // don't fire parent onClick
            onRemove(e);
          }}
          className={cn(
            "ml-0.5 -mr-0.5",
            "w-3.5 h-3.5 rounded-full",
            "inline-flex items-center justify-center",
            "transition-colors duration-150",
            "focus:outline-none focus-visible:ring-1 focus-visible:ring-accent",
            active
              ? "text-light/70 hover:text-light hover:bg-primary-dark"
              : "text-muted hover:text-base hover:bg-border",
          )}
        >
          <X size={9} strokeWidth={2.5} aria-hidden="true" />
        </button>
      )}
    </span>
  );
};

export default Tag;
