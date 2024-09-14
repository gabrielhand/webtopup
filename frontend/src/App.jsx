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

const router = (settingweb, isDarkMode, toggleDarkMode) =>
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
          path: "/me",
          element: <Me />,
        },
      ],
    },
    {
      path: "/login",
      element: (
        <MainLoginRegister settingweb={settingweb} isDarkMode={isDarkMode} />
      ),
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
      <RouterProvider router={router(settingweb, isDarkMode, toggleDarkMode)} />
    </>
  );
}

export default App;
