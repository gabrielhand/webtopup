import { useEffect, useState } from "react";
import BreadCrumbs from "../../components/breadcrumbs/BreadCrumbs";
import axios from "axios";
import BtnStatus from "../../components/button/BtnStatus";
import ImgNotFound from "../../../assets/not-found.png";
import BtnAksi from "../../components/button/BtnAksi";

const SubKategori = () => {
  const [kategori, setKategori] = useState([]);
  const [selectedKategori, setSelectedKategori] = useState(null);
  const [isMenuKategoriOpen, setMenuKategoriOpen] = useState(false);
  const [kode, setKode] = useState("");
  const [namaSubKategori, setNamaSubKategori] = useState("");

  const [subKategoris, setSubKategori] = useState([]);
  const [nama, setNama] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(5);

  const getKategori = async () => {
    const response = await axios.get(
      "http://localhost:5000/subkategoriforadmin/kategori"
    );

    setKategori(response.data);
  };

  const addSubKategori = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("categori_id", selectedKategori.id);
      formData.append("code", kode);
      formData.append("name", namaSubKategori);

      const response = await axios.post(
        "http://localhost:5000/subkategoriforadmin/create",
        formData
      );

      getSubKategori();
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getKategori();
    getSubKategori();
  }, []);

  const getSubKategori = async (page = 1, name = "") => {
    setLoading(true);
    try {
      let url = `http://localhost:5000/subkategoriforadmin?page=${page}&limit=${limit}`;

      if (name) {
        url += `&name=${name}`;
      }
      const response = await axios.get(url);
      setSubKategori(response.data.subKategori);
      setTotalPages(response.data.totalPages);
      setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!nama.trim()) {
      getSubKategori(currentPage);
    }
  }, [nama]);

  useEffect(() => {
    getSubKategori(currentPage, nama);
  }, [currentPage]);

  const handleSearchSubKategori = () => {
    getSubKategori(1, nama);
  };

  const handlePageChangeSubKategori = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleKategoriSelection = (selectedKategori) => {
    setSelectedKategori(selectedKategori);
    setMenuKategoriOpen(false);
  };

  const toggleMenuKategori = () => {
    setMenuKategoriOpen(!isMenuKategoriOpen);
  };

  const handleResetAddSubKategori = () => {
    setSelectedKategori(null);
    setNamaSubKategori("");
    setKode("");
  };

  return (
    <div className="flex flex-col gap-y-4 w-full">
      <BreadCrumbs />
      <div className="flex flex-row lg:text-2xl text-black dark:text-white font-semibold">
        Tambah Sub Kategori
      </div>
      <div className="bg-white dark:bg-[#2d2d2e] rounded-xl shadow-md p-5">
        <form onSubmit={addSubKategori} className="flex flex-col gap-y-4">
          <div className="grid grid-cols-5 gap-y-4 gap-x-2">
            <label
              htmlFor="kategori"
              className="col-span-1 flex flex-row items-center text-black dark:text-white"
            >
              Kategori
            </label>
            <div className="relative col-span-4 flex flex-col">
              <div
                onClick={toggleMenuKategori}
                className="flex flex-row items-center justify-between gap-3 text-black dark:text-white bg-white dark:bg-[#16171a] p-2.5 rounded-lg focus:outline focus:outline-offset-1 focus:outline-zinc-600 ring-1 ring-zinc-200 dark:ring-zinc-600 cursor-pointer"
              >
                {selectedKategori ? selectedKategori.nama : "Pilih Kategori"}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  fill="currentColor"
                  className={`bi bi-caret-down-fill transform transition-transform duration-100 ${
                    isMenuKategoriOpen ? "rotate-180" : "rotate-0"
                  }`}
                  viewBox="0 0 16 16"
                >
                  <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                </svg>
              </div>
              {isMenuKategoriOpen && (
                <div className="absolute top-12 flex flex-col gap-y-2 bg-white dark:bg-[#16171a] p-2 rounded-lg w-full ring-1 ring-zinc-200 dark:ring-zinc-600">
                  {kategori?.map((kategoriOption) => (
                    <div
                      key={kategoriOption.nama}
                      onClick={() => handleKategoriSelection(kategoriOption)}
                      className="flex flex-row px-4 py-2 text-black dark:text-white cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-700 hover:duration-300 rounded-lg z-50"
                    >
                      {kategoriOption.nama}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <label
              htmlFor="subnamaSubKategoriKategori"
              className="col-span-1 flex flex-row items-center text-black dark:text-white"
            >
              Kode
            </label>
            <input
              id="kodeSubKategori"
              type="text"
              placeholder="Kode"
              value={kode}
              onChange={(e) => setKode(e.target.value)}
              className="col-span-4 bg-white dark:bg-[#16171a] p-2.5 focus:outline-none focus:ring focus:duration-300 text-black dark:text-white ring-1 ring-zinc-200 dark:ring-zinc-600 rounded-lg"
            />
            <label
              htmlFor="namaSubKategori"
              className="col-span-1 flex flex-row items-center text-black dark:text-white"
            >
              Nama
            </label>
            <input
              id="namaSubKategori"
              type="text"
              placeholder="Nama"
              value={namaSubKategori}
              onChange={(e) => setNamaSubKategori(e.target.value)}
              className="col-span-4 bg-white dark:bg-[#16171a] p-2.5 focus:outline-none focus:ring focus:duration-300 text-black dark:text-white ring-1 ring-zinc-200 dark:ring-zinc-600 rounded-lg"
            />
          </div>
          <div className="flex flex-row gap-3 justify-end mt-2">
            <button
              type="button"
              onClick={handleResetAddSubKategori}
              className="bg-zinc-300 px-3 py-2 rounded-md text-black"
            >
              Reset
            </button>
            <button
              type="submit"
              className="bg-purple-500  px-3 py-2 rounded-md text-white"
            >
              Buat Kategori
            </button>
          </div>
        </form>
      </div>
      <div className="flex flex-row text-2xl text-black dark:text-white font-semibold">
        Daftar Semua Sub Kategori
      </div>
      <div className="flex flex-row items-center justify-between gap-x-3">
        <div className="flex flex-row gap-x-3">
          <input
            type="text"
            name="namaSubKategori"
            id="namaSubKategoriAdminInput"
            placeholder="Nama..."
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            className="text-black dark:text-white font-medium cursor-pointer bg-white dark:bg-[#2d2d2e] rounded-lg px-4 py-2 focus:outline-none border border-zinc-300 dark:border-zinc-600 shadow-md"
          />
          <button
            onClick={handleSearchSubKategori}
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
      <div className="shadow-md border border-zinc-300 dark:border-[#4169e1]/30 rounded-xl flex flex-row w-full overflow-y-hidden pb-2 overflow-x-auto min-h-72">
        <table className="bg-transparent w-full text-start">
          <thead className="bg-purple-500 dark:bg-[#2d2d2e]">
            <tr className="text-white border-b dark:border-zinc-600">
              <th className="py-2 text-start px-4 font-medium whitespace-nowrap">
                No
              </th>
              <th className="py-2 text-start px-4 font-medium whitespace-nowrap">
                Kategori
              </th>
              <th className="py-2 text-start px-4 font-medium whitespace-nowrap">
                Nama
              </th>
              <th className="py-2 text-start px-4 font-medium">Kode</th>
              <th className="py-2 text-start px-4 font-medium">Status</th>
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
                {subKategoris.length === 0 ? (
                  <tr>
                    <td colSpan="12">
                      <div className="flex justify-center my-8">
                        <div className="flex flex-col justify-center items-center">
                          <img
                            src={ImgNotFound}
                            alt="No orders found"
                            className="max-w-40"
                          />
                          <p className="text-black dark:text-white">
                            Oops, Sub Kategori tidak ditemukan!
                          </p>
                        </div>
                      </div>
                    </td>
                  </tr>
                ) : (
                  <>
                    {subKategoris.map((subKategori, index) => {
                      const isLast = index === subKategoris.length - 1;
                      const isSecondLast = index === subKategoris.length - 2;
                      return (
                        <tr
                          key={index}
                          className="bg-white dark:bg-[#16171a] border-b border-zinc-300 dark:border-zinc-600"
                        >
                          <td className="py-2 px-4 font-light text-black dark:text-white">
                            {index}
                          </td>
                          <td className="py-2 px-4 font-light text-black dark:text-white">
                            {subKategori.kategori
                              ? subKategori.kategori.nama
                              : "-"}
                          </td>
                          <td className="py-2 px-4 font-light text-black dark:text-white">
                            {subKategori.name}
                          </td>
                          <td className="py-2 px-4 font-light text-black dark:text-white">
                            {subKategori.code}
                          </td>
                          <td className="py-2 px-4 font-light text-black dark:text-white">
                            <BtnStatus
                              Id={subKategori.id}
                              status={
                                subKategori.active === 1 ? "active" : "unactive"
                              }
                              isLast={isLast}
                              isSecondLast={isSecondLast}
                            />
                          </td>
                          <td className="py-2 px-4 font-light text-black dark:text-white">
                            <BtnAksi
                              id={subKategori.id}
                              getData={getSubKategori}
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </>
                )}
              </>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex flex-row flex-wrap gap-2 justify-center mt-4">
        <button
          onClick={() => handlePageChangeSubKategori(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-1 bg-gray-300 text-black rounded disabled:brightness-75 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChangeSubKategori(index + 1)}
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
          onClick={() => handlePageChangeSubKategori(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 mx-1 bg-purple-500 text-white rounded disabled:brightness-75 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SubKategori;
