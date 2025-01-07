import {model, Schema} from "mongoose";

const cartSchema = new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    products:[
        {
           productId:{
            type:Schema.Types.ObjectId,
            ref:"Post",
            required:true
           },
           amount:{
            type:Number,
            default:1
           }

        }
    ],
    totalProducts:{
        type:Number,
        default:0
    }
}, {timestamps: true})

export const Cart = model("Cart", cartSchema)