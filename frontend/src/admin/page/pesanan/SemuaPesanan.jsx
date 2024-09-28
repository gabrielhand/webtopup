import { useEffect, useState } from "react";
import BreadCrumbs from "../../components/breadcrumbs/BreadCrumbs";
import axios from "axios";
import BtnStatus from "../../components/button/BtnStatus";
import ImgNotFound from "../../../assets/not-found.png";

const SemuaPesanan = () => {
  const [isLoading, setLoading] = useState(false);
  const [pembelians, setPembelian] = useState([]);
  const [orderId, setOrderId] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(10);

  const getPembelian = async (page = 1, orderId = "") => {
    setLoading(true);
    try {
      let url = `http://localhost:5000/pembelianforsemuapesananadmin?page=${page}&limit=${limit}`;

      if (orderId) {
        url += `&order_id=${orderId}`;
      }

      const response = await axios.get(url);
      setPembelian(response.data.pembelian);
      setTotalPages(response.data.totalPages);
      setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPembelian();
  }, []);

  useEffect(() => {
    if (!orderId.trim()) {
      getPembelian(currentPage);
    }
  }, [orderId]);

  useEffect(() => {
    getPembelian(currentPage, orderId);
  }, [currentPage]);

  const handleSearch = () => {
    getPembelian(1, orderId);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  return (
    <div className="flex flex-col gap-y-4 w-full">
      <BreadCrumbs />
      <div className="flex flex-row text-2xl text-black dark:text-white font-semibold">
        Daftar Semua Pesanan
      </div>
      <div className="flex flex-row items-center justify-between gap-x-3">
        <div className="flex flex-row gap-x-3">
          <input
            type="text"
            name="orderId"
            id="OrderIdAdminInput"
            placeholder="Order Id..."
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            className="text-black dark:text-white font-medium cursor-pointer bg-white dark:bg-[#2d2d2e] rounded-lg px-4 py-2 focus:outline-none border border-zinc-300 dark:border-zinc-600 shadow-md"
          />
          <button
            onClick={handleSearch}
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
        <div className="flex flex-row bg-white dark:bg-[#2d2d2e] shadow-md px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-600">
          <div className="flex flex-row gap-x-1">
            <p className="text-red-400 -mt-0.5">*</p>
            <div className="text-black dark:text-zinc-200 text-sm">
              PID : Provider Order Id
            </div>
          </div>
        </div>
      </div>
      <div className="shadow-md border border-zinc-300 dark:border-[#4169e1]/30 rounded-xl flex flex-row w-full overflow-y-hidden pb-2 overflow-x-auto min-h-72">
        <table className="bg-transparent w-full text-start">
          <thead className="bg-purple-500 dark:bg-[#2d2d2e]">
            <tr className="text-white border-b dark:border-zinc-600">
              <th className="py-2 text-start px-4 font-medium whitespace-nowrap">Order Id</th>
              <th className="py-2 text-start px-4 font-medium whitespace-nowrap">User Id</th>
              <th className="py-2 text-start px-4 font-medium">Nickname</th>
              <th className="py-2 text-start px-4 font-medium">Layanan</th>
              <th className="py-2 text-start px-4 font-medium">Harga</th>
              <th className="py-2 text-start px-4 font-medium">PID</th>
              <th className="py-2 text-start px-4 font-medium">Status</th>
              <th className="py-2 text-start px-4 font-medium">Log</th>
              <th className="py-2 text-start px-4 font-medium">Pembayaran</th>
              <th className="py-2 text-start px-4 font-medium">Metode</th>
              <th className="py-2 text-start px-4 font-medium">Tanggal</th>
              <th className="py-2 text-start px-4 font-medium">Username</th>
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
                {pembelians.length === 0 ? (
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
                            Oops, pembelian tidak ditemukan!
                          </p>
                        </div>
                      </div>
                    </td>
                  </tr>
                ) : (
                  <>
                    {pembelians.map((pembelian, index) => {
                      const isLast = index === pembelians.length - 1;
                      const isSecondLast = index === pembelians.length - 2;
                      return (
                        <tr
                          key={index}
                          className="bg-white dark:bg-[#16171a] border-b border-zinc-300 dark:border-zinc-600"
                        >
                          <td className="py-2 px-4 font-light text-black dark:text-white">
                            {pembelian.order_id}
                          </td>
                          <td className="py-2 px-4 font-light text-black dark:text-white">
                            {pembelian.user_id}{" "}
                            {pembelian.zone ? `(${pembelian.zone})` : null}
                          </td>
                          <td className="py-2 px-4 font-light text-black dark:text-white">
                            {pembelian.nickname ? pembelian.nickname : "-"}
                          </td>
                          <td className="py-2 px-4 font-light text-black dark:text-white min-w-72 max-w-72">
                            {pembelian.layanan}
                          </td>
                          <td className="py-2 px-4 font-light text-black dark:text-white whitespace-nowrap">
                            Rp{" "}
                            {pembelian.harga.toLocaleString("id-ID", {
                              styles: "currency",
                              currency: "IDR",
                            })}
                          </td>
                          <td className="py-2 px-4 font-light text-black dark:text-white">
                            {pembelian.provider_order_id}
                          </td>
                          <td className="py-2 px-4 font-light text-black dark:text-white">
                            <BtnStatus
                              orderId={pembelian.order_id}
                              status={pembelian.status}
                              isLast={isLast}
                              isSecondLast={isSecondLast}
                            />
                          </td>
                          <td className="py-2 px-4 font-light text-black dark:text-white min-w-72 max-w-72">
                            {pembelian.log}
                          </td>
                          <td className="py-2 px-4 font-light text-black dark:text-white">
                            {pembelian.pembayaran.status}
                          </td>
                          <td className="py-2 px-4 font-light text-black dark:text-white">
                            {pembelian.pembayaran.metode}
                          </td>
                          <td className="py-2 px-4 font-light text-black dark:text-white whitespace-nowrap">
                            {pembelian.created_at
                              .slice(0, 19)
                              .replace("T", " ")}
                          </td>
                          <td className="py-2 px-4 font-light text-black dark:text-white">
                            {pembelian.username}
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
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-1 bg-gray-300 text-black rounded disabled:brightness-75 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
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
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 mx-1 bg-purple-500 text-white rounded disabled:brightness-75 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SemuaPesanan;
