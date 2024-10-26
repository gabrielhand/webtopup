import { Op, Sequelize } from "sequelize";
import dayjs from "dayjs";
import {
  Pembelian,
  Layanan,
  Pembayaran,
  Kategori,
  Method,
  DataJoki,
} from "../config/relations.js";
import SettingWeb from "../models/SettingWebModel.js";
import User from "../models/UserModel.js";

export const invoice = async (req, res) => {
  try {
    const { order } = req.params;

    const settings = await SettingWeb.findOne({
      attributes: ["logo_header"],
    });

    const data = await Pembelian.findOne({
      where: { order_id: order },
      include: [
        {
          model: Pembayaran,
          where: { order_id: order },
          attributes: [
            "status",
            "metode",
            "no_pembayaran",
            "reference",
            "harga",
            "no_pembeli",
          ],
          include: [
            {
              model: Method,
              attributes: ["images"],
            },
          ],
        },
        {
          model: DataJoki,
          as: "dataJoki",
          required: false,
        },
        {
          model: Layanan,
          as: "layananDetail",
          attributes: ["layanan"],
          include: [
            {
              model: Kategori,
              attributes: ["nama", "kode", "thumbnail", "bannerlayanan"],
            },
          ],
        },
      ],
      attributes: [
        "order_id",
        "user_id",
        "zone",
        "nickname",
        "harga",
        "jumlah",
        "created_at",
        "status",
        "tipe_transaksi",
        "email_vilog",
        "password_vilog",
        "loginvia_vilog",
        "is_review",
      ],
    });

    const invoice = data.toJSON();

    if (invoice) {
      const hargaPerItem = invoice.harga / invoice.jumlah;
      invoice.harga_per_item = hargaPerItem;
    }

    if (invoice && invoice.pembayaran) {
      const pembayaran = invoice.pembayaran;

      if (pembayaran.metode === "SALDO" || pembayaran.metode === "Saldo") {
        pembayaran.method = { images: settings.logo_header ?? null };
      }
    }

    const expired = dayjs(data.created_at)
      .add(1, "day")
      .format("YYYY-MM-DD HH:mm:ss");

    return res.status(200).json({ invoice, expired });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
