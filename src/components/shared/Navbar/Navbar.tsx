import { Link, useLocation } from "react-router-dom";
import { navLinks } from './navlinks';
import Dropdown from "./Dropdown";
import HamburgerMenu from "./HamburgerMenu";
import { IMAGES } from "../../../assets";

const Navbar = () => {
  const location = useLocation();

  return (
    <div className="bg-white border-b border-[#E6E6E6] sticky top-0 z-20">
      <div className="max-w-[1280px] mx-auto px-5 xl:px-0 py-4">
        <div className="font-Poppins flex items-center justify-between">
        <Link to={"/"}>
            <img
              src={IMAGES.studentTiffinLogo}
              alt="student-tiffin"
              className="w-24"
            />
          </Link>

          {/* Navlinks */}
          <div className="flex items-center gap-5 md:gap-8 xl:gap-11 relative">
            <div className="hidden md:flex items-center gap-8 xl:gap-11">
              {navLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.path}
                  className={`leading-5 ${
                    location.pathname === link.path
                      ? "text-[#DE3C4B] font-medium"
                      : "text-[#424B54] font-normal"
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>
            <Dropdown />

            <HamburgerMenu />
          </div>
        </div>
    </div>
    </div>
  );
};

export default Navbar;
