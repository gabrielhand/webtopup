import VoucherImage from "../../assets/voucher.png";
import PropTypes from "prop-types";

const KodePromo = ({ kodeVoucher, setKodeVoucher }) => {
  return (
    <div id="KodePromo-Content" className="flex flex-col gap-y-3">
      <div className="flex flex-row gap-x-2">
        <div className="flex flex-row justify-between bg-[#4169e1] rounded-xl w-full overflow-visible">
          <p className="px-5 py-3 text-white font-medium">Kode Promo</p>
          <figure className="relative">
            <img
              src={VoucherImage}
              alt="Voucher-Image"
              className="absolute lg:right-6 right-8 -top-2 max-w-16 max-h-16"
            />
          </figure>
        </div>
      </div>
      <div className="flex flex-col gap-y-3 w-full rounded-xl px-5 py-5 bg-white dark:bg-[#323336] shadow-lg">
        <div className="flex flex-row gap-x-2">
          <input
            type="text"
            name="promo_voucher"
            autoComplete="off"
            autoCorrect="off"
            id="kodePromoInput"
            value={kodeVoucher || ""}
            onChange={(e) => setKodeVoucher(e.target.value)}
            autoSave="false"
            placeholder="Masukkan Kode Promo"
            className="bg-slate-100 dark:bg-white dark:text-black w-full border border-[#4169e1] placeholder:font-normal placeholder:text-zinc-400 font-medium focus:outline focus:outline-2 focus:outline-offset-1 focus:outline-[#4169e1] rounded-xl px-4 py-2.5"
          />
          <div className="flex flex-row rounded-xl px-4 py-2.5 bg-[#4169e1] cursor-pointer text-white font-medium">
            Claim
          </div>
        </div>
      </div>
    </div>
  );
};

KodePromo.propTypes = {
  kodeVoucher: PropTypes.string,
  setKodeVoucher: PropTypes.func,
};

export default KodePromo;
