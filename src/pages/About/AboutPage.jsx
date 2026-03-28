// src/pages/About/AboutPage.jsx
// ============================================================
// AboutPage — NurPath Story, Mission, Values
// ============================================================

import { BookOpen, Heart, Users, Globe, Target, Award } from "lucide-react";

import SectionTitle from "../../components/sections/SectionTitle";
import BismillahBanner from "../../components/sections/Bismillahbanner";

const AboutPage = () => {
  return (
    <>
      <BismillahBanner variant="default" />

      <div className="bg-background min-h-screen">
        {/* ══ HERO SECTION ══════════════════════════════════ */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary to-primary-dark py-20">
          <div className="absolute inset-0 pattern-geometric opacity-10" />
          <div className="container-custom relative">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-display text-5xl sm:text-6xl font-normal text-snow mb-6 leading-tight">
                About NurPath
              </h1>
              <p className="font-body text-xl text-snow/90 leading-relaxed">
                Illuminating the path to authentic Islamic knowledge, one
                student at a time
              </p>
            </div>
          </div>
        </section>

        {/* ══ OUR STORY ═════════════════════════════════════ */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <SectionTitle
                eyebrow="OUR STORY"
                title="Why NurPath Exists"
                align="center"
                className="mb-12"
              />

              <div className="prose-article">
                <p className="font-body text-lg text-ink leading-relaxed mb-6">
                  In an age of information overload, finding authentic Islamic
                  knowledge has become increasingly challenging. NurPath was
                  born from a simple vision: to create a trusted, comprehensive
                  platform where Muslims worldwide can access authentic Islamic
                  education.
                </p>

                <p className="font-body text-lg text-ink leading-relaxed mb-6">
                  Founded in 2024 in Kabul, Afghanistan, NurPath brings together
                  centuries of Islamic scholarship with modern technology. We
                  believe that every Muslim, regardless of location or
                  background, deserves access to quality Islamic education.
                </p>

                <p className="font-body text-lg text-ink leading-relaxed mb-6">
                  Our platform serves students from beginner to advanced levels,
                  offering resources in multiple languages including Arabic,
                  English, Dari, and Pashto. Whether you're learning the basics
                  of wudu or studying advanced fiqh, NurPath provides a clear
                  path forward.
                </p>

                <div className="p-6 bg-primary-soft border border-primary/10 rounded-[var(--radius-xl)] my-8">
                  <p
                    className="font-arabic text-2xl text-accent text-center mb-3 leading-loose"
                    dir="rtl"
                    lang="ar"
                  >
                    طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ
                  </p>
                  <p className="font-body text-base text-soft text-center italic">
                    "Seeking knowledge is an obligation upon every Muslim"
                  </p>
                  <p className="font-body text-sm text-muted text-center mt-2">
                    — Prophet Muhammad ﷺ (Ibn Majah)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ MISSION & VALUES ══════════════════════════════ */}
        <section className="section-padding bg-surface">
          <div className="container-custom">
            <SectionTitle
              eyebrow="MISSION & VALUES"
              title="What We Stand For"
              align="center"
              className="mb-16"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Value 1 */}
              <div
                className="p-8 bg-background border border-border rounded-[var(--radius-xl)]
                              hover:shadow-lg transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-primary-soft flex items-center justify-center mb-4">
                  <BookOpen size={28} className="text-primary" />
                </div>
                <h3 className="font-display text-xl font-normal text-ink mb-3">
                  Authentic Knowledge
                </h3>
                <p className="font-body text-base text-soft leading-relaxed">
                  Every piece of content is verified by qualified scholars. We
                  source from classical texts and authentic hadith collections.
                </p>
              </div>

              {/* Value 2 */}
              <div
                className="p-8 bg-background border border-border rounded-[var(--radius-xl)]
                              hover:shadow-lg transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-accent-soft flex items-center justify-center mb-4">
                  <Globe size={28} className="text-accent" />
                </div>
                <h3 className="font-display text-xl font-normal text-ink mb-3">
                  Accessible to All
                </h3>
                <p className="font-body text-base text-soft leading-relaxed">
                  Free, multilingual resources available to anyone with an
                  internet connection. Knowledge should never be behind a
                  paywall.
                </p>
              </div>

              {/* Value 3 */}
              <div
                className="p-8 bg-background border border-border rounded-[var(--radius-xl)]
                              hover:shadow-lg transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-success-soft flex items-center justify-center mb-4">
                  <Users size={28} className="text-success" />
                </div>
                <h3 className="font-display text-xl font-normal text-ink mb-3">
                  Community Driven
                </h3>
                <p className="font-body text-base text-soft leading-relaxed">
                  Built with input from students, teachers, and scholars
                  worldwide. We listen and adapt to serve you better.
                </p>
              </div>

              {/* Value 4 */}
              <div
                className="p-8 bg-background border border-border rounded-[var(--radius-xl)]
                              hover:shadow-lg transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-warning-soft flex items-center justify-center mb-4">
                  <Heart size={28} className="text-warning" />
                </div>
                <h3 className="font-display text-xl font-normal text-ink mb-3">
                  Easy to Understand
                </h3>
                <p className="font-body text-base text-soft leading-relaxed">
                  Complex topics broken down into clear, digestible lessons. No
                  jargon, just straightforward explanations.
                </p>
              </div>

              {/* Value 5 */}
              <div
                className="p-8 bg-background border border-border rounded-[var(--radius-xl)]
                              hover:shadow-lg transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-primary-soft flex items-center justify-center mb-4">
                  <Target size={28} className="text-primary" />
                </div>
                <h3 className="font-display text-xl font-normal text-ink mb-3">
                  Practical Application
                </h3>
                <p className="font-body text-base text-soft leading-relaxed">
                  Learn not just theory, but how to apply Islamic teachings in
                  daily life. Knowledge that transforms.
                </p>
              </div>

              {/* Value 6 */}
              <div
                className="p-8 bg-background border border-border rounded-[var(--radius-xl)]
                              hover:shadow-lg transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-accent-soft flex items-center justify-center mb-4">
                  <Award size={28} className="text-accent" />
                </div>
                <h3 className="font-display text-xl font-normal text-ink mb-3">
                  Scholarly Excellence
                </h3>
                <p className="font-body text-base text-soft leading-relaxed">
                  Content reviewed by qualified ulema trained in traditional
                  Islamic sciences and modern pedagogy.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ══ WHAT WE OFFER ═════════════════════════════════ */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <SectionTitle
                eyebrow="COMPREHENSIVE RESOURCES"
                title="What You'll Find on NurPath"
                align="center"
                className="mb-12"
              />

              <div className="space-y-6">
                <div className="p-6 bg-card border border-border rounded-[var(--radius-lg)]">
                  <h3 className="font-display text-lg font-normal text-ink mb-2">
                    📚 Authentic Islamic Books
                  </h3>
                  <p className="font-body text-base text-soft leading-relaxed">
                    Access classical texts and contemporary works in multiple
                    languages. Read online or download PDFs.
                  </p>
                </div>

                <div className="p-6 bg-card border border-border rounded-[var(--radius-lg)]">
                  <h3 className="font-display text-lg font-normal text-ink mb-2">
                    📖 Quran with Tafsir
                  </h3>
                  <p className="font-body text-base text-soft leading-relaxed">
                    Read the Quran with word-by-word translation and detailed
                    tafsir from renowned scholars like Ibn Kathir.
                  </p>
                </div>

                <div className="p-6 bg-card border border-border rounded-[var(--radius-lg)]">
                  <h3 className="font-display text-lg font-normal text-ink mb-2">
                    📿 Hadith Collections
                  </h3>
                  <p className="font-body text-base text-soft leading-relaxed">
                    Search through authentic hadith from the six major
                    collections, with grades and explanations.
                  </p>
                </div>

                <div className="p-6 bg-card border border-border rounded-[var(--radius-lg)]">
                  <h3 className="font-display text-lg font-normal text-ink mb-2">
                    ⚖️ Fiqh (Islamic Jurisprudence)
                  </h3>
                  <p className="font-body text-base text-soft leading-relaxed">
                    Practical rulings on worship, transactions, and daily life
                    from all four madhabs with evidence.
                  </p>
                </div>

                <div className="p-6 bg-card border border-border rounded-[var(--radius-lg)]">
                  <h3 className="font-display text-lg font-normal text-ink mb-2">
                    📝 Educational Articles
                  </h3>
                  <p className="font-body text-base text-soft leading-relaxed">
                    In-depth articles on Islamic history, theology,
                    spirituality, and contemporary issues.
                  </p>
                </div>

                <div className="p-6 bg-card border border-border rounded-[var(--radius-lg)]">
                  <h3 className="font-display text-lg font-normal text-ink mb-2">
                    🎥 Video Lectures
                  </h3>
                  <p className="font-body text-base text-soft leading-relaxed">
                    Watch lectures from renowned scholars on various Islamic
                    topics, from basics to advanced studies.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ TEAM SECTION ══════════════════════════════════ */}
        <section className="section-padding bg-surface">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <SectionTitle
                eyebrow="OUR TEAM"
                title="Built by Muslims, For Muslims"
                align="center"
                className="mb-8"
              />

              <p className="font-body text-lg text-soft leading-relaxed mb-8">
                NurPath is developed and maintained by a dedicated team of
                Muslim developers, designers, and scholars. We're united by a
                common goal: making Islamic knowledge accessible to everyone.
              </p>

              <p className="font-body text-base text-soft leading-relaxed">
                Our content is reviewed by qualified scholars from Al-Azhar,
                Darul Uloom, and other respected institutions. We believe in
                combining traditional scholarship with modern delivery methods.
              </p>
            </div>
          </div>
        </section>

        {/* ══ CTA SECTION ═══════════════════════════════════ */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-display text-3xl sm:text-4xl font-normal text-ink mb-6">
                Join Us on This Journey
              </h2>
              <p className="font-body text-lg text-soft leading-relaxed mb-8">
                Whether you're a student, teacher, or scholar, you're part of
                the NurPath community. Together, we're building the future of
                Islamic education.
              </p>
              <div className="flex items-center justify-center gap-4 flex-wrap">
                <a href="/contact" className="btn-primary">
                  Get in Touch
                </a>
                <a href="/" className="btn-secondary">
                  Start Learning
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AboutPage;
