import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { format, isWithinInterval } from "date-fns";

export default function ActivityHistory({ activityData = [] }) {
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [filteredData, setFilteredData] = useState(activityData);

  const handleSearch = () => {
    if (!fromDate || !toDate) {
      setFilteredData(activityData);
      return;
    }

    const filtered = activityData.filter((activity) => {
      const activityDate = new Date(activity.date);
      return isWithinInterval(activityDate, { start: fromDate, end: toDate });
    });

    setFilteredData(filtered);
  };

  return (
    <div className="p-6">
      {/* Tiêu đề */}
      <h2 className="text-xl font-medium mb-6">Lịch sử hoạt động</h2>

      {/* Bộ lọc ngày và nút tìm kiếm */}
      <div className="flex gap-4 mb-6 items-end">
        {/* Từ ngày */}
        <div className="flex-1">
          <label className="block text-sm mb-1">Từ ngày:</label>
          <Popover>
            <PopoverTrigger asChild>
              <button className="text-sm font-bold w-full justify-start text-left pl-0 border-b border-gray-400 py-1">
                {fromDate ? format(fromDate, "PPP") : "Chọn ngày"}
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0 border shadow-lg">
              <Calendar
                mode="single"
                selected={fromDate}
                onSelect={setFromDate}
                className="border-none shadow-none"
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Đến ngày */}
        <div className="flex-1">
          <label className="block text-sm mb-1">Đến ngày:</label>
          <Popover>
            <PopoverTrigger asChild>
              <button className="text-sm font-bold w-full justify-start text-left pl-0 border-b border-gray-400 py-1">
                {toDate ? format(toDate, "PPP") : "Chọn ngày"}
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0 border shadow-lg">
              <Calendar
                mode="single"
                selected={toDate}
                onSelect={setToDate}
                className="border-none shadow-none"
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Nút tìm kiếm */}
        <Button
          onClick={handleSearch}
          className="h-10 px-6 bg-orange text-white hover:bg-orangeLight transition-all"
        >
          TÌM KIẾM
        </Button>
      </div>

      {/* Bảng lịch sử hoạt động */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Ngày</TableHead>
            <TableHead>Loại giao dịch</TableHead>
            <TableHead>Mã đặt chỗ</TableHead>
            <TableHead>Chi tiết</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.length > 0 ? (
            filteredData.map((activity, index) => (
              <TableRow key={index}>
                <TableCell>{format(new Date(activity.date), "dd/MM/yyyy")}</TableCell>
                <TableCell>{activity.type}</TableCell>
                <TableCell>{activity.bookingCode}</TableCell>
                <TableCell>{activity.details || "-"}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-gray-500">
                Không có dữ liệu phù hợp.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
