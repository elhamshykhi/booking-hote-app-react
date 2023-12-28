import { BiLoaderAlt } from "react-icons/bi";

function Loader() {
  return (
    <div className="rounded-2xl p-4 h-[calc(100vh_-_336px)] sm:h-[calc(100vh-80px)] flex items-center justify-center">
      <div className="animate-spin text-saffron-300">
        <BiLoaderAlt className="w-8 h-8" />
      </div>
    </div>
  );
}

export default Loader;
