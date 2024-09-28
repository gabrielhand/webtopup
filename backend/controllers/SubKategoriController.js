import Kategori from "../models/KategoriModel.js";
import SubKategori from "../models/SubKategoriModel.js";

export const getSubKategori = async (req, res) => {
  try {
    const response = await SubKategori.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getKategoriForSubKategoriAdmin = async (req, res) => {
  try {
    const kategori = await Kategori.findAll({
      attributes: ["id", "nama"],
    });

    return res.status(200).json(kategori);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getSubKategoriForSubKategoriAdmin = async (req, res) => {
  try {
    const { page = 1, limit = 5, name } = req.query;
    let whereCondition = {};

    if (name) {
      whereCondition.name = name;
    }

    const subKategori = await SubKategori.findAndCountAll({
      where: whereCondition,
      order: [["created_at", "DESC"]],
      include: {
        model: Kategori,
        attributes: ["nama"],
      },
      limit: parseInt(limit),
      offset: (page - 1) * limit,
    });
    return res.status(200).json({
      totalPages: Math.ceil(subKategori.count / limit),
      currentPage: parseInt(page),
      subKategori: subKategori.rows,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const addSubKategoriForSubKategoriAdmin = async (req, res) => {
  try {
    const { categori_id, code, name } = req.body;

    await SubKategori.create({
      category_id: categori_id,
      code: code,
      name: name,
      active: 1,
    });

    return res.status(200).json({ msg: "Berhasil menambahkan sub kategori!" });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteSubKategoriForSubKategoriAdmin = async (req, res) => {
  try {
    const subKategoriId = req.params.id;

    const subKategori = await SubKategori.destroy({
      where: {
        id: subKategoriId,
      },
    });

    if (subKategori === 0) {
      return res.status(404).json({ message: "Sub kategori tidak ditemukan!" });
    }

    return res.status(200).json({
      msg: "Berhasil menghapus sub kategori!",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
