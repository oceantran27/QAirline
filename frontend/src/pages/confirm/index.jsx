import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Calendar, Clock, Plane, CreditCard, Users } from "lucide-react";

export default function ConfirmationPage() {
  const router = useRouter();
  const { flightId, optionId, passengerCount } = router.query;

  const [flightData, setFlightData] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isPaymentConfirmed, setIsPaymentConfirmed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Lấy dữ liệu chuyến bay từ API
  useEffect(() => {
    if (!flightId || !optionId) return;

    const fetchFlightData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:3030/api/flight/?id=${flightId}`);
        if (!response.ok) {
          throw new Error("Không thể lấy dữ liệu chuyến bay.");
        }
        const result = await response.json();
        const data = result.data;

        // Tạo các tùy chọn vé cho chuyến bay
        const economyOptions = generateTicketOptions(data.basePrice, "economy");
        const businessOptions = generateTicketOptions(data.basePrice * 1.5, "business");
        const allOptions = [...economyOptions, ...businessOptions];

        const option = allOptions.find((opt) => opt.id === optionId);

        if (!option) {
          throw new Error("Không tìm thấy thông tin hạng vé.");
        }

        setFlightData(data);
        setSelectedOption(option);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFlightData();
  }, [flightId, optionId]);

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

  // Định dạng thời gian chuyến bay
  const formatTime = (seconds) => {
    return new Date(seconds * 1000).toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Kiểm tra trạng thái tải dữ liệu
  if (loading) {
    return <div>Đang tải...</div>;
  }

  // Xử lý khi có lỗi
  if (error || !flightData || !selectedOption) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">{error || "Không tìm thấy thông tin chuyến bay."}</p>
      </div>
    );
  }

  // Hàm xác nhận thanh toán
  const handleConfirmPayment = () => {
    setIsPaymentConfirmed(true);
  };

  // Hàm quay lại trang chủ
  const handleReturnHome = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative h-[200px] w-full bg-orange">
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4 text-center">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Lựa chọn của quý khách</h1>
          <p className="text-lg md:text-xl">{flightData.departureAirport.split(',')[0]} đến {flightData.arrivalAirport.split(',')[0]}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 sm:p-6 m-4 relative z-10">
        <Card className="shadow-lg border-orange">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2 sm:mb-0">Chi tiết chuyến bay</h2>
              <span className="text-sm text-gray-500">{flightData.flightNumber}</span>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
              <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                <div className="flex flex-col items-center">
                  <span className="text-2xl sm:text-3xl font-bold text-gray-800">{formatTime(flightData.departureTime.seconds)}</span>
                  <span className="text-base sm:text-lg font-medium text-gray-600">Điểm khởi hành</span>
                </div>
                <div className="flex-1 relative px-8">
                  <Plane className="text-orange absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform rotate-45" />
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-2xl sm:text-3xl font-bold text-gray-800">{formatTime(flightData.arrivalTime.seconds)}</span>
                  <span className="text-base sm:text-lg font-medium text-gray-600">Điểm đến</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-gray-500">{selectedOption.name}</div>
                <div className="text-xl sm:text-2xl font-bold text-orange">{selectedOption.price.toLocaleString()} VND</div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8">
              <div className="flex items-center space-x-3">
                <Calendar className="text-orange flex-shrink-0" />
                <div>
                  <div className="text-sm text-gray-500">Ngày khởi hành</div>
                  <div className="font-medium">{new Date(flightData.departureTime.seconds * 1000).toLocaleDateString()}</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="text-orange flex-shrink-0" />
                <div>
                  <div className="text-sm text-gray-500">Thời gian bay</div>
                  <div className="font-medium">2 giờ 30 phút</div> {/* Bạn có thể tính toán duration từ dữ liệu hoặc API */}
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Users className="text-orange flex-shrink-0" />
                <div>
                  <div className="text-sm text-gray-500">Hành khách</div>
                  <div className="font-medium">{passengerCount} Người lớn</div> {/* Hiển thị số lượng hành khách */}
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <CreditCard className="text-orange flex-shrink-0" />
                <div>
                  <div className="text-sm text-gray-500">Phương thức thanh toán</div>
                  <div className="font-medium">Thẻ tín dụng</div>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
                <div className="mb-2 sm:mb-0">
                  <div className="text-lg font-semibold text-gray-800">Tổng cộng</div>
                  <div className="text-sm text-gray-500">Đã bao gồm thuế và phí</div>
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-orange">
                  {(selectedOption.price * passengerCount).toLocaleString()} VND
                </div>

              </div>
              <Button className="w-full sm:w-auto bg-orange hover:bg-black text-white" onClick={handleConfirmPayment}>
                Xác nhận và thanh toán
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isPaymentConfirmed} onOpenChange={setIsPaymentConfirmed}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Thanh toán thành công</DialogTitle>
            <DialogDescription>
              Cảm ơn quý khách đã đặt vé. Chúc quý khách có chuyến bay vui vẻ!
            </DialogDescription>
          </DialogHeader>
          <Button onClick={handleReturnHome} className="mt-4 bg-orange hover:bg-black">
            Quay về trang chủ
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
