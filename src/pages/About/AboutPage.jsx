// src/pages/About/AboutPage.jsx
// ============================================================
// AboutPage — NurPath
//
// Static page with:
//   - Hero section with mission statement
//   - Our Story section
//   - Our Values (cards)
//   - Team section (optional - empty for now)
//   - CTA to contact
// ============================================================

import { Link } from "react-router-dom";
import { BookOpen, Heart, Users, Globe, Mail } from "lucide-react";
import { cn } from "../../utils/cn";
import SectionTitle from "../../components/sections/SectionTitle";
import { SITE_CONFIG } from "../../data/site";

// ── Values data ───────────────────────────────────────────────
const VALUES = [
  {
    icon: BookOpen,
    title: "Authentic Knowledge",
    titleAr: "العلم الأصيل",
    description:
      "Every resource is verified against authentic Islamic sources — the Quran, Sunnah, and classical scholarship.",
  },
  {
    icon: Heart,
    title: "Accessible to All",
    titleAr: "متاح للجميع",
    description:
      "Free, multilingual, and designed for learners at every level — from beginners to advanced students.",
  },
  {
    icon: Users,
    title: "Community Driven",
    titleAr: "مدفوع بالمجتمع",
    description:
      "Built by scholars, educators, and volunteers dedicated to spreading beneficial knowledge.",
  },
  {
    icon: Globe,
    title: "Global Reach",
    titleAr: "الوصول العالمي",
    description:
      "Serving seekers of knowledge worldwide in Arabic, English, Dari, Pashto, and more.",
  },
];

// ============================================================
// AboutPage
// ============================================================
const AboutPage = () => {
  return (
    <>
      {/* ── Hero section ──────────────────────────────────── */}
      <section
        className="relative py-20 sm:py-28 overflow-hidden"
        style={{ background: "var(--gradient-primary)" }}
      >
        <div
          className="absolute inset-0 pattern-geometric opacity-[0.04]"
          aria-hidden="true"
        />

        <div className="relative z-10 container-custom text-center">
          {/* Arabic */}
          <p
            className="font-arabic text-accent/80 text-2xl sm:text-3xl mb-4 leading-loose"
            dir="rtl"
            lang="ar"
          >
            طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ
          </p>
          <p className="font-body text-snow/40 text-xs tracking-widest uppercase mb-8">
            Seeking knowledge is an obligation upon every Muslim
          </p>

          <h1 className="heading-xl text-snow mb-6">About NurPath</h1>
          <p className="font-body text-lg text-snow/70 leading-relaxed max-w-3xl mx-auto">
            We are a non-profit platform dedicated to making authentic Islamic
            knowledge accessible to everyone, everywhere — completely free.
          </p>
        </div>
      </section>

      {/* ── Our Story ─────────────────────────────────────── */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <SectionTitle
              eyebrow="OUR STORY"
              title="Why NurPath Exists"
              subtitle="The journey that led us here"
            />

            <div className="space-y-6 text-body">
              <p>
                In an age of information overload, finding authentic Islamic
                knowledge can be overwhelming. Countless websites, apps, and
                resources exist — but how many are truly reliable? How many are
                accessible to non-Arabic speakers? How many are free?
              </p>

              <p>
                <strong className="text-ink">
                  NurPath was born from a simple belief:
                </strong>{" "}
                every Muslim, regardless of location, language, or financial
                means, deserves access to authentic Islamic scholarship. From
                the Quran and Hadith to Fiqh and Tafsir — these are not
                luxuries, they are necessities.
              </p>

              <p>
                Our team of scholars, translators, and developers have spent
                years compiling, verifying, and organizing over{" "}
                <strong className="text-primary">1,200 books</strong>,
                <strong className="text-primary"> 7,500 hadith</strong>, and
                countless articles — all available in multiple languages, all
                completely free.
              </p>

              <p className="text-accent italic">
                "The best of you are those who learn the Quran and teach it." —
                Prophet Muhammad ﷺ
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Our Values ────────────────────────────────────── */}
      <section className="section-padding bg-surface">
        <div className="container-custom">
          <SectionTitle
            eyebrow="OUR VALUES"
            title="What We Stand For"
            subtitle="The principles that guide everything we do"
          />

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((value, i) => (
              <div
                key={value.title}
                className={cn(
                  "card p-6 text-center",
                  `animate-slide-up stagger-${i + 1}`,
                )}
              >
                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-xl bg-primary-soft border border-primary/10
                                flex items-center justify-center mx-auto mb-4"
                >
                  <value.icon
                    size={24}
                    className="text-primary"
                    aria-hidden="true"
                  />
                </div>

                {/* Title */}
                <h3 className="font-body text-base font-semibold text-ink mb-1">
                  {value.title}
                </h3>

                {/* Arabic */}
                <p
                  className="font-arabic-ui text-xs text-accent mb-3"
                  dir="rtl"
                  lang="ar"
                >
                  {value.titleAr}
                </p>

                {/* Description */}
                <p className="font-body text-sm text-soft leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats section ─────────────────────────────────── */}
      <section className="section-padding-sm bg-primary">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="font-display text-5xl text-accent font-light mb-2">
                1,200+
              </p>
              <p className="font-body text-sm text-snow/70">Islamic Books</p>
            </div>
            <div>
              <p className="font-display text-5xl text-accent font-light mb-2">
                7,500+
              </p>
              <p className="font-body text-sm text-snow/70">Authentic Hadith</p>
            </div>
            <div>
              <p className="font-display text-5xl text-accent font-light mb-2">
                114
              </p>
              <p className="font-body text-sm text-snow/70">Quran Surahs</p>
            </div>
            <div>
              <p className="font-display text-5xl text-accent font-light mb-2">
                5
              </p>
              <p className="font-body text-sm text-snow/70">Languages</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA section ───────────────────────────────────── */}
      <section className="section-padding bg-background">
        <div className="container-custom text-center">
          <h2 className="heading-lg text-ink mb-4">Get in Touch</h2>
          <p className="text-body mb-8 max-w-2xl mx-auto">
            Have questions, suggestions, or want to contribute? We'd love to
            hear from you.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="btn-primary inline-flex items-center gap-2"
            >
              <Mail size={16} />
              Contact Us
            </Link>
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="btn-secondary inline-flex items-center gap-2"
            >
              {SITE_CONFIG.email}
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
