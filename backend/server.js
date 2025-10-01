const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const { Server } = require("socket.io");
const http = require("http");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/posts", require("./routes/posts"));
app.use("/api/chat", require("./routes/chat"));
app.use("/api/ai", require("./routes/ai"));

// MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error(err));

const server = http.createServer(app);

// 🔥 Socket.io for realtime chat
const io = new Server(server, { cors: { origin: "*" } });
io.on("connection", socket => {
  console.log("🟢 User connected:", socket.id);
  socket.on("send_message", data => {
    io.to(data.room).emit("receive_message", data);
  });
  socket.on("join_room", room => {
    socket.join(room);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on ${PORT}`));
