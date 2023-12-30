import { HiOutlineCursorClick } from "react-icons/hi";
import { HiPlus, HiOutlineArrowUturnLeft } from "react-icons/hi2";

import { useNavigate } from "react-router-dom";
import { useBookmarks } from "../contexts/BookmarksProvider";
import { useEffect, useState } from "react";

import useUrlLocation from "../hooks/useUrlLocation";
import axios from "axios";
import Loader from "./Loader";
import ReactCountryFlag from "react-country-flag";

const BASE_GEOCODING_URL =
  "https://api.bigdatacloud.net/data/reverse-geocode-client";

function AddNewBookmark() {
  const navigate = useNavigate();
  const [lat, lng] = useUrlLocation();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [isLoadingGeoCoding, setIsLoadingGeoCoding] = useState(false);
  const [geoCodingError, setGeoCodingError] = useState(null);
  const { createBookmark } = useBookmarks();

  useEffect(() => {
    if (!lat || !lng) return;
    async function getLocation() {
      setIsLoadingGeoCoding(true);
      setGeoCodingError(null);
      try {
        const { data } = await axios.get(
          `${BASE_GEOCODING_URL}?latitude=${lat}&longitude=${lng}`
        );
        if (!data.countryCode) throw new Error("this location is not a city!");

        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
        setCountryCode(data.countryCode);
      } catch (error) {
        setGeoCodingError(error.message);
      } finally {
        setIsLoadingGeoCoding(false);
      }
    }
    getLocation();
  }, [lat, lng]);

  const handelSubmit = async (e) => {
    e.preventDefault();
    if (!cityName || !country) return;
    const newBookmark = {
      cityName,
      country,
      countryCode,
      latitude: lat,
      longitude: lng,
      host_location: cityName + " " + country,
    };

    await createBookmark(newBookmark);
    navigate("/bookmarks");
  };

  if (isLoadingGeoCoding) {
    return <Loader />;
  }

  return (
    <div className="h-full">
      <div className="flex items-center justify-between mb-4 max-w-lg mx-auto">
        <h2 className="text-center capitalize leading-8 md:text-lg xl:text-xl font-thin tracking-widest">
          add new bookmark
        </h2>
        <button
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
          className="button bg-shark-950"
        >
          <HiOutlineArrowUturnLeft className="w-5 h-5 stroke-casper-400" />
        </button>
      </div>

      {geoCodingError && (
        <p className="text-casper-400 text-center capitalize tracking-widest">
          {geoCodingError}
          <span className="text-xs text-gray-500 flex items-center justify-center gap-x-1 pt-2">
            <HiOutlineCursorClick className="w-4 h-4" />
            click somewhere else on the map to add a new bookmark.
          </span>
        </p>
      )}
      {!geoCodingError && (
        <form
          action=""
          onSubmit={handelSubmit}
          className="flex flex-col gap-y-3 capitalize mb-4 w-full max-w-lg mx-auto text-sm md:text-base"
        >
          <div className="flex flex-col gap-y-2">
            <label
              htmlFor="cityName"
              className="text-casper-400 text-xs md:text-sm"
            >
              city name :
            </label>
            <input
              value={cityName}
              type="text"
              name="cityName"
              id="cityName"
              className="bg-shark-950 py-1.5 md:py-1 px-4 rounded-full focus:outline-none"
              onChange={(e) => setCityName(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-y-2 mb-4">
            <label
              htmlFor="country"
              className="text-casper-400 text-xs md:text-sm"
            >
              country :
            </label>
            <div className="bg-shark-950 px-4 rounded-full flex items-center justify-between gap-x-2">
              <input
                value={country}
                type="text"
                name="country"
                id="country"
                className="bg-transparent flex-1 focus:outline-none text-ellipsis py-1.5 md:py-1"
                onChange={(e) => setCountry(e.target.value)}
              />
              <ReactCountryFlag svg countryCode={countryCode} />
            </div>
          </div>

          <button
            type="submit"
            className="flex items-center justify-center gap-x-2 bg-saffron-300 text-shark-950 font-semibold uppercase px-5 py-1.5 rounded-full text-sm md:text-base"
          >
            <HiPlus className="w-5 h-5" />
            add
          </button>
        </form>
      )}
    </div>
  );
}

export default AddNewBookmark;
