import React from 'react'
import { Plane, Calendar, Clock, MapPin, User, Barcode, Star, DoorOpen } from 'lucide-react'

export default function ModernFlightTicket({ onClose }) {
  return (
    <div className="bg-gradient-to-br from-red-400 to-red-600 text-white shadow-xl rounded-xl overflow-hidden w-full max-w-md mx-auto">
      <div className="relative p-6">
        
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Vietnam Airlines</h2>
          <Plane className="w-10 h-10 transform -rotate-45" />
        </div>
        
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs uppercase tracking-wide opacity-75">Passenger</p>
              <p className="text-lg font-semibold flex items-center mt-1">
                <User className="w-5 h-5 mr-2" />
                Nguyen Van A
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide opacity-75">Flight</p>
              <p className="text-lg font-semibold mt-1">VN123</p>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs uppercase tracking-wide opacity-75">Date</p>
              <p className="text-lg font-semibold flex items-center mt-1">
                <Calendar className="w-5 h-5 mr-2" />
                20 Jun 2023
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide opacity-75">Departure</p>
              <p className="text-lg font-semibold flex items-center mt-1">
                <Clock className="w-5 h-5 mr-2" />
                10:30 AM
              </p>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs uppercase tracking-wide opacity-75">From</p>
              <p className="text-lg font-semibold flex items-center mt-1">
                <MapPin className="w-5 h-5 mr-2" />
                Hanoi (HAN)
              </p>
            </div>
            <Plane className="w-8 h-8 transform rotate-90" />
            <div>
              <p className="text-xs uppercase tracking-wide opacity-75">To</p>
              <p className="text-lg font-semibold flex items-center mt-1">
                <MapPin className="w-5 h-5 mr-2" />
                Ho Chi Minh (SGN)
              </p>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs uppercase tracking-wide opacity-75">Class</p>
              <p className="text-lg font-semibold flex items-center mt-1">
                <Star className="w-5 h-5 mr-2" />
                Business
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide opacity-75">Boarding</p>
              <p className="text-lg font-semibold flex items-center mt-1">
                <DoorOpen className="w-5 h-5 mr-2" />
                10:00 AM
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white text-zinc-800 p-6 flex justify-between items-center">
        <div>
          <p className="text-xs uppercase tracking-wide text-zinc-500">Gate</p>
          <p className="text-2xl font-bold mt-1">A12</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-zinc-500">Seat</p>
          <p className="text-2xl font-bold mt-1">15B</p>
        </div>
        <Barcode className="w-24 h-24 text-zinc-800" />
      </div>
    </div>
  )
}

