// src/components/cards/FiqhCard.jsx
// ============================================================
// FiqhCard — NurPath Card Component
//
// Fiqh topic with category icon, difficulty badge,
// Arabic title, excerpt, references count.
//
// Usage:
//   <FiqhCard topic={topic} />
// ============================================================

import { Link } from "react-router-dom";
import { BookMarked, ChevronRight } from "lucide-react";
import { cn } from "../../utils/cn";
import Badge from "../ui/Badge";

const CATEGORY_ICONS = {
  taharah: "💧",
  salah: "🕌",
  zakah: "💰",
  sawm: "🌙",
  hajj: "🕋",
  muamalat: "🤝",
  nikah: "💍",
  inheritance: "📜",
  food: "🍽️",
  hudud: "⚖️",
};

const DIFFICULTY_BADGE = {
  beginner: "success",
  intermediate: "accent",
  advanced: "warning",
};

const FiqhCard = ({ topic }) => {
  if (!topic) return null;

  const {
    id,
    slug,
    title,
    titleArabic,
    category,
    excerpt,
    difficulty,
    references = [],
  } = topic;

  return (
    <Link
      to={`/fiqh/${slug}`}
      className="card-interactive group flex flex-col p-5"
      aria-label={`View fiqh topic: ${title}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0
                         bg-primary-soft border border-primary/10
                         group-hover:bg-primary group-hover:border-primary
                         transition-all duration-300"
          >
            <span className="text-base leading-none" aria-hidden="true">
              {CATEGORY_ICONS[category] ?? "📖"}
            </span>
          </div>
          <span className="font-body text-xs font-semibold text-primary capitalize">
            {category}
          </span>
        </div>
        {difficulty && (
          <Badge variant={DIFFICULTY_BADGE[difficulty] ?? "muted"}>
            {difficulty}
          </Badge>
        )}
      </div>

      {/* Arabic title */}
      {titleArabic && (
        <p
          className="font-arabic-ui text-sm text-accent mb-1.5 text-right"
          dir="rtl"
          lang="ar"
        >
          {titleArabic}
        </p>
      )}

      {/* English title */}
      <h3
        className="font-display text-lg font-normal text-ink leading-snug mb-2
                     group-hover:text-primary transition-colors duration-200 line-clamp-2"
      >
        {title}
      </h3>

      {/* Excerpt */}
      <p className="font-body text-sm text-soft leading-relaxed line-clamp-3 mb-4">
        {excerpt}
      </p>

      {/* Footer */}
      <div className="mt-auto flex items-center justify-between gap-2">
        {references.length > 0 && (
          <span className="flex items-center gap-1.5 font-body text-xs text-muted">
            <BookMarked size={12} />
            {references.length} ref{references.length > 1 ? "s" : ""}
          </span>
        )}
        <span
          className="ml-auto font-body text-xs font-semibold text-primary
                         flex items-center gap-0.5 group-hover:gap-1.5 transition-all duration-200"
        >
          Read <ChevronRight size={13} />
        </span>
      </div>
    </Link>
  );
};

export default FiqhCard;
