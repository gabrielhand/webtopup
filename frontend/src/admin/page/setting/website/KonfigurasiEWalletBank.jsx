import axios from "axios";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

const KonfigurasiEWalletBank = () => {
  const { settingWeb } = useOutletContext();

  const [ovoAdmin, setOvoAdmin] = useState("");
  const [ovo1Admin, setOvo1Admin] = useState("");
  const [gopayAdmin, setGopayAdmin] = useState("");
  const [gopay1Admin, setGopay1Admin] = useState("");
  const [danaAdmin, setDanaAdmin] = useState("");
  const [shoopePayAdmin, setShoopePayAdmin] = useState("");
  const [bcaAdmin, setBcaAdmin] = useState("");

  useEffect(() => {
    if (settingWeb) {
      setOvoAdmin(settingWeb.ovo_admin || "");
      setOvo1Admin(settingWeb.ovo1_admin || "");
      setGopayAdmin(settingWeb.gopay_admin || "");
      setGopay1Admin(settingWeb.gopay1_admin || "");
      setDanaAdmin(settingWeb.dana_admin || "");
      setShoopePayAdmin(settingWeb.shopeepay_admin || "");
      setBcaAdmin(settingWeb.bca_admin || "");
    }
  }, [settingWeb]);

  const handleResetMutasiEWalletBank = () => {
    setOvoAdmin(settingWeb.ovo_admin);
    setOvo1Admin(settingWeb.ovo1_admin);
    setGopayAdmin(settingWeb.gopay_admin);
    setGopay1Admin(settingWeb.gopay1_admin);
    setDanaAdmin(settingWeb.dana_admin);
    setShoopePayAdmin(settingWeb.shopeepay_admin);
    setBcaAdmin(settingWeb.bca_admin);
  };

  const saveMutasiEWallet = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("ovo_admin", ovoAdmin);
      formData.append("ovo1_admin", ovo1Admin);
      formData.append("gopay_admin", gopayAdmin);
      formData.append("gopay1_admin", gopay1Admin);
      formData.append("dana_admin", danaAdmin);
      formData.append("shoopepay_admin", shoopePayAdmin);
      formData.append("bca_admin", bcaAdmin);

      const response = await axios.patch(
        "http://localhost:5000/settingweb/konfigurasi/mutasi",
        formData
      );

      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div
      id="konfigurasiMutasiE-WalletSection"
      className="col-span-11 flex flex-col gap-y-4"
    >
      <div className="flex flex-row lg:text-2xl text-black dark:text-white font-semibold">
        Konfigurasi Mutasi E-Wallet/Bank
      </div>
      <div className="bg-white dark:bg-[#2d2d2e] rounded-xl shadow-md p-5">
        <form onSubmit={saveMutasiEWallet} className="flex flex-col gap-y-4">
          <div className="flex flex-row gap-x-8">
            <div className="grid grid-cols-5 gap-y-4 gap-x-2">
              <label
                htmlFor="ovoAdmin"
                className="col-span-2 whitespace-nowrap flex flex-row mt-2 text-black dark:text-white"
              >
                OVO ADMIN
              </label>
              <input
                id="ovoAdmin"
                type="text"
                value={ovoAdmin}
                onChange={(e) => setOvoAdmin(e.target.value)}
                className="col-span-3 bg-white dark:bg-[#16171a] p-2.5 focus:outline-none focus:ring focus:duration-300 text-black dark:text-white ring-1 ring-zinc-200 dark:ring-zinc-600 rounded-lg"
              />
              <label
                htmlFor="ovo1Admin"
                className="col-span-2 whitespace-nowrap flex flex-row mt-2 text-black dark:text-white"
              >
                OVO 1 ADMIN
              </label>
              <input
                id="ovo1Admin"
                type="text"
                value={ovo1Admin}
                onChange={(e) => setOvo1Admin(e.target.value)}
                className="col-span-3 bg-white dark:bg-[#16171a] p-2.5 focus:outline-none focus:ring focus:duration-300 text-black dark:text-white ring-1 ring-zinc-200 dark:ring-zinc-600 rounded-lg"
              />
              <label
                htmlFor="gopayAdmin"
                className="col-span-2 whitespace-nowrap flex flex-row mt-2 text-black dark:text-white"
              >
                GOPAY ADMIN
              </label>
              <input
                id="gopayAdmin"
                type="text"
                value={gopayAdmin}
                onChange={(e) => setGopayAdmin(e.target.value)}
                className="col-span-3 bg-white dark:bg-[#16171a] p-2.5 focus:outline-none focus:ring focus:duration-300 text-black dark:text-white ring-1 ring-zinc-200 dark:ring-zinc-600 rounded-lg"
              />
              <label
                htmlFor="gopay1Admin"
                className="col-span-2 whitespace-nowrap flex flex-row mt-2 text-black dark:text-white"
              >
                GOPAY 1 ADMIN
              </label>
              <input
                id="gopay1Admin"
                type="text"
                value={gopay1Admin}
                onChange={(e) => setGopay1Admin(e.target.value)}
                className="col-span-3 bg-white dark:bg-[#16171a] p-2.5 focus:outline-none focus:ring focus:duration-300 text-black dark:text-white ring-1 ring-zinc-200 dark:ring-zinc-600 rounded-lg"
              />
            </div>
            <div className="flex flex-col gap-y-4">
              <div className="grid grid-cols-5 gap-x-2">
                <label
                  htmlFor="danaAdmin"
                  className="col-span-2 whitespace-nowrap flex flex-row mt-2 text-black dark:text-white"
                >
                  DANA ADMIN
                </label>
                <input
                  id="danaAdmin"
                  type="text"
                  value={danaAdmin}
                  onChange={(e) => setDanaAdmin(e.target.value)}
                  className="col-span-3 bg-white dark:bg-[#16171a] p-2.5 focus:outline-none focus:ring focus:duration-300 text-black dark:text-white ring-1 ring-zinc-200 dark:ring-zinc-600 rounded-lg"
                />
              </div>
              <div className="grid grid-cols-5 gap-x-2">
                <label
                  htmlFor="shoopePayAdmin"
                  className="col-span-2 whitespace-nowrap flex flex-row mt-2 text-black dark:text-white"
                >
                  SHOOPEPAY ADMIN
                </label>
                <input
                  id="shoopePayAdmin"
                  type="text"
                  value={shoopePayAdmin}
                  onChange={(e) => setShoopePayAdmin(e.target.value)}
                  className="col-span-3 bg-white dark:bg-[#16171a] p-2.5 focus:outline-none focus:ring focus:duration-300 text-black dark:text-white ring-1 ring-zinc-200 dark:ring-zinc-600 rounded-lg"
                />
              </div>
              <div className="grid grid-cols-5 gap-x-2">
                <label
                  htmlFor="bcaAdmin"
                  className="col-span-2 whitespace-nowrap flex flex-row mt-2 text-black dark:text-white"
                >
                  BCA ADMIN
                </label>
                <input
                  id="bcaAdmin"
                  type="text"
                  value={bcaAdmin}
                  onChange={(e) => setBcaAdmin(e.target.value)}
                  className="col-span-3 bg-white dark:bg-[#16171a] p-2.5 focus:outline-none focus:ring focus:duration-300 text-black dark:text-white ring-1 ring-zinc-200 dark:ring-zinc-600 rounded-lg"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-3 justify-end mt-2">
            <button
              type="button"
              onClick={handleResetMutasiEWalletBank}
              className="bg-zinc-300 px-3 py-2 rounded-md text-black"
            >
              Reset
            </button>
            <button
              type="submit"
              className="bg-purple-500  px-3 py-2 rounded-md text-white"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default KonfigurasiEWalletBank;
