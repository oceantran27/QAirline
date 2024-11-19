import { useState } from "react";
import { MdSearch, MdOutlineDateRange, MdLocationOn } from "react-icons/md";
import {
  FaLocationArrow,
  FaCalendarCheck,
  FaExchangeAlt,
} from "react-icons/fa";
import AirportSelect from "./AirportSelect";

import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { format } from "date-fns";

function SearchFlightsForm() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [tripType, setTripType] = useState("roundTrip");
  const [selectedDepartureDate, setSelectedDepartureDate] = useState(null);
  const [selectedReturnDate, setSelectedReturnDate] = useState(null);
  const [passengerCount, setPassengerCount] = useState(1);
  const [promoCode, setPromoCode] = useState("");

  // State for airport selection
  const [fromAirport, setFromAirport] = useState("");
  const [toAirport, setToAirport] = useState("");

  const handleExpand = () => {
    setIsExpanded(true);
  };

  const handleCollapse = () => {
    setIsExpanded(false);
  };

  // Function to swap the selected airports
  const swapAirports = () => {
    setFromAirport((prevFromAirport) => {
      setToAirport(prevFromAirport);
      return toAirport;
    });
  };

  return (
    <>
      {isExpanded && (
        <div
          className="fixed w-full h-full top-0 bg-transparent z-80"
          onClick={handleCollapse}
        ></div>
      )}

      <div
        className={`bg-white rounded-lg w-full z-40 relative ${
          isExpanded ? "p-6" : ""
        }`}
      >
        <div
          className={`grid lg:grid-cols-[1fr,auto,1fr,1fr,1fr,0.7fr] grid-cols-1 gap-2 items-center ${
                    isExpanded ? "gap-4" : ""
          }`}
          onClick={!isExpanded ? handleExpand : undefined}
        >
          {/* "From" Airport Field */}
          <span className="flex items-center py-7 relative pl-4">
            <MdLocationOn className="text-4xl text-orange" />
            <span className="flex flex-col justify-center absolute h-full left-16 right-2">
              <p className="text-gray text-sm">Từ</p>
              <AirportSelect
                placeholder="Chọn khu vực"
                value={fromAirport}
                onChange={setFromAirport}
              />
            </span>
          </span>

          {/* Swap Button */}
          <span className="flex items-center justify-center py-0">
            <button
              type="button"
              onClick={swapAirports}
              className="text-orange hover:text-darkorange"
            >
              <FaExchangeAlt size={24} />
            </button>
          </span>

          {/* "To" Airport Field */}
          <span className="flex items-center py-7 relative pl-4">
            <FaLocationArrow className="text-4xl text-orange" />
            <span className="flex flex-col justify-center absolute h-full left-16 right-2">
              <p className="text-gray text-sm">Đến</p>
              <AirportSelect
                placeholder="Chọn điểm đến"
                value={toAirport}
                onChange={setToAirport}
              />
            </span>
          </span>

          {/* Departure Date Field */}
          <span className="flex items-center py-7 relative pl-4 border-l border-gray-300">
            <MdOutlineDateRange className="text-4xl text-orange" />
            <span className="flex flex-col justify-center absolute h-full left-16 right-2">
              <p className="text-gray text-sm">Ngày đi</p>
              <Popover>
                <PopoverTrigger asChild>
                  <button className="text-sm font-bold w-full justify-start text-left pl-0 border-none">
                    {selectedDepartureDate
                      ? format(selectedDepartureDate, "PPP")
                      : "Chọn ngày đi"}
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 border-none">
                  <Calendar
                    mode="single"
                    selected={selectedDepartureDate}
                    onSelect={setSelectedDepartureDate}
                    className="border-none shadow-none"
                  />
                </PopoverContent>
              </Popover>
            </span>
          </span>

          {/* Return Date Field (if round trip) */}
          {tripType === "roundTrip" && (
            <span className="flex items-center py-7 relative pl-4">
              <FaCalendarCheck className="text-4xl text-orange" />
              <span className="flex flex-col justify-center absolute h-full left-16 right-2">
                <p className="text-gray text-sm">Ngày về</p>
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="text-sm font-bold w-full justify-start text-left pl-0 border-none">
                      {selectedReturnDate
                        ? format(selectedReturnDate, "PPP")
                        : "Chọn ngày về"}
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 border-none">
                    <Calendar
                      mode="single"
                      selected={selectedReturnDate}
                      onSelect={setSelectedReturnDate}
                      className="border-none shadow-none"
                    />
                  </PopoverContent>
                </Popover>
              </span>
            </span>
          )}

          {/* Search Button */}
          <button
            aria-label="Tìm chuyến bay"
            className="bg-orange text-white flex items-center justify-center h-full gap-0 py-6 outline-none border-none rounded-r-lg font-semibold text-sm transition duration-300 ease-in-out hover:shadow-lg hover:shadow-orange-500/50"
          >
            <MdSearch size={20} /> TÌM CHUYẾN
          </button>
        </div>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="mt-2 flex flex-col md:flex-row items-start gap-4">
              {/* Lựa chọn loại chuyến đi */}
              <RadioGroup
                value={tripType}
                onValueChange={setTripType}
                className="flex gap-4 flex-wrap"
              >
                <div className="flex items-center">
                  <RadioGroupItem value="roundTrip" id="roundTrip" />
                  <label
                    htmlFor="roundTrip"
                    className={`ml-2 py-2 px-4 rounded cursor-pointer ${
                      tripType === "roundTrip" ? "bg-orange text-white" : "bg-gray-200"
                    }`}
                  >
                    Khứ hồi
                  </label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem value="oneWay" id="oneWay" />
                  <label
                    htmlFor="oneWay"
                    className={`ml-2 py-2 px-4 rounded cursor-pointer ${
                      tripType === "oneWay" ? "bg-orange text-white" : "bg-gray-200"
                    }`}
                  >
                    Một chiều
                  </label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem value="multiLeg" id="multiLeg" />
                  <label
                    htmlFor="multiLeg"
                    className={`ml-2 py-2 px-4 rounded cursor-pointer ${
                      tripType === "multiLeg" ? "bg-orange text-white" : "bg-gray-200"
                    }`}
                  >
                    Nhiều chặng
                  </label>
                </div>
              </RadioGroup>

              {/* Số lượng hành khách */}
              <div className="flex items-center w-full md:max-w-xs md:ml-10 mt-4 md:mt-0">
                <label className="block text-gray whitespace-nowrap mr-3">
                  Số hành khách
                </label>
                <Input
                  type="number"
                  min="1"
                  value={passengerCount}
                  onChange={(e) => setPassengerCount(e.target.value)}
                  className="mt-1 w-full"
                  placeholder="Nhập số hành khách"
                />
              </div>

              {/* Chọn hạng chuyến bay */}
              <div className="flex items-center w-full md:max-w-xs gap-4 mt-4 md:mt-0">
                <p className="block text-gray whitespace-nowrap text-sm">Chọn hạng</p>
                <select
                  className="border w-full border-gray-300 rounded-lg p-2"
                  name="flightClass"
                  id="flightClass"
                >
                  <option value="economy">Phổ thông</option>
                  <option value="business">Thương gia</option>
                  <option value="firstClass">Hạng nhất</option>
                </select>
              </div>
            </div>
          )}

      </div>
    </>
  );
}

export default SearchFlightsForm;
