import axios from "axios";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import BtnStatus from "../../components/button/BtnStatus";
import LoaderBanner from "../../components/loader/LoaderBanner";

const CekTransaksi = () => {
  const { bannerCekTransaksi } = useOutletContext();
  const [animate, setAnimate] = useState(false);
  const [pembelians, setPembelian] = useState([]);

  const getPembelian = async () => {
    const response = await axios.get(
      "http://localhost:5000/pembelianforcektransaksi"
    );
    setPembelian(response.data);
  };

  useEffect(() => {
    setAnimate(true);
  }, []);

  useEffect(() => {
    getPembelian();
  }, []);

  return (
    <div className="flex flex-col lg:gap-y-6 md:gap-y-6 gap-y-4 lg:px-16 md:px-10 px-4 py-6">
      <div className="relative rounded-xl w-full min-h-72 overflow-hidden">
        {bannerCekTransaksi ? (
          <>
            <img
              id="bannerCekTransaksi"
              src={bannerCekTransaksi}
              alt="Banner-CekTransaksi"
              loading="lazy"
              className="absolute object-cover object-center inset-0 w-full h-full"
            />
            <div className="absolute bg-black/30 inset-0"></div>
            <div
              className={`absolute bg-black/60 flex flex-col gap-y-1 w-full text-white p-6 bottom-0 transform transition-transform duration-700 ease-in-out ${
                animate ? "translate-y-0" : "translate-y-full"
              }`}
            >
              <p className="lg:text-3xl md:text-2xl text-xl font-medium">
                Cek Transaksi
              </p>
              <p className="lg:text-base md:text-sm text-xs font-light">
                Lacak pesananmu dengan mudah, cukup masukkan Nomor Invoice di
                bawah ini!
              </p>
              <div className="flex flex-row gap-x-2 mt-1">
                <div className="bg-white dark:bg-[#232324] rounded-xl border border-zinc-700 cursor-pointer text-black dark:text-white font-light lg:text-sm md:text-sm text-xs px-3 p-1.5 lg:max-w-xs md:max-w-xs lg:w-full md:w-full flex-1">
                  <input
                    type="search"
                    className="bg-transparent outline-none lg:h-7 md:h-7 h-5 w-full placeholder:text-gray-600 dark:placeholder:text-gray-400"
                    placeholder="Nomor Invoice anda..."
                  />
                </div>
                <div className="bg-[#4169e1] hover:bg-[#4f73e0] duration-300 rounded-xl cursor-pointer flex flex-row items-center py-2 px-3 gap-x-2 font-light lg:text-sm md:text-sm text-xs">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-search"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                  </svg>
                  Cari Transaksi
                </div>
              </div>
            </div>
          </>
        ) : (
          <LoaderBanner />
        )}
      </div>
      <div className="text-black dark:text-gray-300 font-medium underline lg:text-base -my-2">
        Memperlihatkan 10 riwayat transaksi terbaru
      </div>
      <div className="shadow-md border border-zinc-300 dark:border-[#4169e1]/30 rounded-xl flex flex-row w-full overflow-hidden pb-2 overflow-x-auto">
        <table className="bg-transparent w-full text-start">
          <thead className="bg-[#4169e1] dark:bg-[#2d2d2e]">
            <tr className="text-white border-b dark:border-zinc-600">
              <th className="py-2 text-start px-4 font-medium">Invoice</th>
              <th className="py-2 text-start px-4 font-medium">Layanan</th>
              <th className="py-2 text-start px-4 font-medium">Harga</th>
              <th className="py-2 text-start px-4 font-medium">Tanggal</th>
              <th className="py-2 text-start px-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {pembelians.map((pembelian, index) => (
              <tr
                key={index}
                className="bg-white dark:bg-[#16171a] dark:hover:bg-[#222429] hover:duration-300 border-b border-zinc-300 dark:border-zinc-600"
              >
                <td className="py-2 px-4 font-light text-black dark:text-white">
                  {pembelian.order_id}
                </td>
                <td className="py-2 px-4 font-light text-black dark:text-white">
                  {pembelian.layanan}
                </td>
                <td className="py-2 px-4 font-light text-black dark:text-white">
                  Rp{" "}
                  {pembelian.harga.toLocaleString("id-ID", {
                    styles: "currency",
                    currency: "IDR",
                  })}
                </td>
                <td className="py-2 px-4 font-light text-black dark:text-white">
                  {pembelian.created_at}
                </td>
                <td className="py-2 px-4 font-light text-black dark:text-white">
                  <BtnStatus status={pembelian.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CekTransaksi;
