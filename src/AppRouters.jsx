// src/AppRouter.jsx
// ============================================================
// NurPath — Islamic Education Platform
// Router · SAFE STARTER VERSION
// Add pages one by one as you create them
// ============================================================

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Suspense, lazy } from "react";

// ── Layout ──────────────────────────────────────────────────
import AppLayout from "./components/layout/AppLayout";

// ── Pages — uncomment each one AFTER you create the file ────
const HomePage = lazy(() => import("./pages/Home/HomePage"));

const BooksPage = lazy(() => import("./pages/books/BooksPage"));
// const BookDetailPage    = lazy(() => import("./pages/Books/BookDetailPage"));
const ArticlesPage = lazy(() => import("./pages/ArticlesPage/ArticlesPage"));
// const ArticleDetailPage = lazy(() => import("./pages/Articles/ArticleDetailPage"));
// const FiqhPage          = lazy(() => import("./pages/Fiqh/FiqhPage"));
const HadithPage = lazy(() => import("./pages/Hadith/HadithPage"));
const QuranPage = lazy(() => import("./pages/Quran/QuranPage"));
// const VideosPage        = lazy(() => import("./pages/Videos/VideosPage"));
// const AboutPage         = lazy(() => import("./pages/About/AboutPage"));
// const ContactPage       = lazy(() => import("./pages/Contact/ContactPage"));
// const NotFoundPage      = lazy(() => import("./pages/NotFound/NotFoundPage"));

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
      // ✅ ACTIVE — Home
      {
        index: true,
        element: <HomePage />,
      },

      // 🔒 LOCKED — uncomment after creating the page file
      {
        path: "books",
        element: (
          <Suspense fallback={<PageLoader />}>
            <BooksPage />
          </Suspense>
        ),
      },
      // {
      //   path: "books/:bookId",
      //   element: (
      //     <Suspense fallback={<PageLoader />}>
      //       <BookDetailPage />
      //     </Suspense>
      //   ),
      // },
      {
        path: "articles",
        element: (
          <Suspense fallback={<PageLoader />}>
            <ArticlesPage />
          </Suspense>
        ),
      },
      // { path: "articles/:slug", element: <Suspense fallback={<PageLoader />}><ArticleDetailPage /></Suspense> },
      // { path: "fiqh",           element: <Suspense fallback={<PageLoader />}><FiqhPage /></Suspense> },
      {
        path: "hadith",
        element: (
          <Suspense fallback={<PageLoader />}>
            <HadithPage />
          </Suspense>
        ),
      },
      {
        path: "quran",
        element: (
          <Suspense fallback={<PageLoader />}>
            <QuranPage />
          </Suspense>
        ),
      },
      // { path: "videos",         element: <Suspense fallback={<PageLoader />}><VideosPage /></Suspense> },
      // { path: "about",          element: <Suspense fallback={<PageLoader />}><AboutPage /></Suspense> },
      // { path: "contact",        element: <Suspense fallback={<PageLoader />}><ContactPage /></Suspense> },
      // { path: "*",              element: <Suspense fallback={<PageLoader />}><NotFoundPage /></Suspense> },
    ],
  },
]);

function AppRouter() {
  return <RouterProvider router={router} />;
}

export default AppRouter;
