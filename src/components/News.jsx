import AudioSpot from "./AudioSpot";
import { CLOUDFRONT_URL } from "../config";

export default function News() {
  return (
    <div className="p-4">
      <h1 className="text-3xl text-[#00274c] font-bold text-center mb-6">News</h1>

      <AudioSpot
        src={`${CLOUDFRONT_URL}/joejoests.mp3`}
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
