import React, { useState, useEffect } from "react";
import { CLOUDFRONT_URL } from "../config";

const Gallery = () => {
  const [modalImage, setModalImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);

  const photos = [
    "001.jpg", "002.jpg", "003.jpg", "004.jpg", "005.jpg", "006.jpg",
    "007.jpg", "008.jpg", "009.jpg", "010.jpg", "011.jpg", "012.jpg",
    "013.jpg", "014.jpg", "015.jpg", "016.jpg", "017.jpg", "018.jpg",
  ];

  const showImageAtIndex = (index) => {
    if (index >= 0 && index < photos.length) {
      setModalImage(`${CLOUDFRONT_URL}/${photos[index]}`);
      setCurrentIndex(index);
    }
  };

  // Handle arrow key navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (modalImage) {
        if (e.key === "ArrowRight") {
          showImageAtIndex(currentIndex + 1);
        } else if (e.key === "ArrowLeft") {
          showImageAtIndex(currentIndex - 1);
        } else if (e.key === "Escape") {
          setModalImage(null);
          setCurrentIndex(null);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [modalImage, currentIndex]);

  // Handle swipe gestures
  const handleTouchStart = (e) => {
    setTouchStartX(e.changedTouches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    setTouchEndX(e.changedTouches[0].clientX);

    if (touchStartX && e.changedTouches[0].clientX) {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (diff > 50) {
        showImageAtIndex(currentIndex + 1); // Swipe left
      } else if (diff < -50) {
        showImageAtIndex(currentIndex - 1); // Swipe right
      }
    }

    setTouchStartX(null);
    setTouchEndX(null);
  };

  // Lock background scroll when modal is open
  useEffect(() => {
    if (modalImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [modalImage]);

  return (
    <div className="bg-gray-100 py-12 px-6">
      {/* Video Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-center mb-4 underline">
          2024 Highlight Reel
        </h2>
        <video
          className="w-full max-w-4xl mx-auto cursor-pointer"
          controls={true}
          poster={`${CLOUDFRONT_URL}/018.jpg`}
          onClick={(e) => e.target.play()}
        >
          <source src={`${CLOUDFRONT_URL}/fullComp.mp4`} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <h2 className="text-xl font-bold text-center mb-4 underline">
        2024 Photos
      </h2>

      {/* Photos Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {photos.map((photo, index) => (
          <img
            key={index}
            src={`${CLOUDFRONT_URL}/${photo}`}
            alt={`Gallery Image ${index + 1}`}
            className="w-full h-96 object-cover rounded-lg cursor-pointer hover:scale-105 transition-transform"
            onClick={() => showImageAtIndex(index)}
          />
        ))}
      </div>

      {/* Attribution */}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-600">
          Photos by:{" "}
          <a
            href="https://www.robingamblephotography.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Robin Gamble
          </a>
        </p>
      </div>

      {/* Modal */}
      {modalImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 transition-opacity duration-300"
          onClick={() => {
            setModalImage(null);
            setCurrentIndex(null);
          }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="relative w-full max-w-7xl p-4 transform transition-all duration-300 translate-y-4 opacity-0 animate-fadeInSlide"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 bg-red-600 text-white rounded-full p-2 w-10 h-10 flex items-center justify-center"
              onClick={(e) => {
                e.stopPropagation();
                setModalImage(null);
                setCurrentIndex(null);
              }}
            >
              X
            </button>
            <img
              src={modalImage}
              alt="Modal View"
              className="w-full h-auto max-h-screen rounded-lg object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
