const express = require('express');
const app = express();
const server = require('http').createServer(app);
const { Server } = require('socket.io');
const { addUser, removeUser, getUser, getUsersInRoom } = require('./utils/users.jsx');
const io = new Server(server);

// Rutas
app.get("/", (req, res) => {
    res.send("Este es el servidor de la pizarra de chispanota.");
});

let roomIdGlobal, imgURLGlobal;
let onlineUsers = 0;

io.on("connection", (socket) => {
    onlineUsers++;
    io.emit("onlineUsers", onlineUsers);

    socket.on("userJoined", (data) => {
        const { name, userId, roomId, host, presenter } = data;
        roomIdGlobal = roomId;
        socket.join(roomId);
        const users = addUser({
            name,
            userId,
            roomId,
            host,
            presenter,
            socketId: socket.id
        });

        socket.emit("userIsJoined", { success: true, users, isCreator: host });
        socket.broadcast.to(roomId).emit("userJoinedMessageBroadcasted", name);
        socket.broadcast.to(roomId).emit("allUsers", users);
        socket.broadcast.to(roomId).emit("whiteBoardDataResponse", {
            imgURL: imgURLGlobal,
        });
    });

    socket.on("whiteboardData", (data) => {
        imgURLGlobal = data;
        io.to(roomIdGlobal).emit("whiteBoardDataResponse", {
            imgURL: data,
        });
    });

    socket.on("draw", (data) => {
        const user = getUser(socket.id);
        if (user) {
            io.to(user.roomId).emit("draw", data);
        }
    });

    socket.on("clearCanvas", () => {
        const user = getUser(socket.id);
        if (user) {
            io.to(user.roomId).emit("clearCanvas");
            io.to(user.roomId).emit("logAction", { action: "limpió el canvas", user: user.name });
        }
    });

    socket.on("undo", (data) => {
        const user = getUser(socket.id);
        if (user) {
            io.to(user.roomId).emit("undo", data);
            io.to(user.roomId).emit("logAction", { action: "deshizo una acción", user: user.name });
        }
    });

    socket.on("redo", (data) => {
        const user = getUser(socket.id);
        if (user) {
            io.to(user.roomId).emit("redo", data);
            io.to(user.roomId).emit("logAction", { action: "rehizo una acción", user: user.name });
        }
    });

    socket.on("mensaje", (data) => {
        const { mensaje } = data;
        const user = getUser(socket.id); 
        
        if (user) {
            socket.broadcast.to(user.roomId).emit("respuestaMensaje", { mensaje, name: user.name });
            socket.emit("respuestaMensaje", { mensaje, name: "Tú", self: true });
        }
    });

    socket.on("disconnect", () => {
        onlineUsers--;
        io.emit("onlineUsers", onlineUsers);
        const user = getUser(socket.id);
        
        if (user) {
            const roomId = user.roomId;
            removeUser(socket.id);
            const users = getUsersInRoom(roomId);
            socket.broadcast
                .to(roomId)
                .emit("userLeftMessageBroadcasted", user.name);
            socket.broadcast.to(roomId).emit("allUsers", users);
        }
    });
});

const port = process.env.PORT || 5000;
server.listen(port, () => console.log("El servidor corre en http://localhost:5000"));
