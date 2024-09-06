import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import BgLoginRegister from "../../assets/bg_login_register.png";
import Login from "../../page/authentication/Login";
import Register from "../../page/authentication/Register";

const MainLoginRegister = ({ settingweb, isDarkMode }) => {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState("Login");
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (location.pathname === "/login") {
      setActiveSection("Login");
    } else if (location.pathname === "/register") {
      setActiveSection("Register");
    }
  }, [location]);

  const handleSwitchSection = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setActiveSection((prev) => (prev === "Login" ? "Register" : "Login"));
      setIsAnimating(false);
    }, 600);
  };

  return (
    <div
      className={`relative flex bg-gradient-to-br from-[#404152] via-[#161721] to-black lg:flex-row md:flex-row flex-col overflow-hidden h-screen ${
        isDarkMode ? "dark" : ""
      }`}
    >
      <div className="relative lg:w-[65%] md:w-[65%] w-full h-screen overflow-hidden">
        <div
          className={`absolute inset-0 transition-transform duration-500 transform ${
            isAnimating
              ? activeSection === "Login"
                ? "translate-x-full"
                : "-translate-x-full"
              : "translate-x-0"
          }`}
        >
          {activeSection === "Login" ? (
            <Login logoHeader={settingweb.og_image} />
          ) : (
            <Register logoHeader={settingweb.og_image} />
          )}
        </div>
      </div>

      <div
        className={`relative lg:w-[35%] md:w-[35%] w-full h-screen transition-transform duration-500 transform ${
          isAnimating
            ? activeSection === "Login"
              ? "translate-x-0"
              : "-translate-x-full"
            : "translate-x-0"
        }`}
      >
        <figure>
          <img
            src={BgLoginRegister}
            alt="Bg-Login-Register"
            className="w-full h-screen"
          />
        </figure>
        <div className="absolute top-0 right-0 bottom-0 left-0 bg-black/60"></div>
        <div className="absolute top-0 right-0 bottom-0 left-0 p-4">
          <div className="flex flex-col gap-y-1 h-full justify-center text-center items-center">
            <figure>
              <img
                src={settingweb.logo_header}
                alt=""
                className="max-w-24 max-h-24"
              />
            </figure>
            <p className="text-2xl text-white font-medium">
              Tempat Topup Game Terpercaya
            </p>
            <p className="text-lg text-zinc-200 font-light -mt-1">
              Dapatkan pengalaman terbaik kamu
            </p>
            <div
              className="px-6 py-3 mt-6 border border-white text-white rounded-xl cursor-pointer"
              onClick={handleSwitchSection}
            >
              {activeSection === "Login" ? "Daftar" : "Masuk"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

MainLoginRegister.propTypes = {
  settingweb: PropTypes.shape({
    judul_web: PropTypes.string,
    og_image: PropTypes.string,
    logo_header: PropTypes.string,
  }).isRequired,
  isDarkMode: PropTypes.bool.isRequired,
};

export default MainLoginRegister;
