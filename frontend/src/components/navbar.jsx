import { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdClose } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { BsPersonCircle } from "react-icons/bs";
import Link from "next/link";

export default function Navbar() {
  const [dropdown, setDropdown] = useState(false);

  const showDropdown = () => {
    setDropdown(!dropdown);
  };

  return (
    <nav className="w-full h-24 flex items-center sticky top-0 z-50 bg-white nav-shadow">
      <div className="max-w-screen-xl mx-auto w-full px-4">
        <div className="flex items-center justify-between w-full">
          {/* Logo */}
          <div className="flex items-center ml-4">
            <Link href="/">
              <img src="/logo.png" alt="Logo" className="w-36" />
            </Link>
          </div>

          {/* Menu */}
          <ul className="flex items-center flex-1 justify-center gap-x-8 lg:gap-x-12 max-lg:hidden">
            <li>
              <Link href="/" className="leading-normal no-underline text-lg hover:text-orange">
                Trang chủ
              </Link>
            </li>
            <li>
              <Link href="/tours" className="leading-normal no-underline text-lg hover:text-orange">
                Chuyến bay
              </Link>
            </li>
            <li>
              <Link href="/news" className="leading-normal no-underline text-lg hover:text-orange">
                Tin tức
              </Link>
            </li>
            <li>
              <Link href="/contact" className="leading-normal no-underline text-lg hover:text-orange">
                Liên hệ
              </Link>
            </li>
          </ul>

          {/* Nút tìm kiếm và đăng nhập */}
          <div className="flex items-center gap-4 max-lg:hidden mr-8">
            <button className="rounded-full bg-[#faf5ee] text-gray w-10 h-10 flex items-center justify-center hover:bg-orange hover:text-white">
              <CiSearch size={20} />
            </button>
            <Link href="/login">
              <button className="rounded-full bg-[#faf5ee] text-gray w-10 h-10 flex items-center justify-center hover:bg-orange hover:text-white">
                <BsPersonCircle size={20} />
              </button>
            </Link>
          </div>

          {/* Icon menu cho di động */}
          <div onClick={showDropdown} className="lg:hidden text-[22px] cursor-pointer">
            {dropdown ? <MdClose /> : <HiMenuAlt3 />}
          </div>
        </div>

        {/* Menu dropdown cho di động */}
        {dropdown && (
          <div className="lg:hidden w-full fixed top-24 bg-white transition-all">
            <div className="w-full flex flex-col items-start gap-4">
              <ul className="flex flex-col justify-center w-full">
                <li>
                  <Link
                    href="/"
                    className="px-6 h-10 flex items-center leading-normal no-underline font-bold text-lg border-b border-gray-200"
                  >
                    Trang chủ
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tours"
                    className="px-6 h-10 flex items-center leading-normal no-underline font-bold text-lg border-b border-gray-200"
                  >
                    Chuyến bay
                  </Link>
                </li>
                
                <li>
                  <Link
                    href="/news"
                    className="px-6 h-10 flex items-center leading-normal no-underline font-bold text-lg border-b border-gray-200"
                  >
                    Tin tức
                  </Link>
                </li>
                
                <li>
                  <Link
                    href="/contact"
                    className="px-6 h-10 flex items-center leading-normal no-underline font-bold text-lg border-b border-gray-200"
                  >
                    Liên hệ
                  </Link>
                </li>
                <li>
                  <Link
                    href="/login"
                    className="px-6 h-10 flex items-center leading-normal no-underline font-bold text-lg border-b border-gray-200 text-orange"
                  >
                    Đăng nhập
                  </Link>
                </li>
                <li>
                  <Link
                    href="/signup"
                    className="px-6 h-10 flex items-center leading-normal no-underline font-bold text-lg border-b border-gray-200 text-orange"
                  >
                    Đăng ký
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
