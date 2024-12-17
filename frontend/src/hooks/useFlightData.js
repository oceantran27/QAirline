// hooks của flights/index.jsx
import { useState, useEffect } from "react";

export const useFlightData = (departureCity, arrivalCity, flightDate) => {
  const [flights, setFlights] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filters, setFilters] = useState({
    budget: [1929000, 6400000],
    departureTime: "all",
  });

  useEffect(() => {
    const fetchFlights = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:3030/api/flight/search?departureCity=${departureCity}&arrivalCity=${arrivalCity}&flightDate=${flightDate}`
        );
        const result = await response.json();
        if (result.data) {
          const transformedFlights = result.data.map((flight) => ({
            id: flight.flightId,
            departureTime: new Date(flight.departureTime).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            arrivalTime: new Date(flight.arrivalTime).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            departureCode: departureCity,
            arrivalCode: arrivalCity,
            duration: calculateDuration(flight.departureTime, flight.arrivalTime),
            airline: "VietNam Airline",
            economyPrice: flight.basePrice,
            businessPrice: flight.basePrice * 1.5,
            seatsLeft: 10,
            flightNumber: flight.flightNumber,
            departureAirport: flight.departureAirport,
            arrivalAirport: flight.arrivalAirport,
            departureDate: new Date(flight.departureTime).toLocaleDateString(),
            aircraft: flight.aircraftType,
            economyOptions: generateTicketOptions(flight.basePrice, "economy"),
            businessOptions: generateTicketOptions(flight.basePrice * 1.5, "business"),
          }));
          setFlights(transformedFlights);
        } else {
          throw new Error(result.message || "Dữ liệu không hợp lệ");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, [departureCity, arrivalCity, flightDate]);

  useEffect(() => {
    const applyFilters = () => {
      return flights.filter((flight) => {
        const inBudget =
          flight.economyPrice >= filters.budget[0] &&
          flight.economyPrice <= filters.budget[1];

        const hour = new Date(flight.departureTime).getHours();
        const inTimeRange =
          filters.departureTime === "all" ||
          (filters.departureTime === "morning" && hour >= 0 && hour < 12) ||
          (filters.departureTime === "afternoon" && hour >= 12 && hour < 18) ||
          (filters.departureTime === "evening" && hour >= 18 && hour < 24);

        return inBudget && inTimeRange;
      });
    };

    setFilteredFlights(applyFilters());
  }, [flights, filters]);


  const generateTicketOptions = (basePrice, type) => {
    const changeFee = type === "economy" ? 860000 : 360000;
    const refundFee = type === "economy" ? 860000 : 360000;
    const checkedBaggage = type === "economy" ? "1 x 23 kg" : "2 x 32 kg";
    const carryOn = "Không quá 12kg";
    return [
      {
        id: `${type}1`,
        name: type === "economy" ? "Phổ Thông Tiêu Chuẩn" : "Thương Gia Tiêu Chuẩn",
        price: basePrice,
        changeFee,
        refundFee,
        checkedBaggage,
        carryOn,
      },
      {
        id: `${type}2`,
        name: type === "economy" ? "Phổ Thông Linh Hoạt" : "Thương Gia Linh Hoạt",
        price: basePrice + 500000,
        changeFee: changeFee / 2,
        refundFee: refundFee / 2,
        checkedBaggage,
        carryOn,
      },
    ];
  };

  const calculateDuration = (departureTime, arrivalTime) => {
    const diff = new Date(arrivalTime) - new Date(departureTime);
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours} giờ ${minutes} phút`;
  };

  return {
    flights,
    filteredFlights,
    loading,
    error,
    filters,
    setFilters,
  };
};