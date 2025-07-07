// src/components/Countdown.jsx
import { useEffect, useState } from "react";

const Countdown = ({ targetDate }) => {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const timeDifference = new Date(targetDate) - now;

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
  }, [targetDate]);

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
