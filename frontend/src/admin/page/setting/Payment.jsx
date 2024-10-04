import { useEffect, useRef, useState } from "react";
import BreadCrumbs from "../../components/breadcrumbs/BreadCrumbs";
import axios from "axios";
import BtnAksi from "../../components/button/BtnAksi";
import ImgNotFound from "../../../assets/not-found.png";

const Payment = () => {
  const [isLoading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [namaPayment, setNamaPayment] = useState("");
  const [kode, setKode] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [tipe] = useState([
    { nama: "E-Wallet", value: "e-wallet" },
    { nama: "Transfer Bank", value: "virtual-account" },
    { nama: "Convenience Store", value: "convenience-store" },
  ]);
  const [selectedTipe, setSelectedTipe] = useState(null);
  const [isMenuTipeOpen, setMenuTipeOpen] = useState(false);
  const [gambar, setGambar] = useState(null);
  const [payments, setPayment] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(5);

  const gambarRef = useRef(null);

  const handleTipeSelection = (selectedTipe) => {
    setSelectedTipe(selectedTipe);
    setMenuTipeOpen(false);
  };

  const addPayment = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", namaPayment);
      formData.append("code", kode);
      formData.append("keterangan", keterangan);
      formData.append("tipe", selectedTipe.value);
      formData.append("gambar", gambar);

      const response = await axios.post(
        "http://localhost:5000/methodforadmin/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);
      getPayment();
      handleResetAddPayment();
    } catch (error) {
      console.log(error.message);
    }
  };

  const getPayment = async (page = 1, name = "") => {
    setLoading(true);
    try {
      let url = `http://localhost:5000/methodforadmin?page=${page}&limit=${limit}`;

      if (name) {
        url += `&name=${name}`;
      }
      const response = await axios.get(url);
      setPayment(response.data.method);
      setTotalPages(response.data.totalPages);
      setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPayment();
  }, []);

  useEffect(() => {
    if (!name.trim()) {
      getPayment(currentPage);
    }
  }, [name]);

  useEffect(() => {
    getPayment(currentPage, name);
  }, [currentPage]);

  const handleSearchBeritaPayment = () => {
    getPayment(1, name);
  };

  const handlePageChangePayment = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const toggleMenuTipe = () => {
    setMenuTipeOpen(!isMenuTipeOpen);
  };

  const handleResetAddPayment = () => {
    setNamaPayment("");
    setKode("");
    setKeterangan("");
    setSelectedTipe(null);

    if (gambarRef.current) gambarRef.current.value = null;
  };

  return (
    <div className="flex flex-col gap-y-4 w-full">
      <BreadCrumbs />
      <div className="flex flex-row lg:text-2xl text-black dark:text-white font-semibold">
        Tambah Payment
      </div>
      <div className="bg-white dark:bg-[#2d2d2e] rounded-xl shadow-md p-5">
        <form onSubmit={addPayment} className="flex flex-col gap-y-4">
          <div className="grid grid-cols-5 gap-y-4 gap-x-2">
            <label
              htmlFor="nama"
              className="col-span-1 flex flex-row items-center text-black dark:text-white"
            >
              Nama
            </label>
            <input
              id="nama"
              type="text"
              placeholder="Nama"
              value={namaPayment}
              onChange={(e) => setNamaPayment(e.target.value)}
              className="col-span-4 bg-white dark:bg-[#16171a] p-2.5 focus:outline-none focus:ring focus:duration-300 text-black dark:text-white ring-1 ring-zinc-200 dark:ring-zinc-600 rounded-lg"
            />
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
              value={kode}
              onChange={(e) => setKode(e.target.value)}
              className="col-span-4 bg-white dark:bg-[#16171a] p-2.5 focus:outline-none focus:ring focus:duration-300 text-black dark:text-white ring-1 ring-zinc-200 dark:ring-zinc-600 rounded-lg"
            />
            <label
              htmlFor="keterangan"
              className="col-span-1 flex flex-row items-center text-black dark:text-white"
            >
              Keterangan
            </label>
            <input
              id="keterangan"
              type="text"
              placeholder="Keterangan"
              value={keterangan}
              onChange={(e) => setKeterangan(e.target.value)}
              className="col-span-4 bg-white dark:bg-[#16171a] p-2.5 focus:outline-none focus:ring focus:duration-300 text-black dark:text-white ring-1 ring-zinc-200 dark:ring-zinc-600 rounded-lg"
            />
            <label
              htmlFor="tipe"
              className="col-span-1 flex flex-row items-center text-black dark:text-white"
            >
              Tipe
            </label>
            <div className="relative col-span-4 flex flex-col">
              <div
                onClick={toggleMenuTipe}
                className="flex flex-row items-center justify-between gap-3 text-black dark:text-white bg-white dark:bg-[#16171a] p-2.5 rounded-lg focus:outline focus:outline-offset-1 focus:outline-zinc-600 ring-1 ring-zinc-200 dark:ring-zinc-600 cursor-pointer"
              >
                {selectedTipe ? selectedTipe.nama : "Pilih Tipe"}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  fill="currentColor"
                  className={`bi bi-caret-down-fill transform transition-transform duration-100 ${
                    isMenuTipeOpen ? "rotate-180" : "rotate-0"
                  }`}
                  viewBox="0 0 16 16"
                >
                  <images d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                </svg>
              </div>
              {isMenuTipeOpen && (
                <div className="absolute top-12 flex flex-col gap-y-2 bg-white dark:bg-[#16171a] p-2 rounded-lg w-full ring-1 ring-zinc-200 dark:ring-zinc-600">
                  {tipe.map((tipeOption) => (
                    <div
                      key={tipeOption.nama}
                      onClick={() => handleTipeSelection(tipeOption)}
                      className="flex flex-row px-4 py-2 text-black dark:text-white cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-700 hover:duration-300 rounded-lg z-50"
                    >
                      {tipeOption.nama}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <label
              htmlFor="gambar"
              className="col-span-1 flex flex-row items-center text-black dark:text-white"
            >
              Pilih Gambar
            </label>
            <input
              id="gambar"
              ref={gambarRef}
              type="file"
              onChange={(e) => setGambar(e.target.files[0])}
              accept="image/*"
              className="col-span-4 bg-white dark:bg-[#16171a] p-2.5 focus:outline-none focus:ring focus:duration-300 text-black dark:text-white ring-1 ring-zinc-200 dark:ring-zinc-600 rounded-lg"
            />
          </div>
          <div className="flex flex-row gap-3 justify-end mt-2">
            <button
              type="button"
              onClick={handleResetAddPayment}
              className="bg-zinc-300 px-3 py-2 rounded-md text-black"
            >
              Reset
            </button>
            <button
              type="submit"
              className="bg-purple-500  px-3 py-2 rounded-md text-white"
            >
              Buat Slider
            </button>
          </div>
        </form>
      </div>
      <div className="flex flex-row text-2xl text-black dark:text-white font-semibold">
        Daftar Semua Slider
      </div>
      <div className="flex flex-row items-center justify-between gap-x-3">
        <div className="flex flex-row gap-x-3">
          <input
            type="text"
            name="nama"
            id="namaAdminInput"
            placeholder="Nama..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="text-black dark:text-white font-medium cursor-pointer bg-white dark:bg-[#2d2d2e] rounded-lg px-4 py-2 focus:outline-none border border-zinc-300 dark:border-zinc-600 shadow-md"
          />
          <button
            onClick={handleSearchBeritaPayment}
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
                Nama
              </th>
              <th className="py-2 text-start px-4 font-medium whitespace-nowrap">
                Kode
              </th>
              <th className="py-2 text-start px-4 font-medium whitespace-nowrap">
                Keterangan
              </th>
              <th className="py-2 text-start px-4 font-medium whitespace-nowrap">
                Tipe
              </th>
              <th className="py-2 text-start px-4 font-medium whitespace-nowrap">
                Gambar
              </th>
              <th className="py-2 text-start px-4 font-medium whitespace-nowrap">
                Tanggal
              </th>
              <th className="py-2 text-start px-4 font-medium">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="6">
                  <div className="flex flex-row gap-x-1 items-end justify-center my-8 text-black dark:text-white">
                    <p className="text-lg">Loading</p>
                    <span className="loading loading-dots loading-sm"></span>
                  </div>
                </td>
              </tr>
            ) : (
              <>
                {payments.length === 0 ? (
                  <tr>
                    <td colSpan="6">
                      <div className="flex justify-center my-8">
                        <div className="flex flex-col justify-center items-center">
                          <img
                            src={ImgNotFound}
                            alt="No orders found"
                            className="max-w-40"
                          />
                          <p className="text-black dark:text-white">
                            Oops, Payment tidak ditemukan!
                          </p>
                        </div>
                      </div>
                    </td>
                  </tr>
                ) : (
                  <>
                    {payments.map((payment, index) => (
                      <tr
                        key={index}
                        className="bg-white dark:bg-[#16171a] border-b border-zinc-300 dark:border-zinc-600"
                      >
                        <td className="py-2 px-4 font-light text-black dark:text-white">
                          {index}
                        </td>
                        <td className="py-2 px-4 font-light text-black dark:text-white">
                          {payment.name}
                        </td>
                        <td className="py-2 px-4 font-light text-black dark:text-white">
                          {payment.code}
                        </td>
                        <td className="py-2 px-4 font-light text-black dark:text-white">
                          {payment.keterangan}
                        </td>
                        <td className="py-2 px-4 font-light text-black dark:text-white">
                          {payment.tipe}
                        </td>
                        <td className="py-2 px-4 font-light text-black dark:text-white">
                          <img
                            src={payment.images}
                            alt={`Gambar-${payment.name}`}
                            width={100}
                          />
                        </td>
                        <td className="py-2 px-4 font-light text-black dark:text-white">
                          {payment.created_at.slice(0, 19).replace("T", " ")}
                        </td>
                        <td className="py-2 px-4 font-light text-black dark:text-white">
                          <BtnAksi id={payment.id} getData={getPayment} />
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
          onClick={() => handlePageChangePayment(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-1 bg-gray-300 text-black rounded disabled:brightness-75 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChangePayment(index + 1)}
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
          onClick={() => handlePageChangePayment(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 mx-1 bg-purple-500 text-white rounded disabled:brightness-75 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Payment;
