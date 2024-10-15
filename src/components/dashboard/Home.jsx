import { useState, useEffect } from 'react';
import img1 from '../../assets/img/vacation1.jpg'
import img2 from '../../assets/img/vacation2.jpg'
import img3 from '../../assets/img/vacation3.jpg'
import img4 from '../../assets/img/vacation4.jpg'
import img5 from '../../assets/img/vacation5.jpg'

export const Home = () => {
  const [currentImage, setCurrentImage] = useState(0);

  const images = [
    img1, img2, img3, img4, img5
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage(prevImage => (prevImage + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          className={`absolute w-full h-full object-cover transition-opacity duration-700 ${index === currentImage ? 'opacity-100' : 'opacity-0'}`}
          alt={`Slide ${index + 1}`}
        />
      ))}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`btn btn-xs ${index === currentImage ? 'btn-active' : ''}`}
            onClick={() => setCurrentImage(index)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};