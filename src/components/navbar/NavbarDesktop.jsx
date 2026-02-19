// import { Link, useLocation } from "react-router-dom";
// import Logo from "./Logo";
// import { navigationItems, ctaConfig } from "../../data/navbarData";

// const NavbarDesktop = () => {
//   const location = useLocation();
//   const isActive = (path) => location.pathname === path;

//   return (
//     <div className="hidden lg:flex items-center justify-between w-full">
//       <Logo />
//       {/* <img src="/images/logo.png" /> */}
//       <nav>
//         <ul className="flex items-center gap-12">
//           {navigationItems.map((item) => (
//             <li key={item.id} className="relative group">
//               <Link
//                 to={item.path}
//                 className={`text-[11px] uppercase tracking-[0.3em] font-semibold transition-all duration-300
//                   ${
//                     isActive(item.path)
//                       ? "text-primary"
//                       : "text-text-secondary hover:text-primary"
//                   }`}
//               >
//                 {item.label}
//                 {/* Minimalist indicator */}
//                 <span
//                   className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent transition-all duration-300
//                   ${
//                     isActive(item.path)
//                       ? "opacity-100"
//                       : "opacity-0 group-hover:opacity-100"
//                   }`}
//                 />
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </nav>

//       <Link
//         to={ctaConfig.primary.path}
//         className="bg-primary text-white px-8 py-3 text-[10px] uppercase tracking-[0.2em] font-bold
//                    hover:bg-accent transition-all duration-300 rounded-none shadow-lg hover:shadow-accent/20"
//       >
//         {ctaConfig.primary.label}
//       </Link>
//     </div>
//   );
// };

// export default NavbarDesktop;

import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { navigationItems, ctaConfig } from "../../data/navbarData";

const NavbarDesktop = () => {
  const location = useLocation();
  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(path + "/");

  const navigate = useNavigate();
  function handleClick(path) {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth", // Changed from "instant" to "auto"
    });
    navigate(path);
  }
  return (
    <div className="hidden lg:flex items-center justify-between w-full">
      <Logo />

      <nav>
        <ul className="flex items-center gap-10">
          {navigationItems.map((item) => (
            <li key={item.id} className="relative group">
              <button
                onClick={() => handleClick(item.path)}
                className={`text-[11px] uppercase hover:cursor-pointer tracking-[0.25em] font-semibold transition-all duration-300 ${
                  isActive(item.path)
                    ? "text-[#88243d]"
                    : "text-[#430568] hover:text-[#88243d]"
                }`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-2 left-0 h-[2px] bg-[#88243d] transition-all duration-300 ${
                    isActive(item.path) ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <Link
        to={ctaConfig.primary.path}
        className="bg-[#660665] text-white px-8 py-3 text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-[#430568] transition-all duration-300"
      >
        {ctaConfig.primary.label}
      </Link>
    </div>
  );
};

export default NavbarDesktop;
