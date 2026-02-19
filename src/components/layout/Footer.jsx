// src/components/layout/Footer.jsx
// ============================================================
// Footer — NurPath Layout Component
//
// Color: deep ink charcoal — works beautifully in both modes
// Uses inline CSS vars so it stays dark regardless of theme
//
// Sections:
//   • Bismillah banner (Arabic + translation)
//   • Brand column (logo, tagline, Quran verse)
//   • Explore links
//   • Learn links
//   • Contact info + social icons
//   • Copyright bar
//
// All data imported from /data/ — nothing hardcoded here
// ============================================================

import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import { cn } from "../../utils/cn";

// ── Data ──────────────────────────────────────────────────────
import { SITE_CONFIG } from "../../data/site";
import { FOOTER_LINKS } from "../../data/navigation";
import { SOCIAL_LINKS } from "../../data/social";

// ── Footer color tokens ───────────────────────────────────────
// Footer stays dark in BOTH light and dark mode.
// Using hardcoded values here so it never accidentally goes light.
const F = {
  bg: "#13110e", // deep ink — footer background
  surface: "#1a1814", // slightly lighter — used for copyright bar
  border: "#2c2820", // subtle warm separator
  textMain: "#c8bfaa", // warm tan — body text
  textMuted: "#6b6355", // muted warm — secondary info
  textHead: "#8a7e6e", // column headings (uppercase labels)
  textWhite: "#f1ede6", // near-white — logo name, important text
};

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{ backgroundColor: F.bg, color: F.textMain }}
      role="contentinfo"
      aria-label="Site footer"
    >
      {/* ══ BISMILLAH BANNER ════════════════════════════════ */}
      <div className="py-6" style={{ borderBottom: `1px solid ${F.border}` }}>
        <div className="container-custom text-center">
          {/* Gold ornament line */}
          <div className="flex items-center justify-center gap-3 mb-3">
            <div
              className="h-px w-20"
              style={{
                background:
                  "linear-gradient(to right, transparent, var(--color-accent))",
              }}
            />
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: "var(--color-accent)" }}
            />
            <div
              className="h-px w-20"
              style={{
                background:
                  "linear-gradient(to left, transparent, var(--color-accent))",
              }}
            />
          </div>

          {/* Bismillah — Arabic */}
          <p className="font-arabic text-accent text-2xl sm:text-3xl leading-loose mb-1">
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
          </p>

          {/* Translation */}
          <p
            className="font-body text-xs tracking-widest uppercase"
            style={{ color: F.textMuted }}
          >
            In the name of Allah, the Most Gracious, the Most Merciful
          </p>
        </div>
      </div>

      {/* ══ MAIN BODY ════════════════════════════════════════ */}
      <div className="container-custom py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* ── Column 1 — Brand ─────────────────────────── */}
          <div className="lg:col-span-1">
            {/* Logo mark */}
            <Link
              to="/"
              aria-label="NurPath — go to homepage"
              className="flex items-center gap-2.5 mb-4 w-fit group"
            >
              <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center shrink-0">
                <span className="text-primary font-display font-bold text-base leading-none">
                  ن
                </span>
              </div>
              <div>
                <p
                  className="font-display font-bold text-lg leading-none"
                  style={{ color: F.textWhite }}
                >
                  {SITE_CONFIG.name}
                </p>
                <p className="font-arabic-ui text-xs text-accent leading-none mt-0.5">
                  {SITE_CONFIG.nameArabic}
                </p>
              </div>
            </Link>

            {/* Tagline / description */}
            <p
              className="font-body text-sm leading-relaxed mb-6 max-w-xs"
              style={{ color: F.textMain }}
            >
              {SITE_CONFIG.description}
            </p>

            {/* Quran verse — decorative */}
            <div
              className="pl-4"
              style={{ borderLeft: `2px solid var(--color-accent)` }}
            >
              <p className="font-arabic text-accent/80 text-base leading-loose text-right">
                يَرْفَعِ اللَّهُ الَّذِينَ آمَنُوا وَالَّذِينَ أُوتُوا الْعِلْمَ
                دَرَجَاتٍ
              </p>
              <p
                className="font-body text-xs mt-1"
                style={{ color: F.textMuted }}
              >
                Al-Mujadila 58:11
              </p>
            </div>
          </div>

          {/* ── Column 2 — Explore ───────────────────────── */}
          <div>
            <h3
              className="font-body text-xs font-bold uppercase tracking-widest mb-5"
              style={{ color: F.textHead }}
            >
              Explore
            </h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.explore.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="font-body text-sm flex items-center gap-2 transition-colors duration-200 hover:text-accent"
                    style={{ color: F.textMain }}
                  >
                    {item.icon && (
                      <span
                        className="text-accent/50 text-xs"
                        aria-hidden="true"
                      >
                        {item.icon}
                      </span>
                    )}
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Column 3 — Learn ─────────────────────────── */}
          <div>
            <h3
              className="font-body text-xs font-bold uppercase tracking-widest mb-5"
              style={{ color: F.textHead }}
            >
              Learn
            </h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.learn.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="font-body text-sm transition-colors duration-200 hover:text-accent"
                    style={{ color: F.textMain }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Column 4 — Contact ───────────────────────── */}
          <div>
            <h3
              className="font-body text-xs font-bold uppercase tracking-widest mb-5"
              style={{ color: F.textHead }}
            >
              Contact
            </h3>

            <ul className="space-y-3">
              {/* Email */}
              <li>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="flex items-start gap-3 transition-colors duration-200 hover:text-accent group"
                  style={{ color: F.textMain }}
                >
                  <Mail
                    size={15}
                    aria-hidden="true"
                    className="shrink-0 mt-0.5 text-accent/50 group-hover:text-accent transition-colors"
                  />
                  <span className="font-body text-sm">{SITE_CONFIG.email}</span>
                </a>
              </li>

              {/* Phone */}
              <li>
                <a
                  href={`tel:${SITE_CONFIG.phone}`}
                  className="flex items-start gap-3 transition-colors duration-200 hover:text-accent group"
                  style={{ color: F.textMain }}
                >
                  <Phone
                    size={15}
                    aria-hidden="true"
                    className="shrink-0 mt-0.5 text-accent/50 group-hover:text-accent transition-colors"
                  />
                  <span className="font-body text-sm">{SITE_CONFIG.phone}</span>
                </a>
              </li>

              {/* Address */}
              <li>
                <div
                  className="flex items-start gap-3"
                  style={{ color: F.textMain }}
                >
                  <MapPin
                    size={15}
                    aria-hidden="true"
                    className="shrink-0 mt-0.5 text-accent/50"
                  />
                  <span className="font-body text-sm leading-relaxed">
                    {SITE_CONFIG.address}
                  </span>
                </div>
              </li>
            </ul>

            {/* Social icons — only shown when SOCIAL_LINKS has items */}
            {SOCIAL_LINKS.length > 0 && (
              <div className="flex items-center gap-2 mt-6">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 hover:bg-accent hover:text-primary"
                    style={{
                      backgroundColor: F.border,
                      color: F.textMain,
                    }}
                  >
                    <span className="text-sm" aria-hidden="true">
                      {social.icon}
                    </span>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ══ COPYRIGHT BAR ════════════════════════════════════ */}
      <div
        style={{
          borderTop: `1px solid ${F.border}`,
          backgroundColor: F.surface,
        }}
      >
        <div className="container-custom py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p
              className="font-body text-xs text-center sm:text-left"
              style={{ color: F.textMuted }}
            >
              © {year} {SITE_CONFIG.name}. All rights reserved.
            </p>

            <p className="font-arabic text-sm text-accent/50">
              جزاكم الله خيراً
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
