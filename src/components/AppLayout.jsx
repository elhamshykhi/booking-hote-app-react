import { Outlet } from "react-router-dom";
import { useApp } from "../contexts/AppContext";
import { useRef } from "react";
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";
import useOutsideClick from "../hooks/useOutsideClick";

function AppLayout() {
  const { isOpenSearchBar, serIsOpenSearchBar } = useApp();
  const searchBarRef = useRef();

  useOutsideClick(
    searchBarRef,
    () => serIsOpenSearchBar(false),
    "searchBarIcon"
  );

  return (
    <div className="">
      <Navbar />

      <div
        className={`px-4 max-w-screen-xl mx-auto transition-all duration-300 ease-in-out bg-shark-950 mt-16 fixed top-0 inset-x-0 z-10 py-4 ${
          isOpenSearchBar
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
        }`}
        ref={searchBarRef}
      >
        <SearchBar />
      </div>

      <div className="max-w-screen-xl mx-auto">
        <Outlet />
      </div>
    </div>
  );
}

export default AppLayout;
