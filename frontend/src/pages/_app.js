import '../styles/index.css';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";

function MyApp({ Component, pageProps }) {
  const [showScrollTopButton, setShowScrollTopButton] = useState(false);
  const [lastClickY, setLastClickY] = useState(0);

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
    const mouseY = event.clientY;
    const threshold = 200; 

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
    const handleScroll = () => {
      setShowScrollTopButton(window.scrollY > 300);
    };

    document.addEventListener("click", handleScrollToClick);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("click", handleScrollToClick);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastClickY]);

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
