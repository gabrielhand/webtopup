import express from "express";
import { Login, Logout, Me } from "../controllers/AuthController.js";
import { verifyUser, verifyAdminOnly } from "../middleware/AuthMiddleware.js";

const router = express.Router();

router.get("/me", verifyUser, Me);
router.post("/login", Login);
router.delete("/logout", Logout);

export default router;