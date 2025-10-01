const router = require("express").Router();
const jwt = require("jsonwebtoken");
const Message = require("../models/Message");

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token" });
  try { req.user = jwt.verify(token, process.env.JWT_SECRET); next(); }
  catch { res.status(401).json({ error: "Invalid token" }); }
};

// Chat directly with AI (inbox)
router.post("/inbox", auth, async (req, res) => {
  try {
    const reply = await getAIReply(req.body.prompt || "");
    // save user message
    await Message.create({ sender: req.user.id, receiver: process.env.AI_USER_ID, content: req.body.prompt, chatType: "private" });
    // save bot reply
    const bot = await Message.create({ sender: process.env.AI_USER_ID, receiver: req.user.id, content: reply, chatType: "private" });
    res.json({ reply: reply, botMessage: bot });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

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
