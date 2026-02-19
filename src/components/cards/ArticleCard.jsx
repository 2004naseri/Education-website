// src/components/cards/ArticleCard.jsx
// ============================================================
// ArticleCard — NurPath Card Component
//
// Standard grid card + featured (large horizontal) layout.
//
// Usage:
//   <ArticleCard article={article} />
//   <ArticleCard article={article} featured />
// ============================================================

import { Link } from "react-router-dom";
import { Clock, Eye, ArrowRight } from "lucide-react";
import { cn } from "../../utils/cn";
import Badge from "../ui/Badge";

const BADGE_MAP = {
  knowledge: "primary",
  practice: "success",
  spirituality: "accent",
  history: "warning",
  "current-affairs": "muted",
};

const ArticleCard = ({ article, featured = false }) => {
  if (!article) return null;

  const {
    slug,
    title,
    titleArabic,
    excerpt,
    author,
    category,
    coverImage,
    readTime,
    publishedAt,
    views,
  } = article;

  const formattedDate = publishedAt
    ? new Date(publishedAt).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      })
    : null;

  // ── Featured large layout ─────────────────────────────────
  if (featured) {
    return (
      <Link
        to={`/articles/${slug}`}
        className="card-interactive group grid grid-cols-1 sm:grid-cols-2 overflow-hidden"
        aria-label={`Read: ${title}`}
      >
        <div className="relative aspect-video sm:aspect-auto overflow-hidden bg-primary-soft">
          <img
            src={coverImage}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>
        <div className="flex flex-col justify-center p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-3">
            <Badge variant={BADGE_MAP[category] ?? "muted"}>{category}</Badge>
            {formattedDate && (
              <span className="font-body text-xs text-muted">
                {formattedDate}
              </span>
            )}
          </div>
          {titleArabic && (
            <p
              className="font-arabic-ui text-sm text-accent mb-2 text-right"
              dir="rtl"
              lang="ar"
            >
              {titleArabic}
            </p>
          )}
          <h3 className="heading-sm mb-3 group-hover:text-primary transition-colors duration-200">
            {title}
          </h3>
          <p className="text-body line-clamp-3 mb-4">{excerpt}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-xs text-muted font-body">
              <span>{author}</span>
              {readTime && (
                <span className="flex items-center gap-1">
                  <Clock size={11} />
                  {readTime} min
                </span>
              )}
            </div>
            <span className="font-body text-xs font-semibold text-primary flex items-center gap-1 group-hover:gap-2 transition-all duration-200">
              Read <ArrowRight size={13} />
            </span>
          </div>
        </div>
      </Link>
    );
  }

  // ── Standard grid card ────────────────────────────────────
  return (
    <Link
      to={`/articles/${slug}`}
      className="card-interactive group flex flex-col overflow-hidden"
      aria-label={`Read: ${title}`}
    >
      <div className="relative aspect-video overflow-hidden bg-primary-soft">
        <img
          src={coverImage}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-3 left-3">
          <Badge variant={BADGE_MAP[category] ?? "muted"}>{category}</Badge>
        </div>
      </div>
      <div className="flex flex-col flex-1 p-5">
        {formattedDate && (
          <p className="font-body text-xs text-muted mb-2">{formattedDate}</p>
        )}
        {titleArabic && (
          <p
            className="font-arabic-ui text-xs text-accent mb-1 text-right"
            dir="rtl"
            lang="ar"
          >
            {titleArabic}
          </p>
        )}
        <h3
          className="font-display text-lg font-normal text-ink leading-snug mb-2
                       group-hover:text-primary transition-colors duration-200 line-clamp-2"
        >
          {title}
        </h3>
        <p className="font-body text-sm text-soft leading-relaxed line-clamp-3 mb-4">
          {excerpt}
        </p>
        <div className="mt-auto flex items-center justify-between gap-2">
          <p className="font-body text-xs text-muted truncate">{author}</p>
          <div className="flex items-center gap-3 text-xs text-muted shrink-0">
            {readTime && (
              <span className="flex items-center gap-1">
                <Clock size={11} />
                {readTime}m
              </span>
            )}
            {views && (
              <span className="flex items-center gap-1">
                <Eye size={11} />
                {(views / 1000).toFixed(1)}k
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
