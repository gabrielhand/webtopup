import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoaderBanner from "../../components/loader/LoaderBanner.jsx";
import BannerOrder from "./BannerOrder.jsx";
import Quantity from "./Quantity.jsx";
import KodePromo from "./KodePromo.jsx";
import DetailAkun from "./DetailAkun.jsx";
import MetodePembayaran from "./MetodePembayaran.jsx";
import Konfirmasi from "./Konfirmasi.jsx";
import Lottie from "lottie-react";
import AnimationNoProduct from "../../assets/lottie/AnimationNoProduct.json";
import Star from "../../assets/star.png";
import QuestionImage from "../../assets/question.png";
// import GridImage from "../../assets/grid.png";
import SaleTagImage from "../../assets/sale-tag.png";
// import SaleImage from "../../assets/sale.png";
import Review from "./Review.jsx";

const Order = () => {
  const { kode } = useParams();
  const [kategori, setKategori] = useState(null);
  const [methods, setMethod] = useState(null);
  const [ratings, setRating] = useState([]);

  const [isLoadingKat, setIsLoadingKat] = useState(true);
  const [isLoadingMet, setIsLoadingMet] = useState(true);
  const [isLoadingRat, setIsLoadingRat] = useState(true);
  const [selectedSubkat, setSelectedSubkat] = useState(null);
  const [activeSection, setActiveSection] = useState("detailAkun");

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const getKategori = async () => {
    const response = await axios.get(`http://localhost:5000/kategori/${kode}`);

    setKategori(response.data);
    setIsLoadingKat(false);
  };

  const getMethod = async () => {
    const response = await axios.get("http://localhost:5000/method");

    setMethod(response.data);
    setIsLoadingMet(false);
  };

  const getRating = async () => {
    const response = await axios.get(
      `http://localhost:5000/rating/kategori/${kode}`
    );

    setRating(response.data);
    setIsLoadingRat(false);
  };

  useEffect(() => {
    if (kategori && kategori.subkategori) {
      const defaultSubkat = kategori.subkategori.find(
        (subkat) => subkat.name === "Topup"
      );
      if (defaultSubkat) {
        setSelectedSubkat(defaultSubkat.id);
      }
    }
  }, [kategori]);

  useEffect(() => {
    getKategori();
    getMethod();
    getRating();
  }, [kode]);

  const ForDetailAkun = {
    kode: kategori?.data?.kode,
    placeholder_1: kategori?.data?.placeholder_1,
    placeholder_2: kategori?.data?.placeholder_2,
    ket_id: kategori?.data?.ket_id,
  };

  return (
    <div className="flex flex-col gap-y-4 py-6">
      <div className="lg:px-16 md:px-10 px-4">
        <div className="relative rounded-xl w-full min-h-96 overflow-hidden">
          {isLoadingKat ? (
            <LoaderBanner />
          ) : (
            <BannerOrder data={kategori.data} />
          )}
        </div>
      </div>
      {isLoadingKat ? (
        <div className="rounded-md px-3 py-1.5 border border-[#4169e1] text-black dark:text-white">
          Loading...
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 md:grid-cols-1 grid-cols-1 lg:gap-x-4 gap-y-2 lg:ps-16 lg:pl-16 lg:pe-14 lg:pr-14 md:px-10 px-2">
          <div className="col-span-2 flex flex-col gap-y-3 lg:py-4 lg:px-0 md:p-0 p-2">
            <div className="flex flex-row justify-between bg-[#4169e1] rounded-xl shadow-lg overflow-visible">
              <div className="px-5 py-3 text-white font-medium">Pilih Nominal</div>
              <figure className="relative">
                <img src={SaleTagImage} alt="" className="absolute lg:right-6 right-8 -top-2 max-w-16 max-h-16" />
              </figure>
            </div>
            <div className="flex flex-row flex-wrap gap-3">
              {[...kategori.subkategori].reverse().map((subkat) => (
                <div
                  key={subkat.code}
                  className={`flex flex-row gap-x-2 items-center rounded-xl shadow-lg cursor-pointer px-5 py-2 ${
                    selectedSubkat === subkat.id
                      ? "ring-2 ring-[#4169e1] dark:ring-0 bg-white dark:bg-[#4169e1] dark:text-white duration-300"
                      : "bg-white hover:brightness-95 dark:bg-[#404145] dark:hover:brightness-125 duration-300"
                  }`}
                  onClick={() => setSelectedSubkat(subkat.id)}
                >
                  {subkat.sub_logo ? (
                    <img
                      src={subkat.sub_logo}
                      alt={`Gambar Sub-Kategori-${subkat.name}`}
                      className="lg:max-h-12 md:max-h-10 max-h-6"
                    />
                  ) : null}
                  <p className="text-black dark:text-white">{subkat.name}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-row w-full bg-[#4169e1] p-1 rounded-xl shadow-lg"></div>
            {kategori.layanan.filter(
              (layanan) => layanan.sub_category_id === selectedSubkat
            ).length === 0 ? (
              <div className="flex flex-col gap-y-2 justify-center items-center text-center w-full">
                <Lottie animationData={AnimationNoProduct} loop={true} />
                <p className="flex flex-row text-black dark:text-white">
                  Oupss, maaf layanan belum tersedia...
                </p>
              </div>
            ) : (
              <div className="grid gap-2 lg:grid-cols-3 md:grid-cols-3 grid-cols-3">
                {kategori.layanan
                  .filter(
                    (layanan) => layanan.sub_category_id === selectedSubkat
                  )
                  .map((layanan) => (
                    <div key={layanan.id} className="nominal-item">
                      <input
                        key={layanan}
                        id={`nominal-${layanan.id}`}
                        type="radio"
                        name="nominal"
                        value={layanan.id}
                        className="hidden"
                      />
                      <div className="flex flex-row justify-center rounded-xl cursor-pointer w-full h-full shadow-lg bg-white dark:bg-[#404145] hover:brightness-95 dark:hover:brightness-125 px-4 py-2.5 duration-300">
                        <div className="flex flex-col justify-center items-center text-center gap-y-2">
                          <p className="text-black dark:text-white">
                            {layanan.layanan}
                          </p>
                          <p className="text-black dark:text-white">
                            Rp{" "}
                            {layanan.harga.toLocaleString("id-ID", {
                              styles: "currency",
                              currency: "IDR",
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
            {/* <div className="flex flex-col w-full rounded-xl bg-[#323336] overflow-hidden"></div> */}
          </div>
          <div className="col-span-1 flex flex-col gap-y-3 overflow-hidden lg:py-4 md:p-0 p-2">
            <div className="flex flex-row gap-x-2">
              <div
                className={`flex flex-row justify-between rounded-xl shadow-lg transition-all duration-500 overflow-visible ${
                  activeSection === "detailAkun"
                    ? "bg-[#4169e1] text-white w-[75%]"
                    : "bg-white text-black dark:bg-[#323336] dark:text-white cursor-pointer w-[42%]"
                }`}
                onClick={() => handleSectionChange("detailAkun")}
              >
                <div className="px-5 py-3 flex flex-nowrap gap-x-1 font-medium">
                  <p>Detail</p>
                  <p>Akun</p>
                </div>
                {activeSection === "detailAkun" ? (
                  <figure className="relative">
                    <img
                      src={QuestionImage}
                      alt="Question-Image"
                      className="absolute lg:right-6 right-8 -top-3 max-w-[72px] max-h-[72px]"
                    />
                  </figure>
                ) : null}
              </div>
              <div
                className={`flex flex-row justify-between rounded-xl shadow-lg transition-all duration-500 ${
                  activeSection === "review"
                    ? "bg-[#4169e1] text-white w-[75%]"
                    : "bg-white text-black dark:bg-[#323336] dark:text-white cursor-pointer w-[28%]"
                }`}
                onClick={() => handleSectionChange("review")}
              >
                <div className="px-5 py-3 font-medium">Ulasan</div>
                {activeSection === "review" ? (
                  <figure className="relative">
                    <img
                      src={Star}
                      alt="Star-Image"
                      className="absolute lg:right-6 right-8 -top-4 max-w-20 max-h-20"
                    />
                  </figure>
                ) : null}
              </div>
            </div>
            <div className="flex flex-row w-full">
              <div
                className={`flex flex-col gap-y-5 transition-all duration-500 ${
                  activeSection === "detailAkun"
                    ? "w-full opacity-100"
                    : "w-0 opacity-0 z-10"
                }`}
              >
                <DetailAkun detailAkun={ForDetailAkun} />
                <Quantity />
                <KodePromo />
                <MetodePembayaran methods={isLoadingMet ? "" : methods} />
                <Konfirmasi />
              </div>
              <div
                className={`flex flex-col gap-y-3 transition-all duration-500 ${
                  activeSection === "review"
                    ? "w-full opacity-100"
                    : "w-0 opacity-0 z-20"
                }`}
              >
                {isLoadingRat ? null : <Review allratings={ratings} />}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Order;
