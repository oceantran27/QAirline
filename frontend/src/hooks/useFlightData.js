import { useState, useEffect, useRef } from "react";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Định nghĩa các hằng số để tránh "magic number"
const DEFAULT_BUDGET_RANGE = [100000, 4000000];
const BUSINESS_PRICE_MULTIPLIER = 1.5;
const ECONOMY_CHANGE_FEE = 860000;
const BUSINESS_CHANGE_FEE = 360000;
const SUGGESTED_MIN_SEATS = 10;
const SUGGESTED_MAX_SEATS = 100;

export const useFlightData = (departureCity, arrivalCity, flightDate) => {
  const [flights, setFlights] = useState([]);
  const [returnFlights, setReturnFlights] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filters, setFilters] = useState({
    budget: DEFAULT_BUDGET_RANGE,
    departureTime: "all",
  });

  const initialFetchDoneRef = useRef(false);

  /**
   * Hàm fetch dữ liệu chuyến bay chung
   * @param {string} from
   * @param {string} to
   * @param {string} date
   * @param {Function} setState - hàm setFlights hoặc setReturnFlights
   */
  const fetchFlights = async (from, to, date, setState) => {
    try {
      const url = `${API_BASE_URL}/api/flight/search?departureCity=${from}&arrivalCity=${to}&flightDate=${date}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Lỗi khi gọi API search: ${response.statusText}`);
      }

      const result = await response.json();
      if (result.data) {
        const transformed = transformFlights(result.data, from, to);
        setState(transformed);
      } else {
        throw new Error(result.message || "Dữ liệu không hợp lệ từ API search");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  /**
   * Hàm fetch dữ liệu chuyến bay gợi ý (suggest)
   * @param {Function} setState - hàm setFlights
   */
  const fetchSuggestedFlights = async (setState) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/flight/suggest`);

      if (!response.ok) {
        throw new Error(`Lỗi khi gọi API suggest: ${response.statusText}`);
      }

      const result = await response.json();
      if (result.data) {
        const transformed = transformFlights(result.data);
        setState(transformed);
      } else {
        throw new Error(
          result.message || "Dữ liệu không hợp lệ từ API suggest"
        );
      }
    } catch (err) {
      setError(err.message);
    }
  };

  /**
   * Chuyển dữ liệu API sang định dạng cần thiết
   * @param {Array} data - dữ liệu trả về từ API
   * @param {string} [from] - city code khởi hành
   * @param {string} [to] - city code đến
   * @returns {Array}
   */
  const transformFlights = (data, from, to) => {
    return data.map((flight) => {
      const departureDateObj = new Date(flight.departureTime);
      const arrivalDateObj = new Date(flight.arrivalTime);

      const economyPrice = flight.basePrice || 0;
      const businessPrice = economyPrice * BUSINESS_PRICE_MULTIPLIER;

      return {
        id: flight.flightId,
        departureTimeRaw: departureDateObj,
        arrivalTimeRaw: arrivalDateObj,
        departureTime: formatTime(departureDateObj),
        arrivalTime: formatTime(arrivalDateObj),
        departureCode: from || flight.departureCityCode,
        arrivalCode: to || flight.arrivalCityCode,
        duration: calculateDuration(flight.departureTime, flight.arrivalTime),
        airline: flight.airline || "VietNam Airline",
        economyPrice,
        businessPrice,
        seatsLeft: randomSeats(SUGGESTED_MIN_SEATS, SUGGESTED_MAX_SEATS),
        flightNumber: flight.flightNumber,
        departureAirport: flight.departureAirport,
        arrivalAirport: flight.arrivalAirport,
        departureDate: departureDateObj.toLocaleDateString(),
        aircraft: flight.aircraftType,
        economyOptions: generateTicketOptions(economyPrice, "economy"),
        businessOptions: generateTicketOptions(businessPrice, "business"),
      };
    });
  };

  /**
   * Lấy dữ liệu chuyến bay một chiều hoặc gợi ý khi mount
   */
  useEffect(() => {
    const loadFlights = async () => {
      // Ngăn không cho chạy lại khi Strict Mode re-render
      if (initialFetchDoneRef.current) return;
      initialFetchDoneRef.current = true;

      setLoading(true);
      if (departureCity && arrivalCity && flightDate) {
        await fetchFlights(departureCity, arrivalCity, flightDate, setFlights);
      } else {
        await fetchSuggestedFlights(setFlights);
      }
      setLoading(false);
    };

    loadFlights();
  }, [departureCity, arrivalCity, flightDate]);

  /**
   * Fetch dữ liệu chuyến bay chiều về
   * @param {string} from
   * @param {string} to
   * @param {string} date
   */
  const fetchReturnFlights = async (from, to, date) => {
    setLoading(true);
    await fetchFlights(from, to, date, setReturnFlights);
    setLoading(false);
  };

  /**
   * Áp dụng filter lên danh sách flights
   */
  const applyFilters = () => {
    return flights.filter((flight) => {
      const inBudget =
        flight.economyPrice >= filters.budget[0] &&
        flight.economyPrice <= filters.budget[1];

      const hour = flight.departureTimeRaw.getHours();
      const inTimeRange =
        filters.departureTime === "all" ||
        (filters.departureTime === "morning" && hour >= 0 && hour < 12) ||
        (filters.departureTime === "afternoon" && hour >= 12 && hour < 18) ||
        (filters.departureTime === "evening" && hour >= 18 && hour < 24);

      return inBudget && inTimeRange;
    });
  };

  useEffect(() => {
    setFilteredFlights(applyFilters());
  }, [applyFilters]);

  /**
   * Sinh ra các option vé dựa trên loại ghế
   * @param {number} basePrice
   * @param {string} type - "economy" hoặc "business"
   */
  const generateTicketOptions = (basePrice, type) => {
    const changeFee =
      type === "economy" ? ECONOMY_CHANGE_FEE : BUSINESS_CHANGE_FEE;
    const refundFee =
      type === "economy" ? ECONOMY_CHANGE_FEE : BUSINESS_CHANGE_FEE;
    const checkedBaggage = type === "economy" ? "1 x 23 kg" : "2 x 32 kg";
    const carryOn = "Không quá 12kg";
    const standardName =
      type === "economy" ? "Phổ Thông Tiêu Chuẩn" : "Thương Gia Tiêu Chuẩn";
    const flexibleName =
      type === "economy" ? "Phổ Thông Linh Hoạt" : "Thương Gia Linh Hoạt";

    return [
      {
        id: `${type}1`,
        name: standardName,
        price: basePrice,
        changeFee,
        refundFee,
        checkedBaggage,
        carryOn,
      },
      {
        id: `${type}2`,
        name: flexibleName,
        price: basePrice + 500000,
        changeFee: changeFee / 2,
        refundFee: refundFee / 2,
        checkedBaggage,
        carryOn,
      },
    ];
  };

  /**
   * Tính thời gian bay
   */
  const calculateDuration = (departureTime, arrivalTime) => {
    const diff = new Date(arrivalTime) - new Date(departureTime);
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours} giờ ${minutes} phút`;
  };

  /**
   * Định dạng giờ theo định dạng HH:MM
   */
  const formatTime = (dateObj) => {
    return dateObj.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  /**
   * Sinh ngẫu nhiên số ghế còn lại
   */
  const randomSeats = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  return {
    flights,
    returnFlights,
    fetchReturnFlights,
    filteredFlights,
    loading,
    error,
    filters,
    setFilters,
  };
};
