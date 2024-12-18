import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button";
import { CheckCircle } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Calendar, Clock, Plane, CreditCard, Users } from 'lucide-react';
import { PassengerInfoDialog } from "./PassengerInfoDialog";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/hooks/use-toast";
import { useAccountInfo } from "@/hooks/useAccountInfo";

import { format, parse } from "date-fns";


export default function ConfirmationPage() {
  const router = useRouter();
  const {
    departureFlightId,
    departureOptionId,
    returnFlightId,
    returnOptionId,
    passengerCount,
  } = router.query;
  
  const tripType = returnFlightId && returnOptionId ? "roundTrip" : "oneway";

  const [departureFlightData, setDepartureFlightData] = useState(null);
  const [returnFlightData, setReturnFlightData] = useState(null);
  const [departureOption, setDepartureOption] = useState(null);
  const [returnOption, setReturnOption] = useState(null);
  const [isPaymentConfirmed, setIsPaymentConfirmed] = useState(false);
  const [isPassengerInfoFilled, setIsPassengerInfoFilled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPassengerInfoOpen, setIsPassengerInfoOpen] = useState(false);
  const [bookingId, setBookingId] = useState(null);


  const fetchFlightData = async (flightId, optionId, setFlightData, setOption) => {
    try {
      const response = await fetch(`http://localhost:3030/api/flight/?id=${flightId}`);
      if (!response.ok) {
        throw new Error("Không thể lấy dữ liệu chuyến bay.");
      }
      const result = await response.json();
      const data = result.data;

      const economyOptions = generateTicketOptions(data.basePrice, "economy");
      const businessOptions = generateTicketOptions(data.basePrice * 1.5, "business");
      const allOptions = [...economyOptions, ...businessOptions];
      const option = allOptions.find((opt) => opt.id === optionId);
      if (!option) {
        throw new Error("Không tìm thấy thông tin hạng vé.");
      }

      setFlightData(data);
      setOption(option);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (!departureFlightId || !departureOptionId) return;

    setLoading(true);
    const fetchData = async () => {
      await fetchFlightData(
        departureFlightId,
        departureOptionId,
        setDepartureFlightData,
        setDepartureOption
      );
      if (returnFlightId && returnOptionId) {
        await fetchFlightData(
          returnFlightId,
          returnOptionId,
          setReturnFlightData,
          setReturnOption
        );
      }
      setLoading(false);
      
    };

    fetchData();
  }, [departureFlightId, departureOptionId, returnFlightId, returnOptionId]);

  const totalAmount = (departureOption?.price + (returnOption?.price || 0)) * parseInt(passengerCount || 1, 10);
  
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

  const formatTime = (seconds) => {
    return new Date(seconds * 1000).toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const calculateFlightDuration = (departureTime, arrivalTime) => {
    const durationInMinutes = (arrivalTime - departureTime) / 60;
    const hours = Math.floor(durationInMinutes / 60);
    const minutes = Math.floor(durationInMinutes % 60);
    return `${hours} giờ ${minutes} phút`;
  };

  const handlePassengerInfoFilled = () => {
    setIsPassengerInfoFilled(true);
  };

  const handleConfirmPayment = () => {
    setIsPaymentConfirmed(true);
    if (!isPassengerInfoFilled) {
      toast({
        title: "Thông tin chưa đầy đủ",
        description: "Vui lòng nhập thông tin hành khách trước khi thanh toán.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Thanh toán thành công",
      description: "Cảm ơn quý khách đã đặt vé. Chúc quý khách có chuyến bay vui vẻ!",
    });
  };

  const handleReturnHome = () => {
    router.push("/");
  };

  const handleOpenPassengerInfo = () => {
    setIsPassengerInfoOpen(true);
  };


  // Lấy thông tin người dùng từ hook useAccountInfo
  const { personalInfo, loading: accountLoading } = useAccountInfo();
  const bookerId = personalInfo?.uid; // ID của người dùng đăng nhập

  if (!bookerId) {
    console.error("Không tìm thấy bookerId. Vui lòng đăng nhập.");
    return;
  }

  // Hàm lưu thông tin hành khách
  const handleSavePassengerInfo = async (passengerData) => {
    const departureTicketDataList = passengerData.map((info) => ({
      price: departureOption.price,
      flightClass: departureOption.name.includes("Thương Gia") ? "business" : "economy",
      ownerData: {
        identityCardNumber: info.idNumber,
        firstName: info.firstName,
        lastName: info.lastName,
        phoneNumber: info.phoneNumber,
        dateOfBirth: format(parse(info.birthDate, "dd/MM/yyyy", new Date()), "yyyy-MM-dd"),
        gender: info.gender,
        address: info.address,
      },
    }));
  
    const returnTicketDataList = passengerData.map((info) => ({
      price: returnOption?.price || 0,
      flightClass: returnOption?.name.includes("Thương Gia") ? "business" : "economy",
      ownerData: {
        identityCardNumber: info.idNumber,
        firstName: info.firstName,
        lastName: info.lastName,
        phoneNumber: info.phoneNumber,
        dateOfBirth: format(parse(info.birthDate, "dd/MM/yyyy", new Date()), "yyyy-MM-dd"),
        gender: info.gender,
        address: info.address,
      },
    }));
    
    // Dữ liệu booking
    const bookingData = {
      bookerId,
      departureCity: "HAN",
      arrivalCity: "SGN",
      departureFlightId: departureFlightData?.flightId,
      tripType,
      departureTicketDataList,
      returnTicketDataList: tripType === "roundTrip" ? returnTicketDataList : undefined,
    };
  

    // Gửi dữ liệu booking lên server
    try {
      const response = await fetch(
        tripType === "roundTrip"
          ? "http://localhost:3030/api/booking/new"
          : "http://localhost:3030/api/booking/new",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Token lấy từ localStorage hoặc state
          },
          body: JSON.stringify(bookingData),
        }
      );
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Lỗi khi tạo booking.");
      }
      const result = await response.json(); // Lấy dữ liệu JSON trả về từ API
      const bookingId = result.bookingId;
      setBookingId(result.bookingId);
      
      toast({
        title: "Đặt vé thành công",
        description: `Mã đặt vé của bạn là: ${bookingId}`,
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "Lỗi đặt vé",
        description: error.message,
        variant: "destructive",
      });
    }
  };
  

  // Hiển thị skeleton khi loading
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
        <div className="h-[200px] w-full bg-orange relative mb-4">
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4 text-center">
            <Skeleton className="h-8 w-1/2 mb-2" />
            <Skeleton className="h-6 w-2/3" />
          </div>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-lg border-orange">
            <CardContent className="p-4 sm:p-6">
              {/* Tiêu đề và flightNumber */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                <Skeleton className="h-6 w-1/3 mb-2 sm:mb-0" />
                <Skeleton className="h-4 w-20" />
              </div>
              {/* Thời gian đi - đến và giá */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
                <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                  <Skeleton className="h-8 w-16" />
                  <div className="flex-1 relative px-8">
                    <Skeleton className="h-6 w-6 mx-auto" />
                  </div>
                  <Skeleton className="h-8 w-16" />
                </div>
                <div className="text-right">
                  <Skeleton className="h-4 w-32 mb-1" />
                  <Skeleton className="h-6 w-24" />
                </div>
              </div>
              
              {/* Chi tiết chuyến bay */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8">
                <div className="flex items-center space-x-3">
                  <Skeleton className="h-5 w-5 rounded-full" />
                  <div>
                    <Skeleton className="h-4 w-24 mb-1" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Skeleton className="h-5 w-5 rounded-full" />
                  <div>
                    <Skeleton className="h-4 w-24 mb-1" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Skeleton className="h-5 w-5 rounded-full" />
                  <div>
                    <Skeleton className="h-4 w-24 mb-1" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Skeleton className="h-5 w-5 rounded-full" />
                  <div>
                    <Skeleton className="h-4 w-24 mb-1" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                </div>
              </div>

              {/* Tổng cộng và nút */}
              <div className="border-t border-gray-200 pt-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
                  <div className="mb-2 sm:mb-0">
                    <Skeleton className="h-4 w-20 mb-1" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                  <Skeleton className="h-6 w-32" />
                </div>
                <div className="flex space-x-4">
                  <Skeleton className="h-10 w-48 rounded" />
                  <Skeleton className="h-10 w-48 rounded" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative h-[200px] w-full bg-orange">
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4 text-center">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Lựa chọn của quý hành khách</h1>
          
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 sm:p-6 m-4 relative z-10">
        {[{ flightData: departureFlightData, option: departureOption, title: "Chi tiết chuyến bay đi" }, 
          returnFlightData && { flightData: returnFlightData, option: returnOption, title: "Chi tiết chuyến bay về" }]
          .filter(Boolean)
          .map(({ flightData, option, title }, index) => (
            <Card key={index} className="shadow-lg border-orange mb-4">
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2 sm:mb-0">{title}</h2>
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
                    <div className="text-sm font-medium text-gray-500">{option.name}</div>
                    <div className="text-xl sm:text-2xl font-bold text-orange">{option.price.toLocaleString()} VND</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8">
                  <div className="flex items-center space-x-3">
                    <Calendar className="text-orange flex-shrink-0" />
                    <div>
                      <div className="text-sm text-gray-500">Ngày khởi hành</div>
                      <div className="font-medium">
                        {new Date(flightData.departureTime.seconds * 1000).toLocaleDateString("vi-VN")}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="text-orange flex-shrink-0" />
                    <div>
                      <div className="text-sm text-gray-500">Thời gian bay</div>
                      <div className="font-medium">{calculateFlightDuration(flightData.departureTime.seconds, flightData.arrivalTime.seconds)}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Users className="text-orange flex-shrink-0" />
                    <div>
                      <div className="text-sm text-gray-500">Hành khách</div>
                      <div className="font-medium">{passengerCount} Người lớn/ Trẻ em</div>
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
              </CardContent>
            </Card>
          ))}
      </div>

      <div className="border-t border-gray-200 pt-6 pb-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
            <div className="mb-2 sm:mb-0">
              <div className="text-lg font-semibold text-gray-800">Tổng cộng</div>
              <div className="text-sm text-gray-500">Đã bao gồm thuế và phí</div>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-orange">
              {totalAmount.toLocaleString()} VND
            </div>
          </div>
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
            <Button
              variant="outline"
              className="w-full sm:w-auto"
              onClick={handleOpenPassengerInfo}
            >
              Nhập thông tin hành khách
            </Button>
            <Button
              variant="orange"
              className={`w-full sm:w-auto text-white ${!isPassengerInfoFilled && "opacity-50 cursor-not-allowed"}`}
              onClick={handleConfirmPayment}
              disabled={!isPassengerInfoFilled}
            >
              Xác nhận và thanh toán
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={isPaymentConfirmed} onOpenChange={setIsPaymentConfirmed}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="flex justify-center mb-4"
          >
            <CheckCircle className="w-16 h-16 text-green-500" />
          </motion.div>
          <DialogTitle className="text-2xl font-bold text-center">Thanh toán thành công</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center space-y-4 text-center">
          <DialogDescription className="text-lg">
            Mã đặt vé của bạn là:
          </DialogDescription>
          <div className="px-4 py-2 text-xl font-mono font-bold bg-gray-100 rounded-md">
            {bookingId}
          </div>
          <DialogDescription className="text-base">
            Cảm ơn quý khách đã đặt vé. Chúc quý khách có chuyến bay vui vẻ!
          </DialogDescription>
        </div>
        <Button 
          onClick={handleReturnHome}
          variant="orange"
          className="w-full mt-6 text-white transition-colors duration-200"
        >
          Quay về trang chủ
        </Button>
      </DialogContent>
      </Dialog>

      <PassengerInfoDialog
        isOpen={isPassengerInfoOpen}
        onClose={() => setIsPassengerInfoOpen(false)}
        passengerCount={parseInt(passengerCount) || 1}
        onInfoFilled={(info) => {
          handlePassengerInfoFilled();
          handleSavePassengerInfo(info);
          setIsPassengerInfoOpen(false);
        }}
      />

    </div>
  );
}

