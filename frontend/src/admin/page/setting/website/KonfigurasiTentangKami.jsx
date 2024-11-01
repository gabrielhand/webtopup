import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";

const KonfigurasiTentangKami = () => {
  const { settingWeb, getSettingWeb } = useOutletContext();
  const [sejarahStore1, setSejarahStore1] = useState("");
  const [sejarahStore2, setSejarahStore2] = useState("");
  const [visiStore, setVisiStore] = useState("");
  const [misiStore, setMisiStore] = useState("");
  const [namaCeo, setNamaCeo] = useState("");
  const [logoCeo, setLogoCeo] = useState(null);
  const [deskripsiCeo, setDeskripsiCeo] = useState("");
  const [namaBaganStore, setNamaBaganStore] = useState("");
  const [alamatBisnis, setAlamatBisnis] = useState("");
  const [emailBisnis, setEmailBisnis] = useState("");
  const [nomorBisnis, setNomorBisnis] = useState("");

  const logoCeoRef = useRef(null);

  useEffect(() => {
    if (settingWeb) {
      setSejarahStore1(settingWeb.sejarah);
      setSejarahStore2(settingWeb.sejarah_1);
      setVisiStore(settingWeb.visi);
      setMisiStore(settingWeb.misi);
      setNamaCeo(settingWeb.nama_ceo);
      setDeskripsiCeo(settingWeb.deskripsi_ceo);
      setNamaBaganStore(settingWeb.nama_bagan);
      setAlamatBisnis(settingWeb.alamat);
      setEmailBisnis(settingWeb.email);
      setNomorBisnis(settingWeb.telp);
    }
  }, [settingWeb]);

  const handleResetTentangKami = () => {
    setSejarahStore1(settingWeb.sejarah);
    setSejarahStore2(settingWeb.sejarah_1);
    setVisiStore(settingWeb.visi);
    setMisiStore(settingWeb.misi);
    setNamaCeo(settingWeb.nama_ceo);
    setLogoCeo(null);
    if (logoCeoRef.current) logoCeoRef.current.value = null;
    setDeskripsiCeo(settingWeb.deskripsi_ceo);
    setNamaBaganStore(settingWeb.nama_bagan);
    setAlamatBisnis(settingWeb.alamat);
    setEmailBisnis(settingWeb.email);
    setNomorBisnis(settingWeb.telp);
  };

  const saveKonfigurasiTentangKami = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("sejarah", sejarahStore1);
      formData.append("sejarah_1", sejarahStore2);
      formData.append("visi", visiStore);
      formData.append("misi", misiStore);
      formData.append("nama_ceo", namaCeo);
      formData.append("logo_ceo", logoCeo);
      formData.append("deskripsi_ceo", deskripsiCeo);
      formData.append("nama_bagan", namaBaganStore);
      formData.append("alamat", alamatBisnis);
      formData.append("email", emailBisnis);
      formData.append("telp", nomorBisnis);

      const response = await axios.patch(
        "http://localhost:5000/settingweb/konfigurasi/tentang-kami",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);
      handleResetTentangKami();
      getSettingWeb();
    } catch (error) {
      handleResetTentangKami();
      console.log(error.message);
    }
  };

  return (
    <div
      id="konfigurasiTentangKamiSection"
      className="col-span-11 flex flex-col gap-y-4"
    >
      <div className="flex flex-col gap-y-2">
        <div className="flex flex-row lg:text-2xl text-black dark:text-white font-semibold">
          Konfigurasi Tentang Kami
        </div>
        <div className="flex flex-row lg:text-base text-black dark:text-white font-medium">
          Halaman Tentang Kami Yang Mana?{" "}
          <span className="text-orange-400 mx-2">
            <Link to="/about-us">KLIK DISINI</Link>
          </span>
        </div>
      </div>
      <div className="bg-white dark:bg-[#2d2d2e] rounded-xl shadow-md p-5">
        <form
          onSubmit={saveKonfigurasiTentangKami}
          className="flex flex-col gap-y-4"
        >
          <div className="grid grid-cols-5 gap-y-4 gap-x-2">
            <label
              htmlFor="sejarahStore1"
              className="col-span-1 flex flex-row items-center text-black dark:text-white"
            >
              SEJARAH STORE 1
            </label>
            <textarea
              id="sejarahStore1"
              type="text"
              value={sejarahStore1}
              onChange={(e) => setSejarahStore1(e.target.value)}
              className="col-span-4 bg-white dark:bg-[#16171a] p-2.5 focus:outline-none focus:ring focus:duration-300 text-black dark:text-white ring-1 ring-zinc-200 dark:ring-zinc-600 rounded-lg"
            />
            <label
              htmlFor="sejarahStore2"
              className="col-span-1 flex flex-row mt-2 text-black dark:text-white"
            >
              SEJARAH STORE 2
            </label>
            <textarea
              id="sejarahStore2"
              type="text"
              value={sejarahStore2}
              onChange={(e) => setSejarahStore2(e.target.value)}
              rows="5"
              className="col-span-4 bg-white dark:bg-[#16171a] p-2.5 focus:outline-none focus:ring focus:duration-300 text-black dark:text-white ring-1 ring-zinc-200 dark:ring-zinc-600 rounded-lg"
            />
            <label
              htmlFor="visiStore"
              className="col-span-1 flex flex-row mt-2 text-black dark:text-white"
            >
              VISI STORE
            </label>
            <textarea
              id="visiStore"
              type="text"
              value={visiStore}
              onChange={(e) => setVisiStore(e.target.value)}
              rows="2"
              className="col-span-4 bg-white dark:bg-[#16171a] p-2.5 focus:outline-none focus:ring focus:duration-300 text-black dark:text-white ring-1 ring-zinc-200 dark:ring-zinc-600 rounded-lg"
            />
            <label
              htmlFor="misiStore"
              className="col-span-1 flex flex-row mt-2 text-black dark:text-white"
            >
              MISI STORE
            </label>
            <textarea
              id="misiStore"
              type="text"
              value={misiStore}
              onChange={(e) => setMisiStore(e.target.value)}
              rows="2"
              className="col-span-4 bg-white dark:bg-[#16171a] p-2.5 focus:outline-none focus:ring focus:duration-300 text-black dark:text-white ring-1 ring-zinc-200 dark:ring-zinc-600 rounded-lg"
            />
            <label
              htmlFor="namaCeo"
              className="col-span-1 flex flex-row mt-2 text-black dark:text-white"
            >
              NAMA CEO
            </label>
            <input
              id="namaCeo"
              type="text"
              value={namaCeo}
              onChange={(e) => setNamaCeo(e.target.value)}
              className="col-span-4 bg-white dark:bg-[#16171a] p-2.5 focus:outline-none focus:ring focus:duration-300 text-black dark:text-white ring-1 ring-zinc-200 dark:ring-zinc-600 rounded-lg"
            />
            <label
              htmlFor="logoCeo"
              className="col-span-1 flex flex-row mt-2 text-black dark:text-white"
            >
              LOGO CEO
            </label>
            <div className="col-span-4 flex flex-col gap-y-3">
              <img
                src={settingWeb.logo_ceo}
                alt={settingWeb.logo_ceo_filename}
                width={100}
              />
              <input
                id="logoCeo"
                ref={logoCeoRef}
                type="file"
                onChange={(e) => setLogoCeo(e.target.files[0])}
                accept="image/*"
                className="bg-white dark:bg-[#16171a] p-2.5 focus:outline-none focus:ring focus:duration-300 text-black dark:text-white ring-1 ring-zinc-200 dark:ring-zinc-600 rounded-lg"
              />
            </div>
            <label
              htmlFor="deskripsiCeo"
              className="col-span-1 flex flex-row mt-2 text-black dark:text-white"
            >
              DESKRIPSI CEO
            </label>
            <input
              id="deskripsiCeo"
              type="text"
              value={deskripsiCeo}
              onChange={(e) => setDeskripsiCeo(e.target.value)}
              className="col-span-4 bg-white dark:bg-[#16171a] p-2.5 focus:outline-none focus:ring focus:duration-300 text-black dark:text-white ring-1 ring-zinc-200 dark:ring-zinc-600 rounded-lg"
            />
            <label
              htmlFor="namaBaganStore"
              className="col-span-1 flex flex-row mt-2 text-black dark:text-white"
            >
              NAMA BAGAN / STORE
            </label>
            <input
              id="namaBaganStore"
              type="text"
              value={namaBaganStore}
              onChange={(e) => setNamaBaganStore(e.target.value)}
              className="col-span-4 bg-white dark:bg-[#16171a] p-2.5 focus:outline-none focus:ring focus:duration-300 text-black dark:text-white ring-1 ring-zinc-200 dark:ring-zinc-600 rounded-lg"
            />
            <label
              htmlFor="alamatBisnis"
              className="col-span-1 flex flex-row mt-2 text-black dark:text-white"
            >
              ALAMAT BISNIS
            </label>
            <textarea
              id="alamatBisnis"
              type="text"
              value={alamatBisnis}
              onChange={(e) => setAlamatBisnis(e.target.value)}
              rows="2"
              className="col-span-4 bg-white dark:bg-[#16171a] p-2.5 focus:outline-none focus:ring focus:duration-300 text-black dark:text-white ring-1 ring-zinc-200 dark:ring-zinc-600 rounded-lg"
            />
            <label
              htmlFor="emailBisnis"
              className="col-span-1 flex flex-row mt-2 text-black dark:text-white"
            >
              EMAIL BISNIS
            </label>
            <input
              id="emailBisnis"
              type="email"
              value={emailBisnis}
              onChange={(e) => setEmailBisnis(e.target.value)}
              className="col-span-4 bg-white dark:bg-[#16171a] p-2.5 focus:outline-none focus:ring focus:duration-300 text-black dark:text-white ring-1 ring-zinc-200 dark:ring-zinc-600 rounded-lg"
            />
            <label
              htmlFor="nomorBisnis"
              className="col-span-1 flex flex-row mt-2 text-black dark:text-white"
            >
              NOMOR BISNIS
            </label>
            <input
              id="nomorBisnis"
              type="text"
              value={nomorBisnis}
              onChange={(e) => setNomorBisnis(e.target.value)}
              className="col-span-4 bg-white dark:bg-[#16171a] p-2.5 focus:outline-none focus:ring focus:duration-300 text-black dark:text-white ring-1 ring-zinc-200 dark:ring-zinc-600 rounded-lg"
            />
          </div>
          <div className="flex flex-row gap-3 justify-end mt-2">
            <button
              type="button"
              onClick={handleResetTentangKami}
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

export default KonfigurasiTentangKami;
