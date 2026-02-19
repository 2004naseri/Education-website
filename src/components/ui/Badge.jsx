// src/components/ui/Badge.jsx
// ============================================================
// Badge — NurPath UI Primitive
// Small label for status, category, grade
//
// Variants: primary | accent | success | warning | error | muted
//
// Usage:
//   <Badge>Fiqh</Badge>
//   <Badge variant="accent">Featured</Badge>
//   <Badge variant="success">Sahih</Badge>
//   <Badge variant="warning">Hasan</Badge>
//   <Badge variant="error">Daif</Badge>
//   <Badge variant="muted">Draft</Badge>
//   <Badge dot>Live</Badge>
// ============================================================

import { cn } from "../../utils/cn";

// ── Variant styles ────────────────────────────────────────────
const VARIANTS = {
  primary: "bg-primary-soft text-primary border-primary/20",
  accent: "bg-accent-soft  text-accent-dark border-accent/20",
  success: "bg-success-soft text-success border-success/20",
  warning: "bg-warning-soft text-warning border-warning/20",
  error: "bg-error-soft   text-error   border-error/20",
  muted: "bg-surface  text-muted   border-border",
};

// ── Badge ─────────────────────────────────────────────────────
/**
 * @param {"primary"|"accent"|"success"|"warning"|"error"|"muted"} [variant="primary"]
 * @param {boolean} [dot=false]   Show a small colored dot before label
 * @param {string}  [className]
 * @param {React.ReactNode} children
 */
const Badge = ({
  variant = "primary",
  dot = false,
  className,
  children,
  ...props
}) => {
  return (
    <span
      className={cn(
        // Base
        "inline-flex items-center gap-1.5",
        "px-2.5 py-0.5",
        "text-xs font-semibold font-body",
        "rounded-full border",
        "whitespace-nowrap",

        // Variant
        VARIANTS[variant] ?? VARIANTS.primary,

        className,
      )}
      {...props}
    >
      {/* Optional status dot */}
      {dot && (
        <span
          className={cn(
            "w-1.5 h-1.5 rounded-full shrink-0",
            variant === "success" && "bg-success",
            variant === "warning" && "bg-warning",
            variant === "error" && "bg-error",
            variant === "accent" && "bg-accent",
            variant === "primary" && "bg-primary",
            variant === "muted" && "bg-muted",
          )}
          aria-hidden="true"
        />
      )}

      {children}
    </span>
  );
};

export default Badge;
