// src/components/sections/SectionTitle.jsx
// ============================================================
// SectionTitle — NurPath Section Component
//
// Reusable heading block used at the top of every section.
// Shows: eyebrow (Arabic/EN label) + main title + subtitle
//
// Usage:
//   <SectionTitle
//     eyebrow="المكتبة"
//     title="Islamic Book Library"
//     subtitle="Browse over 1,200 authenticated Islamic texts"
//   />
//   <SectionTitle title="Featured Hadith" align="left" />
//   <SectionTitle title="Our Mission" light />  ← white text for dark bg
// ============================================================

import { cn } from "../../utils/cn";

const SectionTitle = ({
  eyebrow, // small label above title — usually Arabic or category name
  title, // main heading — required
  subtitle, // optional paragraph below title
  align = "center", // "center" | "left"
  light = false, // true = white text — use on dark/green backgrounds
  className,
}) => {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        align === "left" && "text-left",
        className,
      )}
    >
      {/* ── Eyebrow — small label above title ───────────── */}
      {eyebrow && (
        <span
          className={cn(
            // Arabic font for Arabic eyebrows, body font for English
            "block mb-3 text-sm font-semibold tracking-widest uppercase",
            "font-body",
            light ? "text-accent/80" : "text-accent",
          )}
        >
          {eyebrow}
        </span>
      )}

      {/* ── Main title ───────────────────────────────────── */}
      <h2 className={cn("heading-lg mb-4", light ? "text-snow" : "text-ink")}>
        {title}
      </h2>

      {/* ── Decorative gold underline ────────────────────── */}
      <div
        className={cn(
          "flex gap-1.5 mb-5",
          align === "center" && "justify-center",
          align === "left" && "justify-start",
        )}
      >
        <div className="h-0.5 w-10 rounded-full bg-accent" />
        <div className="h-0.5 w-3  rounded-full bg-accent/40" />
        <div className="h-0.5 w-1  rounded-full bg-accent/20" />
      </div>

      {/* ── Subtitle ─────────────────────────────────────── */}
      {subtitle && (
        <p
          className={cn(
            "text-body leading-relaxed",
            light ? "text-snow/70" : "text-soft",
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;
