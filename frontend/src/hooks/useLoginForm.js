import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import errorMessages from "@/lib/errorMessages";

export const useLogin = (onSuccess, onError) => {
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
        const errorKey = data.error || "SERVER_ERROR";
        const errorDetail = errorMessages[errorKey] || "Đã xảy ra lỗi.";
        setErrorMessage(errorDetail);
        if (onError) onError(errorDetail); // Gọi hàm onError nếu có
      }
    } catch (error) {
      console.error("Lỗi khi đăng nhập:", error);
      const fallbackError = error.message.includes("Failed to fetch")
        ? "Không thể kết nối đến server. Kiểm tra mạng hoặc thử lại sau."
        : "Đã xảy ra lỗi không xác định.";
      setErrorMessage(fallbackError);
      if (onError) onError(fallbackError);
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
