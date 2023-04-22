import userSchema from "../model/usermodel.js";
import bcrypt from "bcrypt";
import { signToken } from "../middleware/usermiddleware.js"

// create a new user
const addUser = async (req, res) => {
  try {
    const email = req.body.email;
    const userExist = await userSchema.find({ email: email });

    if (userExist.length) {
      return res
        .status(403)
        .json({ Message: `User with email: ${email} exists` });
    } else {
      const { firstName, lastName, email, password } = req.body;
      const hashPassword = bcrypt.hashSync(password, 10);

      const newUser = await userSchema.create({
        firstName,
        lastName,
        email,
        password: hashPassword,
      });
      return res
        .status(201)
        .json({ messsge: "Successfull registered", data: newUser });
    }
  } catch (error) {
    return res.status(500).json({ Message: `Error: ${error}` });
  }
};

// Authenticate a user
const loginUser = async (req, res) => {
  try {
    let { email, password } = req.body;
    const userFound = await userSchema.findOne({ email: email });
    if (userFound) {
      bcrypt.compare(password, userFound.password, function (error, user) {
        if (error) {
          console.log(error);
          return res.json({
            message: "Incorrect Password or Email",
          });
        }
        if (user) {
          const token = signToken({
            userId: userFound._id,
            firstName: userFound.firstName,
          });

          return res.status(200).json({
            message: `welcome ${userFound.firstName}`,
            token: token,
          });
        } else {
          return res.status(403).json({
            error: "Incorrect Password or Email",
          });
        }
      });
    } else {
      return res.status(404).json({
        error: "User not Found",
      });
    }
  } catch (error) {
    return res.status(500).send(`Error has occurred: ${error}`);
  }
};

const loginWithGoogle = async(req, res) => {
    
}

export { addUser, loginUser };
