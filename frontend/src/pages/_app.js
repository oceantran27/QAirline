import '../styles/index.css';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const [showScrollTopButton, setShowScrollTopButton] = useState(false);
  const [lastClickY, setLastClickY] = useState(0);
  const router = useRouter();

  const smoothScroll = (targetPosition, duration) => {
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    let startTime = null;

    const animation = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);

      const ease = (t) => t * (2 - t);

      const scrollY = startPosition + distance * ease(progress);
      window.scrollTo(0, scrollY);

      if (progress < 1) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  };

  const handleScrollToClick = (event) => {
    // Bỏ qua nếu click xảy ra trên thẻ liên kết hoặc nút điều hướng
    if (event.target.tagName === "A" || event.target.tagName === "BUTTON") return;

    const mouseY = event.clientY;
    const threshold = 200; // Ngưỡng để tránh cuộn không mong muốn

    if (Math.abs(mouseY - lastClickY) < threshold) return;

    setLastClickY(mouseY);

    const targetPosition = window.scrollY + mouseY - window.innerHeight / 2;
    smoothScroll(targetPosition, 800);
  };

  const handleScrollToTop = (event) => {
    event.stopPropagation();
    smoothScroll(0, 800);
  };

  useEffect(() => {
    // Tự động cuộn lên đầu khi chuyển trang
    const handleRouteChange = () => {
      window.scrollTo(0, 0);
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    // Lắng nghe sự kiện click để sử dụng handleScrollToClick
    document.addEventListener("click", handleScrollToClick);

    // Lắng nghe sự kiện scroll để hiển thị nút cuộn lên đầu
    const handleScroll = () => {
      setShowScrollTopButton(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
      document.removeEventListener("click", handleScrollToClick);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastClickY, router.events]);

  return (
    <>
      <Navbar />
      <Component {...pageProps} />
      <Footer />

      {showScrollTopButton && (
        <button
          onClick={handleScrollToTop}
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            padding: "10px 15px",
            backgroundColor: "#A9A8B6",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
          }}
        >
          ↑
        </button>
      )}
    </>
  );
}

export default MyApp;
