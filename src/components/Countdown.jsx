import { useEffect, useState } from "react";

// Retain the original yearly recurrence for an active countdown.
// No event date is guessed when the countdown is paused.
function getNextFutureOccurrence(dateLike, now) {
  if (!dateLike) return null;

  const next = new Date(dateLike);
  if (Number.isNaN(next.getTime())) return null;

  while (next.getTime() <= now) {
    next.setFullYear(next.getFullYear() + 1);
  }

  return next;
}

function getTimeRemaining(target, now) {
  const totalSeconds = Math.max(0, Math.floor((target.getTime() - now) / 1000));
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

const Countdown = ({
  targetDate,
  paused = false,
  pauseMessage = "We'll share the next date when it's confirmed.",
}) => {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    // Don't run a timer while the event is on hiatus.
    if (paused || !targetDate) return undefined;

    setNow(Date.now());
    const intervalId = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(intervalId);
  }, [paused, targetDate]);

  const target = paused ? null : getNextFutureOccurrence(targetDate, now);

  if (!target) {
    return (
      <div className="mx-auto mb-5 max-w-md rounded-xl border border-[#00274c]/10 bg-white px-5 py-4 text-center shadow-sm sm:px-6">
        <p className="text-xs font-bold uppercase tracking-wider text-[#00274c] sm:text-sm">
          Next tailgate
        </p>
        <p className="mt-1 text-sm leading-relaxed text-gray-700 sm:text-base">
          {paused ? pauseMessage : "Date to be announced."}
        </p>
      </div>
    );
  }

  const remaining = getTimeRemaining(target, now);
  const units = [
    { label: "Days", value: remaining.days, maize: false },
    { label: "Hours", value: remaining.hours, maize: false },
    { label: "Minutes", value: remaining.minutes, maize: true },
    { label: "Seconds", value: remaining.seconds, maize: true },
  ];

  return (
    <div
      className="mx-auto mb-5 grid w-full max-w-sm grid-cols-4 gap-2 sm:gap-3"
      role="timer"
      aria-label="Time until the next tailgate"
      aria-live="off"
    >
      {units.map(({ label, value, maize }) => (
        <div
          key={label}
          className={`flex min-w-0 flex-col items-center justify-center rounded-xl px-1 py-3 text-center shadow-sm sm:px-2 sm:py-4 ${
            maize ? "bg-[#ffcb05] text-[#00274c]" : "bg-[#00274c] text-white"
          }`}
        >
          <span className="text-xl font-bold tabular-nums leading-tight sm:text-2xl">
            {String(value).padStart(2, "0")}
          </span>
          <span className="mt-1 text-[10px] font-semibold uppercase tracking-wide sm:text-xs">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Countdown;
