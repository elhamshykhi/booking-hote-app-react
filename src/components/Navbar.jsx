import {
  BellIcon,
  BookmarkIcon,
  MagnifyingGlassIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { BiLogOutCircle } from "react-icons/bi";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useApp } from "../contexts/AppContext";
import { useAuth } from "../contexts/AuthProvider";

function Navbar() {
  const { isOpenSearchBar, serIsOpenSearchBar, location } = useApp();
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
            <button
              className="w-8 h-8 flex items-center justify-center bg-oxfordBlue-900 rounded-full"
              onClick={handleLogout}
            >
              <BiLogOutCircle className="w-5 h-5 text-casper-400 pointer-events-none" />
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
            <button
              onClick={handleLogin}
              className="w-8 h-8 flex items-center justify-center bg-oxfordBlue-900 rounded-full"
            >
              <UserIcon className="w-5 h-5 text-casper-400" />
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
            onClick={() => serIsOpenSearchBar(!isOpenSearchBar)}
            className="w-8 h-8 flex items-center justify-center bg-oxfordBlue-900 rounded-full relative"
            id="searchBarIcon"
          >
            <MagnifyingGlassIcon className="w-5 h-5 text-casper-400 pointer-events-none" />
          </button>
        )}

        <NavLink to="/bookmarks" className="">
          <button className="w-8 h-8 flex items-center justify-center bg-oxfordBlue-900 rounded-full">
            <BookmarkIcon className="w-5 h-5 text-casper-400" />
          </button>
        </NavLink>

        <button className="w-8 h-8 flex items-center justify-center bg-oxfordBlue-900 rounded-full relative">
          <span className="absolute top-0 right-0 bg-saffron-300 w-1.5 h-1.5 rounded-full"></span>
          <BellIcon className="w-5 h-5 text-casper-400" />
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
