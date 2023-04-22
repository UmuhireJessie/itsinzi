import express from "express";

import { addUser, loginUser } from "../controller/usercontroller.js";
import { userValidator } from "../middleware/usermiddleware.js";


const router = express.Router();

// routes for the api
router.post("/user", userValidator, addUser);
router.post("/user/login", loginUser);

export default router;
