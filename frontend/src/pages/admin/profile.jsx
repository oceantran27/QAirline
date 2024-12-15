'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { useRouter } from 'next/router'

export default function AdminProfilePage() {
    const router = useRouter()

  const [admin, setAdmin] = useState({
    uid: 'ADM001',
    firstname: 'John',
    lastname: 'Doe',
    email: 'john.doe@example.com'
  })

  const [editForm, setEditForm] = useState({ ...admin })
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleEditSubmit = (e) => {
    e.preventDefault()
    setAdmin(editForm)
    alert("Profile Updated")
  }

  const handlePasswordReset = (e) => {
    e.preventDefault()
    if (newPassword !== confirmPassword) {
      alert("Error: Passwords do not match.")
      return
    }
    // Here you would typically call an API to update the password
    alert("Your password has been reset successfully.")
    setNewPassword('')
    setConfirmPassword('')
  }

  const handleDeleteAccount = () => {
    // Here you would typically call an API to delete the account
    alert("Account Deleted")
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    router.push("/admin")
  }

  return (
    <div className="container mx-auto pt-10 pl-64 space-y-6">
      <h1 className="text-2xl font-semibold">Hồ sơ cá nhân</h1>

      <Card>
        <CardHeader>
          <CardTitle>Thông tin cơ bản</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p><strong>UID:</strong> {admin.uid}</p>
            <p><strong>Tên:</strong> {admin.firstname}</p>
            <p><strong>Họ:</strong> {admin.lastname}</p>
            <p><strong>Email:</strong> {admin.email}</p>
          </div>
        </CardContent>
        <CardFooter>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Chỉnh sửa</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Thông tin hồ sơ</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleEditSubmit}>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="firstname">Tên</Label>
                    <Input
                      id="firstname"
                      value={editForm.firstname}
                      onChange={(e) => setEditForm({...editForm, firstname: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastname">Họ</Label>
                    <Input
                      id="lastname"
                      value={editForm.lastname}
                      onChange={(e) => setEditForm({...editForm, lastname: e.target.value})}
                    />
                  </div>
                </div>
                <DialogFooter className="mt-4">
                  <Button type="submit">Lưu thay đổi</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Đặt lại mật khẩu</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePasswordReset} className="space-y-4">
            <div>
              <Label htmlFor="newPassword">Mật khẩu mới</Label>
              <Input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="confirmPassword">Gõ lại mật khẩu mới</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <Button type="submit">Lưu thay đổi</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Cài đặt tài khoản</CardTitle>
        </CardHeader>
        <CardContent>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Xóa tài khoản</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Bạn có chắc chắn muốn xóa tài khoản?</AlertDialogTitle>
                <AlertDialogDescription>
                  Sẽ không thể khôi phục tài khoản một khi đã được xóa. Tất cả những dữ liệu liên quan tới tài khoản của bạn đều sẽ không được lưu lại.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Thoát</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteAccount}>Xóa tài khoản</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <Button onClick={handleLogout} variant="outline" className="ml-4">Đăng xuất</Button>
        </CardContent>
      </Card>
    </div>
  )
}

