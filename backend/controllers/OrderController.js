import Kategori from "../models/KategoriModel.js";
import Layanan from "../models/LayananModel.js";
import Method from "../models/MethodModel.js";
import SettingWeb from "../models/SettingWebModel.js";
import Voucher from "../models/VoucherModel.js";
import ApiCheckController from "../controllers/ApiCheckController.js";
import { Sequelize } from "sequelize";

export const konfirmasiOrder = async (req, res) => {
  try {
    const { uid, zone, service, payment_method, nomor, voucher } = req.body;
    const layanan = await Layanan.findByPk(service);
    const kategori = await Kategori.findByPk(layanan.kategori_id);

    let dataLayanan;
    const userRole = req.session.role || "Member";

    if (userRole === "Platinum" || "Admin") {
      dataLayanan = await Layanan.findOne({
        where: { id: service },
        attributes: [
          [Sequelize.col("harga_platinum"), "harga"],
          "is_flash_sale",
          "expired_flash_sale",
          "harga_flash_sale",
        ],
      });
    } else if (userRole === "Gold") {
      dataLayanan = await Layanan.findOne({
        where: { id: service },
        attributes: [
          [Sequelize.col("harga_gold"), "harga"],
          "is_flash_sale",
          "expired_flash_sale",
          "harga_flash_sale",
        ],
      });
    } else {
      dataLayanan = await Layanan.findOne({
        where: { id: service },
        attributes: [
          [Sequelize.col("harga_member"), "harga"],
          "is_flash_sale",
          "expired_flash_sale",
          "harga_flash_sale",
        ],
      });
    }
    if (
      dataLayanan.is_flash_sale &&
      new Date(dataLayanan.expired_flash_sale) >= new Date()
    ) {
      dataLayanan.harga = dataLayanan.harga_flash_sale;
    }

    if (voucher) {
      const voucherData = await Voucher.findOne({ where: { kode: voucher } });
      if (voucherData && voucherData.stock > 0) {
        let discount = dataLayanan.harga * (voucherData.promo / 100);
        discount = Math.min(discount, voucherData.max_potongan);
        dataLayanan.harga -= discount;
      }
    }

    const settings = await SettingWeb.findOne({ attributes: ["logo_header"] });
    const logoHeader = settings ? settings.logo_header : null;

    const paymentMethod = await Method.findOne({
      where: { code: payment_method },
      attributes: ["name", "images"],
    });

    const paymentMethodImage =
      payment_method === "SALDO" ? logoHeader : paymentMethod.images;

    const gameValidationCodes = [
      "gift-skin-ml",
      "8-ball-pool",
      "arena-of-valor",
      "apex-legends",
      "call-of-duty",
      "dragon-city",
      "free-fire",
      "higgs-domino",
      "honkai-impact",
      "lords-mobile",
      "marvel-super-war",
      "mobile-legends",
      "mobile-legend",
      "mobile-legends-global",
      "mobile-legends-adventure",
      "point-blank",
      "ragnarok-m",
      "tom-and-jerry",
      "top-eleven",
      "valorant",
    ];

    const apiCheck = new ApiCheckController();
    let apiResult;
    let data;

    if (gameValidationCodes.includes(kategori.kode)) {
      if (["mobile-legends", "ragnarok-m"].includes(kategori.kode)) {
        apiResult = await apiCheck.check(uid, zone, "Mobile Legends");
      } else {
        apiResult = await apiCheck.check(uid, null, kategori.nama);
      }

      if (apiResult.status.code === 1) {
        return res.json({
          status: false,
          message: "Username not found or try again later",
        });
      }

      const username = apiResult.data.userNameGame;
      data = {
        kategori: {
          nama: kategori.nama,
          thumbnail: kategori.thumbnail,
        },
        username,
        user_id: uid,
        zone: zone,
        layanan: layanan.layanan,
        harga: dataLayanan.dataValues.harga,
        paymentMethod: paymentMethod,
        paymentMethodImage,
        nomor: nomor,
      };
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("Error confirming order:", error);
    return res.status(500).json({ message: error.message });
  }
};
