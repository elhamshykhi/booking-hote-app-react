import { BiLogOutCircle } from "react-icons/bi";
import {
  HiOutlineBell,
  HiOutlineBookmark,
  HiOutlineMagnifyingGlass,
  HiOutlineUser,
} from "react-icons/hi2";

import { Link, NavLink, useNavigate } from "react-router-dom";

import { useApp } from "../contexts/AppContext";
import { useAuth } from "../contexts/AuthProvider";

function Navbar() {
  const { isOpenSearchBar, setIsOpenSearchBar, location } = useApp();
  const navigate = useNavigate();
  const currentTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    hourCycle: "h24",
  });

  const { user, isAuthentication, logout } = useAuth();
  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-shark-950 px-4 h-16 sticky top-0 inset-x-0 z-[1000] max-w-screen-xl mx-auto flex items-center justify-between">
      <div className="flex items-center gap-x-2">
        {isAuthentication ? (
          <>
            <button className="button bg-oxfordBlue-900" onClick={handleLogout}>
              <BiLogOutCircle className="buttonSvg stroke-casper-400" />
            </button>
            <div className="capitalize flex flex-col">
              <span className="text-[10px] sm:text-xs lg:text-sm text-casper-400">
                good&nbsp;
                {currentTime < 12
                  ? "morning"
                  : currentTime < 18
                  ? "afternoon"
                  : "evening"}
              </span>
              <span className="text-xs sm:text-sm lg:text-base text-saffron-300">
                {user.name}
              </span>
            </div>
          </>
        ) : (
          <>
            <button onClick={handleLogin} className="button bg-oxfordBlue-900">
              <HiOutlineUser className="buttonSvg stroke-casper-400" />
            </button>
            <Link
              to="/"
              className="capitalize text-sm text-saffron-300 sm:text-base"
            >
              booking hotel
            </Link>
          </>
        )}
      </div>

      <div className="flex items-center gap-x-1.5">
        {location.pathname !== "/" && (
          <button
            onClick={() => setIsOpenSearchBar(!isOpenSearchBar)}
            className="button bg-oxfordBlue-900 relative"
            id="searchBarIcon"
          >
            <HiOutlineMagnifyingGlass className="buttonSvg stroke-casper-400" />
          </button>
        )}

        <NavLink to="/bookmarks" className="">
          <button className="button bg-oxfordBlue-900">
            <HiOutlineBookmark className="buttonSvg stroke-casper-400" />
          </button>
        </NavLink>

        <button className="button bg-oxfordBlue-900 relative">
          <span className="absolute top-0 right-0 bg-saffron-300 w-1.5 h-1.5 rounded-full"></span>
          <HiOutlineBell className="buttonSvg stroke-casper-400" />
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
