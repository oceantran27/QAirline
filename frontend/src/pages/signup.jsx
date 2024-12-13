import React, { useState } from 'react';
import Link from "next/link";
import { Eye, EyeOff } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useSignup } from '@/hooks/useSignupForm'; 

const ErrorMessage = ({ message }) => (
  <p className="text-red-600 text-center">{message}</p>
);

export default function SignupForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    formData,
    loading,
    errorMessage,
    handleInputChange,
    handleSubmit,
  } = useSignup(() => router.push('/login'));

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('/clouds-background.jpg')",
      }}
    >
      <Card className="w-full max-w-md bg-white shadow-xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold text-center text-[#e8604c]">Tạo Tài Khoản</CardTitle>
          <CardDescription className="text-center">
            Nhập thông tin của bạn để đăng ký tài khoản mới
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {errorMessage && <ErrorMessage message={errorMessage} />}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">Tên</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="Hùng"
                  required
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#e8604c]"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">Họ</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Nguyễn Văn"
                  required
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#e8604c]"
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#e8604c]"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">Mật Khẩu</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#e8604c]"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">Xác Nhận Mật Khẩu</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#e8604c]"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>
            <Button
              type="submit"
              className="w-full bg-[#e8604c] hover:bg-[#d55643] text-white"
              disabled={loading}
            >
              {loading ? 'Đang đăng ký...' : 'Đăng Ký'}
            </Button>
          </form>
        </CardContent>
        <div className="px-6 py-4 bg-gray-50 rounded-b-lg">
          <p className="text-sm text-center text-gray-600">
            Đã có tài khoản?{' '}
            <Link href="/login">
              <Button variant="link" className="p-0 text-[#e8604c] hover:text-[#d55643]">
                Đăng Nhập
              </Button>
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
}
