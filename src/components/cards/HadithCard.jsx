// src/components/cards/HadithCard.jsx
// ============================================================
// HadithCard — NurPath Card Component
//
// Gold left border, Arabic text, translation, narrator,
// collection + grade badges.
// Dark mode: warm parchment bg via .hadith-card CSS class.
//
// Usage:
//   <HadithCard hadith={hadith} />
//   <HadithCard hadith={hadith} showExplanation />
// ============================================================

import { Link } from "react-router-dom";
import { cn } from "../../utils/cn";
import Badge from "../ui/Badge";
import ArabicText from "../sections/ArabicText";

const GRADE_BADGE = {
  sahih: { variant: "success", label: "Sahih ✓" },
  hasan: { variant: "accent", label: "Hasan ◈" },
  daif: { variant: "warning", label: "Da'if ○" },
};

const COLLECTION_LABELS = {
  bukhari: "Bukhari",
  muslim: "Muslim",
  "abu-dawud": "Abu Dawud",
  tirmidhi: "Tirmidhi",
  nasai: "An-Nasa'i",
  "ibn-majah": "Ibn Majah",
};

const HadithCard = ({ hadith, showExplanation = false }) => {
  if (!hadith) return null;

  const {
    id,
    arabic,
    translation,
    narrator,
    collection,
    number,
    grade,
    explanation,
    tags = [],
  } = hadith;

  const gradeInfo = GRADE_BADGE[grade] ?? { variant: "muted", label: grade };
  const collLabel = COLLECTION_LABELS[collection] ?? collection;

  return (
    <article
      className="hadith-card group"
      aria-label={`Hadith from ${collLabel}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant={gradeInfo.variant}>{gradeInfo.label}</Badge>
          <Badge variant="muted">
            {collLabel}
            {number ? ` #${number}` : ""}
          </Badge>
        </div>
        <Link
          to={`/hadith/${id}`}
          className="font-body text-xs text-muted hover:text-primary transition-colors"
          aria-label="View full hadith"
        >
          View →
        </Link>
      </div>

      {/* Arabic */}
      <ArabicText
        size="lg"
        color="default"
        className="mb-4 pb-4 border-b border-border"
      >
        {arabic}
      </ArabicText>

      {/* Translation */}
      <p className="font-body text-sm sm:text-base text-soft leading-[1.9] mb-4 italic">
        "{translation}"
      </p>

      {/* Narrator */}
      {narrator && (
        <p className="font-body text-xs text-muted mb-3 flex items-center gap-1.5">
          <span className="text-accent">—</span> {narrator}
        </p>
      )}

      {/* Explanation */}
      {showExplanation && explanation && (
        <div className="mt-4 pt-4 border-t border-border">
          <p className="font-body text-xs font-semibold text-muted uppercase tracking-wider mb-2">
            Commentary
          </p>
          <p className="font-body text-sm text-soft leading-relaxed">
            {explanation}
          </p>
        </div>
      )}

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className="font-body text-xs text-muted px-2 py-0.5
                                       bg-surface border border-border rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </article>
  );
};

export default HadithCard;
