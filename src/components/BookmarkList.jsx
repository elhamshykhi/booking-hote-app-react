import ReactCountryFlag from "react-country-flag";
import Loader from "./Loader";

import { useBookmarks } from "../contexts/BookmarksProvider";
import { Link } from "react-router-dom";

import { HiOutlineCursorClick } from "react-icons/hi";
import { HiOutlineBookmark, HiOutlineBookmarkSlash } from "react-icons/hi2";

function BookmarkList() {
  const { isLoading, bookmarks, currentBookmark, deleteBookmark } =
    useBookmarks();

  const handleDelete = async (e, id) => {
    e.preventDefault();
    await deleteBookmark(id);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="h-full sm:overflow-y-auto">
      <div className="flex items-center justify-center gap-x-2 mb-4">
        <span>
          <HiOutlineBookmark className="w-5 h-5" />
        </span>
        <h2 className="text-center capitalize md:text-lg xl:text-xl font-thin tracking-widest">
          bookmark list
        </h2>
      </div>

      {bookmarks.length > 0 && (
        <div className="flex flex-col gap-y-3 items-center">
          {bookmarks.map((item) => (
            <Link
              key={item.id}
              to={`${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
              className="w-full max-w-md"
            >
              <div
                className={`px-4 py-2 rounded-full bg-shark-950 flex items-center justify-between ${
                  currentBookmark.id === item.id
                    ? "border border-saffron-300"
                    : ""
                }`}
              >
                <div className="flex items-center gap-x-3">
                  <ReactCountryFlag svg countryCode={item.countryCode} />
                  <strong className="text-white font-thin">
                    {item.cityName}
                  </strong>
                  <span className="text-sm text-casper-400">
                    {item.countryCode}
                  </span>
                </div>

                <button
                  onClick={(e) => handleDelete(e, item.id)}
                  className="group"
                >
                  <HiOutlineBookmarkSlash className="w-5 h-5 stroke-saffron-300 group-hover:stroke-red-500" />
                </button>
              </div>
            </Link>
          ))}
        </div>
      )}

      {!bookmarks.length && (
        <div className="flex flex-col items-center gap-y-2">
          <span className="text-casper-400 text-center capitalize tracking-widest">
            bookmark list is empty
          </span>
          <span className="text-xs text-gray-500 text-center">
            <HiOutlineCursorClick className="w-4 h-4 inline-block mr-1" />
            click somewhere on the map to add a new bookmark.
          </span>
        </div>
      )}
    </div>
  );
}

export default BookmarkList;
