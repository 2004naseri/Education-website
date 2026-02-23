// src/pages/Books/BookReaderPage.jsx
// ============================================================
// BookReaderPage — NurPath
// Fullscreen PDF viewer (no AppLayout wrapper)
// Route: /books/:id/read
// ============================================================

import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, Download, ExternalLink } from "lucide-react";

import { booksService } from "../../services/books.service";
import { queryKeys } from "../../services/querykeys";

const BookReaderPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryKey: queryKeys.books.detail(id),
    queryFn: () => booksService.getById(id),
  });

  const book = data?.data;
  const pdfUrl = book?.files?.arabic?.pdfUrl || book?.files?.english?.pdfUrl;

  // ── Loading state ─────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background">
        <div className="loader" aria-label="Loading book" />
      </div>
    );
  }

  // ── Error state ───────────────────────────────────────────
  if (isError || !book || !pdfUrl) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-body text-error mb-4">
            {!pdfUrl ? "PDF not available for this book" : "Book not found"}
          </p>
          <button
            onClick={() => navigate(`/books/${id}`)}
            className="btn-secondary"
          >
            <ChevronLeft size={16} /> Back to Book Details
          </button>
        </div>
      </div>
    );
  }

  // ── Reader UI ─────────────────────────────────────────────
  return (
    <div className="fixed inset-0 flex flex-col bg-background">
      {/* Top toolbar */}
      <header
        className="shrink-0 h-14 border-b border-border bg-surface
                         flex items-center justify-between px-4 gap-4"
      >
        {/* Back button */}
        <button
          onClick={() => navigate(`/books/${id}`)}
          className="btn-ghost shrink-0"
          aria-label="Back to book details"
        >
          <ChevronLeft size={16} />
          <span className="hidden sm:inline">Back</span>
        </button>

        {/* Book title - center */}
        <div className="flex-1 min-w-0 text-center">
          <h1 className="font-display text-base sm:text-lg font-normal text-ink truncate">
            {book.title}
          </h1>
          <p className="font-body text-xs text-muted hidden sm:block">
            {book.author}
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 shrink-0">
          <a
            href={pdfUrl}
            download
            className="btn-ghost"
            title="Download PDF"
            aria-label="Download PDF"
          >
            <Download size={16} />
          </a>
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
            title="Open in new tab"
            aria-label="Open in new tab"
          >
            <ExternalLink size={16} />
          </a>
        </div>
      </header>

      {/* PDF viewer */}
      <div className="flex-1 overflow-hidden">
        <iframe
          src={pdfUrl}
          className="w-full h-full border-0"
          title={`Read ${book.title}`}
          allow="fullscreen"
        />
      </div>
    </div>
  );
};

export default BookReaderPage;
