import {Server} from "socket.io"
import http from "http"
import express from "express"

export const app = express()

export const server = http.createServer(app)

export const io = new Server(server, {
    cors:{
        origin:"http://localhost:5173",
        methods:["POST", "GET"],
        credentials:true
    }
})

export const returnReceiverSocketId = (socketId) => {
    return userSokcetMap[socketId];
}

const userSokcetMap = {} // {userid: socketId}


io.on("connection", (socket) => {
    console.log("connection was made to this server", socket.id, "connected users: ", userSokcetMap)
    const userId = socket.handshake.query.userId
    if(userId) userSokcetMap[userId] = socket.id

    //io.emit is user tosend an event to all the connevted clients
    io.emit("getOnlineUsers", Object.keys(userSokcetMap))

    io.on("sendMessage", (data) => {
        
    })

    socket.on("disconnect", ()=>{
        console.log("user: "+userId+" with scoketid: "+socket.id+" disconnected")
        delete userSokcetMap[userId]
        io.emit("getOnlineUsers", Object.keys(userSokcetMap))
    })
})