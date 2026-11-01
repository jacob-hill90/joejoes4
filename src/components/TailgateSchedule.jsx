
const schedule = [
  {
    time: "5:30 PM",
    title: "The Party Begins!",
    details: [
      "Kid Park — Fowling, hoops, Connect 4, mini golf & more",
      "Food — Sessions Room catering: burger sliders, pizza, wings & German pretzels",
      "Donations to the Alzheimer's Association ",
      "Bar opens — bartenders go live",
    ],
  },
  {
    time: "6:15 PM",
    title: "Bagpipers",
    details: ["Mini bagpipers team performance"],
  },
  {
    time: "6:30 PM",
    title: "Annual Toast",
    details: [
      "A special toast for Molly and all who are with us in spirit.",
    ],
  },
  {
    time: "7:00 PM",
    title: "Snap-on Raffle",
    details: ["First raffle drawing — one item"],
  },
  {
    time: "7:30 PM",
    title: "Game Time!",
    details: [
      "Kickoff countdown — Michigan vs. Michigan State",
      "Two TVs, heated tent & automatic DJ music",
    ],
  },
  {
    time: "8:45 PM",
    title: "Halftime Celebration",
    details: [
      "Bagpipers return",
      "Snap-on raffle — two items",
    ],
  },
  {
    time: "9:10 PM",
    title: "Second Half",
    details: ["Michigan vs. Michigan State"],
  },
  {
    time: "10:30 PM",
    title: "Postgame Celebration",
    details: ["Pizza & nightcaps!"],
  },
];

const TailgateSchedule = () => {
  return (
    <section className="w-full overflow-hidden rounded-2xl border border-[#00274c]/10 bg-white text-left shadow-lg">

      {/* Secret invitation heading */}
      <div className="bg-[#00274c] px-5 py-8 text-center text-white sm:px-10 sm:py-10">
        <p className="mb-3 text-sm font-bold uppercase tracking-widest text-[#ffcb05]">
          Exclusive Invitation Unlocked
        </p>

        <h2 className="text-3xl font-extrabold sm:text-4xl">
          You Found Me!
        </h2>

        <p className="mt-3 text-lg font-semibold text-[#ffcb05] sm:text-xl">
          You must be one of the select 50!
        </p>

        <div className="mx-auto my-6 h-1 w-20 rounded-full bg-[#ffcb05]" />

        <h3 className="text-xl font-bold sm:text-2xl">
          JoeJoe's Annual Tailgate
        </h3>

        <p className="mt-2 text-base font-semibold sm:text-lg">
          Nifty Fifty Mini Party-Life Celebration
        </p>

        <p className="mt-4 font-bold text-[#ffcb05]">
          November 7, 2026
        </p>
      </div>

      {/* Schedule timeline */}
      <div className="px-4 py-7 sm:px-8 sm:py-10">
        <h3 className="mb-7 text-center text-2xl font-extrabold text-[#00274c]">
          Party Schedule
        </h3>

        <ol className="space-y-4">
          {schedule.map((event) => (
            <li
              key={event.time}
              className="rounded-xl border border-gray-200 bg-[#f8f9fa] p-4 transition-shadow hover:shadow-md sm:p-5"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:gap-5">

                {/* Time */}
                <div className="shrink-0">
                  <span className="inline-block rounded-lg bg-[#ffcb05] px-3 py-2 text-sm font-extrabold text-[#00274c]">
                    {event.time}
                  </span>
                </div>

                {/* Event description */}
                <div className="min-w-0 flex-1">
                  <h4 className="text-lg font-bold text-[#00274c]">
                    {event.title}
                  </h4>

                  <ul className="mt-2 space-y-2 text-sm leading-relaxed text-gray-700 sm:text-base">
                    {event.details.map((detail) => (
                      <li key={detail} className="flex gap-2">
                        <span
                          aria-hidden="true"
                          className="font-bold text-[#18453b]"
                        >
                          •
                        </span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          ))}
        </ol>

        {/* Final note */}
        <div className="mt-8 rounded-xl border-l-4 border-[#ffcb05] bg-[#00274c]/5 p-4 sm:p-5">
          <p className="text-sm leading-relaxed text-[#00274c] sm:text-base">
            <strong>Important Note:</strong> The house is off-limits,
            but a baby/toddler nap room will be available just in case.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TailgateSchedule;
