// src/components/ui/Button.jsx
// ============================================================
// Button — NurPath UI Primitive
//
// Variants:  primary | secondary | accent | ghost | icon
// Sizes:     sm | md | lg
//
// Usage:
//   <Button>Explore Library</Button>
//   <Button variant="accent" size="lg">Download PDF</Button>
//   <Button variant="ghost" iconEnd={<ArrowRight size={16} />}>Read More</Button>
//   <Button variant="icon" aria-label="Search"><Search size={18} /></Button>
//   <Button loading>Saving...</Button>
//   <Button as="a" href="/books">Go to Books</Button>
// ============================================================

import { cn } from "../../utils/cn";

// ── Variant styles — ONLY design token classes ────────────────
const VARIANTS = {
  primary: [
    "bg-primary text-light",
    "border border-transparent",
    "hover:bg-primary-dark hover:shadow-lg hover:-translate-y-0.5",
    "active:translate-y-0 active:shadow-none",
    "focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
  ],
  secondary: [
    "bg-transparent text-primary",
    "border border-primary",
    "hover:bg-primary hover:text-light hover:shadow-md hover:-translate-y-0.5",
    "active:translate-y-0",
    "focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
  ],
  accent: [
    "bg-accent text-base",
    "border border-transparent",
    "hover:bg-accent-dark hover:-translate-y-0.5",
    "active:translate-y-0",
    "focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
  ],
  ghost: [
    "bg-transparent text-soft",
    "border border-transparent",
    "hover:bg-overlay hover:text-base",
    "active:bg-border",
    "focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
  ],
  icon: [
    "bg-card text-soft",
    "border border-border",
    "hover:border-accent hover:text-accent hover:bg-accent-soft",
    "focus-visible:ring-2 focus-visible:ring-accent",
  ],
};

// ── Size styles ───────────────────────────────────────────────
const SIZES = {
  sm: "px-4 py-2 text-xs gap-1.5",
  md: "px-6 py-2.5 text-sm gap-2",
  lg: "px-8 py-3.5 text-base gap-2.5",
};

const ICON_SIZES = {
  sm: "w-8 h-8",
  md: "w-10 h-10",
  lg: "w-12 h-12",
};

// ── Spinner ───────────────────────────────────────────────────
const Spinner = ({ size }) => (
  <span
    className={cn(
      "rounded-full border-2 border-light/30 border-t-light animate-spin",
      size === "sm" ? "w-3 h-3" : size === "lg" ? "w-5 h-5" : "w-4 h-4",
    )}
    aria-hidden="true"
  />
);

// ── Button ────────────────────────────────────────────────────
const Button = ({
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  icon,
  iconEnd,
  as: Tag = "button",
  className,
  children,
  ...props
}) => {
  const isIcon = variant === "icon";
  const isDisabled = disabled || loading;

  return (
    <Tag
      {...(Tag === "button" ? { type: "button" } : {})}
      disabled={Tag === "button" ? isDisabled : undefined}
      aria-disabled={isDisabled || undefined}
      aria-busy={loading || undefined}
      className={cn(
        // Base
        "inline-flex items-center justify-center",
        "font-body font-semibold",
        "rounded-[var(--radius-md)]",
        "transition-all duration-300",
        "select-none whitespace-nowrap",
        "outline-none",

        // Variant
        VARIANTS[variant] ?? VARIANTS.primary,

        // Size
        isIcon ? ICON_SIZES[size] : SIZES[size],

        // Disabled
        isDisabled && "opacity-50 cursor-not-allowed pointer-events-none",

        className,
      )}
      {...props}
    >
      {loading && <Spinner size={size} />}

      {!loading && icon && (
        <span className="shrink-0" aria-hidden="true">
          {icon}
        </span>
      )}

      {!isIcon && children}

      {!loading && iconEnd && (
        <span className="shrink-0" aria-hidden="true">
          {iconEnd}
        </span>
      )}

      {isIcon && !loading && children}
    </Tag>
  );
};

export default Button;
