const express = require("express")
const http = require("http")
const { Server } = require("socket.io")
const app = express()
const { Socket } = require("dgram")
const server = http.createServer(app)
const cors = require("cors")

const io = new Server(server, {
    cors:{
        origin: "https://react-and-websockets-gamma.vercel.app", 
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
