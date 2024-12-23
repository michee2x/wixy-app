import {model, Schema} from "mongoose";

const conversationSchema = new Schema({
    messages:[{
        type:Schema.Types.ObjectId,
        ref:"Message"
    }],
    participants:[{
        type:Schema.Types.ObjectId,
        default:[],
        ref:"User"
    }]
}, {timestamps: true})

export const Conversation = model("Conversation", conversationSchema)