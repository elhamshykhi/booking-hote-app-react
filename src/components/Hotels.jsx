import { Link } from "react-router-dom";
import Loader from "./Loader";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { useHotels } from "../contexts/HotelsProvider";

function Hotels() {
  const { isLoading, hotels } = useHotels();

  if (isLoading) return <Loader />;

  if (!hotels.length)
    return (
      <p className="text-casper-400 text-center capitalize tracking-widest">
        <h2 className="text-white text-center capitalize md:text-lg xl:text-xl font-thin mb-4 tracking-widest col-span-12">
          search result ({hotels.length})
        </h2>
        <span className="text-xs text-gray-500 pt-2">
          there is not an available hotel.
        </span>
      </p>
    );

  return (
    <div className="py-4 sm:py-0 sm:h-full sm:overflow-y-auto sm:pr-2">
      <h2 className="text-center capitalize md:text-lg xl:text-xl font-thin mb-4 tracking-widest col-span-12">
        search result ({hotels.length})
      </h2>
      <div className="grid grid-cols-12 gap-x-2 gap-y-4 sm:gap-x-4">
        {hotels.map((item) => {
          return (
            <Link
              key={item.id}
              to={`/hotels/${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
              className={`col-span-12 md:col-span-6 lg:col-span-4 bg-transparent mb-8 flex flex-col xs:flex-row sm:flex-col rounded-3xl overflow-hidden`}
            >
              <div className="xs:w-2/5 sm:w-auto">
                <img
                  src={item.picture_url.url}
                  alt={item.name}
                  className="h-40 xs:h-full sm:h-40 w-full object-cover object-center"
                />
              </div>

              <div className="bg-shark-950 h-full flex flex-col gap-y-1 p-4 xs:w-3/5 sm:w-auto">
                {/* name */}
                <p className="text-sm font-bold text-ellipsis overflow-hidden whitespace-nowrap">
                  {item.name}
                </p>

                {/* location */}
                <p className="flex items-center gap-x-1 mb-2">
                  <MapPinIcon className="w-5 h-5 stroke-saffron-300" />
                  <span className="text-casper-400 text-xs font-thin">
                    {item.smart_location}
                  </span>
                </p>

                {/* summary */}
                <div className="hotel text-sm">
                  <p>{item.summary}</p>
                </div>

                {/* price */}
                <p className="mt-auto text-xs font-thin">
                  <span className="font-bold text-saffron-300 text-sm">
                    ${item.price}
                  </span>
                  &nbsp;per night
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Hotels;
