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
            href="https://www.ihg.com/staybridge/hotels/us/en/find-hotels/select-roomrate?fromRedirect=true&qSrt=sBR&qIta=99801505&icdv=99801505&qSlH=arbsb&qCiD=24&qCiMy=092025&qCoD=26&qCoMy=092025&qGrpCd=FOR&qAAR=6CBARC&qRtP=6CBARC&setPMCookies=true&qSHBrC=SB&qDest=3850%20Research%20Park%20Drive,%20Ann%20Arbor,%20MI,%20US&showApp=true&adjustMonth=false&srb_u=1&qRmFltr="
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            ihg.com/staybridge/ann-arbor
          </a>
        </p>

      <p className="text-gray-700 text-sm mt-4 mb-1">
  To book online, <strong>click the link above</strong> or <strong><a
    href="https://www.ihg.com/staybridge/hotels/us/en/find-hotels/select-roomrate?fromRedirect=true&qSrt=sBR&qIta=99801505&icdv=99801505&qSlH=arbsb&qCiD=24&qCiMy=092025&qCoD=26&qCoMy=092025&qGrpCd=FOR&qAAR=6CBARC&qRtP=6CBARC&setPMCookies=true&qSHBrC=SB&qDest=3850%20Research%20Park%20Drive,%20Ann%20Arbor,%20MI,%20US&showApp=true&adjustMonth=false&srb_u=1&qRmFltr="
    target="_blank"
    rel="noopener noreferrer"
    className="text-blue-600 hover:underline"
  >click here</a></strong> in order to book on the Fournier block.
  <br /><br />
  If you prefer to book by phone, simply call the number listed above and use the code <strong>"FOR"</strong>.

</p>

      </section>
    </div>
  );
}
