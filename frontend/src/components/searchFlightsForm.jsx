// components/searchFlightsForm.js
import { MdSearch, MdOutlineDateRange, MdLocationOn } from "react-icons/md";
import { FaLocationArrow, FaCalendarCheck } from "react-icons/fa";
import AirportSelect from "./airportSelect";

function SearchFlightsForm() {
  return (
    <div className="bg-white grid lg:grid-cols-5 grid-cols-1 rounded-lg w-full">
      <span className="flex items-center py-7 border-r border-gray relative pl-4">
        <MdLocationOn className="text-4xl text-orange" />
        <span className="flex flex-col justify-center absolute h-full left-16 right-2">
          <p className="text-gray text-sm">Từ</p>
          <AirportSelect placeholder="Chọn khu vực" />
        </span>
      </span>

      <span className="flex items-center py-7 border-r border-gray relative pl-4">
        <FaLocationArrow className="text-4xl text-orange" />
        <span className="flex flex-col justify-center absolute h-full left-16 right-2">
          <p className="text-gray text-sm">Đến</p>
          <AirportSelect placeholder="Chọn điểm đến" />
        </span>
      </span>

      <span className="flex items-center py-7 border-r border-gray relative pl-4">
        <MdOutlineDateRange className="text-4xl text-orange" />
        <span className="flex flex-col justify-center absolute h-full left-16 right-2">
          <p className="text-gray text-sm">Ngày đi</p>
          <input type="date" className="text-sm font-bold w-full" />
        </span>
      </span>

      <span className="flex items-center py-7 border-r border-gray relative pl-4">
        <FaCalendarCheck className="text-4xl text-orange" />
        <span className="flex flex-col justify-center absolute h-full left-16 right-2">
          <p className="text-gray text-sm">Ngày về</p>
          <input type="date" className="text-sm font-bold w-full" />
        </span>
      </span>

      <button
        aria-label="Tìm chuyến bay"
        className="bg-orange text-white flex items-center justify-center gap-4 py-6 outline-none border-none rounded-r-lg font-semibold text-sm transition duration-300 ease-in-out hover:shadow-lg hover:shadow-orange-500/50"
      >
        <MdSearch size={20} /> SEARCH
      </button>
    </div>
  );
}

export default SearchFlightsForm;
