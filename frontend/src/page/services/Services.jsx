import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import AllServices from "../../components/allservices/AllServices";
import axios from "axios";
import LoaderBanner from "../../components/loader/LoaderBanner";

const Services = () => {
  const { bannerServices } = useOutletContext();
  const [animate, setAnimate] = useState(false);
  const [kategoris, setKategori] = useState([]);
  const [searchLayanan, setSearchLayanan] = useState("");
  const [selectedKategori, setSelectedKategori] = useState("Pilih Kategori");
  const [isMenuKatOpen, setIsMenuKatOpen] = useState(false);

  const getKategori = async () => {
    const response = await axios.get("http://localhost:5000/kategori");

    setKategori(response.data);
  };

  const toggleMenu = () => {
    setIsMenuKatOpen(!isMenuKatOpen);
  };

  useEffect(() => {
    setAnimate(true);
  }, []);

  useEffect(() => {
    getKategori();
  }, []);
  return (
    <div className="flex flex-col lg:gap-y-6 md:gap-y-6 gap-y-4 lg:px-16 md:px-10 px-4 py-6">
      <div className="relative rounded-xl w-full min-h-72 overflow-hidden">
        {bannerServices ? (
          <>
            <img
              id="bannerServices"
              src={bannerServices}
              alt="Banner-Services"
              loading="lazy"
              className="absolute object-cover object-top inset-0 w-full h-full"
            />
            <div className="absolute bg-black/30 inset-0"></div>
            <div
              className={`absolute bg-black/60 flex flex-col gap-y-1 w-full text-white p-6 bottom-0 transform transition-transform duration-700 ease-in-out ${
                animate ? "translate-y-0" : "translate-y-full"
              }`}
            >
              <p className="lg:text-3xl md:text-2xl text-xl font-medium">
                Daftar Layanan
              </p>
              <p className="lg:text-base md:text-sm text-xs font-light">
                Semua daftar layanan yang ada di website kami!
              </p>
              <div className="flex flex-row w-full justify-between gap-x-3 mt-1">
                <div className="flex flex-row flex-1 w-full">
                  <div className="bg-white dark:bg-[#232324] rounded-xl border border-zinc-700 cursor-pointer text-black dark:text-white font-light lg:text-sm md:text-sm text-xs px-3 p-1.5 lg:max-w-xs md:max-w-xs lg:w-full md:w-full flex-1">
                    <input
                      type="search"
                      value={searchLayanan}
                      onChange={(e) => setSearchLayanan(e.target.value)}
                      className="bg-transparent outline-none lg:h-7 md:h-7 h-5 w-full placeholder:text-gray-600 dark:placeholder:text-gray-400"
                      placeholder="Layanan..."
                    />
                  </div>
                </div>
                <div
                  onClick={toggleMenu}
                  className="flex flex-row items-center justify-between lg:text-base md:text-base text-sm px-3 p-1.5 lg:max-w-xs md:max-w-xs lg:w-full md:w-full w-44 rounded-xl cursor-pointer hover:outline hover:outline-2 hover:outline-offset-2 hover:outline-[#4169e1] hover:duration-100 border border-zinc-700 bg-white dark:bg-[#232324] text-black dark:text-white"
                >
                  <p>{selectedKategori}</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className={`bi bi-caret-down-fill transform transition-transform duration-300 ${
                      isMenuKatOpen ? "rotate-180" : "rotate-0"
                    }`}
                    viewBox="0 0 16 16"
                  >
                    <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </>
        ) : (
          <LoaderBanner />
        )}
      </div>
      <div className="relative flex flex-row w-full justify-between -my-2">
        <div className="text-black dark:text-gray-300 font-medium underline lg:text-base">
          Memperlihatkan seluruh layanan di website kami
        </div>
        <ul
          id="menu-pilih-kategori"
          className={`absolute z-10 lg:-top-8 md:-top-8 lg:right-6 md:right-6 -top-6 right-6 lg:max-w-xs md:max-w-xs lg:w-full md:w-full w-44 flex-1 bg-white dark:bg-[#232324] rounded-xl border border-zinc-700 shadow-lg transform transition-all duration-300 overflow-hidden ${
            isMenuKatOpen
              ? "max-h-64 opacity-100 overflow-y-auto"
              : "max-h-0 opacity-0"
          }`}
        >
          {kategoris.map((kategori) => (
            <li
              key={kategori.nama}
              onClick={() => {
                setSelectedKategori(kategori.nama);
                setIsMenuKatOpen(false);
              }}
              className={`flex flex-row w-full items-center justify-between lg:text-base md:text-base text-sm cursor-pointer text-black hover:bg-[#4169e1] group hover:duration-150 px-3 py-2 ${
                selectedKategori === kategori.nama
                  ? "font-semibold"
                  : "font-normal"
              }`}
            >
              <p className="group-hover:text-white text-black dark:text-white group-hover:duration-150">
                {kategori.nama}
              </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className={`bi bi-check-lg ${
                  selectedKategori === kategori.nama
                    ? "block text-[#4169e1] group-hover:text-white group-hover:duration-150"
                    : "hidden"
                }`}
                viewBox="0 0 16 16"
              >
                <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z" />
              </svg>
            </li>
          ))}
        </ul>
      </div>
      <AllServices
        searchLayanan={searchLayanan}
        selectedKategori={selectedKategori}
      />
    </div>
  );
};

export default Services;
