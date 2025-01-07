import mongoose from "mongoose"

export const connectMongoDB = async () => {
    try{
        const conn = await  mongoose.connect("mongodb+srv://michee2x:0k7iJtaLI9upEJ1n@cluster0.ak1rx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
        
        /* const conn = await mongoose.connect("mongodb://localhost:27017") */
        console.log("connected to mongodb", conn.connection.host)
    }catch(err){
        if(err) return console.log("error connecting to mongoDB", err)
    }
}

//0k7iJtaLI9upEJ1n