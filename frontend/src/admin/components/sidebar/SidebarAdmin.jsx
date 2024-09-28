import PropTypes from "prop-types";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const SidebarAdmin = ({ logoHeader, isDarkMode, toggleDarkMode }) => {
  const location = useLocation();
  const [isPesananOpen, setPesananOpen] = useState(false);
  const [isMemberOpen, setMemberOpen] = useState(false);
  const [isProdukOpen, setProdukOpen] = useState(false);

  const togglePesanan = () => {
    setPesananOpen(!isPesananOpen);
  };

  const toggleMember = () => {
    setMemberOpen(!isMemberOpen);
  };

  const toggleProduk = () => {
    setProdukOpen(!isProdukOpen);
  };

  return (
    <div className="fixed min-w-72 bg-white dark:bg-[#1e1e2d] hidden lg:flex md:flex flex-col gap-y-1 px-8 py-6 h-screen overflow-y-auto shadow-md">
      <div className="flex flex-row gap-5 items-center">
        <Link to="/">
          <img src={logoHeader} alt="" className="max-w-20" />
        </Link>
        <label className="flex cursor-pointer text-black dark:text-white gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
          </svg>
          <input
            type="checkbox"
            value="dark"
            onChange={toggleDarkMode}
            checked={isDarkMode}
            className="toggle hover:bg-white hover:checked:bg-white bg-white [--tglbg:theme(colors.gray.200)] checked:bg-white checked:[--tglbg:theme(colors.purple.600)]"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        </label>
      </div>
      <div className="flex flex-row my-2 text-black dark:text-zinc-300 mt-12 text-sm">
        Menu
      </div>
      <div className="flex flex-col gap-y-3">
        <Link
          to="/dashboard"
          className={`flex flex-row items-center gap-3 px-4 py-2.5 rounded-lg ${
            location.pathname === "/dashboard"
              ? "bg-purple-500 text-white"
              : "text-black dark:text-white border border-purple-500"
          } cursor-pointer`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth={0.5}
            className="bi bi-grid-1x2"
            viewBox="0 0 16 16"
          >
            <path d="M6 1H1v14h5zm9 0h-5v5h5zm0 9v5h-5v-5zM0 1a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm9 0a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1zm1 8a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1z" />
          </svg>
          Dashboard
        </Link>
        <div className="flex flex-col">
          <div
            onClick={togglePesanan}
            className={`flex flex-row items-center gap-3 px-4 py-2.5 rounded-lg ${
              location.pathname === "/pesanan/semua" ||
              location.pathname === "/pesanan/joki" ||
              location.pathname === "/pesanan/gift-skin" ||
              location.pathname === "/pesanan/dmvilog"
                ? "bg-purple-500 text-white"
                : "text-black dark:text-white border border-purple-500"
            } cursor-pointer`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="currentColor"
              className="bi bi-basket"
              stroke="currentColor"
              strokeWidth={0.5}
              viewBox="0 0 16 16"
            >
              <path d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1v4.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 13.5V9a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h1.217L5.07 1.243a.5.5 0 0 1 .686-.172zM2 9v4.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V9zM1 7v1h14V7zm3 3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 4 10m2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 6 10m2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 8 10m2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5m2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5" />
            </svg>
            Pesanan
            <div className="flex flex-row grow justify-end">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className={`bi bi-chevron-down transition-all duration-700 ${
                  isPesananOpen ? "rotate-180" : "rotate-0"
                }`}
                stroke="currentColor"
                strokeWidth={1}
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
                />
              </svg>
            </div>
          </div>
          <div
            className={`flex flex-col gap-y-3 ml-10 ms-10 overflow-hidden transition-all duration-700 ${
              isPesananOpen
                ? "max-h-60 opacity-100 py-6"
                : "max-h-0 opacity-0 py-0"
            }`}
          >
            <Link
              to="/pesanan/semua"
              className={`flex flex-row text-sm ${
                location.pathname === "/pesanan/semua"
                  ? "text-purple-500"
                  : "text-black hover:text-purple-500 dark:text-white dark:hover:text-purple-500"
              } duration-500 hover:translate-x-3`}
            >
              Semua Pesanan
            </Link>
            <Link
              to="/pesanan/joki"
              className={`flex flex-row text-sm ${
                location.pathname === "/pesanan/joki"
                  ? "text-purple-500"
                  : "text-black hover:text-purple-500 dark:text-white dark:hover:text-purple-500"
              } duration-500 hover:translate-x-3`}
            >
              Pesanan Joki
            </Link>
            <Link
              to="/pesanan/gift-skin"
              className={`flex flex-row text-sm ${
                location.pathname === "/pesanan/gift-skin"
                  ? "text-purple-500"
                  : "text-black hover:text-purple-500 dark:text-white dark:hover:text-purple-500"
              } duration-500 hover:translate-x-3`}
            >
              Pesanan Gift Skin
            </Link>
            <Link
              to="/pesanan/dmvilog"
              className={`flex flex-row text-sm ${
                location.pathname === "/pesanan/dmvilog"
                  ? "text-purple-500"
                  : "text-black hover:text-purple-500 dark:text-white dark:hover:text-purple-500"
              } duration-500 hover:translate-x-3`}
            >
              Pesanan Vilog
            </Link>
          </div>
        </div>
        <div className="flex flex-col">
          <div
            onClick={toggleMember}
            className={`flex flex-row items-center gap-3 px-4 py-2.5 rounded-lg ${
              location.pathname === "/member/kelola" ||
              location.pathname === "/member/deposit"
                ? "bg-purple-500 text-white"
                : "text-black dark:text-white border border-purple-500"
            } cursor-pointer`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="currentColor"
              className="bi bi-person-badge"
              stroke="currentColor"
              strokeWidth={0.5}
              viewBox="0 0 16 16"
            >
              <path d="M6.5 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
              <path d="M4.5 0A2.5 2.5 0 0 0 2 2.5V14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2.5A2.5 2.5 0 0 0 11.5 0zM3 2.5A1.5 1.5 0 0 1 4.5 1h7A1.5 1.5 0 0 1 13 2.5v10.795a4.2 4.2 0 0 0-.776-.492C11.392 12.387 10.063 12 8 12s-3.392.387-4.224.803a4.2 4.2 0 0 0-.776.492z" />
            </svg>
            Member
            <div className="flex flex-row grow justify-end">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className={`bi bi-chevron-down transition-all duration-700 ${
                  isMemberOpen ? "rotate-180" : "rotate-0"
                }`}
                stroke="currentColor"
                strokeWidth={1}
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
                />
              </svg>
            </div>
          </div>
          <div
            className={`flex flex-col gap-y-3 ml-10 ms-10 overflow-hidden transition-all duration-700 ${
              isMemberOpen
                ? "max-h-40 opacity-100 py-6"
                : "max-h-0 opacity-0 py-0"
            }`}
          >
            <Link
              to="/member/kelola"
              className={`flex flex-row text-sm ${
                location.pathname === "/member/kelola"
                  ? "text-purple-500"
                  : "text-black hover:text-purple-500 dark:text-white dark:hover:text-purple-500"
              } duration-500 hover:translate-x-3`}
            >
              Kelola Member
            </Link>
            <Link
              to="/member/deposit"
              className={`flex flex-row text-sm ${
                location.pathname === "/member/deposit"
                  ? "text-purple-500"
                  : "text-black hover:text-purple-500 dark:text-white dark:hover:text-purple-500"
              } duration-500 hover:translate-x-3`}
            >
              Member Deposit
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-row my-2 text-black dark:text-zinc-300 mt-12 text-sm">
        Product
      </div>
      <div className="flex flex-col gap-y-3">
        <div className="flex flex-col">
          <div
            onClick={toggleProduk}
            className={`flex flex-row items-center gap-3 px-4 py-2.5 rounded-lg ${
              location.pathname === "/produk/kategori" ||
              location.pathname === "/produk/subkategori" || location.pathname === "/produk/tipe" || location.pathname === "/produk/layanan" || location.pathname === "/produk/voucher"
                ? "bg-purple-500 text-white"
                : "text-black dark:text-white border border-purple-500"
            } cursor-pointer`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="currentColor"
              className="bi bi-person-badge"
              stroke="currentColor"
              strokeWidth={0.5}
              viewBox="0 0 16 16"
            >
              <path d="M6.5 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
              <path d="M4.5 0A2.5 2.5 0 0 0 2 2.5V14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2.5A2.5 2.5 0 0 0 11.5 0zM3 2.5A1.5 1.5 0 0 1 4.5 1h7A1.5 1.5 0 0 1 13 2.5v10.795a4.2 4.2 0 0 0-.776-.492C11.392 12.387 10.063 12 8 12s-3.392.387-4.224.803a4.2 4.2 0 0 0-.776.492z" />
            </svg>
            Produk
            <div className="flex flex-row grow justify-end">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className={`bi bi-chevron-down transition-all duration-700 ${
                  isProdukOpen ? "rotate-180" : "rotate-0"
                }`}
                stroke="currentColor"
                strokeWidth={1}
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
                />
              </svg>
            </div>
          </div>
          <div
            className={`flex flex-col gap-y-3 ml-10 ms-10 overflow-hidden transition-all duration-700 ${
              isProdukOpen
                ? "max-h-48 opacity-100 py-6"
                : "max-h-0 opacity-0 py-0"
            }`}
          >
            <Link
              to="/produk/kategori"
              className={`flex flex-row text-sm ${
                location.pathname === "/produk/kategori"
                  ? "text-purple-500"
                  : "text-black hover:text-purple-500 dark:text-white dark:hover:text-purple-500"
              } duration-500 hover:translate-x-3`}
            >
              Kategori
            </Link>
            <Link
              to="/produk/subkategori"
              className={`flex flex-row text-sm ${
                location.pathname === "/produk/subkategori"
                  ? "text-purple-500"
                  : "text-black hover:text-purple-500 dark:text-white dark:hover:text-purple-500"
              } duration-500 hover:translate-x-3`}
            >
              Sub Kategori
            </Link>
            <Link
              to="/produk/tipe"
              className={`flex flex-row text-sm ${
                location.pathname === "/produk/tipe"
                  ? "text-purple-500"
                  : "text-black hover:text-purple-500 dark:text-white dark:hover:text-purple-500"
              } duration-500 hover:translate-x-3`}
            >
              Tipe
            </Link>
            <Link
              to="/produk/layanan"
              className={`flex flex-row text-sm ${
                location.pathname === "/produk/layanan"
                  ? "text-purple-500"
                  : "text-black hover:text-purple-500 dark:text-white dark:hover:text-purple-500"
              } duration-500 hover:translate-x-3`}
            >
              Layanan
            </Link>
            <Link
              to="/produk/voucher"
              className={`flex flex-row text-sm ${
                location.pathname === "/produk/voucher"
                  ? "text-purple-500"
                  : "text-black hover:text-purple-500 dark:text-white dark:hover:text-purple-500"
              } duration-500 hover:translate-x-3`}
            >
              Voucher
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

SidebarAdmin.propTypes = {
  logoHeader: PropTypes.string,
  toggleDarkMode: PropTypes.func.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
};

export default SidebarAdmin;
