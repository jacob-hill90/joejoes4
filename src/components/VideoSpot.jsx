export default function VideoSpot({ src, poster, title, description, date }) {
  return (
    <article className="max-w-3xl mx-auto mb-10 p-4 bg-white rounded-xl shadow border border-gray-200">
      <header className="mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-[#00274c]">{title}</h2>
        {date && <p className="text-sm text-gray-500">{date}</p>}
      </header>

      <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-100">
        <video
          className="w-full h-auto object-cover"
          controls
          preload="metadata"
          playsInline
          poster={poster}
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {description && (
        <div className="mt-4 text-gray-700 leading-relaxed">
          {description}
        </div>
      )}
    </article>
  );
}