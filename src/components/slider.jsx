import { useState } from "react";
<link rel="stylesheet" href="/style.css" />

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

  const visibleCount = 3;

  const nextSlide = () => {
    if (index < images.length - visibleCount) {
      setIndex(index + 1);
    }
  };

  const prevSlide = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  return (
    <div className="slider-container">
      <button className="slider-btn left" onClick={prevSlide}>
        ◀
      </button>

      <div className="slider-wrapper">
        <div
          className="slider-track"
          style={{
            transform: `translateX(-${index * (100 / visibleCount)}%)`,
          }}
        >
          {images.map((src, i) => (
            <div className="slide" key={i}>
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