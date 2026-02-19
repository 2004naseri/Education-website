// import { NavbarDesktop, NavbarMobile } from "./index";
// import { useScrollPosition } from "../../hooks/useScrollPosition";

// const Navbar = () => {
//   const { isScrolled } = useScrollPosition();

//   return (
//     <header
//       className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500
//         ${
//           isScrolled
//             ? "bg-secondary-light/90 backdrop-blur-md py-2 shadow-elegant"
//             : "bg-transparent py-6"
//         }`}
//     >
//       <div className="container-custom">
//         <NavbarDesktop />
//         <NavbarMobile />
//       </div>

//       {/* Luxury Detail: A razor-thin gradient line at the very bottom of the nav */}
//       <div
//         className={`h-[1px] w-full bg-gradient-to-r from-transparent via-accent/30 to-transparent transition-opacity duration-500 ${
//           isScrolled ? "opacity-100" : "opacity-0"
//         }`}
//       />
//     </header>
//   );
// };

// export default Navbar;
import { NavbarDesktop, NavbarMobile } from "./index";

const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-[100] bg-white border-b border-[#660665]/10 shadow-sm py-4">
      <div className="container-custom">
        <div className="flex items-center justify-between">
          <NavbarDesktop />
          <NavbarMobile />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
