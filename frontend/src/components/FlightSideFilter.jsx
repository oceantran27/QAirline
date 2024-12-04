import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"

export function FlightSideFilter() {
    const [budget, setBudget] = useState([1929000, 6400000])
  
    return (
        <Card className="w-full md:w-64 h-fit">
            <CardContent className="p-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Bộ lọc</h2>
                </div>
                <div className="space-y-4">
                    <div>
                    <Label>Khoảng</Label>
                    <Select>
                        <SelectTrigger className="w-full">
                        <SelectValue placeholder="Tất cả" />
                        </SelectTrigger>
                        <SelectContent>
                        <SelectItem value="all">Tất cả</SelectItem>
                        </SelectContent>
                    </Select>
                    </div>
                    <div>
                    <Label>Ngân sách</Label>
                    <div className="flex justify-between text-sm mt-2">
                        <span>{budget[0].toLocaleString()} VND</span>
                        <span>{budget[1].toLocaleString()} VND</span>
                    </div>
                    <Slider
                        min={1929000}
                        max={6400000}
                        step={1000}
                        value={budget}
                        onValueChange={setBudget}
                        className="mt-2"
                    />
                    </div>
                    <div>
                    <Label>Số điểm dừng</Label>
                    <div className="flex items-center space-x-2 mt-2">
                        <Checkbox id="no-stops" />
                        <label htmlFor="no-stops" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Không có túy chọn
                        </label>
                    </div>
                    </div>
                    <div>
                    <div className="space-y-2 mt-2">
                        <Label>Giờ khởi hành</Label>
                        <RadioGroup defaultValue="option-1">
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="option-1" id="option-1" />
                            <Label htmlFor="option-1">00:00 - 11:59 Sáng</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="option-2" id="option-2" />
                            <Label htmlFor="option-2">12:00 - 17:59 Chiều</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="option-3" id="option-3" />
                            <Label htmlFor="option-3">18:00 - 23:59 Tối</Label>
                        </div>
                        </RadioGroup>
                    </div>
                    </div>
                </div>
                <div className="flex justify-between mt-4">
                    <Button variant="outline">Thiết lập lại</Button>
                    <Button className="bg-orange text-white">Áp dụng</Button>
                </div>
            </CardContent>
        </Card>
    )
}