// src/pages/Contact/ContactPage.jsx
// ============================================================
// ContactPage — NurPath
//
// Static contact page with:
//   - Contact form (email via mailto for now)
//   - Contact info cards
//   - Social links
//   - Map/address section
// ============================================================

import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { cn } from "../../utils/cn";
import SectionTitle from "../../components/sections/SectionTitle";
import { SITE_CONFIG } from "../../data/site";
import { SOCIAL_LINKS } from "../../data/social";

// ============================================================
// ContactPage
// ============================================================
const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Create mailto link with form data
    const mailtoLink = `mailto:${SITE_CONFIG.email}?subject=${encodeURIComponent(
      formData.subject || "Contact from NurPath",
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`,
    )}`;
    window.location.href = mailtoLink;
  };

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-primary">
        <div className="container-custom text-center">
          <h1 className="heading-xl text-snow mb-4">Get in Touch</h1>
          <p className="font-body text-lg text-snow/70 max-w-2xl mx-auto">
            Have questions, feedback, or want to contribute? We'd love to hear
            from you.
          </p>
        </div>
      </section>

      <div className="bg-background">
        <div className="container-custom py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* ── Contact form ──────────────────────────────── */}
            <div className="lg:col-span-2">
              <div className="card p-6 sm:p-8">
                <h2 className="font-display text-2xl font-normal text-ink mb-6">
                  Send Us a Message
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block font-body text-sm font-medium text-ink mb-2"
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="input"
                      placeholder="Ahmed Abdullah"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block font-body text-sm font-medium text-ink mb-2"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="input"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label
                      htmlFor="subject"
                      className="block font-body text-sm font-medium text-ink mb-2"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="input"
                      placeholder="How can we help?"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block font-body text-sm font-medium text-ink mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="input resize-none"
                      placeholder="Tell us what's on your mind..."
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="btn-primary inline-flex items-center gap-2"
                  >
                    <Send size={16} />
                    Send Message
                  </button>
                </form>

                <p className="font-body text-xs text-muted mt-4">
                  By submitting this form, your default email client will open
                  with the message pre-filled.
                </p>
              </div>
            </div>

            {/* ── Contact info sidebar ──────────────────────── */}
            <div className="space-y-6">
              {/* Email */}
              <div className="card p-5">
                <div className="flex items-start gap-3">
                  <div
                    className="w-10 h-10 rounded-lg bg-primary-soft border border-primary/10
                                  flex items-center justify-center shrink-0"
                  >
                    <Mail
                      size={18}
                      className="text-primary"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <p
                      className="font-body text-xs font-semibold text-muted uppercase
                                  tracking-wider mb-1"
                    >
                      Email
                    </p>
                    <a
                      href={`mailto:${SITE_CONFIG.email}`}
                      className="font-body text-sm text-ink hover:text-primary transition-colors"
                    >
                      {SITE_CONFIG.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="card p-5">
                <div className="flex items-start gap-3">
                  <div
                    className="w-10 h-10 rounded-lg bg-primary-soft border border-primary/10
                                  flex items-center justify-center shrink-0"
                  >
                    <Phone
                      size={18}
                      className="text-primary"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <p
                      className="font-body text-xs font-semibold text-muted uppercase
                                  tracking-wider mb-1"
                    >
                      Phone
                    </p>
                    <a
                      href={`tel:${SITE_CONFIG.phone}`}
                      className="font-body text-sm text-ink hover:text-primary transition-colors"
                    >
                      {SITE_CONFIG.phone}
                    </a>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="card p-5">
                <div className="flex items-start gap-3">
                  <div
                    className="w-10 h-10 rounded-lg bg-primary-soft border border-primary/10
                                  flex items-center justify-center shrink-0"
                  >
                    <MapPin
                      size={18}
                      className="text-primary"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <p
                      className="font-body text-xs font-semibold text-muted uppercase
                                  tracking-wider mb-1"
                    >
                      Location
                    </p>
                    <p className="font-body text-sm text-ink leading-relaxed">
                      {SITE_CONFIG.address}
                    </p>
                  </div>
                </div>
              </div>

              {/* Social links */}
              {SOCIAL_LINKS.length > 0 && (
                <div className="card p-5">
                  <p
                    className="font-body text-xs font-semibold text-muted uppercase
                                tracking-wider mb-3"
                  >
                    Follow Us
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {SOCIAL_LINKS.map((social) => (
                      <a
                        key={social.label}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        className="w-9 h-9 rounded-lg bg-primary-soft border border-primary/10
                                   flex items-center justify-center text-primary
                                   hover:bg-primary hover:text-snow hover:border-primary
                                   transition-all duration-200"
                      >
                        <span className="text-sm" aria-hidden="true">
                          {social.icon}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Office hours */}
              <div className="card p-5 bg-accent-soft border-accent/20">
                <p
                  className="font-body text-xs font-semibold text-accent-dark uppercase
                              tracking-wider mb-3"
                >
                  Office Hours
                </p>
                <div className="space-y-2 font-body text-sm text-soft">
                  <p>Saturday - Thursday: 9:00 AM - 5:00 PM</p>
                  <p>Friday: Closed</p>
                  <p className="text-xs text-muted mt-2">
                    Afghanistan Time (UTC+4:30)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
