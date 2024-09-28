import { useEffect, useRef, useState } from "react";
import BreadCrumbs from "../../components/breadcrumbs/BreadCrumbs";
import axios from "axios";
import ImgNotFound from "../../../assets/not-found.png";
import BtnAksi from "../../components/button/BtnAksi";
import BtnStatus from "../../components/button/BtnStatus";

const Kategori = () => {
  const [isLoading, setLoading] = useState(false);
  const [kategoris, setKategori] = useState([]);
  const [nama, setNama] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(5);
  const [namaKategori, setNamaKategori] = useState("");
  const [subNamaKategori, setSubNamaKategori] = useState("");
  const [brand, setBrand] = useState("");
  const [kode, setKode] = useState("");
  const [ketLayanan, setKetLayanan] = useState("");
  const [ketId, setKetId] = useState("");
  const [placeholder1, setPlaceholder1] = useState("");
  const [placeholder2, setPlaceholder2] = useState("");
  const [serverOption, setServerOption] = useState("");
  const [populer, setPopuler] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [tipe, setTipe] = useState([]);
  const [selectedTipe, setSelectedTipe] = useState(null);
  const [isMenuTipeOpen, setMenuTipeOpen] = useState(false);
  const [rateMember, setRateMember] = useState("");
  const [rateGold, setRateGold] = useState("");
  const [ratePlatinum, setRatePlatinum] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [bannerLayanan, setBannerLayanan] = useState(null);
  const [petunjuk, setPetunjuk] = useState(null);

  const getTipe = async () => {
    const response = await axios.get("http://localhost:5000/tipe");
    setTipe(response.data);
  };

  const getKategori = async (page = 1, nama = "") => {
    setLoading(true);
    try {
      let url = `http://localhost:5000/kategoriforadmin?page=${page}&limit=${limit}`;

      if (nama) {
        url += `&nama=${nama}`;
      }
      const response = await axios.get(url);
      setKategori(response.data.kategori);
      setTotalPages(response.data.totalPages);
      setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };

  const addKategori = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("nama", namaKategori);
      formData.append("sub_nama", subNamaKategori);
      formData.append("brand", brand);
      formData.append("kode", kode);
      formData.append("ket_layanan", ketLayanan);
      formData.append("ket_id", ketId);
      formData.append("placeholder_1", placeholder1);
      formData.append("placeholder_2", placeholder2);
      formData.append("server_option", serverOption);
      formData.append("tipe_id", selectedTipe.id);
      formData.append("rate_member", rateMember);
      formData.append("rate_gold", rateGold);
      formData.append("rate_platinum", ratePlatinum);
      formData.append("populer", populer);
      formData.append("deskripsi", deskripsi);
      formData.append("thumbnail", thumbnail);
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

      getKategori();
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getTipe();
    getKategori();
  }, []);

  useEffect(() => {
    if (!nama.trim()) {
      getKategori(currentPage);
    }
  }, [nama]);

  useEffect(() => {
    getKategori(currentPage, nama);
  }, [currentPage]);

  const thumbnailRef = useRef(null);
  const bannerLayananRef = useRef(null);
  const petunjukRef = useRef(null);

  const handleSearchKategori = () => {
    getKategori(1, nama);
  };

  const handlePageChangeKategori = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleTipeSelection = (selectedTipe) => {
    setSelectedTipe(selectedTipe);
    setMenuTipeOpen(false);
  };

  const handlePopulerChange = (e) => {
    setPopuler(parseInt(e.target.value));
  };

  const handleServerOptionChange = (e) => {
    setServerOption(parseInt(e.target.value));
  };

  const toggleMenuTipe = () => {
    setMenuTipeOpen(!isMenuTipeOpen);
  };

  const handleResetAddKategori = () => {
    setNamaKategori("");
    setSubNamaKategori("");
    setBrand("");
    setKode("");
    setDeskripsi("");
    setKetLayanan("");
    setKetId("");
    setPlaceholder1("");
    setPlaceholder2("");
    setRateMember("");
    setRateGold("");
    setRatePlatinum("");
    setSelectedTipe(null);
    setServerOption("");
    setPopuler("");
    setThumbnail(null);
    setBannerLayanan(null);
    setPetunjuk(null);

    if (thumbnailRef.current) thumbnailRef.current.value = null;
    if (bannerLayananRef.current) bannerLayananRef.current.value = null;
    if (petunjukRef.current) petunjukRef.current.value = null;
  };

  return (
    <div className="flex flex-col gap-y-4 w-full">
      <BreadCrumbs />
      <div className="flex flex-row lg:text-2xl text-black dark:text-white font-semibold">
        Tambah Kategori
      </div>
      <div className="bg-white dark:bg-[#2d2d2e] rounded-xl shadow-md p-5">
        <form onSubmit={addKategori} className="flex flex-col gap-y-4">
          <div className="grid grid-cols-5 gap-y-4 gap-x-2">
            <label
              htmlFor="namaKategori"
              className="col-span-1 flex flex-row items-center text-black dark:text-white"
            >
              Nama
            </label>
            <input
              id="namaKategori"
              type="text"
              placeholder="Nama Kategori"
              value={namaKategori}
              onChange={(e) => setNamaKategori(e.target.value)}
              className="col-span-4 bg-white dark:bg-[#16171a] p-2.5 focus:outline-none focus:ring focus:duration-300 text-black dark:text-white ring-1 ring-zinc-200 dark:ring-zinc-600 rounded-lg"
            />
            <label
              htmlFor="subNamaKategori"
              className="col-span-1 flex flex-row items-center text-black dark:text-white"
            >
              Sub Nama
            </label>
            <input
              id="subNamaKategori"
              type="text"
              placeholder="Sub Nama Kategori"
              value={subNamaKategori}
              onChange={(e) => setSubNamaKategori(e.target.value)}
              className="col-span-4 bg-white dark:bg-[#16171a] p-2.5 focus:outline-none focus:ring focus:duration-300 text-black dark:text-white ring-1 ring-zinc-200 dark:ring-zinc-600 rounded-lg"
            />
            <label
              htmlFor="brand"
              className="col-span-1 flex flex-row items-center text-black dark:text-white"
            >
              Brand
            </label>
            <input
              id="brand"
              type="text"
              placeholder="Brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
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
              htmlFor="deskripsi"
              className="col-span-1 flex flex-row items-center text-black dark:text-white"
            >
              Deskripsi
            </label>
            <textarea
              id="deskripsi"
              type="text"
              placeholder="Deskripsi"
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              className="col-span-4 bg-white dark:bg-[#16171a] p-2.5 focus:outline-none focus:ring focus:duration-300 text-black dark:text-white ring-1 ring-zinc-200 dark:ring-zinc-600 rounded-lg"
            />
            <label
              htmlFor="ketLayanan"
              className="col-span-1 flex flex-row items-center text-black dark:text-white"
            >
              Keterangan Layanan
            </label>
            <textarea
              id="ketLayanan"
              type="text"
              placeholder="Keterangan Layanan"
              value={ketLayanan}
              onChange={(e) => setKetLayanan(e.target.value)}
              className="col-span-4 bg-white dark:bg-[#16171a] p-2.5 focus:outline-none focus:ring focus:duration-300 text-black dark:text-white ring-1 ring-zinc-200 dark:ring-zinc-600 rounded-lg"
            />
            <label
              htmlFor="ketId"
              className="col-span-1 flex flex-row items-center text-black dark:text-white"
            >
              Keterangan Id
            </label>
            <textarea
              id="ketId"
              type="text"
              placeholder="Keterangan Id"
              value={ketId}
              onChange={(e) => setKetId(e.target.value)}
              className="col-span-4 bg-white dark:bg-[#16171a] p-2.5 focus:outline-none focus:ring focus:duration-300 text-black dark:text-white ring-1 ring-zinc-200 dark:ring-zinc-600 rounded-lg"
            />
            <label
              htmlFor="placeholder1"
              className="col-span-1 flex flex-row items-center text-black dark:text-white"
            >
              Placeholder 1
            </label>
            <input
              id="placeholder1"
              type="text"
              placeholder="Placeholder 1"
              value={placeholder1}
              onChange={(e) => setPlaceholder1(e.target.value)}
              className="col-span-4 bg-white dark:bg-[#16171a] p-2.5 focus:outline-none focus:ring focus:duration-300 text-black dark:text-white ring-1 ring-zinc-200 dark:ring-zinc-600 rounded-lg"
            />
            <label
              htmlFor="placeholder2"
              className="col-span-1 flex flex-row items-center text-black dark:text-white"
            >
              Placeholder 2
            </label>
            <input
              id="placeholder2"
              type="text"
              placeholder="Placeholder 2"
              value={placeholder2}
              onChange={(e) => setPlaceholder2(e.target.value)}
              className="col-span-4 bg-white dark:bg-[#16171a] p-2.5 focus:outline-none focus:ring focus:duration-300 text-black dark:text-white ring-1 ring-zinc-200 dark:ring-zinc-600 rounded-lg"
            />
            <label
              htmlFor="butuhServerId"
              className="col-span-1 flex flex-row items-center text-black dark:text-white"
            >
              Butuh Server ID?
            </label>
            <div className="col-span-4 flex flex-row items-center gap-x-2 text-black dark:text-white">
              <input
                id="serverIdYa"
                type="radio"
                name="serverId"
                value={1}
                checked={serverOption === 1}
                onChange={handleServerOptionChange}
                className="appearance-none w-4 h-4 cursor-pointer rounded-full outline outline-offset-1 outline-zinc-300 dark:outline-zinc-600 checked:bg-purple-500 checked:outline checked:outline-offset-2 checked:outline-zinc-300 dark:checked:outline-zinc-600 transition-all duration-100"
              />
              <label htmlFor="serverIdYa">Ya</label>
              <input
                id="serverIdTidak"
                type="radio"
                name="serverId"
                value={0}
                checked={serverOption === 0}
                onChange={handleServerOptionChange}
                className="appearance-none w-4 h-4 cursor-pointer rounded-full outline outline-offset-1 outline-zinc-300 dark:outline-zinc-600 checked:bg-purple-500 checked:outline checked:outline-offset-2 checked:outline-zinc-300 dark:checked:outline-zinc-600 transition-all duration-100"
              />
              <label htmlFor="serverIdTidak">Tidak</label>
            </div>
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
                {selectedTipe ? selectedTipe.name : "Pilih Tipe"}
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
                  <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                </svg>
              </div>
              {isMenuTipeOpen && (
                <div className="absolute top-12 flex flex-col gap-y-2 bg-white dark:bg-[#16171a] p-2 rounded-lg w-full ring-1 ring-zinc-200 dark:ring-zinc-600">
                  {tipe?.map((tipeOption) => (
                    <div
                      key={tipeOption.name}
                      onClick={() => handleTipeSelection(tipeOption)}
                      className="flex flex-row px-4 py-2 text-black dark:text-white cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-700 hover:duration-300 rounded-lg z-50"
                    >
                      {tipeOption.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <label
              htmlFor="rateMember"
              className="col-span-1 flex flex-row items-center text-black dark:text-white"
            >
              Rate Member
            </label>
            <input
              id="rateMember"
              type="number"
              placeholder="Rate Member"
              value={rateMember}
              onChange={(e) => setRateMember(e.target.value)}
              className="col-span-4 bg-white dark:bg-[#16171a] p-2.5 focus:outline-none focus:ring focus:duration-300 text-black dark:text-white ring-1 ring-zinc-200 dark:ring-zinc-600 rounded-lg"
            />
            <label
              htmlFor="rateGold"
              className="col-span-1 flex flex-row items-center text-black dark:text-white"
            >
              Rate Gold
            </label>
            <input
              id="rateGold"
              type="number"
              placeholder="Rate Gold"
              value={rateGold}
              onChange={(e) => setRateGold(e.target.value)}
              className="col-span-4 bg-white dark:bg-[#16171a] p-2.5 focus:outline-none focus:ring focus:duration-300 text-black dark:text-white ring-1 ring-zinc-200 dark:ring-zinc-600 rounded-lg"
            />
            <label
              htmlFor="ratePlatinum"
              className="col-span-1 flex flex-row items-center text-black dark:text-white"
            >
              Rate Platinum
            </label>
            <input
              id="ratePlatinum"
              type="number"
              placeholder="Rate Platinum"
              value={ratePlatinum}
              onChange={(e) => setRatePlatinum(e.target.value)}
              className="col-span-4 bg-white dark:bg-[#16171a] p-2.5 focus:outline-none focus:ring focus:duration-300 text-black dark:text-white ring-1 ring-zinc-200 dark:ring-zinc-600 rounded-lg"
            />
            <label
              htmlFor="butuhPopuler"
              className="col-span-1 flex flex-row items-center text-black dark:text-white"
            >
              Populer?
            </label>
            <div className="col-span-4 flex flex-row items-center gap-x-2 text-black dark:text-white">
              <input
                id="populerYa"
                type="radio"
                name="populer"
                value={1}
                checked={populer === 1}
                onChange={handlePopulerChange}
                className="appearance-none w-4 h-4 cursor-pointer rounded-full outline outline-offset-1 outline-zinc-300 dark:outline-zinc-600 checked:bg-purple-500 checked:outline checked:outline-offset-2 checked:outline-zinc-300 dark:checked:outline-zinc-600 transition-all duration-100"
              />
              <label htmlFor="populerYa">Ya</label>
              <input
                id="populerTidak"
                type="radio"
                name="populer"
                value={0}
                checked={populer === 0}
                onChange={handlePopulerChange}
                className="appearance-none w-4 h-4 cursor-pointer rounded-full outline outline-offset-1 outline-zinc-300 dark:outline-zinc-600 checked:bg-purple-500 checked:outline checked:outline-offset-2 checked:outline-zinc-300 dark:checked:outline-zinc-600 transition-all duration-100"
              />
              <label htmlFor="populerTidak">Tidak</label>
            </div>
            <label
              htmlFor="thumbnail"
              className="col-span-1 flex flex-row text-black dark:text-white pt-2"
            >
              Thumbnail
            </label>
            <div className="col-span-4">
              <input
                id="thumbnail"
                ref={thumbnailRef}
                type="file"
                onChange={(e) => setThumbnail(e.target.files[0])}
                className="bg-white dark:bg-[#16171a] w-full p-2.5 focus:outline-none focus:ring focus:duration-300 text-black dark:text-white ring-1 ring-zinc-200 dark:ring-zinc-600 rounded-lg"
              />
              <p className="text-error mt-2">
                Gunakan Ukuran 512 x 652 pixel (Lebar x Tinggi) untuk thumbnail
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
              onClick={handleResetAddKategori}
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
            name="namaKategori"
            id="namaKategoriAdminInput"
            placeholder="Nama..."
            value={nama}
            onChange={(e) => setNama(e.target.value)}
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
                Thumbnail
              </th>
              <th className="py-2 text-start px-4 font-medium whitespace-nowrap">
                Banner Layanan
              </th>
              <th className="py-2 text-start px-4 font-medium">Nama</th>
              <th className="py-2 text-start px-4 font-medium">Kode</th>
              <th className="py-2 text-start px-4 font-medium">Brand</th>
              <th className="py-2 text-start px-4 font-medium whitespace-nowrap">
                Deskripsi
              </th>
              <th className="py-2 text-start px-4 font-medium whitespace-nowrap">
                Keterangan Layanan
              </th>
              <th className="py-2 text-start px-4 font-medium whitespace-nowrap">
                Keterangan ID
              </th>
              <th className="py-2 text-start px-4 font-medium whitespace-nowrap">
                Server Id
              </th>
              <th className="py-2 text-start px-4 font-medium">Tipe</th>
              <th className="py-2 text-start px-4 font-medium">Populer</th>
              <th className="py-2 text-start px-4 font-medium">Tanggal</th>
              <th className="py-2 text-start px-4 font-medium">Status</th>
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
                {kategoris.length === 0 ? (
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
                            Oops, kategori tidak ditemukan!
                          </p>
                        </div>
                      </div>
                    </td>
                  </tr>
                ) : (
                  <>
                    {kategoris.map((kategori, index) => {
                      const isLast = index === kategoris.length - 1;
                      const isSecondLast = index === kategoris.length - 2;
                      return (
                        <tr
                          key={index}
                          className="bg-white dark:bg-[#16171a] border-b border-zinc-300 dark:border-zinc-600"
                        >
                          <td className="py-2 px-4 font-light text-black dark:text-white">
                            {index}
                          </td>
                          <td className="py-2 px-4">
                            <img
                              src={kategori.thumbnail}
                              alt={`Thumbnail-${kategori.nama}`}
                              width={100}
                            />
                          </td>
                          <td className="py-2 px-4">
                            <img
                              src={kategori.bannerlayanan}
                              alt={`Banner-${kategori.nama}`}
                              width={200}
                            />
                          </td>
                          <td className="py-2 px-4 font-light text-black dark:text-white">
                            {kategori.nama}
                          </td>
                          <td className="py-2 px-4 font-light text-black dark:text-white">
                            {kategori.kode}
                          </td>
                          <td className="py-2 px-4 font-light text-black dark:text-white">
                            {kategori.brand}
                          </td>
                          <td className="py-2 px-4 font-light text-black dark:text-white min-w-40">
                            {kategori.deskripsi}
                          </td>
                          <td className="py-2 px-4 font-light text-black dark:text-white min-w-40">
                            <div
                              dangerouslySetInnerHTML={{
                                __html: kategori.ket_layanan,
                              }}
                            />
                          </td>
                          <td className="py-2 px-4 font-light text-black dark:text-white min-w-40">
                            <div
                              dangerouslySetInnerHTML={{
                                __html: kategori.ket_id,
                              }}
                            />
                          </td>
                          <td className="py-2 px-4 font-light text-black dark:text-white">
                            {kategori.server_id}
                          </td>
                          <td className="py-2 px-4 font-light text-black dark:text-white">
                            {kategori.tipe.name}
                          </td>
                          <td className="py-2 px-4 font-light text-black dark:text-white">
                            {kategori.populer}
                          </td>
                          <td className="py-2 px-4 font-light text-black dark:text-white whitespace-nowrap">
                            {kategori.created_at.slice(0, 19).replace("T", " ")}
                          </td>
                          <td className="py-2 px-4 font-light text-black dark:text-white">
                            <BtnStatus
                              Id={kategori.id}
                              status={kategori.status}
                              isLast={isLast}
                              isSecondLast={isSecondLast}
                            />
                          </td>
                          <td className="py-2 px-4 font-light text-black dark:text-white">
                            <BtnAksi
                              id={kategori.id}
                              getData={getKategori}
                              dataTipe={tipe}
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

export default Kategori;
