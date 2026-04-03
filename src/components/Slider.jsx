import React, { useState } from "react";

const Slider = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleSlides = 3; 
  const gap = 1; 

  const totalSlides = slides.length;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex >= totalSlides - visibleSlides ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex <= 0 ? totalSlides - visibleSlides : prevIndex - 1
    );
  };

  return (
    <div className="image-slider">
      <button className="slider-btn prev" onClick={prevSlide}>
        ❮
      </button>

      <ul
        style={{
          transform: `translateX(-${(currentIndex * (100 + gap)) / visibleSlides}%)`,
        }}
      >
        {slides.map((slide, index) => (
          <li key={index}>
            <img src={slide.src} alt={slide.alt} />
          </li>
        ))}
      </ul>

      <button className="slider-btn next" onClick={nextSlide}>
        ❯
      </button>
    </div>
  );
};

export default Slider;