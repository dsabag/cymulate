import { JWT_SECRET } from "../config/config.js";
import JWT from "jsonwebtoken";

export const hasToken = (req, res, next) => {
  const { token } = req.cookies;

  try {
    JWT.verify(token, JWT_SECRET);
    next();
  } catch (e) {
    console.error(e);
  }
};
