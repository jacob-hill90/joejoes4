export default function Lodging() {
  return (
    <div className="p-4">
      <h1 className="text-3xl text-[#00274c] font-bold text-center mb-6">
        Lodging & Transportation
      </h1>
      <section className="w-full max-w-xl mx-auto my-8 p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Staybridge Suites
        </h2>

        <p className="text-gray-700 text-sm mb-1">
          3850 Research Park Drive
          <br />
          Ann Arbor, MI 48108
        </p>

        <p className="text-gray-700 text-sm mt-4 mb-1">
          <strong>Phone:</strong>{" "}
          <a href="tel:7342131400" className="text-blue-600 hover:underline">
            734-213-1400
          </a>
          <br />
          <strong>Email:</strong>{" "}
          <a
            href="mailto:george@premierhospitalitymi.com"
            className="text-blue-600 hover:underline"
          >
            george@premierhospitalitymi.com
          </a>
          <br />
          <strong>Website:</strong>{" "}
          <a
            href="https://www.ihg.com/staybridge/hotels/us/en/ann-arbor/arbsb/hoteldetail"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            ihg.com/staybridge/ann-arbor
          </a>
        </p>

        <p className="text-gray-600 text-sm mt-4 mb-4">
          To book online, use the link above to access the hotel website.
          Once there, select your preferred dates, click{" "}
          <strong>"VIEW PRICES"</strong>.
          <br />
          If you prefer to book by phone, simply call the number listed above.
        </p>

        <p className="text-gray-800 text-sm font-medium">
          🚌 Complimentary shuttle service will run between the hotel and the
          tailgate.
        </p>
      </section>
    </div>
  );
}
