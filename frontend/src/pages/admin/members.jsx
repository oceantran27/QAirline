'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    repeatPassword: ''
  })

  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Thiếu tên đăng nhập'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Thiếu email'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ'
    }
    
    if (!formData.password) {
      newErrors.password = 'Thiếu mật khẩu'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Độ dài mật khẩu tối thiểu 6 ký tự'
    }
    
    if (formData.password !== formData.repeatPassword) {
      newErrors.repeatPassword = 'Mật khẩu không khớp'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (validateForm()) {
      // Send the data to backend
      console.log('Form submitted:', formData)
      // Clear form after successful submission
      setFormData({
        name: '',
        email: '',
        password: '',
        repeatPassword: ''
      })
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  return (
    <div className="pl-64 m-auto min-h-screen w-2/4 flex items-center justify-center bg-gray-50/50">
      <Card className="w-full max-w-md p-2">
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4 pt-4">
            <div>
              <Input
                type="text"
                name="name"
                placeholder="Tên"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? 'border-red-500' : ''}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <Input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'border-red-500' : ''}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <Input
                type="password"
                name="password"
                placeholder="Mật Khẩu"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? 'border-red-500' : ''}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <div>
              <Input
                type="password"
                name="repeatPassword"
                placeholder="Nhập Lại Mật Khẩu"
                value={formData.repeatPassword}
                onChange={handleChange}
                className={errors.repeatPassword ? 'border-red-500' : ''}
              />
              {errors.repeatPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.repeatPassword}</p>
              )}
            </div>

            <Button 
              type="submit" 
              className="w-full bg-blue-500 hover:bg-blue-600"
            >
              Lưu
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

