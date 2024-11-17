// pages/_app.js
import '../styles/index.css';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Hàm cuộn mượt mà
    const smoothScroll = (targetPosition, duration) => {
      const startPosition = window.scrollY;
      const distance = targetPosition - startPosition;
      let startTime = null;

      const animation = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);

        // Hàm easing cho hiệu ứng mượt mà
        const ease = (t) => t * (2 - t); // Easing function

        const scrollY = startPosition + distance * ease(progress);
        window.scrollTo(0, scrollY);

        if (progress < 1) {
          requestAnimationFrame(animation);
        }
      };

      requestAnimationFrame(animation);
    };

    // Hàm xử lý khi bấm chuột
    const handleScrollToClick = (event) => {
      const mouseY = event.clientY;
      const targetPosition = window.scrollY + mouseY - window.innerHeight / 2;
      smoothScroll(targetPosition, 800); // Cuộn trong 800ms
    };

    // Thêm sự kiện click vào toàn bộ tài liệu
    document.addEventListener("click", handleScrollToClick);

    // Dọn dẹp sự kiện khi rời khỏi trang
    return () => {
      document.removeEventListener("click", handleScrollToClick);
    };
  }, []);

  return (
    <>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
