import { Button } from "@/components/ui/button"

import { FlightHeader } from "@/components/FlightHeader"
import { FlightSideFilter } from "@/components/FlightSideFilter"
import { FlightCard } from "@/components/FlightCard"

import flights from "@/data/flights.json"

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