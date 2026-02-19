// src/main.jsx
// ============================================================
// App Entry Point — NurPath
//
// Providers (order matters — outer to inner):
//   QueryClientProvider  → React Query cache
//   BrowserRouter        → React Router
//   App                  → root component
// ============================================================

// src/main.jsx
// ============================================================
// App Entry Point — NurPath
//
// NOTE: BrowserRouter lives inside App.jsx / AppRouter.jsx
// Do NOT add another BrowserRouter here — causes double router error
// ============================================================

import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "./App";
import "./index.css";

// ── React Query client ────────────────────────────────────────
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // data fresh for 5 min
      retry: 1, // retry failed requests once
      refetchOnWindowFocus: false, // don't refetch on tab switch
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
);
