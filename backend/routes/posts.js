const router = require("express").Router();
const Post = require("../models/Post");
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token" });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
};

// create post
router.post("/", auth, async (req, res) => {
  const post = new Post({ author: req.user.id, content: req.body.content });
  await post.save();
  res.json(post);
});

// get feed
router.get("/", auth, async (req, res) => {
  const posts = await Post.find().populate("author", "username").sort({ createdAt: -1 });
  res.json(posts);
});

module.exports = router;
