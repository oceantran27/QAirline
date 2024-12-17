"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Plane, Clock, CreditCard } from "lucide-react";

export default function ConfirmationPage() {
  const searchParams = useSearchParams(); // Lấy tham số từ URL
  const router = useRouter();

  const [flightId, setFlightId] = useState(null);
  const [optionId, setOptionId] = useState(null);
  const [flightData, setFlightData] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPaymentConfirmed, setIsPaymentConfirmed] = useState(false);
  const [error, setError] = useState(null);

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

  // Lấy flightId và optionId từ URL
  useEffect(() => {
    const flightIdFromParams = searchParams.get("flightId");
    const optionIdFromParams = searchParams.get("optionId");
    console.log("Flight ID:", flightIdFromParams);
    console.log("Option ID:", optionIdFromParams);

    if (!flightIdFromParams) {
      console.error("Missing required parameter: flightId.");
      setError("Thiếu thông tin chuyến bay.");
      setLoading(false);
      return;
    }

    if (!optionIdFromParams) {
      console.error("Missing required parameter: optionId.");
      setError("Thiếu thông tin hạng vé.");
      setLoading(false);
      return;
    }

    setFlightId(flightIdFromParams);
    setOptionId(optionIdFromParams);
  }, [searchParams]);

  // Fetch dữ liệu chuyến bay từ API
  useEffect(() => {
    if (!flightId) return; // Nếu không có flightId, dừng fetch

    const fetchFlightData = async () => {
      setLoading(true);
      try {
        console.log("Fetching flight data for ID:", flightId);
        const response = await fetch(`http://localhost:3030/api/flight/?id=${flightId}`);
        if (!response.ok) {
          throw new Error("Không thể lấy dữ liệu chuyến bay.");
        }
        const result = await response.json();
        console.log("Fetched flight data:", result);

        // Tạo thông tin hạng vé từ giá cơ bản
        const economyOptions = generateTicketOptions(result.data.basePrice, "economy");
        const businessOptions = generateTicketOptions(result.data.basePrice * 1.5, "business");

        // Kết hợp các tùy chọn vé
        const allOptions = [...economyOptions, ...businessOptions];

        // Tìm hạng vé dựa trên optionId
        const option = allOptions.find((opt) => opt.id === optionId);
        if (!option) {
          throw new Error("Không tìm thấy thông tin hạng vé.");
        }

        setFlightData({ ...result.data, economyOptions, businessOptions });
        setSelectedOption(option);
      } catch (err) {
        console.error("Error fetching flight:", err.message);
        setError("Không thể tải thông tin chuyến bay. Vui lòng thử lại.");
      } finally {
        setLoading(false);
      }
    };

    fetchFlightData();
  }, [flightId, optionId]);

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
            <DialogTitle className="text-green-600 text-center">
              Thanh toán thành công!
            </DialogTitle>
            <p className="text-center mt-2">Cảm ơn bạn đã đặt vé. Chúc bạn có chuyến bay vui vẻ!</p>
            <div className="flex justify-center mt-4">
              <Button
                variant="orange"
                onClick={() => router.push("/")}
                className=" hover:bg-black text-white"
              >
                Quay về trang chủ
              </Button>
            </div>
          </DialogHeader>
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
