import express from "express";
const router = express.Router();
import { userSchemaValidation } from "../models/user.model.js";
import validatePayload from "../middlewares/validatePayload.js";
import { createAccount,  getAllAccount, decryptData} from "../controllers/account.controller.js"

router.post("/account", validatePayload(userSchemaValidation, "body"), createAccount);
router.get("/account", getAllAccount)
router.post("/decrypt", decryptData)

export default router;