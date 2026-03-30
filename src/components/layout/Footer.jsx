// // src/components/layout/Footer.jsx
// // ============================================================
// // Footer — NurPath Layout Component
// //
// // Color: deep ink charcoal — works beautifully in both modes
// // Uses inline CSS vars so it stays dark regardless of theme
// //
// // Sections:
// //   • Bismillah banner (Arabic + translation)
// //   • Brand column (logo, tagline, Quran verse)
// //   • Explore links
// //   • Learn links
// //   • Contact info + social icons
// //   • Copyright bar
// //
// // All data imported from /data/ — nothing hardcoded here
// // ============================================================

// import { Link } from "react-router-dom";
// import { Mail, Phone, MapPin } from "lucide-react";
// import { cn } from "../../utils/cn";

// // ── Data ──────────────────────────────────────────────────────
// import { SITE_CONFIG } from "../../data/site";
// import { FOOTER_LINKS } from "../../data/navigation";
// import { SOCIAL_LINKS } from "../../data/social";

// // ── Footer color tokens ───────────────────────────────────────
// // Footer stays dark in BOTH light and dark mode.
// // Using hardcoded values here so it never accidentally goes light.
// const F = {
//   bg: "#13110e", // deep ink — footer background
//   surface: "#1a1814", // slightly lighter — used for copyright bar
//   border: "#2c2820", // subtle warm separator
//   textMain: "#c8bfaa", // warm tan — body text
//   textMuted: "#6b6355", // muted warm — secondary info
//   textHead: "#8a7e6e", // column headings (uppercase labels)
//   textWhite: "#f1ede6", // near-white — logo name, important text
// };

// const Footer = () => {
//   const year = new Date().getFullYear();

//   return (
//     <footer
//       style={{ backgroundColor: F.bg, color: F.textMain }}
//       role="contentinfo"
//       aria-label="Site footer"
//     >
//       {/* ══ MAIN BODY ════════════════════════════════════════ */}
//       <div className="container-custom py-14">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
//           {/* ── Column 1 — Brand ─────────────────────────── */}
//           <div className="lg:col-span-1">
//             {/* Logo mark */}
//             <Link
//               to="/"
//               aria-label="NurPath — go to homepage"
//               className="flex items-center gap-2.5 mb-4 w-fit group"
//             >
//               <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center shrink-0">
//                 <span className="text-primary font-display font-bold text-base leading-none">
//                   ن
//                 </span>
//               </div>
//               <div>
//                 <p
//                   className="font-display font-bold text-lg leading-none"
//                   style={{ color: F.textWhite }}
//                 >
//                   {SITE_CONFIG.name}
//                 </p>
//                 <p className="font-arabic-ui text-xs text-accent leading-none mt-0.5">
//                   {SITE_CONFIG.nameArabic}
//                 </p>
//               </div>
//             </Link>

//             {/* Tagline / description */}
//             <p
//               className="font-body text-sm leading-relaxed mb-6 max-w-xs"
//               style={{ color: F.textMain }}
//             >
//               {SITE_CONFIG.description}
//             </p>

//             {/* Quran verse — decorative */}
//             <div
//               className="pl-4"
//               style={{ borderLeft: `2px solid var(--color-accent)` }}
//             >
//               <p className="font-arabic text-accent/80  leading-loose text-right">
//                 يَرْفَعِ اللَّهُ الَّذِينَ آمَنُوا وَالَّذِينَ أُوتُوا الْعِلْمَ
//                 دَرَجَاتٍ
//               </p>
//               <p
//                 className="font-body text-xs mt-1"
//                 style={{ color: F.textMuted }}
//               >
//                 Al-Mujadila 58:11
//               </p>
//             </div>
//           </div>

//           {/* ── Column 2 — Explore ───────────────────────── */}
//           <div>
//             <h3
//               className="font-body text-xs font-bold uppercase tracking-widest mb-5"
//               style={{ color: F.textHead }}
//             >
//               Explore
//             </h3>
//             <ul className="space-y-3">
//               {FOOTER_LINKS.explore.map((item) => (
//                 <li key={item.path}>
//                   <Link
//                     to={item.path}
//                     className="font-body text-sm flex items-center gap-2 transition-colors duration-200 hover:text-accent"
//                     style={{ color: F.textMain }}
//                   >
//                     {item.icon && (
//                       <span
//                         className="text-accent/50 text-xs"
//                         aria-hidden="true"
//                       >
//                         {item.icon}
//                       </span>
//                     )}
//                     {item.label}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* ── Column 3 — Learn ─────────────────────────── */}
//           <div>
//             <h3
//               className="font-body text-xs font-bold uppercase tracking-widest mb-5"
//               style={{ color: F.textHead }}
//             >
//               Learn
//             </h3>
//             <ul className="space-y-3">
//               {FOOTER_LINKS.learn.map((item) => (
//                 <li key={item.path}>
//                   <Link
//                     to={item.path}
//                     className="font-body text-sm transition-colors duration-200 hover:text-accent"
//                     style={{ color: F.textMain }}
//                   >
//                     {item.label}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* ── Column 4 — Contact ───────────────────────── */}
//           <div>
//             <h3
//               className="font-body text-xs font-bold uppercase tracking-widest mb-5"
//               style={{ color: F.textHead }}
//             >
//               Contact
//             </h3>

//             <ul className="space-y-3">
//               {/* Email */}
//               <li>
//                 <a
//                   href={`mailto:${SITE_CONFIG.email}`}
//                   className="flex items-start gap-3 transition-colors duration-200 hover:text-accent group"
//                   style={{ color: F.textMain }}
//                 >
//                   <Mail
//                     size={15}
//                     aria-hidden="true"
//                     className="shrink-0 mt-0.5 text-accent/50 group-hover:text-accent transition-colors"
//                   />
//                   <span className="font-body text-sm">{SITE_CONFIG.email}</span>
//                 </a>
//               </li>

//               {/* Phone */}
//               <li>
//                 <a
//                   href={`tel:${SITE_CONFIG.phone}`}
//                   className="flex items-start gap-3 transition-colors duration-200 hover:text-accent group"
//                   style={{ color: F.textMain }}
//                 >
//                   <Phone
//                     size={15}
//                     aria-hidden="true"
//                     className="shrink-0 mt-0.5 text-accent/50 group-hover:text-accent transition-colors"
//                   />
//                   <span className="font-body text-sm">{SITE_CONFIG.phone}</span>
//                 </a>
//               </li>

//               {/* Address */}
//               <li>
//                 <div
//                   className="flex items-start gap-3"
//                   style={{ color: F.textMain }}
//                 >
//                   <MapPin
//                     size={15}
//                     aria-hidden="true"
//                     className="shrink-0 mt-0.5 text-accent/50"
//                   />
//                   <span className="font-body text-sm leading-relaxed">
//                     {SITE_CONFIG.address}
//                   </span>
//                 </div>
//               </li>
//             </ul>

//             {/* Social icons — only shown when SOCIAL_LINKS has items */}
//             {SOCIAL_LINKS.length > 0 && (
//               <div className="flex items-center gap-2 mt-6">
//                 {SOCIAL_LINKS.map((social) => (
//                   <a
//                     key={social.label}
//                     href={social.url}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     aria-label={social.label}
//                     className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 hover:bg-accent hover:text-primary"
//                     style={{
//                       backgroundColor: F.border,
//                       color: F.textMain,
//                     }}
//                   >
//                     <span className="text-sm" aria-hidden="true">
//                       {social.icon}
//                     </span>
//                   </a>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* ══ COPYRIGHT BAR ════════════════════════════════════ */}
//       <div
//         style={{
//           borderTop: `1px solid ${F.border}`,
//           backgroundColor: F.surface,
//         }}
//       >
//         <div className="container-custom py-4">
//           <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
//             <p
//               className="font-body text-xs text-center sm:text-left"
//               style={{ color: F.textMuted }}
//             >
//               © {year} {SITE_CONFIG.name}. All rights reserved.
//             </p>

//             <p className="font-arabic text-sm text-accent/50">
//               جزاكم الله خيراً
//             </p>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

// src/components/layout/Footer.jsx
// ============================================================
// Footer — NurPath Layout Component (Dark Mode Enhanced)
// ============================================================

import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import { cn } from "../../utils/cn";

// ── Data ──────────────────────────────────────────────────────
import { SITE_CONFIG } from "../../data/site";
import { FOOTER_LINKS } from "../../data/navigation";
import { SOCIAL_LINKS } from "../../data/social";

// ── Footer color tokens ───────────────────────────────────────
// Uses your custom colors, plus subtle gradients and highlights
const F = {
  bg: "#13110e", // deep ink — footer background
  gradient: "linear-gradient(135deg, #1a1814 0%, #0f0d0b 100%)", // subtle gradient
  surface: "#1c1a17", // slightly lighter for copyright bar
  border: "#2c2820", // subtle warm separator
  textMain: "#c8bfaa", // warm tan — body text
  textMuted: "#6b6355", // muted warm — secondary info
  textHead: "#f1ede6", // headings brighter
  textWhite: "#f8f5f0", // near-white — logo name
  accent: "#d6c69f", // subtle glow accent for hover
};

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: F.gradient,
        color: F.textMain,
        boxShadow: "inset 0 1px 3px rgba(0,0,0,0.2)",
      }}
      role="contentinfo"
      aria-label="Site footer"
    >
      {/* ══ MAIN BODY ════════════════════════════════════════ */}
      <div className="container-custom py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* ── Column 1 — Brand ─────────────────────────── */}
          <div className="lg:col-span-1">
            <Link
              to="/"
              aria-label="NurPath — go to homepage"
              className="flex items-center gap-2.5 mb-4 w-fit group"
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                style={{
                  backgroundColor: F.accent,
                  boxShadow: "0 0 6px rgba(214,198,159,0.5)",
                }}
              >
                <span
                  className="text-primary font-display font-bold text-base leading-none"
                  style={{ color: F.textWhite }}
                >
                  ن
                </span>
              </div>
              <div>
                <p
                  className="font-display font-bold text-lg leading-none"
                  style={{ color: F.textWhite }}
                >
                  {SITE_CONFIG.name}
                </p>
                <p className="font-arabic-ui text-xs text-accent leading-none mt-0.5">
                  {SITE_CONFIG.nameArabic}
                </p>
              </div>
            </Link>

            <p
              className="font-body text-sm leading-relaxed mb-6 max-w-xs"
              style={{ color: F.textMain }}
            >
              {SITE_CONFIG.description}
            </p>

            {/* Quran verse */}
            <div
              className="pl-4"
              style={{
                borderLeft: `2px solid ${F.accent}`,
              }}
            >
              <p
                className="font-arabic text-accent/80 leading-loose text-right"
                style={{ textShadow: "0 0 2px rgba(248,245,240,0.5)" }}
              >
                يَرْفَعِ اللَّهُ الَّذِينَ آمَنُوا وَالَّذِينَ أُوتُوا الْعِلْمَ
                دَرَجَاتٍ
              </p>
              <p
                className="font-body text-xs mt-1"
                style={{ color: F.textMuted }}
              >
                Al-Mujadila 58:11
              </p>
            </div>
          </div>

          {/* ── Column 2 — Explore ───────────────────────── */}
          <div>
            <h3
              className="font-body text-xs font-bold uppercase tracking-widest mb-5"
              style={{ color: F.textHead }}
            >
              Explore
            </h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.explore.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={cn(
                      "font-body text-sm flex items-center gap-2 transition-colors duration-200 hover:text-accent hover:underline",
                    )}
                    style={{ color: F.textMain }}
                  >
                    {item.icon && (
                      <span
                        className="text-accent/50 text-xs"
                        aria-hidden="true"
                      >
                        {item.icon}
                      </span>
                    )}
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Column 3 — Learn ─────────────────────────── */}
          <div>
            <h3
              className="font-body text-xs font-bold uppercase tracking-widest mb-5"
              style={{ color: F.textHead }}
            >
              Learn
            </h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.learn.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="font-body text-sm transition-colors duration-200 hover:text-accent hover:underline"
                    style={{ color: F.textMain }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Column 4 — Contact ───────────────────────── */}
          <div>
            <h3
              className="font-body text-xs font-bold uppercase tracking-widest mb-5"
              style={{ color: F.textHead }}
            >
              Contact
            </h3>

            <ul className="space-y-3">
              {/* Email */}
              <li>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="flex items-start gap-3 transition-colors duration-200 hover:text-accent group"
                  style={{ color: F.textMain }}
                >
                  <Mail
                    size={15}
                    aria-hidden="true"
                    className="shrink-0 mt-0.5 text-accent/50 group-hover:text-accent transition-colors"
                  />
                  <span className="font-body text-sm">{SITE_CONFIG.email}</span>
                </a>
              </li>

              {/* Phone */}
              <li>
                <a
                  href={`tel:${SITE_CONFIG.phone}`}
                  className="flex items-start gap-3 transition-colors duration-200 hover:text-accent group"
                  style={{ color: F.textMain }}
                >
                  <Phone
                    size={15}
                    aria-hidden="true"
                    className="shrink-0 mt-0.5 text-accent/50 group-hover:text-accent transition-colors"
                  />
                  <span className="font-body text-sm">{SITE_CONFIG.phone}</span>
                </a>
              </li>

              {/* Address */}
              <li>
                <div
                  className="flex items-start gap-3"
                  style={{ color: F.textMain }}
                >
                  <MapPin
                    size={15}
                    aria-hidden="true"
                    className="shrink-0 mt-0.5 text-accent/50"
                  />
                  <span className="font-body text-sm leading-relaxed">
                    {SITE_CONFIG.address}
                  </span>
                </div>
              </li>
            </ul>

            {/* Social icons */}
            {SOCIAL_LINKS.length > 0 && (
              <div className="flex items-center gap-2 mt-6">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
                    style={{
                      backgroundColor: F.border,
                      color: F.textMain,
                    }}
                  >
                    <span className="text-sm" aria-hidden="true">
                      {social.icon}
                    </span>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ══ COPYRIGHT BAR ════════════════════════════════════ */}
      <div
        style={{
          borderTop: `1px solid ${F.border}`,
          backgroundColor: F.surface,
          boxShadow: "0 -2px 6px rgba(0,0,0,0.4)",
        }}
      >
        <div className="container-custom py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p
              className="font-body text-xs text-center sm:text-left"
              style={{ color: F.textMuted }}
            >
              © {year} {SITE_CONFIG.name}. All rights reserved.
            </p>

            <p
              className="font-arabic text-sm text-accent/60"
              style={{ textShadow: "0 0 2px rgba(248,245,240,0.4)" }}
            >
              جزاكم الله خيراً
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
