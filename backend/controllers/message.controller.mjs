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
            message
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
        console.log("/n his is teh data /n", senderId, receiverId)
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

        console.log("this is the conversation two", conversation)

        res.status(200).json({conversation})

    }catch(error){
        return console.log("error in getConversation", error)
    }
}