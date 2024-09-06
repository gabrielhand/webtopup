import express from "express";
import { getMethod } from "../controllers/MethodController.js";

const router = express.Router();

router.get("/method", getMethod);

export default router;
