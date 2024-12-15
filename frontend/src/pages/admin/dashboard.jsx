'use client'

import { Plane, Users, RefreshCw } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const flightStatusData = [
  { name: 'Chưa Cất Cánh', value: 3 },
  { name: 'Đang Bay', value: 2 },
  { name: 'Đã Hạ Cánh', value: 35 }
]

const aircraftData = [
  { name: 'Airbus A320', value: 3 },
  { name: 'Airbus A330', value: 2 },
  { name: 'Boeing 767', value: 1 },
  { name: 'Boeing 777', value: 2 }
]

const COLORS = ['#3b82f6', '#ef4444', '#84cc16', '#06b6d4']

export default function Dashboard() {
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/admin')
    }
  }, [router])

  return (
    <div className="container mx-auto pt-10 pl-64 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Available Aircrafts */}
        <Card>
          <CardContent className="flex items-center p-6">
            <div className="p-2 bg-gray rounded-lg">
              <Plane className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Tổng số máy bay</p>
              <h3 className="text-2xl font-bold">4</h3>
              <p className="text-sm text-green-600 mt-1">Lorem ipsum dolor sit</p>
            </div>
          </CardContent>
        </Card>

        {/* Available Flights */}
        <Card>
          <CardContent className="flex items-center p-6">
            <div className="p-2 bg-green-500 rounded-lg">
              <Plane className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Tổng số chuyến bay</p>
              <h3 className="text-2xl font-bold">8</h3>
              <p className="text-sm text-muted-foreground mt-1">Lorem ipsum dolor sit</p>
            </div>
          </CardContent>
        </Card>

        {/* Total Bookings */}
        <Card>
          <CardContent className="flex items-center p-6">
            <div className="p-2 bg-purple-600 rounded-lg">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Số vé đã được đặt</p>
              <h3 className="text-2xl font-bold">40</h3>
              <p className="text-sm text-muted-foreground mt-1">Lorem ipsum dolor sit</p>
            </div>
          </CardContent>
        </Card>

        {/* Total Earnings */}
        <Card>
          <CardContent className="flex items-center p-6">
            <div className="p-2 bg-blue-500 rounded-lg">
              <RefreshCw className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Tổng doanh thu</p>
              <h3 className="text-2xl font-bold">236.968$</h3>
              <p className="text-sm text-green-600 mt-1">Lorem ipsum dolor sit</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="p-8">
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Flight Status Chart */}
            <div className="h-[400px]">
              <h3 className="text-lg font-semibold mb-4">Tình trạng các chuyến bay</h3>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={flightStatusData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Bar dataKey="value" fill="#ef4444" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Aircrafts Distribution Chart */}
            <div className="h-[400px]">
              <h3 className="text-lg font-semibold">Các loại máy bay hiện có</h3>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={aircraftData}
                    cx="50%"
                    cy="50%"
                    // label={({ value }) => `${value}`}
                    // outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {aircraftData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend/>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

