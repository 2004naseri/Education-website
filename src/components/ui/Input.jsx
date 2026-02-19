// src/components/ui/Input.jsx
// ============================================================
// Input — NurPath UI Primitive
//
// WHAT IT IS:
//   A fully controlled text input field with built-in support
//   for icons, search mode, error state, labels, and RTL text.
//
// WHY WE NEED IT:
//   Every form field, search bar, and filter input in the app
//   uses this. Having ONE input component means consistent
//   styling, focus rings, error handling, and RTL behavior
//   everywhere — no duplicated CSS across pages.
//
// WHERE IT'S USED:
//   - SearchBar (wraps Input with search icon)
//   - ContactPage (name, email, message fields)
//   - Any filter or form input across all pages
//
// Usage:
//   <Input placeholder="Search books..." />
//   <Input label="Your Name" required />
//   <Input type="email" label="Email" error="Invalid email" />
//   <Input iconLeft={<Search size={16} />} placeholder="Search..." />
//   <Input disabled value="Read only" />
// ============================================================

import { cn } from "../../utils/cn";

const Input = ({
  // Label above the input
  label,
  // Helper text below the input
  hint,
  // Error message — turns border red
  error,
  // Icon on the LEFT inside the input
  iconLeft,
  // Icon on the RIGHT inside the input (e.g. clear btn)
  iconRight,
  // Extra classes on the outer wrapper
  className,
  // Extra classes directly on the <input> element
  inputClassName,
  // html id — auto-generated from label if not provided
  id,
  required,
  disabled,
  ...props
}) => {
  // Auto-generate id from label for accessibility
  const inputId =
    id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  return (
    <div className={cn("flex flex-col gap-1.5 w-full", className)}>
      {/* Label */}
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-semibold font-body text-base"
        >
          {label}
          {required && (
            <span className="text-error ml-1" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}

      {/* Input wrapper — positions icons */}
      <div className="relative flex items-center">
        {/* Left icon */}
        {iconLeft && (
          <span
            className="absolute left-3 text-muted pointer-events-none"
            aria-hidden="true"
          >
            {iconLeft}
          </span>
        )}

        {/* The actual input */}
        <input
          id={inputId}
          disabled={disabled}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={
            error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
          }
          required={required}
          className={cn(
            // Base
            "input w-full",

            // Padding adjustments for icons
            iconLeft && "pl-10",
            iconRight && "pr-10",

            // Error state — red border
            error && "border-error focus:border-error focus:ring-error/10",

            // Disabled
            disabled && "opacity-50 cursor-not-allowed",

            inputClassName,
          )}
          {...props}
        />

        {/* Right icon */}
        {iconRight && (
          <span className="absolute right-3 text-muted" aria-hidden="true">
            {iconRight}
          </span>
        )}
      </div>

      {/* Error message */}
      {error && (
        <p
          id={`${inputId}-error`}
          role="alert"
          className="text-xs text-error font-body"
        >
          {error}
        </p>
      )}

      {/* Hint text */}
      {!error && hint && (
        <p id={`${inputId}-hint`} className="text-xs text-muted font-body">
          {hint}
        </p>
      )}
    </div>
  );
};

export default Input;
