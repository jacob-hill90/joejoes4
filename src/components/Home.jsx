import { useState, useEffect, useRef } from "react";
import { CLOUDFRONT_URL } from "../config";

const Home = () => {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Countdown logic
  useEffect(() => {
    const targetDate = new Date("2025-10-25T12:00:00");

    const interval = setInterval(() => {
      const now = new Date();
      const timeDifference = targetDate - now;

      if (timeDifference <= 0) {
        clearInterval(interval);
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      setCountdown({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

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

      {/* Countdown */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 grid grid-cols-4 gap-2 sm:gap-4 text-center w-full max-w-sm">
        <div className="bg-[#00274c] text-white p-2 sm:p-4 rounded-lg text-xs sm:text-base">
          <p className="text-lg sm:text-2xl font-bold">{countdown.days}</p>
          <p className="text-[10px] sm:text-sm">Days</p>
        </div>
        <div className="bg-[#00274c] text-white p-2 sm:p-4 rounded-lg text-xs sm:text-base">
          <p className="text-lg sm:text-2xl font-bold">{countdown.hours}</p>
          <p className="text-[10px] sm:text-sm">Hours</p>
        </div>
        <div className="bg-[#ffcb05] text-white p-2 sm:p-4 rounded-lg text-xs sm:text-base">
          <p className="text-lg sm:text-2xl font-bold">{countdown.minutes}</p>
          <p className="text-[10px] sm:text-sm">Minutes</p>
        </div>
        <div className="bg-[#ffcb05] text-white p-2 sm:p-4 rounded-lg text-xs sm:text-base">
          <p className="text-lg sm:text-2xl font-bold">{countdown.seconds}</p>
          <p className="text-[10px] sm:text-sm">Seconds</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
