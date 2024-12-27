import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ICONS } from "../../../assets";
import { navigationLinks } from "./navlinks";
import { useAppDispatch } from "../../../redux/hooks";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { logout } from "../../../redux/Features/Auth/authSlice";

const Dropdown = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const dropDownRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch(
        "https://student-tiffin-backend.vercel.app/api/v1/auth/logout"
      );

      if (response.ok) {
        dispatch(logout());
        Cookies.remove("isAuthenticated");
        navigate("/");
        toast.success("Logged out successfully.");
      } else {
        throw new Error("Logout failed");
      }
    } catch (err) {
      console.error("Logout failed:", err);
      toast.error("Failed to log out. Please try again.");
    }
  };


  return (
    <div className="relative">
      <img
        onClick={() => setOpen(!open)}
        src={ICONS.user}
        alt=""
        className="size-6 cursor-pointer"
      />

      {/* Dropdown */}
      <div
        ref={dropDownRef}
        className={`z-10 absolute p-2 top-12 right-0 w-[277px] rounded-2xl bg-white border border-[#E6E6E6] transition-opacity duration-300 ${
          open
            ? "opacity-100 visible duration-500"
            : "opacity-0 invisible duration-150"
        }`}
      >
        <div className="flex flex-col gap-1">
          {navigationLinks.map((item, idx: number) => (
            <Link
              to={item.path}
              style={{
                transform: `translateY(${open ? 0 : (idx + 1) * 10}px)`,
              }}
              key={idx}
              className={`${
                location.pathname === item.path ? "bg-[#F9F9F9]" : "bg-white"
              } p-[10px] leading-5 text-[#424B54] transition-all duration-300 flex items-center gap-[6px] rounded-lg`}
            >
              <img src={item.icon} alt="" className="size-5" />
              {item.label}
            </Link>
          ))}
        </div>

        {/* HR */}
        <hr className="border border-[#E6E6E6] h-[1px] mt-2" />

        {/* Sign Out button with animation */}
        <button
        onClick={handleLogout}
          className={`p-[10px] leading-5 text-[#49515D] mt-2 transition-all duration-300 ${
            open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
          }`}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Dropdown;
