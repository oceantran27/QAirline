'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { StepIndicator } from "@/components/checkin/step-indicator";
import { FlightDetailsStep } from "@/components/checkin/flight-details";
import { PassengerListStep } from "@/components/checkin/passenger-list";
import { SeatSelectionStep } from "@/components/checkin/seat-selection";
import { ConfirmationStep } from "@/components/checkin/confirmation-step";
import LoadingSkeleton from "@/components/checkin/loading-skeleton";
import { useToast } from "@/hooks/use-toast"; // Thêm import

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const steps = [
  { title: "Chi tiết chuyến bay", description: "Xem lại thông tin chuyến bay" },
  { title: "Hành khách", description: "Chọn hành khách" },
  { title: "Chọn ghế", description: "Chọn ghế của bạn" },
  { title: "Xác nhận", description: "Xác nhận thông tin" },
];

export default function CheckInPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [bookingID, setBookingID] = useState(null);
  const [email, setEmail] = useState(null);
  const [bookingData, setBookingData] = useState(null);
  const [departureFlight, setDepartureFlight] = useState(null);
  const [returnFlight, setReturnFlight] = useState(null);
  const [passengerList, setPassengerList] = useState({ departure: [], return: [] });
  const [seatData, setSeatData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const [currentTrip, setCurrentTrip] = useState("departure"); // "departure" hoặc "return"
  const { toast } = useToast(); // Sử dụng hook useToast

  useEffect(() => {
    if (router.query.bookingID) {
      setBookingID(router.query.bookingID);
    }
    if (router.query.email) {
      setEmail(router.query.email);
    }
  }, [router.query]);

  useEffect(() => {
    const fetchBooking = async () => {
      if (!bookingID) return;

      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Token không tồn tại.");

        const response = await fetch(`${API_BASE_URL}/api/booking/?id=${bookingID}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error(`Error fetching booking: ${response.statusText}`);

        const result = await response.json();
        setBookingData(result.data);

        // Fetch flight details
        if (result.data.tripType === "roundTrip") {
          await fetchFlightDetails(result.data.departureFlightId, "departure");
          await fetchFlightDetails(result.data.returnFlightId, "return");
        } else if (result.data.tripType === "oneWay") {
          await fetchFlightDetails(result.data.departureFlightId, "departure");
        }

        // Fetch passengers
        const departurePassengers = await fetchTickets(result.data.departureIdTickets);
        const returnPassengers =
          result.data.tripType === "roundTrip"
            ? await fetchTickets(result.data.returnIdTickets)
            : [];

        setPassengerList({ departure: departurePassengers, return: returnPassengers });
        setSeatData(generateSeatData());
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [bookingID]);

  const generateSeatData = () => {
    const columns = ["A", "B", "C", "D", "E", "G"];
    const rows = Array.from({ length: 44 }, (_, i) => i + 1);

    return rows.flatMap((row) =>
      columns.map((col) => ({
        id: `${row}${col}`,
        type:
          row === 18 || row === 32
            ? "blocked"
            : Math.random() < 0.3
            ? "unavailable"
            : "available",
      }))
    );
  };

  const [departureSeats, setDepartureSeats] = useState(generateSeatData());
  const [returnSeats, setReturnSeats] = useState(generateSeatData());

  const fetchFlightDetails = async (flightId, type) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/api/flight/?id=${flightId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error(`Error fetching flight: ${response.statusText}`);

      const result = await response.json();
      const flightData = result.data;

      const formattedFlight = {
        from: flightData.departureCity,
        to: flightData.arrivalCity,
        departureTime: new Date(flightData.departureTime.seconds * 1000).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        arrivalTime: new Date(flightData.arrivalTime.seconds * 1000).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        duration: calculateDuration(flightData.departureTime.seconds, flightData.arrivalTime.seconds),
        flightNumber: flightData.flightNumber,
        date: new Date(flightData.departureTime.seconds * 1000).toLocaleDateString("vi-VN"),
      };

      if (type === "departure") setDepartureFlight(formattedFlight);
      if (type === "return") setReturnFlight(formattedFlight);
    } catch (err) {
      console.error(err);
      setError(`Error fetching ${type} flight: ${err.message}`);
    }
  };

  const fetchTickets = async (ticketIds) => {
    try {
      const token = localStorage.getItem("token");
      const ticketPromises = ticketIds.map(async (ticketId) => {
        const response = await fetch(`${API_BASE_URL}/api/ticket/?id=${ticketId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error(`Error fetching ticket ${ticketId}: ${response.statusText}`);

        const result = await response.json();
        const ownerData = result.data.ownerData;

        return {
          id: ticketId,
          title: ownerData.gender === "Female" ? "Bà" : "Ông",
          name: `${ownerData.lastName} ${ownerData.firstName} `, 
          type: result.data.flightClass || "Economy",
          flightId: result.data.flightId, 
        };
      });

      return await Promise.all(ticketPromises);
    } catch (err) {
      console.error(err);
      setError(err.message);
      return [];
    }
  };

  const saveSelectedSeats = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token không tồn tại.");

      const payload = [
        ...passengerList.departure.map((passenger) => ({
          ticketId: passenger.id,
          seatCode: passenger.seat,
        })),
        ...passengerList.return.map((passenger) => ({
          ticketId: passenger.id,
          seatCode: passenger.seat,
        })),
      ].filter((entry) => entry.seatCode);

      if (payload.length === 0) {
        toast({
          title: "Không có ghế nào được chọn",
          description: "Vui lòng chọn ghế trước khi lưu.",
          variant: "destructive"
        });
        return;
      }

      const response = await fetch(`${API_BASE_URL}/api/ticket/update-seats`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const result = await response.json();
      toast({
        title: "Thành công",
        description: "Ghế đã được cập nhật thành công!",
        variant: "default"
      });
    } catch (error) {
      console.error("Error updating seats:", error);
      toast({
        title: "Cập nhật thất bại",
        description: "Cập nhật ghế thất bại, vui lòng thử lại.",
        variant: "destructive"
      });
    }
  };

  const calculateDuration = (departure, arrival) => {
    const durationInMinutes = (arrival - departure) / 60;
    const hours = Math.floor(durationInMinutes / 60);
    const minutes = durationInMinutes % 60;
    return `${hours}h ${minutes}m`;
  };

  const generateGate = () => `6`;

  const updateSeatsApi = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token không tồn tại.");

      const payload = [
        ...passengerList.departure.map((passenger) => ({
          ticketId: passenger.id,
          seatCode: passenger.seat,
        })),
        ...passengerList.return.map((passenger) => ({
          ticketId: passenger.id,
          seatCode: passenger.seat,
        })),
      ].filter((entry) => entry.seatCode); 

      if (payload.length === 0) {
        toast({
          title: "Không có ghế",
          description: "Không có ghế nào được chọn để lưu.",
          variant: "destructive"
        });
        return false;
      }

      const response = await fetch(`${API_BASE_URL}/api/ticket/update-seats`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const result = await response.json();
      toast({
        title: "Thành công",
        description: "Ghế đã được cập nhật thành công!",
        variant: "default"
      });
      return true;
    } catch (error) {
      console.error("Error updating seats:", error);
      toast({
        title: "Cập nhật thất bại",
        description: "Cập nhật ghế thất bại, vui lòng thử lại.",
        variant: "destructive"
      });
      return false;
    }
  };

  const handleContinue = async () => {
    if (currentStep === 2) {
      const isUpdated = await updateSeatsApi();
      if (!isUpdated) return; 
    }
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const handleSeatSelect = (seatId, customerId, tripType) => {
    setPassengerList((prev) => ({
      ...prev,
      [tripType]: prev[tripType].map((passenger) =>
        passenger.id === customerId ? { ...passenger, seat: seatId } : passenger
      ),
    }));

    const updateSeats = (seats) =>
      seats.map((seat) =>
        seat.id === seatId
          ? { ...seat, type: "selected" }
          : seat.type === "selected" &&
            passengerList[tripType].some((p) => p.seat === seat.id)
          ? { ...seat, type: "available" }
          : seat
      );

    if (tripType === "departure") {
      setDepartureSeats((prev) => updateSeats(prev));
    } else {
      setReturnSeats((prev) => updateSeats(prev));
    }
  };

  if (loading) {
    return <LoadingSkeleton />;
  }
  if (error) return <div className="container mx-auto p-6 text-red-600">Lỗi: {error}</div>;

  return (
    <div className="container mx-auto p-6">
      <StepIndicator currentStep={currentStep} steps={steps} />

      {currentStep === 0 && (
        <FlightDetailsStep
          flightDetails={departureFlight}
          returnFlightDetails={bookingData?.tripType === "roundTrip" ? returnFlight : null}
          passengerCount={passengerList.departure.length}
          onContinue={handleContinue}
          onCancel={() => window.history.back()}
        />
      )}

      {currentStep === 1 && (
        <PassengerListStep
          passengers={passengerList}
          onContinue={handleContinue}
          onBack={handleBack}
        />
      )}

      {currentStep === 2 && (
        <SeatSelectionStep
          passengers={currentTrip === "departure" ? passengerList.departure : passengerList.return}
          seats={currentTrip === "departure" ? departureSeats : returnSeats}
          onSeatSelect={(seatId, customerId) => handleSeatSelect(seatId, customerId, currentTrip)}
          onContinue={handleContinue}
          onBack={handleBack}
          onSwitchTrip={() => setCurrentTrip(currentTrip === "departure" ? "return" : "departure")}
          currentTrip={currentTrip}
        />
      )}

      {currentStep === 3 && (
        <ConfirmationStep
          bookingReference={bookingData?.bookingId || "Không rõ"}
          departurePassengers={passengerList.departure || []}
          returnPassengers={passengerList.return || []}
          departureFlight={{
            flightNumber: departureFlight?.flightNumber || "N/A",
            date: departureFlight?.date || "N/A",
            departureTime: departureFlight?.departureTime || "N/A",
            from: departureFlight?.from || "N/A",
            to: departureFlight?.to || "N/A",
            gate: generateGate(),
          }}
          returnFlight={
            bookingData?.tripType === "roundTrip"
              ? {
                  flightNumber: returnFlight?.flightNumber || "N/A",
                  date: returnFlight?.date || "N/A",
                  departureTime: returnFlight?.departureTime || "N/A",
                  from: returnFlight?.from || "N/A",
                  to: returnFlight?.to || "N/A",
                  gate: generateGate(),
                }
              : null
          }
          onBack={handleBack}
          onHome={() => router.push("/")}
        />
      )}
    </div>
  );
}
