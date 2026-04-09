// src/components/ui/ErrorMessage.jsx
// ============================================================
// Error Message - Display API errors to users
// Used when API calls fail or data fetching encounters issues
// ============================================================

import { AlertCircle, WifiOff, ServerCrash, RefreshCw } from "lucide-react";
import { cn } from "../../utils/cn";

/**
 * ErrorMessage Component
 *
 * @param {Object} props
 * @param {Error} props.error - Error object from API call
 * @param {Function} props.onRetry - Callback function to retry the failed operation
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.title - Custom error title
 * @param {string} props.message - Custom error message
 */
const ErrorMessage = ({
  error,
  onRetry,
  className,
  title,
  message,
}) => {
  // Determine error type and icon
  const getErrorInfo = () => {
    if (!error) {
      return {
        icon: AlertCircle,
        title: title || "Something went wrong",
        message: message || "An unexpected error occurred. Please try again.",
        color: "text-red-500",
      };
    }

    // Network error (no response from server)
    if (error.code === "ERR_NETWORK" || error.message?.includes("Network")) {
      return {
        icon: WifiOff,
        title: "Network Error",
        message: "Unable to connect to the server. Please check your internet connection.",
        color: "text-orange-500",
      };
    }

    // Server error (5xx)
    if (error.response?.status >= 500) {
      return {
        icon: ServerCrash,
        title: "Server Error",
        message: "Our server is experiencing issues. Please try again in a moment.",
        color: "text-red-500",
      };
    }

    // Not found (404)
    if (error.response?.status === 404) {
      return {
        icon: AlertCircle,
        title: "Not Found",
        message: "The requested content could not be found.",
        color: "text-yellow-500",
      };
    }

    // Unauthorized (401)
    if (error.response?.status === 401) {
      return {
        icon: AlertCircle,
        title: "Unauthorized",
        message: "You need to be logged in to access this content.",
        color: "text-yellow-500",
      };
    }

    // Generic error
    return {
      icon: AlertCircle,
      title: title || "Error",
      message: message || error.response?.data?.message || error.message || "Something went wrong. Please try again.",
      color: "text-red-500",
    };
  };

  const errorInfo = getErrorInfo();
  const Icon = errorInfo.icon;

  return (
    <div className={cn("flex items-center justify-center p-8", className)}>
      <div className="max-w-md w-full text-center">
        {/* Error Icon */}
        <div className={cn(
          "w-16 h-16 mx-auto mb-4 rounded-full bg-opacity-10 flex items-center justify-center",
          errorInfo.color.replace("text-", "bg-")
        )}>
          <Icon className={cn("w-8 h-8", errorInfo.color)} />
        </div>

        {/* Error Title */}
        <h3 className="font-display text-xl font-semibold text-ink mb-2">
          {errorInfo.title}
        </h3>

        {/* Error Message */}
        <p className="font-body text-soft mb-6">
          {errorInfo.message}
        </p>

        {/* Retry Button */}
        {onRetry && (
          <button
            onClick={onRetry}
            className="btn-primary inline-flex items-center gap-2"
          >
            <RefreshCw size={16} />
            Try Again
          </button>
        )}

        {/* Development Mode - Show Full Error */}
        {import.meta.env.DEV && error && (
          <details className="mt-6 text-left">
            <summary className="cursor-pointer font-body text-xs text-muted hover:text-accent mb-2">
              🔍 Error Details (Dev Only)
            </summary>
            <pre className="p-3 bg-surface rounded border border-border font-mono text-xs text-muted overflow-auto max-h-40">
              {JSON.stringify(
                {
                  message: error.message,
                  status: error.response?.status,
                  statusText: error.response?.statusText,
                  data: error.response?.data,
                },
                null,
                2
              )}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;
