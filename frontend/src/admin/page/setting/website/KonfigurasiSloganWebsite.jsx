import axios from "axios";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

const KonfigurasiSloganWebsite = () => {
  const { settingWeb } = useOutletContext();
  const [sloganWebsite, setSloganWebsite] = useState("");

  useEffect(() => {
    if (settingWeb) {
      setSloganWebsite(settingWeb.slogan_web || "");
    }
  }, [settingWeb]);

  const handleResetSlogan = () => {
    setSloganWebsite(settingWeb.slogan_web);
  };

  const saveSloganWebsite = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("slogan_web", sloganWebsite);

      const response = await axios.patch(
        "http://localhost:5000/settingweb/konfigurasi/slogan",
        formData
      );

      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div
      id="konfigurasiSloganSection"
      className="col-span-11 flex flex-col gap-y-4"
    >
      <div className="flex flex-row lg:text-2xl text-black dark:text-white font-semibold">
        Slogan Website
      </div>
      <div className="bg-white dark:bg-[#2d2d2e] rounded-xl shadow-md p-5">
        <form onSubmit={saveSloganWebsite} className="flex flex-col gap-y-4">
          <div className="grid grid-cols-5 gap-y-4 gap-x-2">
            <label
              htmlFor="sloganWebsite"
              className="col-span-1 flex flex-row mt-2 text-black dark:text-white"
            >
              Slogan Website
            </label>
            <textarea
              id="sloganWebsite"
              type="text"
              value={sloganWebsite}
              onChange={(e) => setSloganWebsite(e.target.value)}
              rows={2}
              className="col-span-4 bg-white dark:bg-[#16171a] p-2.5 focus:outline-none focus:ring focus:duration-300 text-black dark:text-white ring-1 ring-zinc-200 dark:ring-zinc-600 rounded-lg"
            />
          </div>
          <div className="flex flex-row gap-3 justify-end mt-2">
            <button
              type="button"
              onClick={handleResetSlogan}
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

export default KonfigurasiSloganWebsite;
