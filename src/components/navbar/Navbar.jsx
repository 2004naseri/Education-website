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
