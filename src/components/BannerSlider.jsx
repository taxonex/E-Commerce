import { useState, useEffect } from "react";
import "./css/BannerSlider.css";

const banners = [
  "https://m.media-amazon.com/images/G/31/img22/pcacc/bau/COMPUTERACC.png",
  "https://m.media-amazon.com/images/G/31/img24/Fashion/AF/BAU/Winterflip/Unrec/herotator/Pc/Beauty_1500x400_1._CB544017564_.jpg",
  "https://m.media-amazon.com/images/G/31/koop/_1500x300._CB803206489_.gif",
];

export default function BannerSlider() {
  const [current, setCurrent] = useState(0);

  // Auto slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 4000); // 4 seconds
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % banners.length);
  };

  return (
    <div className="banner-slider">
      {banners.map((img, index) => (
        <div
          key={index}
          className={`slide ${index === current ? "active" : ""}`}
          style={{ backgroundImage: `url(${img})` }}
        />
      ))}

      {/* Controls */}
      <button className="prev" onClick={prevSlide}>❮</button>
      <button className="next" onClick={nextSlide}>❯</button>

      {/* Dots */}
      <div className="dots">
        {banners.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === current ? "active" : ""}`}
            onClick={() => setCurrent(index)}
          />
        ))}
      </div>
    </div>
  );
}
