import {createContext, useContext, useEffect, useState} from "react"
import io from "socket.io-client"
import {ContextAPI} from "./ContextApi"
import { AddOrUpdate } from "./Utils/AddOrUpdate"
import useFetchConversations from "./Hooks/useFetchConversations"
import {toast } from "react-hot-toast"
import { NewMessage } from "./Components/Alerts/NewMessage"

const Context = createContext()

export const useSocketContext = () => {
    return useContext(Context)
}

export const SocketContextProvider = ({children}) => {
    const {loggedUser} = ContextAPI()
    const [socket, setSocket] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])
    const [dbUsers, setDbUsers] = useState([])
    const [messages, setMessages] = useState([])
    const [typing, setTyping] = useState(false)
    const {selectedChat, allConversations, setAllConversations} = ContextAPI()

    useEffect(() => {
        
        if(loggedUser && allConversations.length > 0){

            const socket = io("http://localhost:7000", {
                query:{
                    userId: loggedUser._id
                }
            })

            setSocket(socket);

            socket.on("getOnlineUsers", (data) => {
            setOnlineUsers(data)
            })

            socket?.on("newMessage", (data) => {
                console.log("this is the newMessage fromthe fucking backend", data)
                if(allConversations.length > 0){
                    const newConversations = allConversations.map(e => e.participants[e?.participants[0]?._id === loggedUser?._id ? 0 : 1]?._id === data?.receiverId ? {...e, messages:AddOrUpdate(e.messages, data)} : e)
                    setAllConversations(newConversations)
                    const conversation = allConversations.find((e) => e?.participants[0]?._id === data?.senderId || e?.participants[1]?._id === data?.senderId)
                    const messageData = {
                        from:conversation?.participants[conversation?.participants[0]?._id === loggedUser?._id ? 1 : 0]?.name,
                        message:data?.message
                    }
                    toast.custom(<NewMessage data={messageData} />)
                }
        })

        socket?.on("readAllMessages", (data) => {
            if(allConversations.length > 0){
                for(let i=0; i<=data.length-1;i++){
                        const newConversations = allConversations.map(e => e.participants[e?.participants[0]?._id === loggedUser?._id ? 0 : 1]?._id === data[i]?.receiverId ? {...e, messages:AddOrUpdate(e.messages, data[i])} : e)
                        setAllConversations(newConversations);
                    }
                    
                }
        })

        return () => socket.close()
        } else {
            if(socket){
                socket.close()
                setSocket(null)
            }
        }

    }, [loggedUser, allConversations])

    if(typing){
        setTimeout(() => {
            setTyping(false)
        }, 6000)
    }

    console.log("this are the users from database ......", dbUsers)

    return <Context.Provider value={{onlineUsers, socket, setOnlineUsers, typing, setTyping, dbUsers, setDbUsers, messages, setMessages}}>
        {children}
    </Context.Provider>
}