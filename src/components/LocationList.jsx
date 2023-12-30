import { HiOutlineMapPin } from "react-icons/hi2";
import useFetch from "../hooks/useFetch";
import { BiBath, BiBed, BiUser } from "react-icons/bi";
import Loader from "./Loader";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";

function LocationList() {
  const { data, isLoading } = useFetch("http://localhost:5000/hotels", "");

  if (isLoading) return <Loader />;

  return (
    <div className="">
      {/* header */}
      <div
        className={`h-72 sm:h-64 md:h-60 rounded-3xl bg-hero-pattern bg-center bg-cover bg-no-repeat mb-4 sm:mb-6 lg:mb-8 max-w-screen-xl mx-auto`}
      >
        <div className="flex flex-col px-4 pb-4 pt-2 bg-gradient-to-b from-shark-950 from-10% via-transparent via-60% to-transparent h-full w-full">
          <h1 className="text-center capitalize text-xl sm:text-2xl md:text-3xl">
            effortless bookings
            <br /> for&nbsp;
            <span className="italic text-saffron-300">leisure</span>
            &nbsp;travel or&nbsp;
            <span className="italic text-saffron-300">business</span>
          </h1>

          <div className="px-4 md:px-5 py-5 rounded-3xl md:rounded-full mt-auto bg-shark-950 bg-opacity-60 backdrop-blur-sm max-w-screen-lg mx-auto w-full">
            <SearchBar />
          </div>
        </div>
      </div>
      {/* location list */}
      <div className="px-4">
        <h2 className="text-center capitalize md:text-lg xl:text-xl font-thin mb-4 tracking-widest sm:mb-6 lg:mb-8">
          nearby locations
        </h2>

        <div className="grid grid-cols-12 gap-x-2 gap-y-4 sm:gap-x-4">
          {data.map((item) => {
            return (
              <Link
                className="bg-transparent mb-8 flex flex-col xs:flex-row sm:flex-col rounded-3xl overflow-hidden col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3"
                key={item.id}
                to={`/hotels/${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
              >
                <div className="xs:w-2/5 sm:w-auto">
                  <img
                    src={item.picture_url.url}
                    alt={item.name}
                    className="h-40 w-full object-cover object-center bg-slate-500"
                  />
                </div>

                <div className="bg-oxfordBlue-900 h-full flex flex-col gap-y-1 p-4 xs:w-3/5 sm:w-auto">
                  {/* name */}
                  <p className="text-sm font-bold text-ellipsis overflow-hidden whitespace-nowrap">
                    {item.name}
                  </p>
                  {/* location */}
                  <p className="flex items-center gap-x-1 mb-2">
                    <HiOutlineMapPin className="w-5 h-5 stroke-saffron-300" />
                    <span className="text-casper-400 text-xs font-thin">
                      {item.smart_location}
                    </span>
                  </p>
                  {/* facilities */}
                  <div className="mt-auto flex items-center justify-between mb-3">
                    <div className="flex items-center gap-x-1 capitalize font-thin text-xs">
                      <BiBed size="18px" />
                      <span className="leading-5">
                        <span className="font-thin text-base">{item.beds}</span>
                        &nbsp; bed
                      </span>
                    </div>

                    <div className="flex items-center gap-x-1 capitalize font-thin text-xs">
                      <BiBath size="18px" />
                      <span className="leading-5">
                        <span className="font-thin text-base">
                          {item.bathrooms}
                        </span>
                        &nbsp; bath
                      </span>
                    </div>

                    <div className="flex items-center gap-x-1 capitalize font-thin text-xs">
                      <BiUser size="18px" />
                      <span className="leading-5">
                        <span className="font-thin text-base">
                          {item.accommodates}
                        </span>
                        &nbsp; guest
                      </span>
                    </div>
                  </div>

                  {/* price */}
                  <p className="text-xs sm:text-sm font-thin">
                    <span className="font-bold text-saffron-300 text-sm sm:text-base">
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
    </div>
  );
}

export default LocationList;
