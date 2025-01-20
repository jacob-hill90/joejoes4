import { useState, useEffect } from "react";

const Preview = () => {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [fadeIn, setFadeIn] = useState(false);

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

  // Fade-in effect
  useEffect(() => {
    const timer = setTimeout(() => setFadeIn(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-start min-h-[70vh] bg-gray-100 transition-opacity duration-1000">
      {/* Preview Title */}
      <div className="text-center mt-12">
        <h1 className="text-3xl font-bold">Preview</h1>
        <p className="text-lg text-gray-700 py-4">2025 events coming soon!</p>
      </div>

      {/* Countdown */}
      <div className={`flex items-center justify-center flex-grow w-full transition-opacity duration-1000 ${fadeIn ? "opacity-100" : "opacity-0"}`}>
        <div className="grid grid-cols-4 gap-4 text-center w-full max-w-md">
          <div className="bg-[#00274c] text-white p-4 rounded-lg">
            <p className="text-3xl font-bold">{countdown.days}</p>
            <p className="text-sm">Days</p>
          </div>
          <div className="bg-[#00274c] text-white p-4 rounded-lg">
            <p className="text-3xl font-bold">{countdown.hours}</p>
            <p className="text-sm">Hours</p>
          </div>
          <div className="bg-[#ffcb05] text-white p-4 rounded-lg">
            <p className="text-3xl font-bold">{countdown.minutes}</p>
            <p className="text-sm">Minutes</p>
          </div>
          <div className="bg-[#ffcb05] text-white p-4 rounded-lg">
            <p className="text-3xl font-bold">{countdown.seconds}</p>
            <p className="text-sm">Seconds</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;
