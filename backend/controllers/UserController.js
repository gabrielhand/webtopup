import User from "../models/UserModel.js";
import argon2 from "argon2";
import crypto from "crypto";
import path from "path";
import fs from "fs";
import {
  Layanan,
  Pembelian,
  Kategori,
  SubKategori,
} from "../config/relations.js";

export const getUsersForKelolaMember = async (req, res) => {
  try {
    const { page = 1, limit = 5, username } = req.query;
    let whereCondition = {};

    if (username) {
      whereCondition.username = username;
    }

    const memberKelola = await User.findAndCountAll({
      where: whereCondition,
      order: [["created_at", "DESC"]],
      attributes: [
        "id",
        "name",
        "username",
        "role",
        "whatsapp",
        "balance",
        "created_at",
      ],
      limit: parseInt(limit),
      offset: (page - 1) * limit,
    });
    return res.status(200).json({
      totalPages: Math.ceil(memberKelola.count / limit),
      currentPage: parseInt(page),
      memberKelola: memberKelola.rows,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const createUserForKelolaMember = async (req, res) => {
  const { name, username, password } = req.body;

  const hashPassword = await argon2.hash(password);

  let no;

  if (req.body.whatsapp) {
    no = req.body.whatsapp;

    if (no.startsWith("0")) {
      no = "62" + no.slice(1);
    }
  }

  const generateApiKey = (length) => {
    return crypto.randomBytes(length).toString("hex").slice(0, length);
  };

  const apiKey = generateApiKey(25);

  try {
    await User.create({
      name: name,
      username: username,
      password: hashPassword,
      whatsapp: no,
      balance: 0,
      api_key: apiKey,
    });
    res.status(201).json({ msg: "Berhasil menambahkan user!" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const getUsersByIdForEditKelolaMember = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findOne({
      where: {
        id: userId,
      },
    });

    return res.status(200).json({
      username: user.username,
      balance: user.balance,
      role: user.role,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateUsersByUsernameForEditKelolaMember = async (req, res) => {
  const usernameParams = req.params.username;
  const { username, balance, role } = req.body;

  try {
    await User.update(
      {
        username: username,
        balance: balance,
        role: role,
      },
      {
        where: {
          username: usernameParams,
        },
      }
    );

    return res.status(200).json({
      msg: "Berhasil memperbarui data",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateBalanceUserForKelolaMember = async (req, res) => {
  const username = req.body.username;

  try {
    const user = await User.findOne({
      where: {
        username: username,
      },
    });

    if (!user)
      return res.status(404).json({
        msg: "Maaf, user tidak ditemukan!",
      });

    await User.update(
      {
        balance: req.body.balance,
      },
      {
        where: {
          username: username,
        },
      }
    );

    res.status(200).json({ msg: "Berhasil menambahkan saldo!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUser = async (req, res) => {
  const user = await User.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!user)
    return res.status(404).json({
      msg: "Maaf, user tidak ada!",
    });

  let fileName = "";
  if (req.files === null) {
    fileName = user.filename;
  } else {
    const file = req.files.image;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    fileName = file.md5 + "-" + Date.now() + ext;
    const allowedType = [".png", ".jpg", ".jpeg", ".gif"];

    if (!allowedType.includes(ext.toLocaleLowerCase()))
      return res.status(422).json({
        msg: "Maaf, jenis file ini tidak diizinkan!",
      });
    if (fileSize > 5000000)
      return res.status(422).json({
        msg: "Maaf, ukuran image harus dibawah 5 MB!",
      });

    if (user.filename) {
      const filepath = `./public/assets/profile/${user.filename}`;
      fs.unlinkSync(filepath);
    }

    file.mv(`./public/assets/profile/${fileName}`, (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });
  }

  const { nama, username, nomorwa } = req.body;
  const url = `${req.protocol}://${req.get("host")}/assets/profile/${fileName}`;
  try {
    await User.update(
      {
        name: nama,
        username: username,
        whatsapp: nomorwa,
        image: url,
        filename: fileName,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    await Pembelian.update(
      { username: username },
      { where: { username: user.username } }
    );
    res.status(200).json({ msg: "Berhasil mengedit data user!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updatePasswordUser = async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ msg: "Mohon login ke akun kamu!" });
  }

  const user = await User.findOne({
    where: {
      id: req.session.userId,
    },
  });

  if (!user)
    return res.status(404).json({
      msg: "Maaf, anda harus login untuk merubah password!",
    });

  const { passwordold, passwordnew } = req.body;

  const isPasswordValid = await argon2.verify(user.password, passwordold);

  if (!isPasswordValid) {
    return res.status(401).json({
      msg: "Password lama tidak sesuai!",
    });
  }

  const hashNewPassword = await argon2.hash(passwordnew);

  try {
    await User.update(
      { password: hashNewPassword },
      {
        where: {
          id: req.session.userId,
        },
      }
    );

    res.status(200).json({
      msg: "Berhasil merubah password!",
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getLimaPembelianByUser = async (req, res) => {
  try {
    const pembelian = await Pembelian.findAll({
      include: [
        {
          model: Layanan,
          as: "layananDetail",
          include: [
            {
              model: Kategori,
              attributes: ["nama", "thumbnail"],
            },
          ],
          attributes: ["kategori_id"],
        },
      ],
      where: {
        username: req.params.username,
      },
      order: [["created_at", "DESC"]],
      limit: 5,
      logging: console.log,
    });

    res.status(200).json(pembelian);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getStatusAllPembelianByUser = async (req, res) => {
  try {
    const username = req.params.username;

    const banyakPembelianSuccess = await Pembelian.count({
      where: {
        username: username,
        status: "Success",
      },
    });

    const banyakPembelianBatal = await Pembelian.count({
      where: {
        username: username,
        status: "Batal",
      },
    });

    const banyakPembelianPending = await Pembelian.count({
      where: {
        username: username,
        status: "Pending",
      },
    });

    res.status(200).json({
      banyakPembelianSuccess,
      banyakPembelianBatal,
      banyakPembelianPending,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getRiwayatPembelianByUser = async (req, res) => {
  try {
    const username = req.params.username;
    const { page = 1, limit = 10, order_id, status } = req.query;

    const whereCondition = { username };

    if (order_id) {
      whereCondition.order_id = order_id;
    }

    if (status) {
      whereCondition.status = status;
    }

    const pembelian = await Pembelian.findAndCountAll({
      include: [
        {
          model: Layanan,
          as: "layananDetail",
          include: [
            {
              model: Kategori,
              attributes: ["nama"],
            },
          ],
        },
        {
          model: SubKategori,
          as: "layananSubKat",
          required: false,
          include: [
            {
              model: Kategori,
              attributes: ["nama"],
            },
          ],
        },
      ],
      where: whereCondition,
      order: [["created_at", "DESC"]],
      limit: parseInt(limit),
      offset: (page - 1) * limit,
    });

    res.status(200).json({
      totalItems: pembelian.count,
      totalPage: Math.ceil(pembelian.count / limit),
      currentPage: parseInt(page),
      pembelian: pembelian.rows,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteUserForKelolaMember = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.destroy({
      where: {
        id: userId,
      },
    });

    if (user === 0) {
      return res.status(404).json({ message: "User tidak ditemukan!" });
    }

    return res.status(200).json({
      msg: "Berhasil menghapus member!",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
