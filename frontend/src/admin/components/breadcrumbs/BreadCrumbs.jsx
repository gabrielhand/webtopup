import { Link, useLocation } from "react-router-dom";

const BreadCrumbs = () => {
  const location = useLocation();

  const isDashboard = location.pathname === "/dashboard";
  const isPesananSemua = location.pathname === "/pesanan/semua";
  const isPesananJoki = location.pathname === "/pesanan/joki";
  const isPesananGiftSkin = location.pathname === "/pesanan/gift-skin";
  const isPesananVilog = location.pathname === "/pesanan/dmvilog";
  const isMemberKelola = location.pathname === "/member/kelola";
  const isMemberDeposit = location.pathname === "/member/deposit";
  const isProdukKategori = location.pathname === "/produk/kategori";
  const isProdukSubKategori = location.pathname === "/produk/subkategori";
  const isProdukTipe = location.pathname === "/produk/tipe";
  const isProdukLayanan = location.pathname === "/produk/layanan";
  const isProdukVoucher = location.pathname === "/produk/voucher";
  const isKonfigurasiSlider = location.pathname === "/settings/slider";
  const isKonfigurasiPayment = location.pathname === "/settings/payment";
  const isKonfigurasiWebsite = location.pathname === "/settings/website";

  return (
    <div className="flex flex-row justify-end mt-4">
      <div className="breadcrumbs text-sm text-black dark:text-white">
        <ul>
          {isDashboard ? (
            <>
              <li>
                <Link to="/dashboard" className="text-purple-400">
                  Menu
                </Link>
              </li>
              <li>
                <p className="text-zinc-500 dark:text-zinc-300">Dashboard</p>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/dashboard" className="text-purple-400">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to={
                    isPesananSemua ||
                    isPesananJoki ||
                    isPesananGiftSkin ||
                    isPesananVilog
                      ? "/pesanan/semua"
                      : isMemberKelola || isMemberDeposit
                      ? "/member/kelola"
                      : isProdukKategori ||
                        isProdukSubKategori ||
                        isProdukTipe ||
                        isProdukLayanan ||
                        isProdukVoucher
                      ? "/produk/kategori"
                      : ""
                  }
                  className="text-purple-400"
                >
                  {isPesananSemua ||
                  isPesananJoki ||
                  isPesananGiftSkin ||
                  isPesananVilog
                    ? "Pesanan"
                    : isMemberDeposit || isMemberKelola
                    ? "Member"
                    : isProdukKategori ||
                      isProdukSubKategori ||
                      isProdukTipe ||
                      isProdukLayanan ||
                      isProdukVoucher
                    ? "Produk"
                    : isKonfigurasiSlider ||
                      isKonfigurasiPayment ||
                      isKonfigurasiWebsite
                    ? "Konfigurasi"
                    : ""}
                </Link>
              </li>
              <li>
                <p className="text-zinc-500 dark:text-zinc-300">
                  {isPesananSemua
                    ? "Semua"
                    : isPesananJoki
                    ? "Joki"
                    : isPesananGiftSkin
                    ? "Gift Skin"
                    : isPesananVilog
                    ? "DM Vilog"
                    : isMemberDeposit
                    ? "Deposit"
                    : isMemberKelola
                    ? "Kelola"
                    : isProdukKategori
                    ? "Kategori"
                    : isProdukSubKategori
                    ? "Sub Kategori"
                    : isProdukTipe
                    ? "Tipe"
                    : isProdukLayanan
                    ? "Layanan"
                    : isProdukVoucher
                    ? "Voucher"
                    : isKonfigurasiSlider
                    ? "Slider"
                    : isKonfigurasiPayment
                    ? "Payment"
                    : isKonfigurasiWebsite
                    ? "Website"
                    : ""}
                </p>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default BreadCrumbs;
