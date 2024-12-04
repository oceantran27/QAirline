"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { CalendarIcon, Plane, TicketIcon, UserCircle } from "lucide-react";

const FlightBookingTabs = () => {
  const [date, setDate] = useState();
  const [returnDate, setReturnDate] = useState();

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="w-full max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <Tabs defaultValue="buy" className="w-full">
          {/* Tab Navigation */}
          <TabsList className="grid w-full grid-cols-3 bg-gray text-textColor h-auto rounded-t-lg">
            <TabsTrigger
              value="buy"
              className="flex items-center gap-2 py-4 text-textColor data-[state=active]:bg-orange data-[state=active]:text-white"
            >
              <Plane className="h-5 w-5" />
              MUA VÉ
            </TabsTrigger>
            <TabsTrigger
              value="manage"
              className="flex items-center gap-2 py-4 text-textColor data-[state=active]:bg-orange data-[state=active]:text-white"
            >
              <TicketIcon className="h-5 w-5" />
              QUẢN LÝ ĐẶT CHỖ
            </TabsTrigger>
            <TabsTrigger
              value="checkin"
              className="flex items-center gap-2 py-4 text-textColor data-[state=active]:bg-orange data-[state=active]:text-white"
            >
              <UserCircle className="h-5 w-5" />
              LÀM THỦ TỤC
            </TabsTrigger>
          </TabsList>

          {/* Mua Vé Tab */}
          <TabsContent value="buy" className="mt-6">
            <div className="space-y-6">
              <RadioGroup defaultValue="one-way" className="flex space-x-4">
                <RadioGroupItem value="one-way" id="one-way" />
                <Label htmlFor="one-way">Một chiều</Label>
                <RadioGroupItem value="round-trip" id="round-trip" />
                <Label htmlFor="round-trip">Khứ hồi</Label>
                <RadioGroupItem value="multi-city" id="multi-city" />
                <Label htmlFor="multi-city">Nhiều chặng</Label>
              </RadioGroup>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Từ</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Hà Nội (HAN), Việt Nam" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="han">
                        Hà Nội (HAN), Việt Nam
                      </SelectItem>
                      <SelectItem value="sgn">
                        Hồ Chí Minh (SGN), Việt Nam
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Đến</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn điểm đến" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sgn">
                        Hồ Chí Minh (SGN), Việt Nam
                      </SelectItem>
                      <SelectItem value="han">
                        Hà Nội (HAN), Việt Nam
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Ngày đi</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "dd/MM/yyyy") : "(DD/MM/YYYY)"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <Calendar selected={date} onSelect={setDate} />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label>Ngày về</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {returnDate
                          ? format(returnDate, "dd/MM/yyyy")
                          : "(DD/MM/YYYY)"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <Calendar
                        selected={returnDate}
                        onSelect={setReturnDate}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <Button className="w-full bg-red">TÌM CHUYẾN BAY</Button>
            </div>
          </TabsContent>

          {/* Quản Lý Đặt Chỗ Tab */}
          <TabsContent value="manage" className="mt-2">
            <div className="flex flex-col gap-2">
              <Input placeholder="Mã đặt chỗ/Số vé điện tử" />
              <Input placeholder="Họ" />
              <Button className="w-full bg-orange">TÌM KIẾM</Button>
            </div>
          </TabsContent>

          {/* Làm Thủ Tục Tab */}
          <TabsContent value="checkin" className="mt-2">
            <div className="flex flex-col gap-2">
              <Input placeholder="Mã đặt chỗ" />
              <Input placeholder="Họ" />
              <Button className="w-full bg-orange">LÀM THỦ TỤC</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FlightBookingTabs;
