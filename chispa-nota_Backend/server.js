const express = require('express');
const app = express();
const server = require('http').createServer(app);
const { Server } = require('socket.io');
const { addUser, removeUser, getUser, getUsersInRoom } = require('./utils/users.jsx'); // Importa las funciones desde utils/users.jsx
const { remove } = require('lodash');
const io = new Server(server);

// Rutas
app.get("/", (req, res) => {
    res.send("Este es el servidor de la pizarra de chispanota.");
});

let imgURLGlobal;

io.on("connection", (socket) => {
    socket.on("userJoined", (data) => {
        const { name, userId, roomId, host, presenter } = data;
        socket.roomId = roomId;
        socket.join(roomId);
        const users = addUser({
            name,
            userId,
            roomId,
            host,
            presenter,
            socketId: socket.id
        });

        socket.emit("userIsJoined", { success: true, users });
        socket.broadcast.to(roomId).emit("userJoinedMessageBroadcasted", name);
        socket.broadcast.to(roomId).emit("allUsers", users);
        socket.broadcast.to(roomId).emit("whiteBoardDataResponse", {
            imgURL: imgURLGlobal,
        });
    });

    socket.on("whiteboardData", (data) => {
        imgURLGlobal = data;
        socket.broadcast.to(socket.roomId).emit("whiteBoardDataResponse", {
            imgURL: data,
        });
    });

    socket.on("disconnect", () => {
        const user = getUser(socket.id); // Utiliza la función getUser para obtener el usuario
        
        if (user) {
            const roomId = user.roomId; // Obtén el ID de la sala del usuario
            removeUser(socket.id);
            socket.broadcast
            .to(roomId) // Utiliza roomId en lugar de roomIdGlobal
            .emit("userLeftMessageBroadcasted", user.name);
        }
    });

    console.log(`Client connected: ${socket.id}`);
});

const port = process.env.PORT || 5000;
server.listen(port, () => console.log("El servidor corre en http://localhost:5000 "));
