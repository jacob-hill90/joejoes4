import React, { useState } from "react";
import { CLOUDFRONT_URL } from "../config";

const Gallery = () => {
  const [modalImage, setModalImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);

  const photos = [
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
  ];


  
  return (
    <div className="bg-gray-100 py-12 px-6">
      {/* Video Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-center mb-4 underline">2024 Highlight Reel</h2>
        <video
          className="w-full max-w-4xl mx-auto cursor-pointer"
          controls={true}
          poster="/video-thumbnail.jpg"
          onClick={(e) => e.target.play()}
        >
          <source src={`${CLOUDFRONT_URL}/fullComp.mp4`} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <h2 className="text-2xl font-bold text-center mb-4 underline">2024 Photos</h2>


      {/* Photos Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {photos.map((photo, index) => (
          <img
            key={index}
            src={`${CLOUDFRONT_URL}/${photo}`}
            alt={`Gallery Image ${index + 1}`}
            className="w-full h-64 object-cover rounded-lg cursor-pointer hover:scale-105 transition-transform"
            onClick={() => {
              setModalImage(`${CLOUDFRONT_URL}/${photo}`);
              setCurrentIndex(index);
            }}
          />
        ))}
      </div>

      {/* Attribution */}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-600">
          Photos by: <a href="https://www.robingamblephotography.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Robin Gamble</a>
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
          <div className="relative max-w-3xl w-full p-4">
            <button
              className="absolute top-4 right-4 bg-red-600 text-white rounded-full p-4 w-12 h-12 flex items-center justify-center"
              onClick={() => setModalImage(null)}
            >
              X
            </button>
            <img
              src={modalImage}
              alt="Modal View"
              className="w-full max-w-5xl h-auto rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
