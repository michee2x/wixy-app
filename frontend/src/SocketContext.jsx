import {createContext, useContext, useEffect, useState} from "react"
import io from "socket.io-client"
import {ContextAPI} from "./ContextApi"

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

    useEffect(() => {
        const fetchOnlineUsers = async () => {
            try{
                const res = await fetch("http://localhost:7000/api/user/getusers", {
                    method:"GET",
                    credentials:"include"
                })
                if(!res.ok){
                    throw new Error(res)
                }

                const data = await res.json()
                setDbUsers(data.allUsers)

            }catch(error){
                console.log("error in fetchOnlineUsers", error)
            }
        }
        
        if(loggedUser){
            fetchOnlineUsers()
            const socket = io("http://localhost:7000", {
                query:{
                    userId: loggedUser._id
                }
            })

            setSocket(socket);

            socket.on("getOnlineUsers", (data) => {
            setOnlineUsers(data)

        })
            socket.on("newMessage", (data) => {
                console.log("this is from newMessage event", data);
            })

        return () => socket.close()
        } else {
            if(socket){
                socket.close()
                setSocket(null)
            }
        }

    }, [loggedUser])

    console.log("this are the users from database ......", dbUsers)

    return <Context.Provider value={{onlineUsers, socket, setOnlineUsers, dbUsers, setDbUsers, messages, setMessages}}>
        {children}
    </Context.Provider>
}