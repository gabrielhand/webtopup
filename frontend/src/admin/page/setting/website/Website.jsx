import { useState } from "react";
import BreadCrumbs from "../../../components/breadcrumbs/BreadCrumbs";
import KonfigurasiEWalletBank from "./KonfigurasiEWalletBank";
import KonfigurasiHargaMembership from "./KonfigurasiHargaMembership";
import KonfigurasiWarnaWebsite from "./KonfigurasiWarnaWebsite";
import KonfigurasiSloganWebsite from "./KonfigurasiSloganWebsite";
import KonfigurasiWebsite from "./KonfigurasiWebsite";
import KonfigurasiTentangKami from "./KonfigurasiTentangKami";
import KonfigurasiRate from "./KonfigurasiRate";
import KonfigurasiTripay from "./KonfigurasiTripay";
import KonfigurasiDigiflazz from "./KonfigurasiDigiflazz";
import KonfigurasiApiGames from "./KonfigurasiApiGames";
import KonfigurasiVipReseller from "./KonfigurasiVipReseller";
import KonfigurasiWaGateway from "./KonfigurasiWaGateway";

const Website = () => {
  const [activeTab, setActiveTab] = useState("website");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex flex-col gap-y-4 w-full">
      <BreadCrumbs />
      <div className="flex flex-row gap-x-2">
        <div
          className={`flex flex-row rounded-lg px-4 py-2.5 cursor-pointer text-sm font-medium duration-300 ${
            activeTab === "website"
              ? "bg-purple-500 text-white shadow-lg"
              : "bg-transparent text-purple-500"
          }`}
          onClick={() => handleTabClick("website")}
        >
          Konfigurasi Website
        </div>
        <div
          className={`flex flex-row rounded-lg px-4 py-2.5 cursor-pointer text-sm font-medium duration-300 ${
            activeTab === "tentangKami"
              ? "bg-purple-500 text-white shadow-lg"
              : "bg-transparent text-purple-500"
          }`}
          onClick={() => handleTabClick("tentangKami")}
        >
          Konfigurasi Tentang Kami
        </div>

        <div
          className={`flex flex-row rounded-lg px-4 py-2.5 cursor-pointer text-sm font-medium duration-300 ${
            activeTab === "api"
              ? "bg-purple-500 text-white shadow-lg"
              : "bg-transparent text-purple-500"
          }`}
          onClick={() => handleTabClick("api")}
        >
          Konfigurasi API
        </div>
      </div>
      <div className="grid grid-cols-11 gap-5 mt-4">
        {activeTab === "website" ? (
          <>
            <KonfigurasiWebsite />
            <KonfigurasiSloganWebsite />
            <KonfigurasiWarnaWebsite />
            <KonfigurasiHargaMembership />
            <KonfigurasiEWalletBank />
          </>
        ) : activeTab === "tentangKami" ? (
          <KonfigurasiTentangKami />
        ) : activeTab === "api" ? (
          <>
            <KonfigurasiRate />
            <KonfigurasiTripay />
            <KonfigurasiDigiflazz />
            <KonfigurasiApiGames />
            <KonfigurasiVipReseller />
            <KonfigurasiWaGateway />
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Website;
