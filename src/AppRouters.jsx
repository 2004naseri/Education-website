// src/AppRouter.jsx
// ============================================================
// NurPath — Islamic Education Platform
// Router Configuration
// ============================================================

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Suspense, lazy } from "react";

// ── Layout ──────────────────────────────────────────────────
import AppLayout from "./components/layout/AppLayout";

// ── Pages ───────────────────────────────────────────────────
const HomePage = lazy(() => import("./pages/Home/HomePage"));

const BooksPage = lazy(() => import("./pages/books/BooksPage"));
const BookDetailPage = lazy(() => import("./pages/books/BookDetailPage"));
const BookReaderPage = lazy(() => import("./pages/books/BookReaderPage"));

const ArticlesPage = lazy(() => import("./pages/ArticlesPage/ArticlesPage"));
const ArticleDetailPage = lazy(
  () => import("./pages/ArticlesPage/ArticleDetailPage"),
);

const FiqhPage = lazy(() => import("./pages/Fiqh/FiqhPage"));
const FiqhDetailPage = lazy(() => import("./pages/Fiqh/FiqhDetailPage"));
const HadithPage = lazy(() => import("./pages/Hadith/HadithPage"));
const HadithDetailPage = lazy(() => import("./pages/Hadith/HadithDetailPage"));
const QuranPage = lazy(() => import("./pages/Quran/QuranPage"));
const SurahDetailPage = lazy(() => import("./pages/Quran/SurahDetailPage"));
const VideosPage = lazy(() => import("./pages/Videos/VideosPage"));
const VideoDetailPage = lazy(() => import("./pages/Videos/VideoDetailPage"));
const AboutPage = lazy(() => import("./pages/About/AboutPage"));
const ContactPage = lazy(() => import("./pages/Contact/ContactPage"));
// const NotFoundPage = lazy(() => import("./pages/NotFound/NotFoundPage"));

// ── Fallback loader ─────────────────────────────────────────
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="loader" role="status" aria-label="Loading..." />
  </div>
);

// ── Router ──────────────────────────────────────────────────
const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      // ── Home ───────────────────────────────────────────
      {
        index: true,
        element: <HomePage />,
      },

      // ── Books ──────────────────────────────────────────
      {
        path: "books",
        element: (
          <Suspense fallback={<PageLoader />}>
            <BooksPage />
          </Suspense>
        ),
      },
      {
        path: "books/:id",
        element: (
          <Suspense fallback={<PageLoader />}>
            <BookDetailPage />
          </Suspense>
        ),
      },

      // ── Articles ───────────────────────────────────────
      {
        path: "articles",
        element: (
          <Suspense fallback={<PageLoader />}>
            <ArticlesPage />
          </Suspense>
        ),
      },
      {
        path: "articles/:slug",
        element: (
          <Suspense fallback={<PageLoader />}>
            <ArticleDetailPage />
          </Suspense>
        ),
      },

      // ── Fiqh ───────────────────────────────────────────
      {
        path: "fiqh",
        element: (
          <Suspense fallback={<PageLoader />}>
            <FiqhPage />
          </Suspense>
        ),
      },
      {
        path: "fiqh/:slug",
        element: (
          <Suspense fallback={<PageLoader />}>
            <FiqhDetailPage />
          </Suspense>
        ),
      },

      // ── Hadith ─────────────────────────────────────────
      {
        path: "hadith",
        element: (
          <Suspense fallback={<PageLoader />}>
            <HadithPage />
          </Suspense>
        ),
      },
      {
        path: "hadith/:id",
        element: (
          <Suspense fallback={<PageLoader />}>
            <HadithDetailPage />
          </Suspense>
        ),
      },

      // ── Quran ──────────────────────────────────────────
      {
        path: "/quran",
        element: (
          <Suspense fallback={<PageLoader />}>
            <QuranPage />
          </Suspense>
        ),
      },
      {
        path: "/quran/:surahNumber",
        element: (
          <Suspense fallback={<PageLoader />}>
            <SurahDetailPage />
          </Suspense>
        ),
      },
      {
        path: "/quran/:surahNumber/:ayahNumber",
        element: (
          <Suspense fallback={<PageLoader />}>
            <SurahDetailPage />
          </Suspense>
        ),
      },

      // ── Videos ─────────────────────────────────────────
      {
        path: "videos",
        element: (
          <Suspense fallback={<PageLoader />}>
            <VideosPage />
          </Suspense>
        ),
      },
      {
        path: "videos/:id",
        element: (
          <Suspense fallback={<PageLoader />}>
            <VideoDetailPage />
          </Suspense>
        ),
      },

      // ── About & Contact ────────────────────────────────
      {
        path: "about",
        element: (
          <Suspense fallback={<PageLoader />}>
            <AboutPage />
          </Suspense>
        ),
      },
      {
        path: "contact",
        element: (
          <Suspense fallback={<PageLoader />}>
            <ContactPage />
          </Suspense>
        ),
      },

      // ── 404 ────────────────────────────────────────────
      // { path: "*", element: <Suspense fallback={<PageLoader />}><NotFoundPage /></Suspense> },
    ],
  },

  // ── FULLSCREEN ROUTES (no header/footer) ────────────────
  // Book reader needs fullscreen PDF view
  {
    path: "books/:id/read",
    element: (
      <Suspense fallback={<PageLoader />}>
        <BookReaderPage />
      </Suspense>
    ),
  },
]);

function AppRouter() {
  return <RouterProvider router={router} />;
}

export default AppRouter;
