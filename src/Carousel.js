import React, { useState, useEffect } from 'react';
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timer, setTimer] = useState(null);

  const startTimer = () => {
    clearInterval(timer);
    setTimer(setInterval(() => {
      setCurrentIndex(currentIndex => (currentIndex + 1) % images.length);
    }, 3000));
  };

  useEffect(() => {
    startTimer();
    return () => clearInterval(timer);
  }, [currentIndex]);

  const goToNext = () => {
    setCurrentIndex(currentIndex => (currentIndex + 1) % images.length);
    startTimer();
  };

  const goToPrevious = () => {
    setCurrentIndex(currentIndex => (currentIndex - 1 + images.length) % images.length);
    startTimer();
  };

  const selectImage = (index) => {
    setCurrentIndex(index);
    startTimer();
  };

  return (
    <div className="carousel">
      <div className="image-container">
        <img src={images[currentIndex]} alt="" />
      
      <div className="controls">
      
      < FaCaretLeft className="icon" onClick={goToPrevious} />
      < FaCaretRight className="icon" onClick={goToNext}/>
      {/* <button className="image-carousel__prev" onClick={goToPrevious} >
        < FaCaretLeft />
        </button> */}
        {/* <button className="image-carousel__next" onClick={goToNext}>
        < FaCaretRight />
        </button> */}
      </div>
      </div>
      <div className="selectors">
        {images.map((image, index) => (
          <div
            key={index}
            className={`selector ${index === currentIndex ? 'selected' : ''}`}
            onClick={() => selectImage(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
