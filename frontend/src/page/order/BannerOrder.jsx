import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const BannerOrder = ({ data }) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (data) {
      requestAnimationFrame(() => setAnimate(true));
    }
  }, [data]);
  return (
    <>
      <img
        id={`banner-${data.nama}`}
        src={data.bannerlayanan}
        alt={`Banner-${data.nama}`}
        loading="lazy"
        className="absolute object-cover object-center inset-0 w-full h-full"
      />
      <button
        onClick={() => document.getElementById("modal_ket_layanan").showModal()}
        className="absolute top-3 end-3 right-3 flex flex-row items-center cursor-pointer lg:text-sm md:text-sm text-xs gap-x-2 rounded-xl px-3 py-2 bg-zinc-800 border border-zinc-700 hover:bg-zinc-700 hover:duration-300 text-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-question-circle-fill"
          viewBox="0 0 16 16"
        >
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 0 0 .241.247m2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.425.927 1.01.927z" />
        </svg>
        <p className="">Cara Pembelian</p>
      </button>
      <dialog id="modal_ket_layanan" className="modal">
        <div className="modal-box bg-white dark:bg-[#161721]">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-semibold text-black dark:text-white text-xl">
            Keterangan Layanan
          </h3>
          <div
            className="py-4 text-black dark:text-white"
            dangerouslySetInnerHTML={{ __html: data.ket_layanan }}
          />
          <form method="dialog">
            <div className="flex flex-row justify-end w-full">
              <button className="rounded-xl px-3 py-2 bg-[#4169e1] hover:bg-[#4169e1]/80 hover:duration-300 text-white">
                Oke
              </button>
            </div>
          </form>
        </div>
      </dialog>
      <div
        className={`absolute bg-black/60 min-h-[35%] rounded-t-xl flex flex-col w-full text-white lg:ps-20 md:ps-16 ps-10 lg:pe-20 md:pe-16 pe-4 py-4 bottom-0 transform transition-transform duration-1000 ease-in-out ${
          animate ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex flex-row w-full lg:gap-x-6 md:gap-x-6 gap-x-3">
          <div>
            <div className="relative flex lg:flex-none md:flex-none flex-none z-20 -top-10 md:w-44 w-32">
              <img
                src={data.thumbnail}
                alt={data.nama}
                className="rounded-2xl object-cover aspect-square"
              />
            </div>
          </div>
          <div className="flex flex-col lg:gap-y-4 md:gap-y-4 gap-y-2 justify-center">
            <div className="flex flex-col">
              <p className="lg:text-3xl md:text-2xl text-xl font-semibold">
                {data.nama}
              </p>
              <p className="lg:text-lg md:text-base text-sm font-medium">
                {data.brand}
              </p>
            </div>
            <p className="lg:text-base md:text-sm text-xs font-light lg:line-clamp-none md:line-clamp-none line-clamp-2">
              {data.deskripsi}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap lg:gap-x-4 gap-2">
          <div className="flex flex-row bg-[#4169e1] items-center gap-x-2 px-3 py-1.5 rounded-xl border border-[#4169e1]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-clock-fill text-cyan-400 flex flex-none"
              viewBox="0 0 16 16"
            >
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z" />
            </svg>
            <p className="text-white lg:text-sm md:text-sm text-xs">
              Layanan 24/7
            </p>
          </div>
          <div className="flex flex-row bg-[#4169e1] items-center gap-x-1 px-3 py-1.5 rounded-xl border border-[#4169e1]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-lightning-fill text-yellow-500 flex flex-none"
              viewBox="0 0 16 16"
            >
              <path d="M5.52.359A.5.5 0 0 1 6 0h4a.5.5 0 0 1 .474.658L8.694 6H12.5a.5.5 0 0 1 .395.807l-7 9a.5.5 0 0 1-.873-.454L6.823 9.5H3.5a.5.5 0 0 1-.48-.641z" />
            </svg>
            <p className="text-white lg:text-sm md:text-sm text-xs">
              Proses kilat
            </p>
          </div>
          <div className="flex flex-row bg-[#4169e1] items-center gap-x-2 px-3 py-1.5 rounded-xl border border-[#4169e1]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-shield-fill-check text-green-500 flex flex-none"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M8 0c-.69 0-1.843.265-2.928.56-1.11.3-2.229.655-2.887.87a1.54 1.54 0 0 0-1.044 1.262c-.596 4.477.787 7.795 2.465 9.99a11.8 11.8 0 0 0 2.517 2.453c.386.273.744.482 1.048.625.28.132.581.24.829.24s.548-.108.829-.24a7 7 0 0 0 1.048-.625 11.8 11.8 0 0 0 2.517-2.453c1.678-2.195 3.061-5.513 2.465-9.99a1.54 1.54 0 0 0-1.044-1.263 63 63 0 0 0-2.887-.87C9.843.266 8.69 0 8 0m2.146 5.146a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793z"
              />
            </svg>
            <p className="text-white lg:text-sm md:text-sm text-xs">
              Aman & Terpercaya
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

BannerOrder.propTypes = {
  data: PropTypes.shape({
    nama: PropTypes.string.isRequired,
    bannerlayanan: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    brand: PropTypes.string.isRequired,
    ket_layanan: PropTypes.string.isRequired,
    deskripsi: PropTypes.string.isRequired,
  }).isRequired,
};

export default BannerOrder;
