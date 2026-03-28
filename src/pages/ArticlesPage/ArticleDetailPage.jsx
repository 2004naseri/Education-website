// src/pages/Articles/ArticleDetailPage.jsx
// ============================================================
// ArticleDetailPage — FIXED HERO DESIGN
// Clean layout: Image on side, text on solid background
// No text overlapping image - always readable!
// ============================================================

import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  ChevronLeft,
  Clock,
  Eye,
  Calendar,
  Share2,
  BookOpen,
  User,
  Facebook,
  Twitter,
  Link as LinkIcon,
} from "lucide-react";

import { articlesService } from "../../services/articles.service";
import { queryKeys } from "../../services/querykeys";

import Badge from "../../components/ui/Badge";
import { cn } from "../../utils/cn";

// ── Category badge map ────────────────────────────────────────
const BADGE_MAP = {
  knowledge: "primary",
  practice: "success",
  spirituality: "accent",
  history: "warning",
  "current-affairs": "muted",
};

// ── Share buttons ─────────────────────────────────────────────
const ShareButtons = ({ title, url }) => {
  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
  };

  const copyLink = () => {
    navigator.clipboard.writeText(url);
    alert("Link copied to clipboard!");
  };

  return (
    <div className="flex items-center gap-2">
      <span className="font-body text-xs text-muted">Share:</span>
      <a
        href={shareLinks.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="w-8 h-8 rounded-full flex items-center justify-center
                   bg-surface border border-border text-muted
                   hover:bg-primary hover:text-snow hover:border-primary
                   transition-all duration-200"
        aria-label="Share on Facebook"
      >
        <Facebook size={14} />
      </a>
      <a
        href={shareLinks.twitter}
        target="_blank"
        rel="noopener noreferrer"
        className="w-8 h-8 rounded-full flex items-center justify-center
                   bg-surface border border-border text-muted
                   hover:bg-primary hover:text-snow hover:border-primary
                   transition-all duration-200"
        aria-label="Share on Twitter"
      >
        <Twitter size={14} />
      </a>
      <button
        onClick={copyLink}
        className="w-8 h-8 rounded-full flex items-center justify-center
                   bg-surface border border-border text-muted
                   hover:bg-accent hover:text-ink hover:border-accent
                   transition-all duration-200"
        aria-label="Copy link"
      >
        <LinkIcon size={14} />
      </button>
    </div>
  );
};

const ArticleDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryKey: queryKeys.articles.detail(slug),
    queryFn: () => articlesService.getBySlug(slug),
  });

  const article = data?.data;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="skeleton h-96 w-full" />
        <div className="container-custom py-12">
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="skeleton h-12 w-3/4" />
            <div className="skeleton h-64" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !article) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-body text-error mb-4">Article not found</p>
          <button
            onClick={() => navigate("/articles")}
            className="btn-secondary"
          >
            <ChevronLeft size={16} /> Back to Articles
          </button>
        </div>
      </div>
    );
  }

  const publishDate = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : null;

  return (
    <div className="bg-background min-h-screen">
      {/* ══ HERO SECTION — Clean Layout ═══════════════════ */}
      <div className="bg-primary">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* LEFT — Text Content (Always Readable) */}
            <div className="py-12 lg:py-16 pr-0 lg:pr-8">
              {/* Back button */}
              <button
                onClick={() => navigate("/articles")}
                className="mb-6 inline-flex items-center gap-2 px-4 py-2 
                           bg-snow/20 backdrop-blur-sm border border-snow/30 
                           rounded-[var(--radius-md)] text-snow font-body text-sm
                           hover:bg-snow/30 transition-all duration-200"
              >
                <ChevronLeft size={16} /> Back to Articles
              </button>

              {/* Category badge */}
              <div className="mb-4">
                <Badge variant={BADGE_MAP[article.category] ?? "muted"}>
                  {article.category}
                </Badge>
              </div>

              {/* Arabic title */}
              {article.titleArabic && (
                <p
                  className="font-arabic text-2xl sm:text-3xl text-accent mb-3 leading-loose"
                  dir="rtl"
                  lang="ar"
                >
                  {article.titleArabic}
                </p>
              )}

              {/* English title */}
              <h1
                className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal 
                             text-snow leading-tight mb-4"
              >
                {article.title}
              </h1>

              {/* Meta info */}
              <div className="flex items-center flex-wrap gap-4 text-sm text-snow/80">
                <span className="flex items-center gap-1.5">
                  <User size={14} />
                  {article.author}
                </span>
                {publishDate && (
                  <span className="flex items-center gap-1.5">
                    <Calendar size={14} />
                    {publishDate}
                  </span>
                )}
                {article.readTime && (
                  <span className="flex items-center gap-1.5">
                    <Clock size={14} />
                    {article.readTime} min read
                  </span>
                )}
                {article.views && (
                  <span className="flex items-center gap-1.5">
                    <Eye size={14} />
                    {(article.views / 1000).toFixed(1)}k views
                  </span>
                )}
              </div>
            </div>

            {/* RIGHT — Decorative Image (Desktop only) */}
            <div className="hidden lg:block relative h-full min-h-[400px]">
              <img
                src={article.coverImage}
                alt=""
                className="absolute inset-0 w-full h-full object-cover opacity-30"
              />
              {/* Pattern overlay */}
              <div className="absolute inset-0 pattern-geometric opacity-[0.15]" />
            </div>
          </div>
        </div>
      </div>

      {/* ══ MAIN CONTENT ══════════════════════════════════ */}
      <div className="container-custom py-12">
        <div className="max-w-4xl mx-auto">
          {/* Featured Image (Mobile - shows below hero) */}
          <div className="lg:hidden mb-10">
            <img
              src={article.coverImage}
              alt={article.title}
              className="w-full aspect-video object-cover rounded-[var(--radius-2xl)]"
            />
          </div>

          {/* Excerpt / Lead paragraph */}
          {article.excerpt && (
            <div className="mb-10 pb-10 border-b border-border">
              <p className="font-body text-xl text-soft leading-relaxed italic">
                {article.excerpt}
              </p>
            </div>
          )}

          {/* Main content */}
          <article className="prose-article mb-12">
            <div
              className="font-body text-base sm:text-lg text-ink leading-relaxed
                            [&>p]:mb-6 [&>h2]:mt-10 [&>h2]:mb-4 [&>h2]:text-2xl 
                            [&>h2]:font-display [&>h2]:font-normal [&>h3]:mt-8 
                            [&>h3]:mb-3 [&>h3]:text-xl [&>h3]:font-semibold
                            [&>ul]:mb-6 [&>ul]:list-disc [&>ul]:pl-6
                            [&>ol]:mb-6 [&>ol]:list-decimal [&>ol]:pl-6
                            [&>blockquote]:border-l-4 [&>blockquote]:border-accent
                            [&>blockquote]:pl-6 [&>blockquote]:py-2 [&>blockquote]:italic 
                            [&>blockquote]:text-soft [&>blockquote]:bg-accent-soft
                            [&>blockquote]:rounded-r-lg"
            >
              {article.content || article.excerpt}
            </div>
          </article>

          {/* Author bio */}
          {article.authorBio && (
            <div
              className="mb-12 p-6 bg-primary-soft border border-primary/10 
                            rounded-[var(--radius-xl)]"
            >
              <p
                className="font-body text-xs font-bold text-muted uppercase 
                            tracking-widest mb-3"
              >
                About the Author
              </p>
              <p className="font-body text-base font-semibold text-ink mb-2">
                {article.author}
              </p>
              <p className="font-body text-sm text-soft leading-relaxed">
                {article.authorBio}
              </p>
            </div>
          )}

          {/* Share + Back */}
          <div className="flex items-center justify-between gap-4 pt-8 border-t border-border">
            <button onClick={() => navigate("/articles")} className="btn-ghost">
              <ChevronLeft size={16} /> Back to Articles
            </button>
            <ShareButtons title={article.title} url={window.location.href} />
          </div>
        </div>
      </div>

      {/* ══ RELATED ARTICLES ══════════════════════════════ */}
      <div className="bg-surface py-12">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-display text-2xl font-normal text-ink mb-6">
              Continue Reading
            </h2>
            <Link
              to="/articles"
              className="btn-secondary inline-flex items-center gap-2"
            >
              <BookOpen size={16} />
              Browse All Articles
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetailPage;
