import { useEffect, useState } from "react";
import BreadCrumbs from "../../components/breadcrumbs/BreadCrumbs";
import axios from "axios";
import ImgNotFound from "../../../assets/not-found.png";
import BtnAksi from "../../components/button/BtnAksi";

const Voucher = () => {
  const [kode, setKode] = useState("");
  const [kodeVoucher, setKodevoucher] = useState("");
  const [persenanPromo, setPersenanPromo] = useState("");
  const [stock, setStock] = useState("");
  const [maxPotongan, setMaxPotongan] = useState("");

  const [isLoading, setLoading] = useState(false);
  const [vouchers, setVoucher] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(5);

  const handleResetaddVoucher = () => {
    setKodevoucher("");
    setPersenanPromo("");
    setStock("");
    setMaxPotongan("");
  };

  const getVoucher = async (page = 1, kode = "") => {
    setLoading(true);
    try {
      let url = `http://localhost:5000/voucherforadmin?page=${page}&limit=${limit}`;

      if (kode) {
        url += `&kode=${kode}`;
      }
      const response = await axios.get(url);
      setVoucher(response.data.voucher);
      setTotalPages(response.data.totalPages);
      setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };

  const addVoucher = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("kode", kodeVoucher);
      formData.append("promo", persenanPromo);
      formData.append("stock", stock);
      formData.append("max_potongan", maxPotongan);

      const response = await axios.post(
        "http://localhost:5000/voucherforadmin/create",
        formData
      );

      console.log(response.data);
      getVoucher();
      handleResetaddVoucher();
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (!kode.trim()) {
      getVoucher(currentPage);
    }
  }, [kode]);

  useEffect(() => {
    getVoucher(currentPage, kode);
  }, [currentPage]);

  const handleSearchVoucher = () => {
    getVoucher(1, kode);
  };

  const handlePageChangeVoucher = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="flex flex-col gap-y-4 w-full">
      <BreadCrumbs />
      <div className="flex flex-row lg:text-2xl text-black dark:text-white font-semibold">
        Tambah Voucher
      </div>
      <div className="bg-white dark:bg-[#2d2d2e] rounded-xl shadow-md p-5">
        <form onSubmit={addVoucher} className="flex flex-col gap-y-4">
          <div className="grid grid-cols-5 gap-y-4 gap-x-2">
            <label
              htmlFor="kode"
              className="col-span-1 flex flex-row items-center text-black dark:text-white"
            >
              Kode
            </label>
            <input
              id="kode"
              type="text"
              placeholder="Kode"
              value={kodeVoucher}
              onChange={(e) => setKodevoucher(e.target.value)}
              className="col-span-4 bg-white dark:bg-[#16171a] p-2.5 focus:outline-none focus:ring focus:duration-300 text-black dark:text-white ring-1 ring-zinc-200 dark:ring-zinc-600 rounded-lg"
            />
            <label
              htmlFor="persenanPromo"
              className="col-span-1 flex flex-row items-center text-black dark:text-white"
            >
              Persenan Promo
            </label>
            <input
              id="persenanPromo"
              type="number"
              placeholder="Persenan Promo"
              value={persenanPromo}
              onChange={(e) => setPersenanPromo(e.target.value)}
              className="col-span-4 bg-white dark:bg-[#16171a] p-2.5 focus:outline-none focus:ring focus:duration-300 text-black dark:text-white ring-1 ring-zinc-200 dark:ring-zinc-600 rounded-lg"
            />
            <label
              htmlFor="stock"
              className="col-span-1 flex flex-row items-center text-black dark:text-white"
            >
              Stock
            </label>
            <input
              id="stock"
              type="number"
              placeholder="Stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="col-span-4 bg-white dark:bg-[#16171a] p-2.5 focus:outline-none focus:ring focus:duration-300 text-black dark:text-white ring-1 ring-zinc-200 dark:ring-zinc-600 rounded-lg"
            />
            <label
              htmlFor="maxPotongan"
              className="col-span-1 flex flex-row items-center text-black dark:text-white"
            >
              Max Potongan
            </label>
            <input
              id="maxPotongan"
              type="number"
              placeholder="Max Potongan"
              value={maxPotongan}
              onChange={(e) => setMaxPotongan(e.target.value)}
              className="col-span-4 bg-white dark:bg-[#16171a] p-2.5 focus:outline-none focus:ring focus:duration-300 text-black dark:text-white ring-1 ring-zinc-200 dark:ring-zinc-600 rounded-lg"
            />
          </div>
          <div className="flex flex-row gap-3 justify-end mt-2">
            <button
              type="button"
              onClick={handleResetaddVoucher}
              className="bg-zinc-300 px-3 py-2 rounded-md text-black"
            >
              Reset
            </button>
            <button
              type="submit"
              className="bg-purple-500  px-3 py-2 rounded-md text-white"
            >
              Buat Voucher
            </button>
          </div>
        </form>
      </div>
      <div className="flex flex-row text-2xl text-black dark:text-white font-semibold">
        Daftar Semua Voucher
      </div>
      <div className="flex flex-row items-center justify-between gap-x-3">
        <div className="flex flex-row gap-x-3">
          <input
            type="text"
            name="kodeVoucher"
            id="kodeVoucherAdminInput"
            placeholder="Kode..."
            value={kode}
            onChange={(e) => setKode(e.target.value)}
            className="text-black dark:text-white font-medium cursor-pointer bg-white dark:bg-[#2d2d2e] rounded-lg px-4 py-2 focus:outline-none border border-zinc-300 dark:border-zinc-600 shadow-md"
          />
          <button
            onClick={handleSearchVoucher}
            className="flex flex-row items-center gap-x-2 px-4 py-2 bg-purple-500 hover:brightness-90 hover:dur rounded-lg text-white cursor-pointer shadow-md"
          >
            Cari
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth={0.5}
              className="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
            </svg>
          </button>
        </div>
      </div>
      <div className="shadow-md border border-zinc-300 dark:border-[#4169e1]/30 rounded-xl flex flex-row w-full overflow-y-hidden pb-2 overflow-x-auto min-h-56">
        <table className="bg-transparent w-full text-start">
          <thead className="bg-purple-500 dark:bg-[#2d2d2e]">
            <tr className="text-white border-b dark:border-zinc-600">
              <th className="py-2 text-start px-4 font-medium whitespace-nowrap">
                No
              </th>
              <th className="py-2 text-start px-4 font-medium whitespace-nowrap">
                Kode
              </th>
              <th className="py-2 text-start px-4 font-medium whitespace-nowrap">
                Potongan
              </th>
              <th className="py-2 text-start px-4 font-medium whitespace-nowrap">
                Kuota
              </th>
              <th className="py-2 text-start px-4 font-medium whitespace-nowrap">
                Max Potongan
              </th>
              <th className="py-2 text-start px-4 font-medium">Aksi</th>
              <th className="py-2 text-start px-4 font-medium whitespace-nowrap">
                Tanggal
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="7">
                  <div className="flex flex-row gap-x-1 items-end justify-center my-8 text-black dark:text-white">
                    <p className="text-lg">Loading</p>
                    <span className="loading loading-dots loading-sm"></span>
                  </div>
                </td>
              </tr>
            ) : (
              <>
                {vouchers.length === 0 ? (
                  <tr>
                    <td colSpan="7">
                      <div className="flex justify-center my-8">
                        <div className="flex flex-col justify-center items-center">
                          <img
                            src={ImgNotFound}
                            alt="No orders found"
                            className="max-w-40"
                          />
                          <p className="text-black dark:text-white">
                            Oops, Voucher tidak ditemukan!
                          </p>
                        </div>
                      </div>
                    </td>
                  </tr>
                ) : (
                  <>
                    {vouchers.map((voucher, index) => (
                      <tr
                        key={index}
                        className="bg-white dark:bg-[#16171a] border-b border-zinc-300 dark:border-zinc-600"
                      >
                        <td className="py-2 px-4 font-light text-black dark:text-white">
                          {index}
                        </td>
                        <td className="py-2 px-4 font-light text-black dark:text-white">
                          {voucher.kode}
                        </td>
                        <td className="py-2 px-4 font-light text-black dark:text-white">
                          {voucher.promo}
                        </td>
                        <td className="py-2 px-4 font-light text-black dark:text-white">
                          {voucher.stock}
                        </td>
                        <td className="py-2 px-4 font-light text-black dark:text-white">
                          {voucher.max_potongan}
                        </td>
                        <td className="py-2 px-4 font-light text-black dark:text-white">
                          <BtnAksi id={voucher.id} getData={getVoucher} />
                        </td>
                        <td className="py-2 px-4 font-light text-black dark:text-white">
                          {voucher.created_at.slice(0, 19).replace("T", " ")}
                        </td>
                      </tr>
                    ))}
                  </>
                )}
              </>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex flex-row flex-wrap gap-2 justify-center mt-4">
        <button
          onClick={() => handlePageChangeVoucher(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-1 bg-gray-300 text-black rounded disabled:brightness-75 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChangeVoucher(index + 1)}
            className={`px-4 py-2 mx-1 rounded ${
              currentPage === index + 1
                ? "bg-purple-500 text-white"
                : "bg-gray-300 text-black"
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChangeVoucher(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 mx-1 bg-purple-500 text-white rounded disabled:brightness-75 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Voucher;
