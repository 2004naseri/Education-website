// src/components/cards/VideoCard.jsx
// ============================================================
// VideoCard — NurPath Card Component
//
// Video thumbnail with play overlay, duration badge,
// category badge, title, instructor, views, date.
//
// Usage:
//   <VideoCard video={video} />
// ============================================================

import { Link } from "react-router-dom";
import { Play, Eye } from "lucide-react";
import { cn } from "../../utils/cn";
import Badge from "../ui/Badge";

const BADGE_MAP = {
  lecture: "primary",
  series: "accent",
  short: "success",
  quran: "warning",
};

const VideoCard = ({ video }) => {
  if (!video) return null;

  const {
    id,
    title,
    titleArabic,
    thumbnail,
    duration,
    category,
    instructor,
    views,
    publishedAt,
  } = video;

  const formattedDate = publishedAt
    ? new Date(publishedAt).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      })
    : null;

  return (
    <Link
      to={`/videos/${id}`}
      className="card-interactive group flex flex-col overflow-hidden"
      aria-label={`Watch: ${title}`}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden bg-primary-soft">
        <img
          src={thumbnail}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-ink/30 group-hover:bg-ink/20 transition-colors duration-300" />

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center
                         bg-accent text-ink shadow-[var(--shadow-accent)]
                         transition-transform duration-300 group-hover:scale-110"
          >
            <Play size={20} className="translate-x-0.5" aria-hidden="true" />
          </div>
        </div>

        {/* Duration */}
        {duration && (
          <div className="absolute bottom-2 right-2">
            <span className="font-body text-xs font-semibold text-snow bg-ink/70 px-2 py-0.5 rounded">
              {duration}
            </span>
          </div>
        )}

        {/* Category */}
        <div className="absolute top-2 left-2">
          <Badge variant={BADGE_MAP[category] ?? "muted"}>{category}</Badge>
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
          className="font-display text-base sm:text-lg font-normal text-ink leading-snug mb-2
                       line-clamp-2 group-hover:text-primary transition-colors duration-200"
        >
          {title}
        </h3>
        <p className="font-body text-xs text-soft mb-3">{instructor}</p>
        <div className="mt-auto flex items-center justify-between text-xs text-muted font-body">
          {views && (
            <span className="flex items-center gap-1">
              <Eye size={11} />
              {(views / 1000).toFixed(1)}k views
            </span>
          )}
          {formattedDate && <span>{formattedDate}</span>}
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
