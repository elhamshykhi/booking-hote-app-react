import Map from "./Map";
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";

import { Outlet } from "react-router-dom";
import { useHotels } from "../contexts/HotelsProvider";
import { useApp } from "../contexts/AppContext";
import { useRef } from "react";
import useOutsideClick from "../hooks/useOutsideClick";

function HotelsLayout() {
  const { isLoading, hotels } = useHotels();
  const { isOpenSearchBar, serIsOpenSearchBar } = useApp();

  const searchBarRef = useRef();
  useOutsideClick(searchBarRef, () => serIsOpenSearchBar(false),'searchBarIcon');

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

      <div className="max-w-screen-xl mx-auto grid grid-cols-12 px-4 sm:gap-x-4">
        <div className="order-1 col-span-12 mb-4 sm:mb-0 sm:col-span-6 sm:order-none md:col-span-7 rounded-tl-3xl rounded-bl-3xl overflow-hidden lg:col-span-8 sm:h-[calc(100vh_-_80px)] bg-oxfordBlue-900 rounded-3xl p-4">
          <Outlet />
        </div>

        {/* Map */}
        <div className="h-60 sm:h-[calc(100vh_-_80px)] mb-4 sm:mb-0 rounded-3xl overflow-hidden col-span-12 sm:col-span-6 md:col-span-5 lg:col-span-4">
          <Map markerLocation={hotels} />
        </div>
      </div>
    </div>
  );
}

export default HotelsLayout;
