import express from "express";
import {
  getUsersForKelolaMember,
  createUserForKelolaMember,
  updateUser,
  updatePasswordUser,
  getLimaPembelianByUser,
  getStatusAllPembelianByUser,
  getRiwayatPembelianByUser,
  updateBalanceUserForKelolaMember,
  deleteUserForKelolaMember,
  getUsersByIdForEditKelolaMember,
  updateUsersByUsernameForEditKelolaMember,
} from "../controllers/UserController.js";
import { verifyUser, verifyAdminOnly } from "../middleware/AuthMiddleware.js";

const router = express.Router();

router.get("/users/member", verifyUser, verifyAdminOnly, getUsersForKelolaMember);
router.post("/users/member/create", verifyUser, verifyAdminOnly, createUserForKelolaMember);
router.patch("/users/member/balance/update", verifyUser, verifyAdminOnly, updateBalanceUserForKelolaMember);
router.get("/users/member/get/:id", verifyUser, verifyAdminOnly, getUsersByIdForEditKelolaMember);
router.patch("/users/member/update/:username", verifyUser, verifyAdminOnly, updateUsersByUsernameForEditKelolaMember);
router.delete("/users/member/delete/:id", verifyUser, verifyAdminOnly, deleteUserForKelolaMember);
router.patch("/users/edit/:id", updateUser);
router.patch("/users/password/edit", updatePasswordUser);
router.get("/users/pembelian/lima/:username", getLimaPembelianByUser);
router.get("/users/pembelian/status/:username", getStatusAllPembelianByUser);
router.get("/users/pembelian/riwayat/:username", getRiwayatPembelianByUser);

export default router;
