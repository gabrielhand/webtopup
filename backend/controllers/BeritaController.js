import Berita from "../models/BeritaModel.js";
import path from "path";
import fs from "fs";

export const getSwiper = async (req, res) => {
  try {
    const response = await Berita.findAll({
      where: {
        tipe: "banner",
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getBeritaForAdmin = async (req, res) => {
  try {
    const { page = 1, limit = 5, tipe } = req.query;
    let whereCondition = {};

    if (tipe) {
      whereCondition.tipe = tipe;
    }

    const berita = await Berita.findAndCountAll({
      where: whereCondition,
      order: [["created_at", "DESC"]],
      limit: parseInt(limit),
      offset: (page - 1) * limit,
    });
    return res.status(200).json({
      totalPages: Math.ceil(berita.count / limit),
      currentPage: parseInt(page),
      berita: berita.rows,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const addBeritaForAdmin = async (req, res) => {
  try {
    const { deskripsi, tipe } = req.body;
    const gambarFile = req.files?.gambar;

    if (!gambarFile) {
      return res.status(422).json({
        msg: "File gambar tidak ditemukan!",
      });
    }

    const gambarFileSize = gambarFile.data.length;
    const gambarExt = path.extname(gambarFile.name);
    const gambarFileName = gambarFile.md5 + "-" + Date.now() + gambarExt;

    const allowedType = [".png", ".jpg", ".jpeg"];

    if (!allowedType.includes(gambarExt.toLocaleLowerCase()))
      return res.status(422).json({
        msg: "Maaf, jenis file ini tidak diizinkan!",
      });

    if (gambarFileSize > 5000000)
      return res.status(422).json({
        msg: "Maaf, ukuran gambar harus dibawah 5 MB!",
      });

    gambarFile.mv(`./public/assets/banner/${gambarFileName}`, (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });

    const gambarUrl = `${req.protocol}://${req.get(
      "host"
    )}/assets/banner/${gambarFileName}`;

    await Berita.create({
      path: gambarUrl,
      path_filename: gambarFileName,
      tipe: tipe,
      deskripsi: deskripsi,
    });

    return res.status(200).json({ msg: "Berhasil mengupload gambar" });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteBeritaForAdmin = async (req, res) => {
  try {
    const beritaId = req.params.id;

    const berita = await Berita.findOne({
      where: {
        id: beritaId,
      },
    });

    if (!berita) {
      return res.status(404).json({ message: "Berita tidak ditemukan!" });
    }

    if (berita.path_filename) {
      const beritaFilepath = `./public/assets/banner/${berita.path_filename}`;
      fs.unlinkSync(beritaFilepath);
    }

    await Berita.destroy({
      where: {
        id: beritaId,
      },
    });

    return res.status(200).json({
      msg: "Berhasil menghapus gambar!",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
