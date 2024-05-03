const express = require("express");
const app = express();

const server = require("http").createServer(app);
const io = require("socket.io")(server);


//rutas
app.get("/",(req,res)=>{
    res.send("Este es el servidor de la pizarra de chispanota");
});

const port = process.env.PORT || 5000;
server.listen(port,()=> console.log("el servidor corre en el http://localhost:5000"))