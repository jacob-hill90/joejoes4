// src/components/Countdown.jsx
import { useEffect, useState } from "react";

function getNextFutureOccurrence(dateLike) {
  // Accepts a Date or a date string (e.g., "2025-10-25T14:00:00")
  const base = new Date(dateLike);
  const now = new Date();
  // If base is already in the past, keep adding years until it's in the future
  let next = new Date(base);
  while (next <= now) {
    next.setFullYear(next.getFullYear() + 1);
  }
  return next;
}

const Countdown = ({ targetDate }) => {
  const [activeTarget, setActiveTarget] = useState(() =>
    getNextFutureOccurrence(targetDate)
  );
  const [countdown, setCountdown] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0,
  });

  useEffect(() => {
    // If the prop changes, recompute the next future occurrence
    setActiveTarget(getNextFutureOccurrence(targetDate));
  }, [targetDate]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const diff = activeTarget - now;

      if (diff <= 0) {
        // Bump to the next year (same month/day/time)
        const next = new Date(activeTarget);
        next.setFullYear(next.getFullYear() + 1);
        setActiveTarget(next);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setCountdown({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, [activeTarget]);

  return (
    <div className="mx-auto mb-4 grid grid-cols-4 gap-2 sm:gap-4 text-center w-full max-w-sm">
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
  );
};

export default Countdown;
