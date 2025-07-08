const Home = () => {
  return (
    <div className="bg-gray-100 pb-12 px-6 text-center flex flex-col items-center space-y-10">
      {/* Matchup Header Section */}
      <section className="w-full max-w-3xl pt-5 pr-5 pl-5 pb-0 sm:pb-1 flex items-center justify-between">
        {/* Left Team Logo */}
        <div className="flex-shrink-0 pl-2">
         <a target="_blank" href="https://www.google.com/search?q=Michigan+Football">
          <img
            src="/michigan-logo.svg"
            alt="Michigan Logo"
            className="h-12 sm:h-20 w-auto"
          />
          </a>
        </div>

        {/* Date */}
        <div className="text-[#000] font-bold text-lg sm:text-2xl text-center px-4 flex-1">
          Saturday, October 25, 2025
        </div>

        {/* Right Team Logo */}
        <div className="flex-shrink-0 pr-2">
          <a target="_blank" href="https://www.google.com/search?q=Michigan+State+Football">
            <img
              src="/michigan-state-logo.svg"
              alt="Michigan State Logo"
              className="h-14 sm:h-24 w-auto"
            />
          </a>
        </div>
      </section>
      {/* New This Year Section */}
      <section className="w-full max-w-4xl bg-white shadow-lg rounded-xl p-6 sm:p-10">
        <h2 className="text-2xl font-bold text-[#00274c] mb-6 underline text-center">
          What’s New This Year
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left max-w-3xl mx-auto">
          <ul className="text-gray-700 text-lg list-disc list-outside pl-6 space-y-4">
            <li>Charity Putting Challenge</li>
            <li>Special Keynote Appearance</li>
          </ul>
          <ul className="text-gray-700 text-lg list-disc list-outside pl-6 space-y-4">
            <li>
              Live Performance by <strong>30</strong> Bagpipers
            </li>
            <li>
              Featuring <strong>12</strong> Pistons & Lions Cheerleaders
            </li>
          </ul>
        </div>
      </section>

      {/* Schedule Section */}
      <section className="w-full max-w-4xl bg-white shadow-lg rounded-xl p-6 sm:p-10">
        <h2 className="text-4xl font-bold text-[#00274c] mb-6 underline text-center">
          Schedule
        </h2>
        <div className="max-w-3xl mx-auto divide-y divide-gray-200">
          {[
            {
              time: "5:00 PM",
              event:
                "Tailgate Opens – Check in to receive your t-shirt and linked wristband",
            },
            {
              time: "5:00 PM",
              event: (
                <div>
                  <div>
                    KidZone, food stations, coffee bar, and full bar open
                  </div>
                  <div className="mt-1 text-sm text-gray-600 leading-relaxed">
                    Fun: Putt for Charity · Face painter · Photo booth · Bouncy
                    house · QB toss · Skee-Ball · Connect 4 · Jenga. <br />
                    Food offerings: Burger bar · Hotdog bar · Cheese & cracker
                    bar · Veggie bar · Dessert bar. <br />
                    Beverage stations: Fresh coffee, hot cocoa, and full-service
                    bar with 5 bartenders and an ice luge.
                  </div>
                </div>
              ),
            },
            {
              time: "5:15 PM",
              event: "Live Music – DJ Johnny B and MC Big Ross",
            },
            { time: "5:18 PM", event: "Flag Raising – In memory of Molly ❤️" },
            {
              time: "5:20 PM",
              event:
                "National Anthem performed by Abbigail (professional opera singer)",
            },
            {
              time: "5:30 PM",
              event:
                "Cheer Team Showcase – 12 Detroit Pistons & Lions Cheerleaders",
            },
            {
              time: "6:00 PM",
              event: "Live Performance – 30 Bagpipers and featured drum solos",
            },
            {
              time: "6:15 PM",
              event: "Snap-on Activation – Franchisee welcome and giveaways",
            },
            { time: "6:30 PM", event: "Snap-on Raffle Drawing" },
            {
              time: "7:10 PM",
              event: "Main Stage – Light show and pyrotechnics display",
            },
            {
              time: "7:20 PM",
              event: (
                <div>
                  <div>Kickoff Countdown – Michigan vs. Michigan State</div>
                  <div className="mt-1 text-sm text-gray-600 leading-relaxed">
                    Watch on 6 TVs plus a large projection screen under heated
                    tents with enhanced sound.
                  </div>
                </div>
              ),
            },
            {
              time: "8:15 PM",
              event:
                '"God Bless America" performed by Abbigail (end of 1st quarter)',
            },
            {
              time: "8:45 PM",
              event:
                "Halftime Show – Bagpipers, drum solos, raffle prizes, and shirt cannon",
            },
            {
              time: "9:15 PM",
              event: "Second Half Kickoff – Michigan vs. Michigan State",
            },
            {
              time: "10:00 PM",
              event: "Encore Drum Solos",
            },
            {
              time: "11:00 PM",
              event: "Post-Game Power-Up – Pizza and nightcaps served",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="py-3 px-2 text-lg text-gray-800 flex items-start gap-2"
            >
              <span className="text-[#00274c] font-semibold whitespace-nowrap">
                {item.time}:
              </span>
              <div className="text-left">{item.event}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Note Section */}
      <section className="w-full max-w-4xl bg-white shadow-lg rounded-xl p-6 sm:p-10">
        <h2 className="text-3xl font-bold text-[#00274c] mb-6 underline text-center">
          Game Time
        </h2>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto text-center mb-6">
          The current schedule is based on a 7:30 PM kickoff. As we get closer
          to game day, the official start time may change. Please refer to the
          table below to see when the tailgate will begin depending on the
          confirmed kickoff time.
        </p>

        <div className="overflow-x-auto max-w-md mx-auto">
          <table className="min-w-full table-auto border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-[#00274c] font-semibold border-b border-gray-300 text-center">
                  Kickoff
                </th>
                <th className="px-4 py-2 text-[#00274c] font-semibold border-b border-gray-300 text-center">
                  Tailgate Start
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                { kickoff: "12:00 PM", start: "10:30 AM" },
                { kickoff: "3:30 PM", start: "1:00 PM" },
                { kickoff: "7:30 PM", start: "5:00 PM" },
              ].map((row, idx) => (
                <tr key={idx} className="border-b border-gray-200">
                  <td className="px-4 py-2 text-gray-800 text-center">
                    {row.kickoff}
                  </td>
                  <td className="px-4 py-2 text-gray-800 text-center">
                    {row.start}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Home;
