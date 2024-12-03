import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function PasswordChange() {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-medium mb-6">Thông tin mật khẩu</h2>
      
      <p className="text-red-500 mb-6 text-sm">
        Mật khẩu tối thiểu phải có 8 ký tự, không giới hạn độ dài tối đa. Mật khẩu phải bao gồm ít nhất 1 ký tự số, 1 chữ cái hoa, 1 chữ cái thường và 1 ký tự đặc biệt (@ $ ! % * ? &). Ví dụ: Matkhau@123
      </p>

      <form className="space-y-4">
        <div>
          <label className="block mb-1">
            Mật khẩu hiện tại <span className="text-red-500">*</span>
          </label>
          <Input type="password" required />
        </div>

        <div>
          <label className="block mb-1">
            Mật khẩu mới <span className="text-red-500">*</span>
          </label>
          <Input type="password" required />
        </div>

        <div>
          <label className="block mb-1">
            Nhắc lại mật khẩu <span className="text-red-500">*</span>
          </label>
          <Input type="password" required />
        </div>

        <div className="text-right">
          <Button className="bg-orange text-white hover:bg-orangeLight" >LƯU</Button>
        </div>
      </form>
    </div>
  )
}

