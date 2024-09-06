import WhatsappImage from "../../assets/whatsapp.png";

const Konfirmasi = () => {
  return (
    <div id="Konfirmasi-Content" className="flex flex-col gap-y-3">
      <div className="flex flex-row gap-x-2">
        <div className="flex flex-row bg-[#4169e1] justify-between rounded-xl w-full overflow-visible">
          <p className="text-white font-medium px-5 py-3">Selesaikan Pembayaran</p>
          <figure className="relative">
            <img src={WhatsappImage} alt="Whatsapp-Image" className="absolute lg:right-6 right-8 -top-2 max-w-16 max-h-16" />
          </figure>
        </div>
      </div>
      <div className="flex flex-col gap-y-4 w-full rounded-xl px-5 py-5 bg-white dark:bg-[#323336] shadow-lg">
        <p className="dark:text-white font-medium">Nomor Whatsapp</p>
        <input
          type="number"
          name="nomor"
          autoComplete="off"
          autoCorrect="off"
          id="nomor"
          autoSave="false"
          placeholder="Masukkan Nomor Whatsapp"
          className="bg-slate-100 dark:bg-white dark:text-black w-full border border-[#4169e1] placeholder:font-normal font-medium focus:outline focus:outline-2 focus:outline-offset-1 focus:outline-[#4169e1] rounded-xl px-4 py-2.5"
        />
        <p className="dark:text-white text-xs font-light">*Status transaksi akan dikirim via whatsapp</p>
        <div className="flex flex-row w-full justify-end">
          <div className="flex flex-row rounded-xl px-5 py-2.5 bg-[#4169e1] cursor-pointer text-white font-medium justify-center">
            Konfirmasi
          </div>
        </div>
      </div>
    </div>
  );
};

export default Konfirmasi;
