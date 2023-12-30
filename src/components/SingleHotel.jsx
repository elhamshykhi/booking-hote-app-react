import { useParams } from "react-router-dom";
import { useHotels } from "../contexts/HotelsProvider";
import { useEffect } from "react";
import { BiBath, BiBed } from "react-icons/bi";
import { RiHotelBedLine } from "react-icons/ri";
import { HiOutlineMapPin, HiOutlineStar } from "react-icons/hi2";

import Loader from "./Loader";

function SingleHotel() {
  const { id } = useParams();
  const { getHotel, currentHotel, isLoadingCurrentHotel } = useHotels();

  useEffect(() => {
    getHotel(id);
  }, [id]);

  if (isLoadingCurrentHotel) return <Loader />;

  return (
    <div className="sm:h-full sm:py-0 sm:overflow-y-auto sm:pr-2">
      <div className="w-full lg:flex lg:gap-x-4 lg:mb-4">
        <img
          src={currentHotel.xl_picture_url}
          alt={currentHotel.name}
          className="w-full rounded-2xl max-h-80 object-cover mb-4 lg:mb-0 lg:w-3/5"
        />
        <div className="lg:w-2/5">
          <h2 className="font-bold md:text-lg mb-3 text-saffron-300">
            {currentHotel.name}
          </h2>

          <div className="flex pb-4 text-casper-400 text-xs sm:text-sm flex-col gap-y-1 xs:flex-row xs:justify-between xs:items-center sm:flex-col sm:justify-start sm:items-start md:flex-row md:justify-between md:items-center lg:flex-col lg:justify-start lg:items-start">
            <p className="flex items-center gap-x-1">
              <HiOutlineMapPin className="w-4 h-4 stroke-saffron-300" />
              <span className="capitalize font-thin">
                {currentHotel.smart_location}
              </span>
            </p>

            <div className="flex items-center gap-x-1">
              <HiOutlineStar className="w-4 h-4 fill-saffron-300 stroke-saffron-300" />
              <span className="break-words">
                <span className="text-white">
                  {currentHotel.review_scores_rating &&
                    (currentHotel.review_scores_rating * 5) / 100}
                </span>
                /5 ({currentHotel.number_of_reviews} reviews)
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between lg:flex-col lg:items-start lg:justify-start xl:flex-row gap-2 text-xs md:text-sm capitalize mb-4 max-w-sm">
            <div className="flex-1 w-full border border-casper-400 rounded-xl p-2 lg:flex lg:items-center lg:gap-x-2 xl:flex-col xl:items-start">
              <BiBed size="18px" className="mb-1" />
              <div className="flex items-center">
                {currentHotel.beds}&nbsp;
                <span className="text-casper-400">
                  {currentHotel.beds > 1 ? "beds" : "bed"}
                </span>
              </div>
            </div>
            <div className="flex-1 w-full border border-casper-400 rounded-xl p-2 lg:flex lg:items-center lg:gap-x-2 xl:flex-col xl:items-start">
              <BiBath size="18px" className="mb-1" />
              <div className="flex items-center">
                {currentHotel.bathrooms}&nbsp;
                <span className="text-casper-400">
                  {currentHotel.bathrooms > 1 ? "bathrooms" : "bathroom"}
                </span>
              </div>
            </div>
            <div className="flex-1 w-full border border-casper-400 rounded-xl p-2 lg:flex lg:items-center lg:gap-x-2 xl:flex-col xl:items-start">
              <RiHotelBedLine size="18px" className="mb-1" />
              <div className="flex items-center">
                {currentHotel.bedrooms}&nbsp;
                <span className="text-casper-400">
                  {currentHotel.bedrooms > 1 ? "bedrooms" : "bedroom"}
                </span>
              </div>
            </div>
          </div>

          <div className="hidden xl:block">
            {currentHotel.amenities && (
              <>
                <h4 className="font-bold capitalize text-casper-400">
                  amenities
                </h4>
                <div className="flex flex-wrap">
                  {currentHotel.amenities.map((item) => (
                    <span key={item} className="text-sm">
                      {item} &bull;&nbsp;
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="text-sm lg:text-base">
        <h3 className="font-bold capitalize text-casper-400">about hotel</h3>
        <p className="text-justify mb-3">{currentHotel.description}</p>

        <div className="mb-3 xl:hidden">
          {currentHotel.amenities && (
            <div>
              <h4 className="font-bold capitalize text-casper-400">
                amenities
              </h4>
              <div className="flex flex-wrap">
                {currentHotel.amenities.map((item) => (
                  <span key={item}>{item}&bull;</span>
                ))}
              </div>
            </div>
          )}
        </div>

        {currentHotel.transit && (
          <h4 className="font-bold capitalize text-casper-400">transit</h4>
        )}
        <p className="text-justify mb-3">{currentHotel?.transit}</p>

        {currentHotel.access && (
          <h4 className="font-bold capitalize text-casper-400">access</h4>
        )}
        <p className="text-justify mb-3">{currentHotel?.access}</p>

        {currentHotel.house_rules && (
          <h4 className="font-bold capitalize text-casper-400">house rules</h4>
        )}
        <p className="text-justify mb-3">{currentHotel?.house_rules}</p>
      </div>
    </div>
  );
}

export default SingleHotel;
