// src/utils/auth.js
// ============================================================
// Authentication Utilities
// Handle token storage, retrieval, and user session management
// ============================================================

const TOKEN_KEY = "authToken";
const USER_KEY = "userData";

/**
 * Authentication utilities
 */
export const auth = {
  /**
   * Store authentication token
   * @param {string} token - JWT or auth token from backend
   */
  setToken: (token) => {
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
    }
  },

  /**
   * Get authentication token
   * @returns {string|null} Auth token or null if not found
   */
  getToken: () => {
    return localStorage.getItem(TOKEN_KEY);
  },

  /**
   * Remove authentication token
   */
  removeToken: () => {
    localStorage.removeItem(TOKEN_KEY);
  },

  /**
   * Check if user is authenticated
   * @returns {boolean} True if token exists
   */
  isAuthenticated: () => {
    return !!localStorage.getItem(TOKEN_KEY);
  },

  /**
   * Store user data
   * @param {Object} userData - User information from backend
   */
  setUser: (userData) => {
    if (userData) {
      localStorage.setItem(USER_KEY, JSON.stringify(userData));
    }
  },

  /**
   * Get user data
   * @returns {Object|null} User data or null if not found
   */
  getUser: () => {
    const userData = localStorage.getItem(USER_KEY);
    try {
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error("Error parsing user data:", error);
      return null;
    }
  },

  /**
   * Remove user data
   */
  removeUser: () => {
    localStorage.removeItem(USER_KEY);
  },

  /**
   * Complete logout - remove token and user data
   */
  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  /**
   * Complete login - store token and user data
   * @param {string} token - Auth token
   * @param {Object} userData - User information
   */
  login: (token, userData) => {
    auth.setToken(token);
    auth.setUser(userData);
  },
};

export default auth;
