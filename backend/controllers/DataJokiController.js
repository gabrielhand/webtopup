import { where } from "sequelize";
import { DataJoki, Pembelian } from "../config/relations.js";
import Pembayaran from "../models/PembayaranModel.js";

export const getDataJokiForPesananJokiAdmin = async (req, res) => {
  try {
    const { page = 1, limit = 5, order_id } = req.query;
    let whereCondition = {};

    if (order_id) {
      whereCondition.order_id = order_id;
    }

    const dataJoki = await DataJoki.findAndCountAll({
      where: whereCondition,
      order: [["created_at", "DESC"]],
      include: [
        {
          model: Pembayaran,
          attributes: ["status", "no_pembeli"],
          required: true,
        },
        {
          model: Pembelian,
          attributes: ["layanan"],
          required: true,
        },
      ],
      attributes: [
        "id",
        "order_id",
        ["email_joki", "email"],
        ["password_joki", "password"],
        ["loginvia_joki", "loginvia"],
        ["nickname_joki", "nickname"],
        ["request_joki", "request"],
        ["catatan_joki", "catatan"],
        ["status_joki", "status_joki"],
      ],
      limit: parseInt(limit),
      offset: (page - 1) * limit,
    });

    res.json({
      totalPages: Math.ceil(dataJoki.count / limit),
      currentPage: parseInt(page),
      dataJoki: dataJoki.rows,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateStatusJoki = async (req, res) => {
  try {
    const orderId = req.params.order_id;
    const status = req.body.status;

    const dataJoki = await DataJoki.update(
      {
        status_joki: status,
      },
      {
        where: {
          order_id: orderId,
        },
      }
    );

    if (dataJoki[0] === 0) {
      return res.status(404).json({ msg: "Data joki tidak ditemukan!" });
    }

    return res.status(200).json({
      msg: "Berhasil memperbarui status joki!",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteDataJoki = async (req, res) => {
  try {
    const id = req.params.id;

    const dataJoki = await DataJoki.destroy({
      where: {
        id: id,
      },
    });

    if (dataJoki === 0) {
      return res.status(404).json({ message: "Data Joki tidak ditemukan!" });
    }

    return res.status(200).json({
      msg: "Berhasil menghapus Data Joki!",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
