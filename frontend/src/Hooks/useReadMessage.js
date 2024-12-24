import {useEffect} from 'react'
import { useSocketContext } from '../SocketContext'
import { ContextAPI } from '../ContextApi'

export const useReadMessage = () => {
    const {socket, messages, setMessages} = useSocketContext()
    const {selectedChat, loggedUser, setLoggedUser} = ContextAPI()
  
    useEffect(() => {

        /* const readMessage = async () => {
            try{

                const res = await fetch(`http://localhost:7000/api/message/readmessage?id=${selectedChat._id}`, {
                    method:"GET",
                    credentials:"include"
                })

                if(!res.ok) throw new Error(res)

                const data = await res.json()
                console.log("this is the updated data due to me viewing this channel", data)
                
            }catch(error){
                console.log('this is the error in useReadMessage controller', error)
            }
        }

        if(Object.keys(selectedChat).length !== 0 && loggedUser){
            readMessage()

        } */
        if(selectedChat){
             socket?.emit("MessageRead", {senderId:selectedChat?._id, receiverId:loggedUser?._id})
        }

    }, [messages, setMessages, selectedChat, socket])
}

