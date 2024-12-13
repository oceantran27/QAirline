import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export const useLogin = (onSuccess) => {
  const { login } = useAuth(); // Lấy hàm login từ AuthContext
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch("http://localhost:3030/api/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        const { token } = data;
        login(token); // Gọi hàm login từ AuthContext
        if (onSuccess) onSuccess(); // Chuyển hướng sau khi đăng nhập thành công
      } else {
        setErrorMessage(data.message || "Đã xảy ra lỗi, vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Lỗi khi đăng nhập:", error);
      setErrorMessage("Không thể kết nối đến server. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    loading,
    errorMessage,
    handleInputChange,
    handleSubmit,
  };
};
