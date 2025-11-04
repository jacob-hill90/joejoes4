const Home = () => {
  return (
    <div className="bg-gray-100 pb-12 px-6 text-center flex flex-col items-center space-y-10">
      {/* Matchup Header Section */}
      <section className="w-full max-w-3xl pt-5 pr-5 pl-5 pb-0 sm:pb-1 flex items-center justify-between">
        {/* Left Team Logo */}
        <div className="flex-shrink-0 pl-2">
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.google.com/search?q=Michigan+Football"
          >
            <img
              src="/michigan-logo.svg"
              alt="Michigan Logo"
              className="h-12 sm:h-20 w-auto"
            />
          </a>
        </div>

        {/* Date */}
        <div className="text-[#000] font-bold text-lg sm:text-2xl text-center px-4 flex-1">
          
        </div>

        {/* Right Team Logo */}
        <div className="flex-shrink-0 pr-2">
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.google.com/search?q=Michigan+State+Football"
          >
            <img
              src="/michigan-state-logo.svg"
              alt="Michigan State Logo"
              className="h-14 sm:h-24 w-auto"
            />
          </a>
        </div>
      </section>

      <section className="w-full max-w-4xl bg-white shadow-lg rounded-xl p-6 sm:p-10">
        <h2 className="text-4xl font-bold text-[#00274c] mb-4 text-center">
          Thank you for coming
        </h2>
        <p className="text-2xl font-semibold text-[#00274c] text-center">
          See you in 2026!
        </p>
      </section>
    </div>
  );
};

export default Home;
