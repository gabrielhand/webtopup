import axios from "axios";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

const KonfigurasiHargaMembership = () => {
  const { settingWeb } = useOutletContext();

  const [hargaGold, setHargaGold] = useState("");
  const [hargaPlatinum, setHargaPlatinum] = useState("");

  useEffect(() => {
    if (settingWeb) {
      setHargaGold(settingWeb.harga_gold || "");
      setHargaPlatinum(settingWeb.harga_platinum || "");
    }
  }, [settingWeb]);

  const handleResetHargaMembership = () => {
    setHargaGold(settingWeb.harga_gold);
    setHargaPlatinum(settingWeb.harga_platinum);
  };

  const saveHargaMembership = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("harga_gold", hargaGold);
      formData.append("harga_platinum", hargaPlatinum);

      const response = await axios.patch(
        "http://localhost:5000/settingweb/konfigurasi/membership/harga",
        formData
      );

      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div
      id="konfigurasiHargaMembershipSection"
      className="col-span-5 flex flex-col gap-y-4"
    >
      <div className="flex flex-row lg:text-2xl text-black dark:text-white font-semibold">
        Konfigurasi Harga Membership
      </div>
      <div className="bg-white dark:bg-[#2d2d2e] rounded-xl shadow-md p-5">
        <form onSubmit={saveHargaMembership} className="flex flex-col gap-y-4">
          <div className="grid grid-cols-5 gap-y-4 gap-x-2">
            <label
              htmlFor="hargaGold"
              className="col-span-2 whitespace-nowrap flex flex-row mt-2 text-black dark:text-white"
            >
              Harga Gold
            </label>
            <input
              id="hargaGold"
              type="number"
              value={hargaGold}
              onChange={(e) => setHargaGold(e.target.value)}
              className="col-span-3 bg-white dark:bg-[#16171a] p-2.5 focus:outline-none focus:ring focus:duration-300 text-black dark:text-white ring-1 ring-zinc-200 dark:ring-zinc-600 rounded-lg"
            />
            <label
              htmlFor="hargaPlatinum"
              className="col-span-2 whitespace-nowrap flex flex-row mt-2 text-black dark:text-white"
            >
              Harga Platinum
            </label>
            <input
              id="hargaPlatinum"
              type="number"
              value={hargaPlatinum}
              onChange={(e) => setHargaPlatinum(e.target.value)}
              className="col-span-3 bg-white dark:bg-[#16171a] p-2.5 focus:outline-none focus:ring focus:duration-300 text-black dark:text-white ring-1 ring-zinc-200 dark:ring-zinc-600 rounded-lg"
            />
          </div>
          <div className="flex flex-row gap-3 justify-end mt-2">
            <button
              type="button"
              onClick={handleResetHargaMembership}
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

export default KonfigurasiHargaMembership;
