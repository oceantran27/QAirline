"use client"

import { useState } from "react"
import { Search, Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export default function ScheduledFlights() {
  const [flights, setFlights] = useState([
    { 
      id: 40, aircraft: "Airbus A320", src: "NSK", dest: "BOM",
      adt: "2024-05-22 23:30:00", ddt: "2024-05-23 01:25:00",
      cec: "1002", cbc: "8002", noe: 22, nob: 18, status: "edit"
    },
    { 
      id: 39, aircraft: "Airbus A330", src: "NSK", dest: "BOM",
      adt: "2024-05-22 20:20:00", ddt: "2024-05-22 22:22:00",
      cec: "1002", cbc: "8002", noe: 40, nob: 30, status: "edit"
    },
    { 
      id: 38, aircraft: "Boeing 767", src: "NSK", dest: "BOM",
      adt: "2024-05-22 13:20:00", ddt: "2024-05-22 15:15:00",
      cec: "1003", cbc: "8003", noe: 20, nob: 10, status: "edit"
    },
    { 
      id: 37, aircraft: "Boeing 777", src: "NSK", dest: "BOM",
      adt: "2024-05-22 09:00:00", ddt: "2024-05-22 11:25:00",
      cec: "1002", cbc: "0", noe: 25, nob: 0, status: "running"
    },
    { 
      id: 36, aircraft: "Airbus A320", src: "NSK", dest: "BOM",
      adt: "2024-05-22 03:15:00", ddt: "2024-05-22 05:20:00",
      cec: "1001", cbc: "8001", noe: 25, nob: 13, status: "arrived"
    },
    { 
      id: 35, aircraft: "Boeing 767", src: "NSK", dest: "BOM",
      adt: "2024-05-20 17:00:00", ddt: "2024-05-20 19:10:00",
      cec: "1010", cbc: "8010", noe: 20, nob: 18, status: "arrived"
    },
    { 
      id: 34, aircraft: "Boeing 777", src: "NSK", dest: "BOM",
      adt: "2024-05-20 13:20:00", ddt: "2024-05-20 14:40:00",
      cec: "1002", cbc: "8002", noe: 20, nob: 10, status: "arrived"
    },
    { 
      id: 33, aircraft: "Airbus A320", src: "NSK", dest: "BOM",
      adt: "2024-05-20 11:10:00", ddt: "2024-05-20 12:10:00",
      cec: "1000", cbc: "8000", noe: 30, nob: 18, status: "arrived"
    },
  ])

  const [searchQuery, setSearchQuery] = useState("")

  const filteredFlights = flights.filter(flight => 
    flight.id.toString().includes(searchQuery.toLowerCase()) ||
    flight.aircraft.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleRemove = (id) => {
    setFlights(flights.filter(flight => flight.id !== id))
  }

  const getStatusBadge = (flight) => {
    switch(flight.status) {
      case 'running':
        return <Badge className="bg-yellow-400 hover:bg-yellow-400 text-black">Đang Bay</Badge>
      case 'arrived':
        return <Badge className="bg-green-600 hover:bg-green-600">Đã Hạ Cánh</Badge>
      default:
        return (
          <div className="flex gap-2">
            <Button 
              size="sm"
              className="bg-cyan-500 hover:bg-cyan-600 text-white text-xs px-3 py-1 h-7"
            >
              Sửa
            </Button>
            <Button 
              size="sm"
              variant="destructive" 
              onClick={() => handleRemove(flight.id)}
              className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 h-7"
            >
              Xóa
            </Button>
          </div>
        )
    }
  }

  return (
    <div className="pt-10 pl-64 mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Quản Lý Chuyến Bay</h1>
        <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium">
          <Plus className="mr-2 h-4 w-4" />
          CHUYẾN BAY MỚI
        </Button>
      </div>

      <div className="relative mb-6">
        <Input
          type="text"
          placeholder="Tìm kiếm chuyến bay sử dụng tên tàu bay hoặc ID"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-4 pr-10 h-10 border rounded"
        />
        <Button 
          size="sm" 
          className="absolute right-0 top-0 h-10 bg-blue-500 hover:bg-blue-600 rounded-l-none"
        >
          <Search className="h-4 w-4" />
        </Button>
      </div>

      <div className="border rounded-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="w-[80px] text-center">ID</TableHead>
              <TableHead className="text-center">LOẠI MÁY BAY</TableHead>
              <TableHead className="text-center">CẤT CÁNH</TableHead>
              <TableHead className="text-center">HẠ CÁNH</TableHead>
              <TableHead className="text-center">PHỔ THÔNG</TableHead>
              <TableHead className="text-center">THƯƠNG GIA</TableHead>
              <TableHead className="text-center">TÙY CHỈNH</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredFlights.map((flight) => (
              <TableRow key={flight.id} className={flight.id % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <TableCell className="text-center">{flight.id}</TableCell>
                <TableCell className="text-center">{flight.aircraft}</TableCell>
                <TableCell className="text-center">{`${flight.src} ${flight.adt}`}</TableCell>
                <TableCell className="text-center">{`${flight.dest} ${flight.ddt}`}</TableCell>
                <TableCell className="text-center">{`${flight.cec} VND x ${flight.noe}`}</TableCell>
                <TableCell className="text-center">{`${flight.cbc} VND x ${flight.nob}`}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    {getStatusBadge(flight)}
                    <Button 
                      size="sm"
                      className="bg-cyan-500 hover:bg-cyan-600 text-white text-xs px-3 py-1 h-7"
                    >
                      Xem
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}