// src/components/ui/Breadcrumb.jsx
// ============================================================
// Breadcrumb — NurPath UI Primitive
//
// WHAT IT IS:
//   A horizontal trail of links showing where the user is
//   in the site hierarchy. e.g: Home › Books › Sahih al-Bukhari
//
// WHY WE NEED IT:
//   On detail pages (BookDetailPage, ArticleDetailPage), users
//   need to know where they came from and be able to go back
//   without using the browser's back button. Also helps with
//   SEO as search engines use breadcrumbs for site structure.
//
// WHERE IT'S USED:
//   - BookDetailPage   → Home › Books › [Book Title]
//   - ArticleDetailPage → Home › Articles › [Article Title]
//   - FiqhPage         → Home › Islamic Sciences › Fiqh
//   - HadithPage       → Home › Hadith
//
// Usage:
//   <Breadcrumb
//     items={[
//       { label: "Home", href: "/" },
//       { label: "Books", href: "/books" },
//       { label: "Sahih al-Bukhari" },   ← no href = current page
//     ]}
//   />
// ============================================================

import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "../../utils/cn";

// ── Breadcrumb ────────────────────────────────────────────────
/**
 * @param {Array<{ label: string, href?: string }>} items
 *   Last item = current page (no href needed)
 * @param {boolean} [showHome=true]  Prepend a Home icon link
 * @param {string}  [className]
 */
const Breadcrumb = ({ items = [], showHome = true, className }) => {
  // Build the full list — optionally prepend Home
  const crumbs = showHome
    ? [{ label: "Home", href: "/", isHome: true }, ...items]
    : items;

  return (
    <nav aria-label="Breadcrumb" className={cn("w-full", className)}>
      <ol
        className="flex items-center flex-wrap gap-1 font-body text-sm"
        role="list"
      >
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;

          return (
            <li
              key={index}
              className="flex items-center gap-1"
              aria-current={isLast ? "page" : undefined}
            >
              {/* Separator — not shown before first item */}
              {index > 0 && (
                <ChevronRight
                  size={14}
                  className="text-muted shrink-0"
                  aria-hidden="true"
                />
              )}

              {/* Current page — plain text, not a link */}
              {isLast ? (
                <span className="text-base font-medium truncate max-w-[200px]">
                  {crumb.label}
                </span>
              ) : (
                /* Ancestor pages — clickable links */
                <Link
                  to={crumb.href}
                  className={cn(
                    "flex items-center gap-1",
                    "text-muted hover:text-primary",
                    "transition-colors duration-200",
                    "focus:outline-none focus-visible:ring-2",
                    "focus-visible:ring-accent focus-visible:ring-offset-1",
                    "rounded-sm",
                  )}
                >
                  {/* Home icon for the first item */}
                  {crumb.isHome && (
                    <Home size={13} className="shrink-0" aria-hidden="true" />
                  )}
                  <span>{crumb.label}</span>
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
