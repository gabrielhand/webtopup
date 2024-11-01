import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

const KonfigurasiTripay = () => {
  const { settingWeb, getSettingWeb } = useOutletContext();

  const [tripayApi, setTripayApi] = useState("");
  const [tripayMerchantCode, setTripayMerchantCode] = useState("");
  const [tripayPrivateKey, setTripayPrivateKey] = useState("");

  useEffect(() => {
    if (settingWeb) {
      setTripayApi(settingWeb.tripay_api);
      setTripayMerchantCode(settingWeb.tripay_merchant_code);
      setTripayPrivateKey(settingWeb.tripay_private_key);
    }
  }, [settingWeb]);

  const handleResetTripay = () => {
    setTripayApi(settingWeb.tripay_api);
    setTripayMerchantCode(settingWeb.tripay_merchant_code);
    setTripayPrivateKey(settingWeb.tripay_private_key);
  };
  return (
    <div
      id="konfigurasiTripaySection"
      className="col-span-11 flex flex-col gap-y-4"
    >
      <div className="flex flex-col gap-y-2">
        <div className="flex flex-row lg:text-2xl text-black dark:text-white font-semibold">
          Konfigurasi Tripay
        </div>
        <div className="flex flex-row text-red-400">
          URL CALLBACK : https://meenarastore.com/callback
        </div>
      </div>
      <div className="bg-white dark:bg-[#2d2d2e] rounded-xl shadow-md p-5">
        <form onSubmit="" className="flex flex-col gap-y-4">
          <div className="grid grid-cols-5 gap-y-4 gap-x-2">
            <label
              htmlFor="tripayApi"
              className="col-span-1 flex flex-row items-center text-black dark:text-white"
            >
              TRIPAY API
            </label>
            <input
              id="tripayApi"
              type="text"
              value={tripayApi}
              onChange={(e) => setTripayApi(e.target.value)}
              className="col-span-4 bg-white dark:bg-[#16171a] p-2.5 focus:outline-none focus:ring focus:duration-300 text-black dark:text-white ring-1 ring-zinc-200 dark:ring-zinc-600 rounded-lg"
            />
            <label
              htmlFor="tripayMerchantCode"
              className="col-span-1 flex flex-row items-center text-black dark:text-white"
            >
              Rate Gold
            </label>
            <input
              id="tripayMerchantCode"
              type="text"
              value={tripayMerchantCode}
              onChange={(e) => setTripayMerchantCode(e.target.value)}
              className="col-span-4 bg-white dark:bg-[#16171a] p-2.5 focus:outline-none focus:ring focus:duration-300 text-black dark:text-white ring-1 ring-zinc-200 dark:ring-zinc-600 rounded-lg"
            />
            <label
              htmlFor="tripayPrivateKey"
              className="col-span-1 flex flex-row items-center text-black dark:text-white"
            >
              Rate Platinum
            </label>
            <input
              id="tripayPrivateKey"
              type="text"
              value={tripayPrivateKey}
              onChange={(e) => setTripayPrivateKey(e.target.value)}
              className="col-span-4 bg-white dark:bg-[#16171a] p-2.5 focus:outline-none focus:ring focus:duration-300 text-black dark:text-white ring-1 ring-zinc-200 dark:ring-zinc-600 rounded-lg"
            />
          </div>
          <div className="flex flex-row gap-3 justify-end mt-2">
            <button
              type="button"
              onClick={handleResetTripay}
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

export default KonfigurasiTripay;
