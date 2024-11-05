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
        origin: 'https://react-and-websockets.vercel.app', 
        methods: ['GET', 'POST'], 
        credentials: true 
    }
});

io.use((socket, next)=>{
    cookieParser()(socket.request, socket.request.res, (err)=>{
        if(err) return next(err)

        const token = socket.request.cookies.token;

        if(!token) return next(new Error("Authentication Error"))
        const decoded = jwt.verify(token, key);

        next()
    })
})
require("./sockets")(io);

app.get("/login", (req, res)=>{
    const token = jwt.sign({_id:"ashwin"}, key)

    res.cookie("token", token, {httpOnly: true}).json({
        msg: "loggedin"
    })
})
app.get("/", (req,res)=>{
    res.json({
        msg: "Let's Chat"
        })
})

server.listen(3000, ()=>{
    console.log("server running at port 3000...")
})
