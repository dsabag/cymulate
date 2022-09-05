import JWT from "jsonwebtoken";
import { dbo } from "../db/conn.js";
import { JWT_SECRET } from "../config/config.js";

export const signIn = (req, res) => {
  const { uname, pass } = req?.body;

  if (!uname || !pass) {
    return res.status(400).send("user name was not provided");
  }

  try {
    const db_connect = dbo.getDb();
    let userQuery = { user_name: uname, password: pass };
    db_connect.collection("users").findOne(userQuery, function (err, result) {
      if (err) throw err;

      if (!result) {
        return res.status(400).send("user name or password is incorrect");
      }
      const token = JWT.sign({ uname }, JWT_SECRET, {
        algorithm: "HS512",
        expiresIn: "12h",
      });

      res.cookie("token", token, {
        maxAge: 100000,
        httpOnly: false,
      });

      return res.status(200).send("welcome back " + uname);
    });
  } catch (error) {
    return res.status(500).send("unable to signin user, please try again");
  }
};
