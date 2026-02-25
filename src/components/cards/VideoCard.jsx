// src/components/cards/VideoCard.jsx
// ============================================================
// VideoCard — WITH HOVER PREVIEW
// On hover: plays video preview (only for uploaded videos)
// YouTube/Vimeo: just shows thumbnail (can't auto-play embeds)
// ============================================================

import { useState } from "react";
import { Link } from "react-router-dom";
import { Play, Clock, Eye, Calendar } from "lucide-react";
import { cn } from "../../utils/cn";
import Badge from "../ui/Badge";

const CATEGORY_BADGE = {
  lecture: "primary",
  series: "accent",
  short: "success",
  quran: "warning",
};

const VideoCard = ({ video, featured = false }) => {
  if (!video) return null;

  const [isHovering, setIsHovering] = useState(false);

  const {
    id,
    title,
    titleArabic,
    instructor,
    category,
    thumbnail,
    videoUrl,
    duration,
    views,
    publishedAt,
  } = video;

  const formattedDate = publishedAt
    ? new Date(publishedAt).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      })
    : null;

  // Check if it's an uploaded video (not YouTube/Vimeo)
  const isUploadedVideo =
    videoUrl && !videoUrl.includes("youtube") && !videoUrl.includes("vimeo");

  if (featured) {
    return (
      <Link
        to={`/videos/${id}`}
        className="card-interactive group grid grid-cols-1 sm:grid-cols-2 overflow-hidden"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className="relative aspect-video sm:aspect-auto overflow-hidden bg-primary-soft">
          {/* Show video on hover if uploaded, otherwise thumbnail */}
          {isHovering && isUploadedVideo ? (
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            >
              <source src={videoUrl} type="video/mp4" />
            </video>
          ) : (
            <>
              <img
                src={thumbnail}
                alt=""
                className="w-full h-full object-cover 
                                                      transition-transform duration-500 
                                                      group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="w-16 h-16 rounded-full bg-accent flex items-center justify-center 
                                shadow-xl transition-all duration-300 group-hover:scale-110"
                >
                  <Play
                    size={24}
                    className="text-ink translate-x-0.5"
                    fill="currentColor"
                  />
                </div>
              </div>
            </>
          )}
          {duration && !isHovering && (
            <span
              className="absolute bottom-3 right-3 px-2 py-1 bg-ink/80 text-snow 
                           font-body text-xs font-semibold rounded"
            >
              {duration}
            </span>
          )}
        </div>

        <div className="flex flex-col justify-center p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-3">
            <Badge variant={CATEGORY_BADGE[category] ?? "muted"}>
              {category}
            </Badge>
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
          <div className="flex items-center justify-between text-xs text-muted font-body">
            <span>{instructor}</span>
            {views && (
              <span className="flex items-center gap-1">
                <Eye size={11} />
                {(views / 1000).toFixed(1)}k
              </span>
            )}
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/videos/${id}`}
      className="card-interactive group flex flex-col overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="relative aspect-video overflow-hidden bg-primary-soft">
        {/* Show video on hover if uploaded, otherwise thumbnail */}
        {isHovering && isUploadedVideo ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
        ) : (
          <>
            <img
              src={thumbnail}
              alt=""
              className="w-full h-full object-cover 
                                                    transition-transform duration-500 
                                                    group-hover:scale-105"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent 
                            opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
            <div
              className="absolute inset-0 flex items-center justify-center 
                            opacity-0 group-hover:opacity-100 transition-all duration-300"
            >
              <div
                className="w-14 h-14 rounded-full bg-accent flex items-center justify-center 
                              shadow-xl transform scale-90 group-hover:scale-100 transition-transform"
              >
                <Play
                  size={20}
                  className="text-ink translate-x-0.5"
                  fill="currentColor"
                />
              </div>
            </div>
          </>
        )}
        {duration && !isHovering && (
          <span
            className="absolute bottom-2 right-2 px-2 py-0.5 bg-ink/80 text-snow 
                         font-body text-xs rounded"
          >
            {duration}
          </span>
        )}
      </div>

      <div className="flex flex-col flex-1 p-4">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant={CATEGORY_BADGE[category] ?? "muted"}>
            {category}
          </Badge>
        </div>

        {titleArabic && (
          <p
            className="font-arabic-ui text-xs text-accent mb-1.5 text-right line-clamp-1"
            dir="rtl"
            lang="ar"
          >
            {titleArabic}
          </p>
        )}

        <h3
          className="font-display text-base font-normal text-ink leading-snug mb-2 
                       line-clamp-2 group-hover:text-primary transition-colors duration-200"
        >
          {title}
        </h3>

        <p className="font-body text-xs text-muted mb-3">{instructor}</p>

        <div className="flex items-center gap-3 mt-auto text-xs text-muted">
          {views && (
            <span className="flex items-center gap-1">
              <Eye size={11} />
              {(views / 1000).toFixed(1)}k
            </span>
          )}
          {formattedDate && (
            <span className="flex items-center gap-1">
              <Calendar size={11} />
              {formattedDate}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
