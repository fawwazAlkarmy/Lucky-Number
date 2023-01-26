import { CustomAPIError } from "../errors/custom-error.mjs";
import Jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

const jwtSecret = process.env.JWT_SECRET;

export const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new CustomAPIError("Please provide email and password", 400);
  }
  const id = new Date().getDate();
  const token = Jwt.sign({ id, username }, jwtSecret, { expiresIn: "30d" });
  res.status(200).json({ msg: "user created", token });
};

export const dashboard = async (req, res) => {
  console.log(req.user);
  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `hello ${req.user.username}`,
    secret: `your lucky number is ${luckyNumber}`,
  });
};
