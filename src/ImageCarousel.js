import React, { useState, useEffect } from 'react';
import Carousel from './Carousel';

const ImageCarousel = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch('https://www.reddit.com/r/aww/top/.json?t=all')
      .then((response) => response.json())
      .then((data) =>
        data.data.children
          .filter((child) => child.data.url_overridden_by_dest.endsWith('.jpg'))
          .map((child) => child.data.url_overridden_by_dest)
      )
      .then((urls) => setImages(urls))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="App">
      {images.length > 0 ? (
        <Carousel images={images} />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default ImageCarousel;
