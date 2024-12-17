"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Plane, Clock, CreditCard } from "lucide-react";

export default function ConfirmationPage() {
  const router = useRouter();
  const { flightId, optionId, passengerCount } = router.query;

  const [flightData, setFlightData] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPaymentConfirmed, setIsPaymentConfirmed] = useState(false);
  const [error, setError] = useState(null);

  const [passengersCount, setPassengersCount] = useState(null); // State to store passengersCount

  // Lấy flightId, optionId và passengerCount từ URL
  useEffect(() => {
    if (!flightId || !optionId) {
      setError("Thiếu thông tin chuyến bay hoặc hạng vé.");
      setLoading(false);
      return;
    }

    const passengerCountFromURL = passengerCount ? parseInt(passengerCount) : 0;  // Convert về số
    setPassengersCount(passengerCountFromURL);  // Set state với số hành khách

    console.log("Flight ID:", flightId);
    console.log("Option ID:", optionId);
    console.log("Passenger Count:", passengersCount);  // Kiểm tra giá trị

    // Fetch dữ liệu chuyến bay từ API sau khi lấy flightId và optionId
    const fetchFlightData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:3030/api/flight/?id=${flightId}`);
        if (!response.ok) {
          throw new Error("Không thể lấy dữ liệu chuyến bay.");
        }
        const result = await response.json();
        const economyOptions = generateTicketOptions(result.data.basePrice, "economy");
        const businessOptions = generateTicketOptions(result.data.basePrice * 1.5, "business");

        const allOptions = [...economyOptions, ...businessOptions];
        const option = allOptions.find((opt) => opt.id === optionId);
        if (!option) {
          throw new Error("Không tìm thấy thông tin hạng vé.");
        }

        setFlightData({ ...result.data, economyOptions, businessOptions });
        setSelectedOption(option);
      } catch (err) {
        setError("Không thể tải dữ liệu chuyến bay.");
      } finally {
        setLoading(false);
      }
    };

    fetchFlightData();
  }, [flightId, optionId, passengerCount]);  // Điều chỉnh để phụ thuộc vào passengerCount

  // Hàm tạo thông tin hạng vé
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

  // Chuyển đổi thời gian từ seconds sang định dạng thời gian
  const formatTime = (seconds) => {
    return new Date(seconds * 1000).toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Chuyển đổi giá sang VND
  const formatCurrency = (value) =>
    value.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

  if (loading) {
    return (
      <div className="p-6">
        <Skeleton className="h-12 w-3/4 mb-4" />
        <Skeleton className="h-8 w-1/2 mb-4" />
        <Skeleton className="h-40 w-full mb-4" />
      </div>
    );
  }

  if (error || !flightData || !selectedOption) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-red-600 text-lg mb-4">{error || "Không tìm thấy thông tin chuyến bay."}</p>
        <Button
          onClick={() => router.push("/")}
          className="bg-orange-500 hover:bg-black text-white"
        >
          Quay về trang chủ
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="shadow-lg">
        <CardContent>
          <h2 className="text-2xl font-bold mb-6 text-orange-500 text-center">
            Thông Tin Chuyến Bay
          </h2>

          {/* Chi tiết chuyến bay */}
          <div className="space-y-4">
            <FlightDetail label="Số hiệu chuyến bay" value={flightData.flightNumber} />
            <FlightDetail label="Loại máy bay" value={flightData.aircraftType} />
            <FlightDetail
              label="Giờ khởi hành"
              value={formatTime(flightData.departureTime.seconds)}
              icon={<Clock className="text-orange-500 w-5 h-5" />}
            />
            <FlightDetail
              label="Giờ đến"
              value={formatTime(flightData.arrivalTime.seconds)}
              icon={<Clock className="text-orange-500 w-5 h-5" />}
            />
            <FlightDetail label="Sân bay khởi hành" value={flightData.departureAirport} />
            <FlightDetail label="Sân bay đến" value={flightData.arrivalAirport} />
            <FlightDetail
              label="Hạng vé"
              value={selectedOption.name}
              icon={<CreditCard className="text-orange-500 w-5 h-5" />}
            />
            <FlightDetail
              label="Giá vé"
              value={formatCurrency(selectedOption.price)}
              icon={<CreditCard className="text-orange-500 w-5 h-5" />}
            />
            <FlightDetail
              label="Số lượng hành khách"
              value={passengersCount ? passengersCount : "Không xác định"}
              icon={<Plane className="text-orange-500 w-5 h-5" />}
            />
          </div>

          {/* Nút thanh toán */}
          <div className="mt-6 flex justify-center">
            <Button
             variant="orange"
              onClick={() => setIsPaymentConfirmed(true)}
              className="hover:bg-black text-white"
            >
              Xác nhận và thanh toán
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Dialog Thanh toán thành công */}
      <Dialog open={isPaymentConfirmed} onOpenChange={setIsPaymentConfirmed}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Thanh toán thành công</DialogTitle>
            <DialogDescription>
              Cảm ơn quý khách đã đặt vé. Chúc quý khách có chuyến bay vui vẻ!
            </DialogDescription>
          </DialogHeader>
          <Button onClick={() => router.push("/")} className="mt-4 bg-orange hover:bg-black">
            Quay về trang chủ
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Component hiển thị chi tiết chuyến bay
function FlightDetail({ label, value, icon }) {
  return (
    <div className="flex items-center space-x-3">
      {icon}
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-lg font-semibold">{value}</p>
      </div>
    </div>
  );
}
