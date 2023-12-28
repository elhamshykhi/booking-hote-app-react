import {
  MapPinIcon,
  CalendarDaysIcon,
  MagnifyingGlassIcon,
  MinusIcon,
  PlusIcon,
  AdjustmentsHorizontalIcon,
} from "@heroicons/react/24/outline";
import { useRef, useState } from "react";
import useOutsideClick from "../hooks/useOutsideClick";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

import { DateRange } from "react-date-range";
import { format } from "date-fns";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

function SearchBar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [destination, setDestination] = useState(
    searchParams.get("destination") || ""
  );
  const [isOpenOptions, setIsOpenOptions] = useState(false);

  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const [isOpenDate, setIsOpenDate] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const dateRangeRef = useRef();
  useOutsideClick(
    dateRangeRef,
    () => setIsOpenDate(false),
    "dateRangeDropDown"
  );

  const navigate = useNavigate();

  const handleOptions = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "inc" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const handleSearch = () => {
    const encodedParams = createSearchParams({
      date: JSON.stringify(date),
      options: JSON.stringify(options),
      destination,
    });

    navigate({ pathname: "/hotels", search: encodedParams.toString() });
  };

  return (
    <div className="flex flex-col w-full text-xs lg:text-sm gap-y-1.5 sm:flex-row md:justify-between sm:gap-x-2 flex-wrap md:flex-nowrap">
      {/* destination */}
      <div className="flex items-center gap-x-2 border border-saffron-300 rounded-full py-1 px-1.5 sm:flex-1">
        <MapPinIcon className="w-5 h-5 stroke-saffron-300" />
        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="Where to go?"
          name="destination"
          id="destination"
          className="bg-transparent w-5/6 placeholder:text-casper-400 focus:outline-none"
          autoComplete="off"
        />
      </div>

      {/* date picker */}
      <div className="flex relative items-center gap-x-2 border border-saffron-300 rounded-full cursor-pointer py-1 px-1.5 sm:w-fit md:flex-1">
        <CalendarDaysIcon className="w-5 h-5 stroke-saffron-300" />
        <div
          onClick={() => setIsOpenDate(!isOpenDate)}
          id="dateRangeDropDown"
          className="w-full capitalize"
        >
          {`${format(date[0].startDate, "MM/dd/yyyy")}`}
          <span className="text-casper-400">&nbsp; to &nbsp;</span>
          {`${format(date[0].endDate, "MM/dd/yyyy")}`}
        </div>
        {isOpenDate && (
          <div ref={dateRangeRef}>
            <DateRange
              onChange={(item) => setDate([item.selection])}
              ranges={date}
              minDate={new Date()}
              moveRangeOnFirstSelection={true}
              rangeColors={["#f6c634", "#eff253", "#a89eee"]}
              className="absolute top-[calc(100%_+_2px)] z-40 rounded-2xl shadow-lg overflow-hidden w-[97vw] max-w-xs left-1/2 -translate-x-1/2"
            />
          </div>
        )}
      </div>

      {/* select options */}
      <div className="relative border border-saffron-300 rounded-full px-1.5 sm:w-fit md:flex-1 cursor-pointer">
        <div
          onClick={() => setIsOpenOptions((prev) => !prev)}
          className="flex items-center gap-x-2 py-1"
        >
          <AdjustmentsHorizontalIcon className="w-5 h-5 stroke-saffron-300" />

          <div
            id="optionDropDown"
            className="capitalize w-full py-0.5 text-casper-400"
          >
            <span className="text-white">{options.adult}</span>
            &nbsp;adult &bull;&nbsp;
            <span className="text-white">{options.children}</span>
            &nbsp;children &bull;&nbsp;
            <span className="text-white">{options.room}</span>
            &nbsp;room
          </div>
        </div>

        {isOpenOptions && (
          <GuestOptionsList
            options={options}
            handleOptions={handleOptions}
            setIsOpenOptions={setIsOpenOptions}
          />
        )}
      </div>

      {/* search buttons */}
      <button
        onClick={handleSearch}
        className="text-xs text-center w-full capitalize border border-saffron-300 bg-saffron-300 text-shark-950 font-bold rounded-full py-1.5 md:w-8 md:h-8 md:flex md:items-center md:justify-center"
      >
        <span className="md:hidden">check availability</span>
        <MagnifyingGlassIcon className="w-5 h-5 stroke-shark-950 md:block hidden" />
      </button>
    </div>
  );
}

export default SearchBar;

function GuestOptionsList({ options, handleOptions, setIsOpenOptions }) {
  const optionsRef = useRef();
  useOutsideClick(optionsRef, () => setIsOpenOptions(false), "optionDropDown");

  return (
    <div
      ref={optionsRef}
      className="bg-oxfordBlue-900 shadow-lg z-50 p-4 capitalize absolute top-[calc(100%_+_2px)] w-full max-w-xs mx-auto inset-x-0 rounded-2xl"
    >
      <div className="flex flex-col gap-y-4 text-sm">
        <OptionItem
          handleOptions={handleOptions}
          type="adult"
          options={options}
          minLimit={1}
        />
        <OptionItem
          handleOptions={handleOptions}
          type="children"
          options={options}
          minLimit={0}
        />
        <OptionItem
          handleOptions={handleOptions}
          type="room"
          options={options}
          minLimit={1}
        />
      </div>
    </div>
  );
}

function OptionItem({ type, options, minLimit, handleOptions }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-casper-400">{type}</span>
      <div className="flex items-center justify-between gap-x-2.5 min-w-[85px]">
        <button
          onClick={() => handleOptions(type, "dec")}
          disabled={options[type] <= minLimit}
          className="bg-saffron-300 text-oxfordBlue-900 w-6 h-6 flex items-center justify-center rounded-md"
        >
          <MinusIcon className="w-4 h-4 stroke-2" />
        </button>
        <span className="">{options[type]}</span>
        <button
          onClick={() => handleOptions(type, "inc")}
          className="bg-saffron-300 text-oxfordBlue-900 w-6 h-6 flex items-center justify-center rounded-md"
        >
          <PlusIcon className="w-4 h-4 stroke-2" />
        </button>
      </div>
    </div>
  );
}
