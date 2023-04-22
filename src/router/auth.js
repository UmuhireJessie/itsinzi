import express from "express";
import passport from "passport";
import { googlePass } from "../controller/passport.js";
import { checkUserByEmail, verifyToken } from "../middleware/usermiddleware.js";
import { googleAuthHandler } from "../controller/usercontroller.js";

googlePass();

const router = express.Router();

router.get("/redirect", (req, res) => {
  try {
    if (req.query.code) {
      const user = verifyToken(req.query.code);
      return res.status(200).json({
        message: "Thanks for logging in",
        user: user,
        token: req.query.key,
      });
    } else {
      return res.status(401).json({ error: "Unauthorized" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/google/redirect",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/",
    successRedirect: "/auth/redirect",
  }),
  checkUserByEmail,
  googleAuthHandler
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(process.env.CLIENT_URL);
});

export default router;
