// src/pages/Hadith/HadithDetailPage.jsx
// ============================================================
// HadithDetailPage — Full hadith detail view
// Route: /hadith/:id
// ============================================================

import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, Share2, BookOpen } from "lucide-react";

import { hadithService } from "../../services/hadith.service";
import { queryKeys } from "../../services/querykeys";
import { HADITH_TOPICS } from "../../data/hadithCollections";

import ArabicText from "../../components/sections/ArabicText";
import Badge from "../../components/ui/Badge";
import { cn } from "../../utils/cn";

// ── Grade badge map ───────────────────────────────────────────
const GRADE_BADGE = {
  sahih: { variant: "success", label: "Sahih ✓" },
  hasan: { variant: "accent", label: "Hasan ◈" },
  daif: { variant: "warning", label: "Da'if ○" },
};

const HadithDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryKey: queryKeys.hadith.detail(id),
    queryFn: () => hadithService.getById(id),
  });

  const hadith = data?.data;

  if (isLoading) {
    return (
      <div className="bg-background min-h-screen">
        <div className="container-custom py-12">
          <div className="skeleton h-96 rounded-[var(--radius-xl)]" />
        </div>
      </div>
    );
  }

  if (isError || !hadith) {
    return (
      <div className="bg-background min-h-screen">
        <div className="container-custom py-12 text-center">
          <p className="text-body text-error mb-4">Hadith not found</p>
          <button onClick={() => navigate("/hadith")} className="btn-secondary">
            <ChevronLeft size={16} /> Back to Hadith
          </button>
        </div>
      </div>
    );
  }

  const gradeInfo = GRADE_BADGE[hadith.grade] ?? {
    variant: "muted",
    label: hadith.grade,
  };
  const topicInfo = HADITH_TOPICS.find((t) => t.id === hadith.topic);

  return (
    <div className="bg-background min-h-screen">
      <div className="container-custom py-12">
        {/* Back button */}
        <button onClick={() => navigate("/hadith")} className="btn-ghost mb-8">
          <ChevronLeft size={16} /> Back to Hadith
        </button>

        {/* Main content */}
        <div className="max-w-4xl mx-auto">
          {/* Header — badges */}
          <div className="flex items-center flex-wrap gap-2 mb-6">
            <Badge variant={gradeInfo.variant}>{gradeInfo.label}</Badge>
            <Badge variant="muted">{hadith.collection.toUpperCase()}</Badge>
            {topicInfo && (
              <Badge variant="primary">
                {topicInfo.icon} {topicInfo.label}
              </Badge>
            )}
          </div>

          {/* Hadith card — large detailed view */}
          <article className="hadith-card">
            {/* ── Arabic text ───────────────────────────────── */}
            <ArabicText
              size="2xl"
              color="default"
              className="mb-6 pb-6 border-b border-border leading-[2.6]"
            >
              {hadith.arabic}
            </ArabicText>

            {/* ── English translation ────────────────────────── */}
            <div className="mb-6 pb-6 border-b border-border">
              <p className="font-body text-lg text-soft leading-[1.9] italic">
                "{hadith.translation}"
              </p>
            </div>

            {/* ── Narrator ───────────────────────────────────── */}
            <div className="mb-6 pb-6 border-b border-border">
              <p
                className="font-body text-xs font-bold text-muted uppercase
                            tracking-widest mb-2"
              >
                Narrator
              </p>
              <p className="font-body text-base text-ink mb-1">
                {hadith.narrator}
              </p>
              {hadith.narratorAr && (
                <p
                  className="font-arabic-ui text-sm text-accent"
                  dir="rtl"
                  lang="ar"
                >
                  {hadith.narratorAr}
                </p>
              )}
            </div>

            {/* ── Commentary/Explanation ─────────────────────── */}
            {hadith.explanation && (
              <div className="mb-6 pb-6 border-b border-border">
                <p
                  className="font-body text-xs font-bold text-muted uppercase
                              tracking-widest mb-2"
                >
                  Commentary
                </p>
                <p className="font-body text-base text-soft leading-relaxed">
                  {hadith.explanation}
                </p>
              </div>
            )}

            {/* ── Reference details ──────────────────────────── */}
            <div className="mb-6">
              <p
                className="font-body text-xs font-bold text-muted uppercase
                            tracking-widest mb-3"
              >
                Reference
              </p>
              <dl className="space-y-2 text-sm">
                <div className="flex items-start gap-3">
                  <dt className="font-body text-muted w-24 shrink-0">
                    Collection:
                  </dt>
                  <dd className="font-body text-ink font-medium">
                    {hadith.collection.charAt(0).toUpperCase() +
                      hadith.collection.slice(1)}
                  </dd>
                </div>
                {hadith.book && (
                  <div className="flex items-start gap-3">
                    <dt className="font-body text-muted w-24 shrink-0">
                      Book:
                    </dt>
                    <dd className="font-body text-ink">{hadith.book}</dd>
                  </div>
                )}
                {hadith.chapter && (
                  <div className="flex items-start gap-3">
                    <dt className="font-body text-muted w-24 shrink-0">
                      Chapter:
                    </dt>
                    <dd className="font-body text-ink">{hadith.chapter}</dd>
                  </div>
                )}
                {hadith.number && (
                  <div className="flex items-start gap-3">
                    <dt className="font-body text-muted w-24 shrink-0">
                      Number:
                    </dt>
                    <dd className="font-body text-ink">{hadith.number}</dd>
                  </div>
                )}
                {hadith.reference && (
                  <div className="flex items-start gap-3">
                    <dt className="font-body text-muted w-24 shrink-0">
                      Full Ref:
                    </dt>
                    <dd className="font-body text-ink">{hadith.reference}</dd>
                  </div>
                )}
              </dl>
            </div>

            {/* ── Tags ───────────────────────────────────────── */}
            {hadith.tags?.length > 0 && (
              <div className="pt-4 border-t border-border">
                <div className="flex flex-wrap gap-2">
                  {hadith.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-body text-xs text-muted px-2 py-0.5
                                 bg-surface border border-border rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </article>

          {/* Actions */}
          <div className="mt-8 flex items-center justify-between gap-4">
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: hadith.translation,
                    text: `"${hadith.translation}" — ${hadith.narrator}`,
                    url: window.location.href,
                  });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert("Link copied to clipboard!");
                }
              }}
              className="btn-ghost"
            >
              <Share2 size={16} /> Share
            </button>

            {topicInfo && (
              <Link
                to={`/hadith?topic=${hadith.topic}`}
                className="btn-secondary text-sm"
              >
                <BookOpen size={16} /> More {topicInfo.label} Hadith
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HadithDetailPage;
