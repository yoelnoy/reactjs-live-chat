const express = require("express");
const http = require('http');
const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server,{cors:'*:*'});
const cors = require("cors");
const { SSL_OP_NO_TICKET } = require("constants");
const PORT = process.env.PORT || 5000
//.listen(process.env.PORT || 5000)

app.use(cors());

app.use(express.json());

let connectedUsers = [];

// Socket io functions
io.on("connection", (socket) => {
  console.log(`user connected on ${socket.id}`)

  socket.on("join_room", (data) => {
    socket.join(data.room)
    connectedUsers.push(data)
    io.emit("connected_users", connectedUsers)
    console.log(connectedUsers);
  })

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data.content);
  })

  socket.on("typing", (data) => {
    socket.broadcast.emit("typing", data)
  })

  socket.on("disconnect-user", (data) => {
    let id = data;
    let userId;
    for (let i = 0; i < connectedUsers.length; i++) {
      userId = connectedUsers[i].id;
      if (userId === id) {
        connectedUsers = connectedUsers.filter(item => item.id !== id);
        socket.disconnect();
      } 
    }
    io.emit("updated-users", connectedUsers);
    //console.log("updated-users " + connectedUsers);
    //socket.disconnect();
  })

  socket.on("disconnect", () => {
    console.log("USER DISCONNECTED " + socket.id);

    let id = socket.id;
    let userId;
    for (let i = 0; i < connectedUsers.length; i++) {
      userId = connectedUsers[i].id;
      if (userId === id) {
        connectedUsers = connectedUsers.filter(item => item.id !== id);
      } 
    }
    io.emit("updated-users", connectedUsers);
    //console.log("updated-users " + connectedUsers);
  });

});

app.get('/',(req,res) => {
  return res.status(200).json({message:"welcome to the backend"})
})

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

server.listen(PORT, () => {
  console.log("Server Running on Port: " + PORT);
});

