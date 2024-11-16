// components/SearchFlightsForm.js
import { useState } from "react";
import { MdSearch, MdOutlineDateRange, MdLocationOn } from "react-icons/md";
import { FaLocationArrow, FaCalendarCheck } from "react-icons/fa";
import AirportSelect from "./AirportSelect";
import { Calendar } from "@/components/ui/calendar"

function SearchFlightsForm() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [tripType, setTripType] = useState("roundTrip"); // "roundTrip", "oneWay", "multiLeg"

  const handleExpand = () => {
    setIsExpanded(true);
  };

  const handleCollapse = () => {
    setIsExpanded(false);
  };

  return (
    <>
      {isExpanded && (
        <div

          className="fixed w-full h-full top-0 bg-black bg-opacity-50 z-80"
          onClick={handleCollapse}
        ></div>
      )}

      <div
        className={`bg-white rounded-lg w-full z-40 relative ${
          isExpanded ? "p-6" : ""
        }`}
      >
        <div
          className={`grid lg:grid-cols-5 grid-cols-1 ${
            isExpanded ? "gap-4" : ""
          }`}
          onClick={!isExpanded ? handleExpand : undefined}
        >
          {/* Các trường nhập liệu ban đầu */}
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

        {/* Nội dung mở rộng */}
        {isExpanded && (
          <div className="mt-6">
            {/* Nút chọn loại chuyến bay */}
            <div className="flex gap-4 mb-4">
              <button
                className={`py-2 px-4 rounded ${
                  tripType === "roundTrip"
                    ? "bg-orange text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => setTripType("roundTrip")}
              >
                Khứ hồi
              </button>
              <button
                className={`py-2 px-4 rounded ${
                  tripType === "oneWay" ? "bg-orange text-white" : "bg-gray-200"
                }`}
                onClick={() => setTripType("oneWay")}
              >
                Một chiều
              </button>
              <button
                className={`py-2 px-4 rounded ${
                  tripType === "multiLeg"
                    ? "bg-orange text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => setTripType("multiLeg")}
              >
                Nhiều chặng
              </button>
            </div>

            {/* Số hành khách */}
            <div className="mb-4">
              <label className="block text-gray-700">Số hành khách</label>
              <input
                type="number"
                min="1"
                className="w-full border border-gray-300 rounded py-2 px-3 mt-1"
                placeholder="Nhập số hành khách"
              />
            </div>

            {/* Mã khuyến mại */}
            <div className="mb-4">
              <label className="block text-gray-700">Mã khuyến mại</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded py-2 px-3 mt-1"
                placeholder="Nhập mã khuyến mại (nếu có)"
              />
            </div>

            {/* Nút tìm kiếm */}
            <button
              aria-label="Tìm chuyến bay"
              className="w-full bg-orange text-white py-3 rounded font-semibold text-sm transition duration-300 ease-in-out hover:shadow-lg hover:shadow-orange-500/50"
            >
              <MdSearch size={20} className="inline-block mr-2" />
              SEARCH
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default SearchFlightsForm;
