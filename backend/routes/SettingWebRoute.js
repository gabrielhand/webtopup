import express from "express";
import { getSettingWeb } from "../controllers/SettingWebController.js";

const router = express.Router();

router.get('/settingweb', getSettingWeb);

export default router;