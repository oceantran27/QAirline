import Link from 'next/link'
import { LayoutDashboard, Plane, CalendarDays, ClipboardList, Users, UserPen, FileText, LogOut } from 'lucide-react'

const navItems = [
  { 
    name: 'Tổng quan', 
    href: '/admin/dashboard', 
    icon: LayoutDashboard 
  },
  { 
    name: 'Quản lý chuyến bay', 
    href: '/admin/flights', 
    icon: CalendarDays 
  },
  { 
    name: 'Danh sách hành khách', 
    href: '/admin/passengers', 
    icon: Users 
  },
  { 
    name: 'Thông tin & bài đăng', 
    href: '/admin/posts', 
    icon: FileText 
  },
  { 
    name: 'Quản lý quyền', 
    href: '/admin/members', 
    icon: UserPen 
  },
  { 
    name: 'Đăng xuất', 
    href: '#', 
    icon: LogOut 
  },
]

export default function Navbar() {
  return (
    <div className="h-screen w-64 bg-zinc-900 text-zinc-400">
      <div className="p-6 border-b border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="p-1.5 bg-orange rounded">
            <Plane className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-lg font-semibold text-white">QAIRLINE ADMIN</h1>
        </div>
      </div>
      <nav className="p-4">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors hover:bg-orange/10 hover:text-orange text-white`}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  )
}