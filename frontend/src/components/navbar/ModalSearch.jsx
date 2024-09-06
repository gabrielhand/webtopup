import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import AnimationNoProduct from "../../assets/lottie/AnimationNoProduct.json";

const ModalSearch = () => {
  const [kategoris, setKategoris] = useState([]);
  const [searchKategori, setSearchKategori] = useState("");
  const [filteredKategori, setFilteredKategori] = useState([]);
  const modalSearch = useRef(null);
  const navigate = useNavigate();

  const getKategori = async () => {
    const response = await axios.get("http://localhost:5000/kategori");
    setKategoris(response.data);
  };

  useEffect(() => {
    getKategori();
  }, []);

  useEffect(() => {
    const filteredKat = kategoris.filter((kategori) =>
      kategori.nama.toLowerCase().includes(searchKategori.toLowerCase())
    );

    setFilteredKategori(filteredKat);
  }, [searchKategori, kategoris]);

  const handleLinkClick = (kategoriKode) => {
    if (modalSearch.current) {
      modalSearch.current.close();
    }
    navigate(`/order/${kategoriKode}`);
  };

  return (
    <dialog id="modal_search_game" className="modal" ref={modalSearch}>
      <div className="relative flex flex-col rounded-xl w-11/12 h-5/6 overflow-hidden max-w-5xl bg-white dark:bg-[#161721]">
        <div className="flex flex-row px-6 items-center">
          <div className="flex flex-row w-full items-center">
            <input
              type="text"
              placeholder="Cari game..."
              autoFocus={true}
              value={searchKategori}
              onChange={(e) => setSearchKategori(e.target.value)}
              className="flex flex-row py-4 bg-transparent dark:placeholder:text-white placeholder-black placeholder:font-semibold text-xl w-full cursor-pointer text-black dark:text-white focus:outline-none"
            />
            {/* <div className="flex flex-row">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-search text-black dark:text-white"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
              </svg>
            </div> */}
            <div className="flex flex-row">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-search text-black dark:text-white"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
              </svg>
            </div>
          </div>
        </div>
        <hr className="border-t border-zinc-700 dark:border-zinc-500" />
        <div className="flex flex-col gap-y-2 overflow-y-auto lg:max-h-96 p-6">
          {filteredKategori.length === 0 ? (
            <div className="flex flex-col gap-y-2 justify-center items-center text-center w-full">
              <Lottie animationData={AnimationNoProduct} loop={true} />
              <p className="flex flex-row text-black dark:text-white">
                Oupss, maaf kategori tidak ada...
              </p>
            </div>
          ) : (
            filteredKategori.map((kategori) => (
              <div
                key={kategori.nama}
                className="flex flex-row group hover:bg-zinc-200 dark:hover:bg-zinc-700/50 duration-300 p-5 rounded-xl cursor-pointer"
                onClick={() => handleLinkClick(kategori.kode)}
              >
                <div className="flex flex-row gap-x-6 w-full items-center">
                  <figure>
                    <img
                      src={kategori.thumbnail}
                      alt={`Thumbnail-${kategori.nama}`}
                      className="aspect-square max-w-32 max-h-32 rounded-xl"
                    />
                  </figure>
                  <div className="flex flex-row w-full justify-between">
                    <p className="text-lg text-black dark:text-white">
                      {kategori.nama}
                    </p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      className="bi bi-arrow-right-short text-black dark:text-white opacity-0 group-hover:opacity-100 duration-300"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="flex flex-row w-full justify-end p-4">
          <form method="dialog">
            <button className="flex flex-row px-4 py-2 bg-[#4169e1] hover:brightness-75 hover:duration-300 rounded-xl text-white font-medium">
              Tutup
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default ModalSearch;