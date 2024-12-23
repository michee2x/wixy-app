import {Schema, model} from "mongoose"

const messageSchema = Schema({
    senderId:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    receiverId:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    message:{
        type:String,
        required: true
    }
}, {timestamps:true})

export const Message = model("Message", messageSchema)