import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const DetailAkun = ({
  userId,
  setUserId,
  zone,
  setZone,
  emailJoki,
  setEmailJoki,
  passwordJoki,
  setPasswordJoki,
  requestJoki,
  setRequestJoki,
  catatanJoki,
  setCatatanJoki,
  nicknameJoki,
  setNicknameJoki,
  detailAkun,
}) => {
  const [servers, setServer] = useState([]);
  const [selectedServer, setSelectedServer] = useState(null);
  const [isMenuServerOpen, setMenuServerOpen] = useState(null);

  useEffect(() => {
    if (detailAkun.kode == "life-after") {
      setServer([
        { name: "Miska Town", value: "miskatown" },
        { name: "Sand Castle", value: "sandcastle" },
        { name: "Mouth Swamp", value: "mouthswamp" },
        { name: "Red Wood Town", value: "redwoodtown" },
        { name: "Oblisk", value: "obelisk" },
        { name: "Fall Forest", value: "fallforest" },
        { name: "Mount Snow", value: "mountsnow" },
        { name: "Charles Town", value: "charlestown" },
        { name: "Snow High Lands", value: "snowhighlands" },
        { name: "Santopany", value: "santopany" },
        { name: "Levin City", value: "levincity" },
        { name: "New Land", value: "newland" },
        { name: "Mile Stone", value: "milestone" },
      ]);
    } else if (detailAkun.kode == "tof") {
      setServer([
        { name: "Southeast Asia-Osillron", value: "Southeast Asia-Osillron" },
        {
          name: "Southeast Asia-Mistilteinn",
          value: "Southeast Asia-Mistilteinn",
        },
        { name: "Southeast Asia-Illyrians", value: "Southeast Asia-Illyrians" },
        { name: "Southeast Asia-Florione", value: "Southeast Asia-Florione" },
        { name: "Southeast Asia-Animus", value: "Southeast Asia-Animus" },
        { name: "Southeast Asia-Gumi Gumi", value: "Southeast Asia-Gumi Gumi" },
        { name: "Southeast Asia-Oryza", value: "Southeast Asia-Oryza" },
        { name: "Southeast Asia-Saeri", value: "Southeast Asia-Saeri" },
        { name: "Southeast Asia-Phantasia", value: "Southeast Asia-Phantasia" },
        {
          name: "Southeast Asia-Mechafield",
          value: "Southeast Asia-Mechafield",
        },
        {
          name: "Southeast Asia-Ethereal Dream",
          value: "Southeast Asia-Ethereal Dream",
        },
        { name: "Southeast Asia-Odyssey", value: "Southeast Asia-Odyssey" },
        {
          name: "Southeast Asia-Aestral-Noa",
          value: "Southeast Asia-Aestral-Noa",
        },
        { name: "Southeast Asia-Chandra", value: "Southeast Asia-Chandra" },
        { name: "Southeast Asia-Aeria", value: "Southeast Asia-Aeria" },
        { name: "Southeast Asia-Scarlet", value: "Southeast Asia-Scarlet" },
        { name: "Southeast Asia-Fantasia", value: "Southeast Asia-Fantasia" },
        { name: "Southeast Asia-Stardust", value: "Southeast Asia-Stardust" },
        { name: "Southeast Asia-Arcania", value: "Southeast Asia-Arcania" },
        { name: "Southeast Asia-Valhalla", value: "Southeast Asia-Valhalla" },
        { name: "North America-Lunalite", value: "North America-Lunalite" },
        { name: "North America-Sol-III", value: "North America-Sol-III" },
        { name: "North America-Lighthouse", value: "North America-Lighthouse" },
        {
          name: "North America-Silver Bridge",
          value: "North America-Silver Bridge",
        },
        { name: "North America-The Glades", value: "North America-The Glades" },
        { name: "North America-Nightfall", value: "North America-Nightfall" },
        { name: "North America-Frontier", value: "North America-Frontier" },
        { name: "North America-Libera", value: "North America-Libera" },
        { name: "North America-Solaris", value: "North America-Solaris" },
        {
          name: "North America-Freedom-Oasis",
          value: "North America-Freedom-Oasis",
        },
        {
          name: "North America-The Worlds Between",
          value: "North America-The Worlds Between",
        },
        { name: "North America-Radiant", value: "North America-Radiant" },
        { name: "North America-Tempest", value: "North America-Tempest" },
        { name: "North America-New Era", value: "North America-New Era" },
        { name: "North America-Observer", value: "North America-Observer" },
        { name: "North America-Starlight", value: "North America-Starlight" },
        { name: "North America-Myriad", value: "North America-Myriad" },
        { name: "North America-Oumuamua", value: "North America-Oumuamua" },
        {
          name: "North America-Eternium Phantasy",
          value: "North America-Eternium Phantasy",
        },
        {
          name: "North America-Azure Plane",
          value: "North America-Azure Plane",
        },
        { name: "North America-Nirvana", value: "North America-Nirvana" },
        {
          name: "Europe-Magia Przygoda Aida",
          value: "Europe-Magia Przygoda Aida",
        },
        { name: "Europe-Transport Hub", value: "Europe-Transport Hub" },
        { name: "Europe-The Lumina", value: "Europe-The Lumina" },
        { name: "Europe-Lycoris", value: "Europe-Lycoris" },
        { name: "Europe-Ether", value: "Europe-Ether" },
        { name: "Europe-Olivine", value: "Europe-Olivine" },
        { name: "Europe-Iter", value: "Europe-Iter" },
        { name: "Europe-Aimanium", value: "Europe-Aimanium" },
        { name: "Europe-Alintheus", value: "Europe-Alintheus" },
        { name: "Europe-Andoes", value: "Europe-Andoes" },
        { name: "Europe-Anomora", value: "Europe-Anomora" },
        { name: "Europe-Astora", value: "Europe-Astora" },
        { name: "Europe-Valstamm", value: "Europe-Valstamm" },
        { name: "Europe-Blumous", value: "Europe-Blumous" },
        { name: "Europe-Celestialrise", value: "Europe-Celestialrise" },
        { name: "Europe-Cosmos", value: "Europe-Cosmos" },
        { name: "Europe-Dyrnwyn", value: "Europe-Dyrnwyn" },
        { name: "Europe-Elypium", value: "Europe-Elypium" },
        { name: "Europe-Excalibur", value: "Europe-Excalibur" },
        { name: "Europe-Espoir IV", value: "Europe-Espoir IV" },
        { name: "Europe-Estrela", value: "Europe-Estrela" },
        { name: "Europe-Ex Nihilor", value: "Europe-Ex Nihilor" },
        { name: "Europe-Futuria", value: "Europe-Futuria" },
        { name: "Europe-Hephaestus", value: "Europe-Hephaestus" },
        { name: "Europe-Midgard", value: "Europe-Midgard" },
        { name: "Europe-Kuura", value: "Europe-Kuura" },
        { name: "Europe-Lyramiel", value: "Europe-Lyramiel" },
        { name: "Europe-Magenta", value: "Europe-Magenta" },
        { name: "Europe-Omnium Prime", value: "Europe-Omnium Prime" },
        { name: "Europe-Turmus", value: "Europe-Turmus" },
        { name: "South America-Corvus", value: "South America-Corvus" },
        {
          name: "South America-Calodesma Seven",
          value: "South America-Calodesma Seven",
        },
        { name: "South America-Columba", value: "South America-Columba" },
        { name: "South America-Tiamat", value: "South America-Tiamat" },
        { name: "South America-Orion", value: "South America-Orion" },
        { name: "South America-Luna Azul", value: "South America-Luna Azul" },
        { name: "South America-Hope", value: "South America-Hope" },
        { name: "South America-Tanzanite", value: "South America-Tanzanite" },
        { name: "South America-Antlia", value: "South America-Antlia" },
        { name: "South America-Pegasusx", value: "South America-Pegasusx" },
        { name: "South America-Phoenix", value: "South America-Phoenix" },
        { name: "South America-Centaurus", value: "South America-Centaurus" },
        { name: "South America-Cepheu", value: "South America-Cepheu" },
        { name: "South America-Cygnus", value: "South America-Cygnus" },
        { name: "South America-Grus", value: "South America-Grus" },
        { name: "South America-Hydra", value: "South America-Hydra" },
        { name: "South America-Lyra", value: "South America-Lyra" },
        { name: "South America-Ophiuchus", value: "South America-Ophiuchus" },
        {
          name: "Asia-Pacific-Cocoaiteruyo",
          value: "Asia-Pacific-Cocoaiteruyo",
        },
        {
          name: "Asia-Pacific-Food Fighter",
          value: "Asia-Pacific-Food Fighter",
        },
        { name: "Asia-Pacific-Gomap", value: "Asia-Pacific-Gomap" },
        { name: "Asia-Pacific-Yggdrasil", value: "Asia-Pacific-Yggdrasil" },
        { name: "Asia-Pacific-Daybreak", value: "Asia-Pacific-Daybreak" },
        { name: "Asia-Pacific-Adventure", value: "Asia-Pacific-Adventure" },
        { name: "Asia-Pacific-Eden", value: "Asia-Pacific-Eden" },
        { name: "Asia-Pacific-Fate", value: "Asia-Pacific-Fate" },
        { name: "Asia-Pacific-Nova", value: "Asia-Pacific-Nova" },
        { name: "Asia-Pacific-Ruby", value: "Asia-Pacific-Ruby" },
        { name: "Asia-Pacific-Babel", value: "Asia-Pacific-Babel" },
        { name: "Asia-Pacific-Pluto", value: "Asia-Pacific-Pluto" },
        { name: "Asia-Pacific-Sushi", value: "Asia-Pacific-Sushi" },
        { name: "Asia-Pacific-Venus", value: "Asia-Pacific-Venus" },
        { name: "Asia-Pacific-Galaxy", value: "Asia-Pacific-Galaxy" },
        { name: "Asia-Pacific-Memory", value: "Asia-Pacific-Memory" },
        { name: "Asia-Pacific-Oxygen", value: "Asia-Pacific-Oxygen" },
        { name: "Asia-Pacific-Sakura", value: "Asia-Pacific-Sakura" },
        { name: "Asia-Pacific-Seeker", value: "Asia-Pacific-Seeker" },
        { name: "Asia-Pacific-Shinya", value: "Asia-Pacific-Shinya" },
        { name: "Asia-Pacific-Stella", value: "Asia-Pacific-Stella" },
        { name: "Asia-Pacific-Uranus", value: "Asia-Pacific-Uranus" },
        { name: "Asia-Pacific-Utopia", value: "Asia-Pacific-Utopia" },
        { name: "Asia-Pacific-Jupiter", value: "Asia-Pacific-Jupiter" },
        { name: "Asia-Pacific-Sweetie", value: "Asia-Pacific-Sweetie" },
        { name: "Asia-Pacific-Atlantis", value: "Asia-Pacific-Atlantis" },
        { name: "Asia-Pacific-Takoyaki", value: "Asia-Pacific-Takoyaki" },
        { name: "Asia-Pacific-Mars", value: "Asia-Pacific-Mars" },
      ]);
    } else if (detailAkun.kode == "genshin-impact") {
      setServer([
        { name: "America", value: "os_usa" },
        { name: "Europa", value: "os_euro" },
        { name: "Asia", value: "os_asia" },
        { name: "TW_HK_MO", value: "os_cht" },
      ]);
    } else if (detailAkun.kode == "honkai-star-rail") {
      setServer([
        { name: "America", value: "os_usa" },
        { name: "Europa", value: "os_euro" },
        { name: "Asia", value: "os_asia" },
        { name: "TW_HK_MO", value: "os_cht" },
      ]);
    } else if (detailAkun.kode == "heroes-evolved") {
      setServer([
        {
          name: "North America - LOST TEMPLE [NA]",
          value: "North America - LOST TEMPLE [NA]",
        },
        {
          name: "North America - NEW ORDER",
          value: "North America - NEW ORDER",
        },
        { name: "Europe - ASGARD [EU]", value: "Europe - ASGARD [EU]" },
        { name: "Europe - OLYMPUS [EU]", value: "Europe - OLYMPUS [EU]" },
        {
          name: "South America - AMAZON [SA]",
          value: "South America - AMAZON [SA]",
        },
        {
          name: "South America - EL DORADO [SA]",
          value: "South America - EL DORADO [SA]",
        },
        { name: "Asia - SHANGRI-LA [AS]", value: "Asia - SHANGRI-LA [AS]" },
        { name: "Asia - S1.ANGKOR [AS]", value: "Asia - S1.ANGKOR [AS]" },
        { name: "Asia - S2.EL NIDO [AS]", value: "Asia - S2.EL NIDO [AS]" },
        { name: "Asia - ไทย[TH]", value: "Asia - ไทย[TH]" },
        { name: "Asia - ไทยแลนด์[TH]", value: "Asia - ไทยแลนด์[TH]" },
      ]);
    } else if (detailAkun.kode == "ragnarok-m") {
      setServer([
        { name: "Eternal Love", value: "90001" },
        { name: "Midnight Party", value: "90002" },
        { name: "Memory Of Faith", value: "90002003" },
      ]);
    } else if (detailAkun.kode == "shell-fire") {
      setServer([
        { name: "Android", value: "android" },
        { name: "IOS", value: "ios" },
      ]);
    } else if (detailAkun.kode == "ragnarok-forever-love") {
      setServer([{ name: "ALL SERVER", value: "allserver" }]);
    } else if (detailAkun.kode == "perfect-world") {
      setServer([
        { name: "Moonlight", value: "moonlight" },
        { name: "Lotus", value: "lotus" },
        { name: "Crimson", value: "crimson" },
        { name: "Kirin", value: "kirin" },
        { name: "Moral", value: "moral" },
      ]);
    } else if (detailAkun.kode == "asphalt-9-legends") {
      setServer([
        { name: "IOS", value: "ios" },
        { name: "Android", value: "android" },
        { name: "Windows", value: "Windows" },
      ]);
    } else {
      setServer([]);
    }
  }, [detailAkun]);

  const toggleMenuServer = () => {
    setMenuServerOpen(!isMenuServerOpen);
  };

  const handleServerSelection = (server) => {
    setSelectedServer(server);
    setZone(server.value);
    setMenuServerOpen(false);
  };
  return (
    <div
      id="DetailAkun-Content"
      className="flex flex-col gap-y-3 w-full rounded-xl px-5 py-5 bg-white dark:bg-[#323336] shadow-lg"
    >
      {detailAkun.server_id &&
      detailAkun.kode != "life-after" &&
      detailAkun.kode != "joki" &&
      detailAkun.kode != "genshin-impact" &&
      detailAkun.kode != "honkai-star-rail" &&
      detailAkun.kode != "ragnarok-m" &&
      detailAkun.kode != "tof" ? (
        <div className="grid grid-cols-7 gap-x-2">
          <div className="col-span-4 flex flex-col gap-y-3">
            <p className="dark:text-white font-medium">User ID</p>
            <input
              type="number"
              name="ID ML"
              autoComplete="off"
              autoCorrect="off"
              id="user_id"
              value={userId || ""}
              onChange={(e) => setUserId(e.target.value)}
              autoSave="false"
              placeholder={detailAkun.placeholder_1}
              className="bg-slate-100 dark:bg-white dark:text-black w-full border border-[#4169e1] placeholder:font-normal placeholder:text-zinc-400 font-medium focus:outline focus:outline-2 focus:outline-offset-1 focus:outline-[#4169e1] rounded-xl px-4 py-2.5"
            />
          </div>
          <div className="col-span-3 flex flex-col gap-y-3">
            <p className="dark:text-white font-medium">Server</p>
            <input
              type="number"
              name="zone"
              autoComplete="off"
              autoCorrect="off"
              id="zone"
              value={zone || ""}
              onChange={(e) => setZone(e.target.value)}
              autoSave="false"
              placeholder={detailAkun.placeholder_2}
              className="bg-slate-100 dark:bg-white dark:text-black w-full border border-[#4169e1] placeholder:font-normal placeholder:text-zinc-400 font-medium focus:outline focus:outline-2 focus:outline-offset-1 focus:outline-[#4169e1] rounded-xl px-4 py-2.5"
            />
          </div>
        </div>
      ) : detailAkun.kode == "life-after" ? (
        <div className="grid grid-cols-11 gap-x-2">
          <div className="col-span-6 flex flex-col gap-y-3">
            <p className="dark:text-white font-medium">ID Akun</p>
            <input
              type="number"
              name="ID ML"
              autoComplete="off"
              autoCorrect="off"
              id="user_id"
              value={userId || ""}
              onChange={(e) => setUserId(e.target.value)}
              autoSave="false"
              placeholder={detailAkun.placeholder_1}
              className="bg-slate-100 dark:bg-white dark:text-black w-full border border-gray-500 dark:border-gray-400 placeholder:font-normal placeholder:text-zinc-400 font-medium focus:outline focus:outline-2 focus:outline-offset-1 focus:outline-[#4169e1] rounded-xl px-4 py-2.5"
            />
          </div>
          <div className="col-span-5 flex flex-col gap-y-3">
            <p className="dark:text-white font-medium">Server</p>
            <div className="relative">
              <div
                onClick={toggleMenuServer}
                className={`flex flex-row items-center justify-between bg-slate-100 dark:bg-white dark:text-zinc-600 lg:text-base md:text-base text-sm w-full rounded-xl border border-gray-500 dark:border-gray-400 px-4 py-2.5 cursor-pointer`}
              >
                <p className="whitespace-nowrap truncate">
                  {selectedServer ? selectedServer.name : "Pilih Server"}
                </p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth={1}
                  className={`bi bi-caret-down-fill transform transition-transform duration-300 ${
                    isMenuServerOpen ? "rotate-180" : "rotate-0"
                  }`}
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
                  />
                </svg>
              </div>
              <ul
                id="menu-pilih-server"
                className={`absolute top-12 z-10 lg:max-w-xs md:max-w-xs lg:w-full md:w-full w-44 scrollbar scrollbar-thumb-black bg-slate-100 dark:bg-white rounded-xl border border-zinc-500 shadow-lg transform transition-all duration-300 overflow-hidden ${
                  isMenuServerOpen
                    ? "max-h-64 opacity-100 overflow-y-auto"
                    : "max-h-0 opacity-0"
                }`}
              >
                {servers.map((server) => (
                  <li
                    key={server.value}
                    onClick={() => {
                      setSelectedServer(server);
                      setMenuServerOpen(false);
                    }}
                    className={`flex flex-row w-full items-center justify-between lg:text-base md:text-base text-sm font-light cursor-pointer text-black hover:bg-[#4169e1] hover:text-white group hover:duration-150 px-3 py-2 ${
                      selectedServer === server.name
                        ? "font-semibold"
                        : "font-normal"
                    }`}
                  >
                    {server.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : detailAkun.kode == "tof" ? (
        <div className="grid grid-cols-1 grid-rows-2 gap-x-2 gap-y-4">
          <div className="col-span-1 flex flex-col gap-y-3">
            <p className="dark:text-white font-medium">UID</p>
            <input
              type="number"
              name="ID ML"
              autoComplete="off"
              autoCorrect="off"
              id="user_id"
              value={userId || ""}
              onChange={(e) => setUserId(e.target.value)}
              autoSave="false"
              placeholder={detailAkun.placeholder_1}
              className="bg-slate-100 dark:bg-white dark:text-black w-full border border-gray-500 dark:border-gray-400 placeholder:font-normal placeholder:text-zinc-400 font-medium focus:outline focus:outline-2 focus:outline-offset-1 focus:outline-[#4169e1] rounded-xl px-4 py-2.5"
            />
          </div>
          <div className="col-span-1 flex flex-col gap-y-3">
            <p className="dark:text-white font-medium">Server</p>
            <div className="relative">
              <div
                onClick={toggleMenuServer}
                className={`flex flex-row items-center justify-between bg-slate-100 dark:bg-white dark:text-zinc-600 lg:text-base md:text-base text-sm w-full rounded-xl border border-gray-500 dark:border-gray-400 px-4 py-2.5 cursor-pointer`}
              >
                <p className="whitespace-nowrap truncate">
                  {selectedServer ? selectedServer.name : "Pilih Server"}
                </p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth={1}
                  className={`bi bi-caret-down-fill transform transition-transform duration-300 ${
                    isMenuServerOpen ? "rotate-180" : "rotate-0"
                  }`}
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
                  />
                </svg>
              </div>
              <ul
                id="menu-pilih-server"
                className={`absolute top-12 z-10 w-full scrollbar scrollbar-thumb-black bg-slate-100 dark:bg-white rounded-xl border border-zinc-500 shadow-lg transform transition-all duration-300 overflow-hidden ${
                  isMenuServerOpen
                    ? "max-h-64 opacity-100 overflow-y-auto"
                    : "max-h-0 opacity-0"
                }`}
              >
                {servers.map((server) => (
                  <li
                    key={server.value}
                    onClick={() => handleServerSelection(server)}
                    className={`flex flex-row w-full items-center justify-between lg:text-base md:text-base text-sm font-light cursor-pointer text-black hover:bg-[#4169e1] hover:text-white group hover:duration-150 px-3 py-2 ${
                      selectedServer === server.name
                        ? "font-semibold"
                        : "font-normal"
                    }`}
                  >
                    {server.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : detailAkun.kode == "genshin-impact" ? (
        <div className="grid grid-cols-7 gap-x-2">
          <div className="col-span-4 flex flex-col gap-y-3">
            <p className="dark:text-white font-medium">ID Akun</p>
            <input
              type="number"
              name="ID ML"
              autoComplete="off"
              autoCorrect="off"
              id="user_id"
              value={userId || ""}
              onChange={(e) => setUserId(e.target.value)}
              autoSave="false"
              placeholder={detailAkun.placeholder_1}
              className="bg-slate-100 dark:bg-white dark:text-black w-full border border-gray-500 dark:border-gray-400 placeholder:font-normal placeholder:text-zinc-400 font-medium focus:outline focus:outline-2 focus:outline-offset-1 focus:outline-[#4169e1] rounded-xl px-4 py-2.5"
            />
          </div>
          <div className="col-span-3 flex flex-col gap-y-3">
            <p className="dark:text-white font-medium">Server</p>
            <div className="relative">
              <div
                onClick={toggleMenuServer}
                className={`flex flex-row items-center justify-between bg-slate-100 dark:bg-white dark:text-zinc-600 lg:text-base md:text-base text-sm w-full rounded-xl border border-gray-500 dark:border-gray-400 px-4 py-2.5 cursor-pointer`}
              >
                <p className="whitespace-nowrap truncate">
                  {selectedServer ? selectedServer.name : "Pilih Server"}
                </p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth={1}
                  className={`bi bi-caret-down-fill transform transition-transform duration-300 ${
                    isMenuServerOpen ? "rotate-180" : "rotate-0"
                  }`}
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
                  />
                </svg>
              </div>
              <ul
                id="menu-pilih-server"
                className={`absolute top-12 z-10 w-full scrollbar scrollbar-thumb-black bg-slate-100 dark:bg-white rounded-xl border border-zinc-500 shadow-lg transform transition-all duration-300 overflow-hidden ${
                  isMenuServerOpen
                    ? "max-h-64 opacity-100 overflow-y-auto"
                    : "max-h-0 opacity-0"
                }`}
              >
                {servers.map((server) => (
                  <li
                    key={server.value}
                    onClick={() => {
                      setSelectedServer(server);
                      setMenuServerOpen(false);
                    }}
                    className={`flex flex-row w-full items-center justify-between lg:text-base md:text-base text-sm font-light cursor-pointer text-black hover:bg-[#4169e1] hover:text-white group hover:duration-150 px-3 py-2 ${
                      selectedServer === server.name
                        ? "font-semibold"
                        : "font-normal"
                    }`}
                  >
                    {server.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : detailAkun.kode == "honkai-star-rail" ? (
        <div className="grid grid-cols-7 gap-x-2">
          <div className="col-span-4 flex flex-col gap-y-3">
            <p className="dark:text-white font-medium">ID Akun</p>
            <input
              type="number"
              name="ID ML"
              autoComplete="off"
              autoCorrect="off"
              id="user_id"
              value={userId || ""}
              onChange={(e) => setUserId(e.target.value)}
              autoSave="false"
              placeholder={detailAkun.placeholder_1}
              className="bg-slate-100 dark:bg-white dark:text-black w-full border border-gray-500 dark:border-gray-400 placeholder:font-normal placeholder:text-zinc-400 font-medium focus:outline focus:outline-2 focus:outline-offset-1 focus:outline-[#4169e1] rounded-xl px-4 py-2.5"
            />
          </div>
          <div className="col-span-3 flex flex-col gap-y-3">
            <p className="dark:text-white font-medium">Server</p>
            <div className="relative">
              <div
                onClick={toggleMenuServer}
                className={`flex flex-row items-center justify-between bg-slate-100 dark:bg-white dark:text-zinc-600 lg:text-base md:text-base text-sm w-full rounded-xl border border-gray-500 dark:border-gray-400 px-4 py-2.5 cursor-pointer`}
              >
                <p className="whitespace-nowrap truncate">
                  {selectedServer ? selectedServer.name : "Pilih Server"}
                </p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth={1}
                  className={`bi bi-caret-down-fill transform transition-transform duration-300 ${
                    isMenuServerOpen ? "rotate-180" : "rotate-0"
                  }`}
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
                  />
                </svg>
              </div>
              <ul
                id="menu-pilih-server"
                className={`absolute top-12 z-10 w-full scrollbar scrollbar-thumb-black bg-slate-100 dark:bg-white rounded-xl border border-zinc-500 shadow-lg transform transition-all duration-300 overflow-hidden ${
                  isMenuServerOpen
                    ? "max-h-64 opacity-100 overflow-y-auto"
                    : "max-h-0 opacity-0"
                }`}
              >
                {servers.map((server) => (
                  <li
                    key={server.value}
                    onClick={() => {
                      setSelectedServer(server);
                      setMenuServerOpen(false);
                    }}
                    className={`flex flex-row w-full items-center justify-between lg:text-base md:text-base text-sm font-light cursor-pointer text-black hover:bg-[#4169e1] hover:text-white group hover:duration-150 px-3 py-2 ${
                      selectedServer === server.name
                        ? "font-semibold"
                        : "font-normal"
                    }`}
                  >
                    {server.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : detailAkun.kode == "heroes-evolved" ? (
        <div className="grid grid-cols-1 grid-rows-2 gap-x-2 gap-y-4">
          <div className="col-span-1 flex flex-col gap-y-3">
            <p className="dark:text-white font-medium">UID</p>
            <input
              type="number"
              name="ID ML"
              autoComplete="off"
              autoCorrect="off"
              id="user_id"
              value={userId || ""}
              onChange={(e) => setUserId(e.target.value)}
              autoSave="false"
              placeholder={detailAkun.placeholder_1}
              className="bg-slate-100 dark:bg-white dark:text-black w-full border border-gray-500 dark:border-gray-400 placeholder:font-normal placeholder:text-zinc-400 font-medium focus:outline focus:outline-2 focus:outline-offset-1 focus:outline-[#4169e1] rounded-xl px-4 py-2.5"
            />
          </div>
          <div className="col-span-1 flex flex-col gap-y-3">
            <p className="dark:text-white font-medium">Server</p>
            <div className="relative">
              <div
                onClick={toggleMenuServer}
                className={`flex flex-row items-center justify-between bg-slate-100 dark:bg-white dark:text-zinc-600 lg:text-base md:text-base text-sm w-full rounded-xl border border-gray-500 dark:border-gray-400 px-4 py-2.5 cursor-pointer`}
              >
                <p className="whitespace-nowrap truncate">
                  {selectedServer ? selectedServer.name : "Pilih Server"}
                </p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth={1}
                  className={`bi bi-caret-down-fill transform transition-transform duration-300 ${
                    isMenuServerOpen ? "rotate-180" : "rotate-0"
                  }`}
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
                  />
                </svg>
              </div>
              <ul
                id="menu-pilih-server"
                className={`absolute top-12 z-10 w-full scrollbar scrollbar-thumb-black bg-slate-100 dark:bg-white rounded-xl border border-zinc-500 shadow-lg transform transition-all duration-300 overflow-hidden ${
                  isMenuServerOpen
                    ? "max-h-64 opacity-100 overflow-y-auto"
                    : "max-h-0 opacity-0"
                }`}
              >
                {servers.map((server) => (
                  <li
                    key={server.value}
                    onClick={() => handleServerSelection(server)}
                    className={`flex flex-row w-full items-center justify-between lg:text-base md:text-base text-sm font-light cursor-pointer text-black hover:bg-[#4169e1] hover:text-white group hover:duration-150 px-3 py-2 ${
                      selectedServer === server.name
                        ? "font-semibold"
                        : "font-normal"
                    }`}
                  >
                    {server.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : detailAkun.kode == "ragnarok-m" ? (
        <div className="grid grid-cols-11 gap-x-2">
          <div className="col-span-6 flex flex-col gap-y-3">
            <p className="dark:text-white font-medium">UID</p>
            <input
              type="number"
              name="ID ML"
              autoComplete="off"
              autoCorrect="off"
              id="user_id"
              value={userId || ""}
              onChange={(e) => setUserId(e.target.value)}
              autoSave="false"
              placeholder={detailAkun.placeholder_1}
              className="bg-slate-100 dark:bg-white dark:text-black w-full border border-gray-500 dark:border-gray-400 placeholder:font-normal placeholder:text-zinc-400 font-medium focus:outline focus:outline-2 focus:outline-offset-1 focus:outline-[#4169e1] rounded-xl px-4 py-2.5"
            />
          </div>
          <div className="col-span-5 flex flex-col gap-y-3">
            <p className="dark:text-white font-medium">Server</p>
            <div className="relative">
              <div
                onClick={toggleMenuServer}
                className={`flex flex-row items-center justify-between bg-slate-100 dark:bg-white dark:text-zinc-600 lg:text-base md:text-base text-sm w-full rounded-xl border border-gray-500 dark:border-gray-400 px-4 py-2.5 cursor-pointer`}
              >
                <p className="whitespace-nowrap truncate">
                  {selectedServer ? selectedServer.name : "Pilih Server"}
                </p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth={1}
                  className={`bi bi-caret-down-fill transform transition-transform duration-300 ${
                    isMenuServerOpen ? "rotate-180" : "rotate-0"
                  }`}
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
                  />
                </svg>
              </div>
              <ul
                id="menu-pilih-server"
                className={`absolute top-12 z-10 lg:max-w-xs md:max-w-xs lg:w-full md:w-full w-44 scrollbar scrollbar-thumb-black bg-slate-100 dark:bg-white rounded-xl border border-zinc-500 shadow-lg transform transition-all duration-300 overflow-hidden ${
                  isMenuServerOpen
                    ? "max-h-64 opacity-100 overflow-y-auto"
                    : "max-h-0 opacity-0"
                }`}
              >
                {servers.map((server) => (
                  <li
                    key={server.value}
                    onClick={() => {
                      setSelectedServer(server);
                      setMenuServerOpen(false);
                    }}
                    className={`flex flex-row w-full items-center justify-between lg:text-base md:text-base text-sm font-light cursor-pointer text-black hover:bg-[#4169e1] hover:text-white group hover:duration-150 px-3 py-2 ${
                      selectedServer === server.name
                        ? "font-semibold"
                        : "font-normal"
                    }`}
                  >
                    {server.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : detailAkun.kode == "shell-fire" ? (
        <div className="grid grid-cols-11 gap-x-2">
          <div className="col-span-6 flex flex-col gap-y-3">
            <p className="dark:text-white font-medium">UID</p>
            <input
              type="number"
              name="ID ML"
              autoComplete="off"
              autoCorrect="off"
              id="user_id"
              value={userId || ""}
              onChange={(e) => setUserId(e.target.value)}
              autoSave="false"
              placeholder={detailAkun.placeholder_1}
              className="bg-slate-100 dark:bg-white dark:text-black w-full border border-gray-500 dark:border-gray-400 placeholder:font-normal placeholder:text-zinc-400 font-medium focus:outline focus:outline-2 focus:outline-offset-1 focus:outline-[#4169e1] rounded-xl px-4 py-2.5"
            />
          </div>
          <div className="col-span-5 flex flex-col gap-y-3">
            <p className="dark:text-white font-medium">Server</p>
            <div className="relative">
              <div
                onClick={toggleMenuServer}
                className={`flex flex-row items-center justify-between bg-slate-100 dark:bg-white dark:text-zinc-600 lg:text-base md:text-base text-sm w-full rounded-xl border border-gray-500 dark:border-gray-400 px-4 py-2.5 cursor-pointer`}
              >
                <p className="whitespace-nowrap truncate">
                  {selectedServer ? selectedServer.name : "Pilih Server"}
                </p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth={1}
                  className={`bi bi-caret-down-fill transform transition-transform duration-300 ${
                    isMenuServerOpen ? "rotate-180" : "rotate-0"
                  }`}
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
                  />
                </svg>
              </div>
              <ul
                id="menu-pilih-server"
                className={`absolute top-12 z-10 lg:max-w-xs md:max-w-xs lg:w-full md:w-full w-44 scrollbar scrollbar-thumb-black bg-slate-100 dark:bg-white rounded-xl border border-zinc-500 shadow-lg transform transition-all duration-300 overflow-hidden ${
                  isMenuServerOpen
                    ? "max-h-64 opacity-100 overflow-y-auto"
                    : "max-h-0 opacity-0"
                }`}
              >
                {servers.map((server) => (
                  <li
                    key={server.value}
                    onClick={() => {
                      setSelectedServer(server);
                      setMenuServerOpen(false);
                    }}
                    className={`flex flex-row w-full items-center justify-between lg:text-base md:text-base text-sm font-light cursor-pointer text-black hover:bg-[#4169e1] hover:text-white group hover:duration-150 px-3 py-2 ${
                      selectedServer === server.name
                        ? "font-semibold"
                        : "font-normal"
                    }`}
                  >
                    {server.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : detailAkun.kode == "ragnarok-forever-love" ? (
        <div className="grid grid-cols-7 gap-x-2">
          <div className="col-span-4 flex flex-col gap-y-3">
            <p className="dark:text-white font-medium">UID</p>
            <input
              type="number"
              name="ID ML"
              autoComplete="off"
              autoCorrect="off"
              id="user_id"
              value={userId || ""}
              onChange={(e) => setUserId(e.target.value)}
              autoSave="false"
              placeholder={detailAkun.placeholder_1}
              className="bg-slate-100 dark:bg-white dark:text-black w-full border border-gray-500 dark:border-gray-400 placeholder:font-normal placeholder:text-zinc-400 font-medium focus:outline focus:outline-2 focus:outline-offset-1 focus:outline-[#4169e1] rounded-xl px-4 py-2.5"
            />
          </div>
          <div className="col-span-3 flex flex-col gap-y-3">
            <p className="dark:text-white font-medium">Server</p>
            <div className="relative">
              <div
                onClick={toggleMenuServer}
                className={`flex flex-row items-center justify-between bg-slate-100 dark:bg-white dark:text-zinc-600 lg:text-base md:text-base text-sm w-full rounded-xl border border-gray-500 dark:border-gray-400 px-4 py-2.5 cursor-pointer`}
              >
                <p className="whitespace-nowrap truncate">
                  {selectedServer ? selectedServer.name : "Pilih Server"}
                </p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth={1}
                  className={`bi bi-caret-down-fill transform transition-transform duration-300 ${
                    isMenuServerOpen ? "rotate-180" : "rotate-0"
                  }`}
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
                  />
                </svg>
              </div>
              <ul
                id="menu-pilih-server"
                className={`absolute top-12 z-10 w-full scrollbar scrollbar-thumb-black bg-slate-100 dark:bg-white rounded-xl border border-zinc-500 shadow-lg transform transition-all duration-300 overflow-hidden ${
                  isMenuServerOpen
                    ? "max-h-64 opacity-100 overflow-y-auto"
                    : "max-h-0 opacity-0"
                }`}
              >
                {servers.map((server) => (
                  <li
                    key={server.value}
                    onClick={() => {
                      setSelectedServer(server);
                      setMenuServerOpen(false);
                    }}
                    className={`flex flex-row w-full items-center justify-between lg:text-base md:text-base text-sm font-light cursor-pointer text-black hover:bg-[#4169e1] hover:text-white group hover:duration-150 px-3 py-2 ${
                      selectedServer === server.name
                        ? "font-semibold"
                        : "font-normal"
                    }`}
                  >
                    {server.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : detailAkun.kode == "perfect-world" ? (
        <div className="grid grid-cols-7 gap-x-2">
          <div className="col-span-4 flex flex-col gap-y-3">
            <p className="dark:text-white font-medium">UID</p>
            <input
              type="number"
              name="ID ML"
              autoComplete="off"
              autoCorrect="off"
              id="user_id"
              value={userId || ""}
              onChange={(e) => setUserId(e.target.value)}
              autoSave="false"
              placeholder={detailAkun.placeholder_1}
              className="bg-slate-100 dark:bg-white dark:text-black w-full border border-gray-500 dark:border-gray-400 placeholder:font-normal placeholder:text-zinc-400 font-medium focus:outline focus:outline-2 focus:outline-offset-1 focus:outline-[#4169e1] rounded-xl px-4 py-2.5"
            />
          </div>
          <div className="col-span-3 flex flex-col gap-y-3">
            <p className="dark:text-white font-medium">Server</p>
            <div className="relative">
              <div
                onClick={toggleMenuServer}
                className={`flex flex-row items-center justify-between bg-slate-100 dark:bg-white dark:text-zinc-600 lg:text-base md:text-base text-sm w-full rounded-xl border border-gray-500 dark:border-gray-400 px-4 py-2.5 cursor-pointer`}
              >
                <p className="whitespace-nowrap truncate">
                  {selectedServer ? selectedServer.name : "Pilih Server"}
                </p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth={1}
                  className={`bi bi-caret-down-fill transform transition-transform duration-300 ${
                    isMenuServerOpen ? "rotate-180" : "rotate-0"
                  }`}
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
                  />
                </svg>
              </div>
              <ul
                id="menu-pilih-server"
                className={`absolute top-12 z-10 w-full scrollbar scrollbar-thumb-black bg-slate-100 dark:bg-white rounded-xl border border-zinc-500 shadow-lg transform transition-all duration-300 overflow-hidden ${
                  isMenuServerOpen
                    ? "max-h-64 opacity-100 overflow-y-auto"
                    : "max-h-0 opacity-0"
                }`}
              >
                {servers.map((server) => (
                  <li
                    key={server.value}
                    onClick={() => {
                      setSelectedServer(server);
                      setMenuServerOpen(false);
                    }}
                    className={`flex flex-row w-full items-center justify-between lg:text-base md:text-base text-sm font-light cursor-pointer text-black hover:bg-[#4169e1] hover:text-white group hover:duration-150 px-3 py-2 ${
                      selectedServer === server.name
                        ? "font-semibold"
                        : "font-normal"
                    }`}
                  >
                    {server.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : detailAkun.kode == "asphalt-9-legends" ? (
        <div className="grid grid-cols-7 gap-x-2">
          <div className="col-span-4 flex flex-col gap-y-3">
            <p className="dark:text-white font-medium">UID</p>
            <input
              type="number"
              name="ID ML"
              autoComplete="off"
              autoCorrect="off"
              id="user_id"
              value={userId || ""}
              onChange={(e) => setUserId(e.target.value)}
              autoSave="false"
              placeholder={detailAkun.placeholder_1}
              className="bg-slate-100 dark:bg-white dark:text-black w-full border border-gray-500 dark:border-gray-400 placeholder:font-normal placeholder:text-zinc-400 font-medium focus:outline focus:outline-2 focus:outline-offset-1 focus:outline-[#4169e1] rounded-xl px-4 py-2.5"
            />
          </div>
          <div className="col-span-3 flex flex-col gap-y-3">
            <p className="dark:text-white font-medium">OS</p>
            <div className="relative">
              <div
                onClick={toggleMenuServer}
                className={`flex flex-row items-center justify-between bg-slate-100 dark:bg-white dark:text-zinc-600 lg:text-base md:text-base text-sm w-full rounded-xl border border-gray-500 dark:border-gray-400 px-4 py-2.5 cursor-pointer`}
              >
                <p className="whitespace-nowrap truncate">
                  {selectedServer ? selectedServer.name : "Pilih OS"}
                </p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth={1}
                  className={`bi bi-caret-down-fill transform transition-transform duration-300 ${
                    isMenuServerOpen ? "rotate-180" : "rotate-0"
                  }`}
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
                  />
                </svg>
              </div>
              <ul
                id="menu-pilih-server"
                className={`absolute top-12 z-10 w-full scrollbar scrollbar-thumb-black bg-slate-100 dark:bg-white rounded-xl border border-zinc-500 shadow-lg transform transition-all duration-300 overflow-hidden ${
                  isMenuServerOpen
                    ? "max-h-64 opacity-100 overflow-y-auto"
                    : "max-h-0 opacity-0"
                }`}
              >
                {servers.map((server) => (
                  <li
                    key={server.value}
                    onClick={() => {
                      setSelectedServer(server);
                      setMenuServerOpen(false);
                    }}
                    className={`flex flex-row w-full items-center justify-between lg:text-base md:text-base text-sm font-light cursor-pointer text-black hover:bg-[#4169e1] hover:text-white group hover:duration-150 px-3 py-2 ${
                      selectedServer === server.name
                        ? "font-semibold"
                        : "font-normal"
                    }`}
                  >
                    {server.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : [
          "populer",
          "akun_premium",
          "game",
          "voucher",
          "pulsa",
          "e-money",
          "pln",
          "liveapp",
        ].includes(detailAkun.tipe) ? (
        <div className="grid grid-cols-1">
          <div className="col-span-1 flex flex-col gap-y-3">
            <p className="dark:text-white font-medium">Data</p>
            <input
              type="number"
              name="ID ML"
              autoComplete="off"
              autoCorrect="off"
              id="user_id"
              value={userId || ""}
              onChange={(e) => setUserId(e.target.value)}
              autoSave="false"
              placeholder={detailAkun.placeholder_1}
              className="bg-slate-100 dark:bg-white dark:text-black w-full border border-gray-500 dark:border-gray-400 placeholder:font-normal placeholder:text-zinc-400 font-medium focus:outline focus:outline-2 focus:outline-offset-1 focus:outline-[#4169e1] rounded-xl px-4 py-2.5"
            />
          </div>
        </div>
      ) : detailAkun.kode == "joki" ? (
        <div className="grid grid-cols-1 grid-rows-2 gap-x-2 gap-y-4">
          <div className="col-span-1 flex flex-col gap-y-3">
            <p className="dark:text-white font-medium">Email</p>
            <input
              type="email"
              name="email_joki"
              autoComplete="off"
              autoCorrect="off"
              id="email_joki"
              value={emailJoki || ""}
              onChange={(e) => setEmailJoki(e.target.value)}
              autoSave="false"
              placeholder={detailAkun.placeholder_1}
              className="bg-slate-100 dark:bg-white dark:text-black w-full border border-gray-500 dark:border-gray-400 placeholder:font-normal placeholder:text-zinc-400 font-medium focus:outline focus:outline-2 focus:outline-offset-1 focus:outline-[#4169e1] rounded-xl px-4 py-2.5"
            />
          </div>
          <div className="col-span-1 flex flex-col gap-y-3">
            <p className="dark:text-white font-medium">Password</p>
            <input
              type="password"
              name="password_joki"
              autoComplete="off"
              autoCorrect="off"
              id="password_joki"
              value={passwordJoki || ""}
              onChange={(e) => setPasswordJoki(e.target.value)}
              autoSave="false"
              placeholder={detailAkun.placeholder_1}
              className="bg-slate-100 dark:bg-white dark:text-black w-full border border-gray-500 dark:border-gray-400 placeholder:font-normal placeholder:text-zinc-400 font-medium focus:outline focus:outline-2 focus:outline-offset-1 focus:outline-[#4169e1] rounded-xl px-4 py-2.5"
            />
          </div>
          <div className="col-span-1 flex flex-col gap-y-3">
            <p className="dark:text-white font-medium">Request</p>
            <input
              type="text"
              name="request_joki"
              autoComplete="off"
              autoCorrect="off"
              id="request_joki"
              value={requestJoki || ""}
              onChange={(e) => setRequestJoki(e.target.value)}
              autoSave="false"
              placeholder={detailAkun.placeholder_1}
              className="bg-slate-100 dark:bg-white dark:text-black w-full border border-gray-500 dark:border-gray-400 placeholder:font-normal placeholder:text-zinc-400 font-medium focus:outline focus:outline-2 focus:outline-offset-1 focus:outline-[#4169e1] rounded-xl px-4 py-2.5"
            />
          </div>
          <div className="col-span-1 flex flex-col gap-y-3">
            <p className="dark:text-white font-medium">Catatan</p>
            <input
              type="text"
              name="catatan_joki"
              autoComplete="off"
              autoCorrect="off"
              id="catatan_joki"
              value={catatanJoki || ""}
              onChange={(e) => setCatatanJoki(e.target.value)}
              autoSave="false"
              placeholder={detailAkun.placeholder_1}
              className="bg-slate-100 dark:bg-white dark:text-black w-full border border-gray-500 dark:border-gray-400 placeholder:font-normal placeholder:text-zinc-400 font-medium focus:outline focus:outline-2 focus:outline-offset-1 focus:outline-[#4169e1] rounded-xl px-4 py-2.5"
            />
          </div>
          <div className="col-span-1 flex flex-col gap-y-3">
            <p className="dark:text-white font-medium">Nickname</p>
            <input
              type="text"
              name="nickname_joki"
              autoComplete="off"
              autoCorrect="off"
              id="nickname_joki"
              value={nicknameJoki || ""}
              onChange={(e) => setNicknameJoki(e.target.value)}
              autoSave="false"
              placeholder={detailAkun.placeholder_1}
              className="bg-slate-100 dark:bg-white dark:text-black w-full border border-gray-500 dark:border-gray-400 placeholder:font-normal placeholder:text-zinc-400 font-medium focus:outline focus:outline-2 focus:outline-offset-1 focus:outline-[#4169e1] rounded-xl px-4 py-2.5"
            />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1">
          <div className="col-span-1 flex flex-col gap-y-3">
            <p className="dark:text-white font-medium">ID</p>
            <input
              type="number"
              name="ID ML"
              autoComplete="off"
              autoCorrect="off"
              id="user_id"
              value={userId || ""}
              onChange={(e) => setUserId(e.target.value)}
              autoSave="false"
              placeholder={detailAkun.placeholder_1}
              className="bg-slate-100 dark:bg-white dark:text-black w-full border border-gray-500 dark:border-gray-400 placeholder:font-normal placeholder:text-zinc-400 font-medium focus:outline focus:outline-2 focus:outline-offset-1 focus:outline-[#4169e1] rounded-xl px-4 py-2.5"
            />
          </div>
        </div>
      )}
      <hr className="border-black dark:border-white"></hr>
      <p className="text-xs text-black dark:text-white">NB : </p>
      <div className="flex flex-row w-full bg-slate-100 dark:bg-white rounded-xl px-3 py-2 border border-[#4169e1]">
        <p className="text-black text-sm">{detailAkun.ket_id}</p>
      </div>
    </div>
  );
};

DetailAkun.propTypes = {
  detailAkun: PropTypes.shape({
    kode: PropTypes.string,
    server_id: PropTypes.number,
    placeholder_1: PropTypes.string.isRequired,
    placeholder_2: PropTypes.string.isRequired,
    ket_id: PropTypes.string.isRequired,
    tipe: PropTypes.string,
  }).isRequired,
  userId: PropTypes.string,
  setUserId: PropTypes.func,
  zone: PropTypes.string,
  setZone: PropTypes.func,
  emailJoki: PropTypes.string,
  setEmailJoki: PropTypes.func,
  passwordJoki: PropTypes.string,
  setPasswordJoki: PropTypes.func,
  requestJoki: PropTypes.string,
  setRequestJoki: PropTypes.func,
  catatanJoki: PropTypes.string,
  setCatatanJoki: PropTypes.func,
  nicknameJoki: PropTypes.string,
  setNicknameJoki: PropTypes.func,
};

export default DetailAkun;
