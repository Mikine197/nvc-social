const router = require("express").Router();
const Message = require("../models/Message");
const Group = require("../models/Group");
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token" });
  try { req.user = jwt.verify(token, process.env.JWT_SECRET); next(); }
  catch { res.status(401).json({ error: "Invalid token" }); }
};

// Private chat send
router.post("/private", auth, async (req, res) => {
  const msg = new Message({
    sender: req.user.id,
    receiver: req.body.receiverId,
    content: req.body.content,
    chatType: "private"
  });
  await msg.save();
  res.json(msg);
});

// Get private chat messages with a user id
router.get("/private/:id", auth, async (req, res) => {
  const msgs = await Message.find({
    $or: [
      { sender: req.user.id, receiver: req.params.id },
      { sender: req.params.id, receiver: req.user.id }
    ]
  }).populate("sender receiver", "username");
  res.json(msgs);
});

// Create group
router.post("/group", auth, async (req, res) => {
  const group = new Group({ name: req.body.name, members: [req.user.id] });
  await group.save();
  res.json(group);
});

// Send group msg (and trigger AI if @meta mentioned)
router.post("/group/:id", auth, async (req, res) => {
  const msg = new Message({
    sender: req.user.id,
    content: req.body.content,
    chatType: "group",
    group: req.params.id
  });
  await msg.save();

  // if mention @meta -> call AI and save bot reply
  if (req.body.content.includes("@meta")) {
    const prompt = req.body.content.replace(/@meta/gi, "").trim() || "Hello";
    try {
      const aiReply = await getAIReply(prompt);
      const botMsg = new Message({
        sender: process.env.AI_USER_ID,
        content: aiReply,
        chatType: "group",
        group: req.params.id
      });
      await botMsg.save();
    } catch (e) {
      console.error("AI error:", e.message || e);
    }
  }

  res.json(msg);
});

// Get group messages
router.get("/group/:id", auth, async (req, res) => {
  const msgs = await Message.find({ group: req.params.id }).populate("sender", "username");
  res.json(msgs);
});

// helper to call AI provider (OpenAI used as example)
async function getAIReply(prompt) {
  const fetch = require("node-fetch");
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.OPENAI_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }]
    })
  });
  const data = await response.json();
  return data.choices && data.choices[0] && data.choices[0].message ? data.choices[0].message.content : "Meta AI couldn't reply.";
}

module.exports = router;
