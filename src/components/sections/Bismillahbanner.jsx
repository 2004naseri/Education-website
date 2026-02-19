// src/components/sections/BismillahBanner.jsx
// ============================================================
// BismillahBanner — NurPath Section Component
//
// Full-width decorative banner showing Bismillah in Arabic
// with optional Quran verse below it.
// Used at the top of content-heavy pages (Books, Quran, etc.)
//
// Variants:
//   default  — deep green background
//   dark     — near-black for dark sections
//   subtle   — light parchment — blends with page background
//
// Usage:
//   <BismillahBanner />
//   <BismillahBanner variant="subtle" verse="94:5" verseArabic="فَإِنَّ مَعَ الْعُسْرِ يُسْرًا" verseTranslation="Indeed with hardship comes ease." />
// ============================================================

import { cn } from "../../utils/cn";

const BismillahBanner = ({
  variant = "default", // "default" | "dark" | "subtle"
  verseArabic, // optional Quran ayat to show below
  verseTranslation, // English translation of the verse
  verseRef, // reference e.g. "94:5"
  className,
}) => {
  return (
    <div
      className={cn(
        "w-full py-10 sm:py-14",

        // Variant backgrounds
        variant === "default" && "bg-primary",
        variant === "dark" && "bg-[#13110e]",
        variant === "subtle" && "bg-background border-y border-border",

        className,
      )}
    >
      <div className="container-custom">
        <div className="text-center">
          {/* ── Gold ornament ─────────────────────────────── */}
          <div className="flex items-center justify-center gap-4 mb-5">
            <div
              className="h-px w-20"
              style={{
                background: `linear-gradient(to right, transparent, var(--color-accent))`,
                opacity: variant === "subtle" ? 0.5 : 0.6,
              }}
            />
            {/* Islamic star ornament */}
            <span className="text-accent text-lg" aria-hidden="true">
              ✦
            </span>
            <div
              className="h-px w-20"
              style={{
                background: `linear-gradient(to left, transparent, var(--color-accent))`,
                opacity: variant === "subtle" ? 0.5 : 0.6,
              }}
            />
          </div>

          {/* ── Bismillah — Arabic ────────────────────────── */}
          <p
            className={cn(
              "font-arabic text-3xl sm:text-4xl leading-loose mb-2",
              variant === "subtle" ? "text-primary" : "text-accent",
            )}
            lang="ar"
            dir="rtl"
          >
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
          </p>

          {/* ── Translation ───────────────────────────────── */}
          <p
            className={cn(
              "font-body text-xs tracking-widest uppercase mb-6",
              variant === "subtle" ? "text-muted" : "text-snow/40",
            )}
          >
            In the name of Allah, the Most Gracious, the Most Merciful
          </p>

          {/* ── Optional Quran verse ──────────────────────── */}
          {verseArabic && (
            <div
              className={cn(
                "mt-6 pt-6 max-w-xl mx-auto",
                variant === "subtle"
                  ? "border-t border-border"
                  : "border-t border-snow/10",
              )}
            >
              {/* Ayat in Arabic */}
              <p
                className={cn(
                  "font-arabic text-xl sm:text-2xl leading-loose mb-3",
                  variant === "subtle" ? "text-ink" : "text-snow",
                )}
                lang="ar"
                dir="rtl"
              >
                {verseArabic}
              </p>

              {/* Translation */}
              {verseTranslation && (
                <p
                  className={cn(
                    "font-body text-sm leading-relaxed mb-2 italic",
                    variant === "subtle" ? "text-soft" : "text-snow/65",
                  )}
                >
                  "{verseTranslation}"
                </p>
              )}

              {/* Reference */}
              {verseRef && (
                <p className="font-body text-xs text-accent/70">— {verseRef}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BismillahBanner;
