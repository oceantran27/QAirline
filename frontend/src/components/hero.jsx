// components/Hero.js
import { MdSearch, MdOutlineDateRange, MdLocationOn,  MdUpgrade, MdEventSeat, MdShoppingBag, MdHotel, MdMiscellaneousServices } from "react-icons/md";
import dynamic from "next/dynamic";
import "react-multi-carousel/lib/styles.css";
import { GiDeer, GiHangGlider, GiFishingBoat } from "react-icons/gi";
import { CiFlag1 } from "react-icons/ci";
import { WiTime3 } from "react-icons/wi";
import { FaPeopleCarry, FaLocationArrow, FaCalendarCheck } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";

// Import `Carousel` với dynamic import để tắt SSR
const Carousel = dynamic(() => import("react-multi-carousel"), { ssr: false });

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

export default function Hero() {
  return (
    <div className="relative bg-black lg:h-[80vh]" data-aos="fade-down" data-aos-delay="300" data-aos-duration="3000">
      <video
        autoPlay
        muted
        loop
        className="absolute z-10 w-full h-full lg:top-0 -top-[12vh] object-cover opacity-55"
      >
        <source src="/video.mp4" type="video/mp4" />
      </video>

      <div className="flex flex-col items-center justify-center relative z-10 lg:h-full h-screen max-w-[1200px] px-6 lg:pt-0 pt-16 mx-auto">
        <p className="text-3xl text-orange">Let's explore</p>
        <h4 className="lg:text-[52px] text-3xl text-white">Where Would You Like To Go?</h4>
        <p className="text-gray text-2xl my-8">Checkout Beautiful Places Around the World.</p>

        <div className="bg-white grid lg:grid-cols-5 grid-cols-1 rounded-lg w-full">
          <span className="flex items-center py-7 border-r border-gray relative pl-4">
            <MdLocationOn className="text-4xl text-orange" />
            <span className="flex flex-col justify-center absolute h-full left-16 right-2">
              <p className="text-gray text-sm">From</p>
              <select className="text-sm font-bold w-full">
                <option>Destinations</option>
                <option>Asia</option>
                <option>Europe</option>
                <option>Middle East</option>
                <option>World</option>
              </select>
            </span>
          </span>

          <span className="flex items-center py-7 border-r border-gray relative pl-4">
            <FaLocationArrow className="text-4xl text-orange" />
            <span className="flex flex-col justify-center absolute h-full left-16 right-2">
              <p className="text-gray text-sm">To</p>
              <select className="text-sm font-bold w-full">
                <option>Activity</option>
                <option>Adventure</option>
                <option>Beach</option>
                <option>City Tours</option>
                <option>Cruises</option>
                <option>Discovery</option>
                <option>Historical</option>
                <option>New</option>
              </select>
            </span>
          </span>

          <span className="flex items-center py-7 border-r border-gray relative pl-4">
            <MdOutlineDateRange className="text-4xl text-orange" />
            <span className="flex flex-col justify-center absolute h-full left-16 right-2">
              <p className="text-gray text-sm">Depart Date</p>
              <input type="date" className="text-sm font-bold w-full" />
            </span>
          </span>

          <span className="flex items-center py-7 border-r border-gray relative pl-4">
            <FaCalendarCheck className="text-4xl text-orange" />
            <span className="flex flex-col justify-center absolute h-full left-16 right-2">
              <p className="text-gray text-sm">Return Date</p>
              <input type="date" className="text-sm font-bold w-full" />
            </span>
          </span>
          

          <button className="bg-orange text-white flex items-center justify-center gap-4 py-6 outline-none border-none rounded-r-lg font-semibold text-sm transition duration-300 ease-in-out hover:shadow-lg hover:shadow-orange-500/50">
            <MdSearch size={20} /> SEARCH
          </button>

        </div>

        <img src="/line-arrow.png" alt="Arrow" className="my-4" />
        <p className="text-white font-semibold text-[28px]">or browse the selected type</p>
      </div>

      <div className="py-16 lg:-mt-24 relative z-10 max-w-[1200px] px-6 mx-auto">
      <Carousel
            partialVisible={false}
            swipeable={true}
            draggable={false} 
            responsive={responsive}
            ssr={true}
            infinite
            autoPlay={true}
            arrows={true}
            keyBoardControl={true}
            itemClass="carouselItem"
          >
            <div className="shadow-xl bg-white p-8 mb-10 rounded-lg flex flex-col justify-center items-center gap-4">
              <MdUpgrade className="rounded-full w-20 h-20 p-4 bg-[#e5faf5] text-[#3fd2a8] hover:bg-orange hover:text-white" />
              <p className="font-bold">Upgrade</p>
            </div>

            <div className="shadow-xl bg-white p-8 mb-10 rounded-lg flex flex-col justify-center items-center gap-4">
              <MdEventSeat className="rounded-full w-20 h-20 p-4 bg-[#26B2EC24] text-[#06aff6] hover:bg-orange hover:text-white" />
              <p className="font-bold">Seat Selection</p>
            </div>

            <div className="shadow-xl bg-white p-8 mb-10 rounded-lg flex flex-col justify-center items-center gap-4">
              <MdShoppingBag className="rounded-full w-20 h-20 p-4 bg-[#f5ecfd] text-[#9e60e5] hover:bg-orange hover:text-white" />
              <p className="font-bold">Shopping</p>
            </div>

            <div className="shadow-xl bg-white p-8 mb-10 rounded-lg flex flex-col justify-center items-center gap-4">
              <MdHotel className="rounded-full w-20 h-20 p-4 bg-[#fff4de] text-[#f6b23b] hover:bg-orange hover:text-white" />
              <p className="font-bold">Hotels & Tours</p>
            </div>

            <div className="shadow-xl bg-white p-8 mb-10 rounded-lg flex flex-col justify-center items-center gap-4">
              <MdMiscellaneousServices className="rounded-full w-20 h-20 p-4 bg-[#D036321C] text-[#d03632] hover:bg-orange hover:text-white" />
              <p className="font-bold">Other Services</p>
            </div>
          </Carousel>
      </div>
    </div>
  );
}
