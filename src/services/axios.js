// src/services/axios.js
// ============================================================
// Axios Instance — NurPath API Client
//
// When VITE_API_BASE_URL is set in .env → calls real backend
// When not set → mock services return data directly (no axios)
//
// Usage:
//   import { apiClient } from "./axios";
//   apiClient.get("/books").then(r => r.data)
// ============================================================

import axios from "axios";

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://api.nurpath.com/v1";

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});

// ── Request interceptor — attach auth token when ready ────────
apiClient.interceptors.request.use(
  (config) => {
    // TODO: attach Bearer token when auth is added
    // const token = localStorage.getItem("nurpath-token");
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error),
);

// ── Response interceptor — normalize errors ───────────────────
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message || error.message || "Something went wrong";
    // TODO: toast notification here when toast system is added
    console.error("[API Error]", message);
    return Promise.reject(error);
  },
);

// ── Helper — simulate API delay for mock data ─────────────────
// Remove this when real API is connected
export const mockDelay = (ms = 400) =>
  new Promise((resolve) => setTimeout(resolve, ms));
