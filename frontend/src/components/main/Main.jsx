import { useEffect } from "react";
import Navbar from "../navbar/Navbar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Loading from "./Loading";
import NProgress from "nprogress";
import ModalSearch from "../navbar/ModalSearch";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { getMe, LogoutUser, reset } from "../../features/authSlices";

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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  
  useEffect(() => {
    dispatch(getMe())
  }, [dispatch]);

  useEffect(() => {
    NProgress.start();
    NProgress.done();
    smoothScrollTo(0, 0, 300);

    return () => {
      NProgress.done();
    };
  }, [location]);

  useEffect(() => {
    document.title = settingweb ? settingweb.judul_web : import.meta.env.VITE_APP_NAME;

    const favicon = document.getElementById("favicon");
    if (favicon) {
      favicon.href = settingweb.og_image;
    }
  }, [settingweb]);

  const logOut = () => {
    dispatch(LogoutUser());
    dispatch(reset());
    navigate("/");
  };

  return (
    <div
      className={`${
        isDarkMode
          ? "dark bg-gradient-to-br from-[#525468] via-[#161721] to-black"
          : "bg-slate-200"
      }`}
    >
      <Loading />
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} user={user} logOut={logOut} logoHeader={settingweb.logo_header} />
      <ModalSearch />
      <div className="min-h-screen">
        <Outlet
          context={{
            logoHeader: settingweb.logo_header,
            bannerAllGames: settingweb.banner_allgames,
            bannerCekTransaksi: settingweb.banner_cek_transaksi,
            bannerServices: settingweb.banner_services,
            bannerDbUser: settingweb.banner_user_profile
          }}
        />
      </div>
    </div>
  );
};

Main.propTypes = {
  settingweb: PropTypes.shape({
    judul_web: PropTypes.string,
    og_image: PropTypes.string,
    logo_header: PropTypes.string,
    banner_allgames: PropTypes.string,
    banner_cek_transaksi: PropTypes.string,
    banner_services: PropTypes.string,
    banner_user_profile: PropTypes.string,
  }).isRequired,
  isDarkMode: PropTypes.bool.isRequired,
  toggleDarkMode: PropTypes.func.isRequired,
};

export default Main;
