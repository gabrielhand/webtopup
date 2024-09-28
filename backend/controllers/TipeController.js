import Tipe from "../models/TipeModel.js";

export const getTipe = async (req, res) => {
  try {
    const { page = 1, limit = 5, name } = req.query;
    let whereCondition = {};

    if (name) {
      whereCondition.name = name;
    }

    const tipe = await Tipe.findAndCountAll({
      where: whereCondition,
      order: [["created_at", "DESC"]],
      limit: parseInt(limit),
      offset: (page - 1) * limit,
    });
    return res.status(200).json({
      totalPages: Math.ceil(tipe.count / limit),
      currentPage: parseInt(page),
      tipe: tipe.rows,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const addTipe = async (req, res) => {
  try {
    const namaTipe = req.body.name;

    await Tipe.create({
      name: namaTipe,
    });

    return res.status(200).json({
      msg: "Berhasil menambahkan tipe!",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getTipeById = async (req, res) => {
  try {
    const tipe = await Tipe.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!tipe)
      return res.status(404).json({
        msg: "Maaf, tipe tidak ditemukan!",
      });

    return res.status(200).json(tipe);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const updateTipe = async (req, res) => {
  try {
    const namaTipe = req.body.name;

    const tipe = await Tipe.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!tipe) {
      return res.status(404).json({
        msg: "Maaf, tipe tidak ditemukan!",
      });
    }

    await Tipe.update(
      {
        name: namaTipe,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    return res.status(200).json({
      msg: "Berhasil mengedit tipe!",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteTipe = async (req, res) => {
  try {
    const tipeId = req.params.id;

    const tipe = await Tipe.destroy({
      where: {
        id: tipeId,
      },
    });

    if (tipe === 0) {
      return res.status(404).json({ message: "Tipe tidak ditemukan!" });
    }

    return res.status(200).json({
      msg: "Berhasil menghapus tipe!",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
