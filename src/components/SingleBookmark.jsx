import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

import { HiOutlineArrowUturnLeft } from "react-icons/hi2";

import { useBookmarks } from "../contexts/BookmarksProvider";
import ReactCountryFlag from "react-country-flag";
import Loader from "./Loader";

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
      <div className="flex items-center justify-between mb-4 max-w-lg mx-auto">
        <div className="flex items-center justify-center gap-x-2">
          <span>
            <ReactCountryFlag svg countryCode={currentBookmark.countryCode} />
          </span>
          <h2 className="text-center capitalize md:text-lg xl:text-xl font-thin tracking-widest">
            {currentBookmark.cityName}
          </h2>
        </div>
        <button className="bg-shark-950 button" onClick={() => navigate(-1)}>
          {<HiOutlineArrowUturnLeft className="w-5 h-5 stroke-casper-400" />}
        </button>
      </div>

      <div className="max-w-lg mx-auto max-h-[calc(100%_-_48px)] overflow-y-auto pr-1 text-justify">
        <h4 className="font-semibold text-casper-400 mb-3 tracking-widest">
          {currentBookmark.cityName} - {currentBookmark.country}
        </h4>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
          molestiae eaque rerum beatae magnam adipisci optio corporis, aliquam
          modi, debitis explicabo reiciendis sint quibusdam similique, facere
          quis veritatis temporibus accusamus ratione culpa vitae ab. Nemo
          maiores tenetur non aut laudantium hic sapiente impedit voluptatem,
          nulla placeat. Rerum ut asperiores quo.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
          molestiae eaque rerum beatae magnam adipisci optio corporis, aliquam
          modi, debitis explicabo reiciendis sint quibusdam similique, facere
          quis veritatis temporibus accusamus ratione culpa vitae ab. Nemo
          maiores tenetur non aut laudantium hic sapiente impedit voluptatem,
          nulla placeat. Rerum ut asperiores quo.
        </p>
      </div>
    </div>
  );
}

export default SingleBookmark;
