import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secret = process.env.JWT_SECRET;
const signToken = (payload) => {
  try {
    return jwt.sign(payload, secret, { expiresIn: "1d" });
  } catch (error) {
    return res.status(500).json({ Error: "Internal server error " });
  }
};

const userValidator = (req, res, next) => {
  if (req.body.firstName == "") {
    return res.status(400).json({ message: "Please enter your First name" });
  }
  if (req.body.lastName == "") {
    return res.status(400).json({ message: "Please enter your Last name" });
  }
  if (req.body.email == "") {
    return res.status(400).json({ message: "Please enter your email" });
  }
  if (req.body.password == "") {
    return res.status(400).json({ message: "Please enter your password" });
  }

  next();
};

export { signToken, userValidator };
