// src/pages/Books/BookDetailPage.jsx
// ============================================================
// BookDetailPage — NurPath
//
// Full book details with Read + Download buttons
// Route: /books/:id
// ============================================================

import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  ChevronLeft,
  Download,
  BookOpen,
  Star,
  Eye,
  Globe,
} from "lucide-react";

import { booksService } from "../../services/books.service";
import { queryKeys } from "../../services/querykeys";
import Badge from "../../components/ui/Badge";
import { cn } from "../../utils/cn";

const BookDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryKey: queryKeys.books.detail(id),
    queryFn: () => booksService.getById(id),
  });

  const book = data?.data;

  if (isLoading) {
    return (
      <div className="bg-background min-h-screen">
        <div className="container-custom py-12">
          <div className="skeleton h-96 rounded-[var(--radius-xl)]" />
        </div>
      </div>
    );
  }

  if (isError || !book) {
    return (
      <div className="bg-background min-h-screen">
        <div className="container-custom py-12 text-center">
          <p className="text-body text-error mb-4">Book not found</p>
          <button onClick={() => navigate("/books")} className="btn-secondary">
            Back to Library
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      <div className="container-custom py-12">
        {/* Back button */}
        <button onClick={() => navigate("/books")} className="btn-ghost mb-8">
          <ChevronLeft size={16} /> Back to Library
        </button>

        {/* Book detail grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT — Cover + Actions */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              {/* Cover */}
              <img
                src={book.coverImage}
                alt={book.title}
                className="w-full aspect-[3/4] object-cover rounded-[var(--radius-xl)]
                           shadow-[var(--shadow-lg)] mb-6"
              />

              {/* Action buttons */}
              <div className="space-y-3">
                <Link
                  to={`/books/${id}/read`}
                  className="btn-primary w-full justify-center"
                >
                  <BookOpen size={18} /> Read Online
                </Link>
                <a
                  href={book.files?.arabic?.pdfUrl || "#"}
                  download
                  className="btn-secondary w-full justify-center"
                >
                  <Download size={18} /> Download PDF
                </a>
              </div>

              {/* Stats */}
              <div className="mt-6 p-4 bg-surface border border-border rounded-[var(--radius-lg)]">
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted">Downloads</span>
                    <span className="font-semibold text-ink">
                      {book.downloadCount?.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted">Views</span>
                    <span className="font-semibold text-ink">
                      {book.viewCount?.toLocaleString()}
                    </span>
                  </div>
                  {book.rating && (
                    <div className="flex items-center justify-between">
                      <span className="text-muted">Rating</span>
                      <span className="font-semibold text-ink flex items-center gap-1">
                        <Star size={14} className="text-accent fill-accent" />
                        {book.rating} ({book.reviewCount})
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title + Category */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="primary">{book.category}</Badge>
                {book.verified && <Badge variant="success">✓ Verified</Badge>}
                {book.featured && <Badge variant="accent">★ Featured</Badge>}
              </div>

              {book.titleArabic && (
                <p
                  className="font-arabic text-2xl text-accent mb-2"
                  dir="rtl"
                  lang="ar"
                >
                  {book.titleArabic}
                </p>
              )}

              <h1 className="heading-lg mb-2">{book.title}</h1>

              <p className="text-body text-soft">
                by <span className="font-semibold text-ink">{book.author}</span>
              </p>
            </div>

            {/* Description */}
            <div>
              <h2 className="font-body text-sm font-bold text-muted uppercase tracking-widest mb-3">
                Description
              </h2>
              <p className="text-body leading-relaxed">{book.description}</p>
            </div>

            {/* Author Bio */}
            {book.authorBio && (
              <div>
                <h2 className="font-body text-sm font-bold text-muted uppercase tracking-widest mb-3">
                  About the Author
                </h2>
                <p className="text-body leading-relaxed">{book.authorBio}</p>
              </div>
            )}

            {/* Details */}
            <div>
              <h2 className="font-body text-sm font-bold text-muted uppercase tracking-widest mb-3">
                Details
              </h2>
              <dl className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <dt className="text-muted">Pages</dt>
                  <dd className="font-semibold text-ink">{book.pages}</dd>
                </div>
                <div>
                  <dt className="text-muted">Published</dt>
                  <dd className="font-semibold text-ink">
                    {book.publishedYear}
                  </dd>
                </div>
                {book.publisher && (
                  <div className="col-span-2">
                    <dt className="text-muted">Publisher</dt>
                    <dd className="font-semibold text-ink">{book.publisher}</dd>
                  </div>
                )}
              </dl>
            </div>

            {/* Available Languages */}
            <div>
              <h2 className="font-body text-sm font-bold text-muted uppercase tracking-widest mb-3">
                Available Languages
              </h2>
              <div className="flex flex-wrap gap-2">
                {book.languages.map((lang) => {
                  const file = book.files?.[lang];
                  return (
                    <div
                      key={lang}
                      className="flex items-center gap-2 px-3 py-2 bg-surface
                                 border border-border rounded-[var(--radius-md)]"
                    >
                      <Globe size={14} className="text-accent" />
                      <span className="font-body text-sm font-medium text-ink capitalize">
                        {lang}
                      </span>
                      {file?.size && (
                        <span className="font-body text-xs text-muted">
                          ({file.size})
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Tags */}
            {book.tags?.length > 0 && (
              <div>
                <h2 className="font-body text-sm font-bold text-muted uppercase tracking-widest mb-3">
                  Tags
                </h2>
                <div className="flex flex-wrap gap-2">
                  {book.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-body text-xs px-3 py-1 bg-primary-soft text-primary
                                 border border-primary/10 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailPage;
