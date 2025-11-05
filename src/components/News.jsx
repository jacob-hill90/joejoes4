import AudioSpot from "./AudioSpot";
import VideoSpot from "./VideoSpot";
import { CLOUDFRONT_URL } from "../config";

const PATHS = {
  videos: `${CLOUDFRONT_URL}/videos`,
  photos: `${CLOUDFRONT_URL}/photos`,
  audio:  `${CLOUDFRONT_URL}/audio`,
};

export default function News() {
  return (
    <div className="p-4">
      <h1 className="text-3xl text-[#00274c] font-bold text-center mb-6">
        News
      </h1>

      <VideoSpot
        // ⬇️ point this to your short shoutout clip in S3
        // Example path – change the file name if yours differs
        src={`${PATHS.videos}/2025/shoutout.mp4`}
        // Optional poster image (use any thumbnail from your photos)
        poster={`${PATHS.photos}/2025/shoutoutPoster.jpg`}
        title="Live Television Shoutout - 2025"
        description={
          null
        }
        date="October 25, 2025"
      />

      {/* Existing audio post */}
      <AudioSpot
        src={`${PATHS.audio}/joejoests.mp3`}
        title="JR Sunday with Mark Hollis"
        description={
          <>
            Anticipation is ramping up. Over the weekend, JoeJoe joined Kristin
            Falconer, founder and owner of{" "}
            <a
              href="https://trailerevents.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Trailer Events
            </a>
            , as a guest on <em>JR Sunday with Mark Hollis</em>. They discussed
            upcoming plans and shared behind-the-scenes insights.
            <div className="my-4">
              Listen to the full show{" "}
              <a
                href="https://thegreatvoice.com/Episode/jr-sunday-june-22-2025-full-show/39892"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline font-medium"
              >
                here
              </a>
            </div>
          </>
        }
        date="June 22, 2025"
      />
    </div>
  );
}