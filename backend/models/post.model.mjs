import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    name:{
        type:String,
        default:""
    },
    price:{
        type:String,
        default:""
    },
    category:{
        type:String,
        default:""
    },
    desc:{
        type:String,
        default:""
    },
    instock:{
        type:Boolean,
        default:false
    },
    Comments:[
        {
            text:{
                type:String,
                default:""
            },
            file:{
                type:String,
            },
            userid:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"User",
            }
        }
    ],
    postimg:{
        type:String,
        default:""
    },
    postvideo:{
        type:String,
        default:""
    }
}, {timestamps:true})

const Posts  = mongoose.model("Post", postSchema)

export default  Posts