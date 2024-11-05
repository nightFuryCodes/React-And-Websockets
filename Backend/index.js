const express = require("express")
const http = require("http")
const { Server } = require("socket.io")
const app = express()
const path = require("path")
const { Socket } = require("dgram")
const server = http.createServer(app)
const cors = require("cors")
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")

const key = "ashwin"
const io = new Server(server, {
    cors:{
        origin: "http://localhost:5173", 
        methods: ['GET', 'POST'], 
        credentials: true 
    }
});

require("./sockets")(io);

app.get("/", (req,res)=>{
    res.json({
        msg: "Let's Chat"
        })
})

server.listen(3000, ()=>{
    console.log("server running at port 3000...")
})
