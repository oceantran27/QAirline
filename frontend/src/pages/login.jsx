import React from 'react'
import Link from "next/link";

import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
      email: '',
      password: ''
    })
  
    const handleInputChange = (e) => {
      const { name, value } = e.target
      setFormData(prevData => ({
        ...prevData,
        [name]: value
      }))
    }
  
    const handleSubmit = (e) => {
      e.preventDefault()
      // Here you would typically handle the login logic
      console.log('Login attempted:', formData)
    }
  
    return (
      <div className="flex items-center justify-center min-h-screen bg-cover bg-center"
          style={{
              backgroundImage: "url('/clouds-background.jpg')",
          }}
      >
        <Card className="w-full max-w-md bg-white shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold text-center text-[#e8604c]">Welcome Back</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
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
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">Password</Label>
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
              <Button type="submit" className="w-full bg-[#e8604c] hover:bg-[#d55643] text-white">
                Login
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <Button variant="link" className="text-[#e8604c] hover:text-[#d55643]">
              Forgot your password?
            </Button>
            <p className="text-sm text-center text-gray-600">
              Don&apos;t have an account?{' '}
              <Link href="/signup">
                <Button variant="link" className="p-0 text-[#e8604c] hover:text-[#d55643]">
                    Sign up
                </Button>
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    )
  }