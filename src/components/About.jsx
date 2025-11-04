import { CLOUDFRONT_URL } from "../config";

const About = () => {
  return (
    <div className="w-full">
      {/* Landing Video Section */}
      <div className="relative w-full h-[33vh] overflow-hidden">
        <video
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          src={`${CLOUDFRONT_URL}/videos/2024/output.mp4`}
          type="video/mp4"
        />
      </div>

      {/* About Section */}
      <div className="bg-gray-100 py-6 px-6 text-center flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold text-[#00274c] mb-6 underline">
          About Joe Joe&apos;s
        </h1>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
          Welcome to JoeJoe&apos;s Annual Tailgate, the ultimate pre-game
          tradition that brings together friends, family, and fans from all
          over! Held every year to celebrate camaraderie, team spirit, and good
          times, this event is a hallmark of our love for football and
          community.
        </p>
        <p className="text-lg text-gray-700 mt-4 max-w-3xl mx-auto">
          Whether you are here for the delicious food, the exciting games, or
          simply the great company, JoeJoe&apos;s Tailgate promises
          unforgettable memories. From BBQ grills to live music to football,
          there&apos;s something for everyone to enjoy.
        </p>
        <p className="text-lg text-gray-700 mt-4 max-w-3xl mx-auto">
          Don’t miss out on the fun—come join us, wear your team colors, and
          make this year’s tailgate the best one yet. We can’t wait to see you
          there!
        </p>
      </div>
    </div>
  );
};

export default About;
