import React from 'react'
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Download } from 'lucide-react'

const passengers = [
  {
    id: 10,
    name: "Mr. Sanat Pillai",
    mobile: "9359738142",
    dob: "2003-10-04",
    gender: "Male",
    prn: "80420240010"
  },
  {
    id: 11,
    name: "Miss. Aarya Gaikwad",
    mobile: "7666939050",
    dob: "2002-11-10", 
    gender: "Female",
    prn: "80420240011"
  }
]

export default function PassengerList() {
  return (
    <div className="pt-10 pl-64 m-auto space-y-6 bg-white rounded-lg">
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <h2 className="text-2xl text-muted-foreground">Total Bookings : 2/50</h2>
          <div className="text-sm text-muted-foreground space-x-4">
            <span>Economy Class : 0/25</span>
            <span>Business Class : 0/0</span>
            <span>First Class : 2/25</span>
          </div>
          <div className="text-base">
            ( ATQ to KOC )
          </div>
        </div>
        <div className="text-right">
          <h1 className="text-2xl mb-2">Flight No : 202</h1>
          <div className="text-sm text-muted-foreground">
            <div>ADT : 2024-04-09 07:30:00</div>
            <div>DDT : 2024-04-09 10:00:00</div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Passenger Lists</h3>
          <Button className="bg-yellow-400 hover:bg-yellow-500 text-black">
            <Download className="mr-2 h-4 w-4" />
            EXPORT
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">#</TableHead>
              <TableHead>NAME</TableHead>
              <TableHead>MOBILE NO</TableHead>
              <TableHead>DOB</TableHead>
              <TableHead>GENDER</TableHead>
              <TableHead>PRN</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {passengers.map((passenger) => (
              <TableRow key={passenger.id}>
                <TableCell>{passenger.id}</TableCell>
                <TableCell>{passenger.name}</TableCell>
                <TableCell>{passenger.mobile}</TableCell>
                <TableCell>{passenger.dob}</TableCell>
                <TableCell>{passenger.gender}</TableCell>
                <TableCell>{passenger.prn}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

