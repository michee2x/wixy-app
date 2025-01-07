import {useEffect} from 'react'
import { useSocketContext } from '../SocketContext'
import { ContextAPI } from '../ContextApi'

export const useReadMessage = () => {
    const {socket, messages, setMessages} = useSocketContext()
    const {selectedChat, loggedUser, setLoggedUser} = ContextAPI()

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
        const fetchMessages = async (_id) => {
            try{
                const res = await fetch(`http://localhost:7000/api/message/getconversation?chatUser=${_id}`, {
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

        return () => {
            socket?.off("messageRead")
        }

    }, [])
}

