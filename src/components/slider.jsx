import { useState, useEffect, useRef } from "react";

const images = [
  "/img/headshot.png",
  "/img/tennis.png",
  "/img/boat.png",
  "/img/water.png",
  "/img/tennis1.png",
  "/img/bayfront.png",
];

export default function Slider() {
  const [index, setIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);

  const startX = useRef(0);
  const endX = useRef(0);

  
  useEffect(() => {
    const handleResize = () => {
      setVisibleCount(window.innerWidth <= 768 ? 1 : 3);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

 
  useEffect(() => {
    if (index > images.length - visibleCount) {
      setIndex(images.length - visibleCount);
    }
  }, [visibleCount]);

  const nextSlide = () => {
    setIndex((prev) =>
      prev < images.length - visibleCount ? prev + 1 : prev
    );
  };

  const prevSlide = () => {
    setIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

 
  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    endX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const distance = startX.current - endX.current;

    if (distance > 50) {
      nextSlide(); 
    } else if (distance < -50) {
      prevSlide(); 
    }
  };

  return (
    <div className="slider-container">
      <button className="slider-btn left" onClick={prevSlide}>
        ◀
      </button>

      <div
        className="slider-wrapper"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="slider-track"
          style={{
            transform: `translateX(-${index * (100 / visibleCount)}%)`,
          }}
        >
          {images.map((src, i) => (
            <div
              className="slide"
              key={i}
              style={{ flex: `0 0 ${100 / visibleCount}%` }}
            >
              <img src={src} alt={`Slide ${i}`} />
            </div>
          ))}
        </div>
      </div>

      <button className="slider-btn right" onClick={nextSlide}>
        ▶
      </button>
    </div>
  );
}