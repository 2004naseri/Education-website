// src/components/sections/Hero.jsx
// ============================================================
// Hero — NurPath Home Page Hero Section
//
// Full-screen hero with:
//   • Deep green/dark gradient background
//   • Islamic geometric pattern overlay
//   • Arabic Bismillah + site tagline
//   • Two CTA buttons
//   • Animated stat counters (books, hadith, students)
//   • Scroll indicator
//
// Data: stats from SITE_CONFIG or passed as props
// ============================================================

import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, ScrollText, Users } from "lucide-react";
import { cn } from "../../utils/cn";

// ── Stats shown at the bottom of the hero ────────────────────
const HERO_STATS = [
  {
    icon: BookOpen,
    value: "1,200+",
    label: "Islamic Books",
    labelAr: "كتاب إسلامي",
  },
  { icon: ScrollText, value: "7,500+", label: "Hadith", labelAr: "حديث نبوي" },
  {
    icon: Users,
    value: "50,000+",
    label: "Seekers of Knowledge",
    labelAr: "طالب علم",
  },
];

const Hero = () => {
  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* ── Background gradient ───────────────────────────── */}
      <div
        className="absolute inset-0 z-0"
        style={{ background: "var(--gradient-hero)" }}
        aria-hidden="true"
      />

      {/* ── Islamic geometric pattern overlay ────────────── */}
      <div
        className="absolute inset-0 z-0 pattern-geometric opacity-[0.04]"
        aria-hidden="true"
      />

      {/* ── Radial glow — top center ─────────────────────── */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 z-0"
        style={{
          width: "600px",
          height: "400px",
          background:
            "radial-gradient(ellipse at center, rgba(181,131,42,0.12) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* ── Main content ──────────────────────────────────── */}
      <div className="relative z-10 container-custom py-24 sm:py-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* ── Eyebrow — Arabic script ───────────────────── */}
          <div className="animate-fade-in mb-6">
            <p
              className="font-arabic text-accent text-2xl sm:text-3xl leading-loose"
              dir="rtl"
              lang="ar"
            >
              بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
            </p>
          </div>

          {/* ── Main heading ──────────────────────────────── */}
          <div className="animate-slide-up stagger-1">
            <h1 className="font-display font-light text-snow text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[1.05] mb-4">
              Illuminate Your <span className="text-accent italic">Path</span>
              <br />
              of Knowledge
            </h1>
          </div>

          {/* ── Arabic site name ──────────────────────────── */}
          <div className="animate-slide-up stagger-2 mb-6">
            <p
              className="font-arabic text-accent/60 text-xl sm:text-2xl leading-loose"
              dir="rtl"
              lang="ar"
            >
              نورالطريق — طريق العلم الإسلامي
            </p>
          </div>

          {/* ── Subtitle ──────────────────────────────────── */}
          <p
            className={cn(
              "animate-slide-up stagger-3",
              "font-body text-snow/65 text-lg sm:text-xl leading-relaxed",
              "max-w-2xl mx-auto mb-10",
            )}
          >
            A comprehensive Islamic education platform — authentic books, Quran,
            Hadith, Fiqh, and articles for every seeker of knowledge.
          </p>

          {/* ── CTA Buttons ───────────────────────────────── */}
          <div className="animate-slide-up stagger-4 flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            {/* Primary CTA */}
            <Link
              to="/books"
              className={cn(
                "inline-flex items-center gap-2.5",
                "px-8 py-4 text-base font-semibold font-body",
                "bg-accent text-ink rounded-[var(--radius-md)]",
                "hover:bg-accent-light hover:-translate-y-0.5",
                "transition-all duration-300",
                "shadow-[var(--shadow-accent)]",
              )}
            >
              Explore Library
              <ArrowRight size={18} aria-hidden="true" />
            </Link>

            {/* Secondary CTA */}
            <Link
              to="/quran"
              className={cn(
                "inline-flex items-center gap-2.5",
                "px-8 py-4 font-semibold font-body",
                "bg-primary text-snow rounded-[var(--radius-md)]",
                "border border-primary-light/40",
                "hover:bg-primary-dark hover:border-primary-light hover:-translate-y-0.5",
                "transition-all duration-300",
              )}
            >
              Read Quran
              <BookOpen size={18} aria-hidden="true" />
            </Link>
          </div>

          {/* ── Stats row ─────────────────────────────────── */}
          <div
            className={cn(
              "animate-slide-up stagger-5",
              "grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8",
              "pt-10 border-t border-snow/10",
            )}
          >
            {HERO_STATS.map(({ icon: Icon, value, label, labelAr }) => (
              <div key={label} className="text-center">
                {/* Icon */}
                <div className="flex justify-center mb-2">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: "rgba(181,131,42,0.15)" }}
                  >
                    <Icon
                      size={18}
                      className="text-accent"
                      aria-hidden="true"
                    />
                  </div>
                </div>

                {/* Number */}
                <p className="font-display text-3xl sm:text-4xl text-snow font-light mb-1">
                  {value}
                </p>

                {/* English label */}
                <p className="font-body text-sm text-snow/55 mb-0.5">{label}</p>

                {/* Arabic label */}
                <p
                  className="font-arabic-ui text-xs text-accent/60"
                  dir="rtl"
                  lang="ar"
                >
                  {labelAr}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Scroll indicator ──────────────────────────────── */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-float"
        aria-hidden="true"
      >
        <div className="flex flex-col items-center gap-1.5">
          <p className="font-body text-xs text-snow/30 tracking-widest uppercase">
            Scroll
          </p>
          <div className="w-px h-8 bg-gradient-to-b from-snow/30 to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
