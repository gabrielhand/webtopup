import { Op, Sequelize } from "sequelize";
import Layanan from "../models/LayananModel.js";
import User from "../models/UserModel.js";
import Voucher from "../models/VoucherModel.js";
import Kategori from "../models/KategoriModel.js";
import SubKategori from "../models/SubKategoriModel.js";

export const getLayanan = async (req, res) => {
  try {
    const response = await Layanan.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getPriceLayanan = async (req, res) => {
  try {
    let role = "Member";

    if (req.session.userId) {
      const user = await User.findOne({
        where: { id: req.session.userId },
        attributes: ["role"],
      });

      if (user) {
        role = user.role;
        console.log("Role user: ", user.role);
      }
    }

    let data;
    const layananId = req.body.nominal;

    if (role === "Member") {
      data = await Layanan.findOne({
        where: { id: layananId },
        attributes: [
          [Sequelize.col("harga_member"), "harga"],
          "is_flash_sale",
          "expired_flash_sale",
          "harga_flash_sale",
        ],
      });
    } else if (role === "Gold") {
      data = await Layanan.findOne({
        where: { id: layananId },
        attributes: [
          [Sequelize.col("harga_gold"), "harga"],
          "is_flash_sale",
          "expired_flash_sale",
          "harga_flash_sale",
        ],
      });
    } else if (role === "Platinum" || role === "Admin") {
      data = await Layanan.findOne({
        where: { id: layananId },
        attributes: [
          [Sequelize.col("harga_platinum"), "harga"],
          "is_flash_sale",
          "expired_flash_sale",
          "harga_flash_sale",
        ],
      });
    } else {
      data = await Layanan.findOne({
        where: { id: layananId },
        attributes: [
          [Sequelize.col("harga_member"), "harga"],
          "is_flash_sale",
          "expired_flash_sale",
          "harga_flash_sale",
        ],
      });
    }

    const today = new Date().toISOString().split("T")[0];
    if (data.is_flash_sale === 1 && data.expired_flash_sale >= today) {
      data.harga = data.harga_flash_sale;
    }

    if (req.body.voucher) {
      const voucher = await Voucher.findOne({
        where: { kode: req.body.voucher },
      });

      if (voucher && voucher.stock > 0) {
        let potongan = data.harga * (voucher.promo / 100);
        if (potongan > voucher.max_potongan) {
          potongan = voucher.max_potongan;
        }
        data.harga = data.harga - potongan;
      }
    }

    res.status(200).json({
      harga: `${data.dataValues.harga}`,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getLayananForAdmin = async (req, res) => {
  try {
    const { page = 1, limit = 5, id } = req.query;
    let whereCondition = {};

    if (id) {
      whereCondition.id = id;
    }

    const layanan = await Layanan.findAndCountAll({
      where: whereCondition,
      include: {
        model: Kategori,
        attributes: ["nama"],
      },
      order: [["created_at", "DESC"]],
      limit: parseInt(limit),
      offset: (page - 1) * limit,
    });
    return res.status(200).json({
      totalPages: Math.ceil(layanan.count / limit),
      currentPage: parseInt(page),
      layanan: layanan.rows,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const getKategoriForLayananAdmin = async (req, res) => {
  try {
    const response = await Kategori.findAll({
      attributes: ["id", "nama"],
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getSubKategoriForLayananAdmin = async (req, res) => {
  try {
    const kategoriId = req.query.kategori_id;

    const subKat = await SubKategori.findAll({
      where: {
        category_id: kategoriId,
      },
    });

    return res.status(200).json(subKat);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
