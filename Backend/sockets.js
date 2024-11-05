const { Socket } = require("socket.io")

module.exports = function(io) {

    const users = {}

    io.on("connection", (socket)=>{
        socket.on("new-user", (message)=>{
            users[socket.id] = message
            io.emit("user-connected", {message:`${message} has connected`, name:"Admin", type: "sent"})
           })
    

    socket.on("user-message", ({room, message})=>{
        socket.emit("sent", {message:message, name: users[socket.id], type:"sent"})

        socket.broadcast.emit("received", {message:message, name: users[socket.id], type:"received"})
    })

    // socket.on("disconnect", ()=>{
    //     console.log("user disconnected ", socket.id)
    // })
})
    
}