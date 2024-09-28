import { Pembelian } from "../config/relations.js";
import Pembayaran from "../models/PembayaranModel.js";
import Deposit from "../models/DepositModel.js";
import dayjs from "dayjs";
import db from "../config/database.js";
import { Op, fn, col, Sequelize, where } from "sequelize";

export const getPembelian = async (req, res) => {
  try {
    const response = await Pembelian.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getPembelianForCekTransaksi = async (req, res) => {
  try {
    const [results, metadata] = await db.query(
      `
            SELECT 
            data_joki.status_joki AS status_joki, 
            pembelians.*, 
            pembayarans.status AS status_pembayaran, 
            pembayarans.metode
        FROM pembelians
        JOIN pembayarans ON pembelians.order_id = pembayarans.order_id
        LEFT JOIN data_joki ON pembelians.order_id = data_joki.order_id
        ORDER BY pembayarans.id DESC
        LIMIT 10
        `
    );
    res.status(200).json(results);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};

export const getPembelianForDashboardAdmin = async (req, res) => {
  try {
    const startOfToday = dayjs().startOf("day").toDate();
    const endOfToday = dayjs().endOf("day").toDate();

    const totalPembelianToday =
      (await Pembelian.sum("harga", {
        where: {
          created_at: {
            [Op.between]: [startOfToday, endOfToday],
          },
        },
      })) || 0;

    const banyakPembelianToday = await Pembelian.count({
      where: {
        created_at: {
          [Op.between]: [startOfToday, endOfToday],
        },
      },
    });

    const totalPembelianSuccessToday =
      (await Pembelian.sum("harga", {
        where: {
          created_at: {
            [Op.between]: [startOfToday, endOfToday],
          },
          status: "Success",
        },
      })) || 0;

    const banyakPembelianSuccessToday = await Pembelian.count({
      where: {
        created_at: {
          [Op.between]: [startOfToday, endOfToday],
        },
        status: "Success",
      },
    });

    const totalPembelianBatalToday =
      (await Pembelian.sum("harga", {
        where: {
          created_at: {
            [Op.between]: [startOfToday, endOfToday],
          },
          status: "Batal",
        },
      })) || 0;

    const banyakPembelianBatalToday = await Pembelian.count({
      where: {
        created_at: {
          [Op.between]: [startOfToday, endOfToday],
        },
        status: "Batal",
      },
    });

    const totalPembelianPendingToday =
      (await Pembelian.sum("harga", {
        where: {
          created_at: {
            [Op.between]: [startOfToday, endOfToday],
          },
          status: "Pending",
        },
      })) || 0;

    const banyakPembelianPendingToday = await Pembelian.count({
      where: {
        created_at: {
          [Op.between]: [startOfToday, endOfToday],
        },
        status: "Pending",
      },
    });

    const totalDepositToday =
      (await Deposit.sum("jumlah", {
        where: {
          created_at: {
            [Op.between]: [startOfToday, endOfToday],
          },
          status: "Success",
        },
      })) || 0;

    const banyakDepositToday = await Deposit.count({
      where: {
        created_at: {
          [Op.between]: [startOfToday, endOfToday],
        },
        status: "Success",
      },
    });

    const banyak_pembelian = await Pembayaran.count({
      where: { status: "Lunas" },
    });

    const total_pembelian = await Pembelian.sum("harga", {
      where: {
        status: ["Success", "Pending", "Batal"],
      },
    });

    const total_keseluruhan_pembelian = await Pembelian.sum("harga");
    const banyak_keseluruhan_pembelian = await Pembelian.count();

    const total_keseluruhan_pembelian_berhasil = await Pembelian.sum("harga", {
      where: { status: "Success" },
    });
    const banyak_keseluruhan_pembelian_berhasil = await Pembelian.count({
      where: { status: "Success" },
    });

    const total_keseluruhan_pembelian_pending = await Pembelian.sum("harga", {
      where: { status: "Pending" },
    });
    const banyak_keseluruhan_pembelian_pending = await Pembelian.count({
      where: { status: "Pending" },
    });

    const total_keseluruhan_pembelian_batal = await Pembelian.sum("harga", {
      where: { status: "Batal" },
    });
    const banyak_keseluruhan_pembelian_batal = await Pembelian.count({
      where: { status: "Batal" },
    });

    const total_keseluruhan_deposit = await Deposit.sum("jumlah", {
      where: { status: "Success" },
    });
    const banyak_keseluruhan_deposit = await Deposit.count({
      where: { status: "Success" },
    });

    const keuntungan_bersih = await Pembelian.sum("profit", {
      where: { status: "Success" },
    });

    // const parsedDate = dayjs();

    // const totalPembelianSuccess = await Pembelian.sum("harga", {
    //   where: {
    //     created_at: {
    //       [Op.and]: [
    //         fn("DAY", col("created_at")),
    //         parsedDate.date(),
    //         fn("MONTH", col("created_at")),
    //         parsedDate.month(),
    //         fn("YEAR", col("created_at")),
    //         parsedDate.year(),
    //       ],
    //     },
    //     status: "Success",
    //   },
    // });

    // const banyakPembelianSuccess = await Pembelian.count({
    //   where: {
    //     created_at: {
    //       [Op.and]: [
    //         fn("DAY", col("created_at")),
    //         parsedDate.date(),
    //         fn("MONTH", col("created_at")),
    //         parsedDate.month(),
    //         fn("YEAR", col("created_at")),
    //         parsedDate.year(),
    //       ],
    //     },
    //     status: "Success",
    //   },
    // });

    // const totalPembelianBatal = await Pembelian.sum("harga", {
    //   where: {
    //     created_at: {
    //       [Op.and]: [
    //         fn("DAY", col("created_at")),
    //         parsedDate.date(),
    //         fn("MONTH", col("created_at")),
    //         parsedDate.month(),
    //         fn("YEAR", col("created_at")),
    //         parsedDate.year(),
    //       ],
    //     },
    //     status: "Batal",
    //   },
    // });

    // const banyakPembelianBatal = await Pembelian.count({
    //   where: {
    //     created_at: {
    //       [Op.and]: [
    //         fn("DAY", col("created_at")),
    //         parsedDate.date(),
    //         fn("MONTH", col("created_at")),
    //         parsedDate.month(),
    //         fn("YEAR", col("created_at")),
    //         parsedDate.year(),
    //       ],
    //     },
    //     status: "Batal",
    //   },
    // });

    // const totalPembelianPending = await Pembelian.sum("harga", {
    //   where: {
    //     created_at: {
    //       [Op.and]: [
    //         fn("DAY", col("created_at")),
    //         parsedDate.date(),
    //         fn("MONTH", col("created_at")),
    //         parsedDate.month(),
    //         fn("YEAR", col("created_at")),
    //         parsedDate.year(),
    //       ],
    //     },
    //     status: "Pending",
    //   },
    // });

    // const banyakPembelianPending = await Pembelian.count({
    //   where: {
    //     created_at: {
    //       [Op.and]: [
    //         fn("DAY", col("created_at")),
    //         parsedDate.date(),
    //         fn("MONTH", col("created_at")),
    //         parsedDate.month(),
    //         fn("YEAR", col("created_at")),
    //         parsedDate.year(),
    //       ],
    //     },
    //     status: "Pending",
    //   },
    // });

    // const totalDeposit = await Deposit.sum("jumlah", {
    //   where: {
    //     created_at: {
    //       [Op.and]: [
    //         fn("DAY", col("created_at")),
    //         parsedDate.date(),
    //         fn("MONTH", col("created_at")),
    //         parsedDate.month(),
    //         fn("YEAR", col("created_at")),
    //         parsedDate.year(),
    //       ],
    //     },
    //     status: "Success",
    //   },
    // });

    // const banyakDeposit = await Deposit.count({
    //   where: {
    //     created_at: {
    //       [Op.and]: [
    //         fn("DAY", col("created_at")),
    //         parsedDate.date(),
    //         fn("MONTH", col("created_at")),
    //         parsedDate.month(),
    //         fn("YEAR", col("created_at")),
    //         parsedDate.year(),
    //       ],
    //     },
    //     status: "Success",
    //   },
    // });

    res.status(200).json({
      totalPembelianToday,
      banyakPembelianToday,
      totalPembelianSuccessToday,
      banyakPembelianSuccessToday,
      totalPembelianBatalToday,
      banyakPembelianBatalToday,
      totalPembelianPendingToday,
      banyakPembelianPendingToday,
      totalDepositToday,
      banyakDepositToday,
      banyak_pembelian,
      total_pembelian,
      total_keseluruhan_pembelian,
      banyak_keseluruhan_pembelian,
      total_keseluruhan_pembelian_berhasil,
      banyak_keseluruhan_pembelian_berhasil,
      total_keseluruhan_pembelian_pending,
      banyak_keseluruhan_pembelian_pending,
      total_keseluruhan_pembelian_batal,
      banyak_keseluruhan_pembelian_batal,
      total_keseluruhan_deposit,
      banyak_keseluruhan_deposit,
      keuntungan_bersih,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

export const getPembelianForSemuaPesananAdmin = async (req, res) => {
  try {
    const { page = 1, limit = 10, order_id } = req.query;
    let whereCondition = {};

    if (order_id) {
      whereCondition.order_id = order_id;
    }

    const pembelian = await Pembelian.findAndCountAll({
      where: whereCondition,
      order: [["created_at", "DESC"]],
      include: [
        {
          model: Pembayaran,
          attributes: ["status", "metode"],
          required: true,
        },
      ],
      attributes: [
        "order_id",
        "username",
        "user_id",
        "zone",
        "nickname",
        "layanan",
        "harga",
        "provider_order_id",
        "status",
        "log",
        "created_at",
        "updated_at",
      ],
      limit: parseInt(limit),
      offset: (page - 1) * limit,
    });

    res.json({
      totalPages: Math.ceil(pembelian.count / limit),
      currentPage: parseInt(page),
      pembelian: pembelian.rows,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateStatusPembelianForSemuaPesananAdmin = async (req, res) => {
  try {
    const orderId = req.params.order_id;
    const status = req.body.status;

    const pembelian = await Pembelian.update(
      {
        status: status,
      },
      {
        where: {
          order_id: orderId,
        },
      }
    );

    if (pembelian[0] === 0) {
      return res.status(404).json({ msg: "Pembelian tidak ditemukan!" });
    }

    return res
      .status(200)
      .json({ msg: "Berhasil memperbarui status pembelian!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getPembelianForPesananGiftSkinAdmin = async (req, res) => {
  try {
    const { page = 1, limit = 5, order_id } = req.query;
    let whereCondition = {
      tipe_transaksi: "gift_skin",
    };

    if (order_id) {
      whereCondition.order_id = order_id;
    }

    const pembelianGiftSkin = await Pembelian.findAndCountAll({
      where: whereCondition,
      order: [["created_at", "DESC"]],
      attributes: [
        "id",
        "order_id",
        "layanan",
        "user_id",
        "zone",
        "nickname",
        "status",
      ],
      limit: parseInt(limit),
      offset: (page - 1) * limit,
    });

    return res.status(200).json({
      totalPages: Math.ceil(pembelianGiftSkin.count / limit),
      currentPage: parseInt(page),
      pembelianGiftSkin: pembelianGiftSkin.rows,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const updateStatusPembelianForPesananGiftSkinAdmin = async (
  req,
  res
) => {
  try {
    const orderId = req.params.order_id;
    const status = req.body.status;

    const pembelian = await Pembelian.update(
      {
        status: status,
      },
      {
        where: {
          order_id: orderId,
        },
      }
    );

    if (pembelian[0] === 0) {
      return res
        .status(404)
        .json({ msg: "Pembelian gift skin tidak ditemukan!" });
    }

    return res
      .status(200)
      .json({ msg: "Berhasil memperbarui status pembelian gift skin!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deletePembelianForPesananGiftSkinAdmin = async (req, res) => {
  try {
    const id = req.params.id;

    const pembelianGiftSkin = await Pembelian.destroy({
      where: {
        id: id,
      },
    });

    if (pembelianGiftSkin === 0) {
      return res
        .status(404)
        .json({ message: "Pembelian gift skin tidak ditemukan!" });
    }

    return res.status(200).json({
      msg: "Berhasil menghapus pembelian gift skin!",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getPembelianForPesananDmVilogAdmin = async (req, res) => {
  try {
    const { page = 1, limit = 5, order_id } = req.query;
    let whereCondition = {
      tipe_transaksi: "dm_vilog",
    };

    if (order_id) {
      whereCondition.order_id = order_id;
    }

    const pembelianDmVilog = await Pembelian.findAndCountAll({
      where: whereCondition,
      order: [["created_at", "DESC"]],
      attributes: [
        "id",
        "order_id",
        "layanan",
        ["email_vilog", "email"],
        ["password_vilog", "password"],
        ["loginvia_vilog", "loginvia"],
        "status",
      ],
      limit: parseInt(limit),
      offset: (page - 1) * limit,
    });

    return res.status(200).json({
      totalPages: Math.ceil(pembelianDmVilog.count / limit),
      currentPage: parseInt(page),
      pembelianDmVilog: pembelianDmVilog.rows,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const updateStatusPembelianForPesananDmVilogAdmin = async (req, res) => {
  try {
    const orderId = req.params.order_id;
    const status = req.body.status;

    const pembelian = await Pembelian.update(
      {
        status: status,
      },
      {
        where: {
          order_id: orderId,
        },
      }
    );

    if (pembelian[0] === 0) {
      return res
        .status(404)
        .json({ msg: "Pembelian dm vilog tidak ditemukan!" });
    }

    return res
      .status(200)
      .json({ msg: "Berhasil memperbarui status pembelian dm vilog!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deletePembelianForPesananDmVilogAdmin = async (req, res) => {
  try {
    const id = req.params.id;

    const pembelianDmVilog = await Pembelian.destroy({
      where: {
        id: id,
      },
    });

    if (pembelianDmVilog === 0) {
      return res
        .status(404)
        .json({ message: "Pembelian dm vilog tidak ditemukan!" });
    }

    return res.status(200).json({
      msg: "Berhasil menghapus pembelian dm vilog!",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
