import {Conversation} from "../models/conversationModel.mjs"
import {Message} from "../models/messageMode.mjs"
import {returnReceiverSocketId, io} from "../socket/scoket.mjs"
import User from "../models/user.model.mjs"

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
        console.log("the new conversation was created successfully", newMessage)

        //socketio functionality

        const receiverSocketId = returnReceiverSocketId(receiverId);
        //const senderSocketId = returnReceiverSocketId(senderId);
        //ZSNw6etvSZuzmrRTAAAk        675f34fe8631cb97046008c2

        if(receiverSocketId){
            console.log("user is online so send to hem", receiverSocketId, receiverId)
            newMessage.status = "received"
            newMessage.save()
            io.to(receiverSocketId).emit("newMessage", newMessage)
            res.status(200).json(newMessage)
        } else {
            res.status(200).json(newMessage)
        }
        

    }catch(error){
        return console.log("there was an error in message controller", error)
    }
}

export const createConversation = async (req, res) => {
    try{
        const senderId = req.user._id
        const {receiverId} = req.query
        
        if(!senderId || !receiverId){
            return res.status(401).json({error:"receiverId needed"});
        }
        let conversation = await Conversation.findOne({
            participants: {$all: [senderId, receiverId]}
        })
        
        if(!conversation){
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            })

            await User.findByIdAndUpdate(senderId, {$pull:{unacceptedConnectRequests:receiverId}})

            await conversation.save()
            const requests = await User.findOne({_id:senderId}).select('sentConnectionRequest unacceptedConnectRequests').populate("sentConnectionRequest unacceptedConnectRequests")
            res.status(200).json({requests})
        }
        await User.findByIdAndUpdate(senderId, {$pull:{unacceptedConnectRequests:receiverId}})
        const requests = await User.findOne({_id:senderId}).select('sentConnectionRequest unacceptedConnectRequests').populate("sentConnectionRequest unacceptedConnectRequests")
        res.status(200).json({requests})

    }catch(error){
        console.log("there is an error in create conversation controller", error)
    }
}

export const getEveryConversation = async (req, res) => {
    try{
        console.log("IT IS TIME TO GET ALL CONVERSTIONS YOU MADE")
        const userId = req.user._id
        const  allConversations = await Conversation.find({participants:{$in:[userId]}}).populate("messages participants")
        console.log("this are all the user conversations", allConversations)
        if(allConversations){
            res.status(200).json({allConversations})
        }

    }catch(e){
        console.log("there was an error in getEveryConversation conntroller", e)
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
        //console.log("this is the conversation one", conversation)

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

        const message = await Message.findOne({_id:id})

        if(message){
                message.status = "read"
                await message.save()
                //console.log("this message is read by the client and will be sent back to the sender as read", message)
                res.status(200).json({message})
    }


    }catch(error){
        console.log("this is the error in receiveMessage middleware", error)
    }
}

export const readMessages = async (req, res) => {
    try{
        const {id} = req.query
        console.log("its Timeeeee ////////////////////////////////////////////////////// to updatae your channeller", id)
        
        const userId = req.user._id
        if(!id || !userId){
            return res.json(401).json({error:"pls id cannot be undefined"})
        }
        const messages = await Message.find({
          senderId:{$in:[id, userId]},
          receiverId:{$in:[id, userId]}
        })
        console.log("his is the onversation to update", messages)


        if(messages){
            let unReadMessages = []
            for(let i=0; i<=messages.length-1; i++){
                const status = messages[i].status
                if(status === 'received' || status === "sent" || messages[i].senderId === id){
                    messages[i].status = "read"
                    await messages[i].save()
                    console.log("this is to be updated", messages[i])
                    unReadMessages.push(messages[i]);
                }
            }
            console.log("this are the datas to send to clienteeeeee /////", unReadMessages)
            const toWho = returnReceiverSocketId(id);
            if(toWho){
                io.to(toWho).emit("readAllMessages", unReadMessages);
                console.log("message sent to oga", {toUser:id, socketId:toWho})
                res.status(200).json({unReadMessages})
            } else {
                res.status(200).json({unReadMessages})
            }

        }
    }catch(error){
        console.log("this is the error in receiveMessages middleware", error)
    }
}