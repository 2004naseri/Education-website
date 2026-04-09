// src/components/ErrorBoundary.jsx
// ============================================================
// Error Boundary - Catches React errors and displays fallback UI
// Wraps the entire app to catch and handle errors gracefully
// ============================================================

import React from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { Link } from "react-router-dom";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details for debugging
    console.error("❌ Error Boundary caught an error:", error, errorInfo);

    this.setState({
      error,
      errorInfo,
    });

    // You can also log to an error reporting service here
    // Example: logErrorToService(error, errorInfo);
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
          <div className="max-w-md w-full">
            <div className="card-base p-8 text-center">
              {/* Error Icon */}
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-500/10 flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-red-500" />
              </div>

              {/* Error Title */}
              <h1 className="font-display text-2xl font-semibold text-ink mb-3">
                Oops! Something went wrong
              </h1>

              {/* Error Message */}
              <p className="font-body text-soft mb-6">
                We encountered an unexpected error. Don't worry, your data is
                safe. Please try refreshing the page.
              </p>

              {/* Development Mode - Show Error Details */}
              {import.meta.env.DEV && this.state.error && (
                <details className="mb-6 text-left">
                  <summary className="cursor-pointer font-body text-sm text-muted hover:text-accent mb-2">
                    🔍 Error Details (Development Only)
                  </summary>
                  <div className="p-4 bg-surface rounded-lg border border-border">
                    <p className="font-mono text-xs text-red-600 mb-2">
                      {this.state.error.toString()}
                    </p>
                    <pre className="font-mono text-xs text-muted overflow-auto max-h-40">
                      {this.state.errorInfo?.componentStack}
                    </pre>
                  </div>
                </details>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => window.location.reload()}
                  className="btn-primary inline-flex items-center justify-center gap-2"
                >
                  <RefreshCw size={16} />
                  Refresh Page
                </button>
                <Link
                  to="/"
                  className="btn-secondary inline-flex items-center justify-center gap-2"
                >
                  <Home size={16} />
                  Go Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
