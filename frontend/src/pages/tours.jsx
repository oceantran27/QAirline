import { Button } from "@/components/ui/button"

import { FlightHeader } from "@/components/FlightHeader"
import { FlightSideFilter } from "@/components/FlightSideFilter"
import { FlightCard } from "@/components/FlightCard"

const flights = [
  {
    departureTime: "22:00",
    arrivalTime: "00:10",
    departureCode: "HAN",
    arrivalCode: "SGN",
    duration: "2 giờ 10 phút",
    airline: "Vietnam Airlines",
    economyPrice: 3582000,
    businessPrice: 5860000,
    seatsLeft: 2,
    flightNumber: "VN 267",
    departureAirport: "Sân bay Nội Bài, Việt Nam",
    arrivalAirport: "Sân bay Tân Sơn Nhất, Việt Nam",
    departureDate: "Thứ Tư, 20 tháng 11, 2024",
    aircraft: "AIRBUS A321",
    economyOptions: [
      {
        name: "Phổ Thông Tiêu Chuẩn",
        price: 2955000,
        changeFee: 860000,
        refundFee: 860000,
        checkedBaggage: "1 x 23 kg",
        carryOn: "Không quá 12kg",
      },
      {
        name: "Phổ Thông Linh Hoạt",
        price: 3582000,
        changeFee: 360000,
        refundFee: 360000,
        checkedBaggage: "1 x 23 kg",
        carryOn: "Không quá 12kg",
      }
    ],
    businessOptions: [
      {
        name: "Thương Gia Tiêu Chuẩn",
        price: 2955000,
        changeFee: 860000,
        refundFee: 860000,
        checkedBaggage: "1 x 23 kg",
        carryOn: "Không quá 12kg",
      },
      {
        name: "Thương Gia Linh Hoạt",
        price: 3582000,
        changeFee: 360000,
        refundFee: 360000,
        checkedBaggage: "1 x 23 kg",
        carryOn: "Không quá 12kg",
      }
    ]
  },
  {
    departureTime: "23:10",
    arrivalTime: "01:10",
    departureCode: "SGN",
    arrivalCode: "HAN",
    duration: "2 giờ 0 phút",
    airline: "Pacific Airlines",
    economyPrice: 2340000,
    businessPrice: 5860000,
    seatsLeft: 7,
    flightNumber: "VN 6025",
    departureAirport: "Sân bay Tân Sơn Nhất, Việt Nam",
    arrivalAirport: "Sân bay Nội Bài, Việt Nam",
    departureDate: "Thứ Tư, 20 tháng 11, 2024",
    aircraft: "AIRBUS A321",
    economyOptions: [
      {
        name: "Phổ Thông Tiêu Chuẩn",
        price: 2340000,
        changeFee: 860000,
        refundFee: 860000,
        checkedBaggage: "1 x 23 kg",
        carryOn: "Không quá 12kg",
      },
      {
        name: "Phổ Thông Linh Hoạt",
        price: 2955000,
        changeFee: 360000,
        refundFee: 360000,
        checkedBaggage: "1 x 23 kg",
        carryOn: "Không quá 12kg",
      }
    ],
    businessOptions: [
      {
        name: "Thương Gia Tiêu Chuẩn",
        price: 2955000,
        changeFee: 860000,
        refundFee: 860000,
        checkedBaggage: "1 x 23 kg",
        carryOn: "Không quá 12kg",
      },
      {
        name: "Thương Gia Linh Hoạt",
        price: 3582000,
        changeFee: 360000,
        refundFee: 360000,
        checkedBaggage: "1 x 23 kg",
        carryOn: "Không quá 12kg",
      }
    ]
  },
]

export default function FlightBooking() {
  return (
    <div>
      <FlightHeader />
      <div className="flex flex-col md:flex-row gap-4 p-4 bg-gray-100 min-h-screen max-w-6xl m-auto">
        <FlightSideFilter />
        <div className="flex-1 space-y-4">
            <FlightCard flights={flights} />
            <div className="text-center text-sm text-gray-500">
                Có 7 trên 7 chuyến bay
            </div>
            <Button className="w-full bg-orange text-white">Quay lại trang chủ</Button>
        </div>
      </div>
    </div>
  )
}