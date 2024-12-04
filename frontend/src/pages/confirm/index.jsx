"use client"

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { Clock, Plane, Calendar, Users, CreditCard } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

import flights from "@/data/flights.json"

export default function ConfirmationPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const flightId = searchParams.get('flightId')
  const optionId = searchParams.get('optionId')
  const [isPaymentConfirmed, setIsPaymentConfirmed] = useState(false)
  const handleConfirmPayment = () => {
    setIsPaymentConfirmed(true)
  }
  const handleReturnHome = () => {
    router.push('/')
  }

  try {
    const flightData = flights.find(flight => flight.id == flightId)
    const selectedOption = [...flightData.economyOptions, ...flightData.businessOptions].find(option => option.id === optionId)

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
                    <span className="text-2xl sm:text-3xl font-bold text-gray-800">{flightData.departureTime}</span>
                    <span className="text-base sm:text-lg font-medium text-gray-600">{flightData.departureCode}</span>
                  </div>
                  <div className="flex-1 relative px-8">
                    <Plane className="text-orange absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform rotate-45" />
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-2xl sm:text-3xl font-bold text-gray-800">{flightData.arrivalTime}</span>
                    <span className="text-base sm:text-lg font-medium text-gray-600">{flightData.arrivalCode}</span>
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
                    <div className="font-medium">{flightData.departureDate}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="text-orange flex-shrink-0" />
                  <div>
                    <div className="text-sm text-gray-500">Thời gian bay</div>
                    <div className="font-medium">{flightData.duration}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="text-orange flex-shrink-0" />
                  <div>
                    <div className="text-sm text-gray-500">Hành khách</div>
                    <div className="font-medium">1 Người lớn</div>
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
                  <div className="text-2xl sm:text-3xl font-bold text-orange">{selectedOption.price.toLocaleString()} VND</div>
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
    )
  }
  catch (err) {
    return <div className="min-h-screen flex items-center justify-center">
      <p className="text-xl text-gray-600">Không tìm thấy thông tin chuyến bay</p>
    </div>
  }
}