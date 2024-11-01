import axios from "axios";
import PropTypes from "prop-types";

const ModalKonfirmasiOrder = ({
  modalRef,
  kategoriLayanan,
  nickname,
  Id,
  zoneId,
  layanan,
  service,
  harga,
  jumlah,
  hargaTotal,
  payment,
  paymentMethod,
  kodeVoucher,
  nomorWa,
}) => {
  console.log(jumlah);

  const simpanOrder = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("uid", Id);
      formData.append("zone", zoneId);
      formData.append("nickname", nickname);
      formData.append("service", service);
      formData.append("payment_method", paymentMethod);
      formData.append("nomor", nomorWa);
      formData.append("voucher", kodeVoucher);
      formData.append("quantity", jumlah);

      const response = await axios.post(
        "http://localhost:5000/order/simpan",
        formData
      );

      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <dialog id="modal_confirm_order" className="modal" ref={modalRef}>
      <div className="relative flex flex-col gap-4 p-4 rounded-xl w-6/12 overflow-hidden max-w-5xl bg-white dark:bg-[#161721]">
        <div className="flex flex-col items-center">
          <h3 className="font-semibold text-xl text-black dark:text-white">
            Konfirmasi Pesanan Kamu
          </h3>
          <p className="text-black dark:text-white font-light">
            Pastikan semua sudah sesuai ya!
          </p>
          <div className="mt-4 flex flex-col gap-2 items-center">
            <img
              src={kategoriLayanan.thumbnail}
              alt={`Thumbnail-${kategoriLayanan.nama}`}
              className="w-20 rounded-sm"
            />
            <p className="text-black dark:text-white font-light">
              {kategoriLayanan.nama}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2 p-3 rounded-lg bg-zinc-300 dark:bg-black">
          <div className="flex flex-row justify-between">
            <p className="font-medium text-black dark:text-white">Nickname</p>
            <p className="text-black dark:text-white">{nickname}</p>
          </div>
          <div className="flex flex-row justify-between">
            <p className="font-medium text-black dark:text-white">ID</p>
            <p className="text-black dark:text-white">{Id}</p>
          </div>
          {kategoriLayanan.server_id === 1 && (
            <>
              <div className="flex flex-row justify-between">
                <p className="font-medium text-black dark:text-white">Server</p>
                <p className="text-black dark:text-white">{zoneId}</p>
              </div>
            </>
          )}
          <div className="flex flex-row justify-between">
            <p className="font-medium text-black dark:text-white">Layanan</p>
            <p className="text-black dark:text-white">{layanan}</p>
          </div>
        </div>
        <div className="flex flex-col gap-2 p-3 rounded-lg bg-zinc-300 dark:bg-black">
          <div className="flex flex-row justify-between">
            <p className="font-medium text-black dark:text-white">Payment</p>
            <p className="text-black dark:text-white">{payment}</p>
          </div>
          <div className="flex flex-row justify-between">
            <p className="font-medium text-black dark:text-white">Harga</p>
            <p className="text-black dark:text-white">
              Rp{" "}
              {harga?.toLocaleString("id-ID", {
                styles: "currency",
                currency: "IDR",
              })}
            </p>
          </div>
          <div className="flex flex-row justify-between">
            <p className="font-medium text-black dark:text-white">Jumlah</p>
            <p className="text-black dark:text-white">{jumlah}</p>
          </div>
          <div className="flex flex-row justify-between">
            <p className="font-medium text-black dark:text-white">Total</p>
            <p className="text-black dark:text-white">
              Rp{" "}
              {hargaTotal?.toLocaleString("id-ID", {
                styles: "currency",
                currency: "IDR",
              })}
            </p>
          </div>
          <div className="flex flex-row justify-between">
            <p className="font-medium text-black dark:text-white">Kontak</p>
            <p className="text-black dark:text-white">{nomorWa}</p>
          </div>
        </div>
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <div className="flex flex-row justify-end">
          <form onSubmit={simpanOrder}>
            <button
              type="submit"
              className="px-10 py-2 bg-blue-500 rounded-lg text-white font-medium"
            >
              Pesan Sekarang!
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

ModalKonfirmasiOrder.propTypes = {
  modalRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any }),
  ]),
  kategoriLayanan: PropTypes.shape({
    thumbnail: PropTypes.string,
    nama: PropTypes.string,
    server_id: PropTypes.number,
  }),
  nickname: PropTypes.string,
  Id: PropTypes.string,
  zoneId: PropTypes.string,
  layanan: PropTypes.string,
  service: PropTypes.number,
  harga: PropTypes.number,
  jumlah: PropTypes.string,
  hargaTotal: PropTypes.number,
  payment: PropTypes.string,
  paymentMethod: PropTypes.string,
  kodeVoucher: PropTypes.string,
  nomorWa: PropTypes.string,
};

export default ModalKonfirmasiOrder;
