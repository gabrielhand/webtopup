import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import BgLoginRegister from "../../assets/bg_login_register.png";
import Login from "./Login";
import Register from "./Register";
import Alert from "../../components/alert/Alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reset } from "../../features/authSlices";

const MainLoginRegister = ({ settingweb, isDarkMode }) => {
  const [activeSection, setActiveSection] = useState("Login");
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isSuccess } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user || isSuccess) {
      setIsVisible(true);

      setTimeout(() => {
        navigate("/me");
      }, 2300);
      setTimeout(() => {
        setIsVisible(false);
      }, 2000);
      setTimeout(() => {
        dispatch(reset());
      }, 2000);
    }
  }, [user, isSuccess, dispatch, navigate]);

  useEffect(() => {
    document.title = settingweb
      ? settingweb.judul_web
      : import.meta.env.VITE_APP_NAME;
  }, [settingweb]);

  // useEffect(() => {
  //   if (activeSection === "Login") {
  //     setActiveSection("Register");
  //   } else if (activeSection === "Register") {
  //     setActiveSection("Login");
  //   }
  // }, []);

  const handleSwitchSection = () => {
    setActiveSection((prev) => (prev === "Login" ? "Register" : "Login"));
  };

  const closeAlert = () => {
    setIsVisible(false);
  };

  return (
    <div
      className={`relative flex lg:flex-row md:flex-row flex-col overflow-hidden w-full h-screen ${
        isDarkMode
          ? "dark bg-gradient-to-br from-[#404152] via-[#161721] to-black"
          : "bg-slate-100"
      }`}
    >
      <div className="flex-initial w-[65%]">
        <div
          className={`absolute left-0 w-[65%] h-full transition-all duration-[300ms] overflow-y-auto ${
            activeSection === "Login"
              ? "translate-x-0 opacity-100 z-40"
              : "translate-x-[65%] opacity-0 z-0"
          }`}
        >
          <Login logoHeader={settingweb.og_image} />
        </div>
        <div
          className={`absolute right-0 w-[65%] h-full transition-all duration-[300ms] hover:overflow-y-auto overflow-hidden ${
            activeSection === "Register"
              ? "translate-x-0 opacity-100 z-40"
              : "-translate-x-[65%] opacity-0 z-0"
          }`}
        >
          <Register logoHeader={settingweb.og_image} />
        </div>
      </div>
      <div
        className={`flex-initial w-[35%] h-screen ${
          activeSection === "Register" ? "opacity-100" : "opacity-0"
        }`}
      >
        <div
          className={`absolute left-0 z-20 bg-transparent w-[35%] transition-opacity duration-1000 ${
            activeSection === "Register" ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="relative w-full h-screen">
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
                  className="px-6 py-3 mt-6 text-white rounded-xl cursor-pointer"
                  onClick={handleSwitchSection}
                >
                  {activeSection === "Login" ? "Daftar" : "Masuk"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`flex-initial w-[35%] h-screen ${
          activeSection === "Login" ? "opacity-100" : "opacity-0"
        }`}
      >
        <div
          className={`absolute right-0 z-20 bg-transparent w-[35%] transition-opacity duration-1000 ${
            activeSection === "Login" ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="relative w-full h-screen">
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
                  className="px-6 py-3 mt-6 text-white rounded-xl cursor-pointer"
                  onClick={handleSwitchSection}
                >
                  {activeSection === "Login" ? "Daftar" : "Masuk"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`overlay flex-initial w-[35%] h-screen`}>
        <div
          className={`absolute z-10 w-[35%] transition-transform duration-[450ms] ${
            activeSection === "Register"
              ? "-translate-x-[227%]"
              : "-translate-x-[41%]"
          }`}
        >
          <div className="relative w-full h-screen">
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
                    className="max-w-24 max-h-24 opacity-0"
                  />
                </figure>
                <p className={`text-2xl text-white font-medium opacity-0`}>
                  Tempat Topup Game Terpercaya
                </p>
                <p
                  className={`text-lg text-zinc-200 font-light -mt-1 opacity-0`}
                >
                  Dapatkan pengalaman terbaik kamu
                </p>
                <div
                  className="px-6 py-3 mt-6 border border-white text-white rounded-xl cursor-pointer"
                  onClick={handleSwitchSection}
                >
                  <p className="hidden">
                    {activeSection === "Login" ? "Daftar" : "Masuk"}
                  </p>
                  <p className="opacity-0">
                    {activeSection === "Login" ? "Daftar" : "Masuk"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`absolute left-5 bottom-5 transition-all duration-300 ${
          isVisible
            ? "translate-y-0 opacity-100 z-50"
            : "translate-y-full opacity-0 z-50"
        }`}
      >
        <Alert
          status="Success"
          message="Berhasil Login!"
          bg="bg-emerald-50"
          border="border-emerald-400"
          closeAlert={closeAlert}
        />
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
