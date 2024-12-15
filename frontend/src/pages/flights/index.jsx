"use client";

import { FlightHeader } from "@/components/tours-component/FlightHeader";
import { FlightSideFilter } from "@/components/tours-component/FlightSideFilter";
import { FlightCard } from "@/components/tours-component/FlightCard";
import { SkeletonFlightCard } from "@/components/tours-component/SkeletonFlightCard";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useFlightData } from "@/hooks/useFlightData";

export default function FlightBooking() {
  const departureCity = "HAN";
  const arrivalCity = "SGN";
  const flightDate = "2024-12-14";

  const {
    flights,
    filteredFlights,
    loading,
    error,
    filters,
    setFilters,
  } = useFlightData(departureCity, arrivalCity, flightDate);

  const flightDetails = {
    departureCode: departureCity,
    arrivalCode: arrivalCity,
    departureCity: "Hà Nội",
    arrivalCity: "TP. Hồ Chí Minh",
    departureDate: new Date(flightDate).toLocaleDateString("vi-VN", {
      weekday: "short",
      day: "2-digit",
      month: "2-digit",
    }),
    returnDate: "N/A",
    passengers: "1",
  };

  if (error) return <div>Có lỗi xảy ra: {error}</div>;

  return (
    <div>
      <FlightHeader
        departureCode={flightDetails.departureCode}
        arrivalCode={flightDetails.arrivalCode}
        departureCity={flightDetails.departureCity}
        arrivalCity={flightDetails.arrivalCity}
        departureDate={flightDetails.departureDate}
        returnDate={flightDetails.returnDate}
        passengers={flightDetails.passengers}
      />
      <div className="flex flex-col md:flex-row gap-4 p-4 bg-gray-100 min-h-screen max-w-6xl m-auto">
        <FlightSideFilter filters={filters} setFilters={setFilters} />
        <div className="flex-1 space-y-4">
          {loading ? (
            <>
              <SkeletonFlightCard />
              <SkeletonFlightCard />
              <SkeletonFlightCard />
            </>
          ) : (
            <FlightCard flights={flights} />
          )}
          <div className="text-center text-sm text-gray-500">
            {loading ? (
              <span>Đang tải chuyến bay...</span>
            ) : (
              <span>Có {flights.length} chuyến bay</span>
            )}
          </div>
          <Link href="/">
            <Button variant="orange" className="w-full text-white" disabled={loading}>
                Quay lại trang chủ
            </Button>
          </Link>
        </div>
        {/* <div className="flex-1 space-y-4">
          {loading ? (
            <>
              <SkeletonFlightCard />
              <SkeletonFlightCard />
              <SkeletonFlightCard />
            </>
          ) : filteredFlights.length > 0 ? (
            <FlightCard flights={filteredFlights} />
          ) : (
            <div className="text-center text-sm text-gray-500">
              Không tìm thấy chuyến bay phù hợp.
            </div>
          )}
          <div className="text-center text-sm text-gray-500">
            {loading ? (
              <span>Đang tải chuyến bay...</span>
            ) : (
              <span>Có {filteredFlights.length} chuyến bay</span>
            )}
          </div>
          <Link href="/">
            <Button variant="orange" className="w-full text-white" disabled={loading}>
              Quay lại trang chủ
            </Button>
          </Link>
        </div> */}
      </div>
    </div>
  );
}
