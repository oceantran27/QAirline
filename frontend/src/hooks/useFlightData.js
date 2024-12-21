import { useState, useEffect, useRef, useCallback } from "react";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Các constants...

export const useFlightData = (departureCity, arrivalCity, flightDate) => {
  const [flights, setFlights] = useState([]);
  const [returnFlights, setReturnFlights] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const DEFAULT_BUDGET_RANGE = { min: 100, max: 1000000 };

  const [filters, setFilters] = useState({
    budget: DEFAULT_BUDGET_RANGE,
    departureTime: "all",
  });

  const initialFetchDoneRef = useRef(false);

  // Memo hóa transformFlights
  const transformFlights = useCallback((data, from, to) => {
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
  }, []);

  // Sử dụng transformFlights đã được memo hóa
  const fetchFlights = useCallback(
    async (from, to, date, setState) => {
      try {
        const url = `${API_BASE_URL}/api/flight/search?departureCity=${from}&arrivalCity=${to}&flightDate=${date}`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Error calling API search: ${response.statusText}`);
        }

        const result = await response.json();
        if (result.data) {
          const transformed = transformFlights(result.data, from, to);
          setState(transformed);
        } else {
          throw new Error(result.message || "Invalid data from API search");
        }
      } catch (err) {
        setError(err.message);
      }
    },
    [transformFlights] // Thêm dependency
  );

  const fetchSuggestedFlights = useCallback(
    async (setState) => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/flight/suggest`);

        if (!response.ok) {
          throw new Error(`Error calling API suggest: ${response.statusText}`);
        }

        const result = await response.json();
        if (result.data) {
          const transformed = transformFlights(result.data);
          setState(transformed);
        } else {
          throw new Error(result.message || "Invalid data from API suggest");
        }
      } catch (err) {
        setError(err.message);
      }
    },
    [transformFlights] // Thêm dependency
  );

  // useEffect...
  // Các hàm khác không đổi...

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
