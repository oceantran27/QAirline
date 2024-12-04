// components/Review.js
import dynamic from "next/dynamic";
import "react-multi-carousel/lib/styles.css";
import { MdStar } from "react-icons/md";

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

const responsives = {
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

// Component Card
const Card = ({ image, name, position }) => (
  <div className="flex flex-col items-center">
    <img src={image} alt="" className="rounded-full" />
    <div className="shadow-bg rounded-lg mt-10 bg-white p-8 text-center">
      <span className="flex justify-center">
        {[...Array(5)].map((_, index) => (
          <MdStar key={index} className="text-[#ffa801] text-xl" />
        ))}
      </span>
      <p className="text-[#757783] text-lg leading-8 py-4">
        This is due to their best service, pricing and customer support.
        It’s thoroughly refreshing to see such a personal touch. Duis aute irure
        reprehenderit.
      </p>
      <p className="text-textColor text-xl font-semibold">{name}</p>
      <p className="text text-orange py-2 uppercase">{position}</p>
    </div>
  </div>
);

export default function Review() {
  return (
    <div>
      <div data-aos="fade-up">
        <div className="bg-[url(/bg-plane-bird.png)] bg-contain bg-bottom bg-no-repeat relative z-10">
          <div className="max-w-[1200px] xl:px-0 px-6 mx-auto text-center pt-16">
            <p className="text-orange text-xl pb-2">Testimonials & reviews</p>
            <h4 className="lg:text-[50px] text-[30px] font-bold">What They’re Saying</h4>
            <div className="pt-10">
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
                <Card image="/testimonial-1.jpg" name="Shirley Smith" position="Founder & CEO" />
                <Card image="/testimonial-2.jpg" name="David Anderson" position="Customer" />
                <Card image="/testimonial-4.jpg" name="Shirley Smith" position="Founder & CEO" />
                <Card image="/testimonial-3.jpg" name="Kevin Smith" position="Customer" />
              </Carousel>
            </div>
          </div>
        </div>

        {/* Phần carousel hình ảnh */}
        <div className="pb-24 pt-80 -mt-40 bg-[url(/bg-map.png)] bg-[#faf5ee] bg-contain">
          <Carousel
            partialVisible={false}
            swipeable
            draggable={false}
            responsive={responsives}
            ssr={false}
            infinite
            autoPlay
            arrows
            keyBoardControl
            itemClass="carouselItem"
          >
            <div className="h-[298px] relative overflow-hidden">
              <img src="/post-1.jpg" className="rounded-lg h-full hoverImg" />
            </div>
            <div className="h-[298px] relative overflow-hidden">
              <img src="/post-2.jpg" className="rounded-lg h-full hoverImg" />
            </div>
            <div className="h-[298px] relative overflow-hidden">
              <img src="/post-3.jpg" className="rounded-lg h-full hoverImg" />
            </div>
            <div className="h-[298px] relative overflow-hidden">
              <img src="/post-4.jpg" className="rounded-lg h-full hoverImg" />
            </div>
            <div className="h-[298px] relative overflow-hidden">
              <img src="/post-5.jpg" className="rounded-lg h-full hoverImg" />
            </div>
          </Carousel>
        </div>
      </div>
    </div>
  );
}
