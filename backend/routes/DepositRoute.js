import express from "express";
import { getMemberDepositAdmin } from "../controllers/DepositController.js";
import { verifyUser, verifyAdminOnly } from "../middleware/AuthMiddleware.js";

const router = express.Router();

router.get("/member/deposit", verifyUser ,verifyAdminOnly , getMemberDepositAdmin);

export default router;
