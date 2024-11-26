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
    <div className="p-6">
      <h2 className="text-xl font-medium mb-6">Thông tin cá nhân</h2>

      <div className="flex flex-col md:flex-row md:space-x-8 space-y-8 md:space-y-0">
        <div className="w-full md:w-1/3 space-y-4">
          {/* Card with the airline image */}
          <Card className="p-0 bg-gradient-to-r from-sky-100 to-sky-200 shadow-lg rounded-lg relative h-32 sm:h-48 md:h-64 lg:h-72">
            <Image
              src="/QAirline-card.png"
              alt="Lotus Miles"
              fill // Use 'fill' directly, no need for 'layout'
              style={{ objectFit: "cover" }} // Use 'style' to apply objectFit instead of 'objectFit'
              className="rounded-lg"
            />
          </Card>
        </div>

        <div className="w-full md:w-2/3 space-y-4">
          {/* Personal Info */}
          {isEditing ? (
            <form className="grid grid-cols-1 sm:grid-cols-2 gap-4" onSubmit={handleUpdate}>
              <div>
                <label className="text-gray-600">Số thẻ hội viên</label>
                <input
                  type="text"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg"
                  value={personalInfo.cardNumber}
                  disabled
                />
              </div>
              <div>
                <label className="text-gray-600">Họ và tên</label>
                <input
                  type="text"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg"
                  value={personalInfo.fullName}
                  onChange={(e) =>
                    setPersonalInfo({ ...personalInfo, fullName: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-gray-600">Email</label>
                <input
                  type="email"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg"
                  value={personalInfo.email}
                  onChange={(e) =>
                    setPersonalInfo({ ...personalInfo, email: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-gray-600">Địa chỉ</label>
                <input
                  type="text"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg"
                  value={personalInfo.address}
                  onChange={(e) =>
                    setPersonalInfo({ ...personalInfo, address: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-gray-600">Số điện thoại</label>
                <input
                  type="text"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg"
                  value={personalInfo.phoneNumber}
                  onChange={(e) =>
                    setPersonalInfo({ ...personalInfo, phoneNumber: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-gray-600">Giới tính</label>
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
              <div>
                <label className="text-gray-600">Ngày sinh</label>
                <input
                  type="date"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg"
                  value={personalInfo.birthDate}
                  onChange={(e) =>
                    setPersonalInfo({ ...personalInfo, birthDate: e.target.value })
                  }
                />
              </div>
              <div className="col-span-2">
                <button
                  type="submit"
                  className="w-full md:w-auto px-6 py-2 bg-orange text-white rounded-lg hover:bg-orangeLight transition-all"
                >
                  Lưu thông tin
                </button>
              </div>
            </form>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div className="text-gray-600">Số thẻ hội viên</div>
                <div className="font-semibold">{personalInfo.cardNumber}</div>
              </div>
              <div>
                <div className="text-gray-600">Họ và tên</div>
                <div className="font-semibold">{personalInfo.fullName}</div>
              </div>
              <div>
                <div className="text-gray-600">Email</div>
                <div className="font-semibold">{personalInfo.email}</div>
              </div>
              <div>
                <div className="text-gray-600">Địa chỉ</div>
                <div className="font-semibold">{personalInfo.address}</div>
              </div>
              <div>
                <div className="text-gray-600">Số điện thoại</div>
                <div className="font-semibold">{personalInfo.phoneNumber}</div>
              </div>
              <div>
                <div className="text-gray-600">Giới tính</div>
                <div className="font-semibold">{personalInfo.gender}</div>
              </div>
              <div>
                <div className="text-gray-600">Ngày sinh</div>
                <div className="font-semibold">{personalInfo.birthDate}</div>
              </div>
              <div className="col-span-2">
                <button
                  onClick={() => setIsEditing(true)}
                  className="w-full md:w-auto px-6 py-2 bg-orange text-white rounded-lg hover:bg-orangeLight transition-all"
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
