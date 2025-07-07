import { CLOUDFRONT_URL } from "../config";
import Countdown from "../components/Countdown";

const Home = () => {
  return (
    <div className="relative h-screen">
      {/* Landing Video */}
      <video
        className="w-full h-[80%] object-cover top-0 left-0 absolute"
        autoPlay
        loop
        muted
        playsInline
        src={`${CLOUDFRONT_URL}/output.mp4`}
        type="video/mp4"
      />

      {/* Bouncing Arrow */}
      <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2">
        <div className="animate-bounce">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-8 h-8 text-black cursor-pointer"
            onClick={() =>
              window.scrollTo({
                top: document.body.scrollHeight,
                behavior: "smooth",
              })
            }
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Home;
