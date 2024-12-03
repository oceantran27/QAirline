import Image from "next/image";
import { Card } from "@/components/ui/card";
import { useState } from "react";

export default function AccountInfo() {
  const [personalInfo, setPersonalInfo] = useState({
    cardNumber: "9055295987",
    fullName: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    address: "123 Đường ABC, Quận 1, TP.HCM",
    phoneNumber: "0123456789",
    gender: "Nam",
    birthDate: "1990-01-01",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = (e) => {
    e.preventDefault();
    setIsEditing(false);
    alert("Thông tin đã được cập nhật!");
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
          {/* Personal Info */}
          {isEditing ? (
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleUpdate}>
              <div className="space-y-1">
                <label className="text-sm text-gray-600">Số thẻ hội viên</label>
                <input
                  type="text"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg"
                  value={personalInfo.cardNumber}
                  disabled
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm text-gray-600">Họ và tên</label>
                <input
                  type="text"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg"
                  value={personalInfo.fullName}
                  onChange={(e) =>
                    setPersonalInfo({ ...personalInfo, fullName: e.target.value })
                  }
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm text-gray-600">Email</label>
                <input
                  type="email"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg"
                  value={personalInfo.email}
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
                  value={personalInfo.address}
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
                  value={personalInfo.phoneNumber}
                  onChange={(e) =>
                    setPersonalInfo({ ...personalInfo, phoneNumber: e.target.value })
                  }
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm text-gray-600">Giới tính</label>
                <select
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg"
                  value={personalInfo.gender}
                  onChange={(e) =>
                    setPersonalInfo({ ...personalInfo, gender: e.target.value })
                  }
                >
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                  <option value="Khác">Khác</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-sm text-gray-600">Ngày sinh</label>
                <input
                  type="date"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg"
                  value={personalInfo.birthDate}
                  onChange={(e) =>
                    setPersonalInfo({ ...personalInfo, birthDate: e.target.value })
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
                <div className="font-semibold">{personalInfo.cardNumber}</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-gray-600">Họ và tên</div>
                <div className="font-semibold">{personalInfo.fullName}</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-gray-600">Email</div>
                <div className="font-semibold break-words">{personalInfo.email}</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-gray-600">Địa chỉ</div>
                <div className="font-semibold">{personalInfo.address}</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-gray-600">Số điện thoại</div>
                <div className="font-semibold">{personalInfo.phoneNumber}</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-gray-600">Giới tính</div>
                <div className="font-semibold">{personalInfo.gender}</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-gray-600">Ngày sinh</div>
                <div className="font-semibold">{personalInfo.birthDate}</div>
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

