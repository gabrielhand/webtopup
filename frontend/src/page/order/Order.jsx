import axios from "axios";
import { useEffect, useRef, useState } from "react";
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
  const [selectedNominal, setSelectedNominal] = useState(null);
  const [price, setPrice] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

  const [isLoading, setIsLoading] = useState(false);

  const [userId, setUserId] = useState("");
  const [zone, setZone] = useState("");

  const [selectedPayment, setSelectedPayment] = useState(null);

  const [kodeVoucher, setKodeVoucher] = useState("");

  const [nomor, setNomor] = useState(null);

  const modalKonfirmasiOrder = useRef(null);

  const [kategoriLayanan, setKategoriLayanan] = useState([]);
  const [nickname, setNickname] = useState("");
  const [Id, setId] = useState("");
  const [zoneId, setZoneId] = useState("");
  const [layanan, setLayanan] = useState("");
  const [harga, setHarga] = useState("");
  const [payment, setPayment] = useState("");
  const [nomorWa, setNomorWa] = useState("");

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

  const konfirmasiOrder = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("uid", userId);
      formData.append("zone", zone);
      formData.append("service", selectedNominal);
      formData.append("payment_method", selectedPayment);
      formData.append("nomor", nomor);
      formData.append("voucher", kodeVoucher);

      const response = await axios.post(
        "http://localhost:5000/order/konfirmasi-data",
        formData
      );

      setKategoriLayanan(response.data.kategori);
      setNickname(response.data.username);
      setId(response.data.user_id);
      setZoneId(response.data.zone);
      setLayanan(response.data.layanan);
      setHarga(response.data.harga);
      setPayment(response.data.paymentMethod.name);
      setNomorWa(response.data.nomor);
      modalKonfirmasiOrder.current.showModal();
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
      setIsLoading(false);
    }
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

  useEffect(() => {
    const fetchPrice = async () => {
      if (selectedNominal) {
        try {
          const formData = new FormData();
          formData.append("nominal", selectedNominal);

          const response = await axios.post(
            `http://localhost:5000/layanan/price`,
            formData
          );

          setPrice(response.data.harga);
        } catch (error) {
          console.error("Error fetching price: ", error.message);
        }
      }
    };

    fetchPrice();
  }, [selectedNominal]);

  useEffect(() => {
    if (price && quantity) {
      setTotalPrice(price * quantity);
    }
  }, [price, quantity]);

  const handleNominalChange = (nominal) => {
    setSelectedNominal(nominal);
  };

  const ForDetailAkun = {
    kode: kategori?.data?.kode,
    server_id: kategori?.data.server_id,
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
              <div className="px-5 py-3 text-white font-medium">
                Pilih Nominal
              </div>
              <figure className="relative">
                <img
                  src={SaleTagImage}
                  alt=""
                  className="absolute lg:right-6 right-8 -top-2 max-w-16 max-h-16"
                />
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
                        onChange={() => handleNominalChange(layanan.id)}
                      />
                      <label
                        htmlFor={`nominal-${layanan.id}`}
                        className={`flex flex-row justify-center rounded-xl cursor-pointer w-full h-full shadow-lg bg-white dark:bg-[#404145] hover:brightness-95 dark:hover:brightness-125 px-4 py-2.5 ${
                          selectedNominal === layanan.id
                            ? "outline outline-blue-500 duration-100"
                            : "duration-300"
                        }`}
                      >
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
                      </label>
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
                <DetailAkun
                  kode={kategori.kode}
                  userId={userId}
                  setUserId={setUserId}
                  zone={zone}
                  setZone={setZone}
                  detailAkun={ForDetailAkun}
                />
                <Quantity quantity={quantity} setQuantity={setQuantity} />
                <KodePromo
                  kodeVoucher={kodeVoucher}
                  setKodeVoucher={setKodeVoucher}
                />
                {isLoadingMet ? (
                  "Loading..."
                ) : (
                  <MetodePembayaran
                    methods={methods}
                    totalPrice={totalPrice}
                    selectedPayment={selectedPayment}
                    setSelectedPayment={setSelectedPayment}
                    isDisabled={!selectedNominal}
                  />
                )}
                <Konfirmasi
                  nomor={nomor}
                  setNomor={setNomor}
                  isLoading={isLoading}
                  konfirmasiOrder={konfirmasiOrder}
                />
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
      <dialog
        id="modal_confirm_order"
        className="modal"
        ref={modalKonfirmasiOrder}
      >
        <div className="relative flex flex-col gap-4 p-4 rounded-xl w-6/12 overflow-hidden max-w-5xl bg-white dark:bg-[#161721]">
          <div className="flex flex-col items-center">
            <h3 className="font-semibold text-xl text-black dark:text-white">
              Konfirmasi Pesanan Kamu
            </h3>
            <p className="text-black dark:text-white font-light">
              Pastikan semua sudah sesuai ya!
            </p>
            <div className="mt-4 flex flex-col gap-2 items-center">
              <img
                src={kategoriLayanan.thumbnail}
                alt={`Thumbnail-${kategoriLayanan.nama}`}
                className="w-20 rounded-sm"
              />
              <p className="text-black dark:text-white font-light">
                {kategoriLayanan.nama}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2 p-3 rounded-lg bg-zinc-300 dark:bg-black">
            <div className="flex flex-row justify-between">
              <p className="font-medium text-black dark:text-white">Nickname</p>
              <p className="text-black dark:text-white">{nickname}</p>
            </div>
            <div className="flex flex-row justify-between">
              <p className="font-medium text-black dark:text-white">ID</p>
              <p className="text-black dark:text-white">{Id}</p>
            </div>
            <div className="flex flex-row justify-between">
              <p className="font-medium text-black dark:text-white">Server</p>
              <p className="text-black dark:text-white">{zoneId}</p>
            </div>
            <div className="flex flex-row justify-between">
              <p className="font-medium text-black dark:text-white">Layanan</p>
              <p className="text-black dark:text-white">{layanan}</p>
            </div>
          </div>
          <div className="flex flex-col gap-2 p-3 rounded-lg bg-zinc-300 dark:bg-black">
            <div className="flex flex-row justify-between">
              <p className="font-medium text-black dark:text-white">Payment</p>
              <p className="text-black dark:text-white">{payment}</p>
            </div>
            <div className="flex flex-row justify-between">
              <p className="font-medium text-black dark:text-white">Harga</p>
              <p className="text-black dark:text-white">
                Rp{" "}
                {harga.toLocaleString("id-ID", {
                  styles: "currency",
                  currency: "IDR",
                })}
              </p>
            </div>
            <div className="flex flex-row justify-between">
              <p className="font-medium text-black dark:text-white">Kontak</p>
              <p className="text-black dark:text-white">{nomorWa}</p>
            </div>
          </div>
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div className="flex flex-row justify-end">
            <button
              type="button"
              className="px-10 py-2 bg-blue-500 rounded-lg text-white font-medium"
            >
              Pesan Sekarang!
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Order;
