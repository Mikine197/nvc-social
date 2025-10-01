const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  content: String,
  chatType: { type: String, enum: ["private", "group"], default: "private" },
  group: { type: mongoose.Schema.Types.ObjectId, ref: "Group" },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });

module.exports = mongoose.model("Message", MessageSchema);
