import express from "express";
import connectDB from "./database/connection.js";
import router from "./router/userrouter.js";
import authRouter from "./router/auth.js";
import dotenv from "dotenv";
import cors from "cors";
import passport from "passport";
import session from "express-session";

dotenv.config();

const app = express();
connectDB;

app.use(
  session({
    secret: process.env.MYSECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // change this to true if using HTTPS
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

app.use(router);
app.use("/auth", authRouter);
app.get("/", (req, res) => {
  res.status(200).send("Welcome to the Itsinzi API");
});
app.get("*", (req, res) => {
  res.status(404).send("Page not Found");
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
