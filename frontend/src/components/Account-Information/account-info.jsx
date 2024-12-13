import Image from "next/image";
import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { fetchCustomerInfo, updateCustomerInfo } from "@/services/customerService";

export default function AccountInfo() {
  const [personalInfo, setPersonalInfo] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  // Lấy thông tin cá nhân từ API
  useEffect(() => {
    const loadCustomerInfo = async () => {
      try {
        const data = await fetchCustomerInfo();
        setPersonalInfo(data);
      } catch (error) {
        setErrorMessage("Không thể tải thông tin cá nhân.");
      } finally {
        setLoading(false);
      }
    };

    loadCustomerInfo();
  }, []);

  // Cập nhật thông tin cá nhân
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateCustomerInfo(personalInfo);
      setIsEditing(false);
      alert("Thông tin đã được cập nhật thành công!");
    } catch (error) {
      setErrorMessage("Cập nhật thông tin thất bại. Vui lòng thử lại.");
    }
  };

  if (loading) return <p>Đang tải...</p>;
  if (errorMessage) return <p className="text-red-600">{errorMessage}</p>;
  if (!personalInfo) return <p>Không tìm thấy thông tin cá nhân.</p>;

  // Chuẩn bị dữ liệu hiển thị
  const memberCardNumber = personalInfo.uid || "";
  const fullName = `${personalInfo.firstName || ""} ${personalInfo.lastName || ""}`.trim();

  let genderLabel = "";
  switch (personalInfo.gender) {
    case "male":
      genderLabel = "Nam";
      break;
    case "female":
      genderLabel = "Nữ";
      break;
    default:
      genderLabel = "Khác";
      break;
  }

  let birthDate = "";
  if (personalInfo.dateOfBirth) {
    const date = new Date(personalInfo.dateOfBirth);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    birthDate = `${day} tháng ${month} năm ${year}`;
  }

  // Khi hiển thị không chỉnh sửa
  const displayData = {
    cardNumber: memberCardNumber,
    fullName: fullName,
    email: personalInfo.email || "",
    address: personalInfo.address || "",
    phoneNumber: personalInfo.phoneNumber || "",
    gender: genderLabel,
    birthDate: birthDate,
  };

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-xl font-medium mb-4 sm:mb-6">Thông tin cá nhân</h2>

      <div className="flex flex-col lg:flex-row lg:space-x-8 space-y-6 lg:space-y-0">
        <div className="w-full lg:w-1/3">
          {/* Card with the airline image */}
          <Card className="p-0 bg-gradient-to-r from-sky-100 to-sky-200 shadow-lg rounded-lg relative h-48 sm:h-64">
            <Image
              src="/QAirline-card.png"
              alt="Lotus Miles"
              fill
              style={{ objectFit: "cover" }}
              className="rounded-lg"
            />
          </Card>
        </div>

        <div className="w-full lg:w-2/3">
          {isEditing ? (
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleUpdate}>
              <div className="space-y-1">
                <label className="text-sm text-gray-600">Số thẻ hội viên</label>
                <input
                  type="text"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg"
                  value={personalInfo.uid || ""}
                  disabled
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm text-gray-600">Họ và tên</label>
                <input
                  type="text"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg"
                  value={fullName}
                  onChange={(e) => {
                    const parts = e.target.value.trim().split(" ");
                    const lastName = parts.pop();
                    const firstName = parts.join(" ");
                    setPersonalInfo({ ...personalInfo, firstName, lastName });
                  }}
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm text-gray-600">Email</label>
                <input
                  type="email"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg"
                  value={personalInfo.email || ""}
                  onChange={(e) =>
                    setPersonalInfo({ ...personalInfo, email: e.target.value })
                  }
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm text-gray-600">Địa chỉ</label>
                <input
                  type="text"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg"
                  value={personalInfo.address || ""}
                  onChange={(e) =>
                    setPersonalInfo({ ...personalInfo, address: e.target.value })
                  }
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm text-gray-600">Số điện thoại</label>
                <input
                  type="text"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg"
                  value={personalInfo.phoneNumber || ""}
                  onChange={(e) =>
                    setPersonalInfo({ ...personalInfo, phoneNumber: e.target.value })
                  }
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm text-gray-600">Giới tính</label>
                <select
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg"
                  value={
                    personalInfo.gender === "male" ||
                    personalInfo.gender === "female" ||
                    personalInfo.gender === "other"
                      ? personalInfo.gender
                      : personalInfo.gender === "Nam"
                      ? "male"
                      : personalInfo.gender === "Nữ"
                      ? "female"
                      : "other"
                  }
                  onChange={(e) =>
                    setPersonalInfo({ ...personalInfo, gender: e.target.value })
                  }
                >
                  <option value="male">Nam</option>
                  <option value="female">Nữ</option>
                  <option value="other">Khác</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-sm text-gray-600">Ngày sinh</label>
                <input
                  type="date"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg"
                  value={
                    personalInfo.dateOfBirth
                      ? personalInfo.dateOfBirth.split("T")[0]
                      : ""
                  }
                  onChange={(e) =>
                    setPersonalInfo({ ...personalInfo, dateOfBirth: e.target.value + "T00:00:00.000Z" })
                  }
                />
              </div>
              <div className="md:col-span-2 pt-2">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-2 bg-orange text-white rounded-lg hover:bg-orangeLight transition-all"
                >
                  Lưu thông tin
                </button>
              </div>
            </form>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
              <div className="space-y-1">
                <div className="text-sm text-gray-600">Số thẻ hội viên</div>
                <div className="font-semibold">{displayData.cardNumber}</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-gray-600">Họ và tên</div>
                <div className="font-semibold">{displayData.fullName}</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-gray-600">Email</div>
                <div className="font-semibold">{displayData.email}</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-gray-600">Địa chỉ</div>
                <div className="font-semibold">{displayData.address}</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-gray-600">Số điện thoại</div>
                <div className="font-semibold">{displayData.phoneNumber}</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-gray-600">Giới tính</div>
                <div className="font-semibold">{displayData.gender}</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-gray-600">Ngày sinh</div>
                <div className="font-semibold">{displayData.birthDate}</div>
              </div>
              <div className="md:col-span-2 pt-2">
                <button
                  onClick={() => setIsEditing(true)}
                  className="w-full sm:w-auto px-6 py-2 bg-orange text-white rounded-lg hover:bg-orangeLight transition-all"
                >
                  Cập nhật thông tin
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
