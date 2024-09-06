import { QueryTypes, where } from "sequelize";
import db from "../config/database.js";
import Kategori from "../models/KategoriModel.js";
import { Layanan, Tipe } from "../config/relations.js";
import SubKategori from "../models/SubKategoriModel.js";
import LayananModel from "../models/LayananModel.js";

export const getKategori = async (req, res) => {
  try {
    const response = await Kategori.findAll({
      where: {
        status: "active",
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getKategoriPopuler = async (req, res) => {
  try {
    const response = await Kategori.findAll({
      where: {
        status: "active",
        populer: true,
      },
      limit: 9,
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getKategoriByTipe = async (req, res) => {
  try {
    const response = await db.query(
      `
            SELECT k.*, t.name as tipe_nama
            FROM kategoris k
            JOIN tipes t ON k.tipe_id = t.id
            WHERE k.status = 'active'
            ORDER BY k.tipe_id ASC
        `,
      {
        type: QueryTypes.SELECT,
      }
    );
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};
export const getKategoriForServices = async (req, res) => {
  try {
    const tipe = await Tipe.findAll({
      include: {
        model: Kategori,
        where: { status: "active" },
        include: {
          model: Layanan,
        },
      },
      order: [["id", "ASC"]],
    });

    const allKategori = tipe.map((tipe) => {
      return {
        tipe_nama: tipe.name,
        kategori: tipe.kategoris.map((kategori) => ({
          ...kategori.dataValues,
          layanans: kategori.layanans,
        })),
      };
    });

    res.status(200).json(allKategori);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

export const getKategoriByKode = async (req, res) => {
  try {
    const { kode } = req.params;

    const data = await Kategori.findOne({
      where: { kode: kode },
      attributes: [
        "nama",
        "brand",
        "sub_nama",
        "server_id",
        "thumbnail",
        "id",
        "kode",
        "tipe_id",
        "deskripsi",
        "petunjuk",
        "bannerlayanan",
        "ket_layanan",
        "ket_id",
        "placeholder_1",
        "placeholder_2",
      ],
      include: [
        {
          model: Tipe,
          attributes: ["id", "name"],
        },
      ],
    });

    if (!data) {
      return res
        .status(404)
        .json({ message: "Maaf, kategori tidak ditemukan!" });
    }

    let subkategori = await SubKategori.findAll({
      where: { category_id: data.id },
      attributes: ["sub_logo", "id","category_id", "code", "name", "active"],
    });

    const normalSubCategory = {
      id: 0,
      category_id: data.id,
      code: "normal",
      name: "Topup",
      active: 1,
    };
    subkategori = [...subkategori, normalSubCategory];

    let role = req.user ? req.user.role : "Guest";
    let priceColumn;

    switch (role) {
      case "Gold":
        priceColumn = "harga_gold";
        break;
      case "Platinum":
      case "Admin":
        priceColumn = "harga_platinum";
        break;
      default:
        priceColumn = "harga_member";
    }

    const layanan = await LayananModel.findAll({
      where: {
        kategori_id: data.id,
        status: "available",
      },
      attributes: [
        "id",
        "sub_category_id",
        "layanan",
        "product_logo",
        [priceColumn, "harga"],
        "is_flash_sale",
        "expired_flash_sale",
        "harga_flash_sale",
      ],
      order: [["harga", "ASC"]],
    });

    res.status(200).json({ data, subkategori, layanan });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};
