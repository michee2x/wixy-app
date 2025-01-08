import { ContextAPI } from "../ContextApi"
import { useSocketContext } from "../SocketContext"
import { useEffect, useState } from "react"

export const useListenMessages = () => {
    const {socket, messages, setMessages} = useSocketContext()
    const {selectedChat, loggedUser, APIOrigin} = ContextAPI()



    useEffect(() => {
        const storeMessageAsViewed = async (message_id) => {
        try{
            const res = await fetch(`http://localhost:7000/api/message/readmessage?id=${message_id}`, {
                method:"GET",
                credentials:"include"
            })

            if(!res.ok) throw new Error(res);

            const data = await res.json()
            const storedMessage = data?.message
            console.log("the message is successfully stored as read", storedMessage)
            if(storedMessage){
                    console.log("HEY PEOPLE, THE MESSAGE IS SUCCESSFULLY STORED AS READ!!!", storedMessage)
                addOrUpdate(messages, storedMessage);
                //socket?.emit("MessageRead", storedMessage)
                }
        } catch(error){
            console.log("error in storeMessageAsViewed func", error)
        }
    }
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
           /*  socket?.on("newMessage", (newMessage) => {
                console.log("message someone sent to you", newMessage)
                
            }) */

            return () => {
            }
    }, [])
}

