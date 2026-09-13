const Home = () => {
  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center sm:px-6 sm:py-10 lg:px-8">
      <div className="bg-gray-100 pb-8 text-center flex flex-col items-center space-y-10">
      {/* Matchup Header Section */} <section className="w-full max-w-3xl pt-5 pr-5 pl-5 pb-0 sm:pb-1 flex items-center justify-center gap-10"> {/* Left Team Logo */} <div className="flex-shrink-0 pl-2"> <a target="_blank" rel="noreferrer" href="https://www.google.com/search?q=Michigan+Football" > <img src="/michigan-logo.svg" alt="Michigan Logo" className="h-12 sm:h-20 w-auto" /> </a> </div> {/* Right Team Logo */} <div className="flex-shrink-0 pr-2"> <a target="_blank" rel="noreferrer" href="https://www.google.com/search?q=Michigan+State+Football" > <img src="/michigan-state-logo.svg" alt="Michigan State Logo" className="h-14 sm:h-24 w-auto" /> </a> </div> </section>
      <section
        className="
          w-full
          min-h-screen
          sm:min-h-0
          sm:max-w-3xl
          lg:max-w-4xl

          bg-white
          sm:rounded-2xl
          sm:shadow-lg

          px-6
          sm:px-10
          lg:px-14

          py-12
          sm:py-12
          lg:py-16

          flex
          flex-col
          items-center
          justify-center
          text-center
        "
      >
        <h1
          className="
            text-3xl
            sm:text-4xl
            lg:text-5xl
            font-bold
            text-[#00274c]
            leading-tight
            mb-6
          "
        >
          Taking a Break in 2026
        </h1>

        <p
          className="
            text-gray-700
            text-base
            sm:text-lg
            lg:text-xl
            leading-relaxed
            max-w-2xl
          "
        >
          After another great year in 2025, we'll be taking a hiatus for the
          2026 season. Thank you to everyone who has participated, supported,
          and helped make this tradition what it is.
        </p>

        <p
          className="
            text-[#00274c]
            font-semibold
            text-lg
            sm:text-xl
            lg:text-2xl
            mt-8
          "
        >
          We look forward to seeing what 2027 holds!
        </p>
      </section>
      </div>
    </main>
  );
};

export default Home;