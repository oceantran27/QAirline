"use client";

import { FlightHeader } from "@/components/tours-component/FlightHeader";
import { FlightSideFilter } from "@/components/tours-component/FlightSideFilter";
import { FlightCard } from "@/components/tours-component/FlightCard";
import { SkeletonFlightCard } from "@/components/tours-component/SkeletonFlightCard";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useFlightData } from "@/hooks/useFlightData";
import { useRouter } from "next/router";
import airportsData from "@/data/airports_data.json";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

const getCityByCode = (code) => {
  for (const region of airportsData) {
    const airport = region.airports.find((airport) => airport.code === code);
    if (airport) return airport.city;
  }
  return "";
};
const formatDateToVietnamese = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return format(date, "dd/MM/yyyy", { locale: vi });
};
export default function FlightBooking() {
  const router = useRouter();
  const {
    fromAirport,
    toAirport,
    departureDate,
    returnDate,
    tripType,
    passengerCount,
  } = router.query;

  const departureCity = getCityByCode(fromAirport);
  const arrivalCity = getCityByCode(toAirport);
  const formattedDepartureDate = formatDateToVietnamese(departureDate);
  const formattedReturnDate = returnDate ? formatDateToVietnamese(returnDate) : "N/A";


  // Sử dụng hook để lấy dữ liệu chuyến bay
  const { flights, loading, error, filters, setFilters } = useFlightData(
    fromAirport,
    toAirport,
    departureDate
  );

  

  if (error) return <div>Có lỗi xảy ra: {error}</div>;

  return (
    <div>
      <FlightHeader
        departureCode={fromAirport}
        arrivalCode={toAirport}
        departureCity={departureCity}
        arrivalCity={arrivalCity}
        departureDate={formattedDepartureDate}
        returnDate={formattedReturnDate}
        passengers={`${passengerCount} hành khách`}
      />
      <div className="flex flex-col md:flex-row gap-4 p-4 bg-gray-100 min-h-screen max-w-6xl m-auto">
        <FlightSideFilter filters={filters} setFilters={setFilters} />
        <div className="flex-1 space-y-4">
          {loading && flights.length > 0 ? (
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
