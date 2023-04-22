import mongoose from "mongoose";

var userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  role: {
    type: String,
    default: "user",
  },
  password: {
    type: String,
    required: true,
  },
  chats: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "chat",
    },
  ],
});

export default new mongoose.model("user", userSchema);
