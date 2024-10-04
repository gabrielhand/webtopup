import axios from "axios";
import PropTypes from "prop-types";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const BtnStatus = ({ orderId, Id, status, isLast, isSecondLast }) => {
  const location = useLocation();
  const [isMenuStatusOpen, setMenuStatusOpen] = useState(false);
  const [statusEdit, setStatusEdit] = useState(status);

  const toggleStatus = () => {
    setMenuStatusOpen(!isMenuStatusOpen);
  };

  const updateStatusPembelian = async (newStatus) => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/pembelian/edit/status/${orderId}`,
        { status: newStatus }
      );

      setStatusEdit(newStatus);
      setMenuStatusOpen(false);
      console.log(response.data.msg);
    } catch (error) {
      console.log(error.message);
    }
  };

  const updateStatusJoki = async (newStatus) => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/datajoki/edit/status/${orderId}`,
        { status: newStatus }
      );

      setStatusEdit(newStatus);
      setMenuStatusOpen(false);
      console.log(response.data.msg);
    } catch (error) {
      console.log(error.message);
    }
  };

  const updateStatusPembelianGiftSkin = async (newStatus) => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/pembelian/giftskin/edit/status/${orderId}`,
        { status: newStatus }
      );

      setStatusEdit(newStatus);
      setMenuStatusOpen(false);
      console.log(response.data.msg);
    } catch (error) {
      console.log(error.message);
    }
  };

  const updateStatusPembelianDmVilog = async (newStatus) => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/pembelian/dmvilog/edit/status/${orderId}`,
        { status: newStatus }
      );

      setStatusEdit(newStatus);
      setMenuStatusOpen(false);
      console.log(response.data.msg);
    } catch (error) {
      console.log(error.message);
    }
  };

  const updateStatusKategori = async (newStatus) => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/kategoriforadmin/status/update/${Id}`,
        { status: newStatus }
      );

      setStatusEdit(newStatus);
      setMenuStatusOpen(false);
      console.log(response.data.msg);
    } catch (error) {
      console.log(error.message);
    }
  };

  const updateStatusLayanan = async (newStatus) => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/layananforadmin/status/update/${Id}`,
        { status: newStatus }
      );

      setStatusEdit(newStatus);
      setMenuStatusOpen(false);
      console.log(response.data.msg);
    } catch (error) {
      console.log(error.message);
    }
  };

  const bgColor =
    statusEdit === "Success" ||
    statusEdit === "available" ||
    statusEdit === "Sukses" ||
    statusEdit === "active"
      ? "bg-green-500"
      : statusEdit === "Batal" ||
        statusEdit === "unactive" ||
        statusEdit === "unavailable"
      ? "bg-red-500"
      : "bg-yellow-500";

  const isPesananJoki = location.pathname === "/pesanan/joki";
  const isPesananGiftSkin = location.pathname === "/pesanan/gift-skin";
  const isPesananDmVilog = location.pathname === "/pesanan/dmvilog";
  const isProdukKategori = location.pathname === "/produk/kategori";
  const isProdukSubKategori = location.pathname === "/produk/subkategori";
  const isProdukLayanan = location.pathname === "/produk/layanan";
  const isProdukVoucher = location.pathname === "/produk/voucher";

  return (
    <div className="relative flex flex-col">
      <div
        onClick={toggleStatus}
        className={`flex flex-row items-center gap-x-3 justify-between flex-nowrap ${bgColor} hover:brightness-90 rounded-lg px-3 py-2 ${
          isMenuStatusOpen
            ? "outline outline-black dark:outline-white"
            : "outline-none"
        } duration-300 text-center text-white cursor-pointer text-sm`}
      >
        {statusEdit}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          fill="currentColor"
          className={`bi bi-caret-down-fill ${
            isProdukKategori
              ? isLast
                ? "block"
                : "hidden"
              : isProdukSubKategori
              ? "hidden"
              : isLast || isSecondLast
              ? "block"
              : "hidden"
          } transform transition-transform duration-300 ${
            (isLast || isSecondLast) && isMenuStatusOpen
              ? "rotate-0"
              : "rotate-180"
          }`}
          viewBox="0 0 16 16"
        >
          <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          fill="currentColor"
          className={`bi bi-caret-down-fill ${
            isProdukKategori
              ? isLast
                ? "hidden"
                : "block"
              : isLast || isSecondLast
              ? "hidden"
              : isProdukSubKategori
              ? "hidden"
              : "block"
          } transform transition-transform duration-300 ${
            isMenuStatusOpen ? "rotate-180" : "rotate-0"
          }`}
          viewBox="0 0 16 16"
        >
          <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
        </svg>
      </div>
      <div
        className={`absolute ${
          isProdukKategori
            ? isLast
              ? "bottom-10"
              : "top-10"
            : isLast || isSecondLast
            ? "bottom-10"
            : "top-10"
        } flex flex-col min-w-36 bg-white dark:bg-zinc-900 border border-zinc-300 rounded-lg p-2 ${
          isMenuStatusOpen ? "opacity-100 z-50" : "opacity-0 -z-50"
        } gap-y-1 shadow-md`}
      >
        {(isPesananJoki
          ? ["Sukses", "Proses"]
          : isProdukKategori
          ? ["active", "unactive"]
          : isProdukLayanan
          ? ["available", "unavailable"]
          : ["Success", "Batal", "Pending"]
        ).map((option) => (
          <div
            key={option}
            onClick={() =>
              isPesananJoki
                ? updateStatusJoki(option)
                : isPesananGiftSkin
                ? updateStatusPembelianGiftSkin(option)
                : isPesananDmVilog
                ? updateStatusPembelianDmVilog(option)
                : isProdukKategori
                ? updateStatusKategori(option)
                : isProdukLayanan
                ? updateStatusLayanan(option)
                : updateStatusPembelian(option)
            }
            className="flex flex-row items-center px-3 py-2 justify-between gap-x-2 bg-transparent hover:bg-zinc-200 dark:hover:bg-zinc-700 hover:duration-300 rounded-lg cursor-pointer"
          >
            {option}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className={`bi bi-check-lg ${
                statusEdit === option
                  ? "block text-purple-500 group-hover:text-white group-hover:duration-150"
                  : "hidden"
              }`}
              viewBox="0 0 16 16"
            >
              <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z" />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
};

BtnStatus.propTypes = {
  orderId: PropTypes.string,
  Id: PropTypes.number,
  status: PropTypes.string.isRequired,
  isLast: PropTypes.bool.isRequired,
  isSecondLast: PropTypes.bool.isRequired,
};

export default BtnStatus;
