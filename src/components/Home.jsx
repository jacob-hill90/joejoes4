const Home = () => {
  return (
    <div className="bg-gray-100 pb-12 px-6 text-center flex flex-col items-center space-y-10">
      {/* Matchup Header Section */}
      <section className="w-full max-w-3xl pt-5 pr-5 pl-5 pb-0 sm:pb-1 flex items-center justify-between">
        {/* Left Team Logo */}
        <div className="flex-shrink-0 pl-2">
          <a target="_blank" rel="noreferrer" href="https://www.google.com/search?q=Michigan+Football">
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
          <a target="_blank" rel="noreferrer" href="https://www.google.com/search?q=Michigan+State+Football">
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
        <h2 className="text-4xl font-bold text-[#00274c] mb-2 underline text-center">
          Schedule
        </h2>
        <p className="text-sm text-gray-600 font-bold text-center mb-2">Tailgate opens at 5pm!</p>

        <p className="text-sm text-gray-600 font-bold text-center mb-6">Kickoff at 7:30pm!</p>

        <div className="max-w-3xl mx-auto divide-y divide-gray-200">
          {[
            // Tailgate & openers
            {
              time: "5:00 PM",
              event:
                "Tailgate Opens – Check in to receive t‑shirt, wristband, and raffle tickets",
            },
            {
              event: (
                <div>
                  <div>
                    KidZone, food stations, coffee bar, and 2 full bars
                  </div>
                  <div className="mt-1 text-sm text-gray-600 leading-relaxed">
                    Fun: Putt for Charity · Face painter · Photo booth · Bouncy Obstacle Course <br />
                    Food offerings: Burger bar · Cheese & cracker bar · Veggie bar. <br />
                    Beverage stations: Fresh coffee, hot cocoa, and 2 full bars with an ice luge.
                  </div>
                </div>
              ),
            },
            // Ceremonies & performances (no other times listed)
            { event: "Flag Raising – In memory of Molly ❤️" },
            { event: "National Anthem (solo saxophone performance)" },
            { event: "Cheer Team Showcase – 12 Professional Dancers" },
            { event: "Live Music – DJ Johnny B with MC Big Ross plus Fusion Saxophonist" },
            { event: "Charity putting contest" },
            { event: "Live Performance – 30 Bagpipers and featured drum solos" },
            { event: "Main Stage – Light show and pyrotechnics display" },
            { event: "Snap‑on Activation – Franchisee welcome and giveaways" },
            {
              event: (
                <div>
                  <div>Kickoff Countdown – Michigan vs. Michigan State</div>
                  <div className="mt-1 text-sm text-gray-600 leading-relaxed">
                    Watch on LED video walls under heated tents with enhanced sound.
                  </div>
                </div>
              ),
            },
            { event: "God Bless America (special saxophone tribute) (end of 1st quarter)" },
            { event: "Halftime Show – Bagpipers, drum solos and raffle prizes!" },
            { event: "Keynote guest appearance" },
            { event: "Second Half Kickoff – Michigan vs. Michigan State" },
            { event: "In‑game activities" },
            { event: "Encore Drum Solos" },
            { event: "WJR LIVE onsite" },
            { event: "Post‑Game Power Party: live music, entertainment, pizza, and beverages!" },
          ].map((item, index) => (
            <div key={index} className="py-3 px-2 text-lg text-gray-800 flex items-start gap-2">
              {item.time && (
                <span className="text-[#00274c] font-semibold whitespace-nowrap">
                  {item.time}:
                </span>
              )}
              <div className="text-left">{item.event}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
