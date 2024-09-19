import User from "../models/UserModel.js";

export const verifyUser = async (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ msg: "Mohon login ke akun kamu!" });
  }

  const user = await User.findOne({
    where: {
      id: req.session.userId,
    },
  });
  if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
  req.userId = user.id;
  req.role = user.role;
  next();
};

export const verifyAdminOnly = async (req, res, next) => {
  const user = await User.findOne({
    where: {
      id: req.session.userId,
    },
  });
  if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
  if (user.role !== "Admin")
    return res.status(403).json({ msg: "Maaf, akses terlarang!" });
  req.userId = user.id;
  req.role = user.role;
  next();
};
