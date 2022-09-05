import { Router } from "express";
import { hasToken } from "../middlewares/hasToken.js";
import { signIn } from "../controllers/userController.js";
import { sendEmail } from "../controllers/mailController.js";
import { updateClicked, getEmails } from "../controllers/dbMailController.js";
import { saveEmail } from "../middlewares/saveEmailToDB.js";

const router = Router();

/* Routes */

router.post("/signin", signIn);
router.post("/send", hasToken, saveEmail, sendEmail);

router.get("/ngrok/:token", updateClicked);
router.get("/emails", hasToken, getEmails);

export { router };
