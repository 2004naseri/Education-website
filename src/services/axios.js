// src/services/axios.js
// ============================================================
// Axios HTTP Client Configuration
//
// This file sets up axios to talk to your PHP backend API
// All API calls go through this configured instance
// ============================================================

import axios from "axios";
import { auth } from "../utils/auth";

// ── Base URL ────────────────────────────────────────────────
// IMPORTANT: Change this based on environment
// - Development: http://localhost:8000/api
// - Production: https://yoursite.com/api
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

// ── Create Axios Instance ───────────────────────────────────
// This is a pre-configured version of axios
// All requests will automatically use this config
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000, // 15 seconds timeout
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// ── Request Interceptor ─────────────────────────────────────
// Runs BEFORE every request
// Use for: logging, adding auth tokens, modifying data
api.interceptors.request.use(
  (config) => {
    // Log request in development
    if (import.meta.env.DEV) {
      console.log(
        "📤 API Request:",
        config.method?.toUpperCase(),
        config.url,
        config.params,
      );
    }

    // Add auth token if exists
    const token = auth.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    console.error("❌ Request Error:", error);
    return Promise.reject(error);
  },
);

// ── Response Interceptor ────────────────────────────────────
// Runs AFTER every response
// Use for: error handling, data transformation
api.interceptors.response.use(
  (response) => {
    // Log successful responses in development
    if (import.meta.env.DEV) {
      console.log("✅ API Response:", response.config.url, response.data);
    }
    return response;
  },
  (error) => {
    // Handle different error types
    if (error.response) {
      // Server responded with error (4xx, 5xx)
      const status = error.response.status;
      const message = error.response.data?.message || error.message;

      console.error(`❌ API Error ${status}:`, message);

      // Handle specific error codes
      switch (status) {
        case 401:
          console.log("🔒 Unauthorized - Clearing auth and redirecting to login");
          // Clear authentication data
          auth.logout();
          // Redirect to login (uncomment when you have a login page)
          // window.location.href = "/login";
          break;
        case 404:
          console.log("🔍 Resource not found");
          break;
        case 500:
          console.log("🔥 Server error");
          break;
        default:
          console.log("⚠️ An error occurred");
      }
    } else if (error.request) {
      // Request sent but no response
      console.error("🌐 Network Error - Check your connection");
    } else {
      // Something else
      console.error("⚠️ Error:", error.message);
    }

    return Promise.reject(error);
  },
);

// ── Export ──────────────────────────────────────────────────
export default api;

// ── Mock Delay Helper (for testing) ────────────────────────
// Simulates slow network - useful for testing loading states
// Usage: await mockDelay(1000); // Wait 1 second
export const mockDelay = (ms = 500) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
