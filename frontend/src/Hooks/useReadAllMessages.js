import {useEffect} from 'react'
import { useSocketContext } from '../SocketContext'
import { ContextAPI } from '../ContextApi'

export const useReadAllMessages = () => {
    const {socket, messages, setMessages} = useSocketContext()
    const {selectedChat, loggedUser, APIOrigin} = ContextAPI()

     const fetchMessages = async (_id) => {
            try{
                const res = await fetch(`${APIOrigin}/api/message/getconversation?chatUser=${_id}`, {
                    method:"GET",
                    credentials:"include"
                })
                if(!res.ok) throw new Error(res)

                const data = await res.json()

                console.log("thisis the conversation messages", data?.conversation?.messages)
                setMessages(data?.conversation?.messages)

            } catch(error){
                console.log(error)
            }finally{
                setInputText("")
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

    socket?.on("readAllMessages", (newMessage) => {
       if(Object.keys(selectedChat).length > 0){
             for(let i=0; i<=newMessage.length-1; i++){
            console.log('this is the newMessages', i, newMessage[i])
                addOrUpdate(messages, newMessage[i])
        }
        fetchMessages(selectedChat?._id);
        console.log("|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| DATA HASS COMMEFOR UPDATE", data)
    
       }
    })
    
    }, [messages, selectedChat])
}

