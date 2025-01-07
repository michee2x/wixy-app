import mongoose from "mongoose"

export const connectMongoDB = async () => {
    try{
        const conn = await  mongoose.connect("mongodb+srv://michaelisraelmike:vqczS6Oi8xZth1vQ@cluster0.dzzbs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
        
        /* const conn = await mongoose.connect("mongodb://localhost:27017") */
        console.log("connected to mongodb", conn.connection.host)
    }catch(err){
        if(err) return console.log("error connecting to mongoDB", err)
    }
}