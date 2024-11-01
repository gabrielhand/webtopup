import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import KonfigurasiWarnaWebsite from "./KonfigurasiWarnaWebsite";

const KonfigurasiWaGateway = () => {
  const { settingWeb, getSettingWeb } = useOutletContext();

  const [nomorAdmin, setnomorAdmin] = useState("");
  const [waKey, setWaKey] = useState("");
  const [waNumber, setWaNumber] = useState("");

  useEffect(() => {
    if (settingWeb) {
      setnomorAdmin(settingWeb.nomor_admin);
      setWaKey(settingWeb.wa_key);
      setWaNumber(settingWeb.wa_number);
    }
  }, [settingWeb]);

  const handleResetApiGames = () => {
    setnomorAdmin(settingWeb.nomor_admin);
    setWaKey(settingWeb.wa_key);
    setWaNumber(settingWeb.wa_number);
  };
  return (
    <div
      id="konfigurasiWaGatewaySection"
      className="col-span-11 flex flex-col gap-y-4"
    >
      <div className="flex flex-col gap-y-2">
        <div className="flex flex-row lg:text-2xl text-black dark:text-white font-semibold">
          Konfigurasi WA Gateway
        </div>
        <div className="flex flex-row text-red-400">
          Klik Disini Untuk Hubungi Developer
        </div>
      </div>
      <div className="bg-white dark:bg-[#2d2d2e] rounded-xl shadow-md p-5">
        <form onSubmit="" className="flex flex-col gap-y-4">
          <div className="grid grid-cols-5 gap-y-4 gap-x-2">
            <label
              htmlFor="nomorAdmin"
              className="col-span-1 flex flex-row items-center text-black dark:text-white"
            >
              NOMOR ADMIN
            </label>
            <input
              id="nomorAdmin"
              type="text"
              value={nomorAdmin}
              onChange={(e) => setnomorAdmin(e.target.value)}
              className="col-span-4 bg-white dark:bg-[#16171a] p-2.5 focus:outline-none focus:ring focus:duration-300 text-black dark:text-white ring-1 ring-zinc-200 dark:ring-zinc-600 rounded-lg"
            />
            <label
              htmlFor="waKey"
              className="col-span-1 flex flex-row items-center text-black dark:text-white"
            >
              WA KEY
            </label>
            <input
              id="waKey"
              type="text"
              value={waKey}
              onChange={(e) => setWaKey(e.target.value)}
              className="col-span-4 bg-white dark:bg-[#16171a] p-2.5 focus:outline-none focus:ring focus:duration-300 text-black dark:text-white ring-1 ring-zinc-200 dark:ring-zinc-600 rounded-lg"
            />
            <label
              htmlFor="waNumber"
              className="col-span-1 flex flex-row items-center text-black dark:text-white"
            >
              WA NUMBER
            </label>
            <input
              id="waNumber"
              type="text"
              value={waNumber}
              onChange={(e) => setWaNumber(e.target.value)}
              className="col-span-4 bg-white dark:bg-[#16171a] p-2.5 focus:outline-none focus:ring focus:duration-300 text-black dark:text-white ring-1 ring-zinc-200 dark:ring-zinc-600 rounded-lg"
            />
          </div>
          <div className="flex flex-row gap-3 justify-end mt-2">
            <button
              type="button"
              onClick={handleResetApiGames}
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

export default KonfigurasiWaGateway;
