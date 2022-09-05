import express from "express";
import { router } from "./router/router.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { dbo } from "./db/conn.js";
const app = express();
const port = 5000;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    preflightContinue: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(router);

app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
  });
  console.log(`Server is running on port: ${port}`);
});
