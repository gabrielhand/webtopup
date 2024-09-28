import { useEffect, useRef, useState } from "react";
import BreadCrumbs from "../../components/breadcrumbs/BreadCrumbs";
import axios from "axios";
import ImgNotFound from "../../../assets/not-found.png";
import BtnAksi from "../../components/button/BtnAksi";
import BtnStatus from "../../components/button/BtnStatus";

const Layanan = () => {
  const [isLoading, setLoading] = useState(false);
  const [layanans, setLayanans] = useState([]);
  const [idLayanan, setIdLayanan] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(5);
  const [layanan, setLayanan] = useState("");
  const [sublayanan, setSublayanan] = useState("");
  const [hargaMember, setHargaMember] = useState("");
  const [hargaGold, setHargaGold] = useState("");
  const [profitMember, setProfitMember] = useState("");
  const [profitGold, setProfitGold] = useState("");
  const [profitPlatinum, setProfitPlatinum] = useState("");
  const [modalAwal, setModalAwal] = useState("");
  const [providerId, setProviderId] = useState("");
  const [populer, setPopuler] = useState("");
  const [hargaPlatinum, setHargaPlatinum] = useState("");
  const [kategori, setKategori] = useState([]);
  const [selectedKategori, setSelectedKategori] = useState(null);
  const [isMenuKategoriOpen, setMenuKategoriOpen] = useState(false);
  const [subKats, setSubKat] = useState([]);
  const [selectedSubKat, setSelectedSubKat] = useState("");
  const [isMenuSubKatOpen, setMenuSubKatOpen] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState("");
  const [isMenuProviderOpen, setMenuProviderOpen] = useState(false);
  const [judulFlashSale, setJudulFlashSale] = useState("");
  const [hargaFlashSale, setHargaFlashSale] = useState("");
  const [expiredFlashSale, setExpiredFlashSale] = useState("");
  const [productLogo, setProductLogo] = useState(null);
  const [bannerLayanan, setBannerLayanan] = useState(null);
  const [petunjuk, setPetunjuk] = useState(null);

  const getKategori = async () => {
    const response = await axios.get(
      "http://localhost:5000/layananforadmin/kategori"
    );
    setKategori(response.data);
  };

  const getSubKat = async () => {
    const response = await axios.get(
      `http://localhost:5000/layananforadmin/subkategori?kategori_id=${selectedKategori.id}`
    );
    setSubKat(response.data);
  };

  const getLayanan = async (page = 1, id = "") => {
    setLoading(true);
    try {
      let url = `http://localhost:5000/layananforadmin?page=${page}&limit=${limit}`;

      if (id) {
        url += `&id=${id}`;
      }
      const response = await axios.get(url);
      setLayanans(response.data.layanan);
      setTotalPages(response.data.totalPages);
      setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };

  const addLayanan = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("layanan", layanan);
      formData.append("hargaMember", hargaMember);
      formData.append("hargaGold", hargaGold);
      formData.append("profit_member", profitMember);
      formData.append("profit_gold", profitGold);
      formData.append("profit_platinum", profitPlatinum);
      formData.append("modal_awal", modalAwal);
      formData.append("provider_id", providerId);
      formData.append("sub_idLayanan", sublayanan);
      formData.append("tipe_id", selectedKategori.id);
      formData.append("rate_member", judulFlashSale);
      formData.append("rate_gold", hargaFlashSale);
      formData.append("rate_platinum", expiredFlashSale);
      formData.append("populer", populer);
      formData.append("hargaPlatinum", hargaPlatinum);
      formData.append("productLogo", productLogo);
      formData.append("bannerlayanan", bannerLayanan);
      formData.append("petunjuk", petunjuk);
      const response = await axios.post(
        "http://localhost:5000/kategoriforadmin",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      getLayanan();
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getKategori();
    getLayanan();
  }, []);

  useEffect(() => {
    if (selectedKategori && selectedKategori.id) {
      setSelectedSubKat(null);
      getSubKat();
    }
  }, [selectedKategori]);

  useEffect(() => {
    if (!idLayanan.trim()) {
      getLayanan(currentPage);
    }
  }, [idLayanan]);

  useEffect(() => {
    getLayanan(currentPage, idLayanan);
  }, [currentPage]);

  const productLogoRef = useRef(null);
  const bannerLayananRef = useRef(null);
  const petunjukRef = useRef(null);

  const handleSearchKategori = () => {
    getLayanan(1, idLayanan);
  };

  const handlePageChangeKategori = (page) => {
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

  const handlesubKatselection = (selectedSubKat) => {
    setSelectedSubKat(selectedSubKat);
    setMenuSubKatOpen(false);
  };

  const toggleMenuSubKat = () => {
    setMenuSubKatOpen(!isMenuSubKatOpen);
  };

  const handleProviderSelection = (selectedProvider) => {
    setSelectedProvider(selectedProvider);
    setMenuProviderOpen(false);
  };

  const toggleMenuProvider = () => {
    setMenuProviderOpen(!isMenuProviderOpen);
  };

  const handleResetaddLayanan = () => {
    setLayanan("");
    setSublayanan("");
    setHargaMember("");
    setHargaGold("");
    setHargaPlatinum("");
    setProfitMember("");
    setProfitGold("");
    setProfitPlatinum("");
    setModalAwal("");
    setJudulFlashSale("");
    setHargaFlashSale("");
    setExpiredFlashSale("");
    setSelectedKategori(null);
    setSelectedProvider(null);
    setProviderId("");
    setPopuler("");
    setProductLogo(null);
    setBannerLayanan(null);
    setPetunjuk(null);

    if (productLogoRef.current) productLogoRef.current.value = null;
    if (bannerLayananRef.current) bannerLayananRef.current.value = null;
    if (petunjukRef.current) petunjukRef.current.value = null;
  };

  return (
    <div className="flex flex-col gap-y-4 w-full">
      <BreadCrumbs />
      <div className="flex flex-row lg:text-2xl text-black dark:text-white font-semibold">
        Tambah Layanan
      </div>
      <div className="bg-white dark:bg-[#2d2d2e] rounded-xl shadow-md p-5">
        <form onSubmit={addLayanan} className="flex flex-col gap-y-4">
          <div className="grid grid-cols-5 gap-y-4 gap-x-2">
            <label
              htmlFor="layanan"
              className="col-span-1 flex flex-row items-center text-black dark:text-white"
            >
              Layanan
            </label>
            <input
              id="layanan"
              type="text"
              placeholder="Layanan"
              value={layanan}
              onChange={(e) => setLayanan(e.target.value)}
              className="col-span-4 bg-white dark:bg-[#16171a] p-2.5 focus:outline-none focus:ring focus:duration-300 text-black dark:text-white ring-1 ring-zinc-200 dark:ring-zinc-600 rounded-lg"
            />
            <label
              htmlFor="tipe"
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
                <div className="absolute z-50 top-12 flex flex-col gap-y-2 bg-white dark:bg-[#16171a] p-2 rounded-lg w-full ring-1 ring-zinc-200 dark:ring-zinc-600">
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
              htmlFor="subKategori"
              className="col-span-1 flex flex-row items-center text-black dark:text-white"
            >
              Sub Kategori
            </label>
            <div className="relative col-span-4 flex flex-col">
              <div
                onClick={toggleMenuSubKat}
                className="flex flex-row items-center justify-between gap-3 text-black dark:text-white bg-white dark:bg-[#16171a] p-2.5 rounded-lg focus:outline focus:outline-offset-1 focus:outline-zinc-600 ring-1 ring-zinc-200 dark:ring-zinc-600 cursor-pointer"
              >
                {selectedSubKat ? selectedSubKat.name : "Pilih Sub Kategori"}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  fill="currentColor"
                  className={`bi bi-caret-down-fill transform transition-transform duration-100 ${
                    isMenuSubKatOpen ? "rotate-180" : "rotate-0"
                  }`}
                  viewBox="0 0 16 16"
                >
                  <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                </svg>
              </div>
              {isMenuSubKatOpen && (
                <div className="absolute z-10 top-12 flex flex-col gap-y-2 bg-white dark:bg-[#16171a] p-2 rounded-lg w-full ring-1 ring-zinc-200 dark:ring-zinc-600">
                  {subKats.length > 0 ? (
                    subKats.map((subKatOption) => (
                      <div
                        key={subKatOption.id}
                        onClick={() => handlesubKatselection(subKatOption)}
                        className="flex flex-row px-4 py-2 text-black dark:text-white cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-700 hover:duration-300 rounded-lg z-50"
                      >
                        {subKatOption.name}
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-row px-4 py-2 text-black dark:text-white">
                      Silahkan pilih kategori lebih dulu!
                    </div>
                  )}
                </div>
              )}
            </div>
            <label
              htmlFor="provider"
              className="col-span-1 flex flex-row items-center text-black dark:text-white"
            >
              Provider
            </label>
            <div className="relative col-span-4 flex flex-col">
              <div
                onClick={toggleMenuProvider}
                className="flex flex-row items-center justify-between gap-3 text-black dark:text-white bg-white dark:bg-[#16171a] p-2.5 rounded-lg focus:outline focus:outline-offset-1 focus:outline-zinc-600 ring-1 ring-zinc-200 dark:ring-zinc-600 cursor-pointer"
              >
                {selectedProvider ? selectedProvider : "Pilih Provider"}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  fill="currentColor"
                  className={`bi bi-caret-down-fill transform transition-transform duration-100 ${
                    isMenuProviderOpen ? "rotate-180" : "rotate-0"
                  }`}
                  viewBox="0 0 16 16"
                >
                  <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                </svg>
              </div>
              {isMenuProviderOpen && (
                <div className="absolute z-10 top-12 flex flex-col gap-y-2 bg-white dark:bg-[#16171a] p-2 rounded-lg w-full ring-1 ring-zinc-200 dark:ring-zinc-600">
                  {[
                    "Digiflazz",
                    "Vip Reseller",
                    "API Games",
                    "MooGold",
                    "Mobapay",
                    "Gamepointclub",
                    "Bxystore",
                    "EvilBee",
                    "Mengtopup",
                    "Alpharamz",
                    "Joki",
                    "Gift Skin",
                    "DM_Vilog",
                    "Manual",
                  ].map((providerOption) => (
                    <div
                      key={providerOption}
                      onClick={() => handleProviderSelection(providerOption)}
                      className="flex flex-row px-4 py-2 text-black dark:text-white cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-700 hover:duration-300 rounded-lg z-50"
                    >
                      {providerOption}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <label
              htmlFor="hargaMember"
              className="col-span-1 flex flex-row items-center text-black dark:text-white"
            >
              Harga Member
            </label>
            <input
              id="hargaMember"
              type="text"
              placeholder="Harga Member"
              value={hargaMember}
              onChange={(e) => setHargaMember(e.target.value)}
              className="col-span-4 bg-white dark:bg-[#16171a] p-2.5 focus:outline-none focus:ring focus:duration-300 text-black dark:text-white ring-1 ring-zinc-200 dark:ring-zinc-600 rounded-lg"
            />
            <label
              htmlFor="hargaGold"
              className="col-span-1 flex flex-row items-center text-black dark:text-white"
            >
              Harga Gold
            </label>
            <input
              id="hargaGold"
              type="text"
              placeholder="Harga Gold"
              value={hargaGold}
              onChange={(e) => setHargaGold(e.target.value)}
              className="col-span-4 bg-white dark:bg-[#16171a] p-2.5 focus:outline-none focus:ring focus:duration-300 text-black dark:text-white ring-1 ring-zinc-200 dark:ring-zinc-600 rounded-lg"
            />
            <label
              htmlFor="hargaPlatinum"
              className="col-span-1 flex flex-row items-center text-black dark:text-white"
            >
              Harga Platinum
            </label>
            <input
              id="hargaPlatinum"
              type="text"
              placeholder="Harga Platinum"
              value={hargaPlatinum}
              onChange={(e) => setHargaPlatinum(e.target.value)}
              className="col-span-4 bg-white dark:bg-[#16171a] p-2.5 focus:outline-none focus:ring focus:duration-300 text-black dark:text-white ring-1 ring-zinc-200 dark:ring-zinc-600 rounded-lg"
            />
            <label
              htmlFor="profitMember"
              className="col-span-1 flex flex-row items-center text-black dark:text-white"
            >
              Profit Member
            </label>
            <input
              id="profitMember"
              type="text"
              placeholder="Profit Member"
              value={profitMember}
              onChange={(e) => setProfitMember(e.target.value)}
              className="col-span-4 bg-white dark:bg-[#16171a] p-2.5 focus:outline-none focus:ring focus:duration-300 text-black dark:text-white ring-1 ring-zinc-200 dark:ring-zinc-600 rounded-lg"
            />
            <label
              htmlFor="profitGold"
              className="col-span-1 flex flex-row items-center text-black dark:text-white"
            >
              Profit Gold
            </label>
            <input
              id="profitGold"
              type="text"
              placeholder="Profit Gold"
              value={profitGold}
              onChange={(e) => setProfitGold(e.target.value)}
              className="col-span-4 bg-white dark:bg-[#16171a] p-2.5 focus:outline-none focus:ring focus:duration-300 text-black dark:text-white ring-1 ring-zinc-200 dark:ring-zinc-600 rounded-lg"
            />
            <label
              htmlFor="profitPlatinum"
              className="col-span-1 flex flex-row items-center text-black dark:text-white"
            >
              Profit Platinum
            </label>
            <input
              id="profitPlatinum"
              type="text"
              placeholder="Profit Platinum"
              value={profitPlatinum}
              onChange={(e) => setProfitPlatinum(e.target.value)}
              className="col-span-4 bg-white dark:bg-[#16171a] p-2.5 focus:outline-none focus:ring focus:duration-300 text-black dark:text-white ring-1 ring-zinc-200 dark:ring-zinc-600 rounded-lg"
            />
            <label
              htmlFor="modalAwal"
              className="col-span-1 flex flex-row items-center text-black dark:text-white"
            >
              Modal Awal
            </label>
            <input
              id="modalAwal"
              type="text"
              placeholder="Modal Awal"
              value={modalAwal}
              onChange={(e) => setModalAwal(e.target.value)}
              className="col-span-4 bg-white dark:bg-[#16171a] p-2.5 focus:outline-none focus:ring focus:duration-300 text-black dark:text-white ring-1 ring-zinc-200 dark:ring-zinc-600 rounded-lg"
            />
            <label
              htmlFor="providerId"
              className="col-span-1 flex flex-row items-center text-black dark:text-white"
            >
              Provider ID
            </label>
            <input
              id="providerId"
              type="text"
              placeholder="Modal Awal"
              value={providerId}
              onChange={(e) => setProviderId(e.target.value)}
              className="col-span-4 bg-white dark:bg-[#16171a] p-2.5 focus:outline-none focus:ring focus:duration-300 text-black dark:text-white ring-1 ring-zinc-200 dark:ring-zinc-600 rounded-lg"
            />
            <label
              htmlFor="judulFlashSale"
              className="col-span-1 flex flex-row items-center text-black dark:text-white"
            >
              Judul Flash Sale
            </label>
            <input
              id="judulFlashSale"
              type="text"
              placeholder="Judul Flash Sale"
              value={judulFlashSale}
              onChange={(e) => setJudulFlashSale(e.target.value)}
              className="col-span-4 bg-white dark:bg-[#16171a] p-2.5 focus:outline-none focus:ring focus:duration-300 text-black dark:text-white ring-1 ring-zinc-200 dark:ring-zinc-600 rounded-lg"
            />
            <label
              htmlFor="hargaFlashSale"
              className="col-span-1 flex flex-row items-center text-black dark:text-white"
            >
              Harga Flash Sale
            </label>
            <input
              id="hargaFlashSale"
              type="text"
              placeholder="Harga Flash Sale"
              value={hargaFlashSale}
              onChange={(e) => setHargaFlashSale(e.target.value)}
              className="col-span-4 bg-white dark:bg-[#16171a] p-2.5 focus:outline-none focus:ring focus:duration-300 text-black dark:text-white ring-1 ring-zinc-200 dark:ring-zinc-600 rounded-lg"
            />
            <label
              htmlFor="expiredFlashSale"
              className="col-span-1 flex flex-row items-center text-black dark:text-white"
            >
              Expired Flash Sale
            </label>
            <input
              id="expiredFlashSale"
              type="date"
              placeholder="Expired Flash Sale"
              value={expiredFlashSale}
              onChange={(e) => setExpiredFlashSale(e.target.value)}
              className="col-span-4 bg-white dark:bg-[#16171a] p-2.5 focus:outline-none focus:ring focus:duration-300 text-black dark:text-white ring-1 ring-zinc-200 dark:ring-zinc-600 rounded-lg"
            />
            <label
              htmlFor="productLogo"
              className="col-span-1 flex flex-row text-black dark:text-white pt-2"
            >
              Product Logo
            </label>
            <div className="col-span-4">
              <input
                id="productLogo"
                ref={productLogoRef}
                type="file"
                onChange={(e) => setProductLogo(e.target.files[0])}
                className="bg-white dark:bg-[#16171a] w-full p-2.5 focus:outline-none focus:ring focus:duration-300 text-black dark:text-white ring-1 ring-zinc-200 dark:ring-zinc-600 rounded-lg"
              />
              <p className="text-error lg:text-base md:text-sm mt-2">
                *AKTIFKAN JIKA KAMU SEDANG MENGADAKAN FLASHSALE
              </p>
            </div>
            <label
              htmlFor="bannerLayanan"
              className="col-span-1 flex flex-row text-black dark:text-white pt-2"
            >
              Banner Layanan
            </label>
            <div className="col-span-4">
              <input
                id="bannerLayanan"
                ref={bannerLayananRef}
                type="file"
                onChange={(e) => setBannerLayanan(e.target.files[0])}
                className="bg-white dark:bg-[#16171a] w-full p-2.5 focus:outline-none focus:ring focus:duration-300 text-black dark:text-white ring-1 ring-zinc-200 dark:ring-zinc-600 rounded-lg"
              />
              <p className="text-error mt-2">
                Disarankan Banner Layanan menggunakan ukuran 1180 x 275 pixel
                (Lebar x Tinggi)
              </p>
            </div>
            <label
              htmlFor="petunjuk"
              className="col-span-1 flex flex-row items-center text-black dark:text-white"
            >
              Petunjuk
            </label>
            <input
              id="petunjuk"
              ref={petunjukRef}
              type="file"
              onChange={(e) => setPetunjuk(e.target.files[0])}
              className="col-span-4 bg-white dark:bg-[#16171a] p-2.5 focus:outline-none focus:ring focus:duration-300 text-black dark:text-white ring-1 ring-zinc-200 dark:ring-zinc-600 rounded-lg"
            />
          </div>
          <div className="flex flex-row gap-3 justify-end mt-2">
            <button
              type="button"
              onClick={handleResetaddLayanan}
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
        Daftar Semua Kategori
      </div>
      <div className="flex flex-row items-center justify-between gap-x-3">
        <div className="flex flex-row gap-x-3">
          <input
            type="text"
            name="layanan"
            id="layananAdminInput"
            placeholder="Id..."
            value={idLayanan}
            onChange={(e) => setIdLayanan(e.target.value)}
            className="text-black dark:text-white font-medium cursor-pointer bg-white dark:bg-[#2d2d2e] rounded-lg px-4 py-2 focus:outline-none border border-zinc-300 dark:border-zinc-600 shadow-md"
          />
          <button
            onClick={handleSearchKategori}
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
                ID
              </th>
              <th className="py-2 text-start px-4 font-medium whitespace-nowrap">
                Logo
              </th>
              <th className="py-2 text-start px-4 font-medium whitespace-nowrap">
                Banner Flash Sale
              </th>
              <th className="py-2 text-start px-4 font-medium">Kategori</th>
              <th className="py-2 text-start px-4 font-medium">Layanan</th>
              <th className="py-2 text-start px-4 font-medium">Provider</th>
              <th className="py-2 text-start px-4 font-medium whitespace-nowrap">
                PID
              </th>
              <th className="py-2 text-start px-4 font-medium whitespace-nowrap">
                Harga Member
              </th>
              <th className="py-2 text-start px-4 font-medium whitespace-nowrap">
                Harga Gold
              </th>
              <th className="py-2 text-start px-4 font-medium whitespace-nowrap">
                Harga Platinum
              </th>
              <th className="py-2 text-start px-4 font-medium whitespace-nowrap">
                Profit Member
              </th>
              <th className="py-2 text-start px-4 font-medium whitespace-nowrap">
                Profit Gold
              </th>
              <th className="py-2 text-start px-4 font-medium whitespace-nowrap">
                Profit Platinum
              </th>
              <th className="py-2 text-start px-4 font-medium">Modal</th>
              <th className="py-2 text-start px-4 font-medium whitespace-nowrap">
                Harga Flash Sale
              </th>
              <th className="py-2 text-start px-4 font-medium whitespace-nowrap">
                Flash Sale?
              </th>
              <th className="py-2 text-start px-4 font-medium whitespace-nowrap">
                Judul Flash Sale
              </th>
              <th className="py-2 text-start px-4 font-medium whitespace-nowrap">
                Expired Flash Sale
              </th>
              <th className="py-2 text-start px-4 font-medium">Status</th>
              <th className="py-2 text-start px-4 font-medium">Aksi</th>
              <th className="py-2 text-start px-4 font-medium">Tanggal</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="21">
                  <div className="flex flex-row gap-x-1 items-end justify-center my-8 text-black dark:text-white">
                    <p className="text-lg">Loading</p>
                    <span className="loading loading-dots loading-sm"></span>
                  </div>
                </td>
              </tr>
            ) : (
              <>
                {layanans.length === 0 ? (
                  <tr>
                    <td colSpan="21">
                      <div className="flex justify-center my-8">
                        <div className="flex flex-col justify-center items-center">
                          <img
                            src={ImgNotFound}
                            alt="No orders found"
                            className="max-w-40"
                          />
                          <p className="text-black dark:text-white">
                            Oops, layanan tidak ditemukan!
                          </p>
                        </div>
                      </div>
                    </td>
                  </tr>
                ) : (
                  <>
                    {layanans.map((layanan, index) => {
                      const isLast = index === layanans.length - 1;
                      const isSecondLast = index === layanans.length - 2;
                      return (
                        <tr
                          key={index}
                          className="bg-white dark:bg-[#16171a] border-b border-zinc-300 dark:border-zinc-600"
                        >
                          <td className="py-2 px-4 font-light text-black dark:text-white">
                            {index}
                          </td>
                          <td className="py-2 px-4 font-light text-black dark:text-white">
                            {layanan.id}
                          </td>
                          <td className="py-2 px-4">
                            {layanan.product_logo ? (
                              <img
                                src={layanan.product_logo}
                                alt={`Banner-Flash-Sale-${layanan.Layanan}`}
                                width={100}
                              />
                            ) : (
                              <p className="font-light text-black dark:text-white">
                                -
                              </p>
                            )}
                          </td>
                          <td className="py-2 px-4">
                            {layanan.banner_flash_sale ? (
                              <img
                                src={layanan.banner_flash_sale}
                                alt={`Banner-Flash-Sale-${layanan.banner_flash_sale}`}
                                width={100}
                              />
                            ) : (
                              <p className="font-light text-black dark:text-white">
                                -
                              </p>
                            )}
                          </td>
                          <td className="py-2 px-4 font-light text-black dark:text-white">
                            {layanan.kategori.nama}
                          </td>
                          <td className="py-2 px-4 font-light text-black dark:text-white">
                            {layanan.layanan}
                          </td>
                          <td className="py-2 px-4 font-light text-black dark:text-white">
                            {layanan.provider}
                          </td>
                          <td className="py-2 px-4 font-light text-black dark:text-white min-w-40">
                            {layanan.provider_id}
                          </td>
                          <td className="py-2 px-4 font-light text-black dark:text-white min-w-40">
                            {layanan.harga_member}
                          </td>
                          <td className="py-2 px-4 font-light text-black dark:text-white min-w-40">
                            {layanan.harga_gold}
                          </td>
                          <td className="py-2 px-4 font-light text-black dark:text-white">
                            {layanan.harga_platinum}
                          </td>
                          <td className="py-2 px-4 font-light text-black dark:text-white">
                            {parseFloat(layanan.profit_member).toLocaleString(
                              "en-US",
                              {
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 2,
                              }
                            )}
                            % (Rp.
                            {(
                              layanan.harga_member *
                              (layanan.profit_member / 100)
                            ).toLocaleString("en-US")}
                            )
                          </td>
                          <td className="py-2 px-4 font-light text-black dark:text-white">
                            {parseFloat(layanan.profit_gold).toLocaleString(
                              "en-US",
                              {
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 2,
                              }
                            )}
                            % (Rp.
                            {(
                              layanan.harga_gold *
                              (layanan.profit_gold / 100)
                            ).toLocaleString("en-US")}
                            )
                          </td>
                          <td className="py-2 px-4 font-light text-black dark:text-white whitespace-nowrap">
                            {parseFloat(layanan.profit_platinum).toLocaleString(
                              "en-US",
                              {
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 2,
                              }
                            )}
                            % (Rp.
                            {(
                              layanan.harga_platinum *
                              (layanan.profit_platinum / 100)
                            ).toLocaleString("en-US")}
                            )
                          </td>
                          <td className="py-2 px-4 font-light text-black dark:text-white whitespace-nowrap">
                            {layanan.modal}
                          </td>
                          <td className="py-2 px-4 font-light text-black dark:text-white whitespace-nowrap">
                            {layanan.harga_flash_sale}
                          </td>
                          <td className="py-2 px-4 font-light text-black dark:text-white whitespace-nowrap">
                            {layanan.is_flash_sale === 1 ? "Yes" : "No"}
                          </td>
                          <td className="py-2 px-4 font-light text-black dark:text-white whitespace-nowrap">
                            {layanan.judul_flash_sale
                              ? layanan.judul_flash_sale
                              : "-"}
                          </td>
                          <td className="py-2 px-4 font-light text-black dark:text-white whitespace-nowrap">
                            {layanan.expired_flash_sale
                              ? layanan.expired_flash_sale
                              : "-"}
                          </td>
                          <td className="py-2 px-4 font-light text-black dark:text-white">
                            <BtnStatus
                              Id={layanan.id}
                              status={layanan.status}
                              isLast={isLast}
                              isSecondLast={isSecondLast}
                            />
                          </td>
                          <td className="py-2 px-4 font-light text-black dark:text-white">
                            <BtnAksi
                              id={layanan.id}
                              getData={getLayanan}
                              dataTipe={kategori}
                            />
                          </td>
                          <td className="py-2 px-4 font-light text-black dark:text-white whitespace-nowrap">
                            {layanan.created_at.slice(0, 19).replace("T", " ")}
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
          onClick={() => handlePageChangeKategori(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-1 bg-gray-300 text-black rounded disabled:brightness-75 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChangeKategori(index + 1)}
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
          onClick={() => handlePageChangeKategori(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 mx-1 bg-purple-500 text-white rounded disabled:brightness-75 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Layanan;
