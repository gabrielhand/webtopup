import Method from "../models/MethodModel.js";
import path from "path";
import fs from "fs";

export const getMethod = async (req, res) => {
  try {
    const response = await Method.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getMethodForAdmin = async (req, res) => {
  try {
    const { page = 1, limit = 5, name } = req.query;
    let whereCondition = {};

    if (name) {
      whereCondition.name = name;
    }

    const method = await Method.findAndCountAll({
      where: whereCondition,
      order: [["name", "ASC"]],
      limit: parseInt(limit),
      offset: (page - 1) * limit,
    });
    return res.status(200).json({
      totalPages: Math.ceil(method.count / limit),
      currentPage: parseInt(page),
      method: method.rows,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const addMethodForAdmin = async (req, res) => {
  try {
    const { name, code, keterangan, tipe } = req.body;
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

    gambarFile.mv(`./public/assets/thumbnail/${gambarFileName}`, (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });

    const gambarUrl = `${req.protocol}://${req.get(
      "host"
    )}/assets/thumbnail/${gambarFileName}`;

    await Method.create({
      name: name,
      images: gambarUrl,
      images_filename: gambarFileName,
      code: code,
      keterangan: keterangan,
      tipe: tipe,
    });

    return res.status(200).json({ msg: "Berhasil menambahkan payment!" });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getMethodByIdForAdmin = async (req, res) => {
  try {
    const methodId = req.params.id;

    const method = await Method.findOne({
      where: {
        id: methodId,
      },
    });

    if (method[0] === 0) {
      return res.status(404).json({ msg: "Method tidak ditemukan!" });
    }

    return res.status(200).json(method);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateMethodForAdmin = async (req, res) => {
  try {
    const { name, code, keterangan, tipe } = req.body;

    const method = await Method.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!method)
      return res.status(404).json({
        msg: "Maaf, payment tidak ada!",
      });

    let gambarFileName = "";
    if (req.files === null) {
      gambarFileName = method.images_filename;
    } else {
      const gambarFile = req.files.gambar;
      const gambarFileSize = gambarFile.data.length;
      const gambarExt = path.extname(gambarFile.name);
      gambarFileName = gambarFile.md5 + "-" + Date.now() + gambarExt;
      const allowedType = [".png", ".jpg", ".jpeg", ".gif"];

      if (!allowedType.includes(gambarExt.toLocaleLowerCase()))
        return res.status(422).json({
          msg: "Maaf, jenis file ini tidak diizinkan!",
        });
      if (gambarFileSize > 5000000)
        return res.status(422).json({
          msg: "Maaf, ukuran gambar harus dibawah 5 MB!",
        });

      if (method.images_filename) {
        const methodFilePath = `./public/assets/thumbnail/${method.images_filename}`;
        fs.unlinkSync(methodFilePath);
      }

      gambarFile.mv(`./public/assets/thumbnail/${gambarFileName}`, (err) => {
        if (err) return res.status(500).json({ msg: err.message });
      });
    }

    const gambarUrl = `${req.protocol}://${req.get(
      "host"
    )}/assets/thumbnail/${gambarFileName}`;
    await Method.update(
      {
        name: name,
        code: code,
        keterangan: keterangan,
        tipe: tipe,
        images: gambarUrl,
        images_filename: gambarFileName,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({ msg: "Berhasil mengedit data payment!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteMethodForAdmin = async (req, res) => {
  try {
    const methodId = req.params.id;

    const method = await Method.findOne({
      where: {
        id: methodId,
      },
    });

    if (!method) {
      return res.status(404).json({ message: "Payment tidak ditemukan!" });
    }

    if (method.path_filename) {
      const methodFilePath = `./public/assets/thumbnail/${method.path_filename}`;
      fs.unlinkSync(methodFilePath);
    }

    await Method.destroy({
      where: {
        id: methodId,
      },
    });

    return res.status(200).json({
      msg: "Berhasil menghapus payment!",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
