import {Server} from "socket.io"
import http from "http"
import express from "express"
import { Message } from "../models/messageMode.mjs"

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

    socket.on('MessageRead', async (data) => {

        //update the database data and send back to the user
        console.log("data. oh god", data, {senderId:'675f34fe8631cb97046008c2',receiverId:'6762fb158506773f0de4bedc'})
        let unReadConversation = await Message.find({status:{$in:["sent", "received"]}, senderId:data?.senderId, receiverId:data?.receiverId})
        console.log("this is the user ooooo", unReadConversation, data)
        if(unReadConversation){
            for(let i=0; i<=unReadConversation.length-1; i++){
                unReadConversation[i].status = "read"
                await unReadConversation[i].save()
            }
        }
        console.log("this is the later version", unReadConversation)

        const senderSocketId = returnReceiverSocketId(data?.senderId)
        if(senderSocketId){
            io.to(senderSocketId).emit("receivedMessage", {unReadConversation, selected:data?.receiverId})
        }
    })

    socket.on("disconnect", ()=>{
        console.log("user: "+userId+" with scoketid: "+socket.id+" disconnected")
        delete userSokcetMap[userId]
        io.emit("getOnlineUsers", Object.keys(userSokcetMap))
    })
})