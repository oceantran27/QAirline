import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"

export function PassengerListStep({ passengers, onContinue, onBack }) {
  return (
    <Card className="w-full max-w-4xl mx-auto mb-8">
      <CardContent className="p-6">
        <h2 className="text-2xl font-semibold mb-6">Danh Sách Hành Khách</h2>
        <div className="space-y-4">
          {passengers.map((passenger) => (
            <div
              key={passenger.id}
              className="flex items-center p-4 border rounded-lg hover:bg-gray-50"
            >
              <Checkbox id={passenger.id} className="mr-4" />
              <div>
                <div className="font-medium">
                  {passenger.title} {passenger.name}
                </div>
                <div className="text-sm text-gray-500">{passenger.type}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <Button variant="outline" onClick={onBack}>
            Quay Lại
          </Button>
          <Button variant="orange" onClick={onContinue}>Tiếp Tục</Button>
        </div>
      </CardContent>
    </Card>
  )
}

