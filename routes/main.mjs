import express from "express";
import { dashboard, login } from "../controllers/main.mjs";
import { authMiddleware } from "../middleware/auth.mjs";

export const mainRouter = express.Router();

mainRouter.route("/dashboard").get(authMiddleware, dashboard);
mainRouter.route("/login").post(login);
