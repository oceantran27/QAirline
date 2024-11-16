// components/About.js
import { FaPlay } from "react-icons/fa";
import { GiDeer, GiHangGlider } from "react-icons/gi";
import { CiFlag1 } from "react-icons/ci";
import { MdOutlineParagliding } from "react-icons/md";

export default function About() {
  return (
    <div>
      {/* Phần giới thiệu với nền hình ảnh */}
      <div className="bg-[url(/bg-1.jpg)] bg-cover bg-center bg-no-repeat py-24 w-full">
        <div className="lg:flex gap-12 max-w-[1200px] px-6 mx-auto">
          <div className="lg:w-1/2 w-full">
            <span data-aos="fade-up-right">
              <button className="animate-pulse rounded-lg bg-orange w-20 h-20 flex justify-center items-center mb-8">
                <FaPlay className="text-white" />
              </button>
              <p className="text-orange text-xl pb-2">
                Bạn đã sẵn sàng để bay chưa?
              </p>
            </span>
            <p
              className="lg:text-[50px] leading-normal text-2xl font-bold text-white lg:pb-0 pb-4"
              data-aos="fade-up-right"
            >
              QAirline là nền tảng đặt vé máy bay hàng đầu thế giới
            </p>
          </div>

          {/* Phần các loại tour */}
          <div
            className="grid md:grid-cols-2 grid-cols-1 gap-2"
            data-aos="fade-up-right"
          >
            <div
              className="border border-gray rounded-lg p-10 flex flex-col items-center gap-4 text-orange hover:bg-orange hover:text-white transition-bg hover:border-transparent"
              data-aos="fade-down-right"
            >
              <GiDeer className="text-2xl w-20 h-20" />
              <p className="text-white text-xl font-semibold">Wildlife Tours</p>
            </div>
            <div
              className="border border-gray rounded-lg p-10 flex flex-col items-center gap-4 text-orange hover:bg-orange hover:text-white transition-bg hover:border-transparent"
              data-aos="fade-down-right"
            >
              <MdOutlineParagliding className="text-2xl w-20 h-20" />
              <p className="text-white text-xl font-semibold">
                Paragliding Tours
              </p>
            </div>
            <div
              className="border border-gray rounded-lg p-10 flex flex-col items-center gap-4 text-orange hover:bg-orange hover:text-white transition-bg hover:border-transparent"
              data-aos="fade-down-right"
            >
              <CiFlag1 className="text-2xl w-20 h-20" />
              <p className="text-white text-xl font-semibold">
                Adventure Tours
              </p>
            </div>
            <div
              className="border border-gray rounded-lg p-10 flex flex-col items-center gap-4 text-orange hover:bg-orange hover:text-white transition-bg hover:border-transparent"
              data-aos="fade-down-right"
            >
              <GiHangGlider className="text-2xl w-20 h-20" />
              <p className="text-white text-xl font-semibold">
                Hand Gliding Tours
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Phần đối tác */}
      <div
        className="bg-[url(/bg-line.png)] bg-contain bg-bottom bg-orange py-[100px]"
        data-aos="fade-down"
      >
        <div className="flex lg:flex-nowrap flex-wrap justify-between gap-16 max-w-[1200px] xl:px-0 px-6 mx-auto">
          <p className="text-[40px] font-bold text-white whitespace-pre">
            Đối tác của chúng tôi
          </p>
          <div className="flex flex-wrap gap-8 justify-between w-full">
            <img src="/vietnam_airline.png" alt="Brand 1" height={100} width={200} />
            <img src="/air_france.png" alt="Brand 3" height={100} width={200}/>
            <img src="/aeroflot.png" alt="Brand 5" height={100} width={200}/>
          </div>
        </div>
      </div>
    </div>
  );
}
