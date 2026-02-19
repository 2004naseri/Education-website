// src/components/cards/AyatCard.jsx
// ============================================================
// AyatCard — NurPath Card Component
//
// Single Quran ayat — large Arabic text, translation,
// surah reference, ayat number, bookmark button.
// Dark mode: warm parchment bg via .ayat-card CSS class.
//
// Usage:
//   <AyatCard ayat={ayat} surah={surah} />
//   <AyatCard ayat={ayat} surah={surah} highlighted />
// ============================================================

import { Link } from "react-router-dom";
import { Bookmark } from "lucide-react";
import { cn } from "../../utils/cn";
import ArabicText from "../sections/ArabicText";

const AyatCard = ({ ayat, surah, highlighted = false }) => {
  if (!ayat || !surah) return null;

  const { number, arabic, translation } = ayat;
  const { nameEn, nameAr, number: surahNum } = surah;

  return (
    <article
      className={cn("ayat-card group", highlighted && "ring-1 ring-accent/30")}
      aria-label={`Ayat ${number} from ${nameEn}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-3 mb-5">
        <Link
          to={`/quran/${surahNum}`}
          className="flex items-center gap-2 group/link"
          aria-label={`Go to Surah ${nameEn}`}
        >
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0
                         bg-primary-soft border border-primary/10
                         group-hover/link:bg-primary group-hover/link:border-primary
                         transition-all duration-200"
          >
            <span
              className="font-body text-xs font-bold text-primary
                            group-hover/link:text-snow transition-colors duration-200"
            >
              {surahNum}
            </span>
          </div>
          <div>
            <p
              className="font-body text-xs font-semibold text-ink leading-none mb-0.5
                          group-hover/link:text-primary transition-colors duration-200"
            >
              {nameEn}
            </p>
            <p
              className="font-arabic-ui text-xs text-accent/70 leading-none"
              dir="rtl"
              lang="ar"
            >
              {nameAr}
            </p>
          </div>
        </Link>
        <div className="flex items-center gap-2">
          <span
            className="font-arabic text-sm text-accent/80 w-8 h-8 rounded-full
                           border border-accent/20 flex items-center justify-center bg-accent-soft/30"
            title={`Ayat ${number}`}
          >
            {number}
          </span>
          <button
            type="button"
            aria-label={`Bookmark Ayat ${number}`}
            className="w-7 h-7 rounded flex items-center justify-center
                       text-muted hover:text-accent transition-colors duration-200
                       focus:outline-none focus-visible:ring-1 focus-visible:ring-accent"
          >
            <Bookmark size={14} aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Arabic */}
      <ArabicText
        size="xl"
        color="default"
        className="mb-5 pb-5 border-b border-border leading-[2.4]"
      >
        {arabic}
      </ArabicText>

      {/* Translation */}
      <p className="font-body text-sm sm:text-base text-soft leading-[1.9]">
        {translation}
      </p>

      {/* Reference */}
      <p className="font-body text-xs text-muted mt-4 text-right">
        — {nameEn} {surahNum}:{number}
      </p>
    </article>
  );
};

export default AyatCard;
