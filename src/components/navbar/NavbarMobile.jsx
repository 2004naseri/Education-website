// import { useState, useEffect } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import Logo from "./Logo";
// import { navigationItems, ctaConfig } from "../../data/navbarData";

// const NavbarMobile = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const isActive = (path) => location.pathname === path;

//   const location = useLocation();
//   const navigate = useNavigate();
//   function handleClick(path) {
//     window.scrollTo({
//       top: 0,
//       left: 0,
//       behavior: "smooth", // Changed from "instant" to "auto"
//     });
//     navigate(path);
//   }

//   useEffect(() => setIsOpen(false), [location]);

//   // Prevent scrolling when menu is open
//   useEffect(() => {
//     document.body.style.overflow = isOpen ? "hidden" : "unset";
//   }, [isOpen]);

//   return (
//     <div className="lg:hidden flex items-center justify-between w-full">
//       <Logo className="scale-90" />

//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="relative z-[110] p-2"
//         aria-label="Toggle Menu"
//       >
//         <div className="w-6 h-5 flex flex-col justify-between">
//           <span
//             className={`h-0.5 w-full bg-[#430568] transition-all ${
//               isOpen ? "rotate-45 translate-y-2" : ""
//             }`}
//           />
//           <span
//             className={`h-0.5 w-full bg-[#430568] transition-all ${
//               isOpen ? "opacity-0" : "opacity-100"
//             }`}
//           />
//           <span
//             className={`h-0.5 w-full bg-[#430568] transition-all ${
//               isOpen ? "-rotate-45 -translate-y-2" : ""
//             }`}
//           />
//         </div>
//       </button>

//       {/* Full Screen Menu */}
//       <div
//         className={`fixed inset-0 z-[105] bg-white transition-transform duration-500 ease-in-out ${
//           isOpen ? "translate-x-0" : "translate-x-full"
//         }`}
//       >
//         <div className="flex flex-col h-full pt-32 px-10">
//           <nav>
//             <ul className="space-y-8">
//               {navigationItems.map((item, index) => (
//                 <li
//                   key={item.id}
//                   style={{ transitionDelay: `${index * 50}ms` }}
//                   className={`transition-all duration-500 ${
//                     isOpen
//                       ? "opacity-100 translate-x-0"
//                       : "opacity-0 translate-x-10"
//                   }`}
//                 >
//                   <button
//                     onClick={() => handleClick(item.path)}
//                     className={`text-[11px] uppercase hover:cursor-pointer tracking-[0.25em] font-semibold transition-all duration-300 ${
//                       isActive(item.path)
//                         ? "text-[#88243d]"
//                         : "text-[#430568] hover:text-[#88243d]"
//                     }`}
//                   >
//                     {item.label}
//                     <span
//                       className={`absolute -bottom-2 left-0 h-[2px] bg-[#88243d] transition-all duration-300 ${
//                         isActive(item.path)
//                           ? "w-full"
//                           : "w-0 group-hover:w-full"
//                       }`}
//                     />
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           </nav>

//           <div className="mt-auto mb-20">
//             <Link
//               to={ctaConfig.primary.path}
//               className="block w-full text-center bg-[#660665] text-white py-5 uppercase tracking-widest text-xs font-bold"
//             >
//               {ctaConfig.primary.label}
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NavbarMobile;

// src/components/layout/navbar/NavbarMobile.jsx
// ========================================
// MOBILE NAVBAR - New Professional Design
// ========================================

import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  Check,
  Facebook,
  Instagram,
  MessageCircle,
} from "lucide-react";
import Logo from "./Logo";
import { navigationItems, ctaConfig } from "../../data/navbarData";

const NavbarMobile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(path + "/");

  // Close menu on route change
  useEffect(() => setIsOpen(false), [location]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleNavigation = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="lg:hidden flex items-center justify-between w-full">
      {/* Logo */}
      <Logo className="scale-90" />

      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative z-[110] p-2"
        aria-label="Toggle Menu"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-secondary" />
        ) : (
          <Menu className="w-6 h-6 text-secondary" />
        )}
      </button>

      {/* Backdrop Overlay */}
      <div
        className={`fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm transition-opacity duration-500 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Side Drawer Menu - 70% Width */}
      <aside
        className={`fixed top-0 right-0 z-[105] h-full w-[70%] bg-white shadow-2xl transition-transform duration-500 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Menu Header */}
        <div className="border-b border-neutral-200 px-6 py-6">
          <div className="flex items-center gap-3">
            <Menu className="w-5 h-5 text-primary" />
            <span className="font-display text-2xl text-primary italic">
              Menu
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto px-6 py-8">
          <ul className="space-y-2">
            {navigationItems.map((item, index) => (
              <li
                key={item.id}
                className={`transition-all duration-500 ${
                  isOpen
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-8"
                }`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <button
                  onClick={() => handleNavigation(item.path)}
                  className={`w-full text-left px-4 py-4 rounded-xl font-body text-sm uppercase tracking-[0.2em] font-semibold transition-all duration-300 ${
                    isActive(item.path)
                      ? "bg-primary text-white"
                      : "text-text-secondary hover:bg-surface hover:text-primary"
                  }`}
                >
                  <span className="flex items-center justify-between">
                    {item.label}
                    {isActive(item.path) && <Check className="w-4 h-4" />}
                  </span>
                </button>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <div className="mt-8 pt-8 border-t border-neutral-200">
            <Link
              to={ctaConfig.primary.path}
              className="block w-full text-center bg-accent text-white py-4 rounded-full font-body text-xs uppercase tracking-[0.25em] font-bold shadow-lg hover:bg-accent-dark transition-all duration-300"
            >
              {ctaConfig.primary.label}
            </Link>
          </div>
        </nav>

        {/* Menu Footer */}
        <div className="border-t border-neutral-200 px-6 py-6 bg-surface">
          <div className="text-center">
            <p className="text-xs text-text-muted mb-3 uppercase tracking-wider">
              Follow Us
            </p>
            <div className="flex justify-center gap-4">
              {/* Social Icons */}
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default NavbarMobile;
