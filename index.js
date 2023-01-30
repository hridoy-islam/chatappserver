const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./Routes/authRoutes");
const messagesRoute = require("./Routes/messagesRoute");
const socket = require("socket.io");

const PORT = 5000 || process.env.PORT;
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("DB Connetion Successfull");
})
.catch((err) => {
  console.log(err.message);
});

app.use("/api/auth", authRoutes);
app.use("/api/msg", messagesRoute);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/app.html");
});

const server = app.listen(PORT, function () {
  console.log(`hello server is running at ${PORT}`);
});

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});
global.onlineUsers = new Map();
io.on("connection", (socket) => {
  
})