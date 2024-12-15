'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plane, TicketIcon, UserCircle } from 'lucide-react';
import SearchForm from "./SearchFlightsForm";

const FlightBookingTabs = () => {
  const [date, setDate] = useState();
  const [returnDate, setReturnDate] = useState();

  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-full  mx-auto p-3 bg-white shadow-lg rounded-lg">
        
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
          <TabsContent value="buy" className="mt-2">
            <SearchForm />
          </TabsContent>

          {/* Quản Lý Đặt Chỗ Tab */}
          <TabsContent value="manage" className="mt-2">
            <div className='flex flex-col gap-2'>
              <Input placeholder="Mã đặt chỗ/Số vé điện tử" />
              <Input placeholder="Hòm thư điện tử" />
              <Button className="w-full bg-orange">TÌM KIẾM</Button>  
            </div>
          </TabsContent>

          {/* Làm Thủ Tục Tab */}
          <TabsContent value="checkin" className="mt-2">
            <div className='flex flex-col gap-2'>
              <Input placeholder="Mã đặt chỗ" />
              <Input placeholder="Hòm thư điện tử" />
              <Button className="w-full bg-orange">LÀM THỦ TỤC</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FlightBookingTabs;
