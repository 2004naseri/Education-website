// src/components/layout/MobileMenu.jsx
// ============================================================
// Mobile Menu — FIXED
// - Active states show properly
// - Text colors readable
// - No Arabic
// ============================================================

import { NavLink } from "react-router-dom";
import { X } from "lucide-react";
import { cn } from "../../utils/cn";
import { useUIStore } from "../../store/ui.store";
import { NAVIGATION } from "../../data/navigation";

const MobileMenu = () => {
  const { isMobileMenuOpen, toggleMobileMenu } = useUIStore();

  if (!isMobileMenuOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-ink/50 backdrop-blur-sm z-40"
        onClick={toggleMobileMenu}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <div
        className="fixed top-0 right-0 h-full w-[280px] bg-surface shadow-xl z-50
                      flex flex-col animate-slide-left"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <span className="font-display text-xl font-semibold text-base">
            Menu
          </span>
          <button
            onClick={toggleMobileMenu}
            className="w-10 h-10 rounded-lg flex items-center justify-center
                       text-soft hover:text-base hover:bg-overlay transition-colors"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-1">
            {NAVIGATION.map((item) => {
              const hasChildren = item.children && item.children.length > 0;

              if (hasChildren) {
                // Parent with children
                return (
                  <li key={item.label}>
                    {/* Parent label */}
                    <div
                      className="px-4 py-2 font-body text-xs font-bold text-muted 
                                    uppercase tracking-wider"
                    >
                      {item.label}
                    </div>
                    {/* Children */}
                    <ul className="space-y-1 mt-1">
                      {item.children.map((child) => (
                        <li key={child.path}>
                          <NavLink
                            to={child.path}
                            onClick={toggleMobileMenu}
                            className={({ isActive }) =>
                              cn(
                                "block px-4 py-3 rounded-lg font-body text-sm font-medium",
                                "transition-all duration-200",
                                isActive
                                  ? "bg-primary text-white font-semibold shadow-sm" // ACTIVE
                                  : "text-soft hover:bg-primary-soft hover:text-primary", // INACTIVE
                              )
                            }
                          >
                            {child.label}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              }

              // Single link (no children)
              return (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    onClick={toggleMobileMenu}
                    className={({ isActive }) =>
                      cn(
                        "block px-4 py-3 rounded-lg font-body text-sm font-medium",
                        "transition-all duration-200",
                        isActive
                          ? "bg-primary text-white font-semibold shadow-sm" // ACTIVE
                          : "text-soft hover:bg-primary-soft hover:text-primary", // INACTIVE
                      )
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-border">
          <p className="font-body text-xs text-muted text-center">
            NurPath © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
