import { Op, Sequelize } from "sequelize";
import db from "../config/database.js";
import User from "../models/UserModel.js";
import argon2 from "argon2";

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

  console.log(req.session.userId);

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
