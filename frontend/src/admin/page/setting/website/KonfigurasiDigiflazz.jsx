import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

const KonfigurasiDigiflazz = () => {
  const { settingWeb, getSettingWeb } = useOutletContext();

  const [usernameDigi, setUsernameDigi] = useState("");
  const [apiKeyDigi, setApiKeyDigi] = useState("");

  useEffect(() => {
    if (settingWeb) {
      setUsernameDigi(settingWeb.username_digi);
      setApiKeyDigi(settingWeb.api_key_digi);
    }
  }, [settingWeb]);

  const handleResetDigiflazz = () => {
    setUsernameDigi(settingWeb.username_digi);
    setApiKeyDigi(settingWeb.api_key_digi);
  };
  return (
    <div
      id="konfigurasiDigiflazzSection"
      className="col-span-11 flex flex-col gap-y-4"
    >
      <div className="flex flex-row lg:text-2xl text-black dark:text-white font-semibold">
        Konfigurasi Digiflazz
      </div>
      <div className="bg-white dark:bg-[#2d2d2e] rounded-xl shadow-md p-5">
        <form onSubmit="" className="flex flex-col gap-y-4">
          <div className="grid grid-cols-5 gap-y-4 gap-x-2">
            <label
              htmlFor="usernameDigi"
              className="col-span-1 flex flex-row items-center text-black dark:text-white"
            >
              USERNAME DIGI
            </label>
            <input
              id="usernameDigi"
              type="text"
              value={usernameDigi}
              onChange={(e) => setUsernameDigi(e.target.value)}
              className="col-span-4 bg-white dark:bg-[#16171a] p-2.5 focus:outline-none focus:ring focus:duration-300 text-black dark:text-white ring-1 ring-zinc-200 dark:ring-zinc-600 rounded-lg"
            />
            <label
              htmlFor="apiKeyDigi"
              className="col-span-1 flex flex-row items-center text-black dark:text-white"
            >
              API KEY DIGI
            </label>
            <input
              id="apiKeyDigi"
              type="text"
              value={apiKeyDigi}
              onChange={(e) => setApiKeyDigi(e.target.value)}
              className="col-span-4 bg-white dark:bg-[#16171a] p-2.5 focus:outline-none focus:ring focus:duration-300 text-black dark:text-white ring-1 ring-zinc-200 dark:ring-zinc-600 rounded-lg"
            />
          </div>
          <div className="flex flex-row gap-3 justify-end mt-2">
            <button
              type="button"
              onClick={handleResetDigiflazz}
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

export default KonfigurasiDigiflazz;
