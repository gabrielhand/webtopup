import axios from "axios";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

const KonfigurasiWebsite = () => {
  const { settingWeb, getSettingWeb } = useOutletContext();
  const [judulWebsite, setJudulWebsite] = useState("");
  const [deskripsiWebsite, setDeskripsiWebsite] = useState("");
  const [keyword, setKeyword] = useState("");
  const [headerImageWebsite, setHeaderImageWebsite] = useState(null);
  const [logoHeader, setLogoHeader] = useState(null);
  const [logoFooter, setLogoFooter] = useState(null);
  const [logoFavicon, setLogoFavicon] = useState(null);
  const [bannerLoginRegister, setBannerLoginRegister] = useState(null);
  const [urlWa, setUrlWa] = useState("");
  const [urlIg, setUrlIg] = useState("");
  const [urlTikTok, setUrlTikTok] = useState("");
  const [urlYt, setUrlYt] = useState("");
  const [urlFb, setUrlFb] = useState("");

  useEffect(() => {
    if (settingWeb) {
      setJudulWebsite(settingWeb.judul_web || "");
      setDeskripsiWebsite(settingWeb.deskripsi_web || "");
      setKeyword(settingWeb.keyword || "");
      setUrlWa(settingWeb.url_wa || "");
      setUrlIg(settingWeb.url_ig || "");
      setUrlTikTok(settingWeb.url_tiktok || "");
      setUrlYt(settingWeb.url_youtube || "");
      setUrlFb(settingWeb.url_fb || "");
    }
  }, [settingWeb]);
  const handleResetWebsite = () => {
    setJudulWebsite(settingWeb.judul_web);
    setDeskripsiWebsite(settingWeb.deskripsi_web);
    setKeyword(settingWeb.keyword);
    setUrlWa(settingWeb.url_wa);
    setUrlIg(settingWeb.url_ig);
    setUrlTikTok(settingWeb.url_tiktok);
    setUrlYt(settingWeb.url_youtube);
    setUrlFb(settingWeb.url_fb);
  };

  const saveKonfigurasiWebsite = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("judul_web", judulWebsite);
      formData.append("deskripsi_web", deskripsiWebsite);
      formData.append("keyword", keyword);
      formData.append("og_image", headerImageWebsite);
      formData.append("logo_header", logoHeader);
      formData.append("logo_footer", logoFooter);
      formData.append("logo_favicon", logoFavicon);
      formData.append("banner_login_register", bannerLoginRegister);
      formData.append("url_wa", urlWa);
      formData.append("url_ig", urlIg);
      formData.append("url_tiktok", urlTikTok);
      formData.append("url_yt", urlYt);
      formData.append("url_fb", urlFb);

      const response = await axios.patch(
        "http://localhost:5000/settingweb/konfigurasi/website",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);
      handleResetWebsite();
      getSettingWeb();
    } catch (error) {
      handleResetWebsite();
      console.log(error.message);
    }
  };
  return (
    <div
      id="konfigurasiWebsiteSection"
      className="col-span-11 flex flex-col gap-y-4"
    >
      <div className="flex flex-row lg:text-2xl text-black dark:text-white font-semibold">
        Konfigurasi Website
      </div>
      <div className="bg-white dark:bg-[#2d2d2e] rounded-xl shadow-md p-5">
        <form
          onSubmit={saveKonfigurasiWebsite}
          className="flex flex-col gap-y-4"
        >
          <div className="grid grid-cols-5 gap-y-4 gap-x-2">
            <label
              htmlFor="judulWebsite"
              className="col-span-1 flex flex-row items-center text-black dark:text-white"
            >
              Judul Website
            </label>
            <input
              id="judulWebsite"
              type="text"
              value={judulWebsite}
              onChange={(e) => setJudulWebsite(e.target.value)}
              className="col-span-4 bg-white dark:bg-[#16171a] p-2.5 focus:outline-none focus:ring focus:duration-300 text-black dark:text-white ring-1 ring-zinc-200 dark:ring-zinc-600 rounded-lg"
            />
            <label
              htmlFor="deskripsiWebsite"
              className="col-span-1 flex flex-row items-center text-black dark:text-white"
            >
              Deskripsi Website
            </label>
            <textarea
              id="deskripsiWebsite"
              type="text"
              value={deskripsiWebsite}
              onChange={(e) => setDeskripsiWebsite(e.target.value)}
              rows="5"
              className="col-span-4 bg-white dark:bg-[#16171a] p-2.5 focus:outline-none focus:ring focus:duration-300 text-black dark:text-white ring-1 ring-zinc-200 dark:ring-zinc-600 rounded-lg"
            />
            <label
              htmlFor="keyword"
              className="col-span-1 flex flex-row items-center text-black dark:text-white"
            >
              Keyword
            </label>
            <textarea
              id="keyword"
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              rows="5"
              className="col-span-4 bg-white dark:bg-[#16171a] p-2.5 focus:outline-none focus:ring focus:duration-300 text-black dark:text-white ring-1 ring-zinc-200 dark:ring-zinc-600 rounded-lg"
            />
            <label
              htmlFor="headerImageWebsite"
              className="col-span-1 flex flex-row mt-2 text-black dark:text-white"
            >
              Header Image Website
            </label>
            <div className="col-span-4 flex flex-col gap-y-3">
              <img
                src={settingWeb.og_image}
                alt={settingWeb.og_image_filename}
                width={100}
              />
              <input
                id="headerImageWebsite"
                type="file"
                onChange={(e) => setHeaderImageWebsite(e.target.files[0])}
                accept="image/*"
                className="bg-white dark:bg-[#16171a] p-2.5 focus:outline-none focus:ring focus:duration-300 text-black dark:text-white ring-1 ring-zinc-200 dark:ring-zinc-600 rounded-lg"
              />
            </div>
            <label
              htmlFor="logoHeader"
              className="col-span-1 flex flex-row mt-2 text-black dark:text-white"
            >
              Logo Header
            </label>
            <div className="col-span-4 flex flex-col gap-y-3">
              <img
                src={settingWeb.logo_header}
                alt={settingWeb.logo_header_filename}
                width={100}
              />
              <input
                id="logoHeader"
                type="file"
                onChange={(e) => setLogoHeader(e.target.files[0])}
                accept="image/*"
                className="bg-white dark:bg-[#16171a] p-2.5 focus:outline-none focus:ring focus:duration-300 text-black dark:text-white ring-1 ring-zinc-200 dark:ring-zinc-600 rounded-lg"
              />
            </div>
            <label
              htmlFor="logoFooter"
              className="col-span-1 flex flex-row mt-2 text-black dark:text-white"
            >
              Logo Footer
            </label>
            <div className="col-span-4 flex flex-col gap-y-3">
              <img
                src={settingWeb.logo_footer}
                alt={settingWeb.logo_footer_filename}
                width={100}
              />
              <input
                id="logoFooter"
                type="file"
                onChange={(e) => setLogoFooter(e.target.files[0])}
                accept="image/*"
                className="bg-white dark:bg-[#16171a] p-2.5 focus:outline-none focus:ring focus:duration-300 text-black dark:text-white ring-1 ring-zinc-200 dark:ring-zinc-600 rounded-lg"
              />
            </div>
            <label
              htmlFor="logoFavicon"
              className="col-span-1 flex flex-row mt-2 text-black dark:text-white"
            >
              Logo Favicon
            </label>
            <div className="col-span-4 flex flex-col gap-y-3">
              <img
                src={settingWeb.logo_favicon}
                alt={settingWeb.logo_favicon_filename}
                width={100}
              />
              <input
                id="logoFavicon"
                type="file"
                onChange={(e) => setLogoFavicon(e.target.files[0])}
                accept="image/*"
                className="bg-white dark:bg-[#16171a] p-2.5 focus:outline-none focus:ring focus:duration-300 text-black dark:text-white ring-1 ring-zinc-200 dark:ring-zinc-600 rounded-lg"
              />
            </div>
            <label
              htmlFor="bannerLoginRegister"
              className="col-span-1 flex flex-row mt-2 text-black dark:text-white"
            >
              Banner Login Register
            </label>
            <div className="col-span-4 flex flex-col gap-y-3">
              <img
                src={settingWeb.banner_login_register}
                alt={settingWeb.banner_login_register_filename}
                width={100}
              />
              <input
                id="bannerLoginRegister"
                type="file"
                onChange={(e) => setBannerLoginRegister(e.target.files[0])}
                accept="image/*"
                className="bg-white dark:bg-[#16171a] p-2.5 focus:outline-none focus:ring focus:duration-300 text-black dark:text-white ring-1 ring-zinc-200 dark:ring-zinc-600 rounded-lg"
              />
            </div>
            <label
              htmlFor="urlWa"
              className="col-span-1 flex flex-row items-center text-black dark:text-white"
            >
              Url Wa
            </label>
            <input
              id="urlWa"
              type="text"
              value={urlWa}
              onChange={(e) => setUrlWa(e.target.value)}
              className="col-span-4 bg-white dark:bg-[#16171a] p-2.5 focus:outline-none focus:ring focus:duration-300 text-black dark:text-white ring-1 ring-zinc-200 dark:ring-zinc-600 rounded-lg"
            />
            <label
              htmlFor="urlIg"
              className="col-span-1 flex flex-row items-center text-black dark:text-white"
            >
              Url Ig
            </label>
            <input
              id="urlIg"
              type="text"
              value={urlIg}
              onChange={(e) => setUrlIg(e.target.value)}
              className="col-span-4 bg-white dark:bg-[#16171a] p-2.5 focus:outline-none focus:ring focus:duration-300 text-black dark:text-white ring-1 ring-zinc-200 dark:ring-zinc-600 rounded-lg"
            />
            <label
              htmlFor="urlTikTok"
              className="col-span-1 flex flex-row items-center text-black dark:text-white"
            >
              Url TikTok
            </label>
            <input
              id="urlTikTok"
              type="text"
              value={urlTikTok}
              onChange={(e) => setUrlTikTok(e.target.value)}
              className="col-span-4 bg-white dark:bg-[#16171a] p-2.5 focus:outline-none focus:ring focus:duration-300 text-black dark:text-white ring-1 ring-zinc-200 dark:ring-zinc-600 rounded-lg"
            />
            <label
              htmlFor="urlYt"
              className="col-span-1 flex flex-row items-center text-black dark:text-white"
            >
              Url YouTube
            </label>
            <input
              id="urlYt"
              type="text"
              value={urlYt}
              onChange={(e) => setUrlYt(e.target.value)}
              className="col-span-4 bg-white dark:bg-[#16171a] p-2.5 focus:outline-none focus:ring focus:duration-300 text-black dark:text-white ring-1 ring-zinc-200 dark:ring-zinc-600 rounded-lg"
            />
            <label
              htmlFor="urlFb"
              className="col-span-1 flex flex-row items-center text-black dark:text-white"
            >
              Url Facebook
            </label>
            <input
              id="urlFb"
              type="text"
              value={urlFb}
              onChange={(e) => setUrlFb(e.target.value)}
              className="col-span-4 bg-white dark:bg-[#16171a] p-2.5 focus:outline-none focus:ring focus:duration-300 text-black dark:text-white ring-1 ring-zinc-200 dark:ring-zinc-600 rounded-lg"
            />
          </div>
          <div className="flex flex-row gap-3 justify-end mt-2">
            <button
              type="button"
              onClick={handleResetWebsite}
              className="bg-zinc-300 px-3 py-2 rounded-md text-black"
            >
              Reset
            </button>
            <button
              type="button"
              className="bg-purple-500 px-3 py-2 rounded-md text-white"
            >
              Maintenance
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

export default KonfigurasiWebsite;
