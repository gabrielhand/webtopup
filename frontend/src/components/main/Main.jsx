import { useEffect } from "react";
import Navbar from "../navbar/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import Loading from "./Loading";
import NProgress from "nprogress";
import ModalSearch from "../navbar/ModalSearch";
import PropTypes from "prop-types";

const smoothScrollTo = (x, y, duration) => {
  const start = window.scrollY;
  const distance = y - start;
  let startTime = null;

  const animation = (currentTime) => {
    if (startTime === null) startTime = currentTime;
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    window.scrollTo(0, start + distance * progress);

    if (elapsed < duration) {
      requestAnimationFrame(animation);
    }
  };

  requestAnimationFrame(animation);
};

const Main = ({ settingweb, isDarkMode, toggleDarkMode }) => {
  const location = useLocation();

  useEffect(() => {
    NProgress.start();
    NProgress.done();
    smoothScrollTo(0, 0, 300);

    return () => {
      NProgress.done();
    };
  }, [location]);

  useEffect(() => {
    document.title = settingweb.judul_web;

    const favicon = document.getElementById("favicon");
    const logoNavbar = document.getElementById("logoNavbar");
    // const logoNavbarSm = document.getElementById("logoNavbarSm");
    if (favicon && logoNavbar) {
      favicon.href = settingweb.og_image;
      logoNavbar.src = settingweb.logo_header;
      // logoNavbarSm.src = settingweb.logo_header;
    }
  }, [settingweb]);
  return (
    <div
      className={`${
        isDarkMode
          ? "dark bg-gradient-to-br from-[#525468] via-[#161721] to-black"
          : "bg-slate-100"
      }`}
    >
      <Loading />
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <ModalSearch />
      <div className="min-h-screen">
        <Outlet
          context={{
            logoHeader: settingweb.logo_header,
            bannerAllGames: settingweb.banner_allgames,
            bannerCekTransaksi: settingweb.banner_cek_transaksi,
            bannerServices: settingweb.banner_services,
          }}
        />
      </div>
    </div>
  );
};

Main.propTypes = {
  settingweb: PropTypes.arrayOf(
    PropTypes.shape({
      
    })
  ).isRequired,
  isDarkMode: PropTypes.bool.isRequired,
  toggleDarkMode: PropTypes.func.isRequired,
};

export default Main;