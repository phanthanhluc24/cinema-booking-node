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
// io.on("connection", (socket) => {
//   console.log("a user connected", socket.id);

//   socket.on("join_room",(data)=>{
//     socket.join(data)
//     console.log(`A user join the room ${data} with id is ${socket.id}`);
//   })

//   // handle incoming message
//   socket.on("chat message", (data) => {
//     const { room, message, name, times } = data;
//     io.to(room).emit("received_message",{name:name,message:message,times:times,idUser:socket.id});
//     console.log("the message", data);
//     console.log("the Id", room);
//   });

//   // handle user disconnection
//   socket.on("disconnect", () => {
//     console.log("A user disconnect");
//   });
// });

// another socketIo
let activeUsers=[]
// user connected
io.on("connection",(socket)=>{
  socket.on("new-user-add",(newUserId)=>{
    if (!activeUsers.some((user)=>user.userId===newUserId)) {
      activeUsers.push({
        userId:newUserId,
        socketId:socket.id
      })
    }
    console.log("Connected User",activeUsers);
    io.emit("get-users",activeUsers)
  })

  //user send message
  socket.on("send-message",(data)=>{
    const {receiveId }=data
    const user=activeUsers.find((user)=>user.userId===receiveId)
    console.log("Sending from socket to :"+receiveId);
    console.log("message "+JSON.stringify(data));
    if (user) {
      io.to(user.socketId).emit("receive-message",data)
      console.log("Message sent successfully to user: ", user.socketId);
    }
  })
  // user disconnected
  socket.on("disconnect",()=>{
    activeUsers=activeUsers.filter((user)=>user.socketId !==socket.id)
    console.log("User disconnected"), activeUsers;
    io.emit("get-users",activeUsers)
  })
})

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
