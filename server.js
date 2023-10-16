const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const route = require("./src/routers");
const cors = require("cors");
const cookie = require("cookie-parser");
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URL = process.env.MONGODB_URL;
const http = require("http");
const server = http.createServer(app);
const socketIo = require("socket.io");
// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
mongoose
  .connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connect success to Mongodb");
  })
  .catch((err) => {
    console.log("Error connect with mongodb:", err);
    process.exit(1);
  });
// config cors
const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));

// config route
route(app);
//config cookie
app.use(cookie());

// config socket.io
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  socket.on("join_room",(data)=>{
    socket.join(data)
    console.log(`A user join the room ${data} with id is ${socket.id}`);
  })

  // handle incoming message
  socket.on("chat message", (data) => {
    const { room, message, name, times } = data;
    io.to(room).emit("received_message",{name:name,message:message,times:times,idUser:socket.id});
    console.log("the message", data);
    console.log("the Id", room);
  });

  // handle user disconnection
  socket.on("disconnect", () => {
    console.log("A user disconnect");
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
