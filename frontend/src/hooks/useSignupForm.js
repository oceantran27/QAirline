import { useState } from 'react';

export const useSignup = (onSuccess) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Mật khẩu và xác nhận mật khẩu không khớp');
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch('http://localhost:3030/api/customer/new', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (onSuccess) onSuccess(); // Chuyển hướng sau khi đăng ký thành công
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Không thể tạo tài khoản');
      }
    } catch (error) {
      console.error('Lỗi khi đăng ký:', error);
      setErrorMessage('Đã xảy ra lỗi khi kết nối đến máy chủ.');
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
