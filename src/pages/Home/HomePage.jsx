// src/pages/Home/HomePage.jsx
// ============================================================
// HomePage — NurPath
//
// Sections (top to bottom):
//   1. Hero          — full screen, dark gradient, stats
//   2. Categories    — icon grid linking to each section
//   3. Featured Books — 4 book cards + "View All" CTA
//   4. Daily Hadith  — 1 featured hadith with Arabic text
//   5. Featured Articles — 3 article cards
//   6. Quran Verse   — featured ayat with gold treatment
//   7. CTA Banner    — "Start Learning" call to action
//
// Data: all from mock services via React Query
// ============================================================

import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, ExternalLink } from "lucide-react";

// ── Services + query keys ─────────────────────────────────────
import { booksService } from "../../services/books.service";
import { articlesService } from "../../services/articles.service";
import { hadithService } from "../../services/hadith.service";
import { quranService } from "../../services/quran.service";
import { queryKeys } from "../../services/querykeys";

// ── Section components ────────────────────────────────────────
import Hero from "../../components/sections/Hero";
import SectionTitle from "../../components/sections/SectionTitle";
import ArabicText from "../../components/sections/ArabicText";

// ── Cards ─────────────────────────────────────────────────────
import BookCard from "../../components/cards/BookCard";
import ArticleCard from "../../components/cards/ArticleCard";
import HadithCard from "../../components/cards/HadithCard";

// ── UI ────────────────────────────────────────────────────────
import { cn } from "../../utils/cn";

// ── Data — home categories grid ───────────────────────────────
import { HOME_CATEGORIES } from "../../data/categories";

// ============================================================
// SECTION — Categories Grid
// ============================================================
const CategoriesSection = () => (
  <section
    className="section-padding bg-surface"
    aria-labelledby="categories-heading"
  >
    <div className="container-custom">
      <SectionTitle
        eyebrow="EXPLORE"
        title="Islamic Sciences"
        subtitle="Comprehensive resources across every branch of Islamic knowledge"
        id="categories-heading"
      />

      <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {HOME_CATEGORIES.map((cat, i) => (
          <Link
            key={cat.id}
            to={cat.path}
            className={cn(
              "card-interactive group",
              "flex flex-col items-center text-center p-5 gap-3",
              `animate-slide-up stagger-${Math.min(i + 1, 6)}`,
            )}
            aria-label={`Browse ${cat.label}`}
          >
            {/* Icon */}
            <div
              className="w-14 h-14 rounded-xl bg-primary-soft border border-primary/10
                            flex items-center justify-center text-2xl
                            group-hover:bg-primary group-hover:border-primary
                            group-hover:scale-110 transition-all duration-300"
            >
              {cat.icon}
            </div>

            {/* English label */}
            <p
              className="font-body text-sm font-semibold text-ink
                          group-hover:text-primary transition-colors duration-200 leading-tight"
            >
              {cat.label}
            </p>

            {/* Arabic label */}
            <p
              className="font-arabic-ui text-xs text-accent/70 leading-none"
              dir="rtl"
              lang="ar"
            >
              {cat.labelAr}
            </p>

            {/* Count */}
            <p className="font-body text-xs text-muted">{cat.count}</p>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

// ============================================================
// SECTION — Featured Books
// ============================================================
const BooksSection = () => {
  const { data, isLoading } = useQuery({
    queryKey: queryKeys.books.featured(),
    queryFn: booksService.getFeatured,
  });

  const books = data?.data ?? [];

  return (
    <section
      className="section-padding bg-background"
      aria-labelledby="books-heading"
    >
      <div className="container-custom">
        {/* Header + View All link */}
        <div className="flex items-end justify-between mb-12 gap-4">
          <SectionTitle
            eyebrow="المكتبة"
            title="Featured Books"
            subtitle="Hand-picked Islamic texts across every discipline"
            align="left"
            id="books-heading"
          />
          <Link
            to="/books"
            className="btn-secondary shrink-0 text-sm hidden sm:inline-flex"
          >
            View All <ArrowRight size={15} />
          </Link>
        </div>

        {/* Books grid */}
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="skeleton aspect-[3/4] rounded-[var(--radius-xl)]"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {books.map((book, i) => (
              <div
                key={book.id}
                className={`animate-slide-up stagger-${Math.min(i + 1, 4)}`}
              >
                <BookCard book={book} />
              </div>
            ))}
          </div>
        )}

        {/* Mobile View All */}
        <div className="mt-8 text-center sm:hidden">
          <Link to="/books" className="btn-secondary">
            View All Books <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
};

// ============================================================
// SECTION — Daily Hadith
// ============================================================
const HadithSection = () => {
  const { data, isLoading } = useQuery({
    queryKey: queryKeys.hadith.list({ featured: true }),
    queryFn: hadithService.getFeatured,
  });

  const hadith = data?.data?.[0] ?? null;

  return (
    <section
      className="section-padding relative overflow-hidden"
      style={{ background: "var(--gradient-primary)" }}
      aria-labelledby="hadith-heading"
    >
      {/* Pattern overlay */}
      <div
        className="absolute inset-0 pattern-geometric opacity-[0.03]"
        aria-hidden="true"
      />

      <div className="relative z-10 container-custom">
        <SectionTitle
          eyebrow="الحديث"
          title="Hadith of the Day"
          subtitle="Authentic narrations from the Prophet ﷺ"
          light
        />

        <div className="mt-12 max-w-3xl mx-auto">
          {isLoading ? (
            <div className="skeleton h-64 rounded-[var(--radius-xl)]" />
          ) : hadith ? (
            <HadithCard hadith={hadith} showExplanation />
          ) : null}
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/hadith"
            className="btn-secondary border-snow/30 text-snow
                                        hover:bg-snow/10 hover:border-snow/50"
          >
            Browse All Hadith <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
};

// ============================================================
// SECTION — Featured Articles
// ============================================================
const ArticlesSection = () => {
  const { data, isLoading } = useQuery({
    queryKey: queryKeys.articles.featured(),
    queryFn: articlesService.getFeatured,
  });

  const articles = data?.data ?? [];

  return (
    <section
      className="section-padding bg-surface"
      aria-labelledby="articles-heading"
    >
      <div className="container-custom">
        <div className="flex items-end justify-between mb-12 gap-4">
          <SectionTitle
            eyebrow="المقالات"
            title="Latest Articles"
            subtitle="Insights on Islamic knowledge, practice, and spirituality"
            align="left"
            id="articles-heading"
          />
          <Link
            to="/articles"
            className="btn-secondary shrink-0 text-sm hidden sm:inline-flex"
          >
            View All <ArrowRight size={15} />
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="skeleton h-80 rounded-[var(--radius-xl)]"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, i) => (
              <div
                key={article.id}
                className={`animate-slide-up stagger-${Math.min(i + 1, 3)}`}
              >
                <ArticleCard article={article} />
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 text-center sm:hidden">
          <Link to="/articles" className="btn-secondary">
            View All Articles <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
};

// ============================================================
// SECTION — Quran Verse
// ============================================================
const QuranVerseSection = () => {
  const { data, isLoading } = useQuery({
    queryKey: queryKeys.quran.featured(),
    queryFn: quranService.getFeaturedAyat,
  });

  const ayat = data?.data ?? [];
  const featured = ayat[0] ?? null;

  return (
    <section
      className="section-padding bg-background"
      aria-labelledby="quran-heading"
    >
      <div className="container-custom">
        <SectionTitle
          eyebrow="القرآن الكريم"
          title="Quran & Tafsir"
          subtitle="Read, reflect, and understand the words of Allah"
          id="quran-heading"
        />

        {isLoading ? (
          <div className="mt-12 skeleton h-48 max-w-3xl mx-auto rounded-[var(--radius-xl)]" />
        ) : featured ? (
          <div className="mt-12 max-w-3xl mx-auto">
            {/* Featured Ayat card */}
            <div className="ayat-card text-center">
              {/* Gold ornament */}
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="h-px w-16 bg-gradient-to-r from-transparent to-accent/50" />
                <span className="text-accent text-sm" aria-hidden="true">
                  ✦
                </span>
                <div className="h-px w-16 bg-gradient-to-l from-transparent to-accent/50" />
              </div>

              {/* Arabic */}
              <ArabicText
                size="xl"
                color="default"
                center
                className="mb-6 leading-[2.4]"
              >
                {featured.arabic}
              </ArabicText>

              {/* Translation */}
              <p
                className="font-body  sm:text-lg text-soft leading-[1.9] italic mb-4
                            max-w-xl mx-auto"
              >
                "{featured.translation}"
              </p>

              {/* Reference */}
              <p className="font-body text-sm text-accent font-semibold">
                — {featured.reference}
              </p>
            </div>

            {/* CTA */}
            <div className="mt-8 text-center">
              <Link
                to="/quran"
                className="btn-primary inline-flex items-center gap-2"
              >
                <BookOpen size={16} />
                Read Quran
              </Link>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
};

// ============================================================
// SECTION — CTA Banner
// ============================================================
const CTABanner = () => (
  <section
    className="py-20 sm:py-24 relative overflow-hidden"
    style={{
      background:
        "var(--gradient-luxury, linear-gradient(135deg, #1b4332, #b5832a))",
    }}
    aria-label="Call to action"
  >
    <div
      className="absolute inset-0 pattern-geometric opacity-[0.04]"
      aria-hidden="true"
    />

    <div className="relative z-10 container-custom text-center">
      {/* Arabic */}
      <p
        className="font-arabic text-accent/80 text-2xl mb-4 leading-loose"
        dir="rtl"
        lang="ar"
      >
        اطْلُبُوا الْعِلْمَ مِنَ الْمَهْدِ إِلَى اللَّحْدِ
      </p>
      <p className="font-body text-snow/40 text-xs tracking-widest uppercase mb-8">
        Seek knowledge from the cradle to the grave
      </p>

      <h2
        className="font-display font-light text-snow text-4xl sm:text-5xl
                     tracking-tight mb-4"
      >
        Begin Your Journey
      </h2>
      <p className="font-body text-snow/65 text-lg max-w-xl mx-auto mb-10">
        Thousands of authentic Islamic resources — books, hadith, Quran,
        articles — all in one place, completely free.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          to="/books"
          className="inline-flex items-center gap-2 px-8 py-4
                     bg-snow text-ink font-body font-semibold 
                     rounded-[var(--radius-md)] hover:bg-accent
                     transition-all duration-300 hover:-translate-y-0.5
                     shadow-[var(--shadow-lg)]"
        >
          <BookOpen size={18} /> Explore Library
        </Link>
        <Link
          to="/about"
          className="inline-flex items-center gap-2 px-8 py-4
                     bg-transparent text-snow font-body font-semibold 
                     rounded-[var(--radius-md)] border border-snow/25
                     hover:bg-snow/10 hover:border-snow/40
                     transition-all duration-300"
        >
          <ExternalLink size={18} /> About NurPath
        </Link>
      </div>
    </div>
  </section>
);

// ============================================================
// MAIN — HomePage
// ============================================================
const HomePage = () => {
  return (
    <>
      <Hero />
      <CategoriesSection />
      <BooksSection />
      <HadithSection />
      <ArticlesSection />
      <QuranVerseSection />
      <CTABanner />
    </>
  );
};

export default HomePage;
