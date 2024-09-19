import ImgSemuaList from "../../assets/skills.png";
import ImgSuccess from "../../assets/list.png";
import ImgPending from "../../assets/clock.png";
import ImgError from "../../assets/error.png";
import ImgNotFound from "../../assets/not-found.png";
import axios from "axios";
import { useEffect, useState } from "react";
import BtnStatus from "../../components/button/BtnStatus";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const RiwayatPesanan = () => {
  const [riwayatPembelians, setRiwayatPembelian] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const [statusSuccess, setStatusSuccess] = useState(null);
  const [statusPending, setStatusPending] = useState(null);
  const [statusCancel, setStatusCancel] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(10);
  const [status] = useState("");
  const [orderId, setOrderId] = useState("");

  const getRiwayatPembelianUser = async (
    page = 1,
    orderId = "",
    status = ""
  ) => {
    setIsLoading(true);
    try {
      let url = `http://localhost:5000/users/pembelian/riwayat/${user.username}?page=${page}&limit=${limit}`;

      if (orderId) {
        url += `&order_id=${orderId}`;
      }

      if (status) {
        url += `&status=${status}`;
      }
      const response = await axios.get(url);
      setRiwayatPembelian(response.data.pembelian);
      setTotalPages(response.data.totalPage);
      setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusPembelianUser = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/users/pembelian/status/${user.username}`
      );

      setStatusSuccess(response.data.banyakPembelianSuccess);
      setStatusPending(response.data.banyakPembelianPending);
      setStatusCancel(response.data.banyakPembelianBatal);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getRiwayatPembelianUser(currentPage, orderId, status);
  }, [currentPage, status]);

  useEffect(() => {
    if (!orderId.trim()) {
      getRiwayatPembelianUser(currentPage);
    }
  }, [orderId]);

  useEffect(() => {
    getStatusPembelianUser();
  }, []);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleFilterByStatus = (status) => {
    getRiwayatPembelianUser(1, orderId, status);
  };

  const handleSearch = () => {
    getRiwayatPembelianUser(1, orderId);
  };

  return (
    <>
      <div className="flex flex-col gap-y-3">
        <div className="flex flex-row rounded-xl bg-[#4169e1] font-medium shadow-lg">
          <p className="px-5 py-3 text-white font-medium text-xl">
            Status & Histori Pesanan
          </p>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div
            onClick={() => handleFilterByStatus("")}
            className="flex flex-row items-center gap-2 bg-zinc-500 rounded-xl px-4 py-3 text-white font-medium cursor-pointer"
          >
            <img
              src={ImgSemuaList}
              alt="Icon-AllList.png"
              className="max-w-14"
            />
            <div className="flex flex-col">
              <p className="text-sm font-light">Semua</p>
              <p className="font-medium">
                {statusSuccess + statusPending + statusCancel}
              </p>
            </div>
          </div>
          <div
            onClick={() => handleFilterByStatus("Success")}
            className="flex flex-row items-center gap-2 bg-green-400 rounded-xl px-4 py-3 text-white font-medium cursor-pointer"
          >
            <img src={ImgSuccess} alt="Icon-Success.png" className="max-w-16" />
            <div className="flex flex-col">
              <p className="text-sm font-light">Success</p>
              <p className="font-medium">{statusSuccess}</p>
            </div>
          </div>
          <div
            onClick={() => handleFilterByStatus("Pending")}
            className="flex flex-row items-center gap-2 bg-yellow-400 rounded-xl px-4 py-3 text-white font-medium cursor-pointer"
          >
            <img src={ImgPending} alt="Icon-Pending.png" className="max-w-16" />
            <div className="flex flex-col">
              <p className="text-sm font-light">Pending</p>
              <p className="font-medium">{statusPending}</p>
            </div>
          </div>
          <div
            onClick={() => handleFilterByStatus("Cancel")}
            className="flex flex-row items-center gap-3 bg-red-400 rounded-xl px-4 py-3 text-white font-medium cursor-pointer"
          >
            <img src={ImgError} alt="Icon-Cancel.png" className="max-w-16" />
            <div className="flex flex-col">
              <p className="text-sm font-light">Cancel</p>
              <p className="font-medium">{statusCancel}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-y-3">
        <div className="flex flex-row items-end justify-between gap-x-3">
          <div className="flex flex-row text-black dark:text-zinc-200 text-base underline">
            Memperlihatkan 10 transaksi per page
          </div>
          <div className="flex flex-row gap-x-3">
            <input
              type="text"
              placeholder="Order id..."
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="rounded-lg px-4 py-2 focus:outline-none text-black dark:text-white bg-white dark:bg-[#2d2d2e] border border-[#4169e1] dark:border-white/30 cursor-pointer"
            />
            <button
              onClick={handleSearch}
              className="flex flex-row px-3 py-2 rounded-lg bg-[#4169e1] text-white"
            >
              Cari
            </button>
          </div>
        </div>
        <div className="shadow-md border border-zinc-300 dark:border-[#4169e1]/30 rounded-lg flex flex-row overflow-x-auto pb-2">
          <table className="bg-transparent w-full text-start table-auto">
            <thead className="bg-[#4169e1] dark:bg-[#2d2d2e]">
              <tr className="text-white border-b dark:border-zinc-600">
                <th className="py-2 text-start px-4 font-medium">Invoice</th>
                <th className="py-2 text-start px-4 font-medium">Kategori</th>
                <th className="py-2 text-start px-4 font-medium">Layanan</th>
                <th className="py-2 text-start px-4 font-medium">Harga</th>
                <th className="py-2 text-start px-4 font-medium">Tanggal</th>
                <th className="py-2 text-start px-4 font-medium">Status</th>
                <th className="py-2 text-start px-4 font-medium">Aksi</th>
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
                  {riwayatPembelians.length === 0 ? (
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
                              Oops, pembelian tidak ditemukan!
                            </p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    <>
                      {riwayatPembelians.map((pembelian, index) => (
                        <tr
                          key={index}
                          className="bg-white dark:bg-[#16171a] overflow-x-auto dark:hover:bg-[#222429] hover:duration-300 border-b border-zinc-300 dark:border-zinc-600"
                        >
                          <td className="py-2 px-4 font-light text-black dark:text-white">
                            {pembelian.order_id}
                          </td>
                          <td className="py-2 px-4 font-light text-black dark:text-white lg:whitespace-nowrap">
                            {pembelian.layananDetail
                              ? pembelian.layananDetail.kategori.nama
                              : pembelian.layananSubKat.kategori.nama}
                          </td>
                          <td className="py-2 px-4 font-light text-black dark:text-white lg:min-w-80">
                            {pembelian.layanan}
                          </td>
                          <td className="py-2 px-4 font-light text-black dark:text-white whitespace-nowrap">
                            Rp{" "}
                            {pembelian.harga.toLocaleString("id-ID", {
                              styles: "currency",
                              currency: "IDR",
                            })}
                          </td>
                          <td className="py-2 px-4 font-light text-black dark:text-white whitespace-nowrap">
                            {pembelian.created_at
                              .slice(0, 19)
                              .replace("T", " ")}
                          </td>
                          <td className="py-2 px-4 font-light text-black dark:text-white">
                            <BtnStatus status={pembelian.status} />
                          </td>
                          <td className="py-2 px-4 font-light text-black dark:text-white">
                            <Link to={`/`}>Detail</Link>
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
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-black"
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 mx-1 bg-blue-500 text-white rounded disabled:brightness-75 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default RiwayatPesanan;
