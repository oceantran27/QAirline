import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAccountInfo } from "@/hooks/useAccountInfo";

export default function PasswordChange() {
  const { personalInfo, loading, errorMessage } = useAccountInfo();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!personalInfo) {
      setError("Không thể tải thông tin người dùng. Vui lòng thử lại.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Mật khẩu mới và nhắc lại mật khẩu không khớp.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Bạn cần đăng nhập để thực hiện thao tác này.");
        return;
      }

      const response = await fetch(
        `http://localhost:3030/api/customer/change-password?id=${personalInfo.uid}`, // Sử dụng UID từ personalInfo
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            email: personalInfo.email, // Sử dụng email từ personalInfo
            oldPassword: currentPassword,
            newPassword: newPassword,
          }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Có lỗi xảy ra, vui lòng thử lại.");
      }

      setSuccess("Mật khẩu đã được thay đổi thành công.");
      setError("");
    } catch (err) {
      setError(err.message);
      setSuccess("");
    }
  };

  if (loading) {
    return <p>Đang tải thông tin người dùng...</p>;
  }

  if (errorMessage) {
    return <p className="text-red-500">{errorMessage}</p>;
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-medium mb-6">Thông tin mật khẩu</h2>

      <p className="text-red-500 mb-6 text-sm">
        Mật khẩu tối thiểu phải có 8 ký tự, không giới hạn độ dài tối đa. Mật khẩu phải bao gồm ít nhất 1 ký tự số, 1 chữ cái hoa, 1 chữ cái thường và 1 ký tự đặc biệt (@ $ ! % * ? &). Ví dụ: Matkhau@123
      </p>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block mb-1">
            Mật khẩu hiện tại <span className="text-red-500">*</span>
          </label>
          <Input
            type="password"
            required
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1">
            Mật khẩu mới <span className="text-red-500">*</span>
          </label>
          <Input
            type="password"
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1">
            Nhắc lại mật khẩu <span className="text-red-500">*</span>
          </label>
          <Input
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <div className="text-right">
          <Button type="submit" className="bg-orange text-white hover:bg-orangeLight">
            LƯU
          </Button>
        </div>
      </form>
    </div>
  );
}
