import {Conversation} from "../models/conversationModel.mjs"
import {Message} from "../models/messageMode.mjs"
import {returnReceiverSocketId, io} from "../socket/scoket.mjs"

export const sendMessage = async (req, res) => {
    try{
        
        const {text} = req.body;
        const message = text;
        const {receiverId} = req.query;
        const senderId = req.user._id

        console.log("this is the message controller",text, receiverId, senderId)

        if(!text || !receiverId || !senderId){
            console.log("pls text, receiverId and senderImust not be empty...")
            return;
        }
        let conversation = await Conversation.findOne({
            participants: {$all: [senderId, receiverId]}
        })
        
        if(!conversation){
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            })
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message,
            status:"sent"
        })

        if(newMessage){
            conversation.messages.push(newMessage._id)
        }

        await Promise.all([conversation.save(), newMessage.save()]);

        //socketio functionality

        const receiverSocketId = returnReceiverSocketId(receiverId);

        if(receiverSocketId){
            console.log("ia amsending this message : ", newMessage)
            io.to(receiverSocketId).emit("newMessage", newMessage)
        }
        res.status(200).json(newMessage)

    }catch(error){
        return console.log("there was an error in message controller", error)
    }
}

export const getConversations = async(req, res) => {
    try{
        const {chatUser} = req.query
        const receiverId = chatUser
        const senderId = req.user._id
        if(!senderId || !receiverId){
            return res.status(404).json({error:"pls make sure receiverId isn't null"})
        }
        let conversation = await Conversation.findOne({
            participants: {$all: [senderId, receiverId]}
        }).populate("messages");
        console.log("this is the conversation one", conversation)

        if(!conversation){
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            })
            await conversation.save()
        }

        res.status(200).json({conversation})

    }catch(error){
        return console.log("error in getConversation", error)
    }
}

export const receivedMessage = async (req, res) => {
    console.log("hey michee you're on track")
    try{
        const {id} = req.query
        const message = await Message.findOne({_id:id})
        if(message){
            message.status = "received"
            await message.save()
            console.log("this is the message to update status", message)

            const receiverSocketId = returnReceiverSocketId(message?.receiverId);

            if(receiverSocketId){
                console.log("ia amsending this message : ", message)
                io.to(receiverSocketId).emit("messageReceived", message)
            }

            res.status(200).json({message})

        }

    }catch(error){
        console.log("this is the error in receiveMessage middleware", error)
    }
}

export const readMessage = async (req, res) => {
    console.log("YOUARE CURRENTLY READING EVERY SINGLE MESSAGE OF A CHANNEL.....")
    try{
        const {id} = req.query
        const userId = req.user._id
        if(!id || !userId){
            return res.json(401).json({error:"pls id cannot be undefined"})
        }

        const messages = await Message.find({receiverId:id, senderId:userId, status:{$in:["sent", "received"]}})
        console.log("this are the messages that status are to be updated", messages)

        if(messages){
            for(let i=0; i<=messages.length-1; i++){
                messages[i].status = "read"
                await messages[i].save()
            }
        }

        console.log("this is the updated conversation", messages)
        const receiverSocketId = returnReceiverSocketId(id)

        if(receiverSocketId){
            io.to(receiverSocketId).emit("readChat", messages)
            res.status(200).json({ok:true})
        }

    }catch(error){
        console.log("this is the error in receiveMessage middleware", error)
    }
}