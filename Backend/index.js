const express = require("express")
const http = require("http")
const { Server } = require("socket.io")
const app = express()
const path = require("path")
const { Socket } = require("dgram")
const server = http.createServer(app)
const cors = require("cors")

const io = new Server(server, {
    cors:{
        origin: 'http://localhost:5173', 
        methods: ['GET', 'POST'], 
        credentials: true 
    }
})
;
//Socket.io
io.on("connection", (socket)=>{
    socket.emit("server-message", `welcome to the app, ${socket.id}`)
    socket.broadcast.emit("server-message", `${socket.id} has joined`)
    socket.on("user-message", (message)=>{
    socket.emit("sent", {message:message, socketId: socket.id, type:"sent"})
    socket.broadcast.emit("received", {message:message, socketId: socket.id, type:"received"})
    })
})

server.listen(3000, ()=>{
    console.log("server running at port 3000...")
})
