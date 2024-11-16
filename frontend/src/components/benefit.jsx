// components/Benefit.js
import dynamic from "next/dynamic";
import {
  MdArrowCircleRight,
  MdArrowRight,
  MdComment,
  MdPerson,
} from "react-icons/md";
import { RiFlightTakeoffFill } from "react-icons/ri";
import { GiRuleBook } from "react-icons/gi";
import "react-multi-carousel/lib/styles.css";
import Link from "next/link";

// Import `Carousel` với dynamic import để tắt SSR
const Carousel = dynamic(() => import("react-multi-carousel"), { ssr: false });

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 3,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

// Component Card
const Card = ({ image, text }) => (
  <div>
    <div className="relative overflow-hidden rounded-t-lg">
      <img src={image} alt="" className="rounded-t-lg hoverImg" />
      <p className="font-bold text-white bg-orange flex flex-col w-fit pt-3 pb-7 px-6 absolute right-0 bottom-0 rounded-tl-lg">
        08 <span className="font-normal text-xs">DEC</span>
      </p>
    </div>
    <div className="border border-[#ebe6de] rounded-b-lg relative">
      <div className="absolute w-full h-5 -top-5 bg-white rounded-t-[20px]"></div>
      <div className="p-6">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 text-xs">
            <MdPerson className="text-orange text-base" /> ADMIN
          </span>
          <span className="flex items-center gap-1 text-xs">
            <MdComment className="text-orange text-base" /> 0 COMMENTS
          </span>
        </div>
        <h4 className="text-2xl font-semibold py-2 hover:text-orange">{text}</h4>
        <p className="pt-2 leading-8">
          There are many variations of but the majority have simply free text available not suffered.
        </p>
        <a href="#" className="flex items-center gap-2 text-orange text-sm font-bold mt-2">
          READ MORE <MdArrowRight />
        </a>
      </div>
    </div>
  </div>
);

export default function Benefit() {
  return (
    <div>
      {/* Phần giới thiệu */}
      <section className="lg:flex">
        <div className="lg:w-[45%]" data-aos="fade-down">
          <img src="/bg-2.jpg" alt="Background" className="h-full" />
        </div>
        <div className="relative lg:w-[55%] bg-[url(/bg-map-2.png)] bg-[#313041] bg-right-bottom bg-contain flex flex-col justify-center py-16">
          <div className="absolute lg:w-3 w-0 bg-orange left-0 rounded-r-[10px] top-[120px] bottom-[120px]"></div>
          <div className="lg:w-[55%] lg:pl-24 px-6">
            <p className="text-xl text-orange" data-aos="fade-up">Danh sách lợi ích của chúng tôi</p>
            <h4 className="text-white lg:text-[50px] text-[30px] py-4" data-aos="fade-up">Tại sao chọn Tevily</h4>
            <p className="text-gray leading-8" data-aos="fade-down">
              Có nhiều biến thể của các đoạn văn của Lorem Ipsum chỉ đơn giản là văn bản miễn phí có sẵn trên thị trường cho bạn, nhưng phần lớn đã bị thay đổi dưới một số hình thức.
            </p>

            {/* Các lợi ích */}
            <div className="flex lg:flex-row flex-col items-center gap-8 pt-16" data-aos="fade-up">
              <span>
                <RiFlightTakeoffFill className="text-orange text-5xl" />
              </span>
              <span>
                <h6 className="text-white text-xl">Chuyên nghiệp và được chứng nhận</h6>
                <p className="text-gray leading-8 py-4">
                  Lorem ipsum chỉ đơn giản là văn bản miễn phí dolor sit nhưng phần lớn đã bị thay đổi amet, consectetur notted.
                </p>
              </span>
            </div>
            <div className="flex lg:flex-row flex-col items-center gap-8 pt-6" data-aos="fade-up">
              <span>
                <GiRuleBook className="text-orange text-5xl" />
              </span>
              <span>
                <h6 className="text-white text-xl">Đặt tour ngay lập tức</h6>
                <p className="text-gray leading-8 py-4">
                  Lorem ipsum chỉ đơn giản là văn bản miễn phí dolor sit nhưng phần lớn đã bị thay đổi amet, consectetur notted.
                </p>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Phần carousel bài viết */}
      <section className="lg:pt-28 pt-14 pb-14" data-aos="fade-up">
        <div className="max-w-[1200px] xl:px-0 px-6 mx-auto">
          <div className="lg:flex items-center justify-between">
            <span>
              <p className="text-xl text-orange pb-4">Từ trang tin tức</p>
              <p className="lg:text-[50px] text-3xl text-textColor font-semibold">Tin tức và Bài viết</p>
            </span>
            <Link href="/news">
              <button className="bg-orange text-white text-xs font-bold rounded-md px-8 h-12 hoverBtn">
                XEM TOÀN BỘ
              </button>
            </Link>
          </div>
          <div className="pt-16">
            <Carousel
              partialVisible={false}
              swipeable
              draggable={false}
              responsive={responsive}
              ssr={false}
              infinite
              autoPlay
              arrows
              keyBoardControl
              itemClass="carouselItem"
            >
              <Card image="/post-1.jpg" text="Những điều cần xem và làm khi đến thăm Nhật Bản" />
              <Card image="/post-2.jpg" text="Một nơi để bắt đầu cuộc sống mới với sự bình yên" />
              <Card image="/post-3.jpg" text="Những hành trình được đo lường tốt nhất với bạn bè" />
              <Card image="/post-4.jpg" text="Du lịch đến những nơi đẹp nhất trên thế giới" />
            </Carousel>
          </div>
        </div>
      </section>

      {/* Phần tham gia thành viên */}
      <div className="bg-[#faf5ee]" data-aos="fade-down">
        <div className="flex flex-wrap max-w-[1200px] xl:px-0 px-6 mx-auto lg:pt-28 pt-14">
          <div className="lg:w-1/2">
            <p className="text-xl text-orange pb-4">Tham gia với chúng tôi</p>
            <p className="lg:text-[50px] text-3xl text-textColor font-semibold">
              Bạn đã là thành viên chưa?
            </p>
            <p className="text-[#757783] py-4">
              Tham gia với chúng tôi! Các thành viên của chúng tôi có thể tiết kiệm lên đến 50%.
            </p>
            <div className="flex gap-4 pt-6">
              <button className="bg-orange text-white text-xs font-bold rounded flex gap-2 px-8 h-12 items-center hoverBtn hover:bg-orange hover:text-textColor">
                <MdArrowCircleRight size={20} /> &nbsp;ĐĂNG NHẬP&nbsp;
              </button>
              <button className="bg-white text-textColor text-xs font-bold rounded flex gap-2 px-8 h-12 items-center hoverBtn hover:bg-orange">
                <MdPerson size={20} /> ĐĂNG KÝ
              </button>
            </div>
          </div>
          <div className="flex justify-center lg:w-1/2 w-full lg:mt-0 mt-14">
            <img src="/image-app.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
