"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

import { FlightHeader } from "@/components/tours-component/FlightHeader";
import { FlightSideFilter } from "@/components/tours-component/FlightSideFilter";
import { FlightCard } from "@/components/tours-component/FlightCard";
import { SkeletonFlightCard } from "@/components/tours-component/SkeletonFlightCard";
import { Button } from "@/components/ui/button";

import { useFlightData } from "@/hooks/useFlightData";
import airportsData from "@/data/airports_data.json";

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

  const isUrlDataMissing = !fromAirport || !toAirport || !departureDate;

  const {
    flights,
    returnFlights,
    fetchReturnFlights,
    filteredFlights,
    loading,
    error,
    filters,
    setFilters,
  } = useFlightData(fromAirport, toAirport, departureDate);

  const departureCity = fromAirport ? getCityByCode(fromAirport) : "Không xác định";
  const arrivalCity = toAirport ? getCityByCode(toAirport) : "Không xác định";
  const formattedDepartureDate = formatDateToVietnamese(departureDate);
  const formattedReturnDate = returnDate ? formatDateToVietnamese(returnDate) : "N/A";

  const [isSelectingReturn, setIsSelectingReturn] = useState(false);
  const [selectedDepartureFlight, setSelectedDepartureFlight] = useState(null);

  const handleSelectDepartureFlight = (flight) => {
    setSelectedDepartureFlight(flight);

    if (tripType === "roundTrip") {
      setIsSelectingReturn(true);
      fetchReturnFlights(toAirport, fromAirport, returnDate);
    } else {
      router.push({
        pathname: "/confirm",
        query: {
          departureFlightId: flight.id,
          departureOptionId: flight.selectedOptionId,
          passengerCount,
        },
      });
    }
  };

  const handleSelectReturnFlight = (flight) => {
    router.push({
      pathname: "/confirm",
      query: {
        departureFlightId: selectedDepartureFlight.id,
        departureOptionId: selectedDepartureFlight.selectedOptionId,
        returnFlightId: flight.id,
        returnOptionId: flight.selectedOptionId,
        passengerCount,
      },
    });
  };

  if (error) return <div>Có lỗi xảy ra: {error}</div>;

  return (
    <div>
      <FlightHeader
        departureCode={fromAirport || "N/A"}
        arrivalCode={toAirport || "N/A"}
        departureCity={departureCity}
        arrivalCity={arrivalCity}
        departureDate={formattedDepartureDate}
        returnDate={formattedReturnDate}
        passengers={`${passengerCount || 1} hành khách`}
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
            <FlightCard
              flights={isSelectingReturn ? returnFlights : flights}
              passengerCount={passengerCount}
              onSelectFlight={
                isSelectingReturn ? handleSelectReturnFlight : handleSelectDepartureFlight
              }
            />
          )}

          <div className="text-center text-sm text-gray-500">
            {loading ? (
              <span>Đang tải chuyến bay...</span>
            ) : isSelectingReturn ? (
              <span>Có {returnFlights.length} chuyến bay quay về</span>
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
      </div>
    </div>
  );
}
