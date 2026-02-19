// // src/components/common/Logo.jsx
// // ========================================
// // LOGO COMPONENT - All Variants
// // ========================================

// import { Link } from "react-router-dom";
// import { brandConfig } from "../../data/navbarData";

// /**
//  * DEFAULT LOGO - Use in Navbar
//  */
// const Logo = ({ variant = "default", className = "" }) => {
//   const { name, tagline, logo, link } = brandConfig;

//   return (
//     <Link
//       to={link}
//       className={`flex items-center gap-3 group transition-all duration-300 ${className}`}
//       aria-label={`${name} - ${tagline}`}
//     >
//       {/* Logo Icon/Initial */}
//       <div className="relative">
//         {/* Glow effect on hover */}
//         <div className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-primary-light rounded-xl blur-xl opacity-0 group-hover:opacity-30 transition-all duration-500"></div>

//         {/* Main logo container */}
//         <div
//           className="relative w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center
//                      shadow-md group-hover:shadow-xl transition-all duration-300
//                      group-hover:scale-105 overflow-hidden"
//           style={{
//             background: "linear-gradient(135deg, #9b7b8f 0%, #d4a574 100%)",
//           }}
//         >
//           {/* Shine effect on hover */}
//           <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>

//           {/* Letter/Icon */}
//           <span
//             className="relative text-2xl md:text-3xl font-light text-white tracking-wider z-10"
//             style={{ fontFamily: '"Cormorant Garamond", serif' }}
//           >
//             {logo.initial}
//           </span>

//           {/* Decorative dots */}
//           <div className="absolute bottom-1 right-1 flex gap-0.5">
//             <span className="w-1 h-1 rounded-full bg-white/40"></span>
//             <span className="w-1 h-1 rounded-full bg-white/60"></span>
//             <span className="w-1 h-1 rounded-full bg-white/40"></span>
//           </div>
//         </div>
//       </div>

//       {/* Brand Text */}
//       <div className="flex flex-col gap-0 leading-none">
//         {/* Brand Name */}
//         <h1
//           className="text-xl md:text-2xl font-light tracking-wide transition-all duration-300"
//           style={{
//             fontFamily: '"Cormorant Garamond", serif',
//             background: "linear-gradient(135deg, #9b7b8f 0%, #d4a574 100%)",
//             WebkitBackgroundClip: "text",
//             WebkitTextFillColor: "transparent",
//             backgroundClip: "text",
//           }}
//         >
//           {name}
//         </h1>

//         {/* Tagline */}
//         <p
//           className="text-[9px] md:text-[10px] tracking-[0.25em] uppercase font-medium text-text-muted mt-0.5"
//           style={{ fontFamily: '"Montserrat", sans-serif' }}
//         >
//           {tagline}
//         </p>
//       </div>
//     </Link>
//   );
// };

// /**
//  * MINIMAL LOGO - Icon only (for mobile or compact spaces)
//  */
// export const LogoMinimal = ({ className = "" }) => {
//   const { logo, link, name } = brandConfig;

//   return (
//     <Link
//       to={link}
//       className={`relative w-10 h-10 rounded-lg flex items-center justify-center group ${className}`}
//       aria-label={name}
//       style={{
//         background: "linear-gradient(135deg, #9b7b8f 0%, #d4a574 100%)",
//       }}
//     >
//       <span
//         className="text-xl font-light text-white tracking-wider"
//         style={{ fontFamily: '"Cormorant Garamond", serif' }}
//       >
//         {logo.initial}
//       </span>
//     </Link>
//   );
// };

// /**
//  * LIGHT LOGO - For dark backgrounds (Footer, dark sections)
//  */
// export const LogoLight = ({ className = "" }) => {
//   const { name, tagline, logo, link } = brandConfig;

//   return (
//     <Link
//       to={link}
//       className={`flex items-center gap-3 group ${className}`}
//       aria-label={`${name} - ${tagline}`}
//     >
//       {/* Icon with light background */}
//       <div
//         className="w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center
//                    bg-white/10 backdrop-blur-sm border border-white/20
//                    group-hover:bg-white/20 transition-all duration-300"
//       >
//         <span
//           className="text-2xl md:text-3xl font-light text-white tracking-wider"
//           style={{ fontFamily: '"Cormorant Garamond", serif' }}
//         >
//           {logo.initial}
//         </span>
//       </div>

//       {/* Brand Text - White */}
//       <div className="flex flex-col gap-0 leading-none">
//         <h1
//           className="text-xl md:text-2xl font-light text-white tracking-wide"
//           style={{ fontFamily: '"Cormorant Garamond", serif' }}
//         >
//           {name}
//         </h1>
//         <p
//           className="text-[9px] md:text-[10px] tracking-[0.25em] uppercase font-medium text-white/70 mt-0.5"
//           style={{ fontFamily: '"Montserrat", sans-serif' }}
//         >
//           {tagline}
//         </p>
//       </div>
//     </Link>
//   );
// };
// export default Logo;

import { Link } from "react-router-dom";
import { brandConfig } from "../../data/navbarData";

const Logo = ({ className = "" }) => {
  return (
    <Link
      to={brandConfig.link}
      className={`flex items-center gap-3 transition-transform duration-300 hover:scale-105 ${className}`}
    >
      <img
        src="images/logo.png"
        alt="Radina Aesthetic"
        className="h-12 w-auto md:h-16 object-contain"
      />
    </Link>
  );
};

export default Logo;
