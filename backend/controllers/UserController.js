import User from "../models/UserModel.js";
import argon2 from "argon2";
import { log } from "console";
import crypto from "crypto";
import path from "path";
import fs from "fs";
import { Layanan, Pembelian, Kategori } from "../config/relations.js";
import db from "../config/database.js";

export const getUsers = async (req, res) => {
  try {
    const response = await User.findAll({
      attributes: ["name", "username", "whatsapp", "api_key"],
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const createUser = async (req, res) => {
  const { name, username, password } = req.body;

  const hashPassword = await argon2.hash(password);

  let no = req.body.whatsapp;

  if (no.startsWith("0")) {
    no = "62" + no.slice(1);
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
    res.status(201).json({ msg: "Berhasil mendaftarkan akun anda!" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
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

  const username = req.body.username;
  const url = `${req.protocol}://${req.get("host")}/assets/profile/${fileName}`;
  try {
    await User.update(
      { username: username, image: url, filename: fileName },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({ msg: "Berhasil mengedit data user!" });
  } catch (error) {
    console.log(error.message);
  }
};

export const updatePasswordUser = async (req, res) => {
  console.log(req.session.userId);
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

export const getPembelianByUser = async (req, res) => {
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
        username: req.session.username,
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

export const deleteUser = async (req, res) => {};
