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
    <nav className="w-full h-24 flex flex-col justify-center items-center sticky top-0 z-50 bg-white">
      <div className="container mx-auto lg:px-3 w-full">
        <div className="lg:w-full w-11/12 mx-auto h-full flex lg:justify-center justify-between gap-16 items-center">
          <div className="flex flex-col gap-y-4">
            <div className="flex items-center gap-x-2">
              <img src="/logo.png" alt="Logo" className="w-36" />
            </div>
          </div>
          <ul className="flex items-center xl:gap-12 gap-x-4 max-lg:hidden">
            <Link href="/" className="leading-normal no-underline text-lg hover:text-orange">Home</Link>
            <Link href="/tours" className="leading-normal no-underline text-lg hover:text-orange">Tours Page</Link>
            <Link href="/destination" className="leading-normal no-underline text-lg hover:text-orange">Destination</Link>
            <Link href="/news" className="leading-normal no-underline text-lg hover:text-orange">News</Link>
            <Link href="/pages" className="leading-normal no-underline text-lg hover:text-orange">Pages</Link>
            <Link href="/contact" className="leading-normal no-underline text-lg hover:text-orange">Contact</Link>
          </ul>
          <div className="flex gap-4 max-lg:hidden w-40 justify-center">
            
              <button className="rounded-full bg-[#faf5ee] text-gray w-10 h-10 flex items-center justify-center hover:bg-orange hover:text-white">
                <CiSearch size={20} />
              </button>
              
              <Link href="/login">
                <button className="rounded-full bg-[#faf5ee] text-gray w-10 h-10 flex items-center justify-center hover:bg-orange hover:text-white">
                  <BsPersonCircle size={20} />
                </button>
              </Link>        
          </div>
          {dropdown ? (
            <div onClick={showDropdown} className="lg:hidden text-[22px] cursor-pointer">
              <MdClose />
            </div>
          ) : (
            <div onClick={showDropdown} className="lg:hidden text-[22px] cursor-pointer">
              <HiMenuAlt3 />
            </div>
          )}
        </div>
        {dropdown && (
          <div className="lg:hidden w-full fixed top-24 bg-white transition-all">
            <div className="w-full flex flex-col items-baseline gap-4">
              <ul className="flex flex-col justify-center w-full">
                <Link href="/" className="px-6 h-10 flex items-center leading-normal no-underline font-bold text-lg text-[15px] border-0 border-b border-[#ffffff1a] border-solid">Home</Link>
                <Link href="/tours" className="px-6 h-10 flex items-center leading-normal no-underline font-bold text-lg text-[15px] border-0 border-b border-[#ffffff1a] border-solid">Tours Page</Link>
                <Link href="/destination" className="px-6 h-10 flex items-center leading-normal no-underline font-bold text-lg text-[15px] border-0 border-b border-[#ffffff1a] border-solid">Destination</Link>
                <Link href="/news" className="px-6 h-10 flex items-center leading-normal no-underline font-bold text-lg text-[15px] border-0 border-b border-[#ffffff1a] border-solid">News</Link>
                <Link href="/pages" className="px-6 h-10 flex items-center leading-normal no-underline font-bold text-lg text-[15px] border-0 border-b border-[#ffffff1a] border-solid">Pages</Link>
                <Link href="/contact" className="px-6 h-10 flex items-center leading-normal no-underline font-bold text-lg text-[15px] border-0 border-b border-[#ffffff1a] border-solid">Contact</Link>
              </ul>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
