import express from "express";

import { addUser, loginUser } from "../controller/usercontroller.js";
import { isLogin, userValidator } from "../middleware/usermiddleware.js";
import { createChat, getAllChat } from "../controller/chatcontroller.js";


const router = express.Router();

// routes for the user
router.post("/register", userValidator, addUser);
router.post("/login", loginUser);


// routes for the chat
router.post("/chat", isLogin, createChat);
router.get("/chat", isLogin, getAllChat);

export default router;
