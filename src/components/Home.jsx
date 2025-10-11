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

      {/* Schedule Section */}
      <section className="w-full max-w-4xl bg-white shadow-lg rounded-xl p-6 sm:p-10">
        <h2 className="text-4xl font-bold text-[#00274c] mb-6 underline text-center">
          Schedule
        </h2>
        <div className="max-w-3xl mx-auto divide-y divide-gray-200">
          {[
            {
              time: "10:30 AM",
              event:
                "Tailgate Opens – Check in to receive t-shirt, wristband, and raffle tickets",
            },
            {
              time: "10:30 AM",
              event: (
                <div>
                  <div>
                    KidZone, food stations, coffee bar, and full bar open
                  </div>
                  <div className="mt-1 text-sm text-gray-600 leading-relaxed">
                    Fun: Putt for Charity · Face painter · Photo booth · Bouncy Obstacle Course <br />
                    Food offerings: Burger bar · Burrito bar · Cheese & cracker
                    bar · Veggie bar. <br />
                    Beverage stations: Fresh coffee, hot cocoa, and full-service
                    bar with 6 bartenders and an ice luge.
                  </div>
                </div>
              ),
            },
            { time: "11:00 AM", event: "Flag Raising – In memory of Molly ❤️" },
            {
              time: "11:05 AM",
              event:
                "National Anthem (solo saxophone performance)",
            },
            {
              time: "11:10 AM",
              event:
                "Cheer Team Showcase – 12 Professional Dancers",
            },
            {
              time: "11:10 AM",
              event: "Live Music – DJ Johnny B and MC Big Ross",
            },
            {
              time: "11:15 AM",
              event:
                "Charity putting contest",
            },
            {
              time: "11:30 AM",
              event: "Live Performance – 30 Bagpipers and featured drum solos",
            },
            {
              time: "11:40 AM",
              event: "Main Stage – Light show and pyrotechnics display",
            },
            {
              time: "11:45 AM",
              event: "Snap-on Activation – Franchisee welcome and giveaways",
            },
            {
              time: "12:05 PM",
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
              time: "1:00 PM",
              event:
                'God Bless America (special saxophone tribute) (end of 1st quarter)',
            },
            {
              time: "1:35 PM",
              event:
                "Halftime Show – Bagpipers, drum solos, raffle prizes, and shirt cannon",
            },
            {
              time: "1:40 PM",
              event:
                "Keynote guest appearance",
            },
            
            {
              time: "2:00 PM",
              event: "Second Half Kickoff – Michigan vs. Michigan State",
            },
              {
              time: "2:00 PM",
              event: "In-game activities",
            },
            {
              time: "3:55 PM",
              event: "Encore Drum Solos",
            },
            {
              time: "4:00 PM",
              event: "WJR LIVE onsite",
            },
            {
              time: "4:00 - 8:00 PM",
              event: "Post-Game Power Party: live music, entertainment, pizza, and beverages!",
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
          The current schedule is based on a 12:10 PM kickoff. As we get closer
          to game day, the official start time may change.
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
