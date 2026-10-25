import { useEffect, useRef, useState } from "react";
import { CLOUDFRONT_URL } from "../config";

const PATHS = {
  photos: `${CLOUDFRONT_URL}/photos`,
  videos: `${CLOUDFRONT_URL}/videos`,
};

// Keep the existing media filenames and year-specific settings.
const VIDEO_META = {
  "2024": {
    title: "2024 Highlight Reel",
    main: "fullComp.mp4",
    poster: `${CLOUDFRONT_URL}/photos/2024/018@1024.jpg`,
    extra: null,
    extraLabel: null,
  },
  "2025": {
    title: "2025 Highlight Reel",
    main: "2025_highlight_1080p.mp4",
    poster: `${CLOUDFRONT_URL}/photos/2025/001@1024.jpg`,
    poster2: `${CLOUDFRONT_URL}/photos/2025/008@1024.jpg`,
    extra: "highlightVid.MP4",
    extraLabel: null,
  },
};

// Update the counts when you add photos to CloudFront.
const PHOTO_COUNTS = { "2024": 18, "2025": 96 };

const photoData = Object.fromEntries(
  Object.entries(PHOTO_COUNTS).map(([year, count]) => [
    year,
    Array.from({ length: count }, (_, index) =>
      String(index + 1).padStart(3, "0")
    ),
  ])
);

// Optimized thumbnails: WebP preferred, JPEG fallback.
function GalleryImage({ year, base }) {
  const imageUrl = (suffix, extension) =>
    `${PATHS.photos}/${year}/${base}${suffix}.${extension}`;

  const sizes =
    "(min-width: 1280px) 275px, (min-width: 1024px) 350px, (min-width: 640px) 50vw, 50vw";

  return (
    <picture className="block h-full w-full overflow-hidden">
      <source
        type="image/webp"
        srcSet={[
          `${imageUrl("@400", "webp")} 400w`,
          `${imageUrl("@1024", "webp")} 1024w`,
          `${imageUrl("@2048", "webp")} 2048w`,
        ].join(", ")}
        sizes={sizes}
      />
      <source
        type="image/jpeg"
        srcSet={[
          `${imageUrl("@400", "jpg")} 400w`,
          `${imageUrl("@1024", "jpg")} 1024w`,
          `${imageUrl("@2048", "jpg")} 2048w`,
        ].join(", ")}
        sizes={sizes}
      />
      <img
        src={imageUrl("@1024", "jpg")}
        alt=""
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none"
      />
    </picture>
  );
}

function Gallery() {
  const [selectedYear, setSelectedYear] = useState("2025");
  const [modalIndex, setModalIndex] = useState(null);
  const closeButtonRef = useRef(null);
  const modalRef = useRef(null);
  const touchStartRef = useRef(null);

  const photos = photoData[selectedYear];
  const meta = VIDEO_META[selectedYear];
  const isModalOpen = modalIndex !== null;

  const openAt = (index) => {
    if (index >= 0 && index < photos.length) setModalIndex(index);
  };

  const closeModal = () => setModalIndex(null);

  const movePhoto = (direction) => {
    setModalIndex((current) => {
      if (current === null) return null;
      return Math.max(0, Math.min(current + direction, photos.length - 1));
    });
  };

  // Keyboard navigation for the lightbox (including Tab containment).
  useEffect(() => {
    if (!isModalOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeModal();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        movePhoto(1);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        movePhoto(-1);
      } else if (event.key === "Tab") {
        const buttons = modalRef.current?.querySelectorAll("button:not([disabled])");
        if (!buttons?.length) return;

        const first = buttons[0];
        const last = buttons[buttons.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen, photos.length]);

  // Prevent page scrolling while viewing a photo and restore focus on close.
  useEffect(() => {
    if (!isModalOpen) return;

    const previouslyFocused = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus?.();
    };
  }, [isModalOpen]);

  const handleTouchStart = (event) => {
    const touch = event.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (event) => {
    if (!touchStartRef.current) return;

    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = touch.clientY - touchStartRef.current.y;
    touchStartRef.current = null;

    // Only treat deliberate horizontal swipes as photo navigation.
    if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY)) {
      movePhoto(deltaX < 0 ? 1 : -1);
    }
  };

  const currentBase = isModalOpen ? photos[modalIndex] : null;
  const modalWebp = currentBase
    ? `${PATHS.photos}/${selectedYear}/${currentBase}@2048.webp`
    : null;
  const modalJpg = currentBase
    ? `${PATHS.photos}/${selectedYear}/${currentBase}@2048.jpg`
    : null;

  return (
    <div className="w-full bg-[#f8f9fa]">
      <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        {/* Year selector */}
        <div className="mb-7 flex flex-wrap items-center justify-center gap-3 sm:mb-10">
          <label htmlFor="year-select" className="font-semibold text-[#00274c]">
            Select Year:
          </label>
          {/* Native selection behavior with a consistently inset arrow. */}
          <div className="relative">
            <select
              id="year-select"
              value={selectedYear}
              onChange={(event) => setSelectedYear(event.target.value)}
              className="min-h-11 appearance-none rounded-lg border border-gray-300 bg-white py-2 pl-4 pr-12 font-semibold text-[#00274c] shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00274c]"
            >
              {Object.keys(photoData).map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            <svg
              aria-hidden="true"
              className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#00274c]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
            </svg>
          </div>
        </div>

        {/* Video highlights */}
        <section aria-labelledby="highlights-heading" className="mx-auto mb-10 w-full max-w-4xl sm:mb-14">
          <h1
            id="highlights-heading"
            className="mb-5 text-center text-2xl font-bold text-[#00274c] underline decoration-2 underline-offset-4 sm:mb-7 sm:text-3xl"
          >
            {meta.title}
          </h1>

          <div className="overflow-hidden rounded-xl border border-gray-200 bg-black shadow-md sm:rounded-2xl">
            <video
              key={`${selectedYear}-main`}
              className="aspect-video w-full object-contain"
              poster={meta.poster}
              controls
              preload="metadata"
              playsInline
              aria-label={`${selectedYear} tailgate highlight video`}
            >
              <source
                src={`${PATHS.videos}/${selectedYear}/${meta.main}`}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>

          {meta.extra && (
            <div className="mx-auto mt-6 w-full max-w-md sm:mt-8">
              {meta.extraLabel && (
                <h2 className="mb-4 text-center text-xl font-semibold text-[#00274c]">
                  {meta.extraLabel}
                </h2>
              )}
              <div className="overflow-hidden rounded-xl border border-gray-200 bg-black shadow-md sm:rounded-2xl">
                <video
                  key={`${selectedYear}-extra`}
                  className="block h-auto w-full"
                  poster={meta.poster2}
                  controls
                  preload="metadata"
                  playsInline
                  aria-label={`${selectedYear} additional tailgate video`}
                >
                  <source
                    src={`${PATHS.videos}/${selectedYear}/${meta.extra}`}
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          )}
        </section>

        {/* Responsive photo grid */}
        <section aria-label={`${selectedYear} tailgate photos`}>
          <div className="grid grid-cols-2 gap-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
            {photos.map((base, index) => (
              <button
                key={`${selectedYear}-${base}`}
                type="button"
                onClick={() => openAt(index)}
                aria-label={`Open ${selectedYear} photo ${index + 1} of ${photos.length}`}
                className="group aspect-square min-w-0 overflow-hidden rounded-lg bg-gray-200 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00274c] sm:rounded-xl"
              >
                <GalleryImage year={selectedYear} base={base} />
              </button>
            ))}
          </div>
        </section>

        {/* Photo credit */}
        <p className="mt-8 text-center text-sm text-gray-600 sm:mt-10">
          Photos by{" "}
          <a
            href="https://www.robingamblephotography.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-[#00274c] underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#00274c]"
          >
            Robin Gamble
          </a>
        </p>
      </div>

      {/* Fullscreen photo lightbox */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overscroll-contain bg-black/90 p-3 sm:p-6"
          onClick={(event) => {
            if (event.target === event.currentTarget) closeModal();
          }}
        >
          <div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-label={`${selectedYear} tailgate photo viewer`}
            className="flex h-full w-full max-w-6xl flex-col items-center justify-center gap-3"
          >
            <div className="flex w-full shrink-0 items-center justify-between gap-4 text-white">
              <span className="text-sm font-medium sm:text-base" aria-live="polite">
                Photo {modalIndex + 1} of {photos.length}
              </span>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={closeModal}
                aria-label="Close photo viewer"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-2xl text-white transition-colors hover:bg-white/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>

            <div
              className="relative flex min-h-0 w-full flex-1 items-center justify-center"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {modalIndex > 0 && (
                <button
                  type="button"
                  onClick={() => movePhoto(-1)}
                  aria-label="Previous photo"
                  className="absolute left-1 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-black/60 text-2xl text-white transition-colors hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:left-3"
                >
                  <span aria-hidden="true">‹</span>
                </button>
              )}

              <picture className="flex h-full w-full items-center justify-center">
                <source type="image/webp" srcSet={modalWebp} />
                <img
                  src={modalJpg}
                  alt={`Joe Joe's Tailgate ${selectedYear}, photo ${modalIndex + 1} of ${photos.length}`}
                  className="max-h-full max-w-full rounded-md object-contain"
                />
              </picture>

              {modalIndex < photos.length - 1 && (
                <button
                  type="button"
                  onClick={() => movePhoto(1)}
                  aria-label="Next photo"
                  className="absolute right-1 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-black/60 text-2xl text-white transition-colors hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-3"
                >
                  <span aria-hidden="true">›</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Gallery;
