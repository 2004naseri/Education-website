// src/pages/Videos/VideoDetailPage.jsx
// ============================================================
// VideoDetailPage — Watch Islamic videos with player
// Route: /videos/:id
// Features: Video player, chapters, description, instructor, related
// ============================================================

import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  ChevronLeft,
  Play,
  Clock,
  Eye,
  Calendar,
  Share2,
  User,
  BookOpen,
} from "lucide-react";

import { videosService } from "../../services/videos.service";
import { queryKeys } from "../../services/querykeys";

import ArabicText from "../../components/sections/ArabicText";
import VideoCard from "../../components/cards/VideoCard";
import Badge from "../../components/ui/Badge";
import { cn } from "../../utils/cn";

const VideoDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryKey: queryKeys.videos.detail(id),
    queryFn: () => videosService.getById(id),
  });

  const video = data?.data;

  // Fetch related videos
  const { data: relatedData } = useQuery({
    queryKey: queryKeys.videos.list({ category: video?.category }),
    queryFn: () =>
      videosService.getAll({
        limit: 4,
        category: video?.category,
      }),
    enabled: !!video,
  });

  const relatedVideos =
    relatedData?.data?.filter((v) => v.id !== id).slice(0, 3) ?? [];

  if (isLoading) {
    return (
      <div className="bg-background min-h-screen">
        <div className="container-custom py-12">
          <div className="skeleton h-96 mb-8" />
          <div className="skeleton h-64" />
        </div>
      </div>
    );
  }

  if (isError || !video) {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-body text-error mb-4">Video not found</p>
          <button onClick={() => navigate("/videos")} className="btn-secondary">
            <ChevronLeft size={16} /> Back to Videos
          </button>
        </div>
      </div>
    );
  }

  const publishDate = video.publishedAt
    ? new Date(video.publishedAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : null;

  return (
    <div className="bg-background min-h-screen">
      <div className="container-custom py-8 sm:py-12">
        {/* Back button */}
        <button onClick={() => navigate("/videos")} className="btn-ghost mb-6">
          <ChevronLeft size={16} /> Back to Videos
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ══ LEFT COLUMN — Video Player & Details ═════════ */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video Player */}
            <div
              className="relative aspect-video bg-ink rounded-[var(--radius-xl)] 
                            overflow-hidden shadow-lg"
            >
              {video.videoUrl ? (
                <iframe
                  src={video.videoUrl}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={video.title}
                />
              ) : (
                // Fallback thumbnail with play button
                <div className="relative w-full h-full">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-ink/40 flex items-center justify-center">
                    <div
                      className="w-20 h-20 rounded-full bg-accent flex items-center 
                                    justify-center shadow-xl"
                    >
                      <Play
                        size={32}
                        className="text-ink translate-x-1"
                        fill="currentColor"
                      />
                    </div>
                  </div>
                  <p
                    className="absolute bottom-4 left-4 right-4 text-center 
                                font-body text-sm text-snow bg-ink/70 py-2 rounded"
                  >
                    Video player will be embedded here
                  </p>
                </div>
              )}
            </div>

            {/* Video Title & Meta */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="primary">{video.category}</Badge>
                {video.duration && (
                  <span className="font-body text-sm text-muted flex items-center gap-1">
                    <Clock size={14} /> {video.duration}
                  </span>
                )}
              </div>

              {video.titleArabic && (
                <ArabicText size="lg" color="accent" className="mb-2">
                  {video.titleArabic}
                </ArabicText>
              )}

              <h1
                className="font-display text-3xl sm:text-4xl font-normal text-ink 
                             leading-tight mb-4"
              >
                {video.title}
              </h1>

              {/* Stats row */}
              <div className="flex items-center gap-4 flex-wrap text-sm text-muted">
                {video.views && (
                  <span className="flex items-center gap-1.5">
                    <Eye size={14} />
                    {(video.views / 1000).toFixed(1)}k views
                  </span>
                )}
                {publishDate && (
                  <span className="flex items-center gap-1.5">
                    <Calendar size={14} />
                    {publishDate}
                  </span>
                )}
                <button
                  className="flex items-center gap-1.5 hover:text-primary transition-colors"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: video.title,
                        url: window.location.href,
                      });
                    } else {
                      navigator.clipboard.writeText(window.location.href);
                      alert("Link copied!");
                    }
                  }}
                >
                  <Share2 size={14} />
                  Share
                </button>
              </div>
            </div>

            {/* Instructor Info */}
            {video.instructor && (
              <div
                className="p-5 bg-surface border border-border rounded-[var(--radius-lg)]
                              flex items-center gap-4"
              >
                <div
                  className="w-14 h-14 rounded-full bg-primary-soft flex items-center 
                                justify-center shrink-0"
                >
                  <User size={24} className="text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-body text-xs text-muted uppercase tracking-wider mb-1">
                    Instructor
                  </p>
                  <p className="font-body text-lg font-semibold text-ink">
                    {video.instructor}
                  </p>
                  {video.instructorBio && (
                    <p className="font-body text-sm text-soft mt-1">
                      {video.instructorBio}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Description */}
            {video.description && (
              <div className="p-6 bg-card border border-border rounded-[var(--radius-xl)]">
                <h2 className="font-display text-xl font-normal text-ink mb-4">
                  About This Video
                </h2>
                <p className="font-body text-base text-soft leading-relaxed whitespace-pre-line">
                  {video.description}
                </p>
              </div>
            )}

            {/* Chapters/Timestamps */}
            {video.chapters?.length > 0 && (
              <div
                className="p-6 bg-primary-soft border border-primary/10 
                              rounded-[var(--radius-xl)]"
              >
                <h2
                  className="flex items-center gap-2 font-display text-xl font-normal 
                               text-ink mb-4"
                >
                  <BookOpen size={20} className="text-primary" />
                  Chapters
                </h2>
                <div className="space-y-2">
                  {video.chapters.map((chapter, i) => (
                    <button
                      key={i}
                      className="w-full flex items-center gap-3 p-3 bg-background 
                                 rounded-lg hover:bg-snow hover:shadow-sm 
                                 transition-all duration-200 text-left group"
                    >
                      <span className="font-body text-sm font-bold text-primary">
                        {chapter.timestamp}
                      </span>
                      <span
                        className="font-body text-sm text-soft group-hover:text-ink 
                                     transition-colors flex-1"
                      >
                        {chapter.title}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            {video.tags?.length > 0 && (
              <div>
                <p
                  className="font-body text-sm font-bold text-muted uppercase 
                              tracking-wider mb-3"
                >
                  Tags
                </p>
                <div className="flex flex-wrap gap-2">
                  {video.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 bg-surface border border-border rounded-full
                                 font-body text-xs text-soft hover:border-primary 
                                 hover:text-primary transition-all duration-200 cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ══ RIGHT COLUMN — Related Videos ════════════════ */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <h2 className="font-display text-2xl font-normal text-ink">
                Related Videos
              </h2>

              {relatedVideos.length === 0 ? (
                <p className="text-body text-muted text-center py-12">
                  No related videos yet
                </p>
              ) : (
                <div className="space-y-4">
                  {relatedVideos.map((relatedVideo) => (
                    <Link
                      key={relatedVideo.id}
                      to={`/videos/${relatedVideo.id}`}
                      className="block group"
                    >
                      <div
                        className="flex gap-3 p-3 rounded-lg hover:bg-surface 
                                      transition-all duration-200"
                      >
                        {/* Thumbnail */}
                        <div
                          className="relative w-40 aspect-video rounded overflow-hidden 
                                        bg-primary-soft shrink-0"
                        >
                          <img
                            src={relatedVideo.thumbnail}
                            alt=""
                            className="w-full h-full object-cover group-hover:scale-105 
                                       transition-transform duration-300"
                          />
                          {relatedVideo.duration && (
                            <span
                              className="absolute bottom-1 right-1 px-2 py-0.5 
                                           bg-ink/80 text-snow font-body text-xs rounded"
                            >
                              {relatedVideo.duration}
                            </span>
                          )}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <p
                            className="font-body text-sm font-semibold text-ink 
                                       line-clamp-2 mb-1 group-hover:text-primary 
                                       transition-colors"
                          >
                            {relatedVideo.title}
                          </p>
                          <p className="font-body text-xs text-muted mb-1">
                            {relatedVideo.instructor}
                          </p>
                          {relatedVideo.views && (
                            <p className="font-body text-xs text-muted">
                              {(relatedVideo.views / 1000).toFixed(1)}k views
                            </p>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {/* View All Button */}
              <Link
                to="/videos"
                className="btn-secondary w-full justify-center"
              >
                <BookOpen size={16} />
                Browse All Videos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoDetailPage;
