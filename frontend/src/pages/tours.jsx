import { useState } from "react"
import { User, ChevronsRight, Info } from 'lucide-react'
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"

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
    flightNumber: "VN 267"
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
    flightNumber: "VN 6025"
  },
]

export default function FlightBooking() {
  const [budget, setBudget] = useState([1929000, 6400000])

  return (
    <div>
      <div className="relative h-[300px] w-full">
        <Image
          src="/bangkok.jpg?height=300&width=1200"
          alt="Mountain landscape with traveler"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h1 className="text-4xl font-bold mb-2">Explore The Worlds</h1>
          <p className="text-lg">People Don't Take Trips Take People</p>
        </div>
      </div>

      {/* Flight Info Bar */}
      <div className="sticky top-24 border-t-2 border-orange bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between flex-wrap gap-4 max-w-5xl m-auto">
            <div className="flex items-center gap-12">
              <div className="flex items-center gap-2">
                <span className="font-semibold">HAN</span>
                <span className="text-gray-400">⋯⋯⋯⋯⋯⋯⋯⋯➜</span>
                <span className="font-semibold">SGN</span>
              </div>
              <div className="text-sm text-gray-600">
                <div>Hà Nội</div>
                <div>TP. Hồ Chí Minh</div>
              </div>
            </div>
            <div className="flex items-center gap-12">
              <div>
                <div className="text-sm text-gray-600">Chuyến đi</div>
                <div className="font-semibold">Th 5, 14 thg 11</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Chuyến về</div>
                <div className="font-semibold">Th 7, 16 thg 11</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Hành khách</div>
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span className="font-semibold">1</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 p-4 bg-gray-100 min-h-screen max-w-6xl m-auto">
        
        {/* Side filter */}
        <Card className="w-full md:w-64 h-fit">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Bộ lọc</h2>
            </div>
            <div className="space-y-4">
              <div>
                <Label>Khoảng</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Tất cả" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Ngân sách</Label>
                <div className="flex justify-between text-sm mt-2">
                  <span>{budget[0].toLocaleString()} VND</span>
                  <span>{budget[1].toLocaleString()} VND</span>
                </div>
                <Slider
                  min={1929000}
                  max={6400000}
                  step={1000}
                  value={budget}
                  onValueChange={setBudget}
                  className="mt-2"
                />
              </div>
              <div>
                <Label>Số điểm dừng</Label>
                <div className="flex items-center space-x-2 mt-2">
                  <Checkbox id="no-stops" />
                  <label htmlFor="no-stops" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Không có túy chọn
                  </label>
                </div>
              </div>
              <div>
                <div className="space-y-2 mt-2">
                  <Label>Giờ khởi hành</Label>
                  <RadioGroup defaultValue="option-1">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-1" id="option-1" />
                      <Label htmlFor="option-1">00:00 - 11:59 Sáng</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-2" id="option-2" />
                      <Label htmlFor="option-2">12:00 - 17:59 Chiều</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-3" id="option-3" />
                      <Label htmlFor="option-3">18:00 - 23:59 Tối</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>
            <div className="flex justify-between mt-4">
              <Button variant="outline">Thiết lập lại</Button>
              <Button className="bg-orange text-white">Áp dụng</Button>
            </div>
          </CardContent>
        </Card>

        {/* Main content */}
        <div className="flex-1 space-y-4">
          {flights.map((flight, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex justify-between items-center">

                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex flex-col items-center">
                        <span className="text-2xl font-bold">{flight.departureTime}</span>
                        <span className="text-sm text-gray-500">{flight.departureCode}</span>
                      </div>
                      <div className="flex-1 relative">
                        <div className="border-t border-gray-300 absolute w-full top-4"></div>
                        <ChevronsRight className="text-orange-500 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
                      </div>
                      <div className="flex flex-col items-center mr-10">
                        <span className="text-2xl font-bold">{flight.arrivalTime}</span>
                        <span className="text-sm text-gray-500">{flight.arrivalCode}</span>
                      </div>
                    </div>
                    <div className="items-center gap-4 text-sm text-gray-600 mb-2">
                      <span className="inline-block mr-8">• Thời gian bay dự kiến: {flight.duration}</span>
                      <span className="inline-block">• Số hiệu: {flight.flightNumber}</span>
                    </div>
                    <button className="text-sm text-blue-600 hover:underline flex items-center gap-1">
                      Chi tiết hành trình
                      <Info className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="flex flex-col space-y-2 text-right w-44">
                    <Button className="flex-1 w-full bg-teal-700 hover:bg-teal-800 relative">
                      <div>
                        <div className="font-semibold">Phổ thông</div>
                        <div>{flight.economyPrice.toLocaleString()} VND</div>
                      </div>
                      <span className="absolute -top-2 -right-2 bg-red text-white text-xs px-1.5 py-0.5 rounded-full">
                        Còn {flight.seatsLeft} ghế
                      </span>
                    </Button>
                    <Button className="flex-1 w-full bg-yellow-500 hover:bg-yellow-600 text-black">
                      <div>
                        <div className="font-semibold">Thương gia</div>
                        <div>{flight.businessPrice.toLocaleString()} VND</div>
                      </div>
                    </Button>
                  </div>

                </div>
              </CardContent>
            </Card>
          ))}
          <div className="text-center text-sm text-gray-500">
            Có 7 trên 7 chuyến bay
          </div>
          <Button className="w-full bg-orange text-white">Quay lại</Button>
        </div>
      </div>
    </div>
  )
}