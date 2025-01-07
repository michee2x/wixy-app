import {Server} from "socket.io"
import http from "http"
import express from "express"
import { Message } from "../models/messageMode.mjs"

export const app = express()

export const server = http.createServer(app)

export const io = new Server(server, {
    cors:{
        origin:["https://wixy-app.onrender.com", "http://localhost:5173"],
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

    socket.on("seenallmessages", (data) => {
        console.log("HHISIS EH FUCNING ID", data)
        const channelSocketId = returnReceiverSocketId(data?.to?._id)
        if(channelSocketId){
            io.to(channelSocketId).emit("readytochat", data?.from?._id)
        }
    })

    socket.on("allmessageread", (data) => {
        console.log("show them you readall messages //////////////////////////////////////")
        if(data.messages){
            let messages = []
            for(let i=0; i<=data.messages.length-1; i++){
                const status = data.messages[i]?.status;
                if(status === "sent" || status === "received"){
                    data.messages[i].status = "read"
                    messages.push(data.messages[i])
                }
            }
            const receiverSocketId = returnReceiverSocketId(data.senderSocketId)
            if(receiverSocketId){
                io.to(receiverSocketId).emit("channeljustseenyourmessage", messages)
                console.log("this are all  tthe read data", messages)
            }
            
        }
    })

    socket.on('MessageRead', async (data) => {
        ` {
  senderId: new ObjectId('6762f226815ee949ea7da018'),
  receiverId: new ObjectId('6762fb158506773f0de4bedc'),
  message: 'boss the boss',
  status: 'sent',
  _id: new ObjectId('676b52d71625f787d6004f2a'),
  createdAt: 2024-12-25T00:33:27.229Z,
  updatedAt: 2024-12-25T00:33:27.229Z,
  __v: 0
}`
        //update the database data and send back to the user
        console.log("i have read your message", data)
        const senderSocketId = returnReceiverSocketId(data?.senderId);
        if(senderSocketId){
            io.to(senderSocketId).emit("messageRead", data)
        }
        /* let unReadConversation = await Message.find({status:{$in:["sent", "received"]}
                                                            , senderId:{$in:[data?.senderId, data?.senderId]}
                                                        })
        
        console.log("this is the unreadConversaton", unReadConversation)
        
        if(unReadConversation){
            for(let i=0; i<=unReadConversation.length-1; i++){
                const status = unReadConversation[i].status
                if(status === "sent" || status === "received"){
                    unReadConversation[i].status = "read"
                    await unReadConversation[i].save()
                }
            }
            const senderSocketId = returnReceiverSocketId(data?.senderId)
            if(senderSocketId){
            io.to(senderSocketId).emit("receivedMessage", {unReadConversation, selected:data?.receiverId})
            console.log("time to tell niggers that you received there message..")
            }
        } */
    })

    socket.on("typing", (data) => {
        console.log("user is typing", data)
        const socketId = returnReceiverSocketId(data.to)
        if(socketId){
            io.to(socketId).emit("useristyping", data.from)
        }
    })

    socket.on("disconnect", ()=>{
        console.log("user: "+userId+" with scoketid: "+socket.id+" disconnected")
        delete userSokcetMap[userId]
        io.emit("getOnlineUsers", Object.keys(userSokcetMap))
    })
})