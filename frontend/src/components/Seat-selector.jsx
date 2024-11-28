'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { MdChair } from "react-icons/md"
import { cn } from '@/lib/utils'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export default function SeatSelector() {
  const [selectedSeat, setSelectedSeat] = useState(null)  // No type annotation
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [tempSelectedSeat, setTempSelectedSeat] = useState(null)  // No type annotation
  
  const columns = ['A', 'B', 'C', 'D', 'E', 'G']
  const rows = Array.from({ length: 44 }, (_, i) => i + 1)

  // Initial seat state, no need for type annotations
  const initialSeats = rows.flatMap(row =>
    columns.map(col => ({
      id: `${row}${col}`,
      type: row === 18 || row === 32 ? 'blocked' : 
            Math.random() < 0.3 ? 'unavailable' : 'available',
      row,
      column: col
    }))
  )

  const [seats, setSeats] = useState(initialSeats)

  const handleSeatClick = (seatId) => {
    const seat = seats.find(s => s.id === seatId)
    if (seat?.type === 'available') {
      setTempSelectedSeat(seatId)
      setIsDialogOpen(true)
    }
  }

  const confirmSeatSelection = () => {
    if (tempSelectedSeat) {
      setSelectedSeat(tempSelectedSeat)
      setSeats(seats.map(s => 
        s.id === tempSelectedSeat 
          ? { ...s, type: 'selected' }
          : s.type === 'selected' 
            ? { ...s, type: 'available' }
            : s
      ))
      setIsDialogOpen(false)
      setTempSelectedSeat(null)
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4 flex flex-col md:flex-row gap-4">
      {/* Left Panel */}
      <div className="w-full md:w-72 space-y-4">
        <div className="border rounded-lg p-4">
          <div className="flex items-center gap-2 text-sm">
            <div className="w-6 h-6 rounded-full bg-gray-600 text-white flex items-center justify-center">1</div>
            <div className="font-medium">TRI...</div>
            <div className="text-amber-500 flex items-center gap-1">
              ⚠️ {selectedSeat ? `Đã chọn ${selectedSeat}` : 'Chưa chọn chỗ ngồi'}
            </div>
          </div>
        </div>

        <div className="border rounded-lg p-4">
          <div className="text-sm font-medium mb-4">Xem chú giải</div>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 flex items-center justify-center text-blue-500 bg-blue-100 border-2 border-blue-400 rounded">
                <MdChair size={24} />
              </div>
              <span className="text-sm">Chỗ ngồi đã chọn</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 flex items-center justify-center text-amber-500 bg-amber-50 border-2 border-amber-200 rounded">
                <MdChair size={24} />
              </div>
              <span className="text-sm">Không còn trống</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 flex items-center justify-center text-gray-500 bg-white border-2 border-gray-300 rounded">
                <MdChair size={24} />
              </div>
              <span className="text-sm">Chỗ ngồi còn trống</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 flex items-center justify-center text-red-500 bg-red-100 border-2 border-red-400 rounded">
                <MdChair size={24} />
              </div>
              <span className="text-sm">Hàng ghế được chặn</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Seat Map */}
      <div className="flex-1 relative overflow-auto max-h-[80vh] md:max-h-none">
        <div className="sticky left-0 top-1/2 -translate-y-1/2">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <ChevronLeft className="w-6 h-6" />
          </button>
        </div>
        <div className="sticky right-0 top-1/2 -translate-y-1/2">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        <div className="grid grid-cols-[auto_repeat(6,1fr)] gap-2 px-12">
          {/* Column Headers */}
          <div className="h-8"></div>
          {columns.map(col => (
            <div key={col} className="flex items-center justify-center h-8 text-sm font-medium">
              {col}
            </div>
          ))}

          {/* Seats Grid */}
          {rows.map(row => (
            <>
              <div key={`row-${row}`} className="flex items-center justify-center h-8 text-sm font-medium">
                {row}
              </div>
              {columns.map(col => {
                const seat = seats.find(s => s.id === `${row}${col}`)
                return (
                  <button
                    key={`${row}${col}`}
                    onClick={() => handleSeatClick(`${row}${col}`)}
                    disabled={seat?.type === 'blocked' || seat?.type === 'unavailable'}
                    className={cn(
                      "w-8 h-8 rounded border-2 transition-colors flex items-center justify-center",
                      seat?.type === 'available' && "bg-white border-gray-300 hover:border-gray-400 text-gray-500",
                      seat?.type === 'selected' && "bg-blue-100 border-blue-400 text-blue-500",
                      seat?.type === 'unavailable' && "bg-amber-50 border-amber-200 text-amber-500",
                      seat?.type === 'blocked' && "bg-red-100 border-red-400 text-red-500"
                    )}
                  >
                    <MdChair size={20} />
                  </button>
                )
              })}
            </>
          ))}
        </div>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xác nhận chọn ghế</DialogTitle>
            <DialogDescription>
              Bạn đã chọn ghế {tempSelectedSeat}. Bạn có chắc chắn muốn chọn ghế này không?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Hủy</Button>
            <Button onClick={confirmSeatSelection}>Xác nhận</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
