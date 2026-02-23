// src/pages/Articles/ArticleDetailPage.jsx
// ============================================================
// ArticleDetailPage — Beautiful blog-style article reader
// Route: /articles/:slug
//
// Features:
// - Hero image with gradient overlay
// - Reading progress bar
// - Estimated read time
// - Author info
// - Share buttons
// - Related articles
// ============================================================

import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
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
import { queryKeys } from "../../services/queryKeys";

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

// ── Reading progress bar ──────────────────────────────────────
const ReadingProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setProgress(Math.min(scrollPercent, 100));
    };

    window.addEventListener("scroll", updateProgress);
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-surface">
      <div
        className="h-full bg-accent transition-all duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
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

// ============================================================
// ArticleDetailPage
// ============================================================
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
            <div className="skeleton h-6 w-1/2" />
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
    <>
      <ReadingProgress />

      <article className="bg-background">
        {/* ══ HERO IMAGE ════════════════════════════════════ */}
        <div className="relative w-full aspect-[21/9] bg-primary-soft overflow-hidden">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          {/* Gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.7) 100%)",
            }}
          />

          {/* Hero content */}
          <div className="absolute inset-0 flex items-end">
            <div className="container-custom pb-12">
              <div className="max-w-4xl mx-auto">
                {/* Category badge */}
                <Badge
                  variant={BADGE_MAP[article.category] ?? "muted"}
                  className="mb-4"
                >
                  {article.category}
                </Badge>

                {/* Arabic title */}
                {article.titleArabic && (
                  <p
                    className="font-arabic text-2xl text-accent mb-3 leading-loose"
                    dir="rtl"
                    lang="ar"
                  >
                    {article.titleArabic}
                  </p>
                )}

                {/* Main title */}
                <h1
                  className="font-display font-normal text-snow text-4xl sm:text-5xl lg:text-6xl
                               leading-tight mb-4"
                >
                  {article.title}
                </h1>

                {/* Meta info */}
                <div className="flex items-center flex-wrap gap-4 text-sm text-snow/70">
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
            </div>
          </div>
        </div>

        {/* ══ ARTICLE BODY ══════════════════════════════════ */}
        <div className="container-custom py-12">
          <div className="max-w-3xl mx-auto">
            {/* Excerpt / lead paragraph */}
            {article.excerpt && (
              <div className="mb-10 pb-10 border-b border-border">
                <p className="font-body text-xl text-soft leading-relaxed italic">
                  {article.excerpt}
                </p>
              </div>
            )}

            {/* Main content */}
            <div className="prose-article mb-12">
              <div
                className="font-body text-base sm:text-lg text-ink leading-relaxed
                              [&>p]:mb-6 [&>h2]:mt-10 [&>h2]:mb-4 [&>h2]:text-2xl 
                              [&>h2]:font-display [&>h2]:font-normal [&>h3]:mt-8 
                              [&>h3]:mb-3 [&>h3]:text-xl [&>h3]:font-semibold
                              [&>ul]:mb-6 [&>ul]:list-disc [&>ul]:pl-6
                              [&>ol]:mb-6 [&>ol]:list-decimal [&>ol]:pl-6
                              [&>blockquote]:border-l-4 [&>blockquote]:border-accent
                              [&>blockquote]:pl-6 [&>blockquote]:italic [&>blockquote]:text-soft"
              >
                {/* This would be rendered markdown or HTML from your API */}
                {article.content || article.excerpt}
              </div>
            </div>

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
              <button
                onClick={() => navigate("/articles")}
                className="btn-ghost"
              >
                <ChevronLeft size={16} /> Back to Articles
              </button>
              <ShareButtons title={article.title} url={window.location.href} />
            </div>
          </div>
        </div>

        {/* ══ RELATED ARTICLES (Optional) ═══════════════════ */}
        <div className="bg-surface py-12">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto">
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
      </article>
    </>
  );
};

export default ArticleDetailPage;
