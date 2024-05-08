const express = require('express');
const app = express();

const server = require('http').createServer(app);
const { Server } = require('socket.io');
const { addUser } = require('./utils/users.jsx');
const io = new Server(server);
//routes
app.get("/",(req,res)=>{
    res.send("Este es el servidor de la pizarra de chispanota.");
});

let roomIdGlobal,imgURLGlobal;

io.on("connection",(socket)=>{
    socket.on("userJoined",(data)=>{
        const{name,userId,roomId,host,presenter}=data;
        socket.roomId = roomId; // Almacena el roomId en el socket
        socket.join(roomId);
        const users = addUser(data);
        socket.emit("userIsJoined",{success: true,users});
        socket.broadcast.to(roomId).emit("userJoinedMessageBroadcasted",name);
        socket.broadcast.to(roomId).emit("allUsers",users);
        socket.broadcast.to(roomId).emit("whiteBoardDataResponse",{
            imgURL:imgURLGlobal,
        });
    });
    socket.on("whiteboardData",(data)=>{
        imgURLGlobal=data;
        socket.broadcast.to(socket.roomId).emit("whiteBoardDataResponse",{
            imgURL:data,
        });
        
    });
    socket.on("userLeft",(data)=>{
        socket.broadcast.to(socket.roomId).emit("userLeftMessageBroadcasted",data);
    });
    console.log(`Client connected: ${socket.id}`);
});

const port = process.env.PORT || 5000;
server.listen(port,()=>console.log("El servidor corre en http://localhost:5000 "));
