import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoaderBanner from "../../components/loader/LoaderBanner";
import Lottie from "lottie-react";
import PaymentSuccess from "../../assets/lottie/PaymentSuccessAnimation.json";
import PaymentFailed from "../../assets/lottie/PaymentFailedAnimation.json";

const Invoice = () => {
  const { order } = useParams();

  const [isLoadingInvoice, setLoadingInvoice] = useState(true);
  const [invoice, setInvoice] = useState(null);

  const getInvoice = async () => {
    const response = await axios.get(`http://localhost:5000/invoice/${order}`);

    setInvoice(response.data.invoice);
    setLoadingInvoice(false);
    console.log(response.data);
  };

  useEffect(() => {
    getInvoice();
  }, [order]);
  return (
    <div className="flex flex-col lg:gap-y-6 md:gap-y-6 gap-y-4 lg:px-16 md:px-10 px-4 py-6">
      <div className="relative rounded-xl w-full min-h-52 overflow-hidden">
        {isLoadingInvoice ? (
          <LoaderBanner />
        ) : (
          <>
            <img
              id={`banner-${invoice.layananDetail.kategori.nama}`}
              src={invoice.layananDetail.kategori.bannerlayanan}
              alt={`Banner-${invoice.layananDetail.kategori.nama}`}
              loading="lazy"
              className="absolute object-cover object-center inset-0 w-full h-full"
            />
            <div
              className={`absolute bg-black/60 min-h-[45%] flex flex-col w-full text-white lg:ps-20 md:ps-16 ps-10 lg:pe-20 md:pe-16 pe-4 py-4 bottom-0 transform transition-transform duration-1000 ease-in-out`}
            >
              <div className="flex flex-row w-full lg:gap-x-6 md:gap-x-6 gap-x-3">
                <div className="flex flex-col gap-1">
                  <p className="lg:text-4xl font-medium text-white">Invoice</p>
                  <p className="lg:text-base font-light">
                    Pesanan kamu{" "}
                    <span className="text-yellow-500 font-semibold">
                      {invoice.order_id}
                    </span>{" "}
                    menunggu pembayaran sebelum diproses.
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      {isLoadingInvoice ? (
        <p className="text-black dark:text-white font-medium">Loading...</p>
      ) : (
        <div className="flex flex-col gap-y-2">
          <div className="grid grid-cols-3 gap-3">
            <div className="flex flex-row justify-center rounded-lg p-4 text-sm text-white bg-orange-400">
              Pembayaran
            </div>
            <div className="flex flex-row justify-center rounded-lg p-4 text-sm text-white bg-blue-500">
              Proses
            </div>
            <div className="flex flex-row justify-center rounded-lg p-4 text-sm text-white bg-green-400">
              Selesai
            </div>
          </div>
          <div className="flex flex-row rounded-xl bg-white dark:bg-[#404145] p-6">
            <div className="grid lg:grid-cols-2 gap-x-8 gap-y-4 py-2">
              <div className="col-span-1 flex flex-col gap-y-6">
                <div className="flex flex-row gap-x-5">
                  <figure>
                    <img
                      src={invoice.layananDetail.kategori.thumbnail}
                      alt={`Thumbnail-${invoice.layananDetail.kategori.nama}`}
                      className="w-32 rounded-lg"
                    />
                  </figure>
                  <div className="flex flex-col gap-y-6">
                    <div className="flex flex-col">
                      <p className="text-xl text-black dark:text-white font-medium">
                        {invoice.layananDetail.kategori.nama}
                      </p>
                      <p className="text-sm text-black dark:text-white font-light">
                        {invoice.layananDetail.layanan}
                      </p>
                    </div>
                    <div className="grid grid-cols-7 gap-1">
                      <div className="col-span-2 text-sm text-black dark:text-white font-light">
                        Nickname
                      </div>
                      <div className="col-span-5 text-sm text-black dark:text-white">
                        {invoice.nickname}
                      </div>
                      <div className="col-span-2 text-sm text-black dark:text-white font-light">
                        User ID
                      </div>
                      <div className="col-span-5 text-sm text-black dark:text-white">
                        {invoice.user_id}
                      </div>
                      {invoice.layananDetail.kategori.kode ===
                        "mobile-legends" && (
                        <>
                          <div className="col-span-2 text-sm text-black dark:text-white font-light">
                            Server
                          </div>
                          <div className="col-span-5 text-sm text-black dark:text-white">
                            {invoice.zone}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-y-4">
                  <p className="text-xl text-black dark:text-white font-medium">
                    Rincian Pembayaran
                  </p>
                  <div className="flex flex-col gap-y-4 rounded-lg p-3 bg-white dark:bg-zinc-800">
                    <div className="flex flex-row justify-between">
                      <p className="text-sm text-black dark:text-white font-light">
                        Harga
                      </p>
                      <p className="text-sm text-black dark:text-white">
                        Rp{" "}
                        {invoice.harga_per_item.toLocaleString("id-ID", {
                          styles: "currency",
                          currency: "IDR",
                        })}
                      </p>
                    </div>
                    <div className="flex flex-row justify-between">
                      <p className="text-sm text-black dark:text-white font-light">
                        Jumlah
                      </p>
                      <p className="text-sm text-black dark:text-white">
                        {invoice.jumlah}x
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-y-4 rounded-lg p-3 bg-white dark:bg-zinc-800">
                    <div className="flex flex-row justify-between">
                      <p className="text-sm text-black dark:text-white font-light">
                        Total
                      </p>
                      <p className="text-sm text-black dark:text-white">
                        Rp{" "}
                        {invoice.pembayaran.harga.toLocaleString("id-ID", {
                          styles: "currency",
                          currency: "IDR",
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-row rounded-lg p-3 bg-white dark:bg-black">
                    <p className="text-sm text-black dark:text-white">
                      {invoice.pembayaran.metode === "SALDO" ||
                      invoice.pembayaran.metode === "Saldo"
                        ? "Saldo akun yang tersedia dapat langsung digunakan untuk menyelesaikan pembayaran. Nikmati transaksi yang lebih praktis hanya dengan saldo yang Anda miliki."
                        : invoice.pembayaran.metode === "SP"
                        ? "QRIS memberikan kemudahan bertransaksi dengan aplikasi pembayaran favorit seperti OVO, Dana, dan ShopeePay. Silakan scan kode QR yang tertera untuk melakukan pembayaran."
                        : ""}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-span-1 flex flex-col gap-y-6">
                <div className="flex flex-col lg:items-end">
                  <p className="text-xl text-black dark:text-white font-medium">
                    Metode Pembayaran
                  </p>
                  <p className="text-sm text-black dark:text-white font-light">
                    {invoice.pembayaran.metode}
                  </p>
                </div>
                <div className="flex flex-row justify-center items-center text-center">
                  {invoice.status === "Success" ? (
                    <Lottie
                      className="max-w-44"
                      animationData={PaymentSuccess}
                      loop={true}
                    />
                  ) : invoice.status === "Batal" ? (
                    <Lottie
                      className="max-w-44"
                      animationData={PaymentFailed}
                      loop={true}
                    />
                  ) : null}
                </div>
                <div className="grid grid-cols-8 gap-3">
                  <p className="col-span-3 flex flex-row items-center text-sm text-black dark:text-white font-light">
                    Nomor Invoice
                  </p>
                  <div className="col-span-5">
                    <div className="inline-flex flex-row gap-x-2 items-center p-1.5 rounded-md border border-zinc-500 text-sm text-black dark:text-white font-medium">
                      {invoice.order_id}
                      <span className="cursor-pointer">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-copy"
                          stroke="currentColor"
                          strokeWidth={0.5}
                          viewBox="0 0 16 16"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                  <p className="col-span-3 flex flex-row items-center text-sm text-black dark:text-white font-light"></p>
                  <p className="col-span-5 text-sm text-black dark:text-white font-medium"></p>
                  <p className="col-span-3 flex flex-row items-center text-sm text-black dark:text-white font-light">
                    No Whatsapp
                  </p>
                  <p className="col-span-5 flex flex-row items-center text-sm text-black dark:text-white font-medium">
                    0{invoice.pembayaran.no_pembeli}
                  </p>
                  <p className="col-span-3 flex flex-row items-center text-sm text-black dark:text-white font-light">
                    Pembayaran
                  </p>
                  <div className="col-span-5">
                    <figure className="w-12">
                      <img
                        src={invoice.pembayaran.method.images}
                        alt={`Method-${invoice.pembayaran.metode}`}
                        className="object-cover"
                      />
                    </figure>
                  </div>
                  <p className="col-span-3 flex flex-row items-center text-sm text-black dark:text-white font-light">
                    Status
                  </p>
                  <div className="col-span-5 flex flex-row justify-start">
                    <div
                      className={`inline-flex flex-row items-center text-center text-sm font-medium rounded-lg p-2 text-white ${
                        invoice.status === "Success"
                          ? "bg-green-500"
                          : invoice.status === "Batal"
                          ? "bg-red-500"
                          : "bg-black"
                      }`}
                    >
                      {invoice.status}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Invoice;
