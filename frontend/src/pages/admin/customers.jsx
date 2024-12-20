"use client"

import { useEffect, useState } from "react"
import { format } from "date-fns"
import { Search } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useRouter } from "next/router"

export default function CustomerManagement() {
    const router = useRouter()
        
    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) {
            router.push('/admin')
        }
        else getAllCustomers()

    }, [router])    

    const [customers, setCustomers] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedCustomer, setSelectedCustomer] = useState(null)

    const filteredCustomers = customers.filter(
        (customer) =>
        customer.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const getAllCustomers = async () => {
        const getAllCustomersApi = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/customer/all`
    
        try { 
            const response = await fetch(getAllCustomersApi, {
                method: "GET",
                headers: {
                    "admin": "true",
                    "authorization": "Bearer " + localStorage.getItem("token")
                }, 
            })
            if (!response.ok) {
                throw new Error("Send request failed")
            }
    
            const res = await response.json()
            setCustomers(res.data.map(a => {return {
                // "arrival": `${a.arrivalCity} ${new Date(a.arrivalTime.seconds*1000).toISOString().replace("T", " ").slice(0, -5)}`, 
                // "departure": `${a.departureCity} ${new Date(a.departureTime.seconds*1000).toISOString().replace("T", " ").slice(0, -5)}`,
                "uid": a.uid,
                "firstName": a.firstName,
                "lastName": a.lastName,
                "email": a.email,
                "dateOfBirth": a.dateOfBirth.seconds? new Date(a.dateOfBirth.seconds*1000).toISOString().split('T')[0] : a.dateOfBirth.split('T')[0],
                "gender": a.gender,
                "role": "customer",
                "loyaltyPoints": a.loyaltyPoints,
                "createdAt": a.createdAt.seconds ? new Date(a.createdAt.seconds*1000).toISOString().split('T')[0] : a.createdAt.split('T')[0],
              }}))
        } catch (error) {
            alert("Đã xảy ra lối, vui lòng thử lại")
            console.log(error)
        }
      }

  return (
    <div className="container mx-auto py-10 pl-64">
      <h1 className="text-2xl font-semibold mb-5">Quản lý khách hàng</h1>
      <div className="flex items-center space-x-2 mb-4">
        <Input
          placeholder="Tìm kiếm khách hàng..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
          <Search className="h-4 w-4 mr-2" />
          Tìm kiếm
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Họ và tên</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Ngày sinh</TableHead>
            <TableHead>Giới tính</TableHead>
            <TableHead>Điểm tích lũy</TableHead>
            <TableHead>Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCustomers.map((customer) => (
            <TableRow key={customer.uid}>
              <TableCell>{`${customer.lastName} ${customer.firstName}`}</TableCell>
              <TableCell>{customer.email}</TableCell>
              <TableCell>{customer.dateOfBirth}</TableCell>
              <TableCell>{customer.gender === "male" ? "Nam" : "Nữ"}</TableCell>
              <TableCell>{customer.loyaltyPoints}</TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      onClick={() => setSelectedCustomer(customer)}
                    >
                      Xem chi tiết
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Thông tin chi tiết khách hàng</DialogTitle>
                    </DialogHeader>
                    {selectedCustomer && (
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <span className="font-bold">Họ và tên:</span>
                          <span className="col-span-3">{`${selectedCustomer.lastName} ${selectedCustomer.firstName}`}</span>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <span className="font-bold">Email:</span>
                          <span className="col-span-3">{selectedCustomer.email}</span>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <span className="font-bold">Ngày sinh:</span>
                          <span className="col-span-3">
                            {selectedCustomer.dateOfBirth}
                          </span>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <span className="font-bold">Giới tính:</span>
                          <span className="col-span-3">
                            {selectedCustomer.gender === "male" ? "Nam" : "Nữ"}
                          </span>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <span className="font-bold">Điểm tích lũy:</span>
                          <span className="col-span-3">{selectedCustomer.loyaltyPoints}</span>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <span className="font-bold">Ngày tạo:</span>
                          <span className="col-span-3">
                            {selectedCustomer.createdAt}
                          </span>
                        </div>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}