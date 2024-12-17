'use client'

import { useState } from 'react'
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const formSchema = z.object({
  idNumber: z.string().length(12, { message: "Số Căn Cước Công Dân phải có 12 chữ số" }),
  lastName: z.string().min(1, { message: "Họ không được để trống" }),
  firstName: z.string().min(1, { message: "Tên không được để trống" }),
  phoneNumber: z.string().regex(/^0\d{9}$/, { message: "Số điện thoại không hợp lệ" }),
  birthDate: z.date({
    required_error: "Vui lòng chọn ngày sinh",
  }),
  gender: z.enum(["Male", "Female", "Other"], {
    required_error: "Vui lòng chọn giới tính",
  }),
  address: z.string().min(1, { message: "Địa chỉ không được để trống" }),
})

export default function PersonalInfoForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      idNumber: "",
      lastName: "",
      firstName: "",
      phoneNumber: "",
      address: "",
    },
  })

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-semibold text-center mb-6 text-primary">
        Thông Tin Cá Nhân
      </h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="idNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Số Căn Cước Công Dân*</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="123456789012" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Họ*</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Nguyen" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tên*</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Van A" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Số điện thoại*</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="0987654321" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="birthDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Ngày sinh*</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "dd/MM/yyyy", { locale: vi })
                        ) : (
                          <span>Chọn ngày sinh</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                      locale={vi}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Giới tính*</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn giới tính" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Male">Nam</SelectItem>
                    <SelectItem value="Female">Nữ</SelectItem>
                    <SelectItem value="Other">Khác</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Địa chỉ*</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="123 Nguyen Trai, Ha Noi" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">Gửi</Button>
        </form>
      </Form>
    </div>
  )
}

