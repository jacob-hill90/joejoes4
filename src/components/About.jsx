import { CLOUDFRONT_URL } from "../config";

const About = () => {
  const videoSrc = `${CLOUDFRONT_URL}/videos/2024/output.mp4`;
  const posterSrc = `${CLOUDFRONT_URL}/photos/2024/018@1024.jpg`;

  return (
    <div className="w-full bg-[#f8f9fa]">
      {/* Full-width highlight banner with a shorter height on phones. */}
      <div className="relative h-48 w-full overflow-hidden bg-[#00274c] sm:h-64 md:h-72 lg:h-80 xl:h-96">
        {/* Static image for visitors who prefer reduced motion. */}
        <img
          src={posterSrc}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 hidden h-full w-full object-cover motion-reduce:block"
        />
        <video
          className="h-full w-full object-cover motion-reduce:hidden"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster={posterSrc}
          aria-hidden="true"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      </div>

      {/* Match the page width, card styling, and mobile spacing from Home. */}
      <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
        <section
          aria-labelledby="about-heading"
          className="mx-auto max-w-4xl rounded-xl bg-white px-5 py-8 text-center shadow-sm sm:rounded-2xl sm:px-10 sm:py-12 sm:shadow-md lg:px-14 lg:py-14"
        >
          <h1
            id="about-heading"
            className="text-3xl font-bold leading-tight text-[#00274c] sm:text-4xl lg:text-5xl"
          >
            About Joe Joe&apos;s
          </h1>

          <div className="mx-auto mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-gray-700 sm:mt-8 sm:space-y-5 sm:text-lg">
            <p>
              Welcome to JoeJoe&apos;s Annual Tailgate, the ultimate pre-game
              tradition that brings together friends, family, and fans from all
              over! Held every year to celebrate camaraderie, team spirit, and
              good times, this event is a hallmark of our love for football and
              community.
            </p>
            <p>
              Whether you are here for the delicious food, the exciting games,
              or simply the great company, JoeJoe&apos;s Tailgate promises
              unforgettable memories. From BBQ grills to live music to football,
              there&apos;s something for everyone to enjoy.
            </p>
            <p>
              We&apos;re taking a break for the 2026 season, but the memories and
              community mean a lot to us. Thank you for being part of the
              tradition. We hope to celebrate together again in the future!
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
