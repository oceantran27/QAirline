import { AlertTriangle, Plane, Calendar, Clock, Users, CreditCard } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function FlightDetailsStep({ flightDetails, selectedOption, onContinue, onCancel }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-4 sm:p-6 m-4 relative z-10">
        <Card className="shadow-lg border-orange">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2 sm:mb-0">Chi tiết chuyến bay</h2>
              <span className="text-sm text-gray-500">{flightDetails.flightNumber}</span>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
              <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                <div className="flex flex-col items-center">
                  <span className="text-2xl sm:text-3xl font-bold text-gray-800">{flightDetails.departureTime}</span>
                  <span className="text-base sm:text-lg font-medium text-gray-600">{flightDetails.from}</span>
                </div>
                <div className="flex-1 relative px-8">
                  <Plane className="text-orange absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform rotate-45" />
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-2xl sm:text-3xl font-bold text-gray-800">{flightDetails.arrivalTime}</span>
                  <span className="text-base sm:text-lg font-medium text-gray-600">{flightDetails.to}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-gray-500">Giá vé</div>
                <div className="text-xl sm:text-2xl font-bold text-orange">Đã chọn</div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8">
              <div className="flex items-center space-x-3">
                <Calendar className="text-orange flex-shrink-0" />
                <div>
                  <div className="text-sm text-gray-500">Ngày khởi hành</div>
                  <div className="font-medium">{flightDetails.date}</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="text-orange flex-shrink-0" />
                <div>
                  <div className="text-sm text-gray-500">Thời gian bay</div>
                  <div className="font-medium">{flightDetails.duration}</div>
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

            <div className="border-t pt-6">
              <h3 className="font-semibold mb-4">Các vật phẩm bị cấm</h3>
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                {prohibitedItems.map((item, index) => (
                  <div key={index} className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full border-2 border-red-500 flex items-center justify-center mb-2">
                      <AlertTriangle className="w-8 h-8 text-red-500" />
                    </div>
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <Button variant="outline" onClick={onCancel}>
                Hủy
              </Button>
              <Button variant="orange" onClick={onContinue}>
                Tiếp tục
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}





const prohibitedItems = [
  "Vật dễ cháy",
  "Chất lỏng",
  "Vật sắc nhọn",
  "Hóa chất",
  "Chất nổ",
  "Vật liệu phóng xạ",
]

