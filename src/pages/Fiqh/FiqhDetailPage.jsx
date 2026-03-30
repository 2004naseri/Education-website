// src/pages/Fiqh/FiqhDetailPage.jsx
// ============================================================
// FiqhDetailPage — FIXED HERO (text always readable)
// Separated: Image on side, text on solid background
// ============================================================

import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  ChevronLeft,
  BookOpen,
  Scale,
  Users,
  GraduationCap,
} from "lucide-react";

import { fiqhService } from "../../services/fiqh.service";
import { queryKeys } from "../../services/querykeys";

import ArabicText from "../../components/sections/ArabicText";
import Badge from "../../components/ui/Badge";
import { cn } from "../../utils/cn";

// ── Difficulty badge ──────────────────────────────────────────
const DIFFICULTY_MAP = {
  beginner: { variant: "success", label: "Beginner", icon: "📗" },
  intermediate: { variant: "accent", label: "Intermediate", icon: "📘" },
  advanced: { variant: "warning", label: "Advanced", icon: "📕" },
};

// ── Category data ─────────────────────────────────────────────
const CATEGORY_DATA = {
  taharah: {
    icon: "💧",
    image:
      "https://images.unsplash.com/photo-1590650213165-f8e8d7c45b7c?w=600&h=600&fit=crop",
  },
  salah: {
    icon: "🕌",
    image:
      "https://images.unsplash.com/photo-1591604466107-ec97de05596a?w=600&h=600&fit=crop",
  },
  zakah: {
    icon: "💰",
    image:
      "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600&h=600&fit=crop",
  },
  sawm: {
    icon: "🌙",
    image:
      "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=600&h=600&fit=crop",
  },
  hajj: {
    icon: "🕋",
    image:
      "https://images.unsplash.com/photo-1591604466107-ec97de05596a?w=600&h=600&fit=crop",
  },
  muamalat: {
    icon: "🤝",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=600&fit=crop",
  },
  nikah: {
    icon: "💍",
    image:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&h=600&fit=crop",
  },
  inheritance: {
    icon: "📜",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=600&fit=crop",
  },
  food: {
    icon: "🍽️",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=600&fit=crop",
  },
  hudud: {
    icon: "⚖️",
    image:
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&h=600&fit=crop",
  },
};

const FiqhDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryKey: queryKeys.fiqh.detail(slug),
    queryFn: () => fiqhService.getBySlug(slug),
  });

  const topic = data?.data;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="skeleton h-96 w-full" />
        <div className="container-custom py-12">
          <div className="max-w-4xl mx-auto">
            <div className="skeleton h-12 w-3/4 mb-4" />
            <div className="skeleton h-64" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !topic) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-body text-error mb-4">Topic not found</p>
          <button onClick={() => navigate("/fiqh")} className="btn-secondary">
            <ChevronLeft size={16} /> Back to Fiqh
          </button>
        </div>
      </div>
    );
  }

  const difficultyInfo = DIFFICULTY_MAP[topic.difficulty] ?? {
    variant: "muted",
    label: topic.difficulty,
    icon: "📖",
  };
  const categoryData = CATEGORY_DATA[topic.category] ?? {
    icon: "📖",
    image:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600&h=600&fit=crop",
  };

  return (
    <div className="bg-background min-h-screen">
      {/* ══ HERO SECTION — Image on side, text on solid bg ══ */}
      <div className="bg-primary">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* LEFT SIDE — Text content (always readable) */}
            <div className="py-12 lg:py-16 pr-0 lg:pr-8">
              {/* Back button */}
              <button
                onClick={() => navigate("/fiqh")}
                className="mb-6 inline-flex items-center gap-2 px-4 py-2 
                           bg-snow/20 backdrop-blur-sm border border-snow/30 
                           rounded-[var(--radius-md)] text-snow font-body text-sm
                           hover:bg-snow/30 transition-all duration-200"
              >
                <ChevronLeft size={16} /> Back to Topics
              </button>

              {/* Badges */}
              <div className="flex items-center flex-wrap gap-2 mb-6">
                <Badge variant="accent">
                  <span className="text-base">{categoryData.icon}</span>
                  {topic.category}
                </Badge>
                <Badge variant={difficultyInfo.variant}>
                  <span>{difficultyInfo.icon}</span>
                  {difficultyInfo.label}
                </Badge>
              </div>

              {/* Arabic title */}
              {topic.titleArabic && (
                <div className="mb-4">
                  <p
                    className="font-arabic text-2xl sm:text-3xl text-accent leading-loose"
                    dir="rtl"
                    lang="ar"
                  >
                    {topic.titleArabic}
                  </p>
                </div>
              )}

              {/* English title */}
              <h1
                className="font-display font-normal text-snow text-3xl sm:text-4xl lg:text-5xl
                             leading-tight mb-4"
              >
                {topic.title}
              </h1>

              {/* Excerpt */}
              {topic.excerpt && (
                <p className="font-body text-base sm:text-lg text-snow/90 leading-relaxed">
                  {topic.excerpt}
                </p>
              )}
            </div>

            {/* RIGHT SIDE — Decorative image (hidden on mobile) */}
            <div className="hidden lg:block relative h-full min-h-[400px]">
              <img
                src={categoryData.image}
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
          {/* Quick info cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3  gap-4 mb-12">
            <div
              className="p-5 bg-primary-soft border border-primary/10 rounded-[var(--radius-lg)]
                            flex items-center gap-3"
            >
              <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center shrink-0">
                <GraduationCap size={24} className="text-snow" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-body text-xs text-muted uppercase tracking-wider mb-0.5">
                  Difficulty
                </p>
                <p className="font-body text-base font-semibold text-ink">
                  {difficultyInfo.label}
                </p>
              </div>
            </div>

            <div
              className="p-5 bg-accent-soft border border-accent/10 rounded-[var(--radius-lg)]
                            flex items-center gap-3"
            >
              <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center shrink-0">
                <BookOpen size={24} className="text-ink" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-body text-xs text-muted uppercase tracking-wider mb-0.5">
                  Category
                </p>
                <p className="font-body text-base font-semibold text-ink capitalize truncate">
                  {topic.category}
                </p>
              </div>
            </div>
          </div>

          {/* Main article content */}
          <article className="prose-article mb-12">
            <div
              className="font-body text-base sm:text-lg text-ink leading-relaxed
                            [&>p]:mb-6 [&>h2]:mt-12 [&>h2]:mb-6 [&>h2]:text-3xl 
                            [&>h2]:font-display [&>h2]:font-normal [&>h2]:text-primary
                            [&>h3]:mt-8 [&>h3]:mb-4 [&>h3]:text-xl [&>h3]:font-semibold
                            [&>ul]:mb-6 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-2
                            [&>ol]:mb-6 [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:space-y-2
                            [&>blockquote]:border-l-4 [&>blockquote]:border-accent
                            [&>blockquote]:pl-6 [&>blockquote]:py-2 [&>blockquote]:italic 
                            [&>blockquote]:text-soft [&>blockquote]:bg-accent-soft
                            [&>blockquote]:my-6 [&>blockquote]:rounded-r-lg"
            >
              {topic.content}
            </div>
          </article>

          {/* ══ EVIDENCE SECTION ══════════════════════════════ */}
          {topic.evidence?.length > 0 && (
            <div
              className="mb-12 p-8 bg-gradient-to-br from-primary-soft to-accent-soft/30
                            border border-primary/20 rounded-[var(--radius-2xl)] shadow-sm"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                  <Scale size={24} className="text-snow" />
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-normal text-ink">
                  Evidence from Quran & Sunnah
                </h2>
              </div>

              <div className="space-y-6">
                {topic.evidence.map((ev, i) => (
                  <div
                    key={i}
                    className="p-6 bg-snow border border-border rounded-[var(--radius-lg)]"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <Badge
                        variant={ev.type === "quran" ? "accent" : "primary"}
                      >
                        {ev.type === "quran" ? "📖 Quran" : "📿 Hadith"}
                      </Badge>
                      <span className="font-body text-sm font-semibold text-primary">
                        {ev.reference}
                      </span>
                    </div>

                    {ev.arabic && (
                      <ArabicText
                        size="lg"
                        color="default"
                        className="mb-4 pb-4 border-b border-border"
                      >
                        {ev.arabic}
                      </ArabicText>
                    )}

                    {ev.translation && (
                      <p className="font-body text-base text-soft italic leading-relaxed">
                        "{ev.translation}"
                      </p>
                    )}

                    {ev.text && !ev.translation && (
                      <p className="font-body text-base text-soft leading-relaxed">
                        {ev.text}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ══ REFERENCES ════════════════════════════════════ */}
          {topic.references?.length > 0 && (
            <div className="mb-12 p-6 bg-surface border border-border rounded-[var(--radius-xl)]">
              <div className="flex items-center gap-3 mb-4">
                <BookOpen size={20} className="text-accent" />
                <h2 className="font-display text-xl font-normal text-ink">
                  References for Further Study
                </h2>
              </div>
              <ul className="space-y-3">
                {topic.references.map((ref, i) => (
                  <li
                    key={i}
                    className="font-body text-sm text-soft flex items-start gap-3
                                         p-3 bg-background rounded-lg"
                  >
                    <span className="text-accent font-bold mt-0.5 shrink-0">
                      {i + 1}.
                    </span>
                    <span>{ref}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* ══ RELATED TOPICS ════════════════════════════════ */}
          {topic.relatedTopics?.length > 0 && (
            <div className="mb-12">
              <h2 className="font-display text-2xl font-normal text-ink mb-6">
                Related Topics
              </h2>
              <div className="flex flex-wrap gap-3">
                {topic.relatedTopics.map((relatedSlug) => (
                  <Link
                    key={relatedSlug}
                    to={`/fiqh/${relatedSlug}`}
                    className="px-5 py-3 bg-primary-soft border border-primary/10 
                               rounded-full font-body text-sm font-medium text-primary
                               hover:bg-primary hover:text-snow hover:border-primary
                               transition-all duration-200"
                  >
                    {relatedSlug.replace(/-/g, " ")}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Back button */}
          <div className="text-center pt-8 border-t border-border">
            <Link
              to="/fiqh"
              className="btn-primary inline-flex items-center gap-2"
            >
              <BookOpen size={16} />
              Browse All Fiqh Topics
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FiqhDetailPage;
