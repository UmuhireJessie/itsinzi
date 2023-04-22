import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import usermodel from "../model/usermodel.js";

dotenv.config();

const secret = process.env.JWT_SECRET;

const signToken = (payload) => {
  try {
    return jwt.sign(payload, secret, { expiresIn: "1d" });
  } catch (error) {
    return res.status(500).json({ Error: "Internal server error " });
  }
};

const verifyToken = (token) => {
  return jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return { error: err };
    }
    return { value: decoded };
  });
};

const isLogin = (req, res, next) => {
  let token = req.headers.authorization.split(" ")[1];

  if (!token)
    return res.status(403).json({ message: "You need to login first" });
  const user = jwt.verify(token, secret);
  req.user = user;

  next();
};

export const checkUserByEmail = async (req, res, next) => {
  const user = await usermodel.findOne({
    where: { email: req.user.emails[0].value },
  });
  if (user) {
    const { id, email, role } = user;
    const token = signToken({
      id: id,
      email: email,
      role: role,
    });
    return res.redirect(`/user/redirect?key=${token}`);
  }
  next();
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

export { signToken, userValidator, verifyToken, isLogin };
