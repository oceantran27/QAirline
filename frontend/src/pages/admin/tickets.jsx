'use client'

import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

// Mock data for flights (replace with actual API call)
const mockFlights = [
  { id: 'F001', departure: '2023-06-01T10:00:00Z', arrival: '2023-06-01T12:00:00Z' },
  { id: 'F002', departure: '2023-06-02T14:00:00Z', arrival: '2023-06-02T16:00:00Z' },
  { id: 'F003', departure: '2023-06-02T14:00:00Z', arrival: '2023-06-02T16:00:00Z' },
  { id: 'F004', departure: '2023-06-02T14:00:00Z', arrival: '2023-06-02T16:00:00Z' },
  { id: 'F005', departure: '2023-06-02T14:00:00Z', arrival: '2023-06-02T16:00:00Z' },
  { id: 'F006', departure: '2023-06-02T14:00:00Z', arrival: '2023-06-02T16:00:00Z' },
  { id: 'F007', departure: '2023-06-02T14:00:00Z', arrival: '2023-06-02T16:00:00Z' },
  { id: 'F008', departure: '2023-06-02T14:00:00Z', arrival: '2023-06-02T16:00:00Z' },
  { id: 'F009', departure: '2023-06-02T14:00:00Z', arrival: '2023-06-02T16:00:00Z' },
  { id: 'F000', departure: '2023-06-02T14:00:00Z', arrival: '2023-06-02T16:00:00Z' },
]

// Mock data for tickets (replace with actual API call)
const mockTickets = [
  {
    "status": "Active",
    "seatCode": "14C",
    "updatedAt": { "seconds": 1734241062, "nanoseconds": 873000000 },
    "ownerData": {
      "dateOfBirth": "1985-05-15",
      "gender": "Female",
      "phoneNumber": "0912345678",
      "lastName": "Thi B",
      "firstName": "Tran",
      "identityCardNumber": "987654321098",
      "address": "456 Le Loi, Da Nang"
    },
    "bookingId": "BK1734241062517",
    "flightClass": "economy",
    "ticketId": "TK1734241062863",
    "price": 1000000,
    "flightId": "F001",
    "createdAt": { "seconds": 1734241062, "nanoseconds": 873000000 }
  },
  {
    "status": "Active",
    "seatCode": "14C",
    "updatedAt": { "seconds": 1734241062, "nanoseconds": 873000000 },
    "ownerData": {
      "dateOfBirth": "1985-05-15",
      "gender": "Female",
      "phoneNumber": "0912345678",
      "lastName": "Thi B",
      "firstName": "Tran",
      "identityCardNumber": "987654321098",
      "address": "456 Le Loi, Da Nang"
    },
    "bookingId": "BK1734241062517",
    "flightClass": "economy",
    "ticketId": "TK1734241062863",
    "price": 1000000,
    "flightId": "F001",
    "createdAt": { "seconds": 1734241062, "nanoseconds": 873000000 }
  },
  {
    "status": "Active",
    "seatCode": "14C",
    "updatedAt": { "seconds": 1734241062, "nanoseconds": 873000000 },
    "ownerData": {
      "dateOfBirth": "1985-05-15",
      "gender": "Female",
      "phoneNumber": "0912345678",
      "lastName": "Thi B",
      "firstName": "Tran",
      "identityCardNumber": "987654321098",
      "address": "456 Le Loi, Da Nang"
    },
    "bookingId": "BK1734241062517",
    "flightClass": "economy",
    "ticketId": "TK1734241062863",
    "price": 1000000,
    "flightId": "F001",
    "createdAt": { "seconds": 1734241062, "nanoseconds": 873000000 }
  },
  {
    "status": "Active",
    "seatCode": "14C",
    "updatedAt": { "seconds": 1734241062, "nanoseconds": 873000000 },
    "ownerData": {
      "dateOfBirth": "1985-05-15",
      "gender": "Female",
      "phoneNumber": "0912345678",
      "lastName": "Thi B",
      "firstName": "Tran",
      "identityCardNumber": "987654321098",
      "address": "456 Le Loi, Da Nang"
    },
    "bookingId": "BK1734241062517",
    "flightClass": "economy",
    "ticketId": "TK1734241062863",
    "price": 1000000,
    "flightId": "F001",
    "createdAt": { "seconds": 1734241062, "nanoseconds": 873000000 }
  },
  {
    "status": "Active",
    "seatCode": "14C",
    "updatedAt": { "seconds": 1734241062, "nanoseconds": 873000000 },
    "ownerData": {
      "dateOfBirth": "1985-05-15",
      "gender": "Female",
      "phoneNumber": "0912345678",
      "lastName": "Thi B",
      "firstName": "Tran",
      "identityCardNumber": "987654321098",
      "address": "456 Le Loi, Da Nang"
    },
    "bookingId": "BK1734241062517",
    "flightClass": "economy",
    "ticketId": "TK1734241062863",
    "price": 1000000,
    "flightId": "F001",
    "createdAt": { "seconds": 1734241062, "nanoseconds": 873000000 }
  },
  {
    "status": "Active",
    "seatCode": "14C",
    "updatedAt": { "seconds": 1734241062, "nanoseconds": 873000000 },
    "ownerData": {
      "dateOfBirth": "1985-05-15",
      "gender": "Female",
      "phoneNumber": "0912345678",
      "lastName": "Thi B",
      "firstName": "Tran",
      "identityCardNumber": "987654321098",
      "address": "456 Le Loi, Da Nang"
    },
    "bookingId": "BK1734241062517",
    "flightClass": "economy",
    "ticketId": "TK1734241062863",
    "price": 1000000,
    "flightId": "F001",
    "createdAt": { "seconds": 1734241062, "nanoseconds": 873000000 }
  },
  {
    "status": "Active",
    "seatCode": "14C",
    "updatedAt": { "seconds": 1734241062, "nanoseconds": 873000000 },
    "ownerData": {
      "dateOfBirth": "1985-05-15",
      "gender": "Female",
      "phoneNumber": "0912345678",
      "lastName": "Thi B",
      "firstName": "Tran",
      "identityCardNumber": "987654321098",
      "address": "456 Le Loi, Da Nang"
    },
    "bookingId": "BK1734241062517",
    "flightClass": "economy",
    "ticketId": "TK1734241062863",
    "price": 1000000,
    "flightId": "F001",
    "createdAt": { "seconds": 1734241062, "nanoseconds": 873000000 }
  },
  {
    "status": "Active",
    "seatCode": "14C",
    "updatedAt": { "seconds": 1734241062, "nanoseconds": 873000000 },
    "ownerData": {
      "dateOfBirth": "1985-05-15",
      "gender": "Female",
      "phoneNumber": "0912345678",
      "lastName": "Thi B",
      "firstName": "Tran",
      "identityCardNumber": "987654321098",
      "address": "456 Le Loi, Da Nang"
    },
    "bookingId": "BK1734241062517",
    "flightClass": "economy",
    "ticketId": "TK1734241062863",
    "price": 1000000,
    "flightId": "F001",
    "createdAt": { "seconds": 1734241062, "nanoseconds": 873000000 }
  },
  {
    "status": "Active",
    "seatCode": "14C",
    "updatedAt": { "seconds": 1734241062, "nanoseconds": 873000000 },
    "ownerData": {
      "dateOfBirth": "1985-05-15",
      "gender": "Female",
      "phoneNumber": "0912345678",
      "lastName": "Thi B",
      "firstName": "Tran",
      "identityCardNumber": "987654321098",
      "address": "456 Le Loi, Da Nang"
    },
    "bookingId": "BK1734241062517",
    "flightClass": "economy",
    "ticketId": "TK1734241062863",
    "price": 1000000,
    "flightId": "F001",
    "createdAt": { "seconds": 1734241062, "nanoseconds": 873000000 }
  },
  // Add more mock tickets as needed
]

export default function FlightManagement() {
  const [flights, setFlights] = useState([])
  const [selectedFlight, setSelectedFlight] = useState(null)
  const [tickets, setTickets] = useState([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    // Fetch flights data (replace with actual API call)
    setFlights(mockFlights)
  }, [])

  const handleFlightClick = (flight) => {
    setSelectedFlight(flight)
    // Fetch tickets for the selected flight (replace with actual API call)
    setTickets(mockTickets.filter(ticket => ticket.flightId === flight.id))
    setIsDialogOpen(true)
  }

  return (
    <div className="container mx-auto pt-10 pl-64">
      <h1 className="text-2xl font-semibold mb-10">Quản Lý Đặt Vé</h1>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Cất cánh</TableHead>
            <TableHead>Hạ cánh</TableHead>
            <TableHead>Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {flights.map((flight) => (
            <TableRow key={flight.id}>
              <TableCell>{flight.id}</TableCell>
              <TableCell>{format(new Date(flight.departure), 'dd/MM/yyyy HH:mm')}</TableCell>
              <TableCell>{format(new Date(flight.arrival), 'dd/MM/yyyy HH:mm')}</TableCell>
              <TableCell>
                <Button className="bg-green-600 hover:bg-green-500" onClick={() => handleFlightClick(flight)}>Xem vé</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>Danh sách vé - Chuyến bay {selectedFlight?.id}</DialogTitle>
            <DialogDescription>
              Cất cánh: {selectedFlight && format(new Date(selectedFlight.departure), 'dd/MM/yyyy HH:mm')} - 
              Hạ cánh: {selectedFlight && format(new Date(selectedFlight.arrival), 'dd/MM/yyyy HH:mm')}
            </DialogDescription>
          </DialogHeader>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã vé</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Ghế</TableHead>
                <TableHead>Hạng</TableHead>
                <TableHead>Giá</TableHead>
                <TableHead>Thông tin hành khách</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tickets.map((ticket) => (
                <TableRow key={ticket.ticketId}>
                  <TableCell>{ticket.ticketId}</TableCell>
                  <TableCell>
                    <Badge variant={ticket.status === 'Active' ? 'success' : 'secondary'}>
                      {ticket.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{ticket.seatCode}</TableCell>
                  <TableCell>{ticket.flightClass}</TableCell>
                  <TableCell>{ticket.price.toLocaleString('vi-VN')} VND</TableCell>
                  <TableCell>
                    <p>{`${ticket.ownerData.firstName} ${ticket.ownerData.lastName}`}</p>
                    <p>{ticket.ownerData.phoneNumber}</p>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DialogContent>
      </Dialog>
    </div>
  )
}

