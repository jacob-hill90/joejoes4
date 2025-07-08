// src/components/AudioSpot.jsx
export default function AudioSpot({ src, title, description, date }) {
  return (
    <section className="w-full max-w-xl mx-auto my-8 p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
      {title && (
        <h2 className="text-2xl text-[#00274c] font-bold text-gray-800 mb-2">
          {title}
        </h2>
      )}

      {description && (
        <p className="text-gray-600 text-sm mb-2">
          {description}
        </p>
      )}

      {date && (
        <p className="text-gray-400 text-xs mb-4 italic">
          {date}
        </p>
      )}

      <audio controls className="w-full">
        <source src={src} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </section>
  );
}
