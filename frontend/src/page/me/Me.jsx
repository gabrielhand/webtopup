import { useEffect, useState } from "react";
import { getMe, reset } from "../../features/authSlices";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BannerMe from "./BannerMe";
import LoaderBanner from "../../components/loader/LoaderBanner";
import UbahProfile from "./UbahProfile";
import EditPassword from "./EditPassword";
import Alert from "../../components/alert/Alert";
import { LogoutUser } from "../../features/authSlices";
import axios from "axios";

const Me = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);
  const [msg, setMsg] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [statusAlert, setStatusAlert] = useState("");
  const [pembelians, setPembelian] = useState(null);

  const getPembelianUser = async () => {
    const response = await axios.get("http://localhost:5000/users/pembelian");
    setPembelian(response.data);
  };

  useEffect(() => {
    dispatch(getMe());
    getPembelianUser();
  }, [dispatch]);

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
      <div className="relative rounded-xl w-full lg:min-h-96 md:min-h-80 min-h-72 max-h-[600px] overflow-hidden">
        {user ? <BannerMe user={user} /> : <LoaderBanner />}
      </div>
      <div className="grid grid-cols-3 gap-4 relative">
        {user ? (
          <>
            <div className="col-span-1 flex flex-col gap-y-3">
              <div className="flex flex-row rounded-xl bg-[#4169e1] font-medium shadow-lg">
                <p className="px-5 py-3 text-white font-medium text-xl">Menu</p>
              </div>
              <div className="flex flex-col gap-y-5 px-5 py-4 bg-white dark:bg-[#313136] rounded-xl shadow-lg">
                <div className="flex flex-row items-center gap-3 bg-[#4169e1] rounded-xl px-3 py-2 text-white cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    className="bi bi-person-circle"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                    <path
                      fillRule="evenodd"
                      d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                    />
                  </svg>
                  Profile
                </div>
                <div className="flex flex-row items-center gap-3 rounded-xl px-3 py-2 text-white cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    className="bi bi-clock-history"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022zm2.004.45a7 7 0 0 0-.985-.299l.219-.976q.576.129 1.126.342zm1.37.71a7 7 0 0 0-.439-.27l.493-.87a8 8 0 0 1 .979.654l-.615.789a7 7 0 0 0-.418-.302zm1.834 1.79a7 7 0 0 0-.653-.796l.724-.69q.406.429.747.91zm.744 1.352a7 7 0 0 0-.214-.468l.893-.45a8 8 0 0 1 .45 1.088l-.95.313a7 7 0 0 0-.179-.483m.53 2.507a7 7 0 0 0-.1-1.025l.985-.17q.1.58.116 1.17zm-.131 1.538q.05-.254.081-.51l.993.123a8 8 0 0 1-.23 1.155l-.964-.267q.069-.247.12-.501m-.952 2.379q.276-.436.486-.908l.914.405q-.24.54-.555 1.038zm-.964 1.205q.183-.183.35-.378l.758.653a8 8 0 0 1-.401.432z" />
                    <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0z" />
                    <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5" />
                  </svg>
                  Histori Pesanan
                </div>
                <div className="flex flex-row items-center gap-3 rounded-xl px-3 py-2 text-white cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    className="bi bi-credit-card"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z" />
                    <path d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" />
                  </svg>
                  Membership
                </div>
                <div
                  onClick={logOut}
                  className="flex flex-row items-center gap-3 rounded-xl px-3 py-2 text-red-500 cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    className="bi bi-box-arrow-left"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0z"
                    />
                    <path
                      fillRule="evenodd"
                      d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708z"
                    />
                  </svg>
                  Logout
                </div>
              </div>
              <div className="flex flex-row rounded-xl bg-[#4169e1] font-medium shadow-lg">
                <p className="px-5 py-3 text-white font-medium text-xl">
                  Pesanan Terakhir
                </p>
              </div>
              {pembelians &&
                pembelians.map((pembelian) => (
                  <div
                    key={pembelian.id}
                    className="flex flex-col rounded-xl bg-white dark:bg-[#313136] shadow-lg overflow-hidden cursor-pointer"
                  >
                    <div className="flex flex-row items-start justify-between">
                      <div className="flex flex-row items-center bg-[#4169e1] text-xs text-white font-light p-2">
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
            <div className="col-span-2 flex flex-col gap-y-3">
              <UbahProfile
                id={user.id}
                imageUser={user.image}
                nama={user.name}
                username={user.username}
                nomerWa={user.whatsapp}
                setMsg={setMsg}
              />
              <EditPassword setStatusAlert={setStatusAlert} setMsg={setMsg} />
            </div>
          </>
        ) : (
          <p className="text-black dark:text-white">Loading...</p>
        )}
      </div>
      <div
        className={`absolute right-5 bottom-5 transition-all duration-300 ${
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

export default Me;
