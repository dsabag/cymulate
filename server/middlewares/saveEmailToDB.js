import { dbo } from "../db/conn.js";
import crypto from "crypto";

export const saveEmail = async (req, res, next) => {
  const email = req?.body?.email;

  if (!email) {
    return res.status(400).send("no email was provided");
  }
  const token = crypto.randomBytes(5).toString("hex");

  try {
    const db = dbo.getDb();
    const emails = await db.collection("emails");
    await emails.insertOne({
      email: email,
      clicked: false,
      token,
    });
    req.email = email;
    req.token = token;
    next();
  } catch (error) {
    return res.status(500).send("server error");
  }
};
