import express from "express";
import { getSettingWeb, saveHargaMembership, saveKonfigurasiWebsite, saveMutasiEWallet, saveRate, saveSloganWebsite, saveTentangKami, saveWarnaWebsite } from "../controllers/SettingWebController.js";
import { verifyAdminOnly, verifyUser } from "../middleware/AuthMiddleware.js";

const router = express.Router();

router.get('/settingweb', getSettingWeb);
router.patch('/settingweb/konfigurasi/website', verifyUser, verifyAdminOnly, saveKonfigurasiWebsite);
router.patch('/settingweb/konfigurasi/slogan', verifyUser, verifyAdminOnly, saveSloganWebsite);
router.patch('/settingweb/konfigurasi/warna', verifyUser, verifyAdminOnly, saveWarnaWebsite);
router.patch('/settingweb/konfigurasi/membership/harga', verifyUser, verifyAdminOnly, saveHargaMembership);
router.patch('/settingweb/konfigurasi/mutasi', verifyUser, verifyAdminOnly, saveMutasiEWallet);
router.patch('/settingweb/konfigurasi/tentang-kami', verifyUser, verifyAdminOnly, saveTentangKami);
router.patch('/settingweb/konfigurasi/rate', verifyUser, verifyAdminOnly, saveRate);

export default router;