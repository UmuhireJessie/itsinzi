import chatSchema from "../model/chatmodel.js";

import userSchema from "../model/usermodel.js";

// create and save new chat
const createChat = async (req, res) => {
  try {
    const userId = req.user.userId;
    const newChat = await chatSchema.create({
      question: req.body.question,
      answer: req.body.answer,
      userId,
    });

    const userChat = await userSchema.findById(userId);
    userChat.chats.push(newChat);
    await userChat
      .save()
      .then(() =>
        res
          .status(201)
          .json({ message: "Chat created successfully", chat: newChat })
      );
  } catch (error) {
    res.status(500).send(`Error: ${error}`);
  }
};

// Get all chats
const getAllChat = async (req, res) => {
  try {
    const userId = req.user.userId;
    const getChat = await userSchema.findById(userId).populate("chats");
    res.status(200).json({
      message: "All Chats",
      Chats: getChat.chats,
    });
  } catch (error) {
    res.status(500).json({
      Error: "Internal server error",
    });
  }
};

export { createChat, getAllChat };
