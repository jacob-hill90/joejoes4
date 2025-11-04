import { CLOUDFRONT_URL } from "../config";

const Home = () => {
  return (
    <div className="bg-gray-100 pb-8 px-6 text-center flex flex-col items-center space-y-10">
      {/* Matchup Header Section */}
      <section className="w-full max-w-3xl pt-5 pr-5 pl-5 pb-0 sm:pb-1 flex items-center justify-center gap-10">
        {/* Left Team Logo */}
        <div className="flex-shrink-0 pl-2">
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.google.com/search?q=Michigan+Football"
          >
            <img
              src="/michigan-logo.svg"
              alt="Michigan Logo"
              className="h-12 sm:h-20 w-auto"
            />
          </a>
        </div>

        {/* Right Team Logo */}
        <div className="flex-shrink-0 pr-2">
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.google.com/search?q=Michigan+State+Football"
          >
            <img
              src="/michigan-state-logo.svg"
              alt="Michigan State Logo"
              className="h-14 sm:h-24 w-auto"
            />
          </a>
        </div>
      </section>

      {/* 2025 Highlight Video */}
      <section className="w-full max-w-4xl bg-white shadow-lg rounded-xl p-4 sm:p-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#00274c] mb-4 text-center">
          2025 Highlight Reel
        </h2>

        <div className="mx-auto w-full max-w-xl rounded-2xl overflow-hidden shadow-md border border-gray-200">
          <video
            className="w-full h-auto object-cover"
            poster={`${CLOUDFRONT_URL}/photos/2025/077@1024.jpg`}
            controls
            preload="metadata"
            playsInline
          >
            <source
              src={`${CLOUDFRONT_URL}/videos/2025/highlightVid.MP4`}
              type="video/mp4"
            />
          </video>
        </div>
      </section>

      <section className="w-full max-w-4xl bg-white shadow-lg rounded-xl p-6 sm:p-10">
        <h2 className="text-4xl font-bold text-[#00274c] mb-4 text-center">
          Thank you for coming
        </h2>
        <p className="text-2xl font-semibold text-[#00274c] text-center">
          See you in 2026!
        </p>
      </section>
    </div>
  );
};

export default Home;
