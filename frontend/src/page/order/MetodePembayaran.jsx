import PropTypes from "prop-types";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import GopayImage from "../../assets/gopay_image.png";

const MetodePembayaran = ({ methods }) => {
  const eMoneyMetode = methods.filter((method) => method.tipe === "e-walet");
  const vAccountMetode = methods.filter((method) => method.tipe === "virtual-account");
  const cStoreMetode = methods.filter((method) => method.tipe === "convenience-store");

  const [isEMoneyOpen, setIsMetOpen] = useState(false);
  const [isVaOpen, setIsVaOpen] = useState(false);
  const [isCsOpen, setIsCsOpen] = useState(false);
  const [isSaldoOpen, setIsSaldoOpen] = useState(false);
  
  const { logoHeader } = useOutletContext();

  const toggleEMoney = () => {
    setIsMetOpen(!isEMoneyOpen);
  };

  const toggleVa = () => {
    setIsVaOpen(!isVaOpen);
  };

  const toggleCs = () => {
    setIsCsOpen(!isCsOpen);
  };

  const toggleSaldo = () => {
    setIsSaldoOpen(!isSaldoOpen);
  };

  return (
    <div id="MetodePembayaran-Content" className="flex flex-col gap-y-3">
      <div className="flex flex-row gap-x-2 ">
        <div className="flex flex-row justify-between bg-[#4169e1] rounded-xl w-full overflow-visible">
          <p className="text-white font-medium px-5 py-3">Metode Pembayaran</p>
          <figure className="relative">
            <img src={GopayImage} alt="Gopay-Image" className="absolute lg:right-6 right-8 -top-2 max-w-16 max-h-16" />
          </figure>
        </div>
      </div>
      <div className="flex flex-col gap-y-3 w-full rounded-xl px-5 py-5 bg-white dark:bg-[#323336] shadow-lg">
        <div
          id="Method-EMoney-Content"
          className={`flex flex-col gap-y-3 w-full rounded-xl bg-slate-200 dark:bg-zinc-300 cursor-pointer overflow-hidden ${
            isEMoneyOpen
              ? "transition-all duration-700 max-h-96"
              : "duration-700 max-h-12"
          }`}
        >
          <button
            onClick={toggleEMoney}
            className="flex flex-row w-full items-center justify-between px-4 py-3 text-black font-medium rounded-b-xl bg-slate-200 dark:bg-zinc-300"
          >
            <p>E-Money</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className={`bi bi-caret-down-fill transform transition-transform duration-700 ${
                isEMoneyOpen ? "rotate-180" : "rotate-0"
              }`}
              viewBox="0 0 16 16"
            >
              <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
            </svg>
          </button>
          <div className="flex flex-col gap-y-3 px-3">
            {eMoneyMetode.map((emethod) => (
              <div
                key={emethod.id}
                className="flex flex-col w-full rounded-xl text-black p-2 bg-white shadow-lg"
              >
                <div className="flex flex-col gap-y-2 w-full">
                  <figure className="flex flex-row justify-end w-full">
                    <img
                      alt={`Gambar-${emethod.name}`}
                      loading="lazy"
                      className="object-contain w-20 h-auto"
                      src={emethod.images}
                    />
                  </figure>
                  <hr className="border border-black" />
                  <div
                    id={`method-${emethod.id}-price`}
                    className="price GOPAY text-lg text-black font-medium"
                  >
                    Rp
                  </div>
                  {/* <hr className="border border-black" /> */}
                </div>
                <div className="flex flex-row justify-end w-full text-sm font-light">
                  {emethod.name}
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-row gap-x-2 w-full">
            <div className="grayscale-image-method grayscale relative lg:w-14 md:w-12 w-8 h-full"></div>
          </div>
        </div>
        <div
          id="Method-VirtualAccount-Content"
          className={`flex flex-col gap-y-3 w-full rounded-xl bg-slate-200 dark:bg-zinc-300 cursor-pointer overflow-hidden ${
            isVaOpen
              ? "transition-all duration-700 max-h-96"
              : "duration-700 max-h-12"
          }`}
        >
          <button
            onClick={toggleVa}
            className="flex flex-row w-full items-center justify-between px-4 py-3 text-black font-medium rounded-b-xl bg-slate-200 dark:bg-zinc-300"
          >
            <p>Virtual Account</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className={`bi bi-caret-down-fill transform transition-transform duration-700 ${
                isVaOpen ? "rotate-180" : "rotate-0"
              }`}
              viewBox="0 0 16 16"
            >
              <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
            </svg>
          </button>
          <div className="flex flex-col gap-y-3 px-3 overflow-auto">
            {vAccountMetode.map((vamethod) => (
              <div
                key={vamethod.id}
                className="flex flex-col w-full rounded-xl text-black p-2 bg-white shadow-lg"
              >
                <div className="flex flex-col gap-y-2 w-full">
                  <figure className="flex flex-row justify-end w-full">
                    <img
                      alt={`Gambar-${vamethod.name}`}
                      loading="lazy"
                      className="object-contain w-20 h-auto"
                      src={vamethod.images}
                    />
                  </figure>
                  <hr className="border border-black" />
                  <div
                    id={`method-${vamethod.id}-price`}
                    className="price GOPAY text-lg text-black font-medium"
                  >
                    Rp
                  </div>
                  {/* <hr className="border border-black" /> */}
                </div>
                <div className="flex flex-row justify-end w-full text-sm font-light">
                  {vamethod.name}
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-row gap-x-2 w-full">
            <div className="grayscale-image-method grayscale relative lg:w-14 md:w-12 w-8 h-full"></div>
          </div>
        </div>
        <div
          id="Method-ConvenienceStore-Content"
          className={`flex flex-col gap-y-3 w-full rounded-xl bg-slate-200 dark:bg-zinc-300 cursor-pointer overflow-hidden ${
            isCsOpen
              ? "transition-all duration-700 max-h-96"
              : "duration-700 max-h-12"
          }`}
        >
          <button
            onClick={toggleCs}
            className="flex flex-row w-full items-center justify-between px-4 py-3 text-black font-medium rounded-b-xl bg-slate-200 dark:bg-zinc-300"
          >
            <p>Convenience Store</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className={`bi bi-caret-down-fill transform transition-transform duration-700 ${
                isCsOpen ? "rotate-180" : "rotate-0"
              }`}
              viewBox="0 0 16 16"
            >
              <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
            </svg>
          </button>
          <div className="flex flex-col gap-y-3 px-3">
            {cStoreMetode.map((csmethod) => (
              <div
                key={csmethod.id}
                className="flex flex-col w-full rounded-xl text-black p-2 bg-white shadow-lg"
              >
                <div className="flex flex-col gap-y-2 w-full">
                  <figure className="flex flex-row justify-end w-full">
                    <img
                      alt={`Gambar-${csmethod.name}`}
                      loading="lazy"
                      className="object-contain w-20 h-auto"
                      src={csmethod.images}
                    />
                  </figure>
                  <hr className="border border-black" />
                  <div
                    id={`method-${csmethod.id}-price`}
                    className="price GOPAY text-lg text-black font-medium"
                  >
                    Rp
                  </div>
                  {/* <hr className="border border-black" /> */}
                </div>
                <div className="flex flex-row justify-end w-full text-sm font-light">
                  {csmethod.name}
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-row gap-x-2 w-full">
            <div className="grayscale-image-method grayscale relative lg:w-14 md:w-12 w-8 h-full"></div>
          </div>
        </div>
        <div
          id="Method-Saldo-Content"
          className={`flex flex-col gap-y-3 w-full rounded-xl bg-slate-200 dark:bg-zinc-300 cursor-pointer overflow-hidden ${
            isSaldoOpen
              ? "transition-all duration-700 max-h-96"
              : "duration-700 max-h-12"
          }`}
        >
          <button
            onClick={toggleSaldo}
            className="flex flex-row w-full items-center justify-between px-4 py-3 text-black font-medium rounded-b-xl bg-slate-200 dark:bg-zinc-300"
          >
            <p>Saldo (Tanpa Biaya Admin)</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className={`bi bi-caret-down-fill transform transition-transform duration-700 ${
                isSaldoOpen ? "rotate-180" : "rotate-0"
              }`}
              viewBox="0 0 16 16"
            >
              <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
            </svg>
          </button>
          <div className="flex flex-col gap-y-3 px-3">
              <div className="flex flex-col w-full rounded-xl text-black p-2 bg-white shadow-lg">
                <div className="flex flex-col gap-y-2 w-full">
                  <figure className="flex flex-row justify-end w-full">
                    <img
                      alt={`Gambar-${import.meta.env.VITE_APP_NAME}`}
                      loading="lazy"
                      className="object-contain w-20 h-10"
                      src={logoHeader}
                    />
                  </figure>
                  <hr className="border border-black" />
                  <div
                    id={`method-saldoprice`}
                    className="price GOPAY text-lg text-black font-medium"
                  >
                    Rp
                  </div>
                  {/* <hr className="border border-black" /> */}
                </div>
                <div className="flex flex-row justify-end w-full text-sm font-light">
                  Saldo Akun
                </div>
              </div>
          </div>
          <div className="flex flex-row gap-x-2 w-full">
            <div className="grayscale-image-method grayscale relative lg:w-14 md:w-12 w-8 h-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

MetodePembayaran.propTypes = {
  methods: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default MetodePembayaran;
