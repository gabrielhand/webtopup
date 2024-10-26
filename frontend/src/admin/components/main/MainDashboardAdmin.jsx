import { Outlet, useLocation, useNavigate } from "react-router-dom";
import SidebarAdmin from "../sidebar/SidebarAdmin";
import { useEffect } from "react";
import Loading from "../../../components/main/Loading";
import NProgress from "nprogress";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "../../../features/authSlices";

const MainDashboardAdmin = ({
  settingweb,
  isDarkMode,
  toggleDarkMode,
  getSettingWeb,
}) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError } = useSelector((state) => state.auth);

  useEffect(() => {
    NProgress.start();
    NProgress.done();

    return () => {
      NProgress.done();
    };
  }, [location]);

  useEffect(() => {
    document.title = settingweb
      ? settingweb.judul_web
      : import.meta.env.VITE_APP_NAME;

    const favicon = document.getElementById("favicon");
    if (favicon) {
      favicon.href = settingweb.og_image;
    }
  }, [settingweb]);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/login");
    }
    if (user && user.role !== "Admin") {
      navigate("/");
    }
  }, [user, isError, navigate]);

  return (
    <div
      className={`${
        isDarkMode ? "dark bg-black" : "bg-slate-100"
      } flex flex-row`}
    >
      <Loading />
      <SidebarAdmin
        logoHeader={settingweb.logo_header}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
      />
      <div className="min-h-screen lg:ps-72 lg:pl-72 flex-1 overflow-y-auto overflow-hidden">
        <div className="p-6">
          <Outlet
            context={{
              logoHeader: settingweb.logo_header,
              user: user,
              settingWeb: settingweb,
              getSettingWeb: getSettingWeb,
            }}
          />
        </div>
      </div>
    </div>
  );
};

MainDashboardAdmin.propTypes = {
  settingweb: PropTypes.shape({
    judul_web: PropTypes.string,
    og_image: PropTypes.string,
    logo_header: PropTypes.string,
  }).isRequired,
  isDarkMode: PropTypes.bool.isRequired,
  toggleDarkMode: PropTypes.func.isRequired,
  getSettingWeb: PropTypes.func.isRequired,
};

export default MainDashboardAdmin;
