// src/components/cards/BookCard.jsx
// ============================================================
// BookCard — NurPath Card Component
//
// Displays a single book with cover, title, author, category.
// Two layouts: "grid" (default) and "list" (horizontal row).
//
// Usage:
//   <BookCard book={book} />
//   <BookCard book={book} layout="list" />
// ============================================================

import { Link } from "react-router-dom";
import { Download, BookOpen, Globe } from "lucide-react";
import { cn } from "../../utils/cn";
import Badge from "../ui/Badge";

const BADGE_MAP = {
  tafsir: "accent",
  hadith: "primary",
  fiqh: "success",
  aqeedah: "warning",
  seerah: "accent",
  general: "muted",
};

const BookCard = ({ book, layout = "grid" }) => {
  if (!book) return null;

  const {
    id,
    title,
    titleArabic,
    author,
    category,
    language = [],
    coverImage,
    pages,
    downloadCount,
    featured,
  } = book;

  // ── List layout ───────────────────────────────────────────
  if (layout === "list") {
    return (
      <Link
        to={`/books/${id}`}
        className="card-interactive flex gap-4 p-4 group"
        aria-label={`View book: ${title}`}
      >
        {/* Thumbnail */}
        <div className="shrink-0 w-16 h-20 rounded-lg overflow-hidden bg-primary-soft">
          <img
            src={coverImage}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3
              className="font-display text-base font-normal text-ink leading-snug
                           group-hover:text-primary transition-colors duration-200 line-clamp-1"
            >
              {title}
            </h3>
            <Badge
              variant={BADGE_MAP[category] ?? "muted"}
              className="shrink-0"
            >
              {category}
            </Badge>
          </div>
          {titleArabic && (
            <p
              className="font-arabic-ui text-xs text-accent mb-1 text-right"
              dir="rtl"
              lang="ar"
            >
              {titleArabic}
            </p>
          )}
          <p className="font-body text-xs text-soft mb-2">{author}</p>
          <div className="flex items-center gap-3 text-xs text-muted font-body">
            {pages && (
              <span className="flex items-center gap-1">
                <BookOpen size={11} />
                {pages} pages
              </span>
            )}
            {downloadCount && (
              <span className="flex items-center gap-1">
                <Download size={11} />
                {downloadCount.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </Link>
    );
  }

  // ── Grid layout (default) ─────────────────────────────────
  return (
    <Link
      to={`/books/${id}`}
      className="card-interactive group flex flex-col overflow-hidden"
      aria-label={`View book: ${title}`}
    >
      {/* Cover */}
      <div className="relative aspect-[3/4] bg-primary-soft overflow-hidden">
        <img
          src={coverImage}
          alt={`Cover of ${title}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Featured badge */}
        {featured && (
          <div className="absolute top-3 left-3">
            <Badge variant="accent">✦ Featured</Badge>
          </div>
        )}

        {/* Category badge */}
        <div className="absolute top-3 right-3">
          <Badge variant={BADGE_MAP[category] ?? "muted"}>{category}</Badge>
        </div>

        {/* Hover overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300
                        flex items-end p-4"
        >
          <span className="font-body text-xs text-snow font-semibold flex items-center gap-1.5">
            <BookOpen size={13} /> View Book
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-4">
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
          className="font-display text-base sm:text-lg font-normal text-ink leading-snug mb-1
                       group-hover:text-primary transition-colors duration-200 line-clamp-2"
        >
          {title}
        </h3>
        <p className="font-body text-xs text-soft mb-3">{author}</p>

        <div className="mt-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-3 text-xs text-muted font-body">
            {pages && (
              <span className="flex items-center gap-1">
                <BookOpen size={11} />
                {pages}p
              </span>
            )}
            {downloadCount && (
              <span className="flex items-center gap-1">
                <Download size={11} />
                {(downloadCount / 1000).toFixed(1)}k
              </span>
            )}
          </div>
          {language.length > 0 && (
            <span className="flex items-center gap-1 text-xs text-muted font-body">
              <Globe size={11} />
              {language.length} lang{language.length > 1 ? "s" : ""}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default BookCard;
