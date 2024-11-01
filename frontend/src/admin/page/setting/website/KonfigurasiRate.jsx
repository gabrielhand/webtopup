import axios from "axios";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

const KonfigurasiRate = () => {
  const { settingWeb, getSettingWeb } = useOutletContext();

  const [rateMember, setRateMember] = useState("");
  const [rateGold, setRateGold] = useState("");
  const [ratePlatinum, setRatePlatinum] = useState("");

  useEffect(() => {
    if (settingWeb) {
      setRateMember(settingWeb.rate_member);
      setRateGold(settingWeb.rate_gold);
      setRatePlatinum(settingWeb.rate_platinum);
    }
  }, [settingWeb]);

  const saveKonfigurasiRate = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("rate_member", rateMember);
      formData.append("rate_gold", rateGold);
      formData.append("rate_platinum", ratePlatinum);

      const response = await axios.patch(
        "http://localhost:5000/settingweb/konfigurasi/rate",
        formData
      );

      console.log(response.data);
      handleResetRateMemberGoldPlatinum();
      getSettingWeb();
    } catch (error) {
      handleResetRateMemberGoldPlatinum();
      console.log(error.message);
    }
  };

  const handleResetRateMemberGoldPlatinum = () => {
    setRateMember(settingWeb.rate_member);
    setRateGold(settingWeb.rate_gold);
    setRatePlatinum(settingWeb.rate_platinum);
  };

  return (
    <div
      id="konfigurasiRateSection"
      className="col-span-11 flex flex-col gap-y-4"
    >
      <div className="flex flex-row lg:text-2xl text-black dark:text-white font-semibold">
        Konfigurasi Rate
      </div>
      <div className="bg-white dark:bg-[#2d2d2e] rounded-xl shadow-md p-5">
        <form onSubmit={saveKonfigurasiRate} className="flex flex-col gap-y-4">
          <div className="grid grid-cols-5 gap-y-4 gap-x-2">
            <label
              htmlFor="rateMember"
              className="col-span-1 flex flex-row items-center text-black dark:text-white"
            >
              Rate Member
            </label>
            <input
              id="rateMember"
              type="number"
              value={rateMember}
              onChange={(e) => setRateMember(e.target.value)}
              className="col-span-4 bg-white dark:bg-[#16171a] p-2.5 focus:outline-none focus:ring focus:duration-300 text-black dark:text-white ring-1 ring-zinc-200 dark:ring-zinc-600 rounded-lg"
            />
            <label
              htmlFor="rateGold"
              className="col-span-1 flex flex-row items-center text-black dark:text-white"
            >
              Rate Gold
            </label>
            <input
              id="rateGold"
              type="number"
              value={rateGold}
              onChange={(e) => setRateGold(e.target.value)}
              className="col-span-4 bg-white dark:bg-[#16171a] p-2.5 focus:outline-none focus:ring focus:duration-300 text-black dark:text-white ring-1 ring-zinc-200 dark:ring-zinc-600 rounded-lg"
            />
            <label
              htmlFor="ratePlatinum"
              className="col-span-1 flex flex-row items-center text-black dark:text-white"
            >
              Rate Platinum
            </label>
            <input
              id="ratePlatinum"
              type="number"
              value={ratePlatinum}
              onChange={(e) => setRatePlatinum(e.target.value)}
              className="col-span-4 bg-white dark:bg-[#16171a] p-2.5 focus:outline-none focus:ring focus:duration-300 text-black dark:text-white ring-1 ring-zinc-200 dark:ring-zinc-600 rounded-lg"
            />
          </div>
          <div className="flex flex-row gap-3 justify-end mt-2">
            <button
              type="button"
              onClick={handleResetRateMemberGoldPlatinum}
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

export default KonfigurasiRate;
