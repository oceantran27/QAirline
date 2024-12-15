import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { FlightHeader } from "@/components/tours-component/FlightHeader";
import { FlightSideFilter } from "@/components/tours-component/FlightSideFilter";
import { FlightCard } from "@/components/tours-component/FlightCard";

export default function FlightBooking() {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const departureCity = "HAN"; // Giá trị cố định hoặc lấy từ form
  const arrivalCity = "SGN"; // Giá trị cố định hoặc lấy từ form
  const flightDate = "2024-12-14"; // Giá trị cố định hoặc lấy từ form

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
            departureTime: new Date(flight.departureTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            arrivalTime: new Date(flight.arrivalTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            departureCode: departureCity,
            arrivalCode: arrivalCity,
            duration: calculateDuration(flight.departureTime, flight.arrivalTime),
            airline: "VietNam Airline",
            economyPrice: flight.basePrice,
            businessPrice: flight.basePrice * 1.5, // Giá thương gia giả định
            seatsLeft: 10, // Cần bổ sung nếu API không cung cấp
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

  const calculateDuration = (departureTime, arrivalTime) => {
    const diff = new Date(arrivalTime) - new Date(departureTime);
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours} giờ ${minutes} phút`;
  };

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

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>Có lỗi xảy ra: {error}</div>;

  return (
    <div>
      <FlightHeader />
      <div className="flex flex-col md:flex-row gap-4 p-4 bg-gray-100 min-h-screen max-w-6xl m-auto">
        <FlightSideFilter />
        <div className="flex-1 space-y-4">
          <FlightCard flights={flights} />
          <div className="text-center text-sm text-gray-500">
            Có {flights.length} chuyến bay
          </div>
          <Button className="w-full bg-orange text-white">Quay lại trang chủ</Button>
        </div>
      </div>
    </div>
  );
}
