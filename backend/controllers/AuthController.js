import { Op, Sequelize } from "sequelize";
import db from "../config/database.js";
import User from "../models/UserModel.js";
import argon2 from "argon2";
import crypto from "crypto";

export const Register = async (req, res) => {
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

export const Login = async (req, res) => {
  const user = await User.findOne({
    where: Sequelize.where(Sequelize.col("username"), {
      [Op.eq]: Sequelize.literal(`BINARY '${req.body.username}'`),
    }),
  });

  if (!user)
    return res.status(404).json({ msg: "Maaf, username atau password salah" });
  const match = await argon2.verify(user.password, req.body.password);
  if (!match)
    return res.status(404).json({ msg: "Maaf, username atau password salah" });
  req.session.userId = user.id;
  req.session.username = user.username;
  const id = user.id;
  const name = user.name;
  const username = user.username;
  const whatsapp = user.whatsapp;
  const role = user.role;
  res.status(200).json({ id, name, username, whatsapp, role });
};

export const Me = async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ msg: "Mohon login ke akun kamu!" });
  }

  const user = await User.findOne({
    attributes: [
      "id",
      "name",
      "username",
      "whatsapp",
      "role",
      "image",
      "filename",
      "balance",
      "api_key",
    ],
    where: {
      id: req.session.userId,
    },
  });
  if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
  res.status(200).json(user);
};

export const Logout = (req, res) => {
  req.session.destroy((error) => {
    if (error) return res.status(400).json({ msg: "Tidak dapat Logout" });
    res.status(200).json({ msg: "Berhasil Logout!" });
  });
};
