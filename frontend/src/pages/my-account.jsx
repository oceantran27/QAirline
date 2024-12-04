import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AccountInfo from "@/components/Account-Information/account-info"
import ActivityHistory from "@/components/Account-Information/activity-history" 
import PasswordChange from "@/components/Account-Information/password-change"
import { Card } from "@/components/ui/card"

export default function AccountPage() {
  return (
    <div className="min-h-screen bg-[#e6f2f7] bg-opacity-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-center text-2xl font-semibold mb-8 text-gray-800">THÔNG TIN TÀI KHOẢN</h1>
        
        <Tabs defaultValue="account" className="w-full ">
          <TabsList className="w-full bg-orangeLight h-auto flex flex-wrap shadow-xl">
            <TabsTrigger 
              value="account" 
              className="flex-1 py-2 transition-all duration-300 ease-in-out "
            >
              Thông tin tài khoản
            </TabsTrigger>
            <TabsTrigger 
              value="history" 
              className="flex-1 py-2 transition-all duration-300 ease-in-out "
            >
              Lịch sử hoạt động
            </TabsTrigger>
            
            <TabsTrigger 
              value="password" 
              className="flex-1 py-2 transition-all duration-300 ease-in-out "
            >
              Thay đổi mật khẩu
            </TabsTrigger>
          </TabsList>

          <Card className="mt-4 border-0 shadow-xl">
            <TabsContent value="account">
              <AccountInfo />
            </TabsContent>
            
            <TabsContent value="history">
              <ActivityHistory />
            </TabsContent>
            
            <TabsContent value="password">
              <PasswordChange />
            </TabsContent>
          </Card>
        </Tabs>
      </div>
    </div>
  )
}
