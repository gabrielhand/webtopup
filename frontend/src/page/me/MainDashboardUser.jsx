import { useEffect, useState } from "react";
import { getMe, reset } from "../../features/authSlices";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import BannerMe from "./BannerMe";
import LoaderBanner from "../../components/loader/LoaderBanner";
import Alert from "../../components/alert/Alert";
import { LogoutUser } from "../../features/authSlices";
import axios from "axios";
import MenuMe from "./MenuMe";

const MainDashboardUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);
  const [msg, setMsg] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [statusAlert, setStatusAlert] = useState("");
  const [pembelians, setPembelian] = useState(null);

  const getPembelianUser = async () => {
    const response = await axios.get(
      `http://localhost:5000/users/pembelian/lima/${user?.username}`
    );
    setPembelian(response.data);
  };

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    getPembelianUser();
  }, [user]);

  useEffect(() => {
    if (isError) {
      navigate("/login");
    }
  }, [isError, navigate]);

  useEffect(() => {
    if (statusAlert || msg) {
      setIsVisible(true);

      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 3000);

      const clearMsgTimer = setTimeout(() => {
        setStatusAlert("");
        setMsg("");
      }, 3300);

      return () => {
        clearTimeout(timer);
        clearTimeout(clearMsgTimer);
      };
    }
  }, [msg]);

  const closeAlert = () => {
    setIsVisible(false);
  };

  const logOut = () => {
    dispatch(LogoutUser());
    dispatch(reset());
    navigate("/");
  };

  return (
    <div className="relative flex flex-col lg:gap-y-6 md:gap-y-6 gap-y-4 lg:px-16 md:px-10 px-4 py-6 overflow-hidden">
      <div className="relative rounded-xl w-full min-h-72 max-h-[600px] overflow-hidden">
        {user ? <BannerMe user={user} /> : <LoaderBanner />}
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-3 grid-cols-1 gap-4">
        {user ? (
          <>
            <div className="col-span-1 flex flex-col gap-y-3">
              <div className="flex flex-row rounded-xl bg-[#4169e1] font-medium shadow-lg">
                <p className="px-5 py-3 text-white font-medium text-xl">Menu</p>
              </div>
              <MenuMe Logout={logOut} />
              <div className="lg:flex md:flex lg:flex-row md:flex-row hidden rounded-xl bg-[#4169e1] font-medium shadow-lg">
                <p className="px-5 py-3 text-white font-medium text-xl">
                  Pesanan Terakhir
                </p>
              </div>
              {pembelians &&
                pembelians.map((pembelian) => (
                  <div
                    key={pembelian.id}
                    className="lg:flex md:flex hidden flex-col rounded-xl bg-white dark:bg-[#313136] shadow-lg overflow-hidden cursor-pointer"
                  >
                    <div className="flex flex-row items-start justify-between">
                      <div className="flex flex-row items-center bg-[#4169e1] text-xs dark:text-white font-light p-2">
                        {pembelian.order_id}
                      </div>
                      <div className="flex flex-row bg-green-500 text-xs text-white font-light p-2 m-2 rounded-lg">
                        {pembelian.status}
                      </div>
                    </div>
                    <div className="flex flex-row gap-3 mx-3 mb-3">
                      <div className="flex flex-row gap-x-3 max-w-20 rounded-lg">
                        <img
                          src={pembelian.layananDetail.kategori.thumbnail}
                          alt={`Gambar-${pembelian.layananDetail.kategori.nama}`}
                          className="aspect-square object-cover object-bottom rounded-lg"
                        />
                      </div>
                      <div className="flex flex-col">
                        <p className="text-white font-medium text-sm">
                          {pembelian.layanan}
                        </p>
                        <p className="text-zinc-200 font-light text-xs">
                          {pembelian.layananDetail.kategori.nama}
                        </p>
                        <p className="text-blue-500 font-light text-xs">
                          Rp{" "}
                          {pembelian.harga.toLocaleString("id-ID", {
                            styles: "currency",
                            currency: "IDR",
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <div className="lg:col-span-2 md:col-span-2 flex flex-col gap-y-6">
              <Outlet
                context={{
                  user: user,
                  setMsg: setMsg,
                  setStatusAlert: setStatusAlert,
                }}
              />
            </div>
          </>
        ) : (
          <p className="text-black dark:text-white">Loading...</p>
        )}
      </div>
      <div
        className={`absolute right-5 bottom-[500px] transition-all duration-300 ${
          isVisible
            ? "translate-y-0 opacity-100 z-50"
            : "translate-y-full opacity-0 z-0"
        }`}
      >
        <Alert
          status={statusAlert}
          message={msg}
          bg={`${statusAlert === "Sukses" ? "bg-emerald-50" : "bg-red-50"}`}
          bgIcon={`${
            statusAlert === "Sukses" ? "bg-emerald-400" : "bg-red-400"
          }`}
          border={`${
            statusAlert === "Sukses" ? "border-emerald-400" : "border-red-400"
          }`}
          textColor={`${
            statusAlert === "Sukses" ? "text-emerald-400" : "text-red-400"
          }`}
          closeAlert={closeAlert}
        />
      </div>
    </div>
  );
};

export default MainDashboardUser;
