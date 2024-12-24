import { ContextAPI } from "../ContextApi"
import { useSocketContext } from "../SocketContext"
import { useEffect } from "react"

export const useListenMessages = () => {
    const {socket, messages, setMessages} = useSocketContext()
    const {selectedChat, loggedUser} = ContextAPI()

    const sendReceivedMessage = async (id) => {
        try{

            const res = await fetch(`http://localhost:7000/api/message/receivedmessage?id=${id}`, {
                method:"GET",
                credentials:"include"
            })

            if(!res.ok) throw new Error(res)

            const data = await res.json()
            console.log("this is the data in sendReceivedMessage func", data)

        }catch(error){
            console.log("error in send received message", error)
        }
    }

    useEffect(() => {
        const addOrUpdate = (array, newObject) => {
            //find the index of the object with thesame id
            const index = array.findIndex(obj => obj._id === newObject._id)

            if(index > -1){
                //if found, merge the existing object with the new one
                array[index] = {...array[index], ...newObject};
            } else {
                //if not found, add the new object to the array
                array.push(newObject)
            }

            setMessages(array)
        }
            socket?.on("newMessage", (newMessage) => {
                console.log("message from frontend", newMessage);
                addOrUpdate(messages, newMessage);
                sendReceivedMessage(newMessage?._id)
                if(selectedChat){
             socket?.emit("MessageRead", {senderId:selectedChat?._id, receiverId:loggedUser?._id})
        }
            })

            socket?.on("messageReceived", (data)=>{
            console.log("this is the received message for updating the status", data)
            setMessages([...messages, data])
        })

            return () => socket?.off("newMessage")
    }, [socket, setMessages, messages])
}

