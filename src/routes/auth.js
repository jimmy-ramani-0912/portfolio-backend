import express from "express";
import { Register, Login } from "../controllers/auth.js";

const router = express.Router();

router.post("/signup", Register);
router.post("/login", Login);

export default router;
