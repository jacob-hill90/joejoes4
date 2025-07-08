import React, { useState, useEffect } from "react";
import { CLOUDFRONT_URL } from "../config";

const Gallery = () => {
  const [modalImage, setModalImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [selectedYear, setSelectedYear] = useState("2024");

  const photoData = {
    2024: [
      "001.jpg",
      "002.jpg",
      "003.jpg",
      "004.jpg",
      "005.jpg",
      "006.jpg",
      "007.jpg",
      "008.jpg",
      "009.jpg",
      "010.jpg",
      "011.jpg",
      "012.jpg",
      "013.jpg",
      "014.jpg",
      "015.jpg",
      "016.jpg",
      "017.jpg",
      "018.jpg",
    ],
    // 2023: ["a.jpg", "b.jpg", "c.jpg", "d.jpg", "e.jpg", "f.jpg"],
  };

  const photos = photoData[selectedYear];

  const showImageAtIndex = (index) => {
    if (index >= 0 && index < photos.length) {
      setModalImage(`${CLOUDFRONT_URL}/${photos[index]}`);
      setCurrentIndex(index);
    }
  };

  // Arrow key navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (modalImage) {
        if (e.key === "ArrowRight") showImageAtIndex(currentIndex + 1);
        if (e.key === "ArrowLeft") showImageAtIndex(currentIndex - 1);
        if (e.key === "Escape") {
          setModalImage(null);
          setCurrentIndex(null);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [modalImage, currentIndex]);

  // Lock background scroll
  useEffect(() => {
    document.body.style.overflow = modalImage ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [modalImage]);

  return (
    <div className="bg-gray-100 py-8 px-6">
      {/* Video Section */}
      <div className="max-w-4xl mx-auto mb-12">
        <h2 className="text-2xl text-[#00274c] font-bold text-center mb-6 underline">
          2024 Highlight Reel
        </h2>
        <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200">
          <video
            className="w-full h-auto object-cover"
            poster={`${CLOUDFRONT_URL}/018.jpg`}
            controls
            playsInline
          >
            <source src={`${CLOUDFRONT_URL}/fullComp.mp4`} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      {/* Year Selector */}
      <div className="flex items-center justify-center mb-6">
        <label
          htmlFor="year-select"
          className="mr-2 font-semibold text-[#00274c]"
        >
          Select Year:
        </label>
        <select
          id="year-select"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="border border-gray-300 rounded px-3 py-1 text-[#00274c] font-semibold bg-white shadow-sm"
        >
          {Object.keys(photoData).map((year) => (
            <option key={year} value={year}>
              {year} Photos
            </option>
          ))}
        </select>
      </div>

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
          className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50"
          onClick={() => {
            setModalImage(null);
            setCurrentIndex(null);
          }}
        >
          <div
            className="relative w-full max-w-7xl p-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 bg-red-600 text-white rounded-full p-2 w-6 h-6 flex items-center justify-center"
              onClick={(e) => {
                e.stopPropagation();
                setModalImage(null);
                setCurrentIndex(null);
              }}
            >
              ✕
            </button>

            {/* Left Arrow */}
            {currentIndex > 0 && (
              <button
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 shadow"
                onClick={(e) => {
                  e.stopPropagation();
                  showImageAtIndex(currentIndex - 1);
                }}
              >
                ◀
              </button>
            )}

            {/* Right Arrow */}
            {currentIndex < photos.length - 1 && (
              <button
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 shadow"
                onClick={(e) => {
                  e.stopPropagation();
                  showImageAtIndex(currentIndex + 1);
                }}
              >
                ▶
              </button>
            )}

            {/* Modal Image */}
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
