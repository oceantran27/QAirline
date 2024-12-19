import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import SeatSelector from "@/components/checkin/seat-selector";

export function SeatSelectionStep({ seats, passengers, onSeatSelect, onContinue, onBack }) {
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardContent className="p-6">
        <h2 className="text-2xl font-semibold mb-6">Chọn Ghế Ngồi Của Bạn</h2>

        <SeatSelector seats={seats} passengers={passengers} onSeatSelect={onSeatSelect} />

        <div className="flex justify-end gap-4 mt-6">
          <Button variant="outline" onClick={onBack}>
            Quay Lại
          </Button>
          <Button
            variant="orange"
            onClick={() => {
              const allSelected = passengers.every((customer) => customer.seat);
              if (!allSelected) {
                alert("Vui lòng chọn ghế cho tất cả khách hàng trước khi tiếp tục.");
              } else {
                onContinue();
              }
            }}
          >
            Tiếp Tục
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
