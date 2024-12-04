import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import SeatSelector from "@/components/checkin/Seat-selector"
export function SeatSelectionStep({
  seats,
  selectedSeat,
  onSeatSelect,
  onContinue,
  onBack,
}) {
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardContent className="p-6">
        <h2 className="text-2xl font-semibold mb-6">Chọn Ghế Ngồi Của Bạn</h2>
        
        <SeatSelector />

        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={onBack}>
            Quay Lại
          </Button>
          <Button onClick={onContinue} disabled={!selectedSeat}>
            Tiếp Tục
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

