"use client"
import { useState, useEffect } from 'react';

const Carousel = ({ images, interval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide effect
  useEffect(() => {
    const slideInterval = setInterval(() => {
      goToNext();
    }, interval);

    return () => clearInterval(slideInterval); // Cleanup the interval on component unmount
  }, [currentIndex]); // Dependency on currentIndex to update the slide

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className="w-full mx-auto py-4">
      <div className="relative h-64">
        {/* Previous Button */}
        <button
          onClick={goToPrevious}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full hover:bg-gray-800 transition"
        >
          ❮
        </button>

        {/* Slide */}
        <div className="h-full overflow-hidden rounded-lg">
          <img
            src={images[currentIndex]}
            alt={`Slide ${currentIndex + 1}`}
            className="w-full h-full object-cover transition duration-500"
          />
        </div>

        {/* Next Button */}
        <button
          onClick={goToNext}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full hover:bg-gray-800 transition"
        >
          ❯
        </button>
      </div>

      {/* Indicators */}
      <div className="flex justify-center mt-4">
        {images.map((_, index) => (
          <div
            key={index}
            className={`cursor-pointer w-3 h-3 mx-2 rounded-full ${
              index === currentIndex ? 'bg-blue-500' : 'bg-gray-400'
            }`}
            onClick={() => goToSlide(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
