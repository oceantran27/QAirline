// components/Footer.js
import {
  MdPhone,
  MdOutlineMailOutline,
  MdOutlineLocationOn,
} from "react-icons/md";

export default function Footer() {
  return (
    <footer className="bg-[url(/bg-map-2.png)] bg-[#313041] py-16 bg-contain">
      <div className="text-[#A9A8B6] flex lg:flex-nowrap flex-wrap justify-between max-w-[1200px] xl:px-0 px-6 mx-auto gap-10">
        
        {/* Phần thông tin liên hệ */}
        <div className="lg:w-1/3">
          <img src="/logo-white.png" alt="Logo" width={130} />
          <p className="my-5">
            Welcome to our Trip and Tour Agency. Lorem simply text amet cing elit.
          </p>
          <div className="border-t border-[#A9A8B6] pt-[15px]">
            <ul className="flex flex-col gap-4">
              <a href="#" className="flex items-center gap-2 hover:text-orange">
                <MdPhone className="text-orange" /> 92 666 888 0000
              </a>
              <a href="#" className="flex items-center gap-2 hover:text-orange">
                <MdOutlineMailOutline className="text-orange" /> contact@example.com
              </a>
              <a href="#" className="flex items-center gap-2 hover:text-orange">
                <MdOutlineLocationOn className="text-orange" /> 66 Broklyn Street New York, USA
              </a>
            </ul>
          </div>
        </div>

        {/* Phần thông tin công ty */}
        <div className="lg:w-1/5">
          <h6 className="text-white text-xl font-bold my-5 lg:mt-0">Company</h6>
          <ul className="flex flex-col gap-4">
            <a href="#" className="hover:text-white">About us</a>
            <a href="#" className="hover:text-white">Community Blogs</a>
            <a href="#" className="hover:text-white">Rewards</a>
            <a href="#" className="hover:text-white">Work with us</a>
            <a href="#" className="hover:text-white">Contact</a>
          </ul>
        </div>

        {/* Phần khám phá */}
        <div className="lg:w-1/5">
          <h6 className="text-white text-xl font-bold my-5 lg:mt-0">Explore</h6>
          <ul className="flex flex-col gap-4">
            <a href="#" className="hover:text-white">Account</a>
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Affiliate Program</a>
            <a href="#" className="hover:text-white">Our Partner</a>
            <a href="#" className="hover:text-white">Events</a>
          </ul>
        </div>

        {/* Phần đăng ký nhận tin */}
        <div className="flex flex-col lg:w-1/3">
          <h6 className="text-white text-xl font-bold my-5 lg:mt-0">Newsletter</h6>
          <input
            type="email"
            placeholder="Email Address"
            className="bg-[#00000033] rounded-lg text-center hover:bg-[#0000004d] h-14 outline-none"
          />
          <button className="mt-2 mb-4 bg-orange rounded-lg text-center text-white h-14 outline-none hover:opacity-90">
            SUBSCRIBE
          </button>
          <label className="text-[#A9A8B6]">
            <input type="checkbox" className="mr-2" /> I agree to all terms and policies
          </label>
        </div>
      </div>
    </footer>
  );
}
