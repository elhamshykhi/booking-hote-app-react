import { useNavigate, useParams } from "react-router-dom";
import { useBookmarks } from "../contexts/BookmarksProvider";
import { useEffect } from "react";

import Loader from "./Loader";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";
import ReactCountryFlag from "react-country-flag";

function SingleBookmark() {
  const { id } = useParams();
  const { getBookmark, currentBookmark, isLoading } = useBookmarks();

  const navigate = useNavigate();
  useEffect(() => {
    getBookmark(id);
  }, [id]);

  if (isLoading) return <Loader />;

  return (
    <div className="h-full">
      <div className="flex items-center mb-4">
        <button
          className="bg-shark-950 w-8 h-8 rounded-full flex items-center justify-center"
          onClick={() => navigate(-1)}
        >
          {<ArrowUturnLeftIcon className="w-5 h-5 stroke-casper-400" />}
        </button>

        <div className="flex flex-1 items-center justify-center gap-x-2">
          <span>
            <ReactCountryFlag svg countryCode={currentBookmark.countryCode} />
          </span>
          <h2 className="text-center capitalize md:text-lg xl:text-xl font-thin tracking-widest">
            {currentBookmark.cityName}
          </h2>
        </div>
      </div>

      <p className="flex items-center gap-x-3">
        {currentBookmark.cityName} - {currentBookmark.country}
      </p>
    </div>
  );
}

export default SingleBookmark;
