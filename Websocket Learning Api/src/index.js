const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const http = require("http");
const {Server} = require("socket.io");

const appServer = http.createServer(app);

const io = new Server(appServer);


io.on("connection", (socket) => {
  //  console.log(`Client connected on http://localhost:${port}`);
    console.log('Client connected')


    // Broadcast emits
    setTimeout(function () {
        let number = Math.floor(Math.random() * 100) + 1 ;
        console.log('Broadcast emitted')
        io.emit("broadcast", number);
    },3000);


    // Normal emits



    // socket disconnect
    socket.on("disconnect", (socket) => {
        console.log("Client disconnected");
    })
})


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

appServer.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
})