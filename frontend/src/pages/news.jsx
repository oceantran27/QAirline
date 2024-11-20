// pages/news.js
import React from 'react';
import { FeaturedNewsCard, NewsCard } from '@/components/NewsCards';
import latestNews from '../data/latestNews.json';
import featuredArticles from '../data/featuredArticles.json';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

// Định nghĩa responsive
const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1280 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 1280, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 640 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 640, min: 0 },
    items: 1,
  },
};

const news = () => {
  // Thêm onButtonClick vào featured articles
  const featuredArticlesWithHandlers = featuredArticles.map((article) => ({
    ...article,
    onButtonClick: () => {
      // Xử lý sự kiện click, ví dụ: điều hướng đến trang bài viết
    },
  }));

  // Thêm onButtonClick vào latest news
  const latestNewsWithHandlers = latestNews.map((article) => ({
    ...article,
    onButtonClick: () => {
      // Xử lý sự kiện click
    },
  }));

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Phần Bài Viết Nổi Bật */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
          Bài viết nổi bật
        </h2>
        <Carousel
          swipeable
          draggable={false}
          showDots
          responsive={responsive}
          ssr={true}
          infinite
          autoPlay
          autoPlaySpeed={5000}
          keyBoardControl
          customTransition="all .5s"
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={['tablet', 'mobile']}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
        >
          {featuredArticlesWithHandlers.map((article, index) => (
            <FeaturedNewsCard key={index} {...article} />
          ))}
        </Carousel>
      </section>

      {/* Phần Tin Tức Mới Nhất */}
      <section>
        <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
          Tin tức mới nhất
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {latestNewsWithHandlers.map((article, index) => (
            <NewsCard key={index} {...article} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default news;
