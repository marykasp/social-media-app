import express from "express";
import { login } from "../controllers/auth.js";

// configure routes
const router = express.Router();

router.post("/login", login);

export default router;
