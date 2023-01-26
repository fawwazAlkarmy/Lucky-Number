import { CustomAPIError } from "../errors/custom-error.mjs";
import Jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();
const jwtSecret = process.env.JWT_SECRET;
export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new CustomAPIError("No token was provided", 401);
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = Jwt.verify(token, jwtSecret);
    const { id, username } = decoded;
    req.user = { id, username };
    next();
  } catch (error) {
    throw new CustomAPIError("Unauthorized", 401);
  }
};
