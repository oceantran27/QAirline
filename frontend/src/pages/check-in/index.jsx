'use client'

import { useState } from "react"
import { StepIndicator } from "@/components/checkin/step-indicator"
import { FlightDetailsStep } from "@/components/checkin/flight-details"
import { PassengerListStep } from "@/components/checkin/passenger-list"
import { SeatSelectionStep } from "@/components/checkin/seat-selection"

const steps = [
  { title: "Chi tiết chuyến bay", description: "Xem lại thông tin chuyến bay" },
  { title: "Hành khách", description: "Chọn hành khách" },
  { title: "Chọn ghế", description: "Chọn ghế của bạn" },
]

const mockFlightDetails = {
  from: "SGN",
  to: "HAN",
  departureTime: "15:00",
  arrivalTime: "17:15",
  duration: "2h 15m",
  flightNumber: "VN250",
  date: "30 Th05, 2023",
}

const mockPassengers = [
  {
    id: "1",
    title: "Mrs",
    name: "Dao Thi Khuyen",
    type: "Adult",
  },
]

const mockSeats = Array.from({ length: 30 }, (_, i) => ({
  id: String(i + 1),
  number: `${Math.floor(i / 6) + 1}${String.fromCharCode(65 + (i % 6))}`,
  status: Math.random() > 0.7 ? 'occupied' : Math.random() > 0.8 ? 'premium' : 'available',
}))

export default function CheckInPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedSeat, setSelectedSeat] = useState(null)

  const handleContinue = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="container mx-auto p-6">
      <StepIndicator currentStep={currentStep} steps={steps} />
      
      {currentStep === 0 && (
        <FlightDetailsStep
          flightDetails={mockFlightDetails}
          onContinue={handleContinue}
          onCancel={() => window.history.back()}
        />
      )}
      
      {currentStep === 1 && (
        <PassengerListStep
          passengers={mockPassengers}
          onContinue={handleContinue}
          onBack={handleBack}
        />
      )}
      
      {currentStep === 2 && (
        <SeatSelectionStep
          seats={mockSeats}
          selectedSeat={selectedSeat}
          onSeatSelect={setSelectedSeat}
          onContinue={handleContinue}
          onBack={handleBack}
        />
      )}
    </div>
  )
}

