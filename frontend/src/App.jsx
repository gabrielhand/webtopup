import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./page/home/Home";
import Main from "./components/main/Main";
import AllGames from "./page/allgames/AllGames";
import CekTransaksi from "./page/cek/CekTransaksi";
import Services from "./page/services/Services";
import Order from "./page/order/Order";
import MainLoginRegister from "./page/authentication/MainLoginRegister";
import { useEffect, useState } from "react";
import axios from "axios";
import Me from "./page/me/Me";
import MainDashboardUser from "./page/me/MainDashboardUser";
import RiwayatPesanan from "./page/me/RiwayatPesanan";
import Dashboard from "./admin/page/dashboard/Dashboard";
import MainDashboardAdmin from "./admin/components/main/MainDashboardAdmin";
import SemuaPesanan from "./admin/page/pesanan/SemuaPesanan";
import PesananJoki from "./admin/page/pesanan/PesananJoki";
import PesananGiftSkin from "./admin/page/pesanan/PesananGiftSkin";
import PesananVilog from "./admin/page/pesanan/PesananVilog";
import MemberDeposit from "./admin/page/member/MemberDeposit";
import KelolaMember from "./admin/page/member/KelolaMember";
import Kategori from "./admin/page/produk/Kategori";
import SubKategori from "./admin/page/produk/SubKategori";
import Tipe from "./admin/page/produk/Tipe";
import Layanan from "./admin/page/produk/Layanan";
import Voucher from "./admin/page/produk/Voucher";
import Slider from "./admin/page/setting/Slider";
import Payment from "./admin/page/setting/Payment";
import Website from "./admin/page/setting/website/Website";
import Invoice from "./page/invoice/Invoice";

const router = (settingweb, isDarkMode, toggleDarkMode, getSettingWeb) =>
  createBrowserRouter([
    {
      element: (
        <Main
          settingweb={settingweb}
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
        />
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/allgames",
          element: <AllGames />,
        },
        {
          path: "/cari",
          element: <CekTransaksi />,
        },
        {
          path: "/services",
          element: <Services />,
        },
        {
          path: "/order/:kode",
          element: <Order />,
        },
        {
          path: "/invoice/:order",
          element: <Invoice />,
        },
        {
          element: <MainDashboardUser />,
          children: [
            {
              path: "/me",
              element: <Me />,
            },
            {
              path: "/riwayat",
              element: <RiwayatPesanan />,
            },
          ],
        },
      ],
    },
    {
      path: "/login",
      element: (
        <MainLoginRegister settingweb={settingweb} isDarkMode={isDarkMode} />
      ),
    },
    {
      element: (
        <MainDashboardAdmin
          settingweb={settingweb}
          getSettingWeb={getSettingWeb}
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
        />
      ),
      children: [
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
        {
          path: "/pesanan/semua",
          element: <SemuaPesanan />,
        },
        {
          path: "/pesanan/joki",
          element: <PesananJoki />,
        },
        {
          path: "/pesanan/gift-skin",
          element: <PesananGiftSkin />,
        },
        {
          path: "/pesanan/dmvilog",
          element: <PesananVilog />,
        },
        {
          path: "/member/deposit",
          element: <MemberDeposit />,
        },
        {
          path: "/member/kelola",
          element: <KelolaMember />,
        },
        {
          path: "/settings/slider",
          element: <Slider />,
        },
        {
          path: "/settings/payment",
          element: <Payment />,
        },
        {
          path: "/settings/website",
          element: <Website />,
        },
        {
          path: "/produk/kategori",
          element: <Kategori />,
        },
        {
          path: "/produk/subkategori",
          element: <SubKategori />,
        },
        {
          path: "/produk/tipe",
          element: <Tipe />,
        },
        {
          path: "/produk/layanan",
          element: <Layanan />,
        },
        {
          path: "/produk/voucher",
          element: <Voucher />,
        },
      ],
    },
  ]);

function App() {
  const [settingweb, setSettingWeb] = useState({});
  const [isDarkMode, setIsDarkMode] = useState(false);

  const getSettingWeb = async () => {
    const response = await axios.get("http://localhost:5000/settingweb");
    setSettingWeb(response.data[0]);
  };

  useEffect(() => {
    getSettingWeb();
  }, []);

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode === "true") {
      setIsDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("darkMode", newMode);
      return newMode;
    });
  };

  return (
    <>
      <RouterProvider router={router(settingweb, isDarkMode, toggleDarkMode, getSettingWeb)} />
    </>
  );
}

export default App;
