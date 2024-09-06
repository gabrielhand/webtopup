import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AllGames = () => {
  const [tipes, setTipe] = useState([]);
  const [kategoriByTipe, setKategoriByTipe] = useState([]);
  const [filteredKategori, setFilteredKategori] = useState([]);
  const [selectedTipe, setSelectedTipe] = useState("Semua");
  const [loadedImages, setLoadedImages] = useState({}); // State untuk menyimpan status loading gambar

  const getTipe = async () => {
    const response = await axios.get("http://localhost:5000/tipe");
    setTipe(response.data);
  };

  useEffect(() => {
    getTipe();
  }, []);

  const getKategoriByTipe = async () => {
    const response = await axios.get("http://localhost:5000/kategoribytipe");
    setKategoriByTipe(response.data);
    setFilteredKategori(response.data);
  };

  useEffect(() => {
    getKategoriByTipe();
  }, []);

  const handleTipeClick = (tipeName) => {
    setSelectedTipe(tipeName);
    const filtered =
      tipeName === "Semua"
        ? kategoriByTipe
        : kategoriByTipe.filter((kategori) => kategori.tipe_nama === tipeName);
    setFilteredKategori(filtered);
  };

  const handleImageLoad = (index) => {
    setLoadedImages((prevState) => ({
      ...prevState,
      [index]: true,
    }));
  };

  return (
    <div className="flex flex-col lg:gap-y-6 md:gap-y-6 gap-y-4">
      <div className="flex flex-row justify-center gap-x-2">
        <div
          id="btn-tipe-Semua"
          className={`cursor-pointer hover:bg-base-200 bg-white lg:rounded-2xl md:rounded-2xl rounded-xl lg:px-10 lg:py-2 md:py-2 py-1 md:px-6 px-4 shadow-md ${
            selectedTipe === "Semua"
              ? "border-2 border-[#4169e1] dark:bg-[#4169e1]"
              : "border-2 dark:border-[#4169e1]/70 dark:bg-transparent"
          }`}
          onClick={() => handleTipeClick("Semua")}
        >
          <p
            className={`dark:text-white lg:text-sm md:text-sm text-xs ${
              selectedTipe === "Semua" ? "text-[#4169e1]" : "text-black"
            }`}
          >
            Semua
          </p>
        </div>
        {tipes.map((tipe) => (
          <div
            id={`btn-tipe-${tipe.name}`}
            key={tipe.name}
            className={`cursor-pointer hover:bg-base-200 bg-white lg:rounded-2xl md:rounded-2xl rounded-xl lg:px-10 lg:py-2 md:py-2 py-1 md:px-6 px-4 shadow-md ${
              selectedTipe === tipe.name
                ? "border-2 border-[#4169e1] dark:bg-[#4169e1]"
                : "border-2 dark:border-[#4169e1]/70 dark:bg-transparent"
            }`}
            onClick={() => handleTipeClick(tipe.name)}
          >
            <p
              className={`dark:text-white lg:text-sm md:text-sm text-xs ${
                selectedTipe === tipe.name ? "text-[#4169e1]" : "text-black"
              }`}
            >
              {tipe.name}
            </p>
          </div>
        ))}
      </div>
      <div className="grid lg:grid-cols-6 md:grid-cols-4 grid-cols-4 gap-x-3">
        {filteredKategori.map((kategori, index) => (
          <Link to={`/order/${kategori.kode}`}
            key={kategori.kode}
            className="relative aspect-[1/1.5] overflow-hidden group rounded-xl shadow-xl hover:outline hover:outline-2 hover:outline-[#4169e1] hover:outline-offset-2 duration-100 p-2 bg-white dark:bg-[#111016]">
            <img
              src={kategori.thumbnail}
              alt={`Gambar-${kategori.nama}`}
              loading="lazy"
              className={`absolute inset-0 bg-cover bg-center h-full w-full rounded-lg transition-transform duration-300 ease-in-out group-hover:blur-sm ${
                loadedImages[index] ? "blur-0" : "blur-lg"
              }`}
              onLoad={() => handleImageLoad(index)}
            />
            <div className="absolute inset-0 rounded-lg blur-sm bg-black/20 w-full opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"></div>
            <div className="absolute z-10 flex flex-col bottom-0 p-4 transform translate-y-4 opacity-0 transition-all duration-300 ease-in-out group-hover:translate-y-0 group-hover:opacity-100">
              <p className="text-white font-medium">{kategori.nama}</p>
              <p className="text-slate-400 font-medium text-xs">
                {kategori.brand}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllGames;