// src/pages/Contact/ContactPage.jsx
// ============================================================
// ContactPage — Contact form + social links
// ============================================================

import { useState } from "react";
import {
  Mail,
  MapPin,
  Phone,
  Send,
  MessageSquare,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
} from "lucide-react";
import SectionTitle from "../../components/sections/SectionTitle";
import BismillahBanner from "../../components/sections/Bismillahbanner";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState({ type: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "loading", message: "Sending..." });

    // Simulate API call (replace with actual backend)
    setTimeout(() => {
      setStatus({
        type: "success",
        message:
          "Thank you! Your message has been sent. We'll respond within 24 hours, insha'Allah.",
      });
      setFormData({ name: "", email: "", subject: "", message: "" });

      // Clear success message after 5 seconds
      setTimeout(() => setStatus({ type: "", message: "" }), 5000);
    }, 1500);
  };

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
                Get in Touch
              </h1>
              <p className="font-body text-xl text-snow/90 leading-relaxed">
                Questions, feedback, or suggestions? We'd love to hear from you.
              </p>
            </div>
          </div>
        </section>

        {/* ══ CONTACT CONTENT ═══════════════════════════════ */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
              {/* ── LEFT COLUMN — Contact Info ────────────── */}
              <div className="lg:col-span-1 space-y-8">
                <div>
                  <h2 className="font-display text-2xl font-normal text-ink mb-6">
                    Contact Information
                  </h2>
                  <p className="font-body text-base text-soft leading-relaxed mb-8">
                    Reach out through any of the channels below. We typically
                    respond within 24 hours.
                  </p>
                </div>

                {/* Contact cards */}
                <div className="space-y-4">
                  <div
                    className="p-5 bg-surface border border-border rounded-[var(--radius-lg)]
                                  flex items-start gap-4"
                  >
                    <div
                      className="w-12 h-12 rounded-lg bg-primary-soft flex items-center 
                                    justify-center shrink-0"
                    >
                      <Mail size={20} className="text-primary" />
                    </div>
                    <div>
                      <p
                        className="font-body text-sm font-bold text-muted uppercase 
                                    tracking-wider mb-1"
                      >
                        Email
                      </p>
                      <a
                        href="mailto:info@nurpath.org"
                        className="font-body text-base text-ink hover:text-primary transition-colors"
                      >
                        info@nurpath.org
                      </a>
                    </div>
                  </div>

                  <div
                    className="p-5 bg-surface border border-border rounded-[var(--radius-lg)]
                                  flex items-start gap-4"
                  >
                    <div
                      className="w-12 h-12 rounded-lg bg-accent-soft flex items-center 
                                    justify-center shrink-0"
                    >
                      <Phone size={20} className="text-accent" />
                    </div>
                    <div>
                      <p
                        className="font-body text-sm font-bold text-muted uppercase 
                                    tracking-wider mb-1"
                      >
                        Phone
                      </p>
                      <a
                        href="tel:+93123456789"
                        className="font-body text-base text-ink hover:text-primary transition-colors"
                      >
                        +93 (123) 456-789
                      </a>
                    </div>
                  </div>

                  <div
                    className="p-5 bg-surface border border-border rounded-[var(--radius-lg)]
                                  flex items-start gap-4"
                  >
                    <div
                      className="w-12 h-12 rounded-lg bg-success-soft flex items-center 
                                    justify-center shrink-0"
                    >
                      <MapPin size={20} className="text-success" />
                    </div>
                    <div>
                      <p
                        className="font-body text-sm font-bold text-muted uppercase 
                                    tracking-wider mb-1"
                      >
                        Location
                      </p>
                      <p className="font-body text-base text-ink">
                        Kabul, Afghanistan
                      </p>
                    </div>
                  </div>
                </div>

                {/* Social Media */}
                <div>
                  <h3
                    className="font-body text-sm font-bold text-muted uppercase 
                                tracking-wider mb-4"
                  >
                    Follow Us
                  </h3>
                  <div className="flex items-center gap-3">
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 rounded-full bg-surface border border-border
                                  flex items-center justify-center text-muted
                                  hover:bg-primary hover:text-snow hover:border-primary
                                  transition-all duration-200"
                      aria-label="Facebook"
                    >
                      <Facebook size={18} />
                    </a>
                    <a
                      href="https://twitter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 rounded-full bg-surface border border-border
                                  flex items-center justify-center text-muted
                                  hover:bg-primary hover:text-snow hover:border-primary
                                  transition-all duration-200"
                      aria-label="Twitter"
                    >
                      <Twitter size={18} />
                    </a>
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 rounded-full bg-surface border border-border
                                  flex items-center justify-center text-muted
                                  hover:bg-primary hover:text-snow hover:border-primary
                                  transition-all duration-200"
                      aria-label="Instagram"
                    >
                      <Instagram size={18} />
                    </a>
                    <a
                      href="https://youtube.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 rounded-full bg-surface border border-border
                                  flex items-center justify-center text-muted
                                  hover:bg-primary hover:text-snow hover:border-primary
                                  transition-all duration-200"
                      aria-label="YouTube"
                    >
                      <Youtube size={18} />
                    </a>
                  </div>
                </div>
              </div>

              {/* ── RIGHT COLUMN — Contact Form ───────────── */}
              <div className="lg:col-span-2">
                <div className="p-8 bg-card border border-border rounded-[var(--radius-2xl)]">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                      <MessageSquare size={24} className="text-snow" />
                    </div>
                    <div>
                      <h2 className="font-display text-2xl font-normal text-ink">
                        Send us a Message
                      </h2>
                      <p className="font-body text-sm text-muted">
                        We'll get back to you within 24 hours
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name */}
                    <div>
                      <label
                        htmlFor="name"
                        className="font-body text-sm font-semibold text-ink mb-2 block"
                      >
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-background border border-border 
                                   rounded-[var(--radius-md)] font-body text-base text-ink
                                   focus:outline-none focus:ring-2 focus:ring-primary/20 
                                   focus:border-primary transition-all"
                        placeholder="Your full name"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="email"
                        className="font-body text-sm font-semibold text-ink mb-2 block"
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-background border border-border 
                                   rounded-[var(--radius-md)] font-body text-base text-ink
                                   focus:outline-none focus:ring-2 focus:ring-primary/20 
                                   focus:border-primary transition-all"
                        placeholder="your.email@example.com"
                      />
                    </div>

                    {/* Subject */}
                    <div>
                      <label
                        htmlFor="subject"
                        className="font-body text-sm font-semibold text-ink mb-2 block"
                      >
                        Subject *
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-background border border-border 
                                   rounded-[var(--radius-md)] font-body text-base text-ink
                                   focus:outline-none focus:ring-2 focus:ring-primary/20 
                                   focus:border-primary transition-all"
                        placeholder="What is this about?"
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label
                        htmlFor="message"
                        className="font-body text-sm font-semibold text-ink mb-2 block"
                      >
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3 bg-background border border-border 
                                   rounded-[var(--radius-md)] font-body text-base text-ink
                                   focus:outline-none focus:ring-2 focus:ring-primary/20 
                                   focus:border-primary transition-all resize-none"
                        placeholder="Tell us more..."
                      />
                    </div>

                    {/* Status Message */}
                    {status.message && (
                      <div
                        className={`p-4 rounded-[var(--radius-lg)] ${
                          status.type === "success"
                            ? "bg-success-soft border border-success/20 text-success"
                            : status.type === "error"
                              ? "bg-error-soft border border-error/20 text-error"
                              : "bg-primary-soft border border-primary/20 text-primary"
                        }`}
                      >
                        <p className="font-body text-sm">{status.message}</p>
                      </div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={status.type === "loading"}
                      className="btn-primary w-full justify-center disabled:opacity-50 
                                 disabled:cursor-not-allowed"
                    >
                      {status.type === "loading" ? (
                        <>
                          <div
                            className="w-4 h-4 border-2 border-snow border-t-transparent 
                                        rounded-full animate-spin"
                          />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send size={16} />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ FAQ SECTION ═══════════════════════════════════ */}
        <section className="section-padding bg-surface">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto">
              <SectionTitle
                eyebrow="COMMON QUESTIONS"
                title="Before You Reach Out"
                align="center"
                className="mb-12"
              />

              <div className="space-y-4">
                <details className="p-6 bg-background border border-border rounded-[var(--radius-lg)] group">
                  <summary
                    className="font-body text-base font-semibold text-ink cursor-pointer 
                                      flex items-center justify-between"
                  >
                    How can I contribute content to NurPath?
                    <span className="text-muted group-open:rotate-180 transition-transform">
                      ▼
                    </span>
                  </summary>
                  <p className="font-body text-base text-soft leading-relaxed mt-4">
                    We welcome contributions from qualified scholars and
                    educators. Please email us at contributions@nurpath.org with
                    your credentials and proposed content.
                  </p>
                </details>

                <details className="p-6 bg-background border border-border rounded-[var(--radius-lg)] group">
                  <summary
                    className="font-body text-base font-semibold text-ink cursor-pointer 
                                      flex items-center justify-between"
                  >
                    Is NurPath really free?
                    <span className="text-muted group-open:rotate-180 transition-transform">
                      ▼
                    </span>
                  </summary>
                  <p className="font-body text-base text-soft leading-relaxed mt-4">
                    Yes! All our resources are completely free. We believe
                    Islamic knowledge should never be behind a paywall. We're
                    supported by donations from the Muslim community.
                  </p>
                </details>

                <details className="p-6 bg-background border border-border rounded-[var(--radius-lg)] group">
                  <summary
                    className="font-body text-base font-semibold text-ink cursor-pointer 
                                      flex items-center justify-between"
                  >
                    Can I request specific topics or books?
                    <span className="text-muted group-open:rotate-180 transition-transform">
                      ▼
                    </span>
                  </summary>
                  <p className="font-body text-base text-soft leading-relaxed mt-4">
                    Absolutely! Use the contact form above to suggest topics,
                    books, or features you'd like to see. We prioritize content
                    based on community requests.
                  </p>
                </details>

                <details className="p-6 bg-background border border-border rounded-[var(--radius-lg)] group">
                  <summary
                    className="font-body text-base font-semibold text-ink cursor-pointer 
                                      flex items-center justify-between"
                  >
                    How do I report an error?
                    <span className="text-muted group-open:rotate-180 transition-transform">
                      ▼
                    </span>
                  </summary>
                  <p className="font-body text-base text-soft leading-relaxed mt-4">
                    If you find any errors in our content, please email us
                    immediately at corrections@nurpath.org with the page link
                    and description of the error. We take accuracy very
                    seriously.
                  </p>
                </details>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ContactPage;
