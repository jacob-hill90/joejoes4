import React, { useState, useEffect } from "react";
import { CLOUDFRONT_URL } from "../config";

const PATHS = {
  photos: `${CLOUDFRONT_URL}/photos`,
  videos: `${CLOUDFRONT_URL}/videos`,
};

// Per-year video setup
const VIDEO_META = {
  2024: {
    title: "2024 Highlight Reel",
    main: "fullComp.mp4",
    poster: `${CLOUDFRONT_URL}/photos/2024/018@1024.jpg`,
    extra: null, // no second video for 2024
    extraLabel: null,
  },
  2025: {
    title: "2025 Highlight Reel",
    main: "output.mp4", // <— becomes the main video when 2025 is selected
    poster: `${CLOUDFRONT_URL}/photos/2025/001@1024.jpg`,
    poster2: `${CLOUDFRONT_URL}/photos/2025/008@1024.jpg`,
    extra: "highlightVid.MP4", // <— second slot under main
    extraLabel: null,
  },
};

// How many images per year? (edit 2025 to your real count)
const PHOTO_COUNTS = { 2024: 18, 2025: 96 };

// Build ["001","002",...]
const seq = (n) =>
  Array.from({ length: n }, (_, i) => String(i + 1).padStart(3, "0"));

// Map years -> ["001","002",...]
const photoData = Object.fromEntries(
  Object.entries(PHOTO_COUNTS).map(([year, count]) => [year, seq(count)])
);

// Small component that serves WebP with JPEG fallback + responsive sizes
const GalleryImage = ({ year, base, onClick, className = "", sizes }) => {
  const url = (suffix, ext) =>
    `${PATHS.photos}/${year}/${base}${suffix}.${ext}`;

  return (
    <picture>
      {/* Primary: WebP */}
      <source
        type="image/webp"
        srcSet={[
          `${url("@400", "webp")} 400w`,
          `${url("@1024", "webp")} 1024w`,
          `${url("@2048", "webp")} 2048w`,
        ].join(", ")}
        sizes={sizes}
      />
      {/* Fallback: JPEG */}
      <source
        type="image/jpeg"
        srcSet={[
          `${url("@400", "jpg")} 400w`,
          `${url("@1024", "jpg")} 1024w`,
          `${url("@2048", "jpg")} 2048w`,
        ].join(", ")}
        sizes={sizes}
      />
      {/* Final fallback src */}
      <img
        src={url("@1024", "jpg")}
        alt=""
        loading="lazy"
        decoding="async"
        className={className}
        onClick={onClick}
      />
    </picture>
  );
};

const Gallery = () => {
  const [modalIndex, setModalIndex] = useState(null);
  const [selectedYear, setSelectedYear] = useState("2025");

  const photos = photoData[selectedYear]; // ["001","002",...]

  const openAt = (index) => {
    if (index >= 0 && index < photos.length) setModalIndex(index);
  };

  const closeModal = () => setModalIndex(null);

  // Keyboard nav in modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (modalIndex === null) return;
      if (e.key === "ArrowRight") openAt(modalIndex + 1);
      if (e.key === "ArrowLeft") openAt(modalIndex - 1);
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [modalIndex, photos.length]);

  // Lock background scroll when modal open
  useEffect(() => {
    document.body.style.overflow = modalIndex !== null ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [modalIndex]);

  // Helpers for video poster + modal src
  const meta = VIDEO_META[selectedYear];

  const currentBase = modalIndex !== null ? photos[modalIndex] : null;
  const modalWebp = currentBase
    ? `${PATHS.photos}/${selectedYear}/${currentBase}@2048.webp`
    : null;
  const modalJpg = currentBase
    ? `${PATHS.photos}/${selectedYear}/${currentBase}@2048.jpg`
    : null;

  return (
    <div className="bg-gray-100 py-8 px-6">
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
              {year}
            </option>
          ))}
        </select>
      </div>
      {/* Video Section */}
      <div className="max-w-4xl mx-auto mb-12">
        <h2 className="text-2xl text-[#00274c] font-bold text-center mb-6 underline">
          {meta.title}
        </h2>

        {/* Main video */}
        <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200">
          <video
            className="w-full h-auto object-cover"
            poster={meta.poster}
            controls
            preload="metadata"
            playsInline
          >
            <source
              src={`${PATHS.videos}/${selectedYear}/${meta.main}`}
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Optional second video (shown only if defined for the year) */}
        {meta.extra && (
          <div className="mt-8">
            <h3 className="text-xl text-[#00274c] font-semibold text-center mb-4">
              {meta.extraLabel}
            </h3>

            <div className="mx-auto w-full max-w-md rounded-2xl overflow-hidden shadow-lg border border-gray-200">
              <video
                className="w-full h-auto object-cover"
                poster={meta.poster2}
                controls
                preload="metadata"
                playsInline
              >
                <source
                  src={`${PATHS.videos}/${selectedYear}/${meta.extra}`}
                  type="video/mp4"
                />
              </video>
            </div>
          </div>
        )}
      </div>

      {/* Photos Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {photos.map((base, index) => (
          <GalleryImage
            key={`${selectedYear}-${base}`}
            year={selectedYear}
            base={base}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="w-full h-96 object-cover rounded-lg cursor-pointer hover:scale-105 transition-transform"
            onClick={() => openAt(index)}
          />
        ))}
      </div>

      {/* Attribution */}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-600">
          Photos by{" "}
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
      {modalIndex !== null && (
        <div
          className="fixed inset-0 bg-black/80 flex justify-center items-center z-50"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-7xl p-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              className="absolute top-4 right-4 bg-red-600 text-white rounded-full p-2 w-6 h-6 flex items-center justify-center"
              onClick={closeModal}
              aria-label="Close"
            >
              ✕
            </button>

            {/* Left Arrow */}
            {modalIndex > 0 && (
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 shadow"
                onClick={() => openAt(modalIndex - 1)}
                aria-label="Previous"
              >
                ◀
              </button>
            )}

            {/* Right Arrow */}
            {modalIndex < photos.length - 1 && (
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 shadow"
                onClick={() => openAt(modalIndex + 1)}
                aria-label="Next"
              >
                ▶
              </button>
            )}

            {/* Modal Image with WebP + JPEG fallback */}
            <picture>
              <source type="image/webp" srcSet={modalWebp} />
              <img
                src={modalJpg}
                alt="Modal View"
                className="w-full h-auto max-h-screen rounded-lg object-contain"
              />
            </picture>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
