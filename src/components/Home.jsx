
const Home = () => {
  return (
    <div className="w-full bg-[#f8f9fa]">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-4 px-4 py-6 text-center sm:gap-6 sm:px-6 sm:py-10 lg:px-8 lg:py-12">

        {/* Team logos: equal columns keep the pair centered. */}
        <section
          aria-label="Michigan and Michigan State football"
          className="mx-auto grid w-full max-w-xs grid-cols-2 items-center justify-items-center gap-4 sm:max-w-sm sm:gap-6"
        >
          {/* Michigan Logo */}
          <a
            href="https://www.google.com/search?q=Michigan+Football"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Learn more about Michigan football"
            className="flex w-full items-center justify-center rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00274c]"
          >
            <img
              src="/michigan-logo.svg"
              alt="Michigan logo"
              className="h-14 w-auto object-contain sm:h-20 lg:h-24"
            />
          </a>

          {/* Michigan State Logo */}
          <a
            href="https://www.google.com/search?q=Michigan+State+Football"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Learn more about Michigan State football"
            className="flex w-full items-center justify-center rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00274c]"
          >
            <img
              src="/michigan-state-logo.svg"
              alt="Michigan State logo"
              className="h-14 w-auto object-contain sm:h-20 lg:h-24"
            />
          </a>
        </section>

        {/* Announcement Card */}
        <section className="w-full max-w-4xl rounded-xl bg-white px-5 py-8 shadow-sm sm:rounded-2xl sm:px-10 sm:py-12 sm:shadow-md lg:px-14 lg:py-14">
          <h1 className="text-3xl font-bold leading-tight text-[#00274c] sm:text-4xl lg:text-5xl">
            Taking a Break in 2026
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-gray-700 sm:mt-6 sm:text-lg lg:text-xl">
            After another great year in 2025, we'll be taking a hiatus for the
            2026 season. Thank you to everyone who has participated, supported,
            and helped make this tradition what it is.
          </p>

          <p className="mx-auto mt-6 max-w-2xl text-lg font-semibold leading-snug text-[#00274c] sm:mt-8 sm:text-xl lg:text-2xl">
            We look forward to seeing what 2027 holds!
          </p>
        </section>
      </div>
    </div>
  );
};

export default Home;
