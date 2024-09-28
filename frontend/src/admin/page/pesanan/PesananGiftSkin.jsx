import { useEffect, useState } from "react";
import BreadCrumbs from "../../components/breadcrumbs/BreadCrumbs";
import axios from "axios";
import ImgNotFound from "../../../assets/not-found.png";
import BtnStatus from "../../components/button/BtnStatus";
import BtnAksi from "../../components/button/BtnAksi";

const PesananGiftSkin = () => {
  const [isLoading, setLoading] = useState(false);
  const [pembelianGiftSkin, setPembelianGiftSkin] = useState([]);
  const [orderIdGiftSkin, setOrderIdGiftSkin] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(5);

  const getPembelianGiftSkin = async (page = 1, orderId = "") => {
    setLoading(true);
    try {
      let url = `http://localhost:5000/pembelian/giftskin?page=${page}&limit=${limit}`;

      if (orderId) {
        url += `&order_id=${orderId}`;
      }

      const response = await axios.get(url);
      setPembelianGiftSkin(response.data.pembelianGiftSkin);
      setTotalPages(response.data.totalPages);
      setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPembelianGiftSkin();
  }, []);

  useEffect(() => {
    if (!orderIdGiftSkin.trim()) {
      getPembelianGiftSkin(currentPage);
    }
  }, [orderIdGiftSkin]);

  useEffect(() => {
    getPembelianGiftSkin(currentPage, orderIdGiftSkin);
  }, [currentPage]);

  const handleSearchGiftSkin = () => {
    getPembelianGiftSkin(1, orderIdGiftSkin);
  };

  const handlePageChangeGiftSkin = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  return (
    <div className="flex flex-col gap-y-4 w-full">
      <BreadCrumbs />
      <div className="flex flex-row text-2xl text-black dark:text-white font-semibold">
        Daftar Semua Pesanan Gift Skin
      </div>
      <div className="flex flex-row items-center justify-between gap-x-3">
        <div className="flex flex-row gap-x-3">
          <input
            type="text"
            name="orderId"
            id="OrderIdAdminInput"
            placeholder="Order Id..."
            value={orderIdGiftSkin}
            onChange={(e) => setOrderIdGiftSkin(e.target.value)}
            className="text-black dark:text-white font-medium cursor-pointer bg-white dark:bg-[#2d2d2e] rounded-lg px-4 py-2 focus:outline-none border border-zinc-300 dark:border-zinc-600 shadow-md"
          />
          <button
            onClick={handleSearchGiftSkin}
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
                Order Id
              </th>
              <th className="py-2 text-start px-4 font-medium">Layanan</th>
              <th className="py-2 text-start px-4 font-medium">User Id</th>
              <th className="py-2 text-start px-4 font-medium">Zone Id</th>
              <th className="py-2 text-start px-4 font-medium">Nickname</th>
              <th className="py-2 text-start px-4 font-medium">
                Status Gift Skin
              </th>
              <th className="py-2 text-start px-4 font-medium">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="12">
                  <div className="flex flex-row gap-x-1 items-end justify-center my-8 text-black dark:text-white">
                    <p className="text-lg">Loading</p>
                    <span className="loading loading-dots loading-sm"></span>
                  </div>
                </td>
              </tr>
            ) : (
              <>
                {pembelianGiftSkin.length === 0 ? (
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
                            Oops, pesanan gift skin tidak ditemukan!
                          </p>
                        </div>
                      </div>
                    </td>
                  </tr>
                ) : (
                  <>
                    {pembelianGiftSkin.map((pembeliangs, index) => {
                      const isLast = index === pembelianGiftSkin.length - 1;
                      const isSecondLast =
                        index === pembelianGiftSkin.length - 2;
                      return (
                        <tr
                          key={index}
                          className="bg-white dark:bg-[#16171a] border-b border-zinc-300 dark:border-zinc-600"
                        >
                          <td className="py-2 px-4 font-light text-black dark:text-white">
                            {pembeliangs.order_id}
                          </td>
                          <td className="py-2 px-4 font-light text-black dark:text-white">
                            {pembeliangs.layanan}
                          </td>
                          <td className="py-2 px-4 font-light text-black dark:text-white">
                            {pembeliangs.user_id}
                          </td>
                          <td className="py-2 px-4 font-light text-black dark:text-white">
                            {pembeliangs.zone}
                          </td>
                          <td className="py-2 px-4 font-light text-black dark:text-white">
                            {pembeliangs.nickname}
                          </td>
                          <td className="py-2 px-4 font-light text-black dark:text-white">
                            <BtnStatus
                              orderId={pembeliangs.order_id}
                              status={pembeliangs.status}
                              isLast={isLast}
                              isSecondLast={isSecondLast}
                            />
                          </td>
                          <td className="py-2 px-4 font-light text-black dark:text-white whitespace-nowrap">
                            <BtnAksi
                              id={pembeliangs.id}
                              getData={getPembelianGiftSkin}
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
          onClick={() => handlePageChangeGiftSkin(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-1 bg-gray-300 text-black rounded disabled:brightness-75 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChangeGiftSkin(index + 1)}
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
          onClick={() => handlePageChangeGiftSkin(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 mx-1 bg-purple-500 text-white rounded disabled:brightness-75 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PesananGiftSkin;
