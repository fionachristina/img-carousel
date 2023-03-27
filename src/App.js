import './App.css';
import { useState, useEffect } from 'react';
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";

function App() {
  const [imageUrls, setImageUrls] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // fetch images from endpoint and extract URLs into array of image URL strings
    fetch('https://www.reddit.com/r/aww/top/.json?t=all')
    .then(console.log('done'))
      .then(response => response.json())
      .then(data => {
        const urls = data.data.children
        .filter(child => child.data.url_overridden_by_dest.endsWith('.jpg'))
        .map(child => child.data.url_overridden_by_dest);
        setImageUrls(urls);
      })
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    // set timer to cycle through images every 3 seconds
    const intervalId = setInterval(() => {
      setCurrentIndex(currentIndex => (currentIndex + 1) % imageUrls.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [imageUrls]);

  function handlePrevClick() {
    // reset timer and move to previous image
    setCurrentIndex(currentIndex => {
      const prevIndex = currentIndex === 0 ? imageUrls.length - 1 : currentIndex - 1;
      return prevIndex;
    });
  }

  function handleNextClick() {
    // reset timer and move to next image
    setCurrentIndex(currentIndex => {
      const nextIndex = (currentIndex + 1) % imageUrls.length;
      return nextIndex;
    });
  }

  function handleCircleClick(index) {
    // reset timer and move to selected image
    setCurrentIndex(index);
  }

  return (
    <div className="image-carousel">
      <div className="image-carousel__content">
        {imageUrls.length > 0 &&
          <img className="image-carousel__image" src={imageUrls[currentIndex]} alt="carousel image" />
        }
        <div className="image-carousel__selector">
          {imageUrls.map((url, index) => (
            <div
              key={index}
              className={`image-carousel__circle ${index === currentIndex ? 'active' : ''}`}
              onClick={() => handleCircleClick(index)}
            />
          ))}
        </div>
      
        <button className="image-carousel__prev" onClick={handlePrevClick}>
        < FaCaretLeft />
        </button>
        <button className="image-carousel__next" onClick={handleNextClick}>
        < FaCaretRight />
        </button>
  
      </div>
    </div>
  );
}

export default App;