// src/components/sections/ArabicText.jsx
// ============================================================
// ArabicText — NurPath Section Component
//
// Wrapper for any Arabic text — Quran ayat, hadith, dua.
// Handles: font, direction, line-height, size, color.
// Automatically sets dir="rtl" and lang="ar".
//
// Usage:
//   <ArabicText>بِسْمِ اللَّهِ</ArabicText>
//   <ArabicText size="xl" color="accent">سورة الفاتحة</ArabicText>
//   <ArabicText size="sm" color="muted">narrator text</ArabicText>
//   <ArabicText ui>نورالطريق</ArabicText>  ← Noto Naskh (UI font)
// ============================================================

import { cn } from "../../utils/cn";

// ── Size → class map ──────────────────────────────────────────
const SIZES = {
  sm: "text-base   leading-[2.0]",
  md: "text-xl     leading-[2.2]",
  lg: "text-2xl    leading-[2.2]",
  xl: "text-3xl    leading-[2.2]",
  "2xl": "text-4xl   leading-[2.0]",
};

// ── Color → class map ─────────────────────────────────────────
const COLORS = {
  default: "text-ink",
  soft: "text-soft",
  muted: "text-muted",
  accent: "text-accent",
  snow: "text-snow",
  primary: "text-primary",
};

const ArabicText = ({
  children,
  size = "md", // "sm" | "md" | "lg" | "xl" | "2xl"
  color = "default", // "default" | "soft" | "muted" | "accent" | "snow" | "primary"
  ui = false, // true = Noto Naskh Arabic (UI labels), false = Amiri (literary)
  center = false, // true = text-center
  as: Tag = "p", // render as p | span | h1-h6
  className,
  ...props
}) => {
  return (
    <Tag
      dir="rtl"
      lang="ar"
      className={cn(
        // Font — Amiri for literary Arabic, Noto Naskh for UI
        ui ? "font-arabic-ui" : "font-arabic",

        // Size + line height
        SIZES[size] ?? SIZES.md,

        // Color
        COLORS[color] ?? COLORS.default,

        // Alignment
        center ? "text-center" : "text-right",

        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
};

export default ArabicText;
