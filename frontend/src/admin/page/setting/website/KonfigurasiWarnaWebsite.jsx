import axios from "axios";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

const KonfigurasiWarnaWebsite = () => {
  const { settingWeb } = useOutletContext();

  const [warna1, setWarna1] = useState("");
  const [warna2, setWarna2] = useState("");
  const [warna3, setWarna3] = useState("");
  const [warna4, setWarna4] = useState("");
  const [warna5, setWarna5] = useState("");

  useEffect(() => {
    if (settingWeb) {
      setWarna1(settingWeb.warna1 || "");
      setWarna2(settingWeb.warna2 || "");
      setWarna3(settingWeb.warna3 || "");
      setWarna4(settingWeb.warna4 || "");
      setWarna5(settingWeb.warna5 || "");
    }
  }, [settingWeb]);

  const handleResetWarnaWebsite = () => {
    setWarna1(settingWeb.warna1);
    setWarna2(settingWeb.warna2);
    setWarna3(settingWeb.warna3);
    setWarna4(settingWeb.warna4);
    setWarna5(settingWeb.warna5);
  };

  const saveWarnaWebsite = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("warna1", warna1);
      formData.append("warna2", warna2);
      formData.append("warna3", warna3);
      formData.append("warna4", warna4);
      formData.append("warna5", warna5);

      const response = await axios.patch(
        "http://localhost:5000/settingweb/konfigurasi/warna",
        formData
      );

      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div
      id="konfigurasiWarnaSection"
      className="col-span-6 flex flex-col gap-y-4"
    >
      <div className="flex flex-row lg:text-2xl text-black dark:text-white font-semibold">
        Konfigurasi Warna Website
      </div>
      <div className="bg-white dark:bg-[#2d2d2e] rounded-xl shadow-md p-5">
        <form onSubmit={saveWarnaWebsite} className="flex flex-col gap-y-4">
          <div className="grid grid-cols-5 gap-y-4 gap-x-2">
            <label
              htmlFor="warna1"
              className="col-span-1 flex flex-row mt-2 text-black dark:text-white"
            >
              Warna 1
            </label>
            <input
              id="warna1"
              type="text"
              value={warna1}
              onChange={(e) => setWarna1(e.target.value)}
              className="col-span-4 bg-white dark:bg-[#16171a] p-2.5 focus:outline-none focus:ring focus:duration-300 text-black dark:text-white ring-1 ring-zinc-200 dark:ring-zinc-600 rounded-lg"
            />
            <label
              htmlFor="warna2"
              className="col-span-1 flex flex-row mt-2 text-black dark:text-white"
            >
              Warna 2
            </label>
            <input
              id="warna2"
              type="text"
              value={warna2}
              onChange={(e) => setWarna2(e.target.value)}
              className="col-span-4 bg-white dark:bg-[#16171a] p-2.5 focus:outline-none focus:ring focus:duration-300 text-black dark:text-white ring-1 ring-zinc-200 dark:ring-zinc-600 rounded-lg"
            />
            <label
              htmlFor="warna3"
              className="col-span-1 flex flex-row mt-2 text-black dark:text-white"
            >
              Warna 3
            </label>
            <input
              id="warna3"
              type="text"
              value={warna3}
              onChange={(e) => setWarna3(e.target.value)}
              className="col-span-4 bg-white dark:bg-[#16171a] p-2.5 focus:outline-none focus:ring focus:duration-300 text-black dark:text-white ring-1 ring-zinc-200 dark:ring-zinc-600 rounded-lg"
            />
            <label
              htmlFor="warna4"
              className="col-span-1 flex flex-row mt-2 text-black dark:text-white"
            >
              Warna 4
            </label>
            <input
              id="warna4"
              type="text"
              value={warna4}
              onChange={(e) => setWarna4(e.target.value)}
              className="col-span-4 bg-white dark:bg-[#16171a] p-2.5 focus:outline-none focus:ring focus:duration-300 text-black dark:text-white ring-1 ring-zinc-200 dark:ring-zinc-600 rounded-lg"
            />
            <label
              htmlFor="warna5"
              className="col-span-1 flex flex-row mt-2 text-black dark:text-white"
            >
              Warna 5
            </label>
            <input
              id="warna5"
              type="text"
              value={warna5}
              onChange={(e) => setWarna5(e.target.value)}
              className="col-span-4 bg-white dark:bg-[#16171a] p-2.5 focus:outline-none focus:ring focus:duration-300 text-black dark:text-white ring-1 ring-zinc-200 dark:ring-zinc-600 rounded-lg"
            />
          </div>
          <div className="flex flex-row gap-3 justify-end mt-2">
            <button
              type="button"
              onClick={handleResetWarnaWebsite}
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

export default KonfigurasiWarnaWebsite;
