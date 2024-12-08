import { Check, Printer, Download, Mail, ArrowLeft, Home } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useState } from 'react'

export function ConfirmationStep({ bookingReference, passenger, onBack, onHome }) {
  const [showBoardingPass, setShowBoardingPass] = useState(false)

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl text-orange font-semibold mb-6">Xác nhận làm thủ tục lên máy bay</h1>
      
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
              <Check className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-2">Quý khách đã làm thủ tục lên máy bay thành công</h2>
              <p className="text-zinc-600">
                Quý khách đã làm thủ tục thành công. Thẻ lên máy bay của Quý khách nên được lưu trên máy hoặc in ra. 
                Tại sân bay, Quý khách vui lòng kiểm tra lại thông tin về cửa ra máy bay.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <h3 className="text-xl text-orange font-semibold">Hành khách</h3>
              <div className="flex items-center gap-2">
                <span className="text-zinc-500">Mã đặt chỗ:</span>
                <span className="text-xl font-semibold">{bookingReference}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-zinc-500">Thẻ lên máy bay:</span>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" onClick={() => setShowBoardingPass(true)}>
                  <Download className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Printer className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Mail className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-zinc-50 rounded-lg">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-zinc-500">TD</span>
                <span className="font-medium">{passenger.name}</span>
              </div>
              <span className="text-sm text-zinc-500">Người lớn</span>
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <Button variant="outline" onClick={onBack} className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Quay lại
            </Button>
            <Button variant="orange" onClick={onHome} className="gap-2">
              <Home className="w-4 h-4" />
              Về trang chính
            </Button>
          </div>
        </CardContent>
      </Card>

      <Dialog open={showBoardingPass} onOpenChange={setShowBoardingPass}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Thẻ lên máy bay</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <div className="font-medium">SGN → HAN</div>
                <div className="text-sm text-zinc-500">VN 250</div>
              </div>
              <div className="text-right">
                <div className="font-medium">30 Thg 05, 2023</div>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-zinc-500">TD</span>
                <span className="font-medium">{passenger.name}</span>
                <span className="text-sm text-zinc-500">Người lớn</span>
              </div>
              <div className="text-sm">Hạng Phổ thông</div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-zinc-500">Giờ khởi hành</div>
                <div className="font-medium">14:20</div>
              </div>
              <div>
                <div className="text-sm text-zinc-500">Cửa ra</div>
                <div className="font-medium">15:00</div>
              </div>
              <div>
                <div className="text-sm text-zinc-500">Ghế</div>
                <div className="font-medium">23D</div>
              </div>
            </div>

            <div className="flex justify-center p-4">
              <div className="w-32 h-32 bg-zinc-900" /> {/* Placeholder for QR code */}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

