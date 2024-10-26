import { useOutletContext } from "react-router-dom";
import BreadCrumbs from "../../components/breadcrumbs/BreadCrumbs";
import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const { logoHeader, user } = useOutletContext();
  const [pembelian, setPembelian] = useState();

  const getHitungPembelian = async () => {
    const response = await axios.get(
      "http://localhost:5000/pembelianfordashboardadmin"
    );

    setPembelian(response.data);

    // console.log(response.data);
  };

  useEffect(() => {
    getHitungPembelian();
  }, []);

  return (
    <div className="flex flex-col gap-y-4 w-full">
      <BreadCrumbs />
      {user && pembelian ? (
        <>
          <div className="flex flex-row items-center rounded-xl bg-white dark:bg-[#1e1e2d] w-full shadow-lg">
            <div className="flex flex-row items-center gap-x-5 px-4 py-5">
              <figure className="ms-10 overflow-hidden">
                <img
                  src={logoHeader}
                  alt={`logo-${import.meta.env.VITE_APP_NAME}`}
                  className="max-w-16 object-cover"
                />
              </figure>
              <div className="flex flex-col gap-y-1 font-semibold">
                <div className="text-black dark:text-white text-xl lg:text-2xl">
                  Halo, Selamat Datang Kembali
                </div>
                <div className="text-purple-500 text-base lg:text-xl">
                  {user.role}
                </div>
              </div>
            </div>
          </div>
          <div className="text-2xl text-black dark:text-white font-semibold my-4">
            Laporan Harian
          </div>
          <div className="grid lg:grid-cols-3 lg:grid-rows-2 gap-x-6 gap-y-9 w-full">
            <div className="flex flex-row gap-4 bg-white dark:bg-[#1e1e2d] rounded-xl p-5 lg:min-h-40 shadow-lg">
              <div id="icon-total-order-today">
                <div className="bg-violet-400 text-white px-2 py-3 rounded-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    fill="currentColor"
                    className="bi bi-cart-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                  </svg>
                </div>
              </div>
              <div className="flex flex-col">
                <p className="text-zinc-800 dark:text-zinc-400 font-medium">
                  Total Order Today
                </p>
                <p className="text-black dark:text-white lg:text-base font-semibold">
                  Rp{" "}
                  {pembelian.totalPembelianToday.toLocaleString("id-ID", {
                    styles: "currency",
                    currency: "IDR",
                  })}
                </p>
                <div className="text-sm mt-2 text-zinc-800 dark:text-zinc-400">
                  <p>
                    Dengan total {pembelian.banyakPembelianToday}x pemesanan
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-row gap-4 bg-white dark:bg-[#1e1e2d] rounded-xl p-5 lg:min-h-40 shadow-lg">
              <div id="icon-total-pending-today">
                <div className="bg-orange-400 text-white px-2 py-3 rounded-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    fill="currentColor"
                    className="bi bi-clock-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z" />
                  </svg>
                </div>
              </div>
              <div className="flex flex-col">
                <p className="text-zinc-800 dark:text-zinc-400 font-medium">
                  Order Pending Today
                </p>
                <p className="text-black dark:text-white lg:text-base font-semibold">
                  Rp{" "}
                  {pembelian.totalPembelianPendingToday.toLocaleString(
                    "id-ID",
                    {
                      styles: "currency",
                      currency: "IDR",
                    }
                  )}
                </p>
                <div className="text-sm mt-2 text-zinc-800 dark:text-zinc-400">
                  <p>
                    Dengan total {pembelian.banyakPembelianPendingToday}x
                    pemesanan
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-row gap-4 bg-white dark:bg-[#1e1e2d] rounded-xl p-5 lg:min-h-40 shadow-lg">
              <div id="icon-total-success-today">
                <div className="bg-green-400 text-white px-2 py-3 rounded-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    fill="currentColor"
                    className="bi bi-send-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z" />
                  </svg>
                </div>
              </div>
              <div className="flex flex-col">
                <p className="text-zinc-800 dark:text-zinc-400 font-medium">
                  Order Success Today
                </p>
                <p className="text-black dark:text-white lg:text-base font-semibold">
                  Rp{" "}
                  {pembelian.totalPembelianSuccessToday.toLocaleString(
                    "id-ID",
                    {
                      styles: "currency",
                      currency: "IDR",
                    }
                  )}
                </p>
                <div className="text-sm mt-2 text-zinc-800 dark:text-zinc-400">
                  <p>
                    Dengan total {pembelian.banyakPembelianSuccessToday}x
                    pemesanan
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-row gap-4 bg-white dark:bg-[#1e1e2d] rounded-xl p-5 lg:min-h-40 shadow-lg">
              <div id="icon-total-cancel-today">
                <div className="bg-red-400 text-white px-2 py-3 rounded-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    fill="currentColor"
                    className="bi bi-exclamation-triangle-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                  </svg>
                </div>
              </div>
              <div className="flex flex-col">
                <p className="text-zinc-800 dark:text-zinc-400 font-medium">
                  Order Cancel Today
                </p>
                <p className="text-black dark:text-white lg:text-base font-semibold">
                  Rp{" "}
                  {pembelian.totalPembelianBatalToday.toLocaleString("id-ID", {
                    styles: "currency",
                    currency: "IDR",
                  })}
                </p>
                <div className="text-sm mt-2 text-zinc-800 dark:text-zinc-400">
                  <p>
                    Dengan total {pembelian.banyakPembelianBatalToday}x
                    pemesanan
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-row gap-4 bg-white dark:bg-[#1e1e2d] rounded-xl p-5 lg:min-h-40 shadow-lg">
              <div id="icon-total-deposit-today">
                <div className="bg-sky-400 text-white px-2 py-3 rounded-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    fill="currentColor"
                    className="bi bi-ticket-perforated-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 4.5A1.5 1.5 0 0 1 1.5 3h13A1.5 1.5 0 0 1 16 4.5V6a.5.5 0 0 1-.5.5 1.5 1.5 0 0 0 0 3 .5.5 0 0 1 .5.5v1.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 11.5V10a.5.5 0 0 1 .5-.5 1.5 1.5 0 1 0 0-3A.5.5 0 0 1 0 6zm4-1v1h1v-1zm1 3v-1H4v1zm7 0v-1h-1v1zm-1-2h1v-1h-1zm-6 3H4v1h1zm7 1v-1h-1v1zm-7 1H4v1h1zm7 1v-1h-1v1zm-8 1v1h1v-1zm7 1h1v-1h-1z" />
                  </svg>
                </div>
              </div>
              <div className="flex flex-col">
                <p className="text-zinc-800 dark:text-zinc-400 font-medium">
                  Order Deposit Today
                </p>
                <p className="text-black dark:text-white lg:text-base font-semibold">
                  Rp{" "}
                  {pembelian.totalDepositToday.toLocaleString("id-ID", {
                    styles: "currency",
                    currency: "IDR",
                  })}
                </p>
                <div className="text-sm mt-2 text-zinc-800 dark:text-zinc-400">
                  <p>Dengan total {pembelian.banyakDepositToday}x pemesanan</p>
                </div>
              </div>
            </div>
          </div>
          <div className="text-2xl text-black dark:text-white font-semibold my-4">
            Laporan Keseluruhan
          </div>
          <div className="grid lg:grid-cols-3 lg:grid-rows-2 gap-x-6 gap-y-9 w-full">
            <div className="flex flex-row gap-4 bg-white dark:bg-[#1e1e2d] rounded-xl p-5 lg:min-h-40 shadow-lg">
              <div id="icon-total-order-all">
                <div className="bg-violet-400 text-white px-2 py-3 rounded-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    fill="currentColor"
                    className="bi bi-cart-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                  </svg>
                </div>
              </div>
              <div className="flex flex-col">
                <p className="text-zinc-800 dark:text-zinc-400 font-medium">
                  Total All Order
                </p>
                <p className="text-black dark:text-white lg:text-base font-semibold">
                  Rp{" "}
                  {pembelian.total_keseluruhan_pembelian.toLocaleString(
                    "id-ID",
                    {
                      styles: "currency",
                      currency: "IDR",
                    }
                  )}
                </p>
                <div className="text-sm mt-2 text-zinc-800 dark:text-zinc-400">
                  <p>
                    Dengan total {pembelian.banyak_keseluruhan_pembelian}x
                    pemesanan
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-row gap-4 bg-white dark:bg-[#1e1e2d] rounded-xl p-5 lg:min-h-40 shadow-lg">
              <div id="icon-total-pending-all">
                <div className="bg-orange-400 text-white px-2 py-3 rounded-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    fill="currentColor"
                    className="bi bi-clock-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z" />
                  </svg>
                </div>
              </div>
              <div className="flex flex-col">
                <p className="text-zinc-800 dark:text-zinc-400 font-medium">
                  Total Order Pending
                </p>
                <p className="text-black dark:text-white lg:text-base font-semibold">
                  Rp{" "}
                  {pembelian.total_keseluruhan_pembelian_pending.toLocaleString(
                    "id-ID",
                    {
                      styles: "currency",
                      currency: "IDR",
                    }
                  )}
                </p>
                <div className="text-sm mt-2 text-zinc-800 dark:text-zinc-400">
                  <p>
                    Dengan total{" "}
                    {pembelian.banyak_keseluruhan_pembelian_pending}x pemesanan
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-row gap-4 bg-white dark:bg-[#1e1e2d] rounded-xl p-5 lg:min-h-40 shadow-lg">
              <div id="icon-total-success-all">
                <div className="bg-green-400 text-white px-2 py-3 rounded-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    fill="currentColor"
                    className="bi bi-send-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z" />
                  </svg>
                </div>
              </div>
              <div className="flex flex-col">
                <p className="text-zinc-800 dark:text-zinc-400 font-medium">
                  Total Order Success
                </p>
                <p className="text-black dark:text-white lg:text-base font-semibold">
                  Rp{" "}
                  {pembelian.total_keseluruhan_pembelian_berhasil.toLocaleString(
                    "id-ID",
                    {
                      styles: "currency",
                      currency: "IDR",
                    }
                  )}
                </p>
                <div className="text-sm mt-2 text-zinc-800 dark:text-zinc-400">
                  <p>
                    Dengan total{" "}
                    {pembelian.banyak_keseluruhan_pembelian_berhasil}x pemesanan
                  </p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-3 grid lg:grid-rows-1 lg:grid-cols-2 gap-x-6 gap-y-9">
              <div className="flex flex-row gap-4 bg-white dark:bg-[#1e1e2d] rounded-xl p-5 lg:min-h-40 shadow-lg">
                <div id="icon-total-cancel-all">
                  <div className="bg-red-400 text-white px-2 py-3 rounded-md">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      fill="currentColor"
                      className="bi bi-exclamation-triangle-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                    </svg>
                  </div>
                </div>
                <div className="flex flex-col">
                  <p className="text-zinc-800 dark:text-zinc-400 font-medium">
                    Total Order Cancel
                  </p>
                  <p className="text-black dark:text-white lg:text-base font-semibold">
                    Rp{" "}
                    {pembelian.total_keseluruhan_pembelian_batal.toLocaleString(
                      "id-ID",
                      {
                        styles: "currency",
                        currency: "IDR",
                      }
                    )}
                  </p>
                  <div className="text-sm mt-2 text-zinc-800 dark:text-zinc-400">
                    <p>
                      Dengan total{" "}
                      {pembelian.banyak_keseluruhan_pembelian_batal}x pemesanan
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-row gap-4 bg-white dark:bg-[#1e1e2d] rounded-xl p-5 lg:min-h-40 shadow-lg">
                <div id="icon-total-deposit-all">
                  <div className="bg-sky-400 text-white px-2 py-3 rounded-md">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      fill="currentColor"
                      className="bi bi-send-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z" />
                    </svg>
                  </div>
                </div>
                <div className="flex flex-col">
                  <p className="text-zinc-800 dark:text-zinc-400 font-medium">
                    Total Order Deposit
                  </p>
                  <p className="text-black dark:text-white lg:text-base font-semibold">
                    Rp{" "}
                    {pembelian.total_keseluruhan_deposit.toLocaleString(
                      "id-ID",
                      {
                        styles: "currency",
                        currency: "IDR",
                      }
                    )}
                  </p>
                  <div className="text-sm mt-2 text-zinc-800 dark:text-zinc-400">
                    <p>
                      Dengan total {pembelian.banyak_keseluruhan_deposit}x
                      pemesanan
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-2xl text-black dark:text-white font-semibold my-4">
            Keuntungan Keseluruhan
          </div>
          <div className="flex flex-row gap-4 items-center rounded-xl bg-white dark:bg-[#1e1e2d] w-full p-5 shadow-lg">
            <div id="icon-total-keuntungan-all">
              <div className="bg-violet-400 text-white px-2 py-3 rounded-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  className="bi bi-cart-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                </svg>
              </div>
            </div>
            <div className="flex flex-col gap-y-1">
              <p className="text-zinc-800 dark:text-zinc-400 font-medium">
                Keuntungan Bersih Keseluruhan
              </p>
              <p className="text-black dark:text-white lg:text-base font-semibold">
                Rp{" "}
                {pembelian.keuntungan_bersih.toLocaleString("id-ID", {
                  styles: "currency",
                  currency: "IDR",
                })}
              </p>
            </div>
          </div>
        </>
      ) : (
        <div className="text-black dark:text-black">Loading...</div>
      )}
    </div>
  );
};

export default Dashboard;
